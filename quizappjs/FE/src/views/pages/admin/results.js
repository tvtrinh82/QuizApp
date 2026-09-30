export const renderResultTableBody = (results = []) => {
  if (results.length === 0) {
    return `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">Không tìm thấy kết quả nào</td></tr>`;
  }
  return results.map((r, index) => {
    const date = new Date(r.timestamp).toLocaleString('vi-VN');
    const timeSpent = r.timeSpent ? Math.floor(r.timeSpent / 60) + 'p ' + (r.timeSpent % 60) + 's' : 'N/A';
    return `
      <tr class="transition-all hover:bg-violet-50/50 dark:hover:bg-violet-900/20 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/30 dark:bg-gray-800/50'}">
        <td class="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            ${(r.user?.name || 'A').charAt(0).toUpperCase()}
          </div>
          ${r.user?.name || 'Ẩn danh'}
        </td>
        <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">${r.quiz?.title || 'Đề đã xóa'}</td>
        <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 font-medium">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            ${r.correctCount} / ${r.totalQuestions}
          </span>
        </td>
        <td class="px-6 py-5 whitespace-nowrap text-sm">
          <span class="px-3 py-1 inline-flex text-sm font-bold rounded-full shadow-sm ${r.score >= 5 ? 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'}">
            ${r.score.toFixed(1)}
          </span>
        </td>
        <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">${timeSpent}</td>
        <td class="px-6 py-5 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${date}</td>
      </tr>
    `;
  }).join('');
};

export const AdminResultsView = (results = []) => {
  return `
    <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8 relative">
      <!-- Gradient Header -->
      <div class="bg-gradient-to-r from-violet-600 to-fuchsia-700 dark:from-violet-800 dark:to-fuchsia-900 px-6 py-5 flex justify-between items-center">
        <h3 class="text-xl font-bold text-white flex items-center gap-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          Kết Quả Thi Của Học Sinh
        </h3>
        <button id="btn-export-excel" class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold transition-colors flex items-center gap-2 backdrop-blur-md border border-white/30">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Xuất Báo Cáo
        </button>
      </div>
      
      <div class="p-6">
        <!-- Search & Filters -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50/50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input type="text" id="search-result" placeholder="Tìm kiếm theo học sinh hoặc đề thi..." class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200">
          </div>
          <div class="w-full sm:w-48 relative">
            <select id="filter-result-score" class="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-violet-500 shadow-sm transition-all text-sm font-medium text-gray-700 dark:text-gray-200 appearance-none">
              <option value="all">Tất cả điểm số</option>
              <option value="pass">Đạt (>= 5)</option>
              <option value="fail">Chưa đạt (< 5)</option>
            </select>
          </div>
        </div>

        <!-- Biểu đồ phổ điểm -->
        <div class="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hidden sm:block">
          <canvas id="scoreChart" height="80"></canvas>
        </div>

        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-100/80 dark:bg-gray-800/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Học Sinh</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Đề Thi</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Số Câu Đúng</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Điểm Số</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thời Gian Làm</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ngày Làm</th>
              </tr>
            </thead>
            <tbody id="result-tbody" class="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              ${renderResultTableBody(results)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};
