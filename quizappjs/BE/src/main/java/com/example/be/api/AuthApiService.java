package com.example.be.api;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import static com.example.be.api.ApiDataMapper.*;

@Service
class AuthApiService {
    private final JdbcTemplate jdbc;
    private final TokenService tokenService;
    private final UserApiService userService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    AuthApiService(JdbcTemplate jdbc, TokenService tokenService, UserApiService userService) {
        this.jdbc = jdbc;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    public Map<String, Object> login(Map<String, Object> body) {
        String email = requiredText(body, "email").toLowerCase(Locale.ROOT);
        String password = requiredText(body, "password");
        Map<String, Object> user;
        try {
            user = jdbc.queryForObject("""
                    SELECT id, full_name, email, password_hash, role, is_active, phone, class_name, subject
                    FROM users WHERE LOWER(email) = ?
                    """, (rs, rowNum) -> userRow(rs, true), email);
        } catch (EmptyResultDataAccessException exception) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không chính xác.");
        }

        String passwordHash = (String) user.remove("passwordHash");
        if (!passwordEncoder.matches(password, passwordHash)) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không chính xác.");
        }
        if (!Boolean.TRUE.equals(user.get("isActive"))) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Tài khoản đã bị khóa.");
        }

        AuthPrincipal principal = new AuthPrincipal(
                UUID.fromString((String) user.get("id")), roleToDb((String) user.get("role")));
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("accessToken", tokenService.issue(principal));
        response.put("user", publicUser(user));
        return response;
    }

    @Transactional
    public Map<String, Object> register(Map<String, Object> body) {
        String name = requiredText(body, "name");
        String email = requiredText(body, "email").toLowerCase(Locale.ROOT);
        String password = requiredText(body, "password");
        if (password.length() < 4) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Mật khẩu phải có ít nhất 4 ký tự.");
        }
        UUID id = UUID.randomUUID();
        jdbc.update("""
                INSERT INTO users (id, full_name, email, password_hash, role, is_active)
                VALUES (?, ?, ?, ?, 'STUDENT', TRUE)
                """, id, name, email, passwordEncoder.encode(password));
        Map<String, Object> user = userService.getUser(id);
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("accessToken", tokenService.issue(new AuthPrincipal(id, "STUDENT")));
        response.put("user", user);
        return response;
    }
}
