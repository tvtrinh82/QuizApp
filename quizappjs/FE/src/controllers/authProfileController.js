import { userService } from '../services/userService.js';
import { globalState } from '../core/state.js';
import { showAlert } from '../utils/modal.js';

export const authProfileController = {
  showProfileModal() {
    const { user } = globalState.getState();
    if (!user) return;

    const modalHtml = `
      <div id="profile-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all p-8 scale-100">
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b dark:border-gray-700 pb-3">Sửa Hồ Sơ Cá Nhân</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Họ Tên</label>
              <input type="text" id="prof-name" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${user.name || ''}">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" id="prof-email" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${user.email || ''}">
            </div>
            <div class="relative group">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Mật khẩu mới (Để trống nếu không đổi)</label>
              <input type="password" id="prof-pass" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 pr-12" placeholder="••••••••">
              <button type="button" class="toggle-password absolute bottom-2 right-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" data-target="prof-pass">
                👁️
              </button>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Số điện thoại</label>
              <input type="text" id="prof-phone" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${user.phone || ''}" placeholder="09xxxxxxx">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Quản lý lớp</label>
              <input type="text" id="prof-class" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${user.class_name || ''}" placeholder="12A1, 10B2...">
            </div>
            ${user.role === 'admin' ? `
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Môn giảng dạy</label>
              <input type="text" id="prof-subject" class="block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${user.subject || ''}" placeholder="Toán học, Vật lý...">
            </div>
            ` : ''}
          </div>
          <div class="mt-8 flex justify-end space-x-4">
            <button id="prof-cancel" class="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 font-bold">Hủy</button>
            <button id="prof-submit" class="px-5 py-2.5 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-bold">Lưu thay đổi</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('profile-modal');
    const closeModal = () => modal.remove();
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Toggle password visibility
    document.querySelectorAll('#profile-modal .toggle-password').forEach(btn => {
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

    document.getElementById('prof-cancel').addEventListener('click', closeModal);
    document.getElementById('prof-submit').addEventListener('click', async () => {
      const name = document.getElementById('prof-name').value.trim();
      const email = document.getElementById('prof-email').value.trim();
      const password = document.getElementById('prof-pass').value.trim();
      const phone = document.getElementById('prof-phone').value.trim();
      const class_name = document.getElementById('prof-class').value.trim();
      const subjectInput = document.getElementById('prof-subject');
      const subject = subjectInput ? subjectInput.value.trim() : user.subject;

      if (!name || !email) {
        showAlert('Họ tên và email không được để trống!', 'Lỗi nhập liệu');
        return;
      }

      const updateData = { name, email, phone, class_name, subject };
      if (password) {
        updateData.password = password; // Cập nhật cả password nếu có nhập
      }

      try {
        const btn = document.getElementById('prof-submit');
        btn.textContent = 'Đang lưu...';
        btn.disabled = true;

        await userService.updateUser(user.id, updateData);

        // Cập nhật global state
        const updatedUser = { ...user, ...updateData };
        // Không lưu password clear-text vào state
        if (updatedUser.password) delete updatedUser.password;

        const { token } = globalState.getState();
        globalState.setState({ token, user: updatedUser });

        closeModal();
        alert('Cập nhật thông tin thành công!');
        window.dispatchEvent(new Event('popstate')); // Reload để thấy tên mới trên header
      } catch (err) {
        alert('Lỗi cập nhật hồ sơ: ' + err.message);
        document.getElementById('prof-submit').textContent = 'Lưu thay đổi';
        document.getElementById('prof-submit').disabled = false;
      }
    });
  }
};
