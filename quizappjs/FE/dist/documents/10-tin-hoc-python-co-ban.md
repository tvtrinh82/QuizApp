# Lap trinh Python co ban: bien, re nhanh va vong lap

**Mon hoc:** Tin hoc  
**Doi tuong:** THPT

## Muc tieu

- Luu va su dung du lieu bang bien.
- Viet cau lenh re nhanh `if/else`.
- Lap lai thao tac voi `for` va `range`.

## Bien va kieu du lieu

Python cho phep gan gia tri bang dau `=`:

```python
name = "An"
score = 8.5
passed = score >= 5
```

Mot so kieu du lieu thong dung la so nguyen `int`, so thuc `float`, chuoi `str` va logic `bool`. Ten bien nen co y nghia, bat dau bang chu cai hoac dau gach duoi, va khong trung tu khoa cua Python.

## Re nhanh

```python
score = 8.5
if score >= 5:
    print("Dat")
else:
    print("Can on tap them")
```

Khoi lenh sau `if` va `else` phai duoc thut le dong nhat. Dieu kien co the dung cac phep so sanh nhu `==`, `!=`, `<`, `<=`, `>` va `>=`.

## Vong lap

```python
total = 0
for number in range(1, 6):
    total += number
print(total)
```

`range(1, 6)` tao cac so tu 1 den 5; moc cuoi khong duoc lay. Ket qua chuong trinh la `15`. Vong lap `for` phu hop khi biet tap gia tri can duyet; can kiem tra dieu kien dung de tranh vong lap `while` chay vo han.

## Tu kiem tra

Sua `range(1, 6)` de tinh tong cac so tu 1 den 10.

**Dap an:** Dung `range(1, 11)` vi moc cuoi khong duoc lay.
