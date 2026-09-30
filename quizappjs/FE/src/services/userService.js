import { http } from '../core/http.js';

export const userService = {
  async getUsers() {
    return await http.get('/users');
  },
  async deleteUser(id) {
    return await http.delete(`/users/${id}`);
  },
  async updateUser(id, data) {
    return await http.request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },
  async createUser(userData) {
    return await http.post('/users', userData);
  }
};
