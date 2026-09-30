package com.example.be.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    private final TokenService tokenService;
    private final JdbcTemplate jdbc;

    public AuthInterceptor(TokenService tokenService, JdbcTemplate jdbc) {
        this.tokenService = tokenService;
        this.jdbc = jdbc;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (HttpMethod.OPTIONS.matches(request.getMethod())
                || (HttpMethod.POST.matches(request.getMethod())
                    && ("/login".equals(request.getRequestURI()) || "/register".equals(request.getRequestURI())
                        || "/api/auth/logout".equals(request.getRequestURI())))
                || (HttpMethod.GET.matches(request.getMethod()) && "/health".equals(request.getRequestURI()))) {
            return true;
        }

        String token = accessToken(request);
        if (token == null) {
            throw new ApiException(org.springframework.http.HttpStatus.UNAUTHORIZED, "Vui lòng đăng nhập.");
        }
        if (tokenService.wasRevoked(token)) {
            throw new ApiException(org.springframework.http.HttpStatus.FORBIDDEN, "Tài khoản của bạn đã bị vô hiệu hóa.");
        }
        AuthPrincipal principal = tokenService.resolve(token);
        if (principal == null) {
            throw new ApiException(org.springframework.http.HttpStatus.UNAUTHORIZED, "Phiên đăng nhập không hợp lệ hoặc đã hết hạn.");
        }
        Boolean active = jdbc.queryForObject(
                "SELECT EXISTS (SELECT 1 FROM users WHERE id = ? AND is_active = TRUE)",
                Boolean.class, principal.id());
        if (!Boolean.TRUE.equals(active)) {
            tokenService.revokeUser(principal.id());
            throw new ApiException(org.springframework.http.HttpStatus.FORBIDDEN, "Tài khoản của bạn đã bị vô hiệu hóa.");
        }
        request.setAttribute("principal", principal);
        return true;
    }

    private static String accessToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if ("accessToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
