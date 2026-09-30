import { quizService } from '../services/quizService.js';
import { resultService } from '../services/resultService.js';
import { StudentDashboardView, renderQuizCards } from '../views/pages/student/dashboard.js';
import { globalState } from '../core/state.js';

export const studentDashboardController = {
  currentActiveQuizzes: [],
  currentStudentResults: [], // Store results for filtering
  async renderDashboard() {
    try {
      const { user } = globalState.getState();
      const quizzes = await quizService.getQuizzes();
      // Chỉ hiển thị những đề thi chưa bị đóng
      this.currentActiveQuizzes = quizzes.filter(q => !q.status || q.status === 'active');
      
      const allResults = await resultService.getResults();
      // Lọc kết quả của học sinh hiện tại, sắp xếp mới nhất lên đầu
      const studentResults = allResults
        .filter(r => r.userId === user.id)
        .reverse();
      this.currentStudentResults = studentResults; // Save for filter

      // Tính toán Leaderboard
      const userStats = {};
      allResults.forEach(r => {
        if (!userStats[r.userId]) {
          userStats[r.userId] = {
            userId: r.userId,
            userName: r.user?.name || 'Học sinh',
            totalTaken: 0,
            totalScore: 0,
            totalCorrect: 0
          };
        }
        userStats[r.userId].totalTaken++;
        userStats[r.userId].totalScore += r.score;
        userStats[r.userId].totalCorrect += (r.correctCount || 0);
      });

      const leaderboard = Object.values(userStats).map(stat => {
        return {
          ...stat,
          avgScore: stat.totalScore / stat.totalTaken
        };
      }).sort((a, b) => b.avgScore - a.avgScore || b.totalCorrect - a.totalCorrect).slice(0, 5);

      return StudentDashboardView(this.currentActiveQuizzes, studentResults, user, leaderboard);
    } catch (error) {
      return `<p class="text-red-500">Thông báo: ${error.message}</p>`;
    }
  },

  afterRenderDashboard() {
    // Tìm kiếm và lọc
    const searchInput = document.getElementById('search-quiz-student');
    const subjectFilter = document.getElementById('filter-quiz-subject');
    const grid = document.getElementById('student-quizzes-grid');

    const filterQuizzes = () => {
      if (!grid) return;
      const query = searchInput ? searchInput.value.toLowerCase() : '';
      const subject = subjectFilter ? subjectFilter.value.toLowerCase() : 'all';

      const filtered = this.currentActiveQuizzes.filter(q => {
        const matchTitle = q.title.toLowerCase().includes(query);
        const qSub = q.subject ? q.subject.toLowerCase() : '';
        const matchSub = subject === 'all' || qSub === subject;
        return matchTitle && matchSub;
      });

      grid.innerHTML = renderQuizCards(filtered, this.currentStudentResults);
      this.bindStartQuizEvents();
    };

    if (searchInput) searchInput.addEventListener('input', filterQuizzes);
    if (subjectFilter) subjectFilter.addEventListener('change', filterQuizzes);

    this.bindStartQuizEvents();
  },

  bindStartQuizEvents() {
    document.querySelectorAll('.btn-start-quiz').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.history.pushState({}, '', `/student/take-quiz?id=${id}`);
        window.dispatchEvent(new Event('popstate'));
      });
    });
  },


};
