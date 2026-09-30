const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'public', 'documents');

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const documents = {
  '01-toan-hoc-ham-so-bac-hai.md': `# 📐 Toán học: Hàm Số Bậc Hai

**Môn học:** Toán học | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Hiểu định nghĩa và tính chất của hàm số bậc hai $y = ax^2 + bx + c$.
- Xác định được tọa độ đỉnh, trục đối xứng của Parabol.
- Vẽ thành thạo đồ thị hàm số bậc hai.

## 📚 Nội Dung Cốt Lõi

### 1. Định nghĩa
Hàm số bậc hai là hàm số được cho bằng công thức:
> **$y = ax^2 + bx + c$** (với $a \\neq 0$)

### 2. Đồ thị (Parabol)
Đồ thị của hàm số bậc hai là một đường Parabol có các đặc điểm:
- **Tọa độ đỉnh:** $I(-\\frac{b}{2a}, -\\frac{\\Delta}{4a})$
- **Trục đối xứng:** Đường thẳng $x = -\\frac{b}{2a}$
- **Bề lõm:** Quay lên trên nếu $a > 0$, quay xuống dưới nếu $a < 0$.

### 3. Bảng Biến Thiên
| $x$ | $-\\infty$ | $-\\frac{b}{2a}$ | $+\\infty$ |
|---|---|---|---|
| $y$ ($a>0$) | $+\\infty$ | Cực tiểu | $+\\infty$ |
| $y$ ($a<0$) | $-\\infty$ | Cực đại | $-\\infty$ |

## 💡 Bài Tập Áp Dụng
**Đề bài:** Lập bảng biến thiên và vẽ đồ thị hàm số $y = x^2 - 4x + 3$.
**Gợi ý:** Tọa độ đỉnh $I(2, -1)$, trục đối xứng $x = 2$, đồ thị cắt trục hoành tại $x=1, x=3$.
`,

  '02-vat-ly-dinh-luat-newton.md': `# 🍎 Vật lý: Các Định Luật Newton

**Môn học:** Vật lý | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Nắm vững 3 định luật Newton về chuyển động.
- Hiểu khái niệm quán tính, lực, và gia tốc.
- Vận dụng giải bài tập động lực học.

## 📚 3 Định Luật Newton

### Định Luật I (Định luật Quán tính)
> *"Nếu một vật không chịu tác dụng của lực nào hoặc chịu tác dụng của các lực có hợp lực bằng 0, thì vật đang đứng yên sẽ tiếp tục đứng yên, đang chuyển động thẳng đều sẽ tiếp tục chuyển động thẳng đều."*

### Định Luật II (Định luật Cơ bản của Động lực học)
Gia tốc của một vật cùng hướng với lực tác dụng lên vật. Độ lớn của gia tốc tỉ lệ thuận với độ lớn của lực và tỉ lệ nghịch với khối lượng của vật.
> **Công thức:** $\\vec{F} = m \\cdot \\vec{a}$

### Định Luật III (Định luật Tương tác)
> *"Trong mọi trường hợp, khi vật A tác dụng lên vật B một lực, thì vật B cũng tác dụng lại vật A một lực. Hai lực này có cùng giá, cùng độ lớn nhưng ngược chiều."*
> **Công thức:** $\\vec{F}_{AB} = -\\vec{F}_{BA}$

## 🔬 Thí Nghiệm Tư Duy
Hãy tưởng tượng bạn đang trượt băng và ném một quả bóng rổ về phía trước. Theo định luật III, bạn sẽ bị đẩy lùi về phía sau!
`,

  '03-hoa-hoc-so-mol-va-nong-do.md': `# 🧪 Hóa học: Số Mol và Nồng Độ

**Môn học:** Hóa học | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Hiểu khái niệm Mol và Khối lượng mol ($M$).
- Nắm vững công thức tính nồng độ phần trăm ($C\\%$) và nồng độ mol ($C_M$).
- Vận dụng giải các bài toán pha chế dung dịch.

## 📚 Nội Dung Cốt Lõi

### 1. Số Mol ($n$)
Mol là lượng chất có chứa $6,022 \\times 10^{23}$ hạt vi mô (nguyên tử, phân tử...).
- **Công thức tính:** $n = \\frac{m}{M}$ (trong đó $m$ là khối lượng, $M$ là khối lượng mol).
- **Thể tích khí ở đkc:** $V = n \\times 24,79$ (lít).

### 2. Nồng độ Phần Trăm ($C\\%$)
Cho biết số gam chất tan có trong 100 gam dung dịch.
> **$C\\% = \\frac{m_{ct}}{m_{dd}} \\times 100\\%$**
*(Trong đó: $m_{dd} = m_{ct} + m_{dm}$)*

### 3. Nồng độ Mol ($C_M$)
Cho biết số mol chất tan có trong 1 lít dung dịch.
> **$C_M = \\frac{n}{V}$** (mol/L hoặc M)

## ⚠️ Lưu Ý Khi Pha Chế
Khi pha loãng dung dịch, số mol chất tan không thay đổi, chỉ có thể tích dung dịch và nồng độ thay đổi.
`,

  '04-sinh-hoc-quang-hop.md': `# 🌿 Sinh học: Sự Quang Hợp Ở Thực Vật

**Môn học:** Sinh học | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Trình bày được khái niệm và phương trình tổng quát của quang hợp.
- Phân biệt pha sáng và pha tối trong quang hợp.
- Hiểu ý nghĩa của quang hợp đối với sự sống trên Trái Đất.

## 📚 Bản Chất Của Quang Hợp

### 1. Khái Niệm
Quang hợp là quá trình lá cây sử dụng năng lượng ánh sáng mặt trời, khí $CO_2$ và nước để tổng hợp chất hữu cơ (Glucose) và giải phóng Oxi.

### 2. Phương Trình Tổng Quát
> $6CO_2 + 12H_2O \\xrightarrow{\\text{Ánh sáng, Diệp lục}} C_6H_{12}O_6 + 6O_2 + 6H_2O$

### 3. Các Pha Trong Quang Hợp
| Pha Sáng (Màng Thylakoid) | Pha Tối (Chất nền Stroma) |
|---|---|
| Cần ánh sáng trực tiếp | Không cần ánh sáng trực tiếp |
| Chuyển hóa năng lượng quang năng thành ATP và NADPH | Dùng ATP và NADPH để khử $CO_2$ tạo ra chất hữu cơ |
| Sinh ra khí $O_2$ từ quá trình quang phân li nước | Chu trình Calvin sinh ra Glucose |

## 🌍 Ý Nghĩa Sinh Thái
Quang hợp điều hòa lượng $CO_2$ và $O_2$ trong sinh quyển, đồng thời là nguồn cung cấp chất hữu cơ cơ bản cho toàn bộ chuỗi thức ăn trên hành tinh.
`,

  '05-ngu-van-cach-doc-van-ban.md': `# 📖 Ngữ Văn: Kỹ Năng Đọc Hiểu Văn Bản

**Môn học:** Ngữ Văn | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Rèn luyện kỹ năng đọc hiểu nhanh và chính xác.
- Nắm bắt được phương thức biểu đạt, biện pháp tu từ.
- Biết cách trả lời các dạng câu hỏi Đọc - Hiểu trong đề thi.

## 📚 Các Bước Đọc Hiểu Hiệu Quả

### Bước 1: Đọc Bao Quát
- Đọc lướt từ trên xuống dưới để nắm chủ đề chính.
- Chú ý đến nhan đề, tác giả, và nguồn trích dẫn.

### Bước 2: Xác Định Thể Loại & Phương Thức Biểu Đạt
- **Phương thức biểu đạt chính:** Tự sự, Miêu tả, Biểu cảm, Thuyết minh, Nghị luận, hay Hành chính - Công vụ?
- **Phong cách ngôn ngữ:** Sinh hoạt, Nghệ thuật, Báo chí, Chính luận, Khoa học, Hành chính?

### Bước 3: Phân Tích Biện Pháp Tu Từ
Chú ý các từ ngữ có tính hình tượng cao. Các biện pháp thường gặp:
- **So sánh, Ẩn dụ, Hoán dụ:** Tăng sức gợi hình, gợi cảm.
- **Điệp ngữ, Câu hỏi tu từ:** Nhấn mạnh cảm xúc, tạo nhịp điệu.

### Bước 4: Trả Lời Câu Hỏi
- **Câu hỏi nhận biết:** Trích xuất thông tin trực tiếp từ văn bản (Không suy diễn).
- **Câu hỏi thông hiểu:** Giải thích ý nghĩa câu nói, từ ngữ theo ngữ cảnh.
- **Câu hỏi vận dụng:** Trình bày quan điểm cá nhân, bài học rút ra (cần logic và thuyết phục).
`,

  '06-lich-su-viet-nam-cach-mang-thang-tam.md': `# 🇻🇳 Lịch Sử: Cách Mạng Tháng Tám 1945

**Môn học:** Lịch Sử | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Trình bày được hoàn cảnh lịch sử và diễn biến chính của Cách mạng tháng Tám.
- Phân tích nguyên nhân thắng lợi và ý nghĩa lịch sử.

## 📚 Hoàn Cảnh Lịch Sử (Thời Cơ Ngàn Năm Có Một)

### Khách quan
- Chiến tranh thế giới thứ 2 bước vào giai đoạn cuối.
- Tháng 8/1945, phát xít Nhật đầu hàng Đồng minh không điều kiện. Kẻ thù chính của nhân dân ta đã gục ngã, chính quyền tay sai hoang mang đến cực độ.

### Chủ quan
- Đảng Cộng sản Đông Dương đã có sự chuẩn bị chu đáo về lực lượng chính trị và vũ trang suốt 15 năm.
- Nhân dân ta đã sẵn sàng đứng lên quyết chiến giành độc lập.

## 🚀 Diễn Biến Chính
- **14/8 - 18/8:** Nhiều địa phương giành chính quyền cấp xã, huyện.
- **19/8/1945:** Khởi nghĩa thắng lợi ở Hà Nội.
- **23/8/1945:** Khởi nghĩa thắng lợi ở Huế (Vua Bảo Đại thoái vị).
- **25/8/1945:** Khởi nghĩa thắng lợi ở Sài Gòn.
- **2/9/1945:** Tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.

## 🌟 Ý Nghĩa Lịch Sử
Đập tan ách thống trị của thực dân Pháp hơn 80 năm và lật đổ chế độ phong kiến tồn tại hàng ngàn năm, đưa nước ta bước vào kỷ nguyên mới: Kỷ nguyên độc lập, tự do.
`,

  '07-dia-ly-khi-hau-viet-nam.md': `# 🌤️ Địa Lý: Đặc Điểm Khí Hậu Việt Nam

**Môn học:** Địa Lý | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Phân tích được tính chất nhiệt đới ẩm gió mùa của khí hậu nước ta.
- Sự phân hóa đa dạng của khí hậu theo không gian và thời gian.

## 📚 Tính Chất Nhiệt Đới Ẩm Gió Mùa

### 1. Tính chất Nhiệt Đới
- Do nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc.
- **Biểu hiện:** Tổng bức xạ mặt trời lớn, nhiệt độ trung bình năm cao (trên $20^\\circ C$ trừ vùng núi cao), số giờ nắng nhiều.

### 2. Tính chất Ẩm
- Do tiếp giáp Biển Đông và sự hoạt động của các khối khí thổi qua biển.
- **Biểu hiện:** Lượng mưa lớn (1500 - 2000 mm/năm), độ ẩm không khí cao (trên 80%).

### 3. Tính chất Gió Mùa
Khí hậu chia làm 2 mùa gió chính:
- **Gió mùa mùa Đông (Gió mùa Đông Bắc):** Lạnh, khô vào đầu mùa và lạnh, ẩm vào cuối mùa (gây mưa phùn ở miền Bắc).
- **Gió mùa mùa Hạ (Gió mùa Tây Nam):** Nóng, ẩm, gây mưa lớn cho cả nước. Đặc biệt có hiệu ứng phơn (gió Lào) khô nóng ở Bắc Trung Bộ.

## 🌍 Phân Hóa Khí Hậu
Khí hậu Việt Nam không đồng nhất mà phân hóa phức tạp:
- **Bắc - Nam:** Miền Bắc có mùa đông lạnh, miền Nam nóng quanh năm.
- **Đông - Tây:** Do địa hình đồi núi chắn gió.
- **Độ cao:** Càng lên cao nhiệt độ càng giảm, tạo ra các vành đai khí hậu (Nhiệt đới, Á nhiệt đới, Ôn đới núi cao).
`,

  '08-tieng-anh-thi-hien-tai-hoan-thanh.md': `# 🇬🇧 Tiếng Anh: Thì Hiện Tại Hoàn Thành (Present Perfect)

**Môn học:** Tiếng Anh | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Nắm vững công thức khẳng định, phủ định, nghi vấn của thì Hiện Tại Hoàn Thành.
- Phân biệt cách dùng *Since* và *For*.
- Nhận biết các dấu hiệu đặc trưng.

## 📚 Công Thức (Formula)

### 1. Khẳng định (Positive)
> **$S + have/has + V_3/ed$**
- *Ví dụ:* I have finished my homework. (Tôi đã làm xong bài tập).

### 2. Phủ định (Negative)
> **$S + have/has + NOT + V_3/ed$**
- *Ví dụ:* She hasn't visited London. (Cô ấy chưa từng đến London).

### 3. Nghi vấn (Question)
> **$Have/Has + S + V_3/ed?$**
- *Ví dụ:* Have you ever eaten sushi? (Bạn đã bao giờ ăn sushi chưa?).

*(Lưu ý: "has" dùng cho He/She/It; "have" dùng cho I/You/We/They)*

## 💡 Cách Sử Dụng & Dấu Hiệu (Usage & Keywords)

Thì Hiện tại hoàn thành dùng để diễn tả:
1. Hành động bắt đầu ở quá khứ và **kéo dài đến hiện tại**.
2. Trải nghiệm, kinh nghiệm cho đến thời điểm hiện tại.

**Dấu hiệu nhận biết:**
- \`since\` + Mốc thời gian (since 2010, since yesterday...)
- \`for\` + Khoảng thời gian (for 3 years, for a long time...)
- \`already\` (rồi), \`yet\` (chưa), \`just\` (vừa mới)
- \`ever\` (đã từng), \`never\` (chưa từng)
- \`recently\`, \`lately\` (gần đây), \`so far\`, \`up to now\` (cho đến nay)
`,

  '09-giao-duc-cong-dan-quyen-va-nghia-vu.md': `# ⚖️ GDCD: Quyền và Nghĩa Vụ Cơ Bản Của Công Dân

**Môn học:** Giáo dục công dân | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Hiểu mối quan hệ biện chứng giữa quyền và nghĩa vụ công dân.
- Nhận biết việc thực hiện quyền phải tôn trọng pháp luật và quyền của người khác.
- Biết cách xử lý khi quyền hợp pháp bị xâm phạm.

## 📚 Nội Dung Cốt Lõi

### Khái Niệm
- **Quyền công dân:** Là những khả năng, lợi ích mà công dân được pháp luật ghi nhận và bảo đảm thực hiện.
- **Nghĩa vụ công dân:** Là những việc mà pháp luật bắt buộc công dân phải thực hiện để đáp ứng lợi ích của Nhà nước và xã hội.

### Mối Quan Hệ Giữa Quyền Và Nghĩa Vụ
Quyền và nghĩa vụ có mối quan hệ gắn bó mật thiết, không thể tách rời:
- Mọi công dân đều bình đẳng về quyền và nghĩa vụ.
- Nhà nước bảo đảm quyền của công dân, ngược lại công dân phải làm tròn nghĩa vụ với Nhà nước.
- **Nguyên tắc:** Việc thực hiện quyền tự do của công dân không được xâm phạm đến lợi ích quốc gia, dân tộc, quyền và lợi ích hợp pháp của người khác.

### 🛡️ Tình Huống Thực Tế
**Tình huống:** Một học sinh cố tình chia sẻ hình ảnh cá nhân của bạn cùng lớp lên mạng xã hội với mục đích trêu đùa khi chưa được sự đồng ý.

**Phân tích & Giải quyết:**
Hành vi này đã vi phạm quyền bí mật đời tư và hình ảnh cá nhân của người khác (dù mang danh nghĩa "tự do ngôn luận").
Cách giải quyết: Yêu cầu gỡ ngay hình ảnh, xin lỗi công khai. Nếu hình ảnh mang tính bôi nhọ, đe dọa, có thể báo cáo cho giáo viên, phụ huynh hoặc cơ quan chức năng để xử lý theo pháp luật.
`,

  '10-tin-hoc-python-co-ban.md': `# 💻 Tin học: Lập trình Python Cơ Bản

**Môn học:** Tin học | **Đối tượng:** THPT

---

## 🎯 Mục Tiêu
- Hiểu cách lưu trữ và sử dụng dữ liệu bằng biến.
- Viết câu lệnh rẽ nhánh logic \`if/else\`.
- Thực hiện vòng lặp để lặp lại thao tác với \`for\` và \`range\`.

## 📚 1. Biến và Kiểu Dữ Liệu
Python cho phép gán giá trị trực tiếp vô cùng đơn giản bằng dấu \`=\`:

\`\`\`python
name = "An"          # Kiểu chuỗi (str)
score = 8.5          # Kiểu số thực (float)
age = 16             # Kiểu số nguyên (int)
is_passed = True     # Kiểu logic (bool)
\`\`\`

*Lưu ý: Tên biến nên có ý nghĩa, bắt đầu bằng chữ cái hoặc dấu gạch dưới, và không trùng từ khóa của Python.*

## 🔀 2. Rẽ Nhánh (if/else)
Cho phép chương trình đưa ra quyết định dựa trên điều kiện:

\`\`\`python
score = 8.5
if score >= 8.0:
    print("Học sinh Giỏi 🌟")
elif score >= 5.0:
    print("Học sinh Khá/Trung bình 👍")
else:
    print("Cần cố gắng thêm 💪")
\`\`\`
*Khối lệnh bên trong phải được **thụt lề** (Tab) đồng nhất.*

## 🔄 3. Vòng Lặp (For)
Dùng để lặp lại một khối lệnh nhiều lần mà không cần viết lại code.

\`\`\`python
# Tính tổng các số từ 1 đến 5
total = 0
for number in range(1, 6):
    total += number

print("Tổng là:", total) # Kết quả là 15
\`\`\`
> **Lưu ý:** Hàm \`range(a, b)\` sẽ tạo ra các số từ \`a\` đến sát \`b\` (không lấy \`b\`).

## 🧠 Bài Tập Tự Kiểm Tra
**Đề bài:** Hãy sửa lại hàm \`range()\` ở ví dụ trên để tính tổng các số từ 1 đến 100.
**Đáp án:** Cần sử dụng \`range(1, 101)\`.
`
};

Object.entries(documents).forEach(([filename, content]) => {
  const filePath = path.join(docsDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Đã nâng cấp file: ${filename}`);
});

console.log('\\nHoàn tất nâng cấp 10 file tài liệu với định dạng Markdown tuyệt đẹp và chuẩn UTF-8!');
