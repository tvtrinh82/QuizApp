package com.example.be.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.UUID;

@Component
public class AdminBootstrap implements ApplicationRunner {
    private final JdbcTemplate jdbc;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final String email;
    private final String password;
    private final String name;

    public AdminBootstrap(
            JdbcTemplate jdbc,
            @Value("${app.bootstrap-admin.email:}") String email,
            @Value("${app.bootstrap-admin.password:}") String password,
            @Value("${app.bootstrap-admin.name:Quản trị viên}") String name) {
        this.jdbc = jdbc;
        this.email = email.trim().toLowerCase(Locale.ROOT);
        this.password = password;
        this.name = name;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (email.isBlank() && password.isBlank()) {
            return;
        }
        if (email.isBlank() || password.isBlank() || password.length() < 12) {
            throw new IllegalStateException(
                    "Set both BOOTSTRAP_ADMIN_EMAIL and a BOOTSTRAP_ADMIN_PASSWORD of at least 12 characters.");
        }
        Integer existing = jdbc.queryForObject(
                "SELECT COUNT(*) FROM users WHERE LOWER(email) = ?", Integer.class, email);
        if (existing == null || existing > 0) {
            return;
        }
        jdbc.update("""
                INSERT INTO users (id, full_name, email, password_hash, role, is_active)
                VALUES (?, ?, ?, ?, 'ADMIN', TRUE)
                """, UUID.randomUUID(), name, email, passwordEncoder.encode(password));
    }
}
