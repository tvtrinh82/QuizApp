import { quizService } from '../services/quizService.js';
import { AdminQuizzesView, renderQuizTableBody } from '../views/pages/admin/quizzes.js';
import { QuizDetailView } from '../views/pages/admin/quizDetail.js';
import { globalState } from '../core/state.js';
import { showConfirm, showAlert } from '../utils/modal.js';

const showQuizModal = (quizData, onSuccess) => {
  const durationOptions = [15, 30, 45, 60];
  const currentDuration = quizData?.duration ?? 45;
  if (!durationOptions.includes(currentDuration)) {
    durationOptions.unshift(currentDuration);
  }
  const durationOptionHtml = durationOptions.map((duration) => `
    <option value="${duration}" ${duration === currentDuration ? 'selected' : ''}>${duration} phút</option>
  `).join('');
  const modalHtml = `
    <div id="quiz-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg p-8">
        <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-6">${quizData ? 'Sửa thông tin bộ đề' : 'Tạo bộ đề mới'}</h3>
        <form id="quiz-form" class="space-y-4">
          <div>
            <label for="modal-title" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tên bộ đề</label>
            <input id="modal-title" type="text" required class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" value="${quizData?.title || ''}">
          </div>
          <div>
            <label for="modal-duration" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Thời gian (phút)</label>
            <select id="modal-duration" required class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
              ${durationOptionHtml}
            </select>
          </div>
          <div>
            <label for="modal-subject" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Môn học</label>
            <input id="modal-subject" type="text" class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" value="${quizData?.subject || ''}">
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" id="quiz-cancel" class="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300">Hủy</button>
            <button type="submit" class="px-5 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = document.getElementById('quiz-modal');
  const closeModal = () => modal.remove();
  document.getElementById('quiz-cancel').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.getElementById('quiz-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('modal-title').value.trim();
    const duration = Number.parseInt(document.getElementById('modal-duration').value, 10);
    const subject = document.getElementById('modal-subject').value.trim();
    if (!title || !Number.isInteger(duration) || duration <= 0) {
      showAlert('Vui lòng nhập tên bộ đề và thời gian hợp lệ.', 'Lỗi nhập liệu');
      return;
    }
    closeModal();
    onSuccess(title, duration, subject);
  });
};

export const adminQuizController = {
  // --- DASHBOARD (DANH SÁCH BỘ ĐỀ) ---
  currentQuizzes: [],
  async renderDashboard() {
    try {
      const { user } = globalState.getState();
      const allQuizzes = await quizService.getQuizzes();
      
      if (!user.subject) {
        this.currentQuizzes = allQuizzes;
      } else {
        this.currentQuizzes = allQuizzes.filter(q => q.subject && q.subject.toLowerCase() === (user.subject || '').toLowerCase());
      }
      
      return AdminQuizzesView(this.currentQuizzes);
    } catch (error) {
      return `<p class="text-red-500">Lỗi tải danh sách bộ đề: ${error.message}</p>`;
    }
  },

  afterRenderDashboard() {
    // Tìm kiếm bộ đề
    const searchInput = document.getElementById('search-quiz');
    const tbody = document.getElementById('quiz-tbody');
    
    if (searchInput && tbody) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredQuizzes = this.currentQuizzes.filter(q => q.title.toLowerCase().includes(query));
        tbody.innerHTML = renderQuizTableBody ? renderQuizTableBody(filteredQuizzes) : '';
        this.bindQuizRowEvents();
      });
    }

    this.bindQuizRowEvents();

    // Nút tạo mới bộ đề
    const btnCreate = document.getElementById('btn-create-quiz');
    if (btnCreate) {
      btnCreate.addEventListener('click', () => {
        showQuizModal(null, async (title, duration, subject) => {
          await quizService.createQuiz({ title, duration, subject });
          window.dispatchEvent(new Event('popstate'));
        });
      });
    }
  },

  bindQuizRowEvents() {
    // Nút đóng/mở bộ đề
    document.querySelectorAll('.btn-toggle-quiz-status').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const currentStatus = e.currentTarget.getAttribute('data-status');
        const newStatus = (!currentStatus || currentStatus === 'active') ? 'locked' : 'active';
        const actionName = newStatus === 'locked' ? 'đóng' : 'mở lại';
        
        showConfirm(
          `Bạn có chắc chắn muốn ${actionName} bộ đề này? Học sinh sẽ ${newStatus === 'locked' ? 'không thể' : 'có thể'} làm bài.`,
          actionName === 'đóng' ? 'Đóng bộ đề' : 'Mở lại bộ đề', 
          async () => {
            await quizService.updateQuiz(id, { status: newStatus });
            window.dispatchEvent(new Event('popstate'));
          }
        );
      });
    });

    // Nút xóa bộ đề
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        showConfirm('Bạn có chắc chắn muốn xóa bộ đề này?', 'Xóa bộ đề', async () => {
          await quizService.deleteQuiz(id);
          window.dispatchEvent(new Event('popstate'));
        });
      });
    });

    // Nút sửa thông tin bộ đề
    document.querySelectorAll('.btn-edit-info').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const quiz = this.currentQuizzes.find(q => q.id === id);
        if (quiz) {
          showQuizModal(quiz, async (title, duration, subject) => {
            await quizService.updateQuiz(id, { title, duration, subject });
            window.dispatchEvent(new Event('popstate'));
          });
        }
      });
    });

    // Nút quản lý câu hỏi (chuyển sang trang chi tiết để thêm câu hỏi)
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.history.pushState({}, '', `/admin/quiz?id=${id}`);
        window.dispatchEvent(new Event('popstate'));
      });
    });
  },

  // --- QUIZ DETAIL (THÊM CÂU HỎI) ---
  currentQuizDetail: null,
  async renderQuizDetail(quizId) {
    try {
      const quiz = await quizService.getQuizById(quizId);
      this.currentQuizDetail = quiz;
      return QuizDetailView(quiz, quiz.questions);
    } catch (error) {
      return `<p class="text-red-500">Không tìm thấy bộ đề: ${error.message}</p>`;
    }
  },

  afterRenderQuizDetail(quizId) {
    // Sửa thông tin bộ đề
    const btnEditInfo = document.getElementById('btn-edit-quiz-info');
    if (btnEditInfo && this.currentQuizDetail) {
      btnEditInfo.addEventListener('click', () => {
        showQuizModal(this.currentQuizDetail, async (title, duration, subject) => {
          await quizService.updateQuiz(quizId, { title, duration, subject });
          window.dispatchEvent(new Event('popstate'));
        });
      });
    }

    const form = document.getElementById('add-question-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const content = document.getElementById('q-content').value;
        const optA = document.getElementById('q-optA').value;
        const optB = document.getElementById('q-optB').value;
        const optC = document.getElementById('q-optC').value;
        const optD = document.getElementById('q-optD').value;
        const correctOption = document.getElementById('q-correct').value;

        const newQuestion = {
          quizId,
          content,
          options: { A: optA, B: optB, C: optC, D: optD },
          correctOption
        };

        try {
          await quizService.createQuestion(newQuestion);
          // Reload để thấy câu hỏi vừa thêm
          window.dispatchEvent(new Event('popstate'));
        } catch (error) {
          showAlert('Lỗi khi thêm câu hỏi: ' + error.message, 'Lỗi');
        }
      });
    }

    // Xử lý Import JSON
    const btnImport = document.getElementById('btn-import-json');
    const inputImport = document.getElementById('input-import-json');
    
    if (btnImport && inputImport) {
      btnImport.addEventListener('click', () => {
        inputImport.click();
      });

      inputImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (!Array.isArray(data)) throw new Error('File JSON phải chứa một mảng các câu hỏi (Array).');
            
            let successCount = 0;
            for (const q of data) {
              if (q.content && q.options && q.options.A && q.correctOption) {
                await quizService.createQuestion({
                  quizId,
                  content: q.content,
                  options: q.options,
                  correctOption: q.correctOption
                });
                successCount++;
              }
            }
            showAlert(`Đã import thành công ${successCount} câu hỏi từ file!`, 'Hoàn tất');
            window.dispatchEvent(new Event('popstate')); // Reload lại trang
          } catch (err) {
            showAlert('Lỗi đọc file hoặc sai định dạng: ' + err.message, 'Lỗi');
          }
        };
        reader.readAsText(file);
        inputImport.value = ''; // Reset
      });
    }
  },

  // --- QUẢN LÝ NGƯỜI DÙNG ---

};
