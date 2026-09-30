package com.example.be.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class QuizApiController {
    private final QuizApiService service;
    private final TokenService tokenService;
    private final boolean cookieSecure;

    public QuizApiController(
            QuizApiService service,
            TokenService tokenService,
            @Value("${app.auth.cookie-secure:false}") boolean cookieSecure) {
        this.service = service;
        this.tokenService = tokenService;
        this.cookieSecure = cookieSecure;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody Map<String, Object> body, HttpServletResponse response) {
        return loginResponse(service.login(body), response);
    }

    @PostMapping("/register")
    public Map<String, Object> register(
            @RequestBody Map<String, Object> body, HttpServletResponse response) {
        return loginResponse(service.register(body), response);
    }

    @PostMapping("/api/auth/logout")
    public Map<String, String> logout(HttpServletRequest request, HttpServletResponse response) {
        String token = accessToken(request);
        if (token != null) {
            tokenService.revoke(token);
        }
        response.addHeader("Set-Cookie", ResponseCookie.from("accessToken", "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .sameSite("Lax")
                .maxAge(0)
                .build().toString());
        return Map.of("message", "Đã đăng xuất.");
    }

    @GetMapping("/users")
    public List<Map<String, Object>> users(HttpServletRequest request) {
        requireAdmin(request);
        return service.getUsers();
    }

    @PostMapping("/users")
    public Map<String, Object> createUser(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        requireAdmin(request);
        return service.createUser(body);
    }

    @PatchMapping("/users/{id}")
    public Map<String, Object> updateUser(
            @PathVariable String id, @RequestBody Map<String, Object> body, HttpServletRequest request) {
        AuthPrincipal principal = principal(request);
        UUID userId = parseUuid(id);
        if (!principal.isAdmin() && !principal.id().equals(userId)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Bạn không có quyền cập nhật tài khoản này.");
        }
        if (!principal.isAdmin() && body.containsKey("role")) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Không thể tự thay đổi vai trò.");
        }
        return service.updateUser(userId, body);
    }

    @DeleteMapping("/users/{id}")
    public Map<String, String> deleteUser(@PathVariable String id, HttpServletRequest request) {
        requireAdmin(request);
        service.deleteUser(parseUuid(id));
        return Map.of("status", "deleted");
    }

    @GetMapping("/quizzes")
    public List<Map<String, Object>> quizzes() {
        return service.getQuizzes();
    }

    @PostMapping("/api/quizzes/{quizId}/start")
    public Map<String, Object> startQuiz(@PathVariable String quizId, HttpServletRequest request) {
        AuthPrincipal principal = principal(request);
        if (principal.isAdmin()) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Chỉ học sinh mới có thể bắt đầu làm bài.");
        }
        return service.startQuiz(parseUuid(quizId), principal);
    }

    @GetMapping("/api/quizzes/{quizId}/status")
    public Map<String, Object> quizAttemptStatus(@PathVariable String quizId, HttpServletRequest request) {
        AuthPrincipal principal = principal(request);
        if (principal.isAdmin()) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Chỉ học sinh mới có thể xem trạng thái bài thi.");
        }
        return service.getQuizAttemptStatus(parseUuid(quizId), principal);
    }

    @GetMapping("/quizzes/{id}")
    public Map<String, Object> quiz(@PathVariable String id, HttpServletRequest request) {
        return service.getQuiz(parseUuid(id), principal(request));
    }

    @PostMapping("/quizzes")
    public Map<String, Object> createQuiz(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        requireAdmin(request);
        return service.createQuiz(body, principal(request));
    }

    @PatchMapping("/quizzes/{id}")
    public Map<String, Object> updateQuiz(
            @PathVariable String id, @RequestBody Map<String, Object> body, HttpServletRequest request) {
        requireAdmin(request);
        return service.updateQuiz(parseUuid(id), body);
    }

    @DeleteMapping("/quizzes/{id}")
    public Map<String, String> deleteQuiz(@PathVariable String id, HttpServletRequest request) {
        requireAdmin(request);
        service.deleteQuiz(parseUuid(id));
        return Map.of("status", "deleted");
    }

    @PostMapping("/questions")
    public Map<String, Object> createQuestion(
            @RequestBody Map<String, Object> body, HttpServletRequest request) {
        requireAdmin(request);
        return service.createQuestion(body);
    }

    @GetMapping("/results")
    public List<Map<String, Object>> results(HttpServletRequest request) {
        return service.getResults(principal(request));
    }

    @GetMapping("/results/{id}")
    public Map<String, Object> result(@PathVariable String id, HttpServletRequest request) {
        return service.getResult(parseUuid(id), principal(request));
    }

    @PostMapping("/results")
    public Map<String, Object> saveResult(
            @RequestBody Map<String, Object> body, HttpServletRequest request) {
        AuthPrincipal principal = principal(request);
        if (principal.isAdmin()) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Chỉ tài khoản học sinh có thể nộp bài.");
        }
        return service.saveResult(body, principal);
    }

    private static void requireAdmin(HttpServletRequest request) {
        if (!principal(request).isAdmin()) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Chỉ quản trị viên mới có quyền thực hiện thao tác này.");
        }
    }

    private static AuthPrincipal principal(HttpServletRequest request) {
        Object principal = request.getAttribute("principal");
        if (!(principal instanceof AuthPrincipal authPrincipal)) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Vui lòng đăng nhập.");
        }
        return authPrincipal;
    }

    private static UUID parseUuid(String value) {
        try {
            return UUID.fromString(value);
        } catch (IllegalArgumentException exception) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "ID không hợp lệ.");
        }
    }

    private Map<String, Object> loginResponse(Map<String, Object> authResult, HttpServletResponse response) {
        String token = (String) authResult.remove("accessToken");
        response.addHeader("Set-Cookie", ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(cookieSecure)
                .path("/")
                .sameSite("Lax")
                .maxAge(tokenService.ttlSeconds())
                .build().toString());
        return authResult;
    }

    private static String accessToken(HttpServletRequest request) {
        jakarta.servlet.http.Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        for (jakarta.servlet.http.Cookie cookie : cookies) {
            if ("accessToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
