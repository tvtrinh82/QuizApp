import { userService } from '../services/userService.js';
import { globalState } from '../core/state.js';
import { AdminUsersView, renderUserTableBody } from '../views/pages/admin/users.js';
import { showConfirm, showAlert } from '../utils/modal.js';

export const adminUserController = {
  currentUsers: [],
  async renderUsers() {
    try {
      const { user } = globalState.getState();
      if (user.role !== 'admin') {
        return `<p class="text-red-500 text-center mt-10 text-xl font-bold">Bạn không có quyền truy cập trang này!</p>`;
      }
      this.currentUsers = await userService.getUsers();
      return AdminUsersView(this.currentUsers);
    } catch (error) {
      return `<p class="text-red-500">Lỗi tải danh sách người dùng: ${error.message}</p>`;
    }
  },

  afterRenderUsers() {
    const searchInput = document.getElementById('search-user');
    const roleSelect = document.getElementById('filter-user-role');
    const statusSelect = document.getElementById('filter-user-status');
    const tbody = document.getElementById('user-tbody');
    
    const filterUsers = () => {
      if (!tbody || !renderUserTableBody) return;
      const query = searchInput.value.toLowerCase();
      const role = roleSelect.value;
      const status = statusSelect.value;
      
      const filtered = this.currentUsers.filter(u => {
        const matchQuery = (u.name || '').toLowerCase().includes(query) || (u.email || '').toLowerCase().includes(query);
        const matchRole = role === 'all' || u.role === role;
        let uStatus = u.status || 'active';
        const matchStatus = status === 'all' || uStatus === status;
        
        return matchQuery && matchRole && matchStatus;
      });
      
      tbody.innerHTML = renderUserTableBody(filtered);
      this.bindUserRowEvents();
    };

    if (searchInput) searchInput.addEventListener('input', filterUsers);
    if (roleSelect) roleSelect.addEventListener('change', filterUsers);
    if (statusSelect) statusSelect.addEventListener('change', filterUsers);

    this.bindUserRowEvents();
    
    // Thêm người dùng (Hiển thị modal)
    const btnAddUser = document.getElementById('btn-add-user');
    if (btnAddUser) {
      btnAddUser.addEventListener('click', () => {
        const modalHtml = `
          <div id="user-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all p-8 scale-100">
              <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b dark:border-slate-700 pb-3">👤 Thêm Người Dùng</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Họ Tên</label>
                  <input type="text" id="mu-name" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Nguyễn Văn A">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input type="email" id="mu-email" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="email@quiz.com">
                </div>
                <div class="relative group">
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mật khẩu</label>
                  <input type="password" id="mu-pass" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 pr-12" value="123456">
                  <button type="button" class="toggle-password absolute bottom-2 right-2 flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300" data-target="mu-pass">
                    👁️
                  </button>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Vai trò</label>
                  <select id="mu-role" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500">
                    <option value="student">Học sinh</option>
                    <option value="admin">Giáo viên</option>
                  </select>
                </div>
                <div id="mu-subject-group" class="hidden">
                  <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Môn giảng dạy (Chỉ dành cho GV)</label>
                  <input type="text" id="mu-subject" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Toán học, Vật lý...">
                </div>
              </div>
              <div class="mt-8 flex justify-end space-x-4">
                <button id="mu-cancel" class="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">Hủy</button>
                <button id="mu-submit" class="px-5 py-2.5 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700">Tạo mới</button>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById('user-modal');
        const closeModal = () => modal.remove();
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });

        // Toggle password visibility
        document.querySelectorAll('#user-modal .toggle-password').forEach(btn => {
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

        // Show/hide subject field based on role
        document.getElementById('mu-role').addEventListener('change', (e) => {
          const subjectGroup = document.getElementById('mu-subject-group');
          if (e.target.value === 'admin') {
            subjectGroup.classList.remove('hidden');
          } else {
            subjectGroup.classList.add('hidden');
          }
        });

        document.getElementById('mu-cancel').addEventListener('click', closeModal);
        document.getElementById('mu-submit').addEventListener('click', async () => {
          const name = document.getElementById('mu-name').value.trim();
          const email = document.getElementById('mu-email').value.trim();
          const password = document.getElementById('mu-pass').value.trim();
          const role = document.getElementById('mu-role').value;
          const subject = role === 'admin' ? document.getElementById('mu-subject').value.trim() : '';
          
          if (!name || !email || password.length < 4) {
            showAlert('Vui lòng nhập đầy đủ thông tin (Mật khẩu tối thiểu 4 ký tự)!', 'Lỗi nhập liệu');
            return;
          }
          
          try {
            await userService.createUser({ name, email, password, role, subject, status: 'active' });
            closeModal();
            window.dispatchEvent(new Event('popstate'));
          } catch (err) {
            showAlert('Lỗi tạo người dùng (Email có thể đã tồn tại)', 'Lỗi');
          }
        });
      });
    }
  },

  bindUserRowEvents() {
    // Xóa người dùng
    document.querySelectorAll('.btn-delete-user').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        showConfirm('Bạn có chắc chắn muốn xóa người dùng này? Hành động không thể hoàn tác.', 'Xóa người dùng', async () => {
          await userService.deleteUser(id);
          window.dispatchEvent(new Event('popstate'));
        });
      });
    });

    // Thay đổi quyền (Role)
    document.querySelectorAll('.role-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const newRole = e.target.value;
        showConfirm('Bạn có chắc chắn muốn thay đổi quyền của người dùng này?', 'Đổi quyền', 
          async () => {
            await userService.updateUser(id, { role: newRole });
            window.dispatchEvent(new Event('popstate'));
          }, 
          () => {
            window.dispatchEvent(new Event('popstate')); // Revert UI
          }
        );
      });
    });

    // Khóa/Mở khóa tài khoản
    document.querySelectorAll('.btn-toggle-lock').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const currentStatus = e.currentTarget.getAttribute('data-status');
        const newStatus = currentStatus === 'locked' ? 'active' : 'locked';
        const actionName = newStatus === 'locked' ? 'khóa' : 'mở khóa';
        
        showConfirm(
          `Bạn có chắc chắn muốn ${actionName} tài khoản này?`,
          actionName === 'khóa' ? 'Khóa tài khoản' : 'Mở khóa tài khoản',
          async () => {
            await userService.updateUser(id, { status: newStatus });
            window.dispatchEvent(new Event('popstate'));
          }
        );
      });
    });
  },

  // --- XEM KẾT QUẢ THI ---

};
