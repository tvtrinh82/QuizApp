# Cẩm nang học dự án Quiz App (BE + FE)

Tài liệu này mô tả cấu trúc và luồng chạy của hai thư mục hiện tại:

- Backend (BE): `C:\Users\tranv\IdeaProjects\BE`
- Frontend (FE): `C:\Users\tranv\OneDrive\CODEEZ\FE\quiz-app-vanilla`

FE và BE là hai ứng dụng riêng, nói chuyện qua HTTP. PostgreSQL là nơi lưu dữ
liệu; Docker Desktop chỉ chạy PostgreSQL trong môi trường phát triển.

## 1. Sơ đồ tổng quan

```text
Trình duyệt
  FE: http://localhost:5173
       |
       | HTTP + JSON, header xác thực
       v
  BE: http://localhost:8080
       |
       | JDBC
       v
  PostgreSQL: localhost:5432 (container Docker)
```

FE không kết nối trực tiếp tới PostgreSQL. FE gửi yêu cầu API đến BE; BE kiểm
tra quyền, đọc/ghi dữ liệu PostgreSQL rồi trả JSON về cho FE.

## 2. Cấu trúc backend

```text
BE/
├── build.gradle
├── settings.gradle
├── gradlew
├── gradlew.bat
├── compose.yaml
├── HELP.md
├── PROJECT_GUIDE_VI.md
├── src/
│   ├── main/
│   │   ├── java/com/example/be/
│   │   │   ├── BeApplication.java
│   │   │   └── api/
│   │   │       ├── AdminBootstrap.java
│   │   │       ├── ApiDataMapper.java
│   │   │       ├── ApiException.java
│   │   │       ├── ApiExceptionHandler.java
│   │   │       ├── AuthApiService.java
│   │   │       ├── AuthInterceptor.java
│   │   │       ├── AuthPrincipal.java
│   │   │       ├── QuizApiController.java
│   │   │       ├── QuizApiService.java
│   │   │       ├── QuizContentApiService.java
│   │   │       ├── ResultApiService.java
│   │   │       ├── TokenService.java
│   │   │       ├── UserApiService.java
│   │   │       └── WebConfig.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/migration/
│   │           ├── V1__create_quiz_schema.sql
│   │           └── V2__add_api_profile_and_quiz_fields.sql
│   └── test/
│       ├── java/com/example/be/BeApplicationTests.java
│       └── resources/application-test.properties
└── gradle/wrapper/
```

### Vai trò các thành phần BE

| Thành phần | Trách nhiệm |
| --- | --- |
| `BeApplication.java` | Điểm vào của ứng dụng Spring Boot. |
| `QuizApiController.java` | Khai báo URL, HTTP method, nhận request và gọi service. |
| `QuizApiService.java` | Lớp điều phối, chuyển yêu cầu đến service nghiệp vụ phù hợp. |
| `AuthApiService.java` | Đăng ký tài khoản học sinh, kiểm tra mật khẩu khi đăng nhập và cấp token. |
| `UserApiService.java` | Tạo, đọc, sửa, xóa tài khoản; mã hóa mật khẩu khi tạo/đổi mật khẩu. |
| `QuizContentApiService.java` | Đọc/ghi đề thi, câu hỏi, lựa chọn; chỉ gửi đáp án đúng cho admin. |
| `ResultApiService.java` | Nhận bài làm, tự chấm ở backend, lưu kết quả và lịch sử. |
| `ApiDataMapper.java` | Chuyển hàng SQL thành cấu trúc JSON và kiểm tra/chuyển kiểu dữ liệu dùng chung. |
| `AuthInterceptor.java` | Kiểm tra thông tin Bearer trong header trước các request cần đăng nhập. |
| `TokenService.java` | Tạo access token ngẫu nhiên, lưu phiên trong bộ nhớ BE và kiểm tra thời hạn. |
| `AuthPrincipal.java` | Đại diện người dùng đã xác thực: ID và role. |
| `WebConfig.java` | Đăng ký interceptor và quy tắc CORS cho FE. |
| `ApiException.java` | Ngoại lệ nghiệp vụ kèm HTTP status. |
| `ApiExceptionHandler.java` | Chuyển ngoại lệ thành HTTP response JSON. |
| `AdminBootstrap.java` | Tạo admin ban đầu từ biến môi trường nếu email chưa tồn tại. Không tự nâng role tài khoản cũ. |
| `application.properties` | Cấu hình kết nối DB, Flyway, CORS, thời hạn token, admin bootstrap. |
| `db/migration/V*.sql` | Phiên bản schema. Flyway áp dụng tuần tự khi BE khởi động. |
| `BeApplicationTests.java` | Test khởi tạo Spring context bằng cấu hình test. |
| `compose.yaml` | Khai báo PostgreSQL, cổng, volume và healthcheck Docker. |
| `build.gradle` | Plugin, phiên bản Java, thư viện và cấu hình tác vụ Gradle. |

