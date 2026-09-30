import { http } from '../core/http.js';

export const documentService = {
  async getDocuments() {
    return await http.get('/documents');
  },

  async getDocument(id) {
    return await http.get(`/documents/${id}`);
  },

  async addDocument(doc) {
    return await http.post('/documents', doc);
  },

  async updateDocument(id, doc) {
    return await http.put(`/documents/${id}`, doc);
  },

  async deleteDocument(id) {
    return await http.delete(`/documents/${id}`);
  },
};
