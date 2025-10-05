# ✅ Checklist Deployment

## 📋 Pre-Deploy Checklist

### Local Development
- [ ] Code chạy được: `npm run dev`
- [ ] Không có lỗi trong console
- [ ] Admin panel hoạt động: `/admin`
- [ ] Tạo/sửa/xóa dự án OK
- [ ] Build thành công: `npm run build`
- [ ] Preview build: `npm run preview`

### Git & GitHub
- [ ] Code đã commit
- [ ] Đã push lên GitHub
- [ ] Repository là public (hoặc Vercel có access)
- [ ] .env không bị push (check .gitignore)

---

## 🚀 Deployment Options

### Option A: Deploy ngay (LocalStorage)

**Time: 5 phút**

- [ ] Vào vercel.com
- [ ] Click "Import Project"
- [ ] Chọn GitHub repository
- [ ] Click "Deploy"
- [ ] Đợi deploy xong
- [ ] Test website live
- [ ] Test `/admin` panel
- [ ] Đổi mật khẩu mặc định

**✅ Xong! Website đã live**

---

### Option B: Deploy với Supabase (Recommended)

**Time: 30-45 phút**

#### Step 1: Setup Supabase (20 phút)
- [ ] Tạo tài khoản tại supabase.com
- [ ] Tạo organization mới
- [ ] Tạo project mới
- [ ] Vào SQL Editor
- [ ] Copy SQL từ `SUPABASE_SETUP.md`
- [ ] Chạy SQL script
- [ ] Verify tables đã tạo: `projects`, `admin_config`
- [ ] Copy Project URL
- [ ] Copy anon public key

#### Step 2: Config Local (5 phút)
- [ ] Mở file `.env`
- [ ] Paste `VITE_SUPABASE_URL=...`
- [ ] Paste `VITE_SUPABASE_ANON_KEY=...`
- [ ] Save file
- [ ] Restart dev server: `npm run dev`
- [ ] Verify indicator hiện "Supabase" (màu xanh)
- [ ] Test CRUD trong admin

#### Step 3: Deploy Vercel (10 phút)
- [ ] Push code lên GitHub (không push .env!)
- [ ] Vào Vercel → Import project
- [ ] Settings → Environment Variables
- [ ] Add `VITE_SUPABASE_URL`
- [ ] Add `VITE_SUPABASE_ANON_KEY`
- [ ] Apply to: Production, Preview, Development
- [ ] Click "Deploy"
- [ ] Đợi deploy xong

#### Step 4: Testing (10 phút)
- [ ] Mở website live
- [ ] Vào `/admin`
- [ ] Đăng nhập
- [ ] Verify indicator hiện "Supabase"
- [ ] Tạo dự án mới
- [ ] Refresh page → dự án vẫn còn
- [ ] Mở ở device khác → dự án sync
- [ ] Edit dự án
- [ ] Delete dự án
- [ ] Check Supabase dashboard → data updated

**✅ Hoàn thành! System đã live với cloud database**

---

## 🔐 Security Checklist

- [ ] Đổi mật khẩu từ `admin123`
  - **Supabase**: Run SQL `UPDATE admin_config SET password_hash = ...`
  - **LocalStorage**: `localStorage.setItem('portfolio_admin_password', btoa('new_pass'))`
- [ ] Không share mật khẩu
- [ ] Không commit `.env` vào Git
- [ ] Enable 2FA cho Vercel account (optional)
- [ ] Enable 2FA cho Supabase account (optional)

---

## 📱 Post-Deploy Checklist

### Testing
- [ ] Test trên Desktop Chrome
- [ ] Test trên Desktop Firefox
- [ ] Test trên Desktop Safari
- [ ] Test trên Mobile Chrome
- [ ] Test trên Mobile Safari
- [ ] Test responsive design
- [ ] Test all links work
- [ ] Test admin CRUD
- [ ] Test password login

### SEO & Analytics
- [ ] Add Google Analytics (optional)
- [ ] Submit to Google Search Console (optional)
- [ ] Create sitemap.xml (optional)
- [ ] Add meta tags (optional)
- [ ] Add OpenGraph tags (optional)

### Performance
- [ ] Check Lighthouse score
- [ ] Optimize images if needed
- [ ] Check loading speed
- [ ] Monitor Vercel analytics

### Content
- [ ] Update About section với info của bạn
- [ ] Thay profile picture
- [ ] Update contact info
- [ ] Add real projects
- [ ] Update project URLs
- [ ] Customize colors/themes

---

## 🎨 Customization Checklist

### Branding
- [ ] Đổi title trong `index.html`
- [ ] Đổi favicon
- [ ] Update meta description
- [ ] Customize color scheme
- [ ] Add logo

### Content
- [ ] Edit Hero section text
- [ ] Update About me content
- [ ] Add real projects
- [ ] Update Contact info
- [ ] Add social links

### Features (Optional)
- [ ] Add image upload for projects
- [ ] Add blog section
- [ ] Add testimonials
- [ ] Add skills section
- [ ] Add resume download

---

## 📊 Monitoring Checklist

### Daily
- [ ] Check website is up
- [ ] Monitor error logs (Vercel)
- [ ] Check Supabase usage

### Weekly
- [ ] Review analytics
- [ ] Backup database
- [ ] Check security alerts

### Monthly
- [ ] Review and update content
- [ ] Check dependencies updates
- [ ] Review performance metrics
- [ ] Update projects portfolio

---

## 🆘 Emergency Checklist

### Website Down
1. [ ] Check Vercel status
2. [ ] Check build logs
3. [ ] Check environment variables
4. [ ] Rollback to previous deployment

### Data Lost
1. [ ] Check Supabase dashboard
2. [ ] Check backups
3. [ ] Restore from backup

### Can't Login
1. [ ] Reset password via SQL
2. [ ] Clear browser cache
3. [ ] Check admin_config table

---

## ✨ Success Criteria

### MVP (Minimum Viable Product)
- ✅ Website live và accessible
- ✅ Admin panel works
- ✅ Can add/edit/delete projects
- ✅ Projects display on homepage
- ✅ Mobile responsive

### Production Ready
- ✅ All MVP criteria
- ✅ Supabase integrated
- ✅ Password changed
- ✅ Real content added
- ✅ Tested on multiple devices
- ✅ Performance optimized

### Professional
- ✅ All Production criteria
- ✅ Custom domain
- ✅ SEO optimized
- ✅ Analytics integrated
- ✅ Regular backups
- ✅ Monitoring setup

---

**🎉 Congratulations on your deployment!**

Print this checklist and tick off items as you go!
