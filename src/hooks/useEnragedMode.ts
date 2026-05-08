import { useEffect, useState } from "react";

const SEQUENCE = "wezaemon";

export function useEnragedMode() {
  const [isEnraged, setIsEnraged] = useState(false);

  useEffect(() => {
    let buffer = "";
    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-SEQUENCE.length);
      if (buffer === SEQUENCE) {
        setIsEnraged((prev) => !prev);
        buffer = "";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (isEnraged) {
      document.documentElement.classList.add("enraged");
      document.body.style.animation = "screen-shake 0.5s ease-in-out";
      const t = setTimeout(() => {
        document.body.style.animation = "";
      }, 500);
      window.dispatchEvent(new CustomEvent("enraged-mode", { detail: { isEnraged: true } }));
      return () => clearTimeout(t);
    } else {
      document.documentElement.classList.remove("enraged");
      window.dispatchEvent(new CustomEvent("enraged-mode", { detail: { isEnraged: false } }));
    }
  }, [isEnraged]);

  return { isEnraged };
}
