package com.example.be.api;

import org.springframework.http.HttpStatus;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

final class ApiDataMapper {
    private ApiDataMapper() {
    }

    static Map<String, Object> userRow(ResultSet rs, boolean includePassword) throws SQLException {
        Map<String, Object> user = new LinkedHashMap<>();
        user.put("id", rs.getObject("id").toString());
        user.put("name", rs.getString("full_name"));
        user.put("email", rs.getString("email"));
        user.put("role", roleToClient(rs.getString("role")));
        user.put("status", rs.getBoolean("is_active") ? "active" : "locked");
        user.put("isActive", rs.getBoolean("is_active"));
        user.put("phone", rs.getString("phone"));
        user.put("class_name", rs.getString("class_name"));
        user.put("subject", rs.getString("subject"));
        if (includePassword) {
            user.put("passwordHash", rs.getString("password_hash"));
        }
        return user;
    }

    static Map<String, Object> publicUser(Map<String, Object> user) {
        Map<String, Object> publicUser = new LinkedHashMap<>(user);
        publicUser.remove("isActive");
        return publicUser;
    }

    static Map<String, Object> quizRow(ResultSet rs, boolean includeInternal) throws SQLException {
        Map<String, Object> quiz = new LinkedHashMap<>();
        quiz.put("id", rs.getObject("id").toString());
        quiz.put("title", rs.getString("title"));
        quiz.put("description", rs.getString("description"));
        quiz.put("duration", rs.getInt("duration_seconds") / 60);
        quiz.put("subject", rs.getString("subject"));
        quiz.put("status", rs.getBoolean("is_active") ? "active" : "locked");
        quiz.put("createdAt", iso(rs.getTimestamp("created_at")));
        if (includeInternal) {
            quiz.put("isActive", rs.getBoolean("is_active"));
            quiz.put("isPublished", rs.getBoolean("is_published"));
        }
        return quiz;
    }

    static Map<String, Object> questionRow(ResultSet rs) throws SQLException {
        Map<String, Object> question = new LinkedHashMap<>();
        question.put("id", rs.getObject("id").toString());
        question.put("content", rs.getString("content"));
        question.put("questionType", rs.getString("question_type"));
        question.put("points", rs.getBigDecimal("points"));
        question.put("position", rs.getInt("position"));
        return question;
    }

    static Map<String, Object> optionRow(ResultSet rs) throws SQLException {
        Map<String, Object> option = new LinkedHashMap<>();
        option.put("content", rs.getString("content"));
        option.put("isCorrect", rs.getBoolean("is_correct"));
        option.put("position", rs.getInt("position"));
        return option;
    }

    static Map<String, Object> resultRow(ResultSet rs) throws SQLException {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", rs.getObject("id").toString());
        result.put("userId", rs.getObject("user_id").toString());
        result.put("quizId", rs.getObject("quiz_id").toString());
        result.put("score", rs.getBigDecimal("score"));
        result.put("correctCount", rs.getInt("correct_count"));
        result.put("totalQuestions", rs.getInt("total_questions"));
        result.put("timeSpent", rs.getInt("time_spent_seconds"));
        result.put("timestamp", iso(rs.getTimestamp("submitted_at")));
        result.put("isLate", rs.getBoolean("is_late"));
        result.put("status", rs.getBoolean("is_late") ? "Nộp trễ" : "Hoàn thành");
        result.put("user", Map.of("id", result.get("userId"), "name", rs.getString("full_name"),
                "email", rs.getString("email")));
        Map<String, Object> quiz = new LinkedHashMap<>();
        quiz.put("id", result.get("quizId"));
        quiz.put("title", rs.getString("title"));
        quiz.put("subject", rs.getString("subject"));
        result.put("quiz", quiz);
        return result;
    }

    static Map<String, Object> documentRow(ResultSet rs) throws SQLException {
        Map<String, Object> document = new LinkedHashMap<>();
        document.put("id", rs.getObject("id").toString());
        document.put("title", rs.getString("title"));
        document.put("subject", rs.getString("subject"));
        document.put("link", rs.getString("link"));
        document.put("description", rs.getString("description"));
        document.put("createdAt", iso(rs.getTimestamp("created_at")));
        Object authorId = rs.getObject("author_id");
        document.put("authorId", authorId == null ? null : authorId.toString());
        return document;
    }

    static String iso(Timestamp timestamp) {
        return timestamp == null ? null : timestamp.toInstant().toString();
    }

    static String labelFor(int position) {
        return position >= 1 && position <= 26 ? String.valueOf((char) ('A' + position - 1)) : Integer.toString(position);
    }

    static int positionFor(String label) {
        if (label.length() != 1 || label.charAt(0) < 'A' || label.charAt(0) > 'Z') {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Lựa chọn câu trả lời không hợp lệ.");
        }
        return label.charAt(0) - 'A' + 1;
    }

    static String text(Map<String, Object> body, String key) {
        Object value = body.get(key);
        return value == null ? "" : value.toString().trim();
    }

    static String requiredText(Map<String, Object> body, String key) {
        String value = text(body, key);
        if (value.isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Thiếu trường bắt buộc: " + key);
        }
        return value;
    }

    static int integer(Map<String, Object> body, String key, int defaultValue) {
        Object value = body.get(key);
        if (value == null) {
            return defaultValue;
        }
        try {
            return value instanceof Number number ? number.intValue() : Integer.parseInt(value.toString());
        } catch (NumberFormatException exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Trường " + key + " phải là số nguyên.");
        }
    }

    static UUID uuid(String value) {
        try {
            return UUID.fromString(value);
        } catch (IllegalArgumentException exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "ID không hợp lệ.");
        }
    }

    static String normalizeRole(String role) {
        if ("admin".equalsIgnoreCase(role) || "teacher".equalsIgnoreCase(role)) {
            return "ADMIN";
        }
        if ("student".equalsIgnoreCase(role)) {
            return "STUDENT";
        }
        throw new ApiException(HttpStatus.BAD_REQUEST, "Vai trò không hợp lệ.");
    }

    static String roleToClient(String role) {
        return "ADMIN".equalsIgnoreCase(role) ? "admin" : "student";
    }

    static String roleToDb(String role) {
        return "admin".equalsIgnoreCase(role) ? "ADMIN" : "STUDENT";
    }
}
