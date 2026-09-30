export const LoginView = () => {
  return `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Đăng Nhập</h2>
          <p class="text-gray-500 dark:text-gray-400">Chào mừng bạn quay trở lại Quiz App!</p>
        </div>
        
        <form id="login-form" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" id="email" required class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="admin@quiz.com">
          </div>
          
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
            <input type="password" id="password" required class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 pr-10" placeholder="••••••••">
            <button type="button" class="toggle-password absolute bottom-2 right-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" data-target="password">
              👁️
            </button>
          </div>
          
          <div id="error-message" class="text-red-500 text-sm hidden font-medium"></div>
          
          <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Đăng nhập
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Chưa có tài khoản? 
            <a href="/register" class="font-medium text-blue-600 dark:text-blue-400 hover:underline">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </div>
  `;
};
