package com.example.be.api;

import java.util.UUID;

public record AuthPrincipal(UUID id, String role) {
    public boolean isAdmin() {
        return "ADMIN".equals(role);
    }
}
