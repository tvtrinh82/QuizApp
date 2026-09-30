import { globalState } from '../core/state.js';
import { authController } from '../controllers/authController.js';
import { studentController } from '../controllers/studentController.js';
import { Header, handleHeaderEvents } from '../appShell.js';

export const registerStudentRoutes = (router) => {
  router.addRoute(
    '/student/dashboard',
    () => {
      const { user } = globalState.getState();
      if (!user) {
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
        return '';
      }
      return `
        ${Header()}
        <main id="student-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <p>Đang tải...</p>
        </main>
      `;
    },
    async () => {
      handleHeaderEvents();
      const container = document.getElementById('student-main');
      if (container) {
        container.innerHTML = await studentController.renderDashboard();
        studentController.afterRenderDashboard();
      }
    }
  );

  router.addRoute(
    '/student/documents',
    () => {
      const { user } = globalState.getState();
      if (!user) {
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
        return '';
      }
      return `
        ${Header()}
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div id="student-content"></div>
        </main>
      `;
    },
    async () => {
      handleHeaderEvents();
      await studentController.renderDocuments();
    }
  );

  router.addRoute(
    '/student/take-quiz',
    () => {
      const { user } = globalState.getState();
      if (!user) {
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
        return '';
      }
      return `
        ${Header()}
        <main id="take-quiz-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <p>Đang chuẩn bị đề thi...</p>
        </main>
      `;
    },
    async () => {
      handleHeaderEvents();
      const container = document.getElementById('take-quiz-main');
      if (container) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
          container.innerHTML = await studentController.renderTakeQuiz(id);
          studentController.afterRenderTakeQuiz(id);
        } else {
          container.innerHTML = '<p class="text-red-500">ID bộ đề không hợp lệ</p>';
        }
      }
    }
  );
  
  router.addRoute(
    '/student/review-history',
    () => {
      const { user } = globalState.getState();
      if (!user) {
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
        return '';
      }
      return `
        ${Header()}
        <main id="review-history-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <p>Đang tải dữ liệu bài làm...</p>
        </main>
      `;
    },
    async () => {
      handleHeaderEvents();
      const container = document.getElementById('review-history-main');
      if (container) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
          await studentController.renderHistoryReview(id, container);
        } else {
          container.innerHTML = '<p class="text-red-500">ID kết quả không hợp lệ</p>';
        }
      }
    }
  );

  router.addRoute(
    '/student/results',
    () => {
      const { user } = globalState.getState();
      if (!user) {
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
        return '';
      }
      return `
        ${Header()}
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div id="student-results-main">
            <p>Đang tải kết quả bài thi...</p>
          </div>
        </main>
      `;
    },
    async () => {
      handleHeaderEvents();
      const container = document.getElementById('student-results-main');
      if (container) {
        container.innerHTML = await studentController.renderResults();
      }
    }
  );
};
