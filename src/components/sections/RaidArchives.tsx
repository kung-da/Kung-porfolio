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
    <section id="projects" className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.03] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 10px, #FF003C 10px, #FF003C 11px)" }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 1.08 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="mb-16"
        >
          <p className="font-mono-ui text-[11px] text-crimson mb-2 tracking-widest">
            // OPS_ARCHIVE.DB
          </p>
          <div className="w-full h-[1px] bg-[#FF003C] mb-4 opacity-60" />
          <div className="flex items-center gap-6 flex-wrap">
            <h2 className="font-display font-bold text-2xl md:text-4xl tracking-widest uppercase">
              CLASSIFIED <span className="text-cyan-accent">OPERATIONS</span>
            </h2>
            <motion.span
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: -3, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 8 }}
              className="border border-dashed border-[#FF003C] text-crimson font-mono-ui text-[10px] px-3 py-1 tracking-widest"
            >
              [DECLASSIFIED]
            </motion.span>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-mono-ui text-[10px] tracking-[0.15em] px-4 py-2 transition-all duration-100 border uppercase"
                style={{
                  borderColor: active ? "#FF003C" : "#1a1a2e",
                  color: active ? "#FF003C" : "#888",
                  background: active ? "rgba(255,0,60,0.08)" : "transparent",
                  boxShadow: active ? "0 0 12px rgba(255,0,60,0.2)" : "none",
                  clipPath: "polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
                }}
              >
                [ {f === "ALL" ? "ALL OPS" : f.toUpperCase()} ]
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[#0A0A0A] border border-[#1a1a2e] h-[280px] animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, idx) => {
                const isComplete = !p.featured;
                return (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                    whileHover={{ y: -4, transition: { duration: 0.1 } }}
                    className="relative bg-[#0A0A0A] border border-[#1a1a2e] p-6 flex flex-col group overflow-hidden katana-slash"
                    style={{
                      clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
                      style={{ boxShadow: "inset 0 0 40px rgba(0,245,255,0.05), 0 0 20px rgba(0,245,255,0.05)" }}
                    />

                    {/* Operation ID */}
                    <div className="mb-4 relative z-10">
                      <h3 className="font-display text-sm md:text-base font-bold uppercase text-cyan-accent truncate tracking-wider">
                        [OP-{String(idx + 1).padStart(3, "0")}] {p.name}
                      </h3>
                    </div>

                    {/* CLEARED Stamp */}
                    {isComplete && (
                      <motion.div
                        initial={{ scale: 2, opacity: 0, rotate: -15 }}
                        whileInView={{ scale: 1, opacity: 0.7, rotate: 8 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 500, damping: 8 }}
                        className="absolute top-5 right-4 border-2 border-[#FF003C] text-crimson font-display text-[11px] font-bold px-3 py-1 tracking-[0.3em] z-20"
                      >
                        CLEARED
                      </motion.div>
                    )}

                    {/* Ongoing badge */}
                    {p.featured && (
                      <div className="absolute top-5 right-4 font-mono-ui text-[9px] border border-[#FCEE0A66] text-[#FCEE0A] px-2 py-0.5 tracking-widest animate-pulse z-20">
                        ONGOING
                      </div>
                    )}

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                      {p.techStack.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="font-mono-ui text-[9px] px-2 py-0.5 border border-[#00F5FF33] text-[#00F5FFaa]"
                          style={{ clipPath: "polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="font-mono-ui text-[12px] text-dim leading-[1.8] mb-6 line-clamp-3 relative z-10">
                      {p.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-auto flex gap-3 relative z-10">
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center font-mono-ui text-[10px] uppercase border border-[#00F5FF33] text-[#00F5FF88] py-2 transition-all duration-100 hover:bg-[#00F5FF] hover:text-[#050505] hover:border-[#00F5FF] hover:shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                          style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                        >
                          [ INVESTIGATE → ]
                        </a>
                      )}
                      {p.demoLink && (
                        <a
                          href={p.demoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center font-mono-ui text-[10px] uppercase border border-[#FF003C33] text-[#FF003C88] py-2 transition-all duration-100 hover:bg-[#FF003C] hover:text-white hover:border-[#FF003C] hover:shadow-[0_0_15px_rgba(255,0,60,0.4)]"
                          style={{ clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)" }}
                        >
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
