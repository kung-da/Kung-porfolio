import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";

const FILTERS = ["ALL", "Pipeline", "Dashboard", "Analytics", "Other"] as const;

export const RaidArchives = () => {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    const base = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);
    return [...base].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, filter]);

  return (
    <section id="projects" className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#050510] text-[#E0E0E0] overflow-hidden">
      {/* Background diagonal slash */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 10px, #00D4FF 10px, #00D4FF 11px)" }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16">
          <p className="font-mono text-[11px] text-[#00D4FF] mb-2 tracking-wider">
            // OPS_ARCHIVE.DB
          </p>
          <div className="w-full h-[1px] bg-[#00D4FF] mb-4" />
          <div className="flex items-center gap-6">
            <h2 className="font-bold text-3xl md:text-5xl tracking-widest text-[#E0E0E0] uppercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              CLASSIFIED OPERATIONS
            </h2>
            <div className="border border-dashed border-[#CC0000] text-[#CC0000] font-mono text-[10px] px-2 py-0.5 rotate-[-2deg] tracking-widest">
              [DECLASSIFIED]
            </div>
          </div>
        </div>

        {/* Tactical Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-[11px] tracking-[0.1em] px-4 py-1.5 transition-all duration-200 border ${
                  active 
                    ? "border-[#00D4FF] text-[#00D4FF] bg-[#00D4FF0D] shadow-[0_0_8px_#00D4FF22]" 
                    : "border-[#00D4FF33] text-[#00D4FF66] hover:border-[#00D4FF88] hover:text-[#00D4FF]"
                }`}
              >
                [ {f === "ALL" ? "ALL OPS" : f.toUpperCase()} ]
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[#08080F] border border-[#1a1a2e] h-[300px] animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, idx) => {
                const isFeatured = p.featured;
                return (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className={`relative bg-[#08080F] border border-[#1a1a2e] p-6 flex flex-col group transition-colors hover:border-[#00D4FF44] ${isFeatured ? "md:col-span-2 lg:col-span-3 flex-row" : ""}`}
                  >
                    {/* Top Strip */}
                    <div className="mb-4">
                      <h3 className="text-lg md:text-xl font-bold uppercase text-[#00D4FF] truncate" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        [OP-{String(idx + 1).padStart(3, '0')}] {p.name}
                      </h3>
                    </div>

                    {/* Stamp */}
                    <div className="absolute top-6 right-6 border border-dashed border-[#B8860B] text-[#B8860B] font-mono text-[10px] px-2 py-0.5 rotate-[8deg] tracking-widest uppercase opacity-70">
                      MISSION: {isFeatured ? "ONGOING" : "COMPLETE"}
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.techStack.slice(0, 4).map(t => (
                        <span key={t} className="font-mono text-[10px] px-2 py-0.5 border border-[#00D4FF44] text-[#00D4FFaa] rounded-[2px]">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="font-mono text-[13px] text-[#7899aa] leading-[1.8] mb-6 line-clamp-3">
                      {p.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-auto flex gap-3">
                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noreferrer" className="flex-1 text-center font-mono text-[11px] uppercase border border-[#00D4FF44] text-[#00D4FF88] py-2 hover:bg-[#00D4FF22] hover:text-[#00D4FF] hover:border-[#00D4FF] transition-all">
                          [ INVESTIGATE → ]
                        </a>
                      )}
                      {p.demoLink && (
                        <a href={p.demoLink} target="_blank" rel="noreferrer" className="flex-1 text-center font-mono text-[11px] uppercase border border-[#CC000044] text-[#CC000088] py-2 hover:bg-[#CC000022] hover:text-[#CC0000] hover:border-[#CC0000] transition-all">
                          [ VIEW INTEL → ]
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
