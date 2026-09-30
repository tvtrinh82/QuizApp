import { authController } from './controllers/authController.js';
import { globalState } from './core/state.js';
import { showConfirm } from './utils/modal.js';

export const initDarkMode = () => {
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  document.body.classList.add('bg-slate-50', 'dark:bg-slate-900', 'text-slate-900', 'dark:text-slate-100', 'transition-colors');
};

const toggleDarkMode = () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};
window.toggleDarkMode = toggleDarkMode;

export const Header = () => {
  const { user } = globalState.getState();
  if (!user) return '';

  const currentPath = window.location.pathname;
  let navLinks = '';

  if (user.role === 'admin') {
    navLinks = `
      <a href="/admin/dashboard" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/admin/dashboard' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}">Quản lý bộ đề</a>
      <a href="/admin/documents" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/admin/documents' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}">Quản lý tài liệu</a>
      <a href="/admin/users" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/admin/users' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}">Quản lý người dùng</a>
      <a href="/admin/results" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/admin/results' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}">Kết quả bài thi</a>
    `;
  } else {
    navLinks = `
      <a href="/student/dashboard" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/student/dashboard' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}">Trang chủ</a>
      <a href="/student/documents" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/student/documents' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}">Tài liệu học tập</a>
      <a href="/student/results" class="nav-link px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/student/results' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}">Kết quả bài thi</a>
    `;
  }

  return `
    <header class="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow border-b border-slate-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a href="/student/dashboard" class="nav-link-logo text-2xl font-extrabold text-blue-800 dark:text-blue-400 mr-8 hover:opacity-80 transition cursor-pointer">Quiz App</a>
            <nav class="hidden md:flex space-x-4">
              ${navLinks}
            </nav>
          </div>
          <div class="flex items-center gap-2 md:gap-4">
            <button onclick="window.toggleDarkMode()" class="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition focus:outline-none" aria-label="Toggle Dark Mode">
              <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <svg class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            </button>
            <button id="btn-edit-profile" class="hidden md:flex text-gray-600 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition items-center gap-2">
              <span class="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-2">
                👤 <span class="max-w-[100px] truncate">${user.name}</span>
              </span>
            </button>
            <button id="btn-logout" class="hidden md:block text-sm bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded shadow-sm transition">Đăng xuất</button>
            <button id="btn-mobile-menu" class="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" class="hidden md:hidden border-t border-gray-200 dark:border-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1 flex flex-col">
          ${navLinks.replace(/nav-link /g, 'nav-link block ')}
        </div>
        <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3">
           <button id="btn-edit-profile-mobile" class="text-gray-600 dark:text-gray-300 font-medium text-left w-full flex items-center gap-2">
              👤 ${user.name} (Sửa thông tin)
           </button>
           <button id="btn-logout-mobile" class="w-full text-center text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow-sm transition">Đăng xuất</button>
        </div>
      </div>
    </header>
  `;
};

export const handleHeaderEvents = () => {
  const logoutHandler = () => {
    showConfirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?', 'Đăng xuất', () => {
      authController.logout();
    });
  };

  const btn = document.getElementById('btn-logout');
  if (btn) btn.addEventListener('click', logoutHandler);
  const btnMobile = document.getElementById('btn-logout-mobile');
  if (btnMobile) btnMobile.addEventListener('click', logoutHandler);

  const profileHandler = () => authController.showProfileModal();
  const btnProfile = document.getElementById('btn-edit-profile');
  if (btnProfile) btnProfile.addEventListener('click', profileHandler);
  const btnProfileMobile = document.getElementById('btn-edit-profile-mobile');
  if (btnProfileMobile) btnProfileMobile.addEventListener('click', profileHandler);

  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  document.querySelectorAll('header .nav-link, header .nav-link-logo').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      window.history.pushState({}, '', href);
      window.dispatchEvent(new Event('popstate'));
    });
  });
};
