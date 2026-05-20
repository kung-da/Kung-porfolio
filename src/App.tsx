import { lazy, Suspense, useEffect } from "react";
import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Index from "./pages/Index";

const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));

function PageLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-deep-ink">
      <div className="flex flex-col items-center gap-4">
        <div
          className="animate-blink font-display text-sm tracking-[0.3em] text-wez-cyan"
          aria-live="polite"
          aria-label="Loading project..."
        >
          LOADING...
        </div>
        <div className="h-[2px] w-32 overflow-hidden bg-[#1A1A1A]">
          <div className="h-full w-1/3 animate-[slide_1s_ease-in-out_infinite] bg-wez-cyan" />
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-transition-enter">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/projects" element={<Navigate to="/#projects" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </BrowserRouter>
  );
}
