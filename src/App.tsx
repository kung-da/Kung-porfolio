// src/App.tsx
// ═══════════════════════════════════════════════════════════════════
// Task 4D: Router setup với ProjectDetailPage
// - /projects/:slug → ProjectDetailPage (lazy loaded)
// - / → Index (homepage)
// - * → redirect về /
// - ScrollRestoration cho mỗi route
// ═══════════════════════════════════════════════════════════════════

import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Eager load — homepage, cần ngay lập tức
import Index from "./pages/Index";

// Lazy load — chỉ tải khi user navigate vào detail page
// Giảm initial bundle size (~20KB gzip cho trang detail)
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));

// ─── Skeleton fallback cho Suspense (khi lazy chunk đang tải) ────
function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-deep-ink flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Manga-style loading indicator */}
        <div
          className="font-display text-wez-cyan text-sm tracking-[0.3em] animate-blink"
          aria-live="polite"
          aria-label="Loading project..."
        >
          LOADING...
        </div>
        <div className="w-32 h-[2px] bg-[#1A1A1A] overflow-hidden">
          <div className="h-full bg-wez-cyan w-1/3 animate-[slide_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

// ─── Scroll to top on route change ───────────────────────────────
// Tách thành component riêng để dùng useLocation hook
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // "instant" tránh smooth scroll animation chồng lên page transition
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// ─── Page transition wrapper ──────────────────────────────────────
// Thêm class animate-page-enter mỗi khi route thay đổi
function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-transition-enter">
      {children}
    </div>
  );
}

// ─── App root ─────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <PageTransition>
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Index />} />

            {/* Project detail page */}
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />

            {/* /projects (no slug) → redirect về homepage #projects */}
            <Route path="/projects" element={<Navigate to="/#projects" replace />} />

            {/* 404 fallback → redirect về homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </BrowserRouter>
  );
}
