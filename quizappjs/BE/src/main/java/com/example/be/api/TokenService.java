package com.example.be.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HexFormat;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenService {
    private final SecureRandom secureRandom = new SecureRandom();
    private final Map<String, Session> sessions = new ConcurrentHashMap<>();
    private final long ttlHours;

    public TokenService(@Value("${app.auth.token-ttl-hours:12}") long ttlHours) {
        this.ttlHours = ttlHours;
    }

    public String issue(AuthPrincipal principal) {
        byte[] tokenBytes = new byte[32];
        secureRandom.nextBytes(tokenBytes);
        String token = HexFormat.of().formatHex(tokenBytes);
        sessions.put(token, new Session(principal, Instant.now().plus(ttlHours, ChronoUnit.HOURS), false));
        return token;
    }

    public long ttlSeconds() {
        return ChronoUnit.HOURS.getDuration().getSeconds() * ttlHours;
    }

    public void revoke(String token) {
        sessions.remove(token);
    }

    public AuthPrincipal resolve(String token) {
        Session session = getSession(token);
        if (session == null) {
            return null;
        }
        return session.revoked() ? null : session.principal();
    }

    public boolean wasRevoked(String token) {
        Session session = getSession(token);
        return session != null && session.revoked();
    }

    public void revokeUser(UUID userId) {
        sessions.replaceAll((token, session) ->
                session.principal().id().equals(userId)
                        ? new Session(session.principal(), session.expiresAt(), true)
                        : session);
    }

    private Session getSession(String token) {
        Session session = sessions.get(token);
        if (session != null && session.expiresAt().isBefore(Instant.now())) {
            sessions.remove(token, session);
            return null;
        }
        return session;
    }

    private record Session(AuthPrincipal principal, Instant expiresAt, boolean revoked) {
    }
}
