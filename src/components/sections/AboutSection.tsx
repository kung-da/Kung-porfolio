import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import profile from "@/assets/profile-picture.jpg";

/* ── Number scramble hook ── */
const useScramble = (target: string, active: boolean, duration = 800) => {
  const [display, setDisplay] = useState(target);
  const chars = "0123456789ABCDEF";

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = duration / 30;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * target.length);
      const scrambled = target
        .split("")
        .map((ch, i) =>
          i < revealed ? ch : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");
      setDisplay(scrambled);
      if (frame >= totalFrames) {
        setDisplay(target);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [active, target, duration]);

  return display;
};

/* ── Typing effect hook ── */
const useTyping = (text: string, active: boolean, speed = 40) => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [active, text, speed]);
  return display;
};

/* ── Stats Data ── */
const INTEL_FIELDS = [
  { label: "DESIGNATION", value: "Cung Master" },
  { label: "CLASS", value: "Data Engineer · AI Dev" },
  { label: "FACTION", value: "Pipeline · Intelligence" },
  { label: "BASE_OPS", value: "Ho Chi Minh City, VN" },
  { label: "STATUS", value: "ACTIVE", color: "#00FF88" },
  { label: "THREAT_LVL", value: "████████░░ CRITICAL", color: "#FF003C" },
];

const STAT_BLOCKS = [
  { label: "YEARS_ACTIVE", value: "5+", numValue: "0005" },
  { label: "MISSIONS", value: "20+", numValue: "0020" },
  { label: "THREAT", value: "SSS+", numValue: "SSS+" },
  { label: "UPTIME", value: "99.9%", numValue: "99.9" },
];

/* ── Slam spring ── */
const slamIn = {
  hidden: { opacity: 0, y: -30, scale: 1.1 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 12 },
  },
};

export const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const typed = useTyping(">_ TARGET_LOCKED... SCANNING ENTITY DATA", inView, 35);

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#050505] overflow-hidden"
    >
      {/* BG: CRT + Grid */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.04] pointer-events-none z-0" />
      <div className="absolute inset-0 hud-grid pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] pointer-events-none z-0" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          variants={slamIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <p className="font-mono-ui text-[11px] text-crimson mb-2 tracking-widest">
            // ENEMY_INTEL.EXE
          </p>
          <div className="w-full h-[1px] bg-[#FF003C] mb-4 opacity-60" />
          <h2 className="font-display font-bold text-2xl md:text-4xl tracking-widest uppercase">
            SYSTEM.<span className="text-cyan-accent">SCANNING_TARGET</span>...
          </h2>
        </motion.div>

        {/* Typing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-mono-ui text-[13px] text-cyan-accent mb-12 h-6"
        >
          {typed}
          <span className="animate-pulse ml-1">█</span>
        </motion.div>

        {/* Main Grid: Portrait + Data */}
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* LEFT: Target Frame with Crosshair */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
            className="relative"
          >
            {/* Crosshair Frame */}
            <div
              className="relative border border-[#FF003C33] bg-[#0A0A0A] overflow-hidden aspect-[3/4]"
              style={{
                clipPath: "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)",
              }}
            >
              {/* Image */}
              <img
                src={profile}
                alt="Target: Wezaemon"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{ filter: "contrast(1.1) brightness(0.9)" }}
              />

              {/* Scan line */}
              <div className="absolute left-0 right-0 h-[2px] bg-[#FF003C] opacity-30 shadow-[0_0_10px_#FF003C] animate-[scanV_3s_linear_infinite] pointer-events-none" />

              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00F5FF]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00F5FF]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00F5FF]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00F5FF]" />

              {/* HUD text */}
              <div className="absolute top-3 left-4 font-mono-ui text-[9px] text-[#FF003C88] tracking-widest">
                TGT: WEZAEMON
              </div>
              <div className="absolute bottom-3 right-4 font-mono-ui text-[9px] text-[#00F5FF66] tracking-widest">
                LOCK: CONFIRMED
              </div>
            </div>

            {/* Classification Bar */}
            <div
              className="mt-3 bg-[#0A0A0A] border border-[#1a1a2e] px-4 py-2 text-center"
              style={{ clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%, 0 8px)" }}
            >
              <span className="font-mono-ui text-[10px] text-crimson tracking-widest uppercase">
                CLEARANCE: SENIOR DATA OPS
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Data Fields + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="flex flex-col gap-6"
          >
            {/* Intel Fields */}
            <div className="font-mono-ui text-[13px] space-y-3">
              {INTEL_FIELDS.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="flex justify-between border-b border-dotted border-[#1a1a2e] pb-2 items-center"
                >
                  <span className="text-[#00F5FF] uppercase text-[11px] tracking-wider">{f.label}</span>
                  <span style={{ color: f.color || "#E0E0E0" }} className="text-right">
                    {f.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stat Blocks - Scrambling Numbers */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {STAT_BLOCKS.map((s, i) => {
                const scrambled = useScramble(s.numValue, inView, 600 + i * 200);
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 300, damping: 12 }}
                    className="border border-[#1a1a2e] bg-[#0A0A0A] p-3 text-center"
                    style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}
                  >
                    <div className="font-mono-ui text-[8px] text-dim tracking-widest mb-2">{s.label}</div>
                    <div className="font-display text-lg font-black text-cyan-accent" style={{ textShadow: "0 0 8px rgba(0,245,255,0.4)" }}>
                      {scrambled}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bio Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.3 }}
              className="border border-[#1a1a2e] border-l-2 border-l-[#FF003C] bg-[#0A0A0A] p-5"
            >
              <p className="font-mono-ui text-[12px] text-dim leading-[2]">
                Specialized in forging unyielding data pipelines and embedding intelligence into legacy systems. Known for rapid deployment, zero-downtime architecture, and an unbreakable defensive stance in backend infrastructure. When the digital grave shifts, the Tombguard answers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
