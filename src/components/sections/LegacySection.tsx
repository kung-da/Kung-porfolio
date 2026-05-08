import { motion } from "framer-motion";

const LEGACY_ITEMS = [
  {
    year: "2024",
    title: "Senior Data Engineer",
    company: "Tech Corp",
    desc: "Architected real-time data pipelines processing 1TB+ daily. Unleashed the power of modern cloud infrastructure to eradicate latency and forge unyielding systems.",
    tech: ["Kafka", "Spark", "AWS", "Python"]
  },
  {
    year: "2022",
    title: "Full-stack Developer",
    company: "Digital Studio X",
    desc: "Mastered the frontend arts. Built highly interactive, performant web applications focusing on immersive user experiences and absolute aesthetic superiority.",
    tech: ["React", "TypeScript", "Tailwind", "Node.js"]
  },
  {
    year: "2020",
    title: "Data Analyst",
    company: "Global Analytics",
    desc: "The awakening. Began the journey by unraveling complex datasets to discover hidden truths and drive strategic decisions across multiple sectors.",
    tech: ["SQL", "Python", "Tableau", "Excel"]
  }
];

export const LegacySection = () => {
  return (
    <section id="legacy" className="relative py-24 px-6 bg-[#050505] overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#C8102E] uppercase mb-2">
            // HISTORY OF THE BLADE
          </p>
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-widest text-[#E0E0E0] drop-shadow-[0_0_8px_rgba(200,16,46,0.3)]">
            <span className="text-[#C8102E]">Legacy</span> & Experience
          </h2>
        </motion.div>

        <div className="relative border-l-2 border-[#333333] ml-4 md:ml-0 md:border-none">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#333333]" />

          {LEGACY_ITEMS.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative mb-12 md:mb-24 last:mb-0"
              >
                {/* Desktop layout */}
                <div className="hidden md:flex items-center justify-between w-full">
                  <div className={`w-5/12 ${isLeft ? 'text-right pr-12' : 'order-last text-left pl-12'}`}>
                    <h3 className="font-display text-xl text-[#00f5ff] mb-1">{item.title}</h3>
                    <p className="font-mono text-sm text-[#888888] uppercase mb-4 tracking-wider">{item.company}</p>
                    <p className="font-mono text-[11px] text-[#C0C0C0] leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      {item.tech.map(t => (
                        <span key={t} className="font-mono text-[9px] px-2 py-1 border border-[#333333] text-[#888888]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Center Marker */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0A0A0A] border-2 border-[#C8102E] flex items-center justify-center shadow-[0_0_15px_rgba(200,16,46,0.5)] z-10">
                    <div className="w-2 h-2 bg-[#00f5ff] rounded-full" />
                  </div>

                  <div className={`w-5/12 ${isLeft ? 'order-last text-left pl-12' : 'text-right pr-12'}`}>
                    <span className="font-display text-4xl text-[#333333] font-bold opacity-50">{item.year}</span>
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden pl-8 relative">
                  {/* Marker */}
                  <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-[#C8102E] shadow-[0_0_10px_rgba(200,16,46,0.5)]" />
                  
                  <span className="font-display text-2xl text-[#333333] font-bold mb-2 block">{item.year}</span>
                  <h3 className="font-display text-lg text-[#00f5ff] mb-1">{item.title}</h3>
                  <p className="font-mono text-xs text-[#888888] uppercase mb-3 tracking-wider">{item.company}</p>
                  <p className="font-mono text-[11px] text-[#C0C0C0] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map(t => (
                      <span key={t} className="font-mono text-[9px] px-2 py-1 border border-[#333333] text-[#888888]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
