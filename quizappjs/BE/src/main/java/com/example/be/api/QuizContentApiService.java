package com.example.be.api;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import static com.example.be.api.ApiDataMapper.*;

@Service
class QuizContentApiService {
    private static final int SUBMISSION_GRACE_SECONDS = 120;

    private final JdbcTemplate jdbc;

    QuizContentApiService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> getQuizzes() {
        return jdbc.query("""
                SELECT id, title, description, duration_seconds, subject, is_active, is_published, created_at
                FROM quizzes ORDER BY created_at DESC
                """, (rs, rowNum) -> quizRow(rs, false));
    }

    @Transactional
    public Map<String, Object> startQuiz(UUID quizId, AuthPrincipal principal) {
        Map<String, Object> quiz = queryQuiz(quizId);
        if (!Boolean.TRUE.equals(quiz.get("isActive"))) {
            throw new ApiException(HttpStatus.CONFLICT, "Bộ đề hiện đã bị khóa.");
        }
        jdbc.queryForObject("SELECT id FROM quizzes WHERE id = ? FOR UPDATE",
                (rs, rowNum) -> rs.getObject("id", UUID.class), quizId);

        List<Map<String, Object>> activeAttempts = jdbc.query("""
                SELECT id, start_time FROM quiz_attempts
                WHERE user_id = ? AND quiz_id = ? AND submitted_at IS NULL
                ORDER BY start_time DESC LIMIT 1
                """, (rs, rowNum) -> attemptRow(rs), principal.id(), quizId);
        if (!activeAttempts.isEmpty()) {
            return attemptStatus(activeAttempts.get(0), (Integer) quiz.get("duration"));
        }

        UUID attemptId = UUID.randomUUID();
        Map<String, Object> attempt = jdbc.queryForObject("""
                INSERT INTO quiz_attempts (id, user_id, quiz_id, start_time)
                VALUES (?, ?, ?, CURRENT_TIMESTAMP)
                RETURNING id, start_time
                """, (rs, rowNum) -> attemptRow(rs), attemptId, principal.id(), quizId);
        return attemptStatus(attempt, (Integer) quiz.get("duration"));
    }

    public Map<String, Object> getQuizAttemptStatus(UUID quizId, AuthPrincipal principal) {
        Map<String, Object> quiz = queryQuiz(quizId);
        List<Map<String, Object>> attempts = jdbc.query("""
                SELECT id, start_time FROM quiz_attempts
                WHERE user_id = ? AND quiz_id = ? AND submitted_at IS NULL
                ORDER BY start_time DESC LIMIT 1
                """, (rs, rowNum) -> attemptRow(rs), principal.id(), quizId);
        if (attempts.isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy bài thi đang làm.");
        }
        return attemptStatus(attempts.get(0), (Integer) quiz.get("duration"));
    }

    private static Map<String, Object> attemptRow(java.sql.ResultSet rs) throws java.sql.SQLException {
        Map<String, Object> attempt = new LinkedHashMap<>();
        attempt.put("id", rs.getObject("id").toString());
        attempt.put("startTime", rs.getTimestamp("start_time").toInstant());
        return attempt;
    }

    private static Map<String, Object> attemptStatus(Map<String, Object> attempt, int durationMinutes) {
        Instant startTime = (Instant) attempt.get("startTime");
        int durationSeconds = Math.multiplyExact(durationMinutes, 60);
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("attemptId", attempt.get("id"));
        status.put("startTime", startTime.toString());
        status.put("durationSeconds", durationSeconds);
        status.put("expiresAt", startTime.plusSeconds(durationSeconds).toString());
        status.put("submissionGraceSeconds", SUBMISSION_GRACE_SECONDS);
        return status;
    }

    public Map<String, Object> getQuiz(UUID id, AuthPrincipal principal) {
        Map<String, Object> quiz = queryQuiz(id);
        List<Map<String, Object>> questions = jdbc.query("""
                SELECT id, content, question_type, points, position
                FROM questions WHERE quiz_id = ? ORDER BY position
                """, (rs, rowNum) -> questionRow(rs), id);
        for (Map<String, Object> question : questions) {
            UUID questionId = UUID.fromString((String) question.get("id"));
            List<Map<String, Object>> options = jdbc.query("""
                    SELECT content, is_correct, position FROM question_options
                    WHERE question_id = ? ORDER BY position
                    """, (rs, rowNum) -> optionRow(rs), questionId);
            Map<String, String> optionMap = new LinkedHashMap<>();
            String correctOption = null;
            for (Map<String, Object> option : options) {
                String label = labelFor((Integer) option.get("position"));
                optionMap.put(label, (String) option.get("content"));
                if (Boolean.TRUE.equals(option.get("isCorrect"))) {
                    correctOption = label;
                }
            }
            question.put("options", optionMap);
            if (principal.isAdmin()) {
                question.put("correctOption", correctOption);
            }
            question.remove("questionType");
            question.remove("points");
            question.remove("position");
        }
        quiz.put("questions", questions);
        return quiz;
    }

