export const StudentDocumentsView = (documents) => {
  return `
    <div class="animate-fade-in-up">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Tài Liệu Học Tập 📚</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-lg">Khám phá và tải về các tài liệu bổ ích để nâng cao kiến thức.</p>
      </div>

      <!-- Khung Tìm kiếm & Lọc -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 mb-10 flex flex-col md:flex-row gap-4 items-center">
        <div class="relative w-full md:w-2/3">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input type="text" id="doc-search-input" placeholder="Tìm kiếm tài liệu..." class="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-transparent rounded-xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-inner">
        </div>
        <div class="w-full md:w-1/3">
          <select id="doc-subject-filter" class="block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-transparent rounded-xl text-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-medium cursor-pointer shadow-inner appearance-none">
            <option value="">Tất cả môn học</option>
            <option value="Toán học">Toán học</option>
            <option value="Vật lý">Vật lý</option>
            <option value="Hóa học">Hóa học</option>
            <option value="Sinh học">Sinh học</option>
            <option value="Ngữ văn">Ngữ văn</option>
            <option value="Lịch sử">Lịch sử</option>
            <option value="Địa lý">Địa lý</option>
            <option value="Tiếng Anh">Tiếng Anh</option>
            <option value="Giáo dục công dân">Giáo dục công dân</option>
            <option value="Tin học">Tin học</option>
          </select>
        </div>
      </div>

      <!-- Lưới Tài Liệu -->
      ${documents.length === 0 ? `
        <div class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Chưa có tài liệu nào</h3>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Giáo viên chưa cập nhật tài liệu cho môn học này.</p>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="doc-grid">
          ${documents.map(doc => `
            <div class="doc-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col" data-title="${doc.title.toLowerCase()}" data-subject="${doc.subject}">
              <div class="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 relative p-6 flex flex-col justify-end">
                <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <span class="inline-block px-3 py-1 bg-white text-indigo-700 text-xs font-bold rounded-full w-max shadow-sm mb-2">${doc.subject}</span>
              </div>
              <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${doc.title}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">${doc.description || 'Không có mô tả cho tài liệu này.'}</p>
                <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span class="text-xs text-gray-400 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    ${new Date(doc.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                  <a href="${doc.link}" target="_blank" class="inline-flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors gap-2 text-sm">
                    Xem / Tải 
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
};
