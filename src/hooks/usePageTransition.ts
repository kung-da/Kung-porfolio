// src/hooks/usePageTransition.ts
// ═══════════════════════════════════════════════════════════════════
// Task 6: Page transition hook
// - Manages enter/exit animation state
// - Respects prefers-reduced-motion
// - Provides navigateWithTransition for programmatic nav
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Check nếu user muốn reduced motion
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ─── Hook ────────────────────────────────────────────────────────
export function usePageTransition() {
  const navigate   = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const timerRef   = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Navigate với exit animation trước khi chuyển trang
  const navigateWithTransition = useCallback(
    (to: string) => {
      // Nếu reduced-motion → navigate ngay, không animation
      if (prefersReducedMotion()) {
        navigate(to);
        return;
      }

      setIsExiting(true);
      timerRef.current = setTimeout(() => {
        setIsExiting(false);
        navigate(to);
      }, 150); // 150ms = exit animation duration
    },
    [navigate]
  );

  return { isExiting, navigateWithTransition };
}

// ─── Scroll utilities ─────────────────────────────────────────────

/**
 * Scroll to a section by ID, với optional offset cho sticky header.
 * Dùng sau navigate() để scroll đến đúng section.
 */
export function scrollToSection(id: string, offset = 64, delay = 100): void {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "instant" : "smooth",
    });
  }, delay);
}

/**
 * Scroll to top của page.
 */
export function scrollToTop(instant = false): void {
  window.scrollTo({
    top: 0,
    behavior: instant || prefersReducedMotion() ? "instant" : "smooth",
  });
}