### Luồng một request trong BE

1. `QuizApiController` nhận HTTP request, ví dụ `POST /results`.
2. `AuthInterceptor` bỏ qua endpoint công khai như `/login`, `/register`, `/health`;
   với endpoint còn lại, nó đọc header xác thực của request.
3. Nếu token hợp lệ, interceptor đặt `AuthPrincipal` vào request.
4. Controller kiểm tra quyền cần thiết rồi gọi `QuizApiService`.
5. Service điều phối sang `AuthApiService`, `UserApiService`,
   `QuizContentApiService` hoặc `ResultApiService`.
6. Service dùng `JdbcTemplate` để chạy SQL và trả dữ liệu JSON.
7. `ApiExceptionHandler` đổi lỗi nghiệp vụ thành status như 400, 401, 403, 404,
   409; FE nhận response và hiển thị phù hợp.

## 3. Cấu trúc frontend

```text
quiz-app-vanilla/
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── project_architecture.md
├── src/
│   ├── main.js
│   ├── appShell.js
│   ├── input.css
│   ├── core/
│   │   ├── http.js
│   │   ├── router.js
│   │   └── state.js
│   ├── routes/
│   │   ├── publicRoutes.js
│   │   ├── adminRoutes.js
│   │   └── studentRoutes.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── adminDocumentController.js
│   │   ├── adminQuizController.js
│   │   ├── adminResultController.js
│   │   ├── adminUserController.js
│   │   ├── authController.js
│   │   ├── authProfileController.js
│   │   ├── studentController.js
│   │   ├── studentDashboardController.js
│   │   ├── studentDocumentController.js
│   │   └── studentQuizController.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── documentService.js
│   │   ├── quizService.js
│   │   ├── resultService.js
│   │   └── userService.js
│   ├── views/
│   │   ├── components/AdminLayout.js
│   │   └── pages/
│   │       ├── login.js
│   │       ├── register.js
│   │       ├── admin/
│   │       │   ├── documents.js
│   │       │   ├── quizDetail.js
│   │       │   ├── quizzes.js
│   │       │   ├── results.js
│   │       │   └── users.js
│   │       └── student/
│   │           ├── dashboard.js
│   │           ├── documents.js
│   │           └── takeQuiz.js
│   └── utils/modal.js
├── add_questions.js
├── seed_quizzes.js
└── scratch_register.js
```

`node_modules/` chứa thư viện cài bằng npm; `dist/` là kết quả sinh ra khi build.
Không sửa code ứng dụng bên trong các thư mục này bằng tay. Các script ở thư
mục gốc như `seed_quizzes.js` là script hỗ trợ riêng, không phải module FE chính.

### Vai trò các thành phần FE

