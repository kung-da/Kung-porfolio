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
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
            // PROFILE DATA
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight">
            About <span className="text-wez-cyan">The Warden</span>
          </h2>
        </motion.div>

        {/* Typing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-wez-cyan mb-8 h-6 md:mb-12"
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
              className="relative border border-border/60 bg-background/30 backdrop-blur-md overflow-hidden aspect-[3/4] group"
            >
              {/* Image */}
              <img
                src={profile}
                alt="Wezaemon"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                style={{ filter: "contrast(1.1) brightness(0.9)" }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 pointer-events-none" />

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wez-cyan/50 to-transparent" />
            </div>

            {/* Classification Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-4 border border-border/60 bg-background/40 backdrop-blur-md px-4 py-2.5 text-center"
            >
              <span className="font-mono text-xs text-wez-cyan tracking-widest uppercase">
                Senior Data Engineer
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT: Data Fields + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="flex flex-col gap-6"
          >
            {/* Intel Fields */}
            <div className="space-y-4 md:space-y-5">
              {INTEL_FIELDS.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  className="flex justify-between items-center border-b border-border/40 pb-3.5"
                >
                  <span className="font-mono text-xs text-wez-cyan tracking-wider uppercase">{f.label}</span>
                  <span style={{ color: f.color || "rgb(224, 224, 224)" }} className="font-mono text-sm text-right">
                    {f.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stat Blocks - Scrambling Numbers */}
            <div className="grid grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-10">
              {STAT_BLOCKS.map((s, i) => {
                const scrambled = useScramble(s.numValue, inView, 600 + i * 200);
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 300, damping: 12 }}
                    className="border border-border/50 bg-background/40 backdrop-blur-sm p-3 md:p-4 text-center"
                  >
                    <div className="font-mono text-xs text-muted-foreground tracking-widest mb-2">{s.label}</div>
                    <div className="font-display text-xl md:text-2xl font-black text-wez-cyan" style={{ textShadow: "0 0 8px rgba(143, 239, 255, 0.3)" }}>
                      {scrambled}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bio Box */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              className="border-l-2 border-l-crimson bg-background/30 backdrop-blur-sm px-5 md:px-6 py-5 md:py-6 mt-8 md:mt-10"
            >
              <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                Specialized in forging unyielding data pipelines and embedding intelligence into legacy systems. Known for rapid deployment, zero-downtime architecture, and an unbreakable defensive stance in backend infrastructure.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
