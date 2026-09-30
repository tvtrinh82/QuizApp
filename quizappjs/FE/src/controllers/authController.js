import { LoginView } from '../views/pages/login.js';
import { RegisterView } from '../views/pages/register.js';
import { authService } from '../services/authService.js';
import { authProfileController } from './authProfileController.js';
import { globalState } from '../core/state.js';

export const authController = {
  renderLogin() {
    // 1. Nếu đã đăng nhập thì chuyển hướng
    const { user } = globalState.getState();
    if (user) {
      this.redirectBasedOnRole(user.role);
      return ''; // Sẽ bị ghi đè bởi router vì pushState sẽ gọi route mới
    }

    // 2. Trả về HTML cho Router
    return LoginView();
  },

  afterRenderLogin() {
    const form = document.getElementById('login-form');
    if (!form) return;

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            e.currentTarget.textContent = '🙈';
          } else {
            input.type = 'password';
            e.currentTarget.textContent = '👁️';
          }
        }
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('error-message');

      errorDiv.classList.add('hidden');

      try {
        const user = await authService.login(email, password);
        this.redirectBasedOnRole(user.role);
      } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('hidden');
      }
    });

    // Bắt sự kiện chuyển hướng trang đăng ký
    const registerLink = document.querySelector('a[href="/register"]');
    if (registerLink) {
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.pushState({}, '', '/register');
        window.dispatchEvent(new Event('popstate'));
      });
    }
  },

  renderRegister() {
    const { user } = globalState.getState();
    if (user) {
      this.redirectBasedOnRole(user.role);
      return '';
    }
    return RegisterView();
  },

  afterRenderRegister() {
    const form = document.getElementById('register-form');
    if (!form) return;

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            e.currentTarget.textContent = '🙈';
          } else {
            input.type = 'password';
            e.currentTarget.textContent = '👁️';
          }
        }
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;
      const errorDiv = document.getElementById('reg-error-message');
      const btnSubmit = document.getElementById('reg-submit-btn');

      errorDiv.classList.add('hidden');

      if (password.length < 4) {
        errorDiv.textContent = 'Mật khẩu phải có ít nhất 4 ký tự.';
        errorDiv.classList.remove('hidden');
        return;
      }

      if (password !== confirmPassword) {
        errorDiv.textContent = 'Mật khẩu xác nhận không khớp.';
        errorDiv.classList.remove('hidden');
        return;
      }

      try {
        btnSubmit.textContent = 'ĐANG XỬ LÝ...';
        btnSubmit.disabled = true;

        await authService.register(email, password, name);
        alert('Tạo tài khoản thành công! Vui lòng đăng nhập.');
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
      } catch (error) {
        errorDiv.textContent = 'Đăng ký thất bại. Email có thể đã tồn tại.';
        errorDiv.classList.remove('hidden');
        btnSubmit.textContent = 'TẠO TÀI KHOẢN';
        btnSubmit.disabled = false;
      }
    });

    const loginLink = document.querySelector('a[href="/login"]');
    if (loginLink) {
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new Event('popstate'));
      });
    }
  },

  redirectBasedOnRole(role) {
    if (role === 'admin') {
      window.history.pushState({}, '', '/admin/dashboard');
    } else {
      window.history.pushState({}, '', '/student/dashboard');
    }
    window.dispatchEvent(new Event('popstate'));
  },

  logout() {
    authService.logout();
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new Event('popstate'));
  },

  showProfileModal: authProfileController.showProfileModal

};