| Thành phần | Trách nhiệm |
| --- | --- |
| `index.html` | HTML gốc; chứa phần tử `#app` để SPA render vào. |
| `src/main.js` | Tạo router, khởi tạo giao diện/chế độ tối, đăng ký các route và chạy app. |
| `src/appShell.js` | Header dùng chung, menu, đăng xuất, mở hồ sơ và dark mode. |
| `src/core/router.js` | Đổi nội dung theo URL mà không tải lại toàn trang. |
| `src/core/http.js` | Bọc `fetch`, gắn Bearer token và gửi request tới BE port 8080. |
| `src/core/state.js` | Lưu thông tin user đang đăng nhập; access token được giữ trong HttpOnly cookie của BE. |
| `src/routes/` | Kết nối từng URL trang với hàm render và lifecycle của controller. |
| `src/controllers/` | Xử lý hành động người dùng, gọi service và cập nhật DOM. Các file tổng hợp như `adminController.js` ghép controller theo domain. |
| `src/services/` | Gọi API cho xác thực, người dùng, đề thi, kết quả hoặc tài liệu. |
| `src/views/` | Sinh HTML cho các trang và thành phần giao diện. |
| `src/utils/modal.js` | Modal xác nhận/thông báo dùng chung. |
| `src/input.css` | CSS/Tailwind entry point. |
| `package.json` | Lệnh npm và dependencies của FE. |
| `postcss.config.js`, `tailwind.config.js` | Cấu hình xử lý CSS và Tailwind. |
| `project_architecture.md` | Ghi chú kiến trúc FE hiện có; cẩm nang này mô tả cách chạy cả FE và BE. |

### Luồng một thao tác FE

Ví dụ học sinh nộp bài:

1. `studentQuizController.js` thu thập lựa chọn của học sinh.
2. `resultService.js` gọi `POST /results`.
3. `http.js` gửi cookie cùng request bằng `credentials: "include"`.
4. BE tự lấy đáp án từ DB, chấm điểm, lưu kết quả rồi trả JSON.
5. FE đọc `correctCount` và `score` từ response để hiện màn hình kết quả.

Không gửi `correctOption` từ trình duyệt khi nộp bài: đáp án đúng phải được giữ
ở BE để người học không thể sửa request tự nâng điểm.

## 4. Cơ sở dữ liệu và quan hệ

Các migration nằm trong `src/main/resources/db/migration/`.

- `users`: tài khoản, role, trạng thái, mật khẩu đã băm.
- `quizzes`: bộ đề, môn học, thời lượng và trạng thái.
- `questions`: câu hỏi thuộc một bộ đề.
- `question_options`: các lựa chọn và cờ đánh dấu đáp án đúng.
- `results`: kết quả của một người dùng cho một bộ đề.
- `result_answers`: câu trả lời theo từng câu hỏi.
- `result_answer_options`: lựa chọn mà học sinh đã chọn.

Quan hệ chính:

```text
users 1 ─── * quizzes (created_by)
quizzes 1 ─── * questions 1 ─── * question_options
users 1 ─── * results * ─── 1 quizzes
results 1 ─── * result_answers * ─── 1 questions
result_answers * ─── * question_options (qua result_answer_options)
```

Không sửa schema trực tiếp trên database để thay đổi lâu dài. Thay vào đó thêm
migration mới, ví dụ `V3__add_new_field.sql`; không chỉnh sửa migration cũ đã
được áp dụng ở máy khác, vì Flyway ghi checksum migration.

## 5. API hiện có

