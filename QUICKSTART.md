# ⚡ Quick Start Guide

## 🎯 Bạn muốn làm gì?

### 1️⃣ Chạy project local (5 phút)
```bash
npm install
npm run dev
```
→ Mở http://localhost:8080
→ Vào `/admin` và đăng nhập với mật khẩu `admin123`

---

### 2️⃣ Deploy lên Vercel NGAY (10 phút)
```bash
# 1. Push lên GitHub
git add .
git commit -m "Initial commit"
git push

# 2. Vào vercel.com → Import project → Deploy
```
✅ **Xong!** Website đã live (dùng LocalStorage)

---

### 3️⃣ Nâng cấp lên Supabase (30 phút)

**Tại sao?**
- ✅ Data lưu trên cloud
- ✅ Sync mọi thiết bị
- ✅ Không mất data khi clear cache

**Làm thế nào?**
1. Đọc **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**
2. Tạo tài khoản Supabase (miễn phí)
3. Chạy SQL script tạo database
4. Copy API keys vào Vercel
5. Redeploy

---

## 📖 Tài liệu đầy đủ

- **[OVERVIEW.md](./OVERVIEW.md)** - Tổng quan toàn bộ hệ thống
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** - Cách dùng admin panel
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Setup database
- **[VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)** - Deploy chi tiết

---

## 🔥 Features chính

| Tính năng | Mô tả |
|-----------|-------|
| 🎨 Portfolio | Hiển thị dự án đẹp mắt |
| 🔐 Admin Panel | Quản lý dự án dễ dàng |
| ✏️ CRUD | Tạo/Sửa/Xóa dự án |
| 💾 Dual Storage | LocalStorage hoặc Supabase |
| 🚀 Vercel Ready | Deploy 1 click |
| 📱 Responsive | Hoạt động mọi thiết bị |

---

## 🎮 Truy cập Admin

**URL**: `/admin`
**Mật khẩu mặc định**: `admin123`

**Đổi mật khẩu**: Xem [ADMIN_GUIDE.md](./ADMIN_GUIDE.md#đổi-mật-khẩu)

---

## 🆘 Cần giúp?

### Lỗi khi build
```bash
npm run build
# Kiểm tra output, fix lỗi
```

### Lỗi khi deploy Vercel
1. Check build logs trong Vercel Dashboard
2. Verify environment variables
3. Xem [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md#troubleshooting)

### Data bị mất
- **LocalStorage**: Xóa cache browser = mất data
- **Supabase**: Data an toàn, check Supabase dashboard

---

## 💡 Tips

- 🔒 Đổi mật khẩu ngay sau deploy
- 📊 Monitor Supabase usage (free: 500MB)
- 🎨 Customize colors trong `tailwind.config.ts`
- 📱 Test responsive trên mobile
- 🔄 Backup data định kỳ

---

## ✅ Checklist Deploy

- [ ] Code chạy local (npm run dev)
- [ ] Build thành công (npm run build)
- [ ] Đã push lên GitHub
- [ ] Deploy lên Vercel
- [ ] Test admin panel
- [ ] Đổi mật khẩu
- [ ] (Optional) Setup Supabase
- [ ] (Optional) Add custom domain

---

**🎉 Chúc bạn thành công!**
