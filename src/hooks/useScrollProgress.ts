import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = -1;

    const compute = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      const next = max > 0 ? scrollTop / max : 0;
      // Quantize to reduce update spam while preserving smoothness.
      return Math.round(next * 1000) / 1000;
    };

    const update = () => {
      raf = 0;
      const next = compute();
      if (next !== last) {
        last = next;
        setProgress(next);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}