| Method | Endpoint | Quyền | Tác dụng |
| --- | --- | --- | --- |
| `GET` | `/health` | Công khai | Kiểm tra BE đang chạy. |
| `POST` | `/register` | Công khai | Tạo tài khoản học sinh. |
| `POST` | `/login` | Công khai | Xác thực email/mật khẩu, đặt `accessToken` trong HttpOnly cookie và trả user. |
| `POST` | `/api/auth/logout` | Công khai | Thu hồi phiên hiện tại và xóa cookie đăng nhập. |
| `GET` | `/quizzes` | Đã đăng nhập | Lấy danh sách bộ đề. |
| `GET` | `/quizzes/{id}` | Đã đăng nhập | Lấy đề và câu hỏi; đáp án đúng chỉ trả cho admin. |
| `POST` | `/api/quizzes/{quizId}/start` | Học sinh | Tạo hoặc tiếp tục lượt thi đang làm và trả thời điểm bắt đầu/thời lượng. |
| `GET` | `/api/quizzes/{quizId}/status` | Học sinh | Lấy thời điểm bắt đầu và hạn làm bài để khôi phục đồng hồ sau refresh. |
| `POST` | `/quizzes` | Admin | Tạo bộ đề. |
| `PATCH` | `/quizzes/{id}` | Admin | Sửa bộ đề hoặc trạng thái mở/khóa. |
| `DELETE` | `/quizzes/{id}` | Admin | Xóa bộ đề. |
| `POST` | `/questions` | Admin | Thêm câu hỏi và lựa chọn. |
| `GET` | `/users` | Admin | Lấy danh sách tài khoản. |
| `POST` | `/users` | Admin | Tạo học sinh/giáo viên từ màn hình quản trị. |
| `PATCH` | `/users/{id}` | Admin hoặc chính chủ | Sửa hồ sơ; chỉ admin được sửa role. |
| `DELETE` | `/users/{id}` | Admin | Xóa tài khoản. |
| `GET` | `/results` | Đã đăng nhập | Admin xem toàn bộ; học sinh chỉ xem kết quả của mình. |
| `GET` | `/results/{id}` | Chủ bài thi hoặc admin | Lấy chi tiết kết quả gồm câu đã trả lời, lựa chọn đã chọn và đáp án đúng. |
| `POST` | `/results` | Học sinh | Nộp đáp án; BE tự chấm, tính thời gian từ lượt thi, đánh dấu bài nộp trễ và trả về chi tiết answers. |

API tài liệu `/documents` hiện chưa có trong BE. Service FE tài liệu còn dùng mock
server ở port 3001; những trang tài liệu vì vậy chưa dùng chung PostgreSQL/BE.

## 6. Cách chạy dự án trên Windows PowerShell

Mở ba terminal riêng. Giữ từng terminal đang chạy mở.

### Terminal 1: PostgreSQL

```powershell
Set-Location "C:\Users\tranv\IdeaProjects\BE"
docker compose up -d postgres
docker compose ps
```

- `Set-Location`: chuyển thư mục hiện hành.
- `docker compose up`: tạo hoặc khởi động các service đã khai báo trong `compose.yaml`.
- `-d`: chạy container nền để terminal được dùng tiếp.
- `postgres`: chỉ chạy service PostgreSQL, không yêu cầu chạy các service khác.
- `docker compose ps`: xem trạng thái; mong muốn là `Up`/`running` và health `healthy`.

Để dừng PostgreSQL mà vẫn giữ dữ liệu:

```powershell
docker compose stop postgres
```

Để khởi động lại:

```powershell
docker compose start postgres
```

Không dùng `docker compose down -v` nếu muốn giữ dữ liệu. Tùy chọn `-v` xóa
volume database.

### Terminal 2: Backend

Lần đầu cần tạo admin bằng email chưa có trong database và mật khẩu mạnh, ít nhất
12 ký tự:

```powershell
Set-Location "C:\Users\tranv\IdeaProjects\BE"
$env:BOOTSTRAP_ADMIN_EMAIL = "admin@example.com"
$env:BOOTSTRAP_ADMIN_PASSWORD = "thay-bang-mat-khau-manh-it-nhat-12-ky-tu"
.\gradlew.bat bootRun
```

- `$env:NAME = ...`: đặt biến môi trường cho terminal PowerShell hiện tại.
- `BOOTSTRAP_ADMIN_*`: được đọc khi BE khởi động. Bootstrap chỉ thêm admin khi
  email chưa tồn tại; nếu email đã là học sinh, lệnh này không tự nâng role.
