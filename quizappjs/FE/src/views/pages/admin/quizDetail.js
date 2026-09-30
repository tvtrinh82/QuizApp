export const QuizDetailView = (quiz, questions = []) => {
  return `
    <div class="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100 overflow-hidden mb-8 relative">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 flex justify-between items-center">
        <div>
          <h3 class="text-2xl font-extrabold text-white flex items-center gap-2 drop-shadow-md">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            ${quiz.title}
          </h3>
          <p class="text-blue-100 mt-1 font-medium flex items-center gap-1.5 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Thời gian làm bài: ${quiz.duration} phút
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button id="btn-edit-quiz-info" data-id="${quiz.id}" class="bg-blue-500 hover:bg-blue-600 text-white border border-blue-400 px-4 py-2 rounded-lg shadow-sm text-sm font-bold transition-all flex items-center gap-2 transform hover:-translate-y-0.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Sửa thông tin
          </button>
          <button onclick="window.history.pushState({}, '', '/admin/dashboard'); window.dispatchEvent(new Event('popstate'));" class="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-lg shadow-sm text-sm font-bold transition-all backdrop-blur-md flex items-center gap-2 transform hover:-translate-y-0.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Quay lại
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form thêm câu hỏi -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
          <div class="bg-gray-50/80 px-6 py-4 border-b border-gray-100">
            <div class="flex justify-between items-center">
              <h4 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                Thêm câu hỏi mới
              </h4>
              <button id="btn-import-json" class="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Import JSON
              </button>
              <input type="file" id="input-import-json" accept=".json" class="hidden">
            </div>
          </div>
          <form id="add-question-form" class="p-6 space-y-5 bg-white dark:bg-gray-800">
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Nội dung câu hỏi</label>
              <textarea id="q-content" required class="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all resize-none text-sm text-gray-900 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" rows="3" placeholder="Nhập nội dung câu hỏi..."></textarea>
            </div>
            
            <div class="space-y-4">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 dark:text-gray-400 font-bold bg-gray-100 dark:bg-gray-600 rounded px-1.5 text-xs">A</span>
                </div>
                <input type="text" id="q-optA" required class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-all text-gray-900 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Đáp án A">
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 dark:text-gray-400 font-bold bg-gray-100 dark:bg-gray-600 rounded px-1.5 text-xs">B</span>
                </div>
                <input type="text" id="q-optB" required class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-all text-gray-900 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Đáp án B">
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 dark:text-gray-400 font-bold bg-gray-100 dark:bg-gray-600 rounded px-1.5 text-xs">C</span>
                </div>
                <input type="text" id="q-optC" required class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-all text-gray-900 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Đáp án C">
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 dark:text-gray-400 font-bold bg-gray-100 dark:bg-gray-600 rounded px-1.5 text-xs">D</span>
                </div>
                <input type="text" id="q-optD" required class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-all text-gray-900 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" placeholder="Đáp án D">
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Đáp án đúng</label>
              <select id="q-correct" class="block w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all text-sm font-bold bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="A">Đáp án A</option>
                <option value="B">Đáp án B</option>
                <option value="C">Đáp án C</option>
                <option value="D">Đáp án D</option>
              </select>
            </div>

            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 flex justify-center items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Thêm câu hỏi
            </button>
          </form>
        </div>
      </div>

      <!-- Danh sách câu hỏi -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h4 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              Danh sách câu hỏi
            </h4>
            <span class="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full border border-indigo-200">
              ${questions.length} câu
            </span>
          </div>
          
          <div class="p-6 space-y-4 bg-gray-50/30">
            ${questions.length === 0 ? `
              <div class="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <div class="text-4xl mb-3">📝</div>
                <p class="text-gray-500 font-medium">Chưa có câu hỏi nào trong đề thi này.</p>
                <p class="text-gray-400 text-sm mt-1">Hãy bắt đầu thêm câu hỏi ở form bên trái.</p>
              </div>
            ` : ''}
            
            ${questions.map((q, index) => `
              <div class="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <p class="font-bold text-gray-800 text-lg mb-4 pl-3">
                  <span class="text-indigo-600 mr-1">Câu ${index + 1}:</span> ${q.content}
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3">
                  <div class="flex items-start gap-2 p-2 rounded-lg border ${q.correctOption === 'A' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent'}">
                    <span class="font-bold text-xs px-1.5 py-0.5 rounded ${q.correctOption === 'A' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}">A</span>
                    <span class="text-sm ${q.correctOption === 'A' ? 'text-green-800 font-bold' : 'text-gray-600'}">${q.options.A}</span>
                  </div>
                  <div class="flex items-start gap-2 p-2 rounded-lg border ${q.correctOption === 'B' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent'}">
                    <span class="font-bold text-xs px-1.5 py-0.5 rounded ${q.correctOption === 'B' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}">B</span>
                    <span class="text-sm ${q.correctOption === 'B' ? 'text-green-800 font-bold' : 'text-gray-600'}">${q.options.B}</span>
                  </div>
                  <div class="flex items-start gap-2 p-2 rounded-lg border ${q.correctOption === 'C' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent'}">
                    <span class="font-bold text-xs px-1.5 py-0.5 rounded ${q.correctOption === 'C' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}">C</span>
                    <span class="text-sm ${q.correctOption === 'C' ? 'text-green-800 font-bold' : 'text-gray-600'}">${q.options.C}</span>
                  </div>
                  <div class="flex items-start gap-2 p-2 rounded-lg border ${q.correctOption === 'D' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent'}">
                    <span class="font-bold text-xs px-1.5 py-0.5 rounded ${q.correctOption === 'D' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}">D</span>
                    <span class="text-sm ${q.correctOption === 'D' ? 'text-green-800 font-bold' : 'text-gray-600'}">${q.options.D}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};
