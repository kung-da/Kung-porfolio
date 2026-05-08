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
    
    // 1. Hiện từng dòng text
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown((s) => Math.max(s, i + 1)), 200 + i * 400));
    });

    const textFinishTime = 200 + LINES.length * 400;
    const tensePause = 2500; // TRỌNG TÂM: Kéo dài thời gian chờ ở đây (2.5 giây)

    // 2. Hiện nhát chém sau thời gian chờ
    timers.push(window.setTimeout(() => setSlash(true), textFinishTime + tensePause));
    
    // 3. Tách đôi màn hình
    timers.push(window.setTimeout(() => setExit(true), textFinishTime + tensePause + 400));
    
    // 4. Hoàn thành và unmount
    timers.push(window.setTimeout(() => onComplete(), textFinishTime + tensePause + 1200));

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
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#0A0A0A] border-b-2 border-[#8B0000]"
        style={{ boxShadow: exit ? "none" : "0 5px 20px rgba(139,0,0,0.5)" }}
      />
      {/* Bottom panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A] border-t-2 border-[#8B0000]"
        style={{ boxShadow: exit ? "none" : "0 -5px 20px rgba(139,0,0,0.5)" }}
      />

      {/* Text */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: exit ? 0 : 1 }}
      >
        <div className="font-mono text-sm md:text-base leading-relaxed flex flex-col items-start">
          {LINES.slice(0, shown).map((l, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              // Làm nổi bật dòng WARNING
              className={`${l.includes("WARNING") ? "text-[#8B0000] font-bold text-lg animate-pulse" : "text-[#8FEFFF]"}`}
            >
              {l}
              {i === shown - 1 && !slash && <span className="animate-blink ml-2">█</span>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slash Effect - Đổi sang màu đỏ máu cho hợp Wezaemon */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={slash ? (exit ? { opacity: 0 } : { scaleX: 1 }) : { scaleX: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute top-1/2 left-[-20%] right-[-20%] h-[3px] bg-[#ff3333] z-50 origin-left"
        style={{
          boxShadow: "0 0 30px #ff0000, 0 0 15px #fff",
          transform: "translateY(-50%) rotate(-8deg)",
        }}
      />
    </div>
  );
};
