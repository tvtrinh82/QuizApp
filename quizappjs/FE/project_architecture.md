# Phân Tích Cấu Trúc Dự Án Quiz-App-Vanilla

Dự án **quiz-app-vanilla** được xây dựng theo mô hình **MVC (Model - View - Controller)** kết hợp với kiến trúc **SPA (Single Page Application - Ứng dụng trang đơn)**. Mặc dù không sử dụng framework (như React hay Vue), mã nguồn được tổ chức cực kỳ khoa học và dễ bảo trì.

Dưới đây là phân tích chi tiết về cấu trúc thư mục, các file và luồng hoạt động của code:

## 1. Tổng quan cấu trúc thư mục (`src/`)

```text
quiz-app-vanilla/
├── db.json              # Cơ sở dữ liệu ảo (Mock DB) cho JSON Server
├── index.html           # File HTML gốc duy nhất của dự án
├── package.json         # Cấu hình dự án (script chạy, thư viện Vite, Tailwind...)
└── src/
    ├── main.js          # File chạy đầu tiên, cấu hình Router và Layout (Header)
    ├── core/            # Chứa các file lõi (hệ thống nền tảng)
    ├── services/        # Tầng Model: Chứa code giao tiếp với Backend (API)
    ├── controllers/     # Tầng Controller: Xử lý logic, kết nối Data với View
    ├── views/           # Tầng View: Chứa giao diện (Mã HTML)
    └── utils/           # Chứa các hàm dùng chung tiện ích
```

---

## 2. Phân tích chi tiết từng tầng (Layers)

### A. File khởi chạy gốc (`index.html` và `src/main.js`)
- **`index.html`**: Chỉ chứa một thẻ `<div id="app"></div>`. Toàn bộ giao diện của web sẽ được JavaScript "nhúng" (inject) vào thẻ div này.
- **`src/main.js`**: 
  - Là "nhạc trưởng" của ứng dụng.
  - Khởi tạo **Router** (hệ thống điều hướng).
  - Định nghĩa thanh **Header** chung (Menu, Nút đăng xuất, Đổi giao diện tối).
  - Định nghĩa các tuyến đường (Routes), ví dụ: Khi người dùng vào `/login` thì gọi Controller nào xử lý, vào `/admin/dashboard` thì hiển thị gì.

### B. Tầng Lõi Hệ thống (`src/core/`)
Đóng vai trò thay thế cho các thư viện nặng nề bên ngoài:
- **`router.js`**: File này chứa logic giúp chuyển trang mà **không bị tải lại (reload) trình duyệt**. Khi bạn bấm một link, nó dùng hàm `history.pushState` để đổi URL, sau đó render lại nội dung HTML mới.
- **`state.js`**: Lưu trữ "Trạng thái toàn cục" (Global State). Chức năng chính hiện tại là lưu thông tin của người dùng (User) đang đăng nhập để mọi file khác đều có thể lấy ra dùng (biết được là admin hay student để phân quyền).

### C. Tầng Model - Gọi API (`src/services/`)
Nhiệm vụ duy nhất của thư mục này là gọi các hàm `fetch()` để nói chuyện với **JSON Server** (chạy ở cổng 3001).
- **`authService.js`**: Gọi API để Đăng nhập, Đăng ký.
- **`quizService.js`**: Gọi API lấy danh sách đề thi, thêm/sửa/xóa bộ đề, câu hỏi.
- **`userService.js`**: Gọi API lấy danh sách tài khoản, đổi quyền, khóa tài khoản.
- **`resultService.js`**: Gọi API lưu điểm sau khi thi và lấy lịch sử thi.

*Ý nghĩa các dòng code:* Tại đây code không dính dáng gì đến HTML. Chỉ nhận dữ liệu đầu vào -> gọi `fetch` -> trả về dữ liệu (JSON) cho Controller.

### D. Tầng View - Giao diện (`src/views/`)
Nhiệm vụ duy nhất là nhận dữ liệu và sinh ra các chuỗi văn bản (String) chứa mã **HTML kết hợp Tailwind CSS**.
- **Ví dụ `views/pages/admin/quizzes.js`**: 
  - Hàm `AdminQuizzesView(quizzes)` nhận vào danh sách các bộ đề.
  - Sử dụng vòng lặp `.map()` để sinh ra các hàng `<tr>` cho bảng dữ liệu.
  - Return về một chuỗi HTML.
  - *Lưu ý:* Các file này "mù", chúng không tự biết khi nào nút bị bấm, chúng chỉ vẽ giao diện.

### E. Tầng Controller - Trái tim logic (`src/controllers/`)
Đây là cầu nối giữa View và Service. Xử lý mọi hành động của người dùng (bấm nút, điền form).
- **`authController.js`**: Khi người dùng nhấn nút "Đăng nhập", nó lấy text ở ô email/password, chuyển xuống `authService` kiểm tra. Nếu thành công, nó lưu user vào `state.js` và chuyển hướng trang.
- **`adminController.js` / `studentController.js`**:
  1. Gọi Service lấy dữ liệu.
  2. Gửi dữ liệu đó vào View để lấy mã HTML.
  3. Gắn mã HTML đó lên màn hình.
  4. ***Quan trọng nhất:*** Dùng hàm `document.getElementById(...).addEventListener('click', ...)` để "lắng nghe" các sự kiện khi người dùng tương tác (như bấm nút Xóa, Sửa, Nộp bài) và gọi logic tương ứng.

### F. Tầng Tiện ích (`src/utils/`)
- **`modal.js`**: Định nghĩa các hộp thoại bật lên (Popup/Alert) dùng chung. Ví dụ khi bạn bấm "Xóa", hàm `showConfirm()` ở đây sẽ chạy ra một hộp thoại đẹp mắt hỏi "Bạn có chắc chắn muốn xóa không?" thay vì dùng `alert()` mặc định xấu xí của trình duyệt.

---

## 3. Luồng hoạt động thực tế (Flow)

Hãy tưởng tượng luồng chạy khi một học sinh đăng nhập thành công và được chuyển hướng vào **Trang chủ học sinh**:

1. **(Router - main.js):** URL đổi thành `/student/dashboard`. Router phát hiện và gọi hàm của `studentController`.
2. **(Controller):** `studentController` chạy.
3. **(Service):** Controller gọi `quizService.getQuizzes()` để kéo danh sách các bộ đề từ DB ảo về.
4. **(View):** Controller truyền danh sách bộ đề này vào hàm `renderQuizCards()` (trong file views của student). Hàm này chạy vòng lặp và trả ra chuỗi mã HTML vẽ các thẻ bài thi.
5. **(DOM):** Controller nhét chuỗi HTML đó vào thẻ `<main>` trên trình duyệt. Người dùng nhìn thấy danh sách bộ đề.
6. **(Event):** Controller tìm các nút "Làm bài ngay" vừa tạo và cài đặt sự kiện `addEventListener`. Nếu người dùng bấm vào nút này, Controller lại ra lệnh cho Router chuyển sang trang làm bài tiếp theo.

Cấu trúc này giúp phân tách trách nhiệm rất rõ ràng (Code giao diện riêng, API riêng, Logic riêng), giúp cho dự án Vanilla JS dù có phát triển lớn hơn cũng không bị lộn xộn (spaghetti code).
