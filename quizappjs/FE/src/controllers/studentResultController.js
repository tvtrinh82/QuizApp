import { resultService } from '../services/resultService.js';
import { globalState } from '../core/state.js';
import { StudentResultsView } from '../views/pages/student/results.js';

export const studentResultController = {
  async renderResults() {
    try {
      const { user } = globalState.getState();
      const allResults = await resultService.getResults();
      
      const studentResults = allResults
        .filter(r => r.userId === user.id)
        .reverse();
      
      return StudentResultsView(studentResults);
    } catch (error) {
      return `<p class="text-red-500">Lỗi tải danh sách kết quả: ${error.message}</p>`;
    }
  }
};