- `.\gradlew.bat`: chạy Gradle Wrapper trên Windows, dùng phiên bản Gradle của repo.
- `bootRun`: compile nếu cần rồi khởi động Spring Boot.
- `Ctrl+C`: dừng backend.

Mỗi lần cần chạy lại BE trong terminal mới, đặt lại các biến cần thiết trong
terminal đó. Cấu hình database mặc định đã ở `application.properties`.
Địa chỉ kiểm tra: `http://localhost:8080/health`.

### Terminal 3: Frontend

```powershell
Set-Location "C:\Users\tranv\OneDrive\CODEEZ\FE\quiz-app-vanilla"
npm run dev
```

Mở URL mà Vite in ra, thường là `http://localhost:5173`. Đăng nhập bằng tài
khoản admin đã cấu hình hoặc tự đăng ký một tài khoản học sinh.

### Các lệnh phát triển thường dùng

Chạy trong thư mục BE:

```powershell
.\gradlew.bat test
.\gradlew.bat clean test
```

- `test`: chạy test tự động.
- `clean`: xóa output build cũ trước khi chạy tác vụ tiếp theo.

Chạy trong thư mục FE:

```powershell
npm run build
npm run preview
```

- `build`: tạo bản production trong `dist/`.
- `preview`: phục vụ bản build để xem thử; cần chạy build trước.
- `npm run dev`: server phát triển có hot reload.

## 7. Ý nghĩa các dòng code quan trọng

### 7.1 FE khởi động và đăng ký route (`src/main.js`)

```js
const router = new Router('#app');
initDarkMode();
registerPublicRoutes(router);
registerAdminRoutes(router);
registerStudentRoutes(router);
router.start();
```

- `new Router('#app')`: bảo router render nội dung vào `<div id="app">`.
- `initDarkMode()`: áp dụng theme đã lưu hoặc theme hệ điều hành.
- `register...Routes(router)`: đăng ký URL cho khách, admin, học sinh.
- `router.start()`: đọc URL hiện tại và render trang tương ứng.

### 7.2 Request FE tới BE (`src/core/http.js`)

```js
const API_URL = 'http://localhost:8080';
const response = await fetch(url, {
  ...config,
  credentials: 'include',
});
```

- `API_URL`: địa chỉ gốc của backend; nếu BE đổi cổng thì cập nhật cấu hình này.
- `credentials: 'include'`: gửi/nhận cookie khi FE và BE khác port.
- Cookie `accessToken` là `HttpOnly`, JavaScript không thể đọc trực tiếp token.
- Khi triển khai HTTPS, đặt `AUTH_COOKIE_SECURE=true` để bật cờ `Secure`.
- `fetch`: gửi HTTP request; `await` chờ kết quả bất đồng bộ.
- `response.ok`: kiểm tra status HTTP có thuộc nhóm 2xx.
- `response.json()`: giải mã JSON backend trả về.

### 7.3 Khai báo một endpoint (`QuizApiController.java`)

```java
@PostMapping("/quizzes")
public Map<String, Object> createQuiz(
        @RequestBody Map<String, Object> body, HttpServletRequest request) {
    requireAdmin(request);
    return service.createQuiz(body, principal(request));
}
```

- `@RestController`: lớp này nhận request web và trả object thành JSON.
- `@PostMapping`: ánh xạ HTTP `POST` và đường dẫn `/quizzes`.
- `@RequestBody`: đọc JSON body thành Java `Map`.
- `requireAdmin`: chặn role không được phép; giao diện FE không phải ranh giới bảo mật.
- `service.createQuiz(...)`: đưa nghiệp vụ ra khỏi lớp HTTP controller.
- `return`: object trả về được Spring serialize thành JSON.

### 7.4 Chặn request chưa đăng nhập (`AuthInterceptor.java`)

```java
Cookie[] cookies = request.getCookies();
String token = findCookie(cookies, "accessToken");
if (token == null) {
    throw new ApiException(HttpStatus.UNAUTHORIZED, "Vui lòng đăng nhập.");
}
AuthPrincipal principal = tokenService.resolve(token);
request.setAttribute("principal", principal);
```

