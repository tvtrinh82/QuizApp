package com.example.be.api;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import static com.example.be.api.ApiDataMapper.*;

@Service
class ResultApiService {
    private static final BigDecimal MAX_SCORE = BigDecimal.TEN;
    private static final int SUBMISSION_GRACE_SECONDS = 120;

    private final JdbcTemplate jdbc;
    private final QuizContentApiService quizService;

    ResultApiService(JdbcTemplate jdbc, QuizContentApiService quizService) {
        this.jdbc = jdbc;
        this.quizService = quizService;
    }

    public List<Map<String, Object>> getResults(AuthPrincipal principal) {
        String sql = """
                SELECT r.id, r.user_id, r.quiz_id, r.score, r.correct_count, r.total_questions,
                       r.time_spent_seconds, r.submitted_at, r.is_late,
                       u.full_name, u.email, q.title, q.subject
                FROM results r
                JOIN users u ON u.id = r.user_id
                JOIN quizzes q ON q.id = r.quiz_id
                """ + (principal.isAdmin() ? "" : " WHERE r.user_id = ?")
                + " ORDER BY r.submitted_at DESC";
        if (principal.isAdmin()) {
            return jdbc.query(sql, (rs, rowNum) -> resultRow(rs));
        }
        return jdbc.query(sql, (rs, rowNum) -> resultRow(rs), principal.id());
    }

    public Map<String, Object> getResult(UUID resultId, AuthPrincipal principal) {
        String sql = """
                SELECT r.id, r.user_id, r.quiz_id, r.score, r.correct_count, r.total_questions,
                       r.time_spent_seconds, r.submitted_at, r.is_late,
                       u.full_name, u.email, q.title, q.subject
                FROM results r
                JOIN users u ON u.id = r.user_id
                JOIN quizzes q ON q.id = r.quiz_id
                WHERE r.id = ?
                """ + (principal.isAdmin() ? "" : " AND r.user_id = ?");
        List<Map<String, Object>> rows = principal.isAdmin()
                ? jdbc.query(sql, (rs, rowNum) -> resultRow(rs), resultId)
                : jdbc.query(sql, (rs, rowNum) -> resultRow(rs), resultId, principal.id());
        if (rows.isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy bài thi.");
        }
        Map<String, Object> result = rows.get(0);
        result.put("answers", getResultAnswers(resultId));
        return result;
    }

    private List<Map<String, Object>> getResultAnswers(UUID resultId) {
        return jdbc.query("""
                SELECT ra.question_id, selected.position AS selected_position,
                       (SELECT correct.position
                        FROM question_options correct
                        WHERE correct.question_id = ra.question_id AND correct.is_correct = TRUE
                        ORDER BY correct.position LIMIT 1) AS correct_position
                FROM result_answers ra
                JOIN questions q ON q.id = ra.question_id
                LEFT JOIN result_answer_options rao ON rao.result_answer_id = ra.id
                LEFT JOIN question_options selected ON selected.id = rao.option_id
                WHERE ra.result_id = ?
                ORDER BY q.position
                """, (rs, rowNum) -> {
                    Map<String, Object> answer = new LinkedHashMap<>();
                    answer.put("questionId", rs.getObject("question_id").toString());
                    int selectedPosition = rs.getInt("selected_position");
                    answer.put("selectedOption", rs.wasNull() ? null : labelFor(selectedPosition));
                    int correctPosition = rs.getInt("correct_position");
                    answer.put("correctOption", rs.wasNull() ? null : labelFor(correctPosition));
                    return answer;
                }, resultId);
    }

