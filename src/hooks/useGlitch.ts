import { useCallback, useRef } from "react";

export function useGlitch(duration = 400) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerGlitch = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    el.classList.add("glitch-active");
    timerRef.current = setTimeout(() => {
      el.classList.remove("glitch-active");
    }, duration);
  }, [duration]);

  return { triggerGlitch };
}