- Lấy token từ cookie `accessToken`, cookie được đặt `HttpOnly` để JavaScript không đọc được.
- `resolve` kiểm tra token và hạn phiên.
- `setAttribute` gắn danh tính đã kiểm chứng để controller dùng tiếp.
- `401 Unauthorized`: thiếu/sai/hết hạn token; `403 Forbidden`: đã đăng nhập nhưng
  không đủ quyền.

FE gọi API cần bật gửi cookie (`credentials: "include"` với Fetch hoặc
`withCredentials: true` với Axios). CORS chỉ cho phép các origin được cấu hình và
bật credentials; không dùng wildcard origin với cookie.

### 7.5 Chấm điểm (`studentQuizController.js` và `ResultApiService.java`)

FE bắt đầu lượt thi bằng `POST /api/quizzes/{quizId}/start`; BE lưu `start_time`
trong `quiz_attempts`. Khi tải lại trang, FE gọi endpoint `/status` để lấy lại
`startTime`, `durationSeconds` và `expiresAt`. Khi nộp, FE gửi `quizId` và danh
sách `{ questionId, selectedOption }`; BE bỏ qua mọi `timeSpent` từ FE, tự tính
thời gian từ database và chấp nhận sai số mạng tối đa 120 giây. Nộp sau thời
gian này vẫn được lưu nhưng kết quả có `isLate: true` và `status: "Nộp trễ"`.

### 7.6 CORS khác với xác thực

CORS trong `WebConfig.java` cho phép trang FE trên `localhost:5173` gọi API ở
`localhost:8080`. CORS là quy tắc trình duyệt về origin, **không thay thế đăng
nhập hay phân quyền**. Quyền vẫn được kiểm tra bởi interceptor/controller ở BE.

## 8. Các khái niệm nên nắm

1. **Frontend / Backend / Database:** FE trình bày và nhận thao tác; BE thực thi
   nghiệp vụ; database lưu dữ liệu bền vững.
2. **HTTP method:** `GET` đọc, `POST` tạo/gửi, `PATCH` cập nhật một phần,
   `DELETE` xóa.
3. **JSON:** định dạng trao đổi dữ liệu, ví dụ `{ "title": "Đề Toán" }`.
4. **REST endpoint:** tổ hợp method + URL; ví dụ `GET /quizzes` khác `POST /quizzes`.
5. **Status code:** `200` thành công, `201` là mã thường dùng khi tạo mới,
   `400` dữ liệu sai,
   `401` chưa xác thực, `403` thiếu quyền, `404` không tồn tại, `409` xung đột.
6. **CORS:** chính sách trình duyệt điều khiển trang web nào được gọi API.
7. **Authentication / Authorization:** authentication xác minh bạn là ai;
   authorization xác định bạn được làm gì.
8. **Password hashing:** BE dùng BCrypt lưu hash thay vì mật khẩu gốc; hash không
   thể dùng như mật khẩu để đăng nhập.
9. **UUID:** ID dạng chuỗi như `xxxxxxxx-xxxx-...`; không chuyển sang số nguyên.
10. **Foreign key:** liên kết dữ liệu, ví dụ câu hỏi thuộc đề; database bảo vệ
    tính toàn vẹn khi xóa/cập nhật.
11. **Migration:** thay đổi schema có phiên bản, chạy tuần tự qua Flyway.
12. **Transaction:** nhóm lệnh DB thành một đơn vị; nếu một bước lỗi, các thay đổi
    liên quan có thể rollback.
13. **Dependency injection:** Spring tự tạo và nối các lớp qua constructor, ví dụ
    controller nhận `QuizApiService`.
14. **Async/await và Promise:** cách chờ thao tác mạng mà không khóa giao diện.
15. **SPA/router:** ứng dụng một trang; router đổi nội dung theo URL mà không tải
    lại toàn bộ HTML.
