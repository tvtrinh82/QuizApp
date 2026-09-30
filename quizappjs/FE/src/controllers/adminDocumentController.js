import { documentService } from '../services/documentService.js';
import { AdminDocumentsView } from '../views/pages/admin/documents.js';
import { globalState } from '../core/state.js';

export const adminDocumentController = {
  async renderDocuments() {
    const container = document.getElementById('admin-content');
    if (!container) return;
    
    const { user } = globalState.getState();
    if (!user) return;

    try {
      container.innerHTML = '<div class="text-center py-10"><div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div></div>';
      
      let documents = await documentService.getDocuments();
      
      // Lọc theo subject nếu không phải super admin
      if (user.subject) {
        documents = documents.filter(doc => doc.subject === user.subject);
      }
      
      // Sort mới nhất lên đầu
      documents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      container.innerHTML = AdminDocumentsView(documents);

      // Thêm sự kiện
      const btnAdd = document.getElementById('btn-add-document');
      if (btnAdd) {
        btnAdd.addEventListener('click', () => {
          this.showDocumentModal(null, user, async (docData) => {
            await documentService.addDocument(docData);
            this.renderDocuments();
          });
        });
      }

      document.querySelectorAll('.btn-edit-document').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const docToEdit = documents.find(d => d.id == id);
          if (docToEdit) {
            this.showDocumentModal(docToEdit, user, async (docData) => {
              await documentService.updateDocument(id, docData);
              this.renderDocuments();
            });
          }
        });
      });

      document.querySelectorAll('.btn-delete-document').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          if (confirm('Bạn có chắc muốn xóa tài liệu này?')) {
            documentService.deleteDocument(id).then(() => this.renderDocuments());
          }
        });
      });
      
    } catch (err) {
      container.innerHTML = `<div class="text-red-500 py-10 text-center">Lỗi: ${err.message}</div>`;
    }
  },

  showDocumentModal(docData, user, onSuccess) {
    const isEdit = !!docData;
    const defaultSubject = user.subject || docData?.subject || '';
    
    const modalHtml = `
      <div id="doc-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all p-8 scale-100">
          <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b dark:border-slate-700 pb-3">${isEdit ? 'Sửa Tài Liệu' : 'Thêm Tài Liệu Mới'}</h3>
          <form id="doc-form" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tên tài liệu</label>
              <input type="text" id="doc-title" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" value="${docData?.title || ''}" required>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Môn học</label>
              ${user.subject
                ? `<input type="text" id="doc-subject" class="block w-full px-4 py-2 bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-300 rounded-lg" value="${defaultSubject}" readonly>`
                : `
                <select id="doc-subject" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" required>
                  <option value="">-- Chọn môn học --</option>
                  <option value="Toán học" ${defaultSubject === 'Toán học' ? 'selected' : ''}>Toán học</option>
                  <option value="Vật lý" ${defaultSubject === 'Vật lý' ? 'selected' : ''}>Vật lý</option>
                  <option value="Hóa học" ${defaultSubject === 'Hóa học' ? 'selected' : ''}>Hóa học</option>
                  <option value="Sinh học" ${defaultSubject === 'Sinh học' ? 'selected' : ''}>Sinh học</option>
                  <option value="Ngữ văn" ${defaultSubject === 'Ngữ văn' ? 'selected' : ''}>Ngữ văn</option>
                  <option value="Lịch sử" ${defaultSubject === 'Lịch sử' ? 'selected' : ''}>Lịch sử</option>
                  <option value="Địa lý" ${defaultSubject === 'Địa lý' ? 'selected' : ''}>Địa lý</option>
                  <option value="Tiếng Anh" ${defaultSubject === 'Tiếng Anh' ? 'selected' : ''}>Tiếng Anh</option>
                  <option value="Giáo dục công dân" ${defaultSubject === 'Giáo dục công dân' ? 'selected' : ''}>Giáo dục công dân</option>
                  <option value="Tin học" ${defaultSubject === 'Tin học' ? 'selected' : ''}>Tin học</option>
                </select>
                `
              }
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Đường dẫn (Link)</label>
              <input type="url" id="doc-link" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" placeholder="https://drive.google.com/..." value="${docData?.link || ''}" required>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mô tả ngắn</label>
              <textarea id="doc-desc" class="block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500" rows="3">${docData?.description || ''}</textarea>
            </div>
            
            <div class="mt-8 flex justify-end space-x-4">
              <button type="button" id="doc-cancel" class="px-5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 font-bold transition">Hủy</button>
              <button type="submit" class="px-5 py-2.5 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-bold transition">Lưu</button>
            </div>
          </form>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('doc-modal');
    
    const closeModal = () => modal.remove();
    
    document.getElementById('doc-cancel').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.getElementById('doc-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newDoc = {
        title: document.getElementById('doc-title').value.trim(),
        subject: document.getElementById('doc-subject').value,
        link: document.getElementById('doc-link').value.trim(),
        description: document.getElementById('doc-desc').value.trim(),
        createdAt: isEdit ? docData.createdAt : new Date().toISOString(),
        authorId: isEdit ? docData.authorId : user.id
      };
      
      onSuccess(newDoc);
      closeModal();
    });
  }
};
