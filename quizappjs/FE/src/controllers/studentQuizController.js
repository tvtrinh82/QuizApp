import { quizService } from '../services/quizService.js';
import { resultService } from '../services/resultService.js';
import { TakeQuizView } from '../views/pages/student/takeQuiz.js';
import { showAlert, showConfirm } from '../utils/modal.js';
import { http } from '../core/http.js';


let currentQuiz = null;
let currentQuestions = [];
let currentAnswers = {};
let currentQuestionIndex = 0;
let timerInterval = null;
let startTime = null;
let flaggedQuestions = new Set();

let cheatWarnings = 0;
const MAX_CHEAT_WARNINGS = 2;
let handleVisibilityChange = null;
let handleContextMenu = null;
let handleCopy = null;
let handleKeyDown = null;

export const studentQuizController = {
  // Thuật toán trộn mảng ngẫu nhiên
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // Trộn đáp án của 1 câu hỏi và tạo bộ ánh xạ (Mapping)
  shuffleQuestionOptions(q) {
    const entries = Object.entries(q.options);
    const shuffledEntries = this.shuffleArray(entries);
    
    const newOptions = {};
    const optionMapping = {}; // Map đáp án mới -> đáp án gốc (VD: A mới -> C gốc)
    const letters = ['A', 'B', 'C', 'D'];
    
    shuffledEntries.forEach(([oldLetter, text], index) => {
      const newLetter = letters[index];
      newOptions[newLetter] = text;
      optionMapping[newLetter] = oldLetter;
    });
    
    return {
      ...q,
      options: newOptions,
      optionMapping,
      newCorrectOption: Object.keys(optionMapping).find(k => optionMapping[k] === q.correctOption)
    };
  },

  async renderTakeQuiz(quizId) {
    try {
      const quiz = await quizService.getQuizById(quizId);
      currentQuiz = quiz;
      
      // Trộn câu hỏi và trộn đáp án
      let shuffledQs = this.shuffleArray(quiz.questions);
      shuffledQs = shuffledQs.map(q => this.shuffleQuestionOptions(q));
      
      currentQuestions = shuffledQs;
      currentAnswers = {};
      currentQuestionIndex = 0;
      cheatWarnings = 0; // Reset số lần cảnh báo
      flaggedQuestions.clear(); // Reset cờ đánh dấu
      
      return TakeQuizView(quiz, currentQuestions);
    } catch (error) {
      return `<p class="text-red-500">Không thể tải đề thi.</p>`;
    }
  },

  async afterRenderTakeQuiz(quizId) {
    if (!currentQuiz) return;
    
    try {
      // Gọi BE để báo bắt đầu thi và lấy thời gian gốc
      const response = await http.post(`/api/quizzes/${quizId}/start`, {});
      if (response && response.startTime) {
        startTime = new Date(response.startTime).getTime();
      } else {
        startTime = Date.now();
      }
    } catch (e) {
      console.warn('Không gọi được API start timer, dùng giờ local', e);
      startTime = Date.now();
    }

    // Tính thời gian đã trôi qua (phòng khi học sinh F5)
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const totalSeconds = currentQuiz.duration * 60;
    let secondsLeft = totalSeconds - Math.max(0, elapsedSeconds);

    if (secondsLeft <= 0) {
      showAlert('Thời gian làm bài của bạn đã kết thúc!', 'Hết giờ');
      this.submitQuiz();
      return;
    }

    this.renderQuestionContent();
    this.startTimer(secondsLeft);
    this.bindAntiCheat(); // Kích hoạt chống gian lận

    // Xử lý nút Next/Prev
    document.getElementById('btn-next').addEventListener('click', () => {
      if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        this.renderQuestionContent();
      }
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        this.renderQuestionContent();
      }
    });

    // Bấm vô câu hỏi ở bảng điều hướng
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentQuestionIndex = parseInt(e.target.getAttribute('data-index'));
        this.renderQuestionContent();
      });
    });

    // Nộp bài
    document.getElementById('btn-submit').addEventListener('click', () => {
      showConfirm('Bạn có chắc chắn muốn nộp bài?', 'Nộp bài', () => {
        this.submitQuiz();
      });
    });
  },

  bindAntiCheat() {
    handleVisibilityChange = () => {
      if (document.hidden) {
        cheatWarnings++;
        if (cheatWarnings >= MAX_CHEAT_WARNINGS) {
          showAlert('Bạn đã vi phạm quy chế thi (chuyển tab/thu nhỏ trình duyệt) quá số lần quy định. Bài thi sẽ được nộp tự động!', 'Vi phạm quy chế');
          this.submitQuiz();
        } else {
          showAlert(`CẢNH BÁO (${cheatWarnings}/${MAX_CHEAT_WARNINGS}): Bạn không được phép chuyển tab hoặc rời khỏi màn hình bài thi. Lần vi phạm tiếp theo sẽ tự động nộp bài!`, 'Cảnh báo gian lận');
        }
      }
    };

    handleContextMenu = (e) => {
      e.preventDefault();
      // Ngăn click chuột phải
    };

    handleCopy = (e) => {
      e.preventDefault();
      // Ngăn copy
    };

    handleKeyDown = (e) => {
      // Chặn Ctrl+C, Ctrl+V, F12
      if ((e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x')) || e.key === 'F12') {
        e.preventDefault();
      }
    };

    // Cảnh báo khi reload/tắt tab
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    // Xử lý nút Back của trình duyệt (Popstate)
    window.handlePopStateWarn = (e) => {
      // Ngay lập tức đẩy lại URL hiện tại để chặn browser lùi trang
      window.history.pushState(null, '', window.location.href);
      
      showConfirm(
        'Bạn đang trong quá trình làm bài thi. Bài làm hiện tại sẽ không được lưu. Bạn có chắc chắn muốn thoát?',
        'Cảnh báo thoát',
        () => {
          window.onbeforeunload = null;
          window.removeEventListener('popstate', window.handlePopStateWarn);
          if (window.handleLinkClickWarn) {
            document.removeEventListener('click', window.handleLinkClickWarn, true);
          }
          window.history.back(); // Trả lại hành động lùi trang
        }
      );
    };

    // Chặn click vào các link chuyển trang trong web (bắt ở capture phase để chặn router)
    window.handleLinkClickWarn = (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin) && !link.getAttribute('target')) {
        e.preventDefault();
        e.stopPropagation(); // Chặn router không cho xử lý
        
        showConfirm(
          'Bạn đang trong quá trình làm bài thi. Bài làm hiện tại sẽ không được lưu. Bạn có chắc chắn muốn thoát?',
          'Cảnh báo thoát',
          () => {
            window.onbeforeunload = null;
            window.removeEventListener('popstate', window.handlePopStateWarn);
            document.removeEventListener('click', window.handleLinkClickWarn, true);
            // Thực hiện chuyển trang
            window.history.pushState({}, '', link.href);
            window.dispatchEvent(new Event('popstate'));
          }
        );
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);
    
    // Gắn event chặn thoát
    window.addEventListener('popstate', window.handlePopStateWarn);
    document.addEventListener('click', window.handleLinkClickWarn, true); // capture phase
  },

  unbindAntiCheat() {
    if (handleVisibilityChange) document.removeEventListener('visibilitychange', handleVisibilityChange);
    if (handleContextMenu) document.removeEventListener('contextmenu', handleContextMenu);
    if (handleCopy) document.removeEventListener('copy', handleCopy);
    if (handleKeyDown) document.removeEventListener('keydown', handleKeyDown);
    
    window.onbeforeunload = null;
    if (window.handlePopStateWarn) {
      window.removeEventListener('popstate', window.handlePopStateWarn);
    }
    if (window.handleLinkClickWarn) {
      document.removeEventListener('click', window.handleLinkClickWarn, true);
    }
  },

  renderQuestionContent() {
    const q = currentQuestions[currentQuestionIndex];
    if (!q) return;

    const container = document.getElementById('question-container');
    const savedAnswer = currentAnswers[currentQuestionIndex];

    const isFlagged = flaggedQuestions.has(currentQuestionIndex);

    container.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100">Câu ${currentQuestionIndex + 1}: ${q.content}</h3>
        <button id="btn-flag" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isFlagged ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-400 dark:hover:bg-yellow-900/60' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'}">
          <svg class="w-4 h-4" fill="${isFlagged ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
          ${isFlagged ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}
        </button>
      </div>
      <div class="space-y-3">
        ${Object.entries(q.options).map(([key, value]) => `
          <label class="flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            savedAnswer === key 
              ? 'bg-blue-50 border-blue-500 shadow-sm dark:bg-blue-900/30 dark:border-blue-500' 
              : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/70'
          }">
            <input type="radio" name="answer" value="${key}" class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-500 dark:ring-offset-gray-800" ${savedAnswer === key ? 'checked' : ''}>
            <span class="ml-3 block font-medium ${savedAnswer === key ? 'text-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'}">${key}. ${value}</span>
          </label>
        `).join('')}
      </div>
    `;

    // Lắng nghe nút Đánh dấu
    document.getElementById('btn-flag').addEventListener('click', () => {
      if (flaggedQuestions.has(currentQuestionIndex)) {
        flaggedQuestions.delete(currentQuestionIndex);
      } else {
        flaggedQuestions.add(currentQuestionIndex);
      }
      this.renderQuestionContent(); // Render lại để cập nhật nút cờ
    });

    // Lắng nghe chọn đáp án
    container.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        currentAnswers[currentQuestionIndex] = e.target.value;
        this.updateNavUI();
      });
    });

    // Cập nhật UI nút prev/next
    document.getElementById('btn-prev').classList.toggle('hidden', currentQuestionIndex === 0);
    document.getElementById('btn-next').classList.toggle('hidden', currentQuestionIndex === currentQuestions.length - 1);
    
    this.updateNavUI();
  },

  updateNavUI() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-index'));
      const isFlagged = flaggedQuestions.has(idx);
      
      // Reset classes
      btn.className = 'nav-btn w-10 h-10 rounded border text-sm font-medium flex flex-col items-center justify-center cursor-pointer relative';
      
      if (idx === currentQuestionIndex) {
        btn.classList.add('border-blue-500', 'ring-2', 'ring-blue-200'); // Đang chọn
      }
      
      if (currentAnswers[idx]) {
        btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600'); // Đã trả lời
      } else {
        btn.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-100'); // Chưa trả lời
      }

      // Thêm chỉ báo cờ nếu được đánh dấu
      if (isFlagged) {
        btn.innerHTML = `${idx + 1} <div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>`;
      } else {
        btn.innerHTML = `${idx + 1}`;
      }
    });
  },

  startTimer(totalSeconds) {
    if (timerInterval) clearInterval(timerInterval);
    
    let secondsLeft = totalSeconds;
    const timerEl = document.getElementById('timer');
    
    const updateDisplay = () => {
      const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
      const s = (secondsLeft % 60).toString().padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      
      if (secondsLeft <= 60) {
        timerEl.classList.remove('text-gray-800');
        timerEl.classList.add('text-red-600', 'animate-pulse');
      }
    };

    updateDisplay();

    timerInterval = setInterval(() => {
      secondsLeft--;
      updateDisplay();
      
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        showAlert('Đã hết thời gian làm bài. Hệ thống tự động nộp bài!', 'Hết giờ');
        this.submitQuiz();
      }
    }, 1000);
  },

  async submitQuiz() {
    clearInterval(timerInterval);
    this.unbindAntiCheat(); // Xóa các sự kiện chống gian lận

    
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    let result;
    try {
      result = await resultService.saveResult({
        quizId: currentQuiz.id,
        answers: currentQuestions.map((question, index) => {
          // Chuyển đáp án từ trộn (hiện tại) sang đáp án gốc để BE chấm điểm
          const selectedNewLetter = currentAnswers[index];
          const selectedOldLetter = selectedNewLetter ? question.optionMapping[selectedNewLetter] : null;
          return {
            questionId: question.id,
            selectedOption: selectedOldLetter
          };
        }),
        timeSpent
      });
      
      // Update correctOption from backend if available for accurate live review
      const backendAnswers = result.answers || [];
      if (backendAnswers.length > 0) {
        currentQuestions.forEach(q => {
          const backendAns = backendAnswers.find(a => String(a.questionId) === String(q.id));
          if (backendAns && backendAns.correctOption) {
             q.correctOption = backendAns.correctOption;
             // Remap newCorrectOption since correctOption might have changed/been revealed
             if (q.optionMapping) {
               q.newCorrectOption = Object.keys(q.optionMapping).find(k => q.optionMapping[k] === q.correctOption);
             }
          }
        });
      }
      
    } catch (err) {
      console.error('Lỗi lưu kết quả', err);
      showAlert('Không thể lưu kết quả bài thi: ' + err.message, 'Lỗi');
      return;
    }

    const correctCount = result.correctCount;
    const score = Number(result.score);
    
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Kết quả bài thi</h2>
          <p class="text-xl mb-6 text-gray-600">Bạn đã trả lời đúng <span class="font-bold text-green-600">${correctCount}/${currentQuestions.length}</span> câu hỏi.</p>
          <div class="text-5xl font-extrabold text-blue-600 mb-8">${score.toFixed(1)} <span class="text-lg text-gray-500">điểm</span></div>
          <button id="btn-review-quiz" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl mb-3 shadow transition-colors">Xem lại bài làm</button>
          <button onclick="window.history.pushState({}, '', '/student/dashboard'); window.dispatchEvent(new Event('popstate'));" class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-xl transition-colors">Về trang chủ</button>
        </div>
      </div>
    `;

    document.getElementById('btn-review-quiz').addEventListener('click', () => {
      app.innerHTML = this.renderReviewMode();
    });
  },

  renderReviewMode() {
    const questionsHtml = currentQuestions.map((q, index) => {
      const selectedNew = currentAnswers[index];
      const correctNew = q.newCorrectOption; // Đáp án đúng đã bị trộn hoặc nguyên bản
      
      const isCorrect = selectedNew === correctNew;
      
      const optionsHtml = Object.entries(q.options).map(([key, value]) => {
        let optionClass = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'; // Default
        
        if (key === correctNew) {
          // Đáp án đúng (Luôn màu xanh)
          optionClass = 'bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-500 text-green-800 dark:text-green-300 font-bold ring-2 ring-green-200 dark:ring-green-900';
        } else if (key === selectedNew && key !== correctNew) {
          // Đáp án chọn sai (Màu đỏ)
          optionClass = 'bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-500 text-red-800 dark:text-red-300 font-bold ring-2 ring-red-200 dark:ring-red-900';
        }
        
        const isChecked = key === selectedNew ? 'checked' : '';
        
        return `
          <label class="flex items-center p-4 border rounded-xl transition-all ${optionClass} opacity-100 relative">
            <input type="radio" disabled ${isChecked} class="w-4 h-4 border-gray-300">
            <span class="ml-3 block font-medium">${key}. ${value}</span>
            ${key === correctNew ? '<span class="ml-auto flex items-center text-green-600 dark:text-green-400 font-bold text-sm"><svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Đáp án đúng</span>' : ''}
            ${key === selectedNew && key !== correctNew ? '<span class="ml-auto flex items-center text-red-600 dark:text-red-400 font-bold text-sm"><svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>Bạn chọn sai</span>' : ''}
          </label>
        `;
      }).join('');

      return `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${selectedNew ? (isCorrect ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700') : 'border-gray-200 dark:border-gray-700'} p-6 mb-6 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full ${selectedNew ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-400'}"></div>
          <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100 pl-2">
            Câu ${index + 1}: ${q.content}
            ${!selectedNew ? '<span class="ml-2 text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium border border-gray-200 dark:border-gray-600">Bỏ trống</span>' : ''}
            ${selectedNew && isCorrect ? '<span class="ml-2 text-sm px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full font-bold border border-green-200 dark:border-green-800">Đúng</span>' : ''}
            ${selectedNew && !isCorrect ? '<span class="ml-2 text-sm px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full font-bold border border-red-200 dark:border-red-800">Sai</span>' : ''}
          </h3>
          <div class="space-y-3 pl-2">
            ${optionsHtml}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="bg-indigo-600 rounded-2xl shadow-lg p-6 mb-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-bold mb-1">Chế độ xem lại bài</h2>
              <p class="text-indigo-100">${currentQuiz.title}</p>
            </div>
            <button onclick="window.history.pushState({}, '', '/student/dashboard'); window.dispatchEvent(new Event('popstate'));" class="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap">
              Về trang chủ
            </button>
          </div>
          ${questionsHtml}
        </div>
      </div>
    `;
  },

  async renderHistoryReview(resultId, container) {
    try {
      // Gọi API lấy chi tiết result để lấy đầy đủ mảng answers
      const result = await resultService.getResultById(resultId);
      if (!result) throw new Error("Không tìm thấy kết quả thi.");
      
      const quiz = await quizService.getQuizById(result.quizId);
      currentQuiz = quiz;
      
      const resultAnswers = result.answers || []; // Fallback an toàn
      
      // Khôi phục thứ tự câu hỏi như lúc làm bài dựa trên mảng answers
      let orderedQuestions = [];
      if (resultAnswers.length > 0) {
        resultAnswers.forEach(ans => {
          const originalQ = quiz.questions.find(q => String(q.id) === String(ans.questionId));
          if (originalQ) orderedQuestions.push(originalQ);
        });
        // Bổ sung các câu bị thiếu (nếu có)
        quiz.questions.forEach(q => {
          if (!orderedQuestions.find(oq => String(oq.id) === String(q.id))) {
            orderedQuestions.push(q);
          }
        });
      } else {
        orderedQuestions = quiz.questions;
      }
      
      // Map vào currentQuestions (Lưu ý: Không khôi phục được thứ tự đảo đáp án A,B,C,D vì BE không lưu optionMapping)
      currentQuestions = orderedQuestions.map(q => {
        // Lấy đáp án đúng từ DB hoặc từ kết quả thi trả về
        const backendAns = resultAnswers.find(a => String(a.questionId) === String(q.id));
        const trueCorrect = (backendAns && backendAns.correctOption) ? backendAns.correctOption : q.correctOption;
        
        return {
          ...q,
          correctOption: trueCorrect,
          newCorrectOption: trueCorrect // Ánh xạ 1-1 vì không trộn được nữa
        };
      });
      
      // Map lại lựa chọn của học sinh
      currentAnswers = {};
      
      currentQuestions.forEach((q, index) => {
        const answerObj = resultAnswers.find(a => String(a.questionId) === String(q.id));
        if (answerObj && answerObj.selectedOption) {
          currentAnswers[index] = answerObj.selectedOption;
        }
      });
      
      const html = this.renderReviewMode();
      if (container) {
        container.innerHTML = html;
      }
      return html;
    } catch (err) {
      console.error(err);
      const errHtml = `<p class="text-red-500">Lỗi khi tải lịch sử: ${err.message}</p>`;
      if (container) container.innerHTML = errHtml;
      return errHtml;
    }
  }


};