    @Transactional
    public Map<String, Object> createQuiz(Map<String, Object> body, AuthPrincipal principal) {
        String title = requiredText(body, "title");
        int durationMinutes = integer(body, "duration", 45);
        if (durationMinutes <= 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Thời lượng phải lớn hơn 0.");
        }
        UUID id = UUID.randomUUID();
        jdbc.update("""
                INSERT INTO quizzes
                    (id, title, duration_seconds, subject, is_published, is_active, created_by)
                VALUES (?, ?, ?, ?, TRUE, TRUE, ?)
                """, id, title, Math.multiplyExact(durationMinutes, 60), text(body, "subject"), principal.id());
        return queryQuiz(id);
    }

    @Transactional
    public Map<String, Object> updateQuiz(UUID id, Map<String, Object> body) {
        Map<String, Object> existing = queryQuiz(id);
        String title = body.containsKey("title") ? requiredText(body, "title") : (String) existing.get("title");
        int duration = body.containsKey("duration") ? integer(body, "duration", 0)
                : (Integer) existing.get("duration");
        if (duration <= 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Thời lượng phải lớn hơn 0.");
        }
        boolean active = body.containsKey("status")
                ? !"locked".equalsIgnoreCase(text(body, "status"))
                : Boolean.TRUE.equals(existing.get("isActive"));
        jdbc.update("""
                UPDATE quizzes SET title = ?, duration_seconds = ?, subject = ?, is_active = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """, title, Math.multiplyExact(duration, 60),
                body.containsKey("subject") ? text(body, "subject") : existing.get("subject"), active, id);
        return queryQuiz(id);
    }

    @Transactional
    public void deleteQuiz(UUID id) {
        int deleted = jdbc.update("DELETE FROM quizzes WHERE id = ?", id);
        if (deleted == 0) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy bộ đề.");
        }
    }

    @Transactional
    public Map<String, Object> createQuestion(Map<String, Object> body) {
        UUID quizId = uuid(requiredText(body, "quizId"));
        queryQuiz(quizId);
        String content = requiredText(body, "content");
        Object rawOptions = body.get("options");
        if (!(rawOptions instanceof Map<?, ?> options) || options.isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Câu hỏi cần có ít nhất một lựa chọn.");
        }
        String correctOption = requiredText(body, "correctOption").toUpperCase(Locale.ROOT);
        List<Map.Entry<String, String>> values = new ArrayList<>();
        for (Map.Entry<?, ?> entry : options.entrySet()) {
            if (entry.getKey() instanceof String key && entry.getValue() instanceof String value
                    && !value.isBlank()) {
                values.add(Map.entry(key.toUpperCase(Locale.ROOT), value.trim()));
            }
        }
        values.sort(Map.Entry.comparingByKey());
        for (int index = 0; index < values.size(); index++) {
            if (!labelFor(index + 1).equals(values.get(index).getKey())) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "Các lựa chọn phải được đánh nhãn liên tục từ A.");
            }
        }
        if (values.stream().noneMatch(entry -> entry.getKey().equals(correctOption))) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Đáp án đúng không thuộc các lựa chọn.");
        }

        Integer nextPosition = jdbc.queryForObject(
                "SELECT COALESCE(MAX(position), 0) + 1 FROM questions WHERE quiz_id = ?", Integer.class, quizId);
        UUID questionId = UUID.randomUUID();
        jdbc.update("""
                INSERT INTO questions (id, quiz_id, content, question_type, points, position)
                VALUES (?, ?, ?, 'SINGLE_CHOICE', 1, ?)
                """, questionId, quizId, content, nextPosition);
        int position = 1;
        for (Map.Entry<String, String> option : values) {
            jdbc.update("""
                    INSERT INTO question_options (id, question_id, content, is_correct, position)
                    VALUES (?, ?, ?, ?, ?)
                    """, UUID.randomUUID(), questionId, option.getValue(),
                    option.getKey().equals(correctOption), position++);
        }
        return Map.of("id", questionId.toString(), "quizId", quizId.toString(), "content", content);
    }

    public Map<String, Object> queryQuiz(UUID id) {
        try {
            return jdbc.queryForObject("""
                    SELECT id, title, description, duration_seconds, subject, is_active, is_published, created_at
                    FROM quizzes WHERE id = ?
                    """, (rs, rowNum) -> quizRow(rs, true), id);
        } catch (EmptyResultDataAccessException exception) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy bộ đề.");
        }
    }
}
