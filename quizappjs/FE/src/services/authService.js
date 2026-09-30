import { http } from '../core/http.js';
import { globalState } from '../core/state.js';

export const authService = {
  async login(email, password) {
    try {
      // json-server-auth sử dụng /login để xác thực
      const response = await http.post('/login', { email, password });
      
      // json-server-auth trả về user và accessToken
      const { accessToken, user } = response;

      if (user.status === 'locked') {
        throw new Error('Tài khoản của bạn đã bị khóa bởi Quản trị viên!');
      }
      
      // Lưu vào global state (kèm theo localStorage)
      globalState.setState({ token: accessToken, user });
      
      return user;
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      if (error.message.includes('khóa')) throw error;
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }
  },

  async logout() {
    try {
      await http.post('/logout', {}); // Gọi BE để xóa cookie
    } catch (e) {
      console.warn('Lỗi khi logout:', e);
    }
    globalState.setState({ token: null, user: null });
  },
  
  // Hàm giả lập để tạo dữ liệu nếu db chưa có
  async register(email, password, name = '') {
    try {
      const response = await http.post('/register', { email, password, name });
      return response;
    } catch (error) {
      throw error;
    }
  }
};
