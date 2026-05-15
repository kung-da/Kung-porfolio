// ─────────────────────────────────────────────────────────────────────────────
// ABOUT · "ORIGIN" — Dossier Interface
// Typography: improved size/contrast for readability on dark bg
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import profile from "@/assets/profile-picture.jpg";

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const leftColVariants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};
const rightColVariants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 220, damping: 20, delay: 0.1 } },
};
const fieldVariants = {
  hidden:  { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Typewriter hook ───────────────────────────────────────────────────────────
const useTyping = (text: string, active: boolean, speed = 38) => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return display;
};

// ── Character reveal hook ─────────────────────────────────────────────────────
const useCharReveal = (text: string, active: boolean, delay = 700) => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const timer = setTimeout(() => {
      const id = setInterval(() => {
        setDisplay(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(id);
      }, 55);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, text, delay]);
  return display;
};

// ── Threat meter ─────────────────────────────────────────────────────────────
const ThreatMeter = ({ active }: { active: boolean }) => {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setFill(88), 1100);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-[5px] border border-crimson/40 overflow-hidden" style={{ background: "rgba(139,0,0,0.12)" }}>
        <motion.div
          animate={{ width: `${fill}%` }}
          initial={{ width: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", background: "linear-gradient(to right, #8b0000, #e74c3c)", boxShadow: "0 0 8px rgba(231,76,60,0.6)" }}
        />
      </div>
      <span className="font-mono text-xs tracking-wider" style={{ color: "#e74c3c" }}>
        {fill > 0 ? "████████░░ CRITICAL" : "░░░░░░░░░░"}
      </span>
    </div>
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
const FIELD_REPORT = "Specialist in forging unyielding data pipelines and embedding machine intelligence into legacy combat systems. Known for rapid deployment under pressure, zero-downtime architecture, and unbreakable defensive stance in distributed infrastructure. Current threat classification: CRITICAL.";
const SIGNATURE_SKILLS = ["DATA PIPELINE", "LLM / AGENTS", "SYSTEM DESIGN", "CLOUD INFRA"];

export const AboutSection = () => {
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-12%" as any });
  const designation = useCharReveal("Wezaemon the Tombguard", inView, 700);
  const fieldReport = useTyping(FIELD_REPORT, inView, 22);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      {/* BG layers */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute inset-0 hud-grid pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(139,0,0,0.06) 0%, transparent 60%)" }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* ── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
            // 01 — ORIGIN
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight">
            About <span className="text-wez-cyan">The Warden</span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-start"
        >
          {/* LEFT — Dossier */}
          <motion.div variants={leftColVariants} className="flex flex-col gap-8">
            {/* File header panel */}
            <div className="border border-crimson/30 bg-crimson/[0.03] p-5 md:p-6 relative overflow-hidden">
              {/* Top accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-crimson via-enrage to-transparent"
                style={{ transformOrigin: "left" }}
              />

              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-wez-cyan tracking-[0.22em] uppercase font-semibold">
                  [DOSSIER]
                </span>
                <span className="font-mono text-xs text-wez-cyan/50 tracking-wider">
                  FILE #0042
                </span>
              </div>

              {/* Fields */}
              {[
                { label: "DESIGNATION",    value: designation || "▋" },
                { label: "CLASSIFICATION", value: "ARCHITECT" },
                { label: "STATUS",         value: "ACTIVE", valueColor: "#00FF88" },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  custom={i}
                  variants={fieldVariants}
                  className="flex justify-between items-center py-3 border-b border-crimson/20"
                >
                  <span className="font-mono text-xs text-wez-cyan/80 tracking-[0.2em] uppercase">
                    {f.label}:
                  </span>
                  <span className="font-mono text-sm font-semibold tracking-wider" style={{ color: f.valueColor ?? "#E0E0E0" }}>
                    {f.value}
                  </span>
                </motion.div>
              ))}

              {/* Threat level */}
              <div className="mt-4">
                <div className="font-mono text-xs text-wez-cyan/80 tracking-[0.2em] uppercase mb-3">
                  THREAT LEVEL:
                </div>
                <ThreatMeter active={inView} />
              </div>
            </div>

            {/* Field report */}
            <div className="border-l-2 border-crimson/50 pl-5 md:pl-6">
              <div className="font-mono text-xs text-crimson tracking-[0.2em] uppercase mb-3">
                ── FIELD REPORT ──
              </div>
              <p className="font-mono text-sm text-foreground/80 leading-[1.9]">
                {fieldReport}
                {inView && fieldReport.length < FIELD_REPORT.length && (
                  <span className="animate-blink ml-1 text-wez-cyan">█</span>
                )}
              </p>
            </div>

            {/* Signature skills */}
            <div>
              <div className="font-mono text-xs text-wez-cyan/70 tracking-[0.2em] uppercase mb-3">
                ── SIGNATURE SKILLS ──
              </div>
              <div className="flex flex-wrap gap-2">
                {SIGNATURE_SKILLS.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 2.2 + i * 0.08, type: "spring", stiffness: 300 }}
                    className="font-mono text-xs tracking-[0.18em] uppercase px-3 py-1.5 border border-wez-cyan/30 text-wez-cyan/80 bg-wez-cyan/[0.04]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Avatar */}
          <motion.div variants={rightColVariants} className="relative flex justify-center items-start">
            <div className="relative w-full max-w-[340px]">
              {/* Crimson bloom */}
              <div className="absolute -inset-5 z-0" style={{ background: "radial-gradient(ellipse at center, rgba(139,0,0,0.15) 0%, transparent 70%)", filter: "blur(20px)" }} />

              {/* Image */}
              <div className="relative z-[1] border border-crimson/40 overflow-hidden aspect-[3/4] group">
                {/* Corner brackets */}
                {[
                  { top: 8, left: 8, right: "auto", bottom: "auto" },
                  { top: 8, right: 8, left: "auto", bottom: "auto" },
                  { bottom: 8, left: 8, top: "auto", right: "auto" },
                  { bottom: 8, right: 8, top: "auto", left: "auto" },
                ].map((pos, i) => (
                  <div key={i} style={{ position: "absolute", ...pos, width: 16, height: 16, zIndex: 2, borderTop: i < 2 ? "1px solid #e74c3c" : "none", borderBottom: i >= 2 ? "1px solid #e74c3c" : "none", borderLeft: (i === 0 || i === 2) ? "1px solid #e74c3c" : "none", borderRight: (i === 1 || i === 3) ? "1px solid #e74c3c" : "none" }} />
                ))}

                <img
                  src={profile}
                  alt="Wezaemon the Tombguard"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ filter: "contrast(1.1) brightness(0.9)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wez-cyan/50 to-transparent" />
              </div>

              {/* Badge */}
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
