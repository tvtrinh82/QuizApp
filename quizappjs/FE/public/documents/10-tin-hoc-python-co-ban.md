# 💻 Tin học: Lập trình Python Cơ Bản

**Môn học:** Tin học | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Hiểu cách lưu trữ và sử dụng dữ liệu bằng biến.
- Viết câu lệnh rẽ nhánh logic `if/else`.
- Thực hiện vòng lặp để lặp lại thao tác với `for` và `range`.

## 📚 1. Biến và Kiểu Dữ Liệu
Python cho phép gán giá trị trực tiếp vô cùng đơn giản bằng dấu `=`:

```python
name = "An"          # Kiểu chuỗi (str)
score = 8.5          # Kiểu số thực (float)
age = 16             # Kiểu số nguyên (int)
is_passed = True     # Kiểu logic (bool)
```

*Lưu ý: Tên biến nên có ý nghĩa, bắt đầu bằng chữ cái hoặc dấu gạch dưới, và không trùng từ khóa của Python.*

## 🔀 2. Rẽ Nhánh (if/else)
Cho phép chương trình đưa ra quyết định dựa trên điều kiện:

```python
score = 8.5
if score >= 8.0:
    print("Học sinh Giỏi 🌟")
elif score >= 5.0:
    print("Học sinh Khá/Trung bình 👍")
else:
    print("Cần cố gắng thêm 💪")
```
*Khối lệnh bên trong phải được **thụt lề** (Tab) đồng nhất.*

## 🔄 3. Vòng Lặp (For)
Dùng để lặp lại một khối lệnh nhiều lần mà không cần viết lại code.

```python
# Tính tổng các số từ 1 đến 5
total = 0
for number in range(1, 6):
    total += number

print("Tổng là:", total) # Kết quả là 15
```
> **Lưu ý:** Hàm `range(a, b)` sẽ tạo ra các số từ `a` đến sát `b` (không lấy `b`).

## 🧠 Bài Tập Tự Kiểm Tra
**Đề bài:** Hãy sửa lại hàm `range()` ở ví dụ trên để tính tổng các số từ 1 đến 100.
**Đáp án:** Cần sử dụng `range(1, 101)`.
