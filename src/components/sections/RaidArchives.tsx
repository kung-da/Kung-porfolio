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
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
            // CLASSIFIED OPS
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight">
              Featured <span className="text-wez-cyan">Projects</span>
            </h2>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-mono text-xs tracking-widest px-3.5 md:px-4 py-2 transition-all duration-200 border uppercase"
                style={{
                  borderColor: active ? "rgb(143, 239, 255)" : "rgb(107, 114, 128)",
                  color: active ? "rgb(143, 239, 255)" : "rgb(107, 114, 128)",
                  backgroundColor: active ? "rgba(143, 239, 255, 0.08)" : "transparent",
                  boxShadow: active ? "0 0 12px rgba(143, 239, 255, 0.15)" : "none",
                }}
              >
                {f === "ALL" ? "All" : f}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-background/30 border border-border/60 h-80 md:h-96 animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="relative bg-background/40 backdrop-blur-sm border border-border/60 p-5 md:p-6 flex flex-col group overflow-hidden transition-shadow hover:shadow-card-hover"
                  >
                    {/* Operation ID & Title */}
                    <div className="mb-5 relative z-10">
                      <h3 className="font-display text-base md:text-lg font-bold uppercase text-wez-cyan truncate tracking-wide">
                        {p.name}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground mt-1 tracking-wider">
                        OP-{String(idx + 1).padStart(3, "0")}
                      </p>
                    </div>

                    {/* CLEARED/ONGOING Badge */}
                    {isComplete && (
                      <motion.div
                        initial={{ scale: 2, opacity: 0, rotate: -15 }}
                        whileInView={{ scale: 1, opacity: 0.8, rotate: 8 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 500, damping: 8 }}
                        className="absolute top-4 right-4 border-2 border-crimson text-crimson font-display text-xs font-bold px-2 py-1 tracking-widest z-20"
                      >
                        COMPLETE
                      </motion.div>
                    )}

                    {p.featured && (
                      <div className="absolute top-4 right-4 font-mono text-xs border border-warn-yellow/50 text-warn-yellow px-2 py-1 tracking-widest animate-pulse z-20">
                        ACTIVE
                      </div>
                    )}

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                      {p.techStack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-2.5 py-1 border border-wez-cyan/40 text-wez-cyan/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="font-mono text-sm text-foreground/70 leading-relaxed mb-6 line-clamp-3 relative z-10">
                      {p.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-auto flex gap-3 relative z-10">
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center font-mono text-xs uppercase border border-wez-cyan/50 text-wez-cyan/80 py-2.5 transition-all duration-200 hover:bg-wez-cyan hover:text-background hover:border-wez-cyan hover:shadow-[0_0_12px_rgba(143,239,255,0.3)]"
                        >
                          GitHub
                        </a>
                      )}
                      {p.demoLink && (
                        <a
                          href={p.demoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center font-mono text-xs uppercase border border-crimson/50 text-crimson/80 py-2.5 transition-all duration-200 hover:bg-crimson hover:text-white hover:border-crimson hover:shadow-[0_0_12px_rgba(255,0,60,0.3)]"
                        >
                          Demo
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
