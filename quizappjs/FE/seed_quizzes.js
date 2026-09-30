const subjects = [
  { name: 'Toán học', questions: [
    { content: 'Nghiệm của phương trình 2x - 4 = 0 là gì?', options: { A: 'x = 1', B: 'x = 2', C: 'x = -2', D: 'x = 0' }, correctOption: 'B' },
    { content: 'Đạo hàm của hàm số y = x^2 là:', options: { A: '2x', B: 'x', C: 'x^2', D: '2' }, correctOption: 'A' }
  ]},
  { name: 'Vật lý', questions: [
    { content: 'Đơn vị của lực là gì?', options: { A: 'Joule', B: 'Watt', C: 'Newton', D: 'Pascal' }, correctOption: 'C' },
    { content: 'Gia tốc trọng trường g trên Trái Đất xấp xỉ bằng bao nhiêu?', options: { A: '9.8 m/s^2', B: '10 km/h', C: '3.14 m/s', D: '9.8 m/s' }, correctOption: 'A' }
  ]},
  { name: 'Hóa học', questions: [
    { content: 'Công thức hóa học của nước là gì?', options: { A: 'CO2', B: 'H2O2', C: 'HO', D: 'H2O' }, correctOption: 'D' },
    { content: 'Kim loại nào sau đây ở thể lỏng ở điều kiện thường?', options: { A: 'Sắt', B: 'Đồng', C: 'Thủy ngân', D: 'Nhôm' }, correctOption: 'C' }
  ]},
  { name: 'Sinh học', questions: [
    { content: 'Bào quan nào được ví như "nhà máy năng lượng" của tế bào?', options: { A: 'Lạp thể', B: 'Nhân tế bào', C: 'Ty thể', D: 'Lưới nội chất' }, correctOption: 'C' },
    { content: 'Người mang nhóm máu AB có thể nhận máu từ nhóm máu nào?', options: { A: 'Chỉ nhóm máu O', B: 'Chỉ nhóm AB', C: 'Tất cả các nhóm', D: 'Chỉ nhóm A và B' }, correctOption: 'C' }
  ]},
  { name: 'Ngữ văn', questions: [
    { content: 'Tác giả của Truyện Kiều là ai?', options: { A: 'Nguyễn Du', B: 'Nguyễn Trãi', C: 'Hồ Xuân Hương', D: 'Nam Cao' }, correctOption: 'A' },
    { content: 'Bài thơ "Tây Tiến" là sáng tác của nhà thơ nào?', options: { A: 'Tố Hữu', B: 'Quang Dũng', C: 'Huy Cận', D: 'Xuân Diệu' }, correctOption: 'B' }
  ]},
  { name: 'Lịch sử', questions: [
    { content: 'Chiến dịch Điện Biên Phủ diễn ra vào năm nào?', options: { A: '1945', B: '1954', C: '1975', D: '1930' }, correctOption: 'B' },
    { content: 'Ai là người đọc Tuyên ngôn Độc lập ngày 2/9/1945?', options: { A: 'Võ Nguyên Giáp', B: 'Phạm Văn Đồng', C: 'Hồ Chí Minh', D: 'Trường Chinh' }, correctOption: 'C' }
  ]},
  { name: 'Địa lý', customQuizzes: true, questions: [
    { content: 'Đỉnh núi cao nhất Việt Nam là đỉnh nào?', options: { A: 'Fansipan', B: 'Ngọc Linh', C: 'Pu Ta Leng', D: 'Bạch Mã' }, correctOption: 'A' },
    { content: 'Con sông dài nhất chảy qua lãnh thổ Việt Nam là sông nào?', options: { A: 'Sông Hồng', B: 'Sông Mê Kông', C: 'Sông Đồng Nai', D: 'Sông Đà' }, correctOption: 'B' }
  ]},
  { name: 'Tiếng Anh', questions: [
    { content: 'She _____ to school every day.', options: { A: 'go', B: 'going', C: 'goes', D: 'went' }, correctOption: 'C' },
    { content: 'What is the past tense of "buy"?', options: { A: 'buyed', B: 'bought', C: 'buying', D: 'brings' }, correctOption: 'B' }
  ]},
  { name: 'Giáo dục công dân', questions: [
    { content: 'Pháp luật do cơ quan nào ban hành?', options: { A: 'Chính phủ', B: 'Quốc hội', C: 'Chủ tịch nước', D: 'Tòa án' }, correctOption: 'B' },
    { content: 'Độ tuổi công dân bắt đầu phải chịu trách nhiệm hình sự về mọi tội phạm là?', options: { A: '14 tuổi', B: '16 tuổi', C: '18 tuổi', D: '20 tuổi' }, correctOption: 'B' }
  ]},
  { name: 'Tin học', questions: [
    { content: 'Phím tắt để sao chép (copy) văn bản là gì?', options: { A: 'Ctrl + C', B: 'Ctrl + V', C: 'Ctrl + X', D: 'Ctrl + Z' }, correctOption: 'A' },
    { content: 'Thiết bị nào sau đây là thiết bị đầu vào (Input)?', options: { A: 'Màn hình', B: 'Máy in', C: 'Bàn phím', D: 'Loa' }, correctOption: 'C' }
  ]}
];

const seed = async () => {
  for (const subject of subjects) {
    try {
      // Create quiz
      const quizRes = await fetch('http://localhost:3001/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `Đề kiểm tra môn ${subject.name}`, duration: 45 })
      });
      const quiz = await quizRes.json();
      const quizId = quiz.id;

      // Create questions
      for (const q of subject.questions) {
        await fetch('http://localhost:3001/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId,
            content: q.content,
            options: q.options,
            correctOption: q.correctOption
          })
        });
      }
      console.log(`Đã tạo thành công bộ đề: ${subject.name}`);
    } catch (err) {
      console.error('Lỗi khi tạo bộ đề:', subject.name, err);
    }
  }
  console.log('Hoàn thành việc tạo 10 bộ đề!');
};

seed();
