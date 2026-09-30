package com.example.be.api;

import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class TokenServiceTest {
    @Test
    void revokeUserInvalidatesAllOfTheirTokensWithoutAffectingOtherUsers() {
        TokenService tokenService = new TokenService(12);
        UUID lockedUserId = UUID.randomUUID();
        UUID otherUserId = UUID.randomUUID();
        String firstToken = tokenService.issue(new AuthPrincipal(lockedUserId, "STUDENT"));
        String secondToken = tokenService.issue(new AuthPrincipal(lockedUserId, "STUDENT"));
        String otherUserToken = tokenService.issue(new AuthPrincipal(otherUserId, "STUDENT"));

        tokenService.revokeUser(lockedUserId);

        assertNull(tokenService.resolve(firstToken));
        assertNull(tokenService.resolve(secondToken));
        org.junit.jupiter.api.Assertions.assertTrue(tokenService.wasRevoked(firstToken));
        assertNotNull(tokenService.resolve(otherUserToken));
    }
}
