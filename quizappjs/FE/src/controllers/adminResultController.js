import { resultService } from '../services/resultService.js';
import { globalState } from '../core/state.js';
import { AdminResultsView, renderResultTableBody } from '../views/pages/admin/results.js';

export const adminResultController = {
  currentResults: [],
  async renderResults() {
    try {
      const { user } = globalState.getState();
      const results = await resultService.getResults();
      
      let filteredResults = results.reverse();
      if (user.subject) {
        filteredResults = filteredResults.filter(r => 
          r.quiz && r.quiz.subject && r.quiz.subject.toLowerCase() === (user.subject || '').toLowerCase()
        );
      }
      
      this.currentResults = filteredResults;
      return AdminResultsView(this.currentResults);
    } catch (error) {
      return `<p class="text-red-500">Lỗi tải danh sách kết quả: ${error.message}</p>`;
    }
  },

  afterRenderResults() {
    const searchInput = document.getElementById('search-result');
    const scoreSelect = document.getElementById('filter-result-score');
    const tbody = document.getElementById('result-tbody');
    
    const renderChart = (data) => {
      const ctx = document.getElementById('scoreChart');
      if (!ctx || typeof Chart === 'undefined') return;
      
      if (window.scoreChartInstance) {
        window.scoreChartInstance.destroy();
      }
      
      const bins = [0, 0, 0, 0, 0];
      data.forEach(r => {
        if (r.score < 2) bins[0]++;
        else if (r.score < 4) bins[1]++;
        else if (r.score < 6) bins[2]++;
        else if (r.score < 8) bins[3]++;
        else bins[4]++;
      });
      
      window.scoreChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['0-2 điểm', '2-4 điểm', '4-6 điểm', '6-8 điểm', '8-10 điểm'],
          datasets: [{
            label: 'Số bài thi',
            data: bins,
            backgroundColor: 'rgba(139, 92, 246, 0.7)',
            borderColor: 'rgb(139, 92, 246)',
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
      });
    };

    const filterResults = () => {
      if (!tbody || !renderResultTableBody) return;
      const query = searchInput.value.toLowerCase();
      const scoreFilter = scoreSelect.value;
      
      const filtered = this.currentResults.filter(r => {
        const studentName = (r.user?.name || '').toLowerCase();
        const quizTitle = (r.quiz?.title || '').toLowerCase();
        const matchQuery = studentName.includes(query) || quizTitle.includes(query);
        
        let matchScore = true;
        if (scoreFilter === 'pass') matchScore = r.score >= 5;
        if (scoreFilter === 'fail') matchScore = r.score < 5;
        
        return matchQuery && matchScore;
      });
      
      tbody.innerHTML = renderResultTableBody(filtered);
      renderChart(filtered); // Cập nhật biểu đồ theo bộ lọc
    };

    if (searchInput) searchInput.addEventListener('input', filterResults);
    if (scoreSelect) scoreSelect.addEventListener('change', filterResults);
    
    // Vẽ biểu đồ lần đầu
    renderChart(this.currentResults);

    // Xuất Excel (CSV)
    const btnExport = document.getElementById('btn-export-excel');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const scoreFilter = scoreSelect.value;
        const filteredToExport = this.currentResults.filter(r => {
          const studentName = (r.user?.name || '').toLowerCase();
          const quizTitle = (r.quiz?.title || '').toLowerCase();
          const matchQuery = studentName.includes(query) || quizTitle.includes(query);
          let matchScore = true;
          if (scoreFilter === 'pass') matchScore = r.score >= 5;
          if (scoreFilter === 'fail') matchScore = r.score < 5;
          return matchQuery && matchScore;
        });

        if (filteredToExport.length === 0) {
          alert('Không có dữ liệu để xuất!');
          return;
        }

        const BOM = '\uFEFF';
        let csvContent = BOM + "Học Sinh,Đề Thi,Số Câu Đúng,Tổng Số Câu,Điểm Số,Thời Gian Làm (giây),Ngày Nộp Bài\n";
        
        filteredToExport.forEach(r => {
          const name = `"${(r.user?.name || 'Ẩn danh').replace(/"/g, '""')}"`;
          const quizTitle = `"${(r.quiz?.title || 'Đề đã xóa').replace(/"/g, '""')}"`;
          const correct = r.correctCount;
          const total = r.totalQuestions;
          const score = r.score.toFixed(2);
          const time = r.timeSpent || 0;
          const date = `"${new Date(r.timestamp).toLocaleString('vi-VN')}"`;
          
          csvContent += `${name},${quizTitle},${correct},${total},${score},${time},${date}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Bang_Diem_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  },


};
