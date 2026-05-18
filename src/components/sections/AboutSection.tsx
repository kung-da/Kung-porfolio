// About section
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import profile from "@/assets/profile-picture.jpg";

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const leftColVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
};
const rightColVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 220, damping: 20, delay: 0.1 } },
};
const fieldVariants = {
  hidden: { opacity: 0, x: 20 },
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
      <div className="flex-1 h-[5px] border border-crimson/40 overflow-hidden" style={{ background: "rgba(214,58,74,0.1)" }}>
        <motion.div
          animate={{ width: `${fill}%` }}
          initial={{ width: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", background: "linear-gradient(to right, #A82836, #EF5A63)", boxShadow: "0 0 8px rgba(214,58,74,0.48)" }}
        />
      </div>
      <span className="font-mono text-xs tracking-wider" style={{ color: "#EF5A63" }}>
        {fill > 0 ? "████████░░ CRITICAL" : "░░░░░░░░░░"}
      </span>
    </div>
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
const FIELD_REPORT = "I build reliable data pipelines, analytics systems, and AI-enabled products with a focus on clear architecture, dependable delivery, and practical business value.";
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
      className="content-section relative overflow-hidden px-6 md:px-10 xl:px-16"
      style={{ background: "transparent" }}
    >
      {/* Single lightweight BG overlay */}
      <div className="absolute inset-0 section-vignette z-0" />
      <div className="absolute inset-0 section-floor z-0" />

      <div className="container relative z-10 mx-auto w-full max-w-[1440px]">
        {/* ── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8 xl:mb-10"
        >
          <h2 className="section-title font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl" data-text="ABOUT ME">
            About <span className="text-wez-cyan">me</span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.25fr_0.75fr] xl:gap-14"
        >
          {/* LEFT — Dossier */}
          <motion.div variants={leftColVariants} className="flex flex-col gap-6">
            {/* File header panel */}
            <div className="border border-crimson/35 bg-crimson/[0.035] p-4 md:p-5 relative overflow-hidden shadow-[inset_0_1px_0_rgba(214,58,74,0.08),0_4px_16px_rgba(0,0,0,0.3)]">
              {/* Top accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-crimson via-enrage to-transparent"
                style={{ transformOrigin: "left" }}
              />

              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-sm text-wez-cyan tracking-[0.22em] uppercase font-semibold">
                  PROFILE
                </span>
                <span className="font-mono text-xs text-wez-cyan/40 tracking-[0.2em]">
                  FILE #0042
                </span>
              </div>

              {/* Fields */}
              {[
                { label: "NAME", value: designation || "..." },
                { label: "ROLE", value: "ARCHITECT" },
                { label: "STATUS", value: "ACTIVE", valueColor: "#00FF88" },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  custom={i}
                  variants={fieldVariants}
                  className="flex justify-between items-center py-2.5 border-b border-crimson/20"
                >
                  <span className="font-mono text-sm text-wez-cyan/70 tracking-[0.18em] uppercase">
                    {f.label}:
                  </span>
                  <span className="font-mono text-sm font-semibold tracking-wider" style={{ color: f.valueColor ?? "#E0E0E0" }}>
                    {f.value}
                  </span>
                </motion.div>
              ))}

              {/* Threat level */}
              <div className="mt-4">
                <div className="font-mono text-sm text-wez-cyan/70 tracking-[0.18em] uppercase mb-3">
                  FOCUS:
                </div>
                <ThreatMeter active={inView} />
              </div>
            </div>

            {/* Field report */}
            <div className="border-l-2 border-crimson/50 pl-5 md:pl-6">
              <div className="font-mono text-sm text-crimson/90 tracking-[0.18em] uppercase mb-3">
                ── FIELD REPORT ──
              </div>
              <p className="font-mono text-sm text-foreground/75 leading-[1.8]">
                {fieldReport}
                {inView && fieldReport.length < FIELD_REPORT.length && (
                  <span className="animate-blink ml-1 text-wez-cyan">█</span>
                )}
              </p>
            </div>

            {/* Signature skills */}
            <div>
              <div className="font-mono text-sm text-wez-cyan/60 tracking-[0.18em] uppercase mb-3">
                ── SIGNATURE SKILLS ──
              </div>
              <div className="flex flex-wrap gap-2.5">
                {SIGNATURE_SKILLS.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 2.2 + i * 0.08, type: "spring", stiffness: 300 }}
                    className="font-mono text-xs tracking-[0.18em] uppercase px-3.5 py-2 border border-wez-cyan/25 text-wez-cyan/75 bg-wez-cyan/[0.04]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Avatar */}
          <motion.div variants={rightColVariants} className="relative flex justify-center items-start">
            <div className="relative w-full max-w-[310px] xl:max-w-[330px]">
              {/* Crimson bloom */}
              <div className="absolute -inset-5 z-0" style={{ background: "radial-gradient(ellipse at center, rgba(214,58,74,0.12) 0%, transparent 70%)", filter: "blur(20px)" }} />

              {/* Image */}
              <div className="relative z-[1] border border-crimson/40 overflow-hidden aspect-[3/4] group">
                {/* Corner brackets */}
                {[
                  { top: 8, left: 8, right: "auto", bottom: "auto" },
                  { top: 8, right: 8, left: "auto", bottom: "auto" },
                  { bottom: 8, left: 8, top: "auto", right: "auto" },
                  { bottom: 8, right: 8, top: "auto", left: "auto" },
                ].map((pos, i) => (
                  <div key={i} style={{ position: "absolute", ...pos, width: 16, height: 16, zIndex: 2, borderTop: i < 2 ? "1px solid #EF5A63" : "none", borderBottom: i >= 2 ? "1px solid #EF5A63" : "none", borderLeft: (i === 0 || i === 2) ? "1px solid #EF5A63" : "none", borderRight: (i === 1 || i === 3) ? "1px solid #EF5A63" : "none" }} />
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

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
