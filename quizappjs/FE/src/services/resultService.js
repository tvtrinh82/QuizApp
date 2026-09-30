import { http } from '../core/http.js';

export const resultService = {
  // Lấy danh sách kết quả, kèm theo thông tin user và quiz thông qua tính năng _expand của json-server
  async getResults() {
    return await http.get('/results?_expand=user&_expand=quiz');
  },
  
  // Lưu kết quả khi học sinh nộp bài
  async saveResult(resultData) {
    return await http.post('/results', resultData);
  },

  // Lấy chi tiết kết quả thi (có thể bao gồm answers nếu BE hỗ trợ)
  async getResultById(id) {
    return await http.get(`/results/${id}?_expand=user&_expand=quiz`);
  }
};
