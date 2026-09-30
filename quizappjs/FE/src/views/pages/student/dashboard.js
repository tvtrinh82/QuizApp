export const renderQuizCards = (quizzes = [], results = []) => {
  if (quizzes.length === 0) {
    return `
      <div class="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-xl text-slate-500 dark:text-slate-400 font-medium">Hiện tại không có bộ đề nào phù hợp.</p>
        <p class="text-slate-400 dark:text-slate-500 mt-2">Vui lòng quay lại sau nhé!</p>
      </div>
    `;
  }
  
  return quizzes.map((quiz, index) => {
    // Tìm điểm cao nhất nếu đã thi
    const quizResults = results.filter(r => r.quizId === quiz.id);
    const hasTaken = quizResults.length > 0;
    const highestScore = hasTaken ? Math.max(...quizResults.map(r => r.score)) : null;

    return `
      <div class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 flex flex-col h-full relative">
        ${hasTaken ? `
          <div class="absolute top-4 left-4 z-10 bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-800 shadow-sm flex items-center gap-1">
            <span>🏆 Đỉnh: ${highestScore.toFixed(1)}</span>
          </div>
        ` : ''}
        <div class="h-28 bg-slate-100 dark:bg-slate-700/50 relative p-6 flex items-end border-b border-slate-200 dark:border-slate-700">
          <div class="absolute top-4 right-4 bg-white dark:bg-slate-600 rounded-full p-2 text-slate-400 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h4 class="font-bold text-xl text-slate-800 dark:text-slate-100 leading-tight line-clamp-2">${quiz.title}</h4>
        </div>
        
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-center gap-4 text-slate-600 dark:text-slate-300 text-sm font-medium mb-6">
            <div class="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ${quiz.duration} phút
            </div>
            <div class="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ${quiz.questions?.length || 0} câu
            </div>
          </div>
          
          <div class="mt-auto">
            <button data-id="${quiz.id}" class="w-full relative inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 btn-start-quiz shadow-md hover:shadow-lg overflow-hidden group-hover:scale-[1.02] ${hasTaken ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-600' : ''}">
              <span class="relative z-10 flex items-center gap-2">
                ${hasTaken ? 'LÀM LẠI BÀI' : 'BẮT ĐẦU THI'}
                <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

export const StudentDashboardView = (quizzes = [], results = [], user = null, leaderboard = []) => {
  const totalTaken = results.length;
  const avgScore = totalTaken > 0 ? (results.reduce((acc, curr) => acc + curr.score, 0) / totalTaken).toFixed(1) : 0;
  const totalCorrect = results.reduce((acc, curr) => acc + (curr.correctCount || 0), 0);
  
  // Extract unique subjects for filter
  const subjects = [...new Set(quizzes.map(q => q.subject).filter(s => s))];

  return `
    <div class="relative min-h-screen -mt-6">
      <!-- Decorative background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>
      
      <!-- Stats Banner -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900 rounded-3xl shadow-xl overflow-hidden mb-10 mt-6 relative text-white flex flex-col md:flex-row items-center justify-between p-8 md:p-10">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTUgNWgxMHYxMEg1eiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div class="relative z-10 text-center md:text-left mb-6 md:mb-0">
          <h2 class="text-3xl font-extrabold mb-2 tracking-tight text-white">Chào mừng, ${user?.name || 'Học sinh'}! 👋</h2>
          <p class="text-indigo-200 text-lg">Tiếp tục rèn luyện và phá vỡ kỷ lục của chính bạn.</p>
        </div>
        
        <div class="relative z-10 flex flex-wrap justify-center gap-4 md:gap-6">
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/20 shadow-inner text-center w-28 md:w-32">
            <div class="text-2xl md:text-3xl font-black text-white">${totalTaken}</div>
            <div class="text-indigo-200 text-[10px] md:text-xs font-semibold uppercase mt-1">Bài đã làm</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/20 shadow-inner text-center w-28 md:w-32">
            <div class="text-2xl md:text-3xl font-black text-white">${avgScore}</div>
            <div class="text-indigo-200 text-[10px] md:text-xs font-semibold uppercase mt-1">Điểm TB</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/20 shadow-inner text-center w-28 md:w-32">
            <div class="text-2xl md:text-3xl font-black text-white">${totalCorrect}</div>
            <div class="text-indigo-200 text-[10px] md:text-xs font-semibold uppercase mt-1">Câu đúng</div>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Cột Trái: Đề thi & Lịch sử -->
        <div class="w-full lg:w-2/3">
          <!-- Filters & Quizzes -->
          <div class="px-2 mb-12">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 class="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span class="text-indigo-600 dark:text-indigo-400">📚</span> Đề thi đang mở
              </h3>
              <div class="flex gap-4">
                <input type="text" id="search-quiz-student" placeholder="Tìm kiếm bộ đề..." class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full md:w-64 bg-white dark:bg-gray-800 dark:text-white">
                <select id="filter-quiz-subject" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-gray-800 dark:text-white">
                  <option value="all">Tất cả môn</option>
                  ${subjects.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
            </div>

            <div id="student-quizzes-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              ${renderQuizCards(quizzes, results)}
            </div>
          </div>
          
          <!-- Recent History -->
          ${results.length > 0 ? `
          <div class="px-2 mb-10">
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
              <span class="text-indigo-600 dark:text-indigo-400">🕒</span> Lịch sử làm bài gần đây
            </h3>
            <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <ul class="divide-y divide-gray-100 dark:divide-gray-700">
                ${results.slice(0, 5).map(r => {
                  const date = new Date(r.timestamp).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                  let scoreColor = 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
                  if (r.score >= 8) scoreColor = 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
                  else if (r.score >= 5) scoreColor = 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
                  
                  return `
                  <li class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 class="font-bold text-gray-800 dark:text-gray-100 text-lg">${r.quiz?.title || 'Bộ đề bị xóa'}</h4>
                      <p class="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-4">
                        <span>📅 ${date}</span>
                        <span>⏱ ${r.timeSpent} giây</span>
                      </p>
                    </div>
                    <div class="flex items-center gap-4">
                      <div class="font-black text-xl px-4 py-2 rounded-xl ${scoreColor}">
                        ${r.score.toFixed(1)} <span class="text-sm font-medium">điểm</span>
                      </div>
                      <button onclick="window.history.pushState({}, '', '/student/review-history?id=${r.id}'); window.dispatchEvent(new Event('popstate'));" class="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 border border-indigo-200 dark:border-indigo-800">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        Xem lại
                      </button>
                    </div>
                  </li>
                  `;
                }).join('')}
              </ul>
            </div>
          </div>
          ` : ''}
        </div>

        <!-- Cột Phải: Bảng xếp hạng -->
        <div class="w-full lg:w-1/3 px-2">
          <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-yellow-100 dark:border-gray-700 overflow-hidden sticky top-24">
            <div class="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white text-center relative overflow-hidden">
              <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTUgNWgxMHYxMEg1eiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-20"></div>
              <h3 class="text-2xl font-black relative z-10 flex items-center justify-center gap-2">
                🏆 Bảng Xếp Hạng 🏆
              </h3>
              <p class="text-orange-100 text-sm mt-1 relative z-10">Top 5 học sinh xuất sắc nhất</p>
            </div>
            <ul class="p-4 divide-y divide-gray-100 dark:divide-gray-700">
              ${leaderboard.length === 0 ? `
                <li class="p-6 text-center text-gray-500 dark:text-gray-400 italic">Chưa có đủ dữ liệu xếp hạng.</li>
              ` : leaderboard.map((lb, idx) => {
                let badge = '';
                if (idx === 0) badge = '🥇';
                else if (idx === 1) badge = '🥈';
                else if (idx === 2) badge = '🥉';
                else badge = `<span class="text-gray-400 font-bold">${idx + 1}</span>`;

                const isCurrentUser = lb.userId === user.id;

                return `
                <li class="py-4 px-2 flex items-center justify-between ${isCurrentUser ? 'bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl' : ''}">
                  <div class="flex items-center gap-3">
                    <div class="w-8 text-center text-2xl">${badge}</div>
                    <div>
                      <div class="font-bold ${isCurrentUser ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}">${lb.userName} ${isCurrentUser ? '(Bạn)' : ''}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">${lb.totalTaken} bài thi - ${lb.totalCorrect} câu đúng</div>
                    </div>
                  </div>
                  <div class="font-black text-lg text-orange-500 dark:text-orange-400">
                    ${lb.avgScore.toFixed(1)}
                  </div>
                </li>
                `;
              }).join('')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
};
