import { useEffect, useRef } from "react";

export function useCursorGlow() {
  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const ringRef   = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const ring   = document.getElementById("custom-cursor-ring");
    if (!cursor || !ring) return;

    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Cursor snaps immediately
      cursor.style.transform = `translate(${cursorRef.current.x - 6}px, ${cursorRef.current.y - 6}px)`;

      // Ring lerps (80ms lag feel)
      ringRef.current.x = lerp(ringRef.current.x, cursorRef.current.x, 0.14);
      ringRef.current.y = lerp(ringRef.current.y, cursorRef.current.y, 0.14);
      ring.style.transform = `translate(${ringRef.current.x - 12}px, ${ringRef.current.y - 12}px)`;

      rafId = requestAnimationFrame(tick);
    };

    const onEnterLink = () => {
      ring.classList.add("cursor-hover");
    };
    const onLeaveLink = () => {
      ring.classList.remove("cursor-hover");
    };

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);
    attachHoverListeners();

    // Re-attach on DOM changes (lazy loaded sections)
    const mo = new MutationObserver(attachHoverListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);
}
