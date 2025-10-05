# Hướng dẫn sử dụng Admin Panel

## Truy cập Admin Panel

1. Trên trang chính, click vào icon bánh răng (⚙️) ở góc phải navigation bar
2. Hoặc truy cập trực tiếp: `http://localhost:8080/admin` (dev) hoặc `https://yourdomain.com/admin` (production)

## Đăng nhập

- **Mật khẩu mặc định**: `admin123`
- Mật khẩu được lưu trong localStorage của trình duyệt
- Để đổi mật khẩu, bạn có thể chỉnh sửa trong localStorage hoặc tạo thêm tính năng đổi mật khẩu

## Quản lý Dự án

### Tạo dự án mới
1. Click nút **"Tạo dự án mới"**
2. Điền các thông tin:
   - **Tên dự án** (bắt buộc)
   - **Mô tả** (bắt buộc)
   - **Công nghệ sử dụng** (bắt buộc - thêm bằng cách nhập và nhấn Enter)
   - **Github URL** (tùy chọn)
   - **Demo URL** (tùy chọn)
   - **Màu gradient** (chọn từ danh sách)
3. Click **"Tạo mới"**

### Sửa dự án
1. Click nút **"Sửa"** trên card dự án
2. Chỉnh sửa thông tin trong form
3. Click **"Cập nhật"**

### Xóa dự án
1. Click nút **"Xóa"** trên card dự án
2. Xác nhận xóa trong dialog

## Lưu trữ

- Tất cả dự án được lưu trong **localStorage** của trình duyệt
- Dữ liệu sẽ không bị mất khi deploy lên Vercel
- Mỗi trình duyệt/thiết bị sẽ có dữ liệu riêng

## Lưu ý khi Deploy lên Vercel

- Không cần cấu hình database hay backend
- Dữ liệu lưu trên client-side nên hoàn toàn miễn phí
- Mật khẩu được mã hóa đơn giản bằng Base64
- Để bảo mật tốt hơn, nên thêm authentication phía server

## Đổi mật khẩu

Mở Console của trình duyệt và chạy:
```javascript
localStorage.setItem('portfolio_admin_password', btoa('mật_khẩu_mới'));
```

Hoặc xóa mật khẩu để reset về mặc định:
```javascript
localStorage.removeItem('portfolio_admin_password');
```
