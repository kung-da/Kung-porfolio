import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  "> SYSTEM BOOT...",
  "> LOADING COMBAT DATA...",
  "⚠ WARNING: BOSS ENCOUNTER DETECTED",
  "> INITIATING COMBAT SEQUENCE...",
];

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [shown, setShown] = useState<number>(0);
  const [slash, setSlash] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown((s) => Math.max(s, i + 1)), 200 + i * 350));
    });
    timers.push(window.setTimeout(() => setSlash(true), 200 + LINES.length * 350 + 200));
    timers.push(window.setTimeout(() => setExit(true), 200 + LINES.length * 350 + 600));
    timers.push(window.setTimeout(() => onComplete(), 200 + LINES.length * 350 + 1300));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        pointerEvents: "none",
      }}
    >
      {/* Top panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "#0A0A0A",
          borderBottom: "2px solid #8FEFFF",
        }}
      />
      {/* Bottom panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "#0A0A0A",
          borderTop: "2px solid #8FEFFF",
        }}
      />

      {/* Text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: exit ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <div className="font-mono-ui text-xs md:text-sm leading-relaxed" style={{ color: "#C0392B" }}>
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} style={{ opacity: i === shown - 1 ? 1 : 0.7 }}>
              {l}
              {i === shown - 1 && <span className="animate-blink" style={{ color: "#8FEFFF" }}>█</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Slash */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={slash ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "-50%",
          right: "-50%",
          height: 4,
          background: "#FAFAF8",
          boxShadow: "0 0 20px #8FEFFF",
          transform: "rotate(-12deg)",
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};
