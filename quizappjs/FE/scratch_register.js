const register = async (email, password, role, name) => {
  try {
    const res = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role, name })
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const run = async () => {
  await register('admin_new@quiz.com', '123456', 'admin', 'Giáo viên Mới');
  await register('student_new@quiz.com', '123456', 'student', 'Học sinh Mới');
};

run();
