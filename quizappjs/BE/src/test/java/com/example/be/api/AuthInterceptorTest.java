package com.example.be.api;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import jakarta.servlet.http.Cookie;
import org.springframework.mock.web.MockHttpServletRequest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AuthInterceptorTest {
    @Test
    void rejectsAndRevokesSessionWhenAccountIsDisabled() {
        TokenService tokenService = new TokenService(12);
        JdbcTemplate jdbc = mock(JdbcTemplate.class);
        AuthInterceptor interceptor = new AuthInterceptor(tokenService, jdbc);
        AuthPrincipal principal = new AuthPrincipal(UUID.randomUUID(), "STUDENT");
        String token = tokenService.issue(principal);
        MockHttpServletRequest request = authenticatedRequest(token);
        when(jdbc.queryForObject(any(String.class), eq(Boolean.class), eq(principal.id()))).thenReturn(false);

        ApiException exception = assertThrows(ApiException.class,
                () -> interceptor.preHandle(request, null, new Object()));

        assertEquals(HttpStatus.FORBIDDEN, exception.getStatus());
        assertEquals("Tài khoản của bạn đã bị vô hiệu hóa.", exception.getMessage());
        assertNull(tokenService.resolve(token));
        assertTrue(tokenService.wasRevoked(token));
    }

    @Test
    void reportsDisabledAccountForPreviouslyRevokedToken() {
        TokenService tokenService = new TokenService(12);
        JdbcTemplate jdbc = mock(JdbcTemplate.class);
        AuthInterceptor interceptor = new AuthInterceptor(tokenService, jdbc);
        AuthPrincipal principal = new AuthPrincipal(UUID.randomUUID(), "STUDENT");
        String token = tokenService.issue(principal);
        tokenService.revokeUser(principal.id());

        ApiException exception = assertThrows(ApiException.class,
                () -> interceptor.preHandle(authenticatedRequest(token), null, new Object()));

        assertEquals(HttpStatus.FORBIDDEN, exception.getStatus());
        assertEquals("Tài khoản của bạn đã bị vô hiệu hóa.", exception.getMessage());
    }

    @Test
    void acceptsRequestWhenAccountIsActive() throws Exception {
        TokenService tokenService = new TokenService(12);
        JdbcTemplate jdbc = mock(JdbcTemplate.class);
        AuthInterceptor interceptor = new AuthInterceptor(tokenService, jdbc);
        AuthPrincipal principal = new AuthPrincipal(UUID.randomUUID(), "STUDENT");
        MockHttpServletRequest request = authenticatedRequest(tokenService.issue(principal));
        when(jdbc.queryForObject(any(String.class), eq(Boolean.class), eq(principal.id()))).thenReturn(true);

        boolean accepted = interceptor.preHandle(request, null, new Object());

        assertTrue(accepted);
        assertEquals(principal, request.getAttribute("principal"));
    }

    private static MockHttpServletRequest authenticatedRequest(String token) {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setMethod("GET");
        request.setRequestURI("/quizzes");
        request.setCookies(new Cookie("accessToken", token));
        return request;
    }
}
