import { motion } from "framer-motion";

const TIMELINE = [
  {
    year: "2024",
    role: "Senior Data Engineer",
    company: "TOMBGUARD INTEL CORP",
    desc: "Architected real-time combat analytics pipelines processing 5TB+ daily. Forged resilient data architectures with zero downtime during high-stress encounters.",
    tech: ["Kafka", "Spark", "Airflow", "AWS"]
  },
  {
    year: "2022",
    role: "Data Engineer LV.3",
    company: "SHANGRI-LA NETWORKS",
    desc: "Mastered both the frontend Katana and backend Ninjutsu to build seamless, high-performance dashboards.",
    tech: ["React", "TypeScript", "PostgreSQL", "dbt"]
  },
  {
    year: "2020",
    role: "Data Swordsman",
    company: "CYBER DOJO",
    desc: "Began the journey of manipulating vast data streams. Automated ETL processes and optimized complex queries to reduce latency by 60%.",
    tech: ["Python", "SQL", "Docker"]
  },
];

export const LegacySection = () => {
  return (
    <section id="experience" className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#050510] text-[#E0E0E0] overflow-hidden">
      {/* Binary rain / Katakana background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, .3) 25%, rgba(0, 212, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, .3) 75%, rgba(0, 212, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, .3) 25%, rgba(0, 212, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, .3) 75%, rgba(0, 212, 255, .3) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px"
        }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="mb-24">
          <p className="font-mono text-[11px] text-[#00D4FF] mb-2 tracking-wider">
            // COMBAT_HISTORY.LOG
          </p>
          <div className="w-full h-[1px] bg-[#00D4FF] mb-4" />
          <h2 className="font-bold text-3xl md:text-5xl tracking-widest text-[#E0E0E0]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            FIELD RECORD
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Spine */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#00D4FF22] md:-translate-x-1/2" />

          {TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex items-center mb-16 md:mb-24 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                
                {/* Node on Spine */}
                <div className="absolute left-[15px] md:left-1/2 w-2 h-2 bg-[#00D4FF] rotate-45 -translate-x-1/2 shadow-[0_0_8px_#00D4FF]" />

                {/* Connector Line */}
                <div 
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] bg-[#00D4FF22] w-12 ${
                    isEven ? "right-1/2" : "left-1/2"
                  }`} 
                />

                {/* Content Panel */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`ml-10 md:ml-0 w-full md:w-[45%] relative bg-[#070710] border border-[#1a1a2e] p-6 hover:shadow-[-3px_0_12px_#00D4FF22] transition-shadow rounded-[2px]`}
                >
                  {/* Armor Trim Top */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#B8860B]" />
                  
                  {/* Mission Log Label */}
                  <div className="absolute top-2 right-4 font-mono text-[10px] text-[#333]">
                    MISSION LOG #{TIMELINE.length - idx}
                  </div>

                  <div className="mb-4">
                    <p className="font-mono text-[10px] text-[#B8860B] tracking-[0.15em] mb-2">
                      [{item.year}]
                    </p>
                    <h3 className="text-[15px] text-[#00D4FF] mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {item.company}
                    </h3>
                    <p className="font-mono text-[12px] text-[#CC0000] tracking-[0.1em] uppercase">
                      {item.role}
                    </p>
                  </div>

                  <p className="font-mono text-[13px] text-[#7899aa] leading-[1.8] mb-6">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tech.map(t => (
                      <span key={t} className="font-mono text-[10px] border border-[#B8860B44] text-[#B8860B] px-2 py-0.5 rounded-[2px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Current Operation Panel */}
          <div className="relative flex items-center md:flex-row-reverse mt-16 md:mt-24">
             {/* Node on Spine */}
             <div className="absolute left-[15px] md:left-1/2 w-2 h-2 bg-[#00FF88] rotate-45 -translate-x-1/2 shadow-[0_0_12px_#00FF88]" />
             
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="ml-10 md:ml-0 w-full md:w-[45%] bg-[#070710] border border-[#00FF88] p-4 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" style={{ animationDuration: "1.5s" }} />
                <span className="font-mono text-[11px] text-[#00FF88] tracking-widest">
                  CURRENT OPERATION ACTIVE
                </span>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