16. **Environment variable:** cấu hình theo máy/môi trường; không hard-code mật
    khẩu production vào source code.

Access token của dự án là chuỗi ngẫu nhiên được lưu trong bộ nhớ BE, không phải
JWT. Vì vậy khi backend khởi động lại, các phiên đăng nhập cũ mất hiệu lực và
người dùng cần đăng nhập lại. `localStorage` ở FE vẫn có thể còn token cũ; khi
API trả `401`, đăng xuất rồi đăng nhập lại.

## 9. Xem dữ liệu PostgreSQL

Các lệnh dưới đây dùng PowerShell và container trong `compose.yaml`:

```powershell
docker exec be-postgres psql -U quiz_app -d quiz_app -c "\dt"
docker exec be-postgres psql -U quiz_app -d quiz_app -c "SELECT subject, title FROM quizzes ORDER BY subject;"
docker exec be-postgres psql -U quiz_app -d quiz_app -c "SELECT role, COUNT(*) FROM users GROUP BY role;"
```

- `docker exec`: chạy chương trình bên trong container đang chạy.
- `psql`: terminal tương tác của PostgreSQL.
- `-U quiz_app`: đăng nhập DB bằng user cấu hình trong Compose.
- `-d quiz_app`: chọn database.
- `-c`: thực thi câu SQL được truyền trong dấu ngoặc kép.
- `\dt`: liệt kê bảng.

### Gọi API thủ công bằng PowerShell

Kiểm tra health (không cần đăng nhập):

```powershell
Invoke-RestMethod "http://localhost:8080/health"
```

Đăng nhập; thay giá trị bằng tài khoản của bạn. Không gửi mật khẩu cho người
khác hoặc ghi mật khẩu thật vào file được commit:

```powershell
$login = Invoke-RestMethod -Method Post `
  -Uri "http://localhost:8080/login" `
  -ContentType "application/json" `
  -Body (@{ email = "email-cua-ban"; password = "mat-khau-cua-ban" } | ConvertTo-Json)
$headers = @{ Authorization = "Bearer $($login.accessToken)" }
Invoke-RestMethod -Uri "http://localhost:8080/quizzes" -Headers $headers
```

- `Invoke-RestMethod`: gửi HTTP request và tự chuyển JSON response thành object PowerShell.
- `-Method Post`: chọn HTTP method.
- `-ContentType`: báo cho BE body là JSON.
- `ConvertTo-Json`: chuyển hashtable PowerShell sang JSON.
- `$login.accessToken`: token được trả về khi đăng nhập.
- `$headers`: gửi token cùng các API cần xác thực.

## 10. Gỡ lỗi nhanh

| Triệu chứng | Kiểm tra |
| --- | --- |
| Không kết nối được API | Mở `http://localhost:8080/health`; xem backend còn chạy không. |
| FE không tải được dữ liệu | Mở Developer Tools → Network/Console; kiểm tra URL, HTTP status, token và CORS. |
| `401` | Đăng nhập lại; token có thể hết hạn hoặc BE vừa restart. |
| `403` | Tài khoản đăng nhập không có role cần thiết. |
| Lỗi DB khi BE khởi động | Chạy `docker compose ps`; kiểm tra port 5432 và biến `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`. |
| Đề không hiện | Kiểm tra `GET /quizzes`, trạng thái đề, và account đang đăng nhập. |
| Trang tài liệu lỗi | Tài liệu hiện gọi mock server port 3001; BE chưa triển khai `/documents`. |
| Cổng 8080/5173 bận | Dừng tiến trình cũ hoặc cấu hình cổng khác và cập nhật URL/CORS tương ứng. |

Gợi ý học theo thứ tự: chạy dự án → đọc `src/main.js` FE → đọc `http.js` và
service FE → theo request vào `QuizApiController` → đọc service BE → xem migration
và dữ liệu trong PostgreSQL.
