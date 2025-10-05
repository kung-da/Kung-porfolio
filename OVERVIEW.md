# 📋 Tổng Quan Hệ Thống

## 🎯 Tính Năng

### Portfolio Website
- ✅ Trang chủ với Hero section
- ✅ About section
- ✅ Projects showcase (hiển thị động từ database)
- ✅ Contact section
- ✅ Responsive design
- ✅ Smooth animations với Framer Motion
- ✅ Modern UI với Tailwind CSS + shadcn/ui

### Admin Panel
- ✅ Đăng nhập bằng mật khẩu
- ✅ Tạo dự án mới
- ✅ Sửa dự án hiện có
- ✅ Xóa dự án (có xác nhận)
- ✅ Upload tags động
- ✅ Chọn gradient màu
- ✅ Form validation
- ✅ Toast notifications
- ✅ Responsive admin UI

### Storage System (Dual Mode)
- ✅ **Supabase**: Cloud database, sync mọi thiết bị
- ✅ **LocalStorage**: Fallback mode, không cần setup
- ✅ Tự động chuyển đổi giữa 2 modes
- ✅ Indicator hiển thị storage mode đang dùng

## 📁 Cấu Trúc File

```
src/
├── components/
│   ├── admin/
│   │   └── ProjectForm.tsx          # Form tạo/sửa dự án
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   └── Projects.tsx             # Hiển thị danh sách dự án
│   └── ui/
│       ├── navigation.tsx           # Navigation bar (có link admin)
│       ├── storage-indicator.tsx    # Hiển thị storage mode
│       └── ... (shadcn components)
├── lib/
│   ├── projectStorage.ts            # Logic quản lý dự án
│   ├── supabase.ts                  # Supabase client
│   └── utils.ts
├── pages/
│   ├── Admin.tsx                    # Trang admin panel
│   ├── Index.tsx                    # Trang chủ
│   └── NotFound.tsx
├── types/
│   └── project.ts                   # TypeScript types
└── App.tsx                          # Main app với routing

Docs/
├── ADMIN_GUIDE.md                   # Hướng dẫn dùng admin
├── SUPABASE_SETUP.md                # Hướng dẫn setup Supabase
└── VERCEL_DEPLOY.md                 # Hướng dẫn deploy Vercel
```

## 🔄 Luồng Hoạt Động

### Mode LocalStorage (Mặc định)
```
User → Admin Panel → localStorage
                  ↓
              Projects Display
```

### Mode Supabase (Khi có config)
```
User → Admin Panel → Supabase API → PostgreSQL Database
                  ↓
              Projects Display
                  ↓
              Sync mọi thiết bị
```

## 🔐 Bảo Mật

### LocalStorage Mode
- Mật khẩu encode Base64 trong localStorage
- Chỉ client-side, không có server
- Đơn giản nhưng kém an toàn

### Supabase Mode
- Mật khẩu lưu trong database
- Row Level Security (RLS) enabled
- API keys public-safe (anon key)
- Có thể nâng cấp auth sau này

## 🚀 Deployment

### Vercel (Recommended)
- ✅ Zero config
- ✅ Tự động CI/CD từ GitHub
- ✅ Edge Network CDN
- ✅ Environment variables support
- ✅ Free SSL certificate
- ✅ Custom domain support

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

## 🎨 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **State**: React Hooks + Context
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner

## 📊 Database Schema (Supabase)

### Table: projects
```sql
id          UUID PRIMARY KEY
title       TEXT NOT NULL
description TEXT NOT NULL
tags        TEXT[] NOT NULL
github_url  TEXT
demo_url    TEXT
gradient    TEXT NOT NULL
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### Table: admin_config
```sql
id            UUID PRIMARY KEY
password_hash TEXT NOT NULL
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

## 🔧 Environment Variables

### Development (.env)
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
```

### Production (Vercel)
Set trong Vercel Dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📱 Features Roadmap

### V1.0 (Current)
- [x] Admin panel
- [x] CRUD operations
- [x] Dual storage mode
- [x] Basic auth

### V2.0 (Future)
- [ ] Image upload cho projects
- [ ] Rich text editor cho description
- [ ] Multiple admin users
- [ ] Analytics dashboard
- [ ] Export/Import projects
- [ ] Dark mode toggle
- [ ] Blog section
- [ ] Comments system

## 💰 Cost Estimate

### Free Tier
- **Vercel**: Free (100GB bandwidth/month)
- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Domain**: ~$10-15/year (optional)

### Total Monthly Cost: **$0** (nếu dùng free tier)

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

## 🆘 Quick Help

### Không connect được Supabase?
→ Kiểm tra `.env` file và restart dev server

### Admin panel không hiện?
→ Vào `/admin` hoặc click icon ⚙️ ở navigation

### Quên mật khẩu?
→ Mật khẩu mặc định: `admin123`

### Deploy lỗi?
→ Chạy `npm run build` local để test

### Data bị mất?
→ Nếu dùng LocalStorage, check browser cache
→ Nếu dùng Supabase, check database

---

Made with ❤️ using React + Supabase + Vercel
