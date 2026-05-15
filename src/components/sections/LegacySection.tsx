import { motion } from "framer-motion";

const TIMELINE = [
  {
    year: "2024",
    role: "Senior Data Engineer",
    company: "TOMBGUARD INTEL CORP",
    desc: "Architected real-time combat analytics pipelines processing 5TB+ daily. Forged resilient data architectures with zero downtime during high-stress encounters.",
    tech: ["Kafka", "Spark", "Airflow", "AWS"],
  },
  {
    year: "2022",
    role: "Data Engineer LV.3",
    company: "SHANGRI-LA NETWORKS",
    desc: "Mastered both the frontend Katana and backend Ninjutsu to build seamless, high-performance dashboards.",
    tech: ["React", "TypeScript", "PostgreSQL", "dbt"],
  },
  {
    year: "2020",
    role: "Data Swordsman",
    company: "CYBER DOJO",
    desc: "Began the journey of manipulating vast data streams. Automated ETL processes and optimized complex queries to reduce latency by 60%.",
    tech: ["Python", "SQL", "Docker"],
  },
];

export const LegacySection = () => {
  return (
    <section id="experience" className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 hud-grid pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 1.08 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
            // 04 — RECORD
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight">
            Experience <span className="text-wez-cyan">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Spine */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-border/40 md:-translate-x-1/2" />

          {TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex items-center mb-12 md:mb-16 lg:mb-20 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                {/* Node */}
                <div className="absolute left-[15px] md:left-1/2 w-2.5 h-2.5 bg-wez-cyan rotate-45 -translate-x-1/2 shadow-[0_0_8px_rgba(143,239,255,0.5)]" />

                {/* Connector */}
                <div
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px bg-border/30 w-12 ${isEven ? "right-1/2" : "left-1/2"}`}
                />

                {/* Content Panel */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                  whileHover={{ x: isEven ? -4 : 4, transition: { duration: 0.2 } }}
                  className="ml-10 md:ml-0 w-full md:w-[45%] relative bg-background/40 backdrop-blur-sm border border-border/60 p-5 md:p-6 group transition-shadow hover:shadow-card-hover"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-warn-yellow/50" />

                  <div className="mb-4">
                    <p className="font-mono text-xs text-warn-yellow tracking-wider mb-2 uppercase">
                      {item.year}
                    </p>
                    <h3 className="font-display text-lg md:text-xl text-wez-cyan tracking-wide font-bold mb-1">
                      {item.company}
                    </h3>
                    <p className="font-mono text-xs text-foreground/70 tracking-wide uppercase">
                      {item.role}
                    </p>
                  </div>

                  <p className="font-mono text-sm text-foreground/70 leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs border border-warn-yellow/40 text-warn-yellow/80 px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Current Operation */}
          <div className="relative flex items-center md:flex-row-reverse mt-12 md:mt-16">
            <div className="absolute left-[15px] md:left-1/2 w-3 h-3 bg-status-active rotate-45 -translate-x-1/2 shadow-[0_0_12px_rgba(0,255,136,0.6)] animate-pulse" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 500, damping: 12 }}
              className="ml-10 md:ml-0 w-full md:w-[45%] bg-background/40 backdrop-blur-sm border border-status-active/60 p-4 md:p-5 flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-status-active animate-pulse" />
              <span className="font-mono text-xs text-status-active tracking-widest uppercase">
                Active Operation
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
