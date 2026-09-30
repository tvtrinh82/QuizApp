package com.example.be.api;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class QuizApiService {
    private final AuthApiService authService;
    private final UserApiService userService;
    private final QuizContentApiService quizService;
    private final ResultApiService resultService;

    public QuizApiService(
            AuthApiService authService,
            UserApiService userService,
            QuizContentApiService quizService,
            ResultApiService resultService) {
        this.authService = authService;
        this.userService = userService;
        this.quizService = quizService;
        this.resultService = resultService;
    }

    public Map<String, Object> login(Map<String, Object> body) {
        return authService.login(body);
    }

    public Map<String, Object> register(Map<String, Object> body) {
        return authService.register(body);
    }

    public List<Map<String, Object>> getUsers() {
        return userService.getUsers();
    }

    public Map<String, Object> createUser(Map<String, Object> body) {
        return userService.createUser(body);
    }

    public Map<String, Object> updateUser(UUID id, Map<String, Object> body) {
        return userService.updateUser(id, body);
    }

    public void deleteUser(UUID id) {
        userService.deleteUser(id);
    }

    public List<Map<String, Object>> getQuizzes() {
        return quizService.getQuizzes();
    }

    public Map<String, Object> startQuiz(UUID quizId, AuthPrincipal principal) {
        return quizService.startQuiz(quizId, principal);
    }

    public Map<String, Object> getQuizAttemptStatus(UUID quizId, AuthPrincipal principal) {
        return quizService.getQuizAttemptStatus(quizId, principal);
    }

    public Map<String, Object> getQuiz(UUID id, AuthPrincipal principal) {
        return quizService.getQuiz(id, principal);
    }

    public Map<String, Object> createQuiz(Map<String, Object> body, AuthPrincipal principal) {
        return quizService.createQuiz(body, principal);
    }

    public Map<String, Object> updateQuiz(UUID id, Map<String, Object> body) {
        return quizService.updateQuiz(id, body);
    }

    public void deleteQuiz(UUID id) {
        quizService.deleteQuiz(id);
    }

    public Map<String, Object> createQuestion(Map<String, Object> body) {
        return quizService.createQuestion(body);
    }

    public List<Map<String, Object>> getResults(AuthPrincipal principal) {
        return resultService.getResults(principal);
    }

    public Map<String, Object> getResult(UUID resultId, AuthPrincipal principal) {
        return resultService.getResult(resultId, principal);
    }

    public Map<String, Object> saveResult(Map<String, Object> body, AuthPrincipal principal) {
        return resultService.saveResult(body, principal);
    }
}
