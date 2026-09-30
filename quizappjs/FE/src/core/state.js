class State {
  constructor() {
    this.listeners = [];
    
    // Khôi phục dữ liệu từ localStorage
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    this.state = {
      user: savedUser ? JSON.parse(savedUser) : null,
      token: savedToken || null,
    };
  }

  // Đăng ký component lắng nghe khi state thay đổi
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Cập nhật state và thông báo cho listeners
  setState(newState) {
    this.state = { ...this.state, ...newState };
    
    // Lưu vào localStorage nếu có user/token
    if (newState.user !== undefined) {
      if (newState.user) localStorage.setItem('user', JSON.stringify(newState.user));
      else localStorage.removeItem('user');
    }
    
    if (newState.token !== undefined) {
      if (newState.token) localStorage.setItem('token', newState.token);
      else localStorage.removeItem('token');
    }

    // Thông báo cho tất cả listeners
    this.listeners.forEach(listener => listener(this.state));
  }

  getState() {
    return this.state;
  }
}

export const globalState = new State();
