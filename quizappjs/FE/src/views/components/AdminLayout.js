export const AdminLayout = (contentHTML, activeTab = 'quizzes') => {
  const getTabClass = (tabId) => {
    return activeTab === tabId
      ? 'border-blue-500 text-blue-600'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  };

  return `
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button onclick="window.history.pushState({}, '', '/admin/dashboard'); window.dispatchEvent(new Event('popstate'));" 
            class="${getTabClass('quizzes')} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Quản lý Bộ Đề
          </button>
          
          <button onclick="window.history.pushState({}, '', '/admin/users'); window.dispatchEvent(new Event('popstate'));"
            class="${getTabClass('users')} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Quản lý Người Dùng
          </button>
          
          <button onclick="window.history.pushState({}, '', '/admin/results'); window.dispatchEvent(new Event('popstate'));"
            class="${getTabClass('results')} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Kết Quả Bài Thi
          </button>
        </nav>
      </div>

      <!-- Main Content -->
      <div>
        ${contentHTML}
      </div>
    </div>
  `;
};
