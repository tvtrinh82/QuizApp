export const AdminDocumentsView = (documents) => {
  return `
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 sm:p-8 animate-fade-in-up">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Quản Lý Tài Liệu Học Tập</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Danh sách tài liệu tham khảo cho học sinh.</p>
        </div>
        <button id="btn-add-document" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Thêm tài liệu mới
        </button>
      </div>

      <!-- Khung hiển thị danh sách tài liệu -->
      <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead class="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Tên tài liệu</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Môn học</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Ngày đăng</th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            ${documents.length === 0 ? `
              <tr><td colspan="4" class="px-6 py-8 text-center text-slate-500 dark:text-slate-400 italic">Chưa có tài liệu nào.</td></tr>
            ` : documents.map(doc => `
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate max-w-[200px] sm:max-w-xs" title="${doc.title}">${doc.title}</div>
                      ${doc.description ? `<div class="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs" title="${doc.description}">${doc.description}</div>` : ''}
                      <a href="${doc.link}" target="_blank" class="text-xs text-blue-500 dark:text-blue-400 hover:underline">Xem/Tải file</a>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                    ${doc.subject}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  ${new Date(doc.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button class="btn-edit-document text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4 transition" data-id="${doc.id}">Sửa</button>
                  <button class="btn-delete-document text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition" data-id="${doc.id}">Xóa</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
};
