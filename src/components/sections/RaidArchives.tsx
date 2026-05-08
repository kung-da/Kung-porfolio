import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";
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
    <section id="raids" className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#050505]">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.05)_0%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#C8102E] uppercase mb-2">
            // BATTLE LOGS
          </p>
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-widest text-[#E0E0E0] drop-shadow-[0_0_8px_rgba(200,16,46,0.3)]">
            Raid <span className="text-[#C8102E]">Archives</span>
          </h2>
          <p className="font-mono text-[10px] md:text-xs text-[#888888] mt-4 tracking-widest uppercase">
            RAIDS COMPLETED: {projects.length} <span className="text-[#C8102E] mx-2">|</span> SUCCESS RATE: 100%
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`uppercase font-mono text-[10px] md:text-xs tracking-wider px-6 py-2 transition-all duration-300 border ${
                  active 
                    ? "bg-[#C8102E] text-[#E0E0E0] border-[#C8102E] shadow-[0_0_15px_rgba(200,16,46,0.4)]" 
                    : "bg-transparent text-[#888888] border-[#333333] hover:border-[#C8102E] hover:text-[#E0E0E0]"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[#0A0A0A] border border-[#333333] h-[460px] animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p, idx) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className="relative group bg-[#0A0A0A] border border-[#333333] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#C8102E] hover:shadow-[0_10px_30px_rgba(200,16,46,0.15)] flex flex-col"
                >
                  {/* Katana Slash Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C8102E]/20 to-transparent skew-x-[-45deg] -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out z-20 pointer-events-none" />

                  {/* Cover */}
                  <div className="relative h-48 overflow-hidden border-b border-[#333333] bg-[#050505]">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: "grayscale(100%) contrast(1.2)" }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,#C8102E_1px,transparent_1px)] bg-[size:12px_12px]" />
                    )}
                    {/* Hover Color Reveal */}
                    <div className="absolute inset-0 bg-[#C8102E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen" />
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {p.featured && (
                          <span className="font-mono text-[9px] tracking-[0.2em] px-2 py-1 bg-[#C8102E] text-[#E0E0E0] uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(200,16,46,0.4)]">
                            <Star size={9} fill="currentColor" /> HEROIC
                          </span>
                        )}
                        <span className="font-mono text-[9px] tracking-[0.2em] px-2 py-1 border border-[#333333] text-[#888888] uppercase">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-lg tracking-wider text-[#E0E0E0] uppercase mb-3 group-hover:text-[#00f5ff] transition-colors">
                      {p.name}
                    </h3>
                    
                    <p className="font-mono text-xs text-[#888888] leading-relaxed mb-6 line-clamp-3">
                      {p.description}
                    </p>

                    <div className="mt-auto">
                      <p className="font-mono text-[9px] tracking-[0.2em] text-[#C8102E] mb-2 uppercase">Tech Stack</p>
                      <p className="font-mono text-[10px] text-[#C0C0C0] mb-6">
                        {p.techStack.join(" · ")}
                      </p>

                      <div className="flex gap-3 pt-4 border-t border-[#333333]">
                        {p.githubLink && (
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[10px] tracking-[0.2em] px-4 py-2 border border-[#333333] text-[#E0E0E0] hover:border-[#00f5ff] hover:text-[#00f5ff] transition-colors flex items-center gap-2 uppercase"
                          >
                            <Github size={12} /> Source
                          </a>
                        )}
                        {p.demoLink && (
                          <a
                            href={p.demoLink}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[10px] tracking-[0.2em] px-4 py-2 bg-[#C8102E] text-[#E0E0E0] hover:shadow-[0_0_15px_rgba(200,16,46,0.6)] transition-all flex items-center gap-2 uppercase"
                          >
                            <ExternalLink size={12} /> Deploy
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
