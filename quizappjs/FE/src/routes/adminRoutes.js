import { globalState } from '../core/state.js';
import { authController } from '../controllers/authController.js';
import { adminController } from '../controllers/adminController.js';
import { Header, handleHeaderEvents } from '../appShell.js';

export const registerAdminRoutes = (router) => {
router.addRoute(
  '/admin/dashboard',
  () => {
    const { user } = globalState.getState();
    if (!user || user.role !== 'admin') {
      authController.redirectBasedOnRole(user?.role);
      return '';
    }
    return `
      ${Header()}
      <main id="admin-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Đang tải...</p>
      </main>
    `;
  },
  async () => {
    handleHeaderEvents();
    const container = document.getElementById('admin-main');
    if (container) {
      container.innerHTML = await adminController.renderDashboard();
      adminController.afterRenderDashboard();
    }
  }
);

// Route Chi tiết bộ đề (Thêm câu hỏi)
router.addRoute(
  '/admin/quiz',
  () => {
    const { user } = globalState.getState();
    if (!user || user.role !== 'admin') {
      authController.redirectBasedOnRole(user?.role);
      return '';
    }
    return `
      ${Header()}
      <main id="quiz-detail-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Đang tải...</p>
      </main>
    `;
  },
  async () => {
    handleHeaderEvents();
    const container = document.getElementById('quiz-detail-main');
    if (container) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      if (id) {
        container.innerHTML = await adminController.renderQuizDetail(id);
        adminController.afterRenderQuizDetail(id);
      } else {
        container.innerHTML = '<p class="text-red-500">ID bộ đề không hợp lệ</p>';
      }
    }
  }
);

// Route Quản lý Người dùng
router.addRoute(
  '/admin/users',
  () => {
    const { user } = globalState.getState();
    if (!user || user.role !== 'admin') {
      authController.redirectBasedOnRole(user?.role);
      return '';
    }
    return `
      ${Header()}
      <main id="admin-users-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Đang tải...</p>
      </main>
    `;
  },
  async () => {
    handleHeaderEvents();
    const container = document.getElementById('admin-users-main');
    if (container) {
      container.innerHTML = await adminController.renderUsers();
      adminController.afterRenderUsers();
    }
  }
);

// Route Quản lý Kết quả thi
router.addRoute(
  '/admin/results',
  () => {
    const { user } = globalState.getState();
    if (!user || user.role !== 'admin') {
      authController.redirectBasedOnRole(user?.role);
      return '';
    }
    return `
      ${Header()}
      <main id="admin-results-main" class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p>Đang tải...</p>
      </main>
    `;
  },
  async () => {
    handleHeaderEvents();
    const container = document.getElementById('admin-results-main');
    if (container) {
      container.innerHTML = await adminController.renderResults();
      adminController.afterRenderResults();
    }
  }
);

router.addRoute(
  '/admin/documents',
  () => {
    const { user } = globalState.getState();
    if (!user || user.role !== 'admin') {
      authController.redirectBasedOnRole(user?.role);
      return '';
    }
    return `
      ${Header()}
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div id="admin-content"></div>
      </main>
    `;
  },
  async () => {
    handleHeaderEvents();
    await adminController.renderDocuments();
  }
);
};
