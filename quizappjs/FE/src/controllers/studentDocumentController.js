import { documentService } from '../services/documentService.js';
import { StudentDocumentsView } from '../views/pages/student/documents.js';

export const studentDocumentController = {
  async renderDocuments() {
    const container = document.getElementById('student-content');
    if (!container) return;

    try {
      container.innerHTML = '<div class="text-center py-10"><div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div></div>';
      
      const documents = await documentService.getDocuments();
      // Sort newest first
      documents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      container.innerHTML = StudentDocumentsView(documents);

      // Handle Search & Filter
      const searchInput = document.getElementById('doc-search-input');
      const subjectFilter = document.getElementById('doc-subject-filter');
      
      const filterDocs = () => {
        const query = searchInput.value.toLowerCase();
        const subject = subjectFilter.value;
        const cards = container.querySelectorAll('.doc-card');
        
        cards.forEach(card => {
          const title = card.getAttribute('data-title');
          const cardSubject = card.getAttribute('data-subject');
          
          const matchQuery = title.includes(query);
          const matchSubject = subject === '' || cardSubject === subject;
          
          if (matchQuery && matchSubject) {
            card.parentElement.style.display = 'block';
          } else {
            card.parentElement.style.display = 'none';
          }
        });
      };

      if (searchInput) searchInput.addEventListener('input', filterDocs);
      if (subjectFilter) subjectFilter.addEventListener('change', filterDocs);

    } catch (error) {
      container.innerHTML = `<div class="text-red-500 text-center py-10">Lỗi: ${error.message}</div>`;
    }
  }
};
