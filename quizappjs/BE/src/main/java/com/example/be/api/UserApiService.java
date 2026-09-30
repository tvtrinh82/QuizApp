package com.example.be.api;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import static com.example.be.api.ApiDataMapper.*;

@Service
class UserApiService {
    private final JdbcTemplate jdbc;
    private final TokenService tokenService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    UserApiService(JdbcTemplate jdbc, TokenService tokenService) {
        this.jdbc = jdbc;
        this.tokenService = tokenService;
    }

    @Transactional
    public Map<String, Object> createUser(Map<String, Object> body) {
        String name = requiredText(body, "name");
        String email = requiredText(body, "email").toLowerCase(Locale.ROOT);
        String password = requiredText(body, "password");
        if (password.length() < 4) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Mật khẩu phải có ít nhất 4 ký tự.");
        }
        String role = normalizeRole(text(body, "role"));
        UUID id = UUID.randomUUID();
        jdbc.update("""
                INSERT INTO users (id, full_name, email, password_hash, role, is_active, subject)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """, id, name, email, passwordEncoder.encode(password), role,
                !"locked".equalsIgnoreCase(text(body, "status")), text(body, "subject"));
        return getUser(id);
    }

    public List<Map<String, Object>> getUsers() {
        return jdbc.query("""
                SELECT id, full_name, email, role, is_active, phone, class_name, subject
                FROM users ORDER BY created_at DESC
                """, (rs, rowNum) -> userRow(rs, false));
    }

    @Transactional
    public Map<String, Object> updateUser(UUID id, Map<String, Object> body) {
        Map<String, Object> existing = getUser(id);
        String name = body.containsKey("name") ? requiredText(body, "name") : (String) existing.get("name");
        String email = body.containsKey("email")
                ? requiredText(body, "email").toLowerCase(Locale.ROOT) : (String) existing.get("email");
        String role = body.containsKey("role") ? normalizeRole(text(body, "role"))
                : roleToDb((String) existing.get("role"));
        boolean active = body.containsKey("status")
                ? !"locked".equalsIgnoreCase(text(body, "status"))
                : (body.containsKey("isActive") ? Boolean.TRUE.equals(body.get("isActive"))
                    : Boolean.TRUE.equals(existing.get("isActive")));

        jdbc.update("""
                UPDATE users SET full_name = ?, email = ?, role = ?, is_active = ?, phone = ?,
                    class_name = ?, subject = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                """, name, email, role, active,
                body.containsKey("phone") ? text(body, "phone") : existing.get("phone"),
                body.containsKey("class_name") ? text(body, "class_name") : existing.get("class_name"),
                body.containsKey("subject") ? text(body, "subject") : existing.get("subject"), id);
        if (!active) {
            revokeTokensAfterCommit(id);
        }
        if (body.containsKey("password") && !text(body, "password").isBlank()) {
            String password = requiredText(body, "password");
            if (password.length() < 4) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "Mật khẩu phải có ít nhất 4 ký tự.");
            }
            jdbc.update("UPDATE users SET password_hash = ? WHERE id = ?", passwordEncoder.encode(password), id);
        }
        return getUser(id);
    }

    @Transactional
    public void deleteUser(UUID id) {
        int deleted = jdbc.update("DELETE FROM users WHERE id = ?", id);
        if (deleted == 0) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản.");
        }
        revokeTokensAfterCommit(id);
    }

    private void revokeTokensAfterCommit(UUID userId) {
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                tokenService.revokeUser(userId);
            }
        });
    }

    public Map<String, Object> getUser(UUID id) {
        try {
            return jdbc.queryForObject("""
                    SELECT id, full_name, email, role, is_active, phone, class_name, subject
                    FROM users WHERE id = ?
                    """, (rs, rowNum) -> userRow(rs, false), id);
        } catch (EmptyResultDataAccessException exception) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản.");
        }
    }
}
