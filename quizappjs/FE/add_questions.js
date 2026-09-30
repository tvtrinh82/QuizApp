const addMoreQuestions = async () => {
  try {
    const quizzesRes = await fetch('http://localhost:3001/quizzes');
    const quizzes = await quizzesRes.json();

    for (const quiz of quizzes) {
      // Find how many questions currently exist for this quiz
      const questionsRes = await fetch(`http://localhost:3001/questions?quizId=${quiz.id}`);
      const existing = await questionsRes.json();
      
      const toAdd = 25 - existing.length;
      if (toAdd <= 0) continue;

      console.log(`Đang thêm ${toAdd} câu hỏi cho bộ đề "${quiz.title}"...`);
      
      for (let i = 0; i < toAdd; i++) {
        const questionNumber = existing.length + i + 1;
        await fetch('http://localhost:3001/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId: quiz.id,
            content: `Câu hỏi trắc nghiệm ${questionNumber} (tạo tự động) của đề ${quiz.title}`,
            options: {
              A: 'Đáp án A',
              B: 'Đáp án B',
              C: 'Đáp án C',
              D: 'Đáp án D'
            },
            correctOption: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
          })
        });
      }
    }
    console.log('Hoàn thành việc thêm câu hỏi!');
  } catch (err) {
    console.error('Lỗi:', err);
  }
};

addMoreQuestions();
