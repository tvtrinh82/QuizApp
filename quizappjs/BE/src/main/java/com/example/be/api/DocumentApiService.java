package com.example.be.api;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
class DocumentApiService {

    private final JdbcTemplate jdbc;

    DocumentApiService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> getAllDocuments() {
        return jdbc.query("""
                SELECT id, title, subject, link, description, author_id, created_at
                FROM documents ORDER BY created_at DESC
                """, (rs, rowNum) -> ApiDataMapper.documentRow(rs));
    }

    public Map<String, Object> getDocument(String id) {
        UUID documentId = ApiDataMapper.uuid(id);
        List<Map<String, Object>> rows = jdbc.query("""
                SELECT id, title, subject, link, description, author_id, created_at
                FROM documents WHERE id = ?
                """, (rs, rowNum) -> ApiDataMapper.documentRow(rs), documentId);
        if (rows.isEmpty()) {
            throw new ApiException(org.springframework.http.HttpStatus.NOT_FOUND, "Không tìm thấy tài liệu");
        }
        return rows.get(0);
    }

    public Map<String, Object> createDocument(Map<String, Object> body, AuthPrincipal principal) {
        String title = ApiDataMapper.requiredText(body, "title");
        String subject = ApiDataMapper.requiredText(body, "subject");
        String link = ApiDataMapper.requiredText(body, "link");
        String description = ApiDataMapper.text(body, "description");

        return jdbc.queryForObject("""
                INSERT INTO documents (title, subject, link, description, author_id)
                VALUES (?, ?, ?, ?, ?)
                RETURNING id, title, subject, link, description, author_id, created_at
                """, (rs, rowNum) -> ApiDataMapper.documentRow(rs),
                title, subject, link, description, principal.id());
    }

    public Map<String, Object> updateDocument(String id, Map<String, Object> body) {
        UUID documentId = ApiDataMapper.uuid(id);
        List<Map<String, Object>> rows = jdbc.query("""
                UPDATE documents SET title = COALESCE(?, title), subject = COALESCE(?, subject),
                    link = COALESCE(?, link), description = COALESCE(?, description)
                WHERE id = ?
                RETURNING id, title, subject, link, description, author_id, created_at
                """, (rs, rowNum) -> ApiDataMapper.documentRow(rs),
                body.get("title"), body.get("subject"), body.get("link"), body.get("description"), documentId);
        if (rows.isEmpty()) {
            throw new ApiException(org.springframework.http.HttpStatus.NOT_FOUND, "Không tìm thấy tài liệu");
        }
        return rows.get(0);
    }

    public void deleteDocument(String id) {
        int rows = jdbc.update("DELETE FROM documents WHERE id = ?", ApiDataMapper.uuid(id));
        if (rows == 0) {
            throw new ApiException(org.springframework.http.HttpStatus.NOT_FOUND, "Không tìm thấy tài liệu");
        }
    }
}
