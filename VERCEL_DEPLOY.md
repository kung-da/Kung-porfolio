# Hướng dẫn Deploy lên Vercel

## 🚀 Deploy Nhanh (Không cần Supabase)

Nếu bạn muốn deploy nhanh với LocalStorage:

### 1. Push code lên GitHub
```bash
git add .
git commit -m "Add admin panel"
git push
```

### 2. Deploy trên Vercel
1. Vào https://vercel.com
2. Click "Import Project"
3. Chọn repository của bạn
4. Click "Deploy"
5. Xong! ✅

**Lưu ý**: Với LocalStorage, mỗi thiết bị sẽ có dữ liệu riêng.

---

## 🔥 Deploy với Supabase (Recommended)

Để có database thật và sync mọi thiết bị:

### Bước 1: Setup Supabase
Làm theo file [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) để:
- Tạo tài khoản Supabase
- Tạo database tables
- Lấy API keys

### Bước 2: Cấu hình Environment Variables

1. Vào Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Thêm 2 biến:

```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Apply to: **Production, Preview, và Development**
5. Click "Save"

### Bước 3: Redeploy

1. Vào Deployments tab
2. Click "..." menu bên cạnh deployment mới nhất
3. Click "Redeploy"
4. Đợi deploy xong

### Bước 4: Kiểm tra

1. Mở website của bạn
2. Vào `/admin`
3. Đăng nhập với mật khẩu `admin123`
4. Tạo/sửa/xóa dự án
5. Refresh hoặc mở ở thiết bị khác → Data vẫn còn! ✅

---

## 🔧 Troubleshooting

### Lỗi: "Failed to fetch"
- Kiểm tra environment variables đã đúng chưa
- Kiểm tra Supabase project còn hoạt động không

### Lỗi: "Invalid API Key"
- Copy lại Supabase anon key (phải là key **anon**, không phải service_role)
- Redeploy sau khi đổi

### Data không sync
- Kiểm tra console xem có connect Supabase không
- Vào Admin panel, xem indicator: "Supabase" (xanh) hoặc "LocalStorage" (cam)

### Deploy lỗi
- Chạy `npm run build` local trước để test
- Kiểm tra Node version (nên dùng v18+)

---

## 📱 Custom Domain

1. Vào Vercel → Settings → Domains
2. Thêm domain của bạn (ví dụ: `myportfolio.com`)
3. Cập nhật DNS records theo hướng dẫn
4. Đợi DNS propagate (5-10 phút)
5. Done! 🎉

---

## 🔐 Đổi Mật Khẩu

### Nếu dùng Supabase:
Vào SQL Editor trong Supabase Dashboard:

```sql
UPDATE admin_config 
SET password_hash = encode('mat_khau_moi'::bytea, 'base64'),
    updated_at = NOW();
```

### Nếu dùng LocalStorage:
Mở Console trong browser:

```javascript
localStorage.setItem('portfolio_admin_password', btoa('mat_khau_moi'));
```

---

## 💡 Tips

1. **Backup Data**: Export dữ liệu từ Supabase định kỳ
2. **Monitor Usage**: Kiểm tra usage trong Supabase Dashboard (free tier: 500MB)
3. **Security**: Đổi mật khẩu mặc định ngay sau deploy
4. **Performance**: Vercel tự động CDN và cache, không cần config thêm

---

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra logs trong Vercel Dashboard
2. Kiểm tra Supabase logs
3. Mở issue trên GitHub repo