    @Transactional
    public Map<String, Object> saveResult(Map<String, Object> body, AuthPrincipal principal) {
        UUID quizId = uuid(requiredText(body, "quizId"));
        Map<String, Object> quiz = quizService.queryQuiz(quizId);
        if (!Boolean.TRUE.equals(quiz.get("isActive"))) {
            throw new ApiException(HttpStatus.CONFLICT, "Bộ đề hiện đã bị khóa.");
        }
        List<Map<String, Object>> attemptRows = jdbc.query("""
                SELECT id, start_time FROM quiz_attempts
                WHERE user_id = ? AND quiz_id = ? AND submitted_at IS NULL
                ORDER BY start_time DESC LIMIT 1 FOR UPDATE
                """, (rs, rowNum) -> Map.of(
                        "id", rs.getObject("id", UUID.class),
                        "startTime", rs.getTimestamp("start_time").toInstant()),
                principal.id(), quizId);
        if (attemptRows.isEmpty()) {
            throw new ApiException(HttpStatus.CONFLICT, "Không tìm thấy bài thi đang làm hoặc bài thi đã được nộp.");
        }
        UUID attemptId = (UUID) attemptRows.get(0).get("id");
        Instant startTime = (Instant) attemptRows.get(0).get("startTime");
        Instant submittedAt = jdbc.queryForObject("SELECT clock_timestamp()", java.sql.Timestamp.class).toInstant();
        long elapsedSeconds = Math.max(0, Duration.between(startTime, submittedAt).getSeconds());
        int durationSeconds = Math.multiplyExact((Integer) quiz.get("duration"), 60);
        boolean late = elapsedSeconds > (long) durationSeconds + SUBMISSION_GRACE_SECONDS;
        List<Map<String, Object>> questions = jdbc.query("""
                SELECT id, position FROM questions WHERE quiz_id = ? ORDER BY position
                """, (rs, rowNum) -> Map.of("id", rs.getObject("id", UUID.class), "position", rs.getInt("position")), quizId);
        if (questions.isEmpty()) {
            throw new ApiException(HttpStatus.CONFLICT, "Bộ đề chưa có câu hỏi.");
        }
        Object rawAnswers = body.get("answers");
        if (!(rawAnswers instanceof List<?> answers)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Thiếu danh sách câu trả lời.");
        }
        Map<UUID, String> submitted = new LinkedHashMap<>();
        for (Object answer : answers) {
            if (answer instanceof Map<?, ?> answerMap && answerMap.get("questionId") instanceof String questionId
                    && answerMap.get("selectedOption") instanceof String selectedOption
                    && !selectedOption.isBlank()) {
                submitted.put(uuid(questionId), selectedOption.toUpperCase(Locale.ROOT));
            }
        }

        int correct = 0;
        for (Map<String, Object> question : questions) {
            UUID questionId = (UUID) question.get("id");
            String selected = submitted.get(questionId);
            String answerKey = jdbc.query("""
                    SELECT position FROM question_options WHERE question_id = ? AND is_correct = TRUE
                    ORDER BY position LIMIT 1
                    """, rs -> rs.next() ? labelFor(rs.getInt("position")) : null, questionId);
            if (selected != null && selected.equals(answerKey)) {
                correct++;
            }
        }
        int total = questions.size();
        BigDecimal score = BigDecimal.valueOf(correct)
                .multiply(MAX_SCORE)
                .divide(BigDecimal.valueOf(total), 1, RoundingMode.HALF_UP);
        int timeSpent = (int) Math.min(elapsedSeconds, Integer.MAX_VALUE);
        UUID resultId = UUID.randomUUID();
        jdbc.update("""
                INSERT INTO results
                    (id, user_id, quiz_id, attempt_id, score, max_score, started_at, submitted_at,
                     correct_count, total_questions, time_spent_seconds, is_late)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, resultId, principal.id(), quizId, attemptId, score, MAX_SCORE,
                java.sql.Timestamp.from(startTime), java.sql.Timestamp.from(submittedAt),
                correct, total, timeSpent, late);

        for (Map<String, Object> question : questions) {
            UUID questionId = (UUID) question.get("id");
            String selected = submitted.get(questionId);
            if (selected == null) {
                continue;
            }
            UUID optionId = jdbc.query("""
                    SELECT id FROM question_options WHERE question_id = ? AND position = ?
                    """, rs -> rs.next() ? rs.getObject("id", UUID.class) : null,
                    questionId, positionFor(selected));
            if (optionId == null) {
                continue;
            }
            UUID answerId = UUID.randomUUID();
            int isCorrect = selected.equals(jdbc.query("""
                    SELECT position FROM question_options WHERE question_id = ? AND is_correct = TRUE
                    ORDER BY position LIMIT 1
                    """, rs -> rs.next() ? labelFor(rs.getInt("position")) : null, questionId)) ? 1 : 0;
            jdbc.update("""
                    INSERT INTO result_answers (id, result_id, question_id, awarded_points)
                    VALUES (?, ?, ?, ?)
                    """, answerId, resultId, questionId, BigDecimal.valueOf(isCorrect));
            jdbc.update("""
                    INSERT INTO result_answer_options (result_answer_id, question_id, option_id)
                    VALUES (?, ?, ?)
                    """, answerId, questionId, optionId);
        }
        jdbc.update("""
                UPDATE quiz_attempts SET submitted_at = ?, is_late = ? WHERE id = ?
                """, java.sql.Timestamp.from(submittedAt), late, attemptId);
        return getResult(resultId, principal);
    }
}
