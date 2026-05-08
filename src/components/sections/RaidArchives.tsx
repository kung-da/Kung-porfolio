import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
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
    <section id="raids" className="relative py-24 px-6 bg-washi" style={{ zIndex: 4 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader chapter="03" title="Raid Archives" jp="戦闘記録" />

        <p className="font-mono-ui text-xs text-stone mb-8 tracking-wider">
          RAIDS COMPLETED: {projects.length} · SUCCESS RATE: 100% · CASUALTIES: 0
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`uppercase font-mono text-xs tracking-wider px-4 py-2 rounded-none transition-colors duration-200 border ${
                  active 
                    ? "bg-[#0A0A0A] text-[#FAFAF8] border-[#0A0A0A]" 
                    : "bg-transparent text-[#0A0A0A] border-[#0A0A0A]/30 hover:bg-[#0A0A0A] hover:text-[#FAFAF8]"
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
              <div key={i} className="manga-panel h-[420px] animate-pulse opacity-50" />
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
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                  className="relative overflow-hidden group katana-container bg-[#FAFAF8] border border-[#0A0A0A] p-6 shadow-[4px_4px_0_#0A0A0A] transition-transform duration-300 rounded-none hover:-translate-y-2 hover:shadow-[8px_8px_0_#8FEFFF]"
                >
                  {/* Cover */}
                  <div className="relative h-44 overflow-hidden border-b-2 border-ink">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt={p.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:saturate-100"
                        style={{ filter: "grayscale(0.7) contrast(1.1)" }}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full halftone-bg" />
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      {p.featured && (
                        <span
                          className="font-display text-[9px] tracking-[0.2em] px-2 py-0.5 inline-flex items-center gap-1"
                          style={{ background: "#0A0A0A", color: "#8FEFFF" }}
                        >
                          <Star size={9} fill="#8FEFFF" /> FEATURED
                        </span>
                      )}
                      <span
                        className="font-display text-[9px] tracking-[0.2em] px-2 py-0.5 text-ink"
                        style={{ border: "1px solid #0A0A0A" }}
                      >
                        {p.category.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-display text-base tracking-wider text-ink uppercase mb-2">
                      {p.name}
                    </h3>
                    <div className="manga-rule mb-3" style={{ height: 1 }} />

                    <p className="font-mono-ui text-xs text-stone leading-relaxed mb-4 line-clamp-3">
                      {p.description}
                    </p>

                    <p className="chapter-label mb-1.5">TECH</p>
                    <p className="font-mono-ui text-[11px] text-ink mb-4">
                      {p.techStack.join(" · ")}
                    </p>

                    <div className="flex gap-2 pt-3" style={{ borderTop: "1px solid #0A0A0A" }}>
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="font-display text-[10px] tracking-[0.2em] px-3 py-1.5 inline-flex items-center gap-1.5"
                          style={{
                            border: "1px solid #0A0A0A",
                            color: "#0A0A0A",
                          }}
                        >
                          <Github size={11} /> DEBRIEF
                        </a>
                      )}
                      {p.demoLink && (
                        <a
                          href={p.demoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="font-display text-[10px] tracking-[0.2em] px-3 py-1.5 inline-flex items-center gap-1.5"
                          style={{ background: "#0A0A0A", color: "#8FEFFF" }}
                        >
                          <ExternalLink size={11} /> LIVE DEMO
                        </a>
                      )}
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
