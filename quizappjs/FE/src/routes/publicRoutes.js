import { globalState } from '../core/state.js';
import { authController } from '../controllers/authController.js';

export const registerPublicRoutes = (router) => {
router.addRoute('/', () => {
  const { user } = globalState.getState();
  if (user) {
    // Nếu đã đăng nhập, setTimeout để router không bị loop khi render
    setTimeout(() => authController.redirectBasedOnRole(user.role), 0);
    return '';
  }
  return `<div class="p-8 text-center">
            <h1 class="text-3xl font-bold text-blue-600">Hệ thống thi trắc nghiệm</h1>
            <div class="mt-8 flex justify-center gap-4">
              <button onclick="window.history.pushState({}, '', '/login'); window.dispatchEvent(new Event('popstate'));" class="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Bắt đầu</button>
            </div>
          </div>`;
});

// Route Đăng nhập
router.addRoute(
  '/login',
  () => authController.renderLogin(),
  () => authController.afterRenderLogin()
);

// Route Đăng ký
router.addRoute(
  '/register',
  () => authController.renderRegister(),
  () => authController.afterRenderRegister()
);
};
