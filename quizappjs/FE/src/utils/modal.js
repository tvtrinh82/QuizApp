export const showAlert = (message, title = 'Thông báo') => {
  const modalHtml = `
    <div id="global-alert" class="fixed inset-0 flex items-center justify-center z-[9999] bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm transform transition-all p-6 scale-100 border border-white/40">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">${title}</h3>
          <p class="text-sm text-gray-600 mb-6">${message}</p>
          <button id="btn-alert-ok" class="w-full inline-flex justify-center rounded-xl border border-transparent px-4 py-2.5 bg-blue-600 text-base font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm transition-all transform hover:-translate-y-0.5">
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('global-alert');
  const btnOk = document.getElementById('btn-alert-ok');

  btnOk.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
};

export const showConfirm = (message, title = 'Xác nhận', onConfirm) => {
  const modalHtml = `
    <div id="global-confirm" class="fixed inset-0 flex items-center justify-center z-[9999] bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm transform transition-all p-6 scale-100 border border-white/40">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
            <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">${title}</h3>
          <p class="text-sm text-gray-600 mb-6">${message}</p>
          <div class="flex gap-3 w-full">
            <button id="btn-confirm-cancel" class="flex-1 inline-flex justify-center rounded-xl border border-gray-300 px-4 py-2.5 bg-white text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm transition-all">
              Hủy
            </button>
            <button id="btn-confirm-ok" class="flex-1 inline-flex justify-center rounded-xl border border-transparent px-4 py-2.5 bg-yellow-600 text-base font-bold text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm transition-all transform hover:-translate-y-0.5">
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('global-confirm');
  const btnCancel = document.getElementById('btn-confirm-cancel');
  const btnOk = document.getElementById('btn-confirm-ok');

  btnCancel.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
  
  btnOk.addEventListener('click', () => {
    modal.remove();
    if (onConfirm) onConfirm();
  });
};
