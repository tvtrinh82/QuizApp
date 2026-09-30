// Simple HTTP wrapper for fetch API
const API_URL = 'http://localhost:8080';

export const http = {
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
      credentials: 'include', // Kích hoạt gửi và nhận HttpOnly Cookie
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // Cố gắng đọc nội dung lỗi từ Backend gửi về
        let errorMessage = `Lỗi HTTP: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          // Nếu không parse được JSON thì giữ nguyên lỗi mặc định
        }
        
        // Nếu là lỗi 403 Vô hiệu hóa hoặc 401 Hết hạn, có thể tự động đẩy về trang đăng nhập
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          // Không chuyển trang ngay ở đây để UI kịp bắt lỗi và hiển thị thông báo
        }

        throw new Error(errorMessage);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error.message);
      throw error;
    }
  },

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  },

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
};
