package com.example.be.api;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class QuizApiControllerTest {
    @Test
    void loginSetsHttpOnlyCookieAndDoesNotReturnTokenInBody() {
        QuizApiService service = mock(QuizApiService.class);
        TokenService tokenService = new TokenService(12);
        QuizApiController controller = new QuizApiController(service, tokenService, false);
        Map<String, Object> loginResult = new HashMap<>();
        loginResult.put("accessToken", "issued-token");
        loginResult.put("user", Map.of("id", UUID.randomUUID().toString()));
        when(service.login(Map.of("email", "student@example.com", "password", "secret")))
                .thenReturn(loginResult);
        MockHttpServletResponse response = new MockHttpServletResponse();

        Map<String, Object> body = controller.login(
                Map.of("email", "student@example.com", "password", "secret"), response);

        String setCookie = response.getHeader("Set-Cookie");
        assertNotNull(setCookie);
        assertTrue(setCookie.contains("accessToken=issued-token"));
        assertTrue(setCookie.contains("HttpOnly"));
        assertTrue(setCookie.contains("Path=/"));
        assertTrue(setCookie.contains("SameSite=Lax"));
        assertFalse(body.containsKey("accessToken"));
    }

    @Test
    void logoutRevokesCurrentTokenAndExpiresCookie() {
        QuizApiService service = mock(QuizApiService.class);
        TokenService tokenService = new TokenService(12);
        QuizApiController controller = new QuizApiController(service, tokenService, false);
        String token = tokenService.issue(new AuthPrincipal(UUID.randomUUID(), "STUDENT"));
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setCookies(new Cookie("accessToken", token));
        MockHttpServletResponse response = new MockHttpServletResponse();

        controller.logout(request, response);

        assertNull(tokenService.resolve(token));
        assertTrue(response.getHeader("Set-Cookie").contains("Max-Age=0"));
    }
}
