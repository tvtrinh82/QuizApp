import { http } from '../core/http.js';

export const quizService = {
  // Lấy danh sách bộ đề
  async getQuizzes() {
    return await http.get('/quizzes');
  },

  // Lấy chi tiết một bộ đề kèm câu hỏi
  async getQuizById(quizId) {
    return await http.get(`/quizzes/${quizId}?_embed=questions`);
  },

  // Tạo mới một bộ đề
  async createQuiz(quizData) {
    return await http.post('/quizzes', quizData);
  },

  // Cập nhật bộ đề
  async updateQuiz(quizId, quizData) {
    return await http.request(`/quizzes/${quizId}`, {
      method: 'PATCH',
      body: JSON.stringify(quizData)
    });
  },

  // Tạo một câu hỏi mới cho bộ đề
  async createQuestion(questionData) {
    return await http.post('/questions', questionData);
  },
  
  // Xóa bộ đề (và json-server có thể không tự động xóa cascade questions, 
  // ta tạm thời gọi xóa bộ đề trước)
  async deleteQuiz(quizId) {
    return await http.delete(`/quizzes/${quizId}`);
  }
};
