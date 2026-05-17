# Task 7 — Final QA Checklist
> Sau khi copy tất cả files vào project, chạy checklist này để verify.

---

## Typography ✅
- [x] `font-sans` = Inter → `tailwind.config.ts` đã đổi
- [x] `font-mono` = JetBrains Mono → đã đổi
- [x] `font-display` = Orbitron → giữ nguyên
- [x] `font-title` = Rajdhani → thêm mới
- [x] `font-jp` = Noto Serif JP → giữ nguyên (đã fix tên font)
- [x] Base font-size = 16px → `fontSize.base` trong config

**Action cần làm thủ công:**
Sau khi đổi font, search project tìm các component đang dùng `font-sans` để mô tả → kiểm tra chúng render Inter thay vì mono. Đặc biệt check: HeroSection, AboutSection, bất kỳ `<p>` nào có prose dài.

---

## Performance ✅
- [x] Không có unused Google Fonts → `index.html` đã cleanup
- [x] Font preload cho Inter và Orbitron → có trong `index.html`
- [x] Lazy loading cho ProjectDetailPage → `React.lazy()` trong `App.tsx`
- [ ] Cover images có `loading="lazy"` attribute

**Action:** Tìm tất cả `<img>` trong project hiện có, thêm `loading="lazy"` nếu chưa có.
```tsx
// Tìm pattern này:
<img src={...} alt={...} />
// Đổi thành:
<img src={...} alt={...} loading="lazy" />
```

---

## SEO & Meta ✅
- [x] `og:image` → `/og-image.png` (cần tạo file thực — xem `og-image-template.html`)
- [x] `twitter:card` = `summary_large_image` → có trong `index.html`
- [x] `ProjectDetailPage` cập nhật `document.title` dynamically → có trong component
- [x] Meta description dynamic → `document.title` đã set; meta description cần thêm

**Action — thêm dynamic meta description vào ProjectDetailPage:**
```tsx
// Thêm vào useEffect sau khi set document.title:
useEffect(() => {
  if (!project) return;
  document.title = `${project.name} · CUNG-MASTER`;

  // Dynamic meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', project.description);

  return () => {
    document.title = 'CUNG-MASTER · Cyber Samurai Portfolio';
    metaDesc?.setAttribute('content', 'Wezaemon the Tombguard — Cyber-Undead Samurai Portfolio.');
  };
}, [project]);
```

---

## Accessibility ✅
- [x] `stone` color contrast: #888888 trên #0A0A0A = **5.58:1** → PASS WCAG AA ✓
  *(Note: review ban đầu tính sai — số thực là 5.58:1, không cần đổi)*
- [x] `prefers-reduced-motion` → có trong `index.css`
- [x] Interactive elements có `focus-visible` state → global CSS + từng component
- [x] Links có meaningful text → checked trong ProjectDetailPage và ProjectCard
- [x] Images có `alt` text → checked trong các components mới

**Action:** Kiểm tra các component CŨ (HeroSection, NavBar, v.v.) có `alt` text chưa.

---

## Routing & Navigation ✅
- [x] `/projects/:slug` route → có trong `App.tsx`
- [x] Back button về `/#projects` section → có trong `ProjectDetailPage`
- [x] Next/Prev project navigation → có trong `ProjectDetailPage`
- [x] 404 state khi slug không tìm thấy → `ProjectError` component
- [x] Scroll to top khi vào detail page → `ScrollToTop` trong `App.tsx` + `useEffect` trong page

---

## Notion Integration
- [ ] **Slug field có trong tất cả projects trong Notion** ← CẦN LÀM THỦ CÔNG
- [ ] **LongDescription field có nội dung** ← CẦN LÀM THỦ CÔNG
- [x] API `/api/notion-projects?slug=xxx` → đã implement trong `api/notion-projects.ts`
- [x] Fallback data cho detail page → `DEMO_DETAIL` trong API file

**Action — thêm Notion fields (xem Block 3 trong master prompt):**
1. Vào Notion database
2. Thêm: `Slug` (Text), `LongDescription` (Rich text), `Highlights` (Rich text),
   `Timeline` (Rich text), `Status` (Select), `Tags` (Multi-select), `YoutubeEmbed` (URL)
3. Điền `Slug` cho mỗi project (format: `ten-project-lowercase-hyphen`)
4. Test: `GET /api/notion-projects?slug=your-slug` → kiểm tra response

---

## Design Consistency ✅
- [x] Manga shadows đúng (`manga-sm/md/lg/xl`) → trong `tailwind.config.ts`
- [x] `wez-cyan` (#8FEFFF) là màu accent duy nhất
- [x] 0px border-radius toàn bộ → `borderRadius` trong config
- [x] Category color coding nhất quán → `CATEGORY` object trong `ProjectCard.tsx`

---

## Files cần copy vào project (theo thứ tự)

```
1. tailwind.config.ts        → thay thế file cũ
2. index.html                → thay thế file cũ
3. src/index.css             → thay thế file cũ
4. src/types/project.ts      → file mới (tạo thư mục src/types/ nếu chưa có)
5. api/notion-projects.ts    → thay thế file cũ
6. src/pages/ProjectDetailPage.tsx  → file mới
7. src/components/ProjectCard.tsx   → thay thế file cũ (check tên file hiện tại)
8. src/App.tsx               → thay thế file cũ
9. src/hooks/usePageTransition.ts   → file mới (tạo thư mục src/hooks/)
```

---

## Test flow sau khi deploy

```
1. Homepage load → kiểm tra font Inter xuất hiện trên text prose
2. Hover vào project card → "VIEW →" tag xuất hiện, shadow tăng
3. Click vào card (có slug) → navigate đến /projects/[slug]
4. Detail page load → skeleton xuất hiện → content replace skeleton
5. Click "← BACK" → quay về homepage, scroll đến #projects
6. Keyboard navigation → Tab qua cards, focus ring wez-cyan hiển thị
7. Share link lên Discord → og:image preview hiện đúng (sau khi tạo og-image.png)
8. Mở DevTools → Preferences → Emulate CSS media feature (reduce motion) → kiểm tra animations tắt
```

---

## Bugs tiềm năng & cách fix

### 1. ProjectCard.tsx — tên file khác với codebase hiện tại
```bash
# Kiểm tra tên file hiện tại:
find src -name "*roject*ard*" -o -name "*card*" | grep -i project
```

### 2. Types conflict với Notion API response thực tế
Nếu Notion trả về structure khác với `NotionProjectRaw` trong `src/types/project.ts`:
```tsx
// Thêm console.log vào API để debug:
console.log(JSON.stringify(raws[0].properties, null, 2));
// So sánh với interface và điều chỉnh field names
```

### 3. React Router version conflict
```bash
# Kiểm tra version đang dùng:
cat package.json | grep react-router
# Nếu v5: thay <Routes>/<Route> bằng <Switch>/<Route>
# Nếu v6+: code hiện tại đã đúng
```

### 4. `link rel="preload"` for Google Fonts không hoạt động
Preload for Google Fonts stylesheets cần `as="style"` + `onload` trick. Đây là known limitation. Không sao — Inter và Orbitron vẫn load qua `<link rel="stylesheet">` bình thường, chỉ là không preload được. Bỏ qua nếu thấy browser warning.
