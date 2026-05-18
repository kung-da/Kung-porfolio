// About section
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import profile from "@/assets/profile-picture.jpg";

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

const FIELD_REPORT =
  "I build reliable data pipelines, analytics systems, and AI-enabled products with a focus on clear architecture, dependable delivery, and practical business value.";
const SIGNATURE_SKILLS = ["DATA PIPELINE", "LLM / AGENTS", "SYSTEM DESIGN", "CLOUD INFRA"];

export const AboutSection = () => {
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-12%" as any });
  const fieldReport = useTyping(FIELD_REPORT, inView, 22);

  return (
    <section
      id="about"
      ref={ref}
      className="content-section relative overflow-hidden px-6 md:px-10 xl:px-16"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 section-vignette z-0" />
      <div className="absolute inset-0 section-floor z-0" />

      <div className="container relative z-10 mx-auto w-full max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8 xl:mb-10"
        >
          <h2
            className="section-title font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
            data-text="ABOUT KUNG"
          >
            About <span className="text-wez-cyan">Kung</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.25fr_0.75fr] xl:gap-14"
        >
          <motion.div variants={leftColVariants} className="flex flex-col gap-6">
            <div className="border-l-2 border-crimson/50 pl-5 md:pl-6">
              <div className="font-mono text-sm text-crimson/90 tracking-[0.18em] uppercase mb-3">
                -- FIELD REPORT --
              </div>
              <p className="font-mono text-sm text-foreground/75 leading-[1.8]">
                {fieldReport}
                {inView && fieldReport.length < FIELD_REPORT.length && (
                  <span className="animate-blink ml-1 text-wez-cyan">|</span>
                )}
              </p>
            </div>

            <div>
              <div className="font-mono text-sm text-wez-cyan/60 tracking-[0.18em] uppercase mb-3">
                -- SIGNATURE SKILLS --
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

          <motion.div variants={rightColVariants} className="relative flex justify-center items-start">
            <div className="relative w-full max-w-[310px] xl:max-w-[330px]">
              <div
                className="absolute -inset-5 z-0"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(0,245,255,0.1) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative z-[1] overflow-hidden aspect-[3/4] group">
                <img
                  src={profile}
                  alt="Kung"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ filter: "contrast(1.1) brightness(0.9)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
