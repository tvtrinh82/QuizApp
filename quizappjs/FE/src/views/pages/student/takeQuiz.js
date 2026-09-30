export const TakeQuizView = (quiz, questions) => {
  return `
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
      
      <!-- Cột trái: Câu hỏi -->
      <div class="flex-1 bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-transparent dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">${quiz.title}</h2>
        <div id="question-container">
          <!-- Render câu hỏi ở đây -->
        </div>
        <div class="mt-8 flex justify-between">
          <button id="btn-prev" class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded text-gray-700 dark:text-gray-300 hidden">Câu trước</button>
          <button id="btn-next" class="bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800 px-4 py-2 rounded text-blue-700 dark:text-blue-300">Câu tiếp theo</button>
        </div>
      </div>

      <!-- Cột phải: Nav và Timer -->
      <div class="w-full md:w-72">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6 text-center border border-transparent dark:border-gray-700">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Thời gian còn lại</h3>
          <div id="timer" class="text-3xl font-mono font-bold text-red-600 dark:text-red-400">--:--</div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h3 class="font-medium mb-4 text-gray-800 dark:text-gray-200">Danh sách câu hỏi</h3>
          <div class="grid grid-cols-5 gap-2" id="question-nav">
            ${questions.map((_, index) => `
              <button data-index="${index}" class="nav-btn w-10 h-10 rounded border dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center">
                ${index + 1}
              </button>
            `).join('')}
          </div>
          
          <button id="btn-submit" class="mt-6 w-full bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white font-bold py-3 px-4 rounded shadow transition-colors">
            NỘP BÀI
          </button>
        </div>
      </div>
      
    </div>
  `;
};
