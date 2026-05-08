import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    name: "DATA PIPELINE",
    color: "#00D4FF",
    skills: ["Python", "Spark", "Airflow", "dbt", "Kafka", "PostgreSQL"],
    pwr: 92,
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    name: "AI SYSTEMS",
    color: "#CC0000",
    skills: ["LangChain", "OpenAI", "Hugging Face", "RAG", "Pinecone"],
    pwr: 85,
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "INFRASTRUCTURE",
    color: "#B8860B",
    skills: ["Docker", "K8s", "Terraform", "AWS", "CI/CD"],
    pwr: 88,
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    name: "FRONTEND MODULES",
    color: "#00FF88",
    skills: ["React", "TypeScript", "Tailwind", "Next.js"],
    pwr: 95,
    colSpan: "md:col-span-2 lg:col-span-2",
  },
];

export const AbilitySection = () => {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 bg-[#050510] overflow-hidden text-[#E0E0E0]">
      {/* Hexagonal Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"49\" viewBox=\"0 0 28 49\"><path d=\"M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM14 1.75l13 7.5v15l-13 7.5L1 24.25v-15l13-7.5z\" fill=\"%2300D4FF\" fill-rule=\"evenodd\"/></svg>')",
          backgroundSize: "40px"
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16">
          <p className="font-mono text-[11px] text-[#00D4FF] mb-2 tracking-wider">
            // COMBAT_SYSTEMS.LOG
          </p>
          <div className="w-full h-[1px] bg-[#00D4FF] mb-4" />
          <h2 className="font-bold text-3xl md:text-5xl tracking-widest text-[#E0E0E0]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            ACTIVE ARMOR MODULES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative bg-[#070710] border border-[#00D4FF22] p-6 group transition-all duration-300 hover:-translate-y-1 hover:border-[#00D4FF88] hover:shadow-[0_0_16px_#00D4FF22] ${cat.colSpan}`}
            >
              {/* Top Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
                style={{ backgroundColor: `${cat.color}44` }}
              >
                <div 
                  className="h-full w-1/3 bg-current -translate-x-full group-hover:animate-[sweep_1s_ease-in-out_infinite]"
                  style={{ color: cat.color }}
                />
              </div>

              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl md:text-2xl font-bold tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif", color: cat.color }}>
                  {cat.name}
                </h3>
                <span className="font-mono text-[10px] bg-[#00FF8822] text-[#00FF88] border border-[#00FF88] px-2 py-0.5 rounded-sm">
                  ONLINE
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {cat.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="font-mono text-[11px] px-2 py-1 rounded-[2px]"
                    style={{ border: `1px solid ${cat.color}66`, color: cat.color }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Power Bar */}
              <div className="mt-auto flex items-center gap-3">
                <div className="flex-1 h-[3px] bg-[#1a1a2e]">
                  <motion.div 
                    className="h-full"
                    style={{ backgroundColor: cat.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.pwr}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <span className="font-mono text-[10px] text-[#7899aa]">PWR: {cat.pwr}%</span>
              </div>

              {/* Corner Decoration */}
              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#00D4FF33]">
                &gt;&gt;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </section>
  );
};
