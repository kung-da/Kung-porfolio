import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarClock, Database, GitBranch, LineChart, Sparkles } from "lucide-react";
import experienceImage from "@/assets/cleanest.jpeg";

const EXPERIENCE = [
  {
    period: "2025 - Now",
    title: "Data Engineering Focus",
    role: "Pipeline design, ingestion workflows, analytics-ready datasets",
    details: ["Incremental crawlers", "Raw-to-clean data modeling", "Operational dashboards"],
    icon: Database,
  },
  {
    period: "2024 - 2025",
    title: "Frontend Systems",
    role: "Interactive portfolio, UI systems, responsive data storytelling",
    details: ["React interfaces", "Motion systems", "Design implementation"],
    icon: GitBranch,
  },
  {
    period: "Ongoing",
    title: "AI Assisted Builds",
    role: "Combining automation, product thinking, and fast prototyping",
    details: ["Prompt workflows", "Code iteration", "Project documentation"],
    icon: Sparkles,
  },
];

export const LegacySection = () => {
  return (
    <section
      id="experience"
      className="content-section relative isolate overflow-hidden px-5 text-zinc-100 sm:px-8 lg:px-12 xl:px-16"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_20%,rgba(143,239,255,0.055),transparent_28%),radial-gradient(circle_at_86%_62%,rgba(214,58,74,0.075),transparent_34%)]" />
      <div className="absolute inset-0 section-vignette pointer-events-none" />
      <div className="absolute inset-0 section-floor pointer-events-none" />

      <div className="container relative z-10 mx-auto w-full max-w-[1760px]">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-9"
        >
          <div className="flex max-w-[760px] items-center gap-4">
            <BriefcaseBusiness size={17} className="text-crimson" strokeWidth={1.6} />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-crimson sm:text-sm">
              Experience Log
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-crimson/70 via-crimson/20 to-transparent" />
          </div>

          <h2
            className="section-title mt-5 max-w-4xl font-display text-4xl font-bold uppercase leading-none tracking-[0.04em] text-zinc-50 drop-shadow-[0_0_18px_rgba(214,58,74,0.34)] sm:text-5xl lg:text-6xl xl:text-7xl"
            data-text="EXPERIENCE"
          >
            Experience
          </h2>
        </motion.header>

        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)] 2xl:grid-cols-[460px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden border border-crimson/25 bg-[rgba(5,11,17,0.72)] shadow-[inset_0_1px_0_rgba(214,58,74,0.08),0_18px_44px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/70 to-transparent" />
            <div className="relative h-[320px] overflow-hidden sm:h-[420px] xl:h-full xl:min-h-[620px]">
              <img
                src={experienceImage}
                alt="Experience visual"
                loading="lazy"
                className="h-full w-full object-cover opacity-85 saturate-[0.86]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,8,0.86)),radial-gradient(circle_at_70%_20%,rgba(214,58,74,0.24),transparent_30%)]" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-crimson/80">
                  Current profile
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-zinc-50">
                  Data-focused builder
                </p>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="grid content-start gap-4"
          >
            {EXPERIENCE.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden border border-white/[0.08] bg-[rgba(5,11,17,0.72)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_34px_rgba(0,0,0,0.24)] transition-all duration-300 hover:border-wez-cyan/30 hover:bg-[rgba(8,15,23,0.9)]"
                >
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-wez-cyan/50 to-transparent opacity-60" />
                  <div className="grid gap-5 lg:grid-cols-[160px_minmax(0,1fr)]">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-wez-cyan/25 bg-wez-cyan/[0.04] text-wez-cyan">
                        <Icon size={17} strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                          Entry {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-crimson/80">
                          <CalendarClock size={13} strokeWidth={1.7} />
                          {item.period}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold leading-tight text-zinc-50 group-hover:text-wez-cyan">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-mono text-sm leading-relaxed text-zinc-400">
                        {item.role}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.details.map((detail) => (
                          <span
                            key={detail}
                            className="border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="flex flex-wrap items-center gap-4 border border-crimson/20 bg-crimson/[0.055] p-4 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">
              <LineChart size={15} className="text-crimson" strokeWidth={1.7} />
              <span><span className="text-crimson">//</span> Trajectory: data systems, interface craft, applied AI</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
