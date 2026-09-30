export const renderUserTableBody = (users = []) => {
  if (users.length === 0) {
    return `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">Không tìm thấy người dùng nào</td></tr>`;
  }
  return users.map((u, index) => `
    <tr class="transition-all hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 ${u.status === 'locked' ? 'bg-red-50/30 dark:bg-red-900/10' : index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/30 dark:bg-gray-800/50'}">
      <td class="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
          ${u.name.charAt(0).toUpperCase()}
        </div>
        ${u.name}
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">${u.email}</td>
      <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
        <select data-id="${u.id}" class="role-select block w-full pl-3 pr-8 py-1.5 text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm transition-all">
          <option value="student" ${u.role === 'student' ? 'selected' : ''}>Học sinh</option>
          <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Giáo viên</option>
        </select>
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
        <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${!u.status || u.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'}">
          ${!u.status || u.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
        </span>
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm font-medium space-x-3">
        <div class="flex items-center space-x-4">
          <button data-id="${u.id}" data-status="${u.status || 'active'}" class="text-yellow-600 hover:text-yellow-800 transition-colors btn-toggle-lock flex items-center gap-1" title="${!u.status || u.status === 'active' ? 'Khóa' : 'Mở khóa'}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${!u.status || u.status === 'active' ? 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' : 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'}"></path></svg>
          </button>
          <button data-id="${u.id}" class="text-red-500 hover:text-red-700 transition-colors btn-delete-user flex items-center gap-1" title="Xóa">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
};

export const AdminUsersView = (users = []) => {
  return `
    <div class="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 relative">
      <!-- Simple Header -->
      <div class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 px-6 py-5 flex justify-between items-center">
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Quản Lý Người Dùng
        </h3>
        <button id="btn-add-user" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          <span class="hidden sm:inline">Thêm người dùng</span>
        </button>
      </div>
      
      <div class="p-6">
        <!-- Search & Filters -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input type="text" id="search-user" placeholder="Tìm kiếm họ tên hoặc email..." class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200">
          </div>
          <div class="w-full sm:w-48 relative">
            <select id="filter-user-role" class="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200 appearance-none">
              <option value="all">Tất cả vai trò</option>
              <option value="student">Học sinh</option>
              <option value="admin">Giáo viên</option>
            </select>
          </div>
          <div class="w-full sm:w-48 relative">
            <select id="filter-user-status" class="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200 appearance-none">
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="locked">Đã khóa</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-100/80 dark:bg-gray-800/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Họ Tên</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vai Trò</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trạng Thái</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody id="user-tbody" class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              ${renderUserTableBody(users)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};
