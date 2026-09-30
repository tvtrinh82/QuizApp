export const StudentResultsView = (results = []) => {
  const tbody = results.length === 0 
    ? '<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500">Chưa có kết quả bài thi nào</td></tr>'
    : results.map((r, index) => {
        const date = new Date(r.timestamp).toLocaleString('vi-VN');
        const timeSpent = r.timeSpent ? Math.floor(r.timeSpent / 60) + 'p ' + (r.timeSpent % 60) + 's' : 'N/A';
        const pass = r.score >= 5;
        
        return `
          <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-100">${index + 1}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-100">${r.quiz?.title || 'Đề đã xóa'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span class="px-3 py-1 inline-flex text-sm font-bold rounded-full ${pass ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}">
                ${r.score.toFixed(1)}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${r.correctCount}/${r.totalQuestions}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              <div class="flex flex-col">
                <span>${date}</span>
                <span class="text-xs text-gray-400">Thời gian: ${timeSpent}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
              <button onclick="window.history.pushState({}, '', '/student/review-history?id=${r.id}'); window.dispatchEvent(new Event('popstate'));" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                Xem lại bài
              </button>
            </td>
          </tr>
        `;
      }).join('');

  return `
    <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8 relative">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 px-6 py-6 flex justify-between items-center">
        <div>
          <h3 class="text-2xl font-bold text-white flex items-center gap-2 mb-1">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Kết Quả Bài Thi Của Bạn
          </h3>
          <p class="text-blue-100 text-sm">Xem lại lịch sử làm bài và chi tiết các đáp án.</p>
        </div>
      </div>
      
      <div class="p-6">
        <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">STT</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Đề Thi</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Điểm Số</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Số Câu Đúng</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thời Gian</th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              ${tbody}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};
