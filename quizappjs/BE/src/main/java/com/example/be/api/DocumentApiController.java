package com.example.be.api;

import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/documents")
public class DocumentApiController {

    private final DocumentApiService service;

    public DocumentApiController(DocumentApiService service) {
        this.service = service;
    }

    @GetMapping
    public List<Map<String, Object>> getDocuments(HttpServletRequest request) {
        // Mọi học sinh đã đăng nhập đều có thể lấy danh sách tài liệu
        return service.getAllDocuments();
    }

    @GetMapping("/{id}")
    public Map<String, Object> getDocument(@PathVariable String id, HttpServletRequest request) {
        return service.getDocument(id);
    }

    @PostMapping
    public Map<String, Object> createDocument(@RequestBody Map<String, Object> body, HttpServletRequest request) {
        requireAdmin(request);
        AuthPrincipal principal = (AuthPrincipal) request.getAttribute("principal");
        return service.createDocument(body, principal);
    }

    @PatchMapping("/{id}")
    public Map<String, Object> updateDocument(@PathVariable String id, @RequestBody Map<String, Object> body, HttpServletRequest request) {
        requireAdmin(request);
        return service.updateDocument(id, body);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteDocument(@PathVariable String id, HttpServletRequest request) {
        requireAdmin(request);
        service.deleteDocument(id);
        return Map.of("message", "Đã xóa tài liệu");
    }

    private void requireAdmin(HttpServletRequest request) {
        AuthPrincipal principal = (AuthPrincipal) request.getAttribute("principal");
        // Kiểm tra đúng Role Admin
        if (principal == null || !"ADMIN".equals(principal.role())) {
            throw new ApiException(org.springframework.http.HttpStatus.FORBIDDEN, "Chỉ admin mới có quyền quản lý tài liệu.");
        }
    }
}
