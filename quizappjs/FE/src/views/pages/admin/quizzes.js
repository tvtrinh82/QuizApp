export const renderQuizTableBody = (quizzes = []) => {
  if (quizzes.length === 0) {
    return `<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">Không tìm thấy bộ đề nào</td></tr>`;
  }
  return quizzes.map((quiz, index) => `
    <tr class="transition-all hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 ${quiz.status === 'locked' ? 'bg-red-50/30 dark:bg-red-900/10' : index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/30 dark:bg-gray-800/50'}">
      <td class="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-100">${quiz.title}</td>
      <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-300">
        <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${quiz.duration} phút</span>
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm">
        <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${!quiz.status || quiz.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'}">
          ${!quiz.status || quiz.status === 'active' ? 'Đang mở' : 'Đã khóa'}
        </span>
      </td>
      <td class="px-6 py-5 whitespace-nowrap text-sm font-medium">
        <div class="flex items-center space-x-4">
          <button data-id="${quiz.id}" data-status="${quiz.status || 'active'}" class="text-yellow-600 hover:text-yellow-800 transition-colors btn-toggle-quiz-status flex items-center gap-1" title="${!quiz.status || quiz.status === 'active' ? 'Đóng' : 'Mở lại'}">
            <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${!quiz.status || quiz.status === 'active' ? 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' : 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'}"></path></svg>
          </button>
          <button data-id="${quiz.id}" class="text-indigo-600 hover:text-indigo-900 transition-colors btn-edit flex items-center gap-1" title="Sửa & Quản lý câu hỏi">
            <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </button>
          <button data-id="${quiz.id}" class="text-red-500 hover:text-red-700 transition-colors btn-delete flex items-center gap-1" title="Xóa">
            <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
};

export const AdminQuizzesView = (quizzes = []) => {
  return `
    <div class="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 relative">
      <!-- Simple Header -->
      <div class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 px-6 py-5 flex justify-between items-center">
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          Quản Lý Bộ Đề
        </h3>
        <button id="btn-create-quiz" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          <span class="hidden sm:inline">Tạo đề thi mới</span>
        </button>
      </div>
      
      <div class="p-6">
        <!-- Search & Filter -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input type="text" id="search-quiz" placeholder="Tìm kiếm bộ đề theo tên..." class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200">
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-100/80 dark:bg-gray-800/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-2/5">Tên bộ đề</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">Thời gian</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">Trạng thái</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">Thao tác</th>
              </tr>
            </thead>
            <tbody id="quiz-tbody" class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              ${renderQuizTableBody(quizzes)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};
