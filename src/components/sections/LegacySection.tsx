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
          className="mb-24"
        >
          <p className="font-mono-ui text-[11px] text-crimson mb-2 tracking-widest">
            // COMBAT_HISTORY.LOG
          </p>
          <div className="w-full h-[1px] bg-[#FF003C] mb-4 opacity-60" />
          <h2 className="font-display font-bold text-2xl md:text-4xl tracking-widest uppercase">
            FIELD <span className="text-cyan-accent">RECORD</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Spine */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#FF003C22] md:-translate-x-1/2" />

          {TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex items-center mb-16 md:mb-24 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                {/* Node */}
                <div className="absolute left-[15px] md:left-1/2 w-3 h-3 bg-[#FF003C] rotate-45 -translate-x-1/2 shadow-[0_0_10px_#FF003C]" />

                {/* Connector */}
                <div
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] bg-[#FF003C33] w-12 ${isEven ? "right-1/2" : "left-1/2"}`}
                />

                {/* Content Panel */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                  whileHover={{ x: isEven ? -4 : 4, transition: { duration: 0.1 } }}
                  className="ml-10 md:ml-0 w-full md:w-[45%] relative bg-[#0A0A0A] border border-[#1a1a2e] p-6 group katana-slash overflow-hidden"
                  style={{
                    clipPath: isEven
                      ? "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))"
                      : "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                  }}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />

                  {/* Mission label */}
                  <div className="absolute top-2 right-4 font-mono-ui text-[9px] text-[#1a1a2e] tracking-widest">
                    LOG #{TIMELINE.length - idx}
                  </div>

                  <div className="mb-4">
                    <p className="font-mono-ui text-[10px] text-[#D4AF37] tracking-[0.2em] mb-2">
                      [{item.year}]
                    </p>
                    <h3 className="font-display text-sm text-cyan-accent mb-1 tracking-wider">
                      {item.company}
                    </h3>
                    <p className="font-mono-ui text-[11px] text-crimson tracking-[0.15em] uppercase">
                      {item.role}
                    </p>
                  </div>

                  <p className="font-mono-ui text-[12px] text-dim leading-[1.9] mb-6">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono-ui text-[9px] border border-[#D4AF3744] text-[#D4AF37] px-2 py-0.5"
                        style={{ clipPath: "polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)" }}
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
          <div className="relative flex items-center md:flex-row-reverse mt-16 md:mt-24">
            <div className="absolute left-[15px] md:left-1/2 w-3 h-3 bg-[#00FF88] rotate-45 -translate-x-1/2 shadow-[0_0_12px_#00FF88] animate-pulse" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 500, damping: 12 }}
              className="ml-10 md:ml-0 w-full md:w-[45%] bg-[#0A0A0A] border border-[#00FF88] p-4 flex items-center gap-3"
              style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
            >
              <div className="w-2 h-2 bg-[#00FF88] animate-pulse" style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }} />
              <span className="font-mono-ui text-[11px] text-[#00FF88] tracking-widest">
                CURRENT OPERATION ACTIVE
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
