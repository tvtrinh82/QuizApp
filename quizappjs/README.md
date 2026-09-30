# QuizApp Setup Guide

Dự án này bao gồm hai phần: Backend (Java Spring Boot) và Frontend (Node.js với Vite + TailwindCSS).

## Yêu cầu hệ thống (Prerequisites)

- **Java**: JDK 17 (Cho Backend)
- **Node.js**: Phiên bản 18 trở lên (Cho Frontend)
- **Database**: PostgreSQL (Đảm bảo bạn đã cài đặt và cấu hình thông tin database trong file `application.properties` hoặc `application.yml` của Backend).

---

## 1. Hướng dẫn chạy Backend (BE)

1. Mở terminal và di chuyển vào thư mục `BE`:
   ```bash
   cd BE
   ```
2. Chạy ứng dụng bằng Gradle Wrapper:
   - Trên **Windows**:
     ```bash
     gradlew.bat bootRun
     ```
   - Trên **macOS/Linux**:
     ```bash
     ./gradlew bootRun
     ```
3. Backend sẽ khởi động (mặc định tại `http://localhost:8080`).

---

## 2. Hướng dẫn chạy Frontend (FE)

1. Mở terminal và di chuyển vào thư mục `FE`:
   ```bash
   cd FE
   ```
2. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
3. Khởi động môi trường phát triển (development server):
   ```bash
   npm run dev
   ```
4. Frontend sẽ chạy và hiển thị link truy cập (thường là `http://localhost:5173`).
