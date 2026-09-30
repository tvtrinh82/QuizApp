const fs = require('fs');
const path = require('path');

const documents = [
  { file: '01-toan-hoc-ham-so-bac-hai.md', subject: 'Toán học', title: 'Hàm số bậc hai' },
  { file: '02-vat-ly-dinh-luat-newton.md', subject: 'Vật lý', title: 'Định luật Newton' },
  { file: '03-hoa-hoc-so-mol-va-nong-do.md', subject: 'Hóa học', title: 'Số mol và nồng độ' },
  { file: '04-sinh-hoc-quang-hop.md', subject: 'Sinh học', title: 'Quang hợp' },
  { file: '05-ngu-van-cach-doc-van-ban.md', subject: 'Ngữ văn', title: 'Cách đọc văn bản' },
  { file: '06-lich-su-viet-nam-cach-mang-thang-tam.md', subject: 'Lịch sử', title: 'Cách mạng tháng Tám' },
  { file: '07-dia-ly-khi-hau-viet-nam.md', subject: 'Địa lý', title: 'Khí hậu Việt Nam' },
  { file: '08-tieng-anh-thi-hien-tai-hoan-thanh.md', subject: 'Tiếng Anh', title: 'Thì hiện tại hoàn thành' },
  { file: '09-giao-duc-cong-dan-quyen-va-nghia-vu.md', subject: 'Giáo dục công dân', title: 'Quyền và nghĩa vụ' },
  { file: '10-tin-hoc-python-co-ban.md', subject: 'Tin học', title: 'Python cơ bản' }
];

// BẠN HÃY PASTE ACCESS TOKEN CỦA TÀI KHOẢN ADMIN VÀO ĐÂY:
const ADMIN_TOKEN = 'ce789c45288e15da432c3bacde0a58fdf7e7dff8f6d61ce773b9575081b7201d';

const seedDocuments = async () => {
  console.log('Bắt đầu thêm tài liệu vào CSDL backend thật...');

  for (const doc of documents) {
    try {
      const payload = {
        title: doc.title,
        subject: doc.subject,
        link: `/documents/${doc.file}`,
        description: `Tài liệu môn ${doc.subject} về ${doc.title.toLowerCase()}`
      };

      const res = await fetch('http://localhost:8080/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}` // Thêm token vào đây
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        console.log(`✅ Đã thêm: ${doc.title} (${doc.subject})`);
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error(`❌ Lỗi khi thêm ${doc.title}:`, res.status, errData);
      }
    } catch (err) {
      console.error(`❌ Lỗi kết nối khi thêm ${doc.title}:`, err.message);
    }
  }

  console.log('Hoàn tất!');
};

seedDocuments();

