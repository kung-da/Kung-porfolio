import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/useProjects";
import { Github, ExternalLink, Star } from "lucide-react";

const FILTERS = ["All", "Pipeline", "Dashboard", "Analytics", "Other"] as const;

const CATEGORY_COLOR: Record<string, string> = {
  Pipeline: "#00BFFF",
  Dashboard: "#f2a7c3",
  Analytics: "#f5a623",
  Other: "#8aa4ff",
};

export const Projects = () => {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const base = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    return [...base].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, filter]);

  return (
    <section id="projects" className="relative py-[100px] px-6" style={{ zIndex: 5 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow="04 / PROJECTS" title="What I've Built" />

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: active ? "#00BFFF" : "transparent",
                  color: active ? "#0a0f1e" : "rgba(232,240,255,0.7)",
                  border: active ? "1px solid #00BFFF" : "1px solid rgba(0,191,255,0.3)",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden animate-pulse"
                style={{ background: "#111827", border: "0.5px solid rgba(255,255,255,0.06)" }}
              >
                <div className="bg-muted/40" style={{ height: 200 }} />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted/40 rounded w-3/4" />
                  <div className="h-3 bg-muted/30 rounded" />
                  <div className="h-3 bg-muted/30 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="rounded-xl overflow-hidden transition-all hover:-translate-y-1 group"
                style={{
                  background: "#111827",
                  border: "0.5px solid rgba(255,255,255,0.06)",
                  borderLeft: "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeft = "3px solid #00BFFF";
                  e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0,191,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeft = "3px solid transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="relative" style={{ height: 200 }}>
                  {p.coverImage ? (
                    <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-foreground/70 font-mono text-sm"
                      style={{ background: "linear-gradient(135deg, #1a2540, #162347)" }}
                    >
                      {p.techStack.slice(0, 3).join(" · ")}
                    </div>
                  )}
                  {p.featured && (
                    <span
                      className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1"
                      style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", border: "1px solid #f5a623" }}
                    >
                      <Star size={12} fill="#f5a623" /> Featured
                    </span>
                  )}
                </div>

                <div className="p-4 relative">
                  <span
                    className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full"
                    style={{
                      background: `${CATEGORY_COLOR[p.category] || "#8aa4ff"}20`,
                      color: CATEGORY_COLOR[p.category] || "#8aa4ff",
                    }}
                  >
                    {p.category}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-2 pr-20">{p.name}</h3>
                  <p
                    className="text-muted-foreground mb-3 overflow-hidden"
                    style={{
                      fontSize: 13,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(0,191,255,0.1)",
                          color: "#00BFFF",
                          border: "1px solid rgba(0,191,255,0.3)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-muted-foreground">
                    {p.githubLink && (
                      <a href={p.githubLink} target="_blank" rel="noreferrer" className="hover:text-teal transition-colors" aria-label="GitHub">
                        <Github size={18} />
                      </a>
                    )}
                    {p.demoLink && (
                      <a href={p.demoLink} target="_blank" rel="noreferrer" className="hover:text-teal transition-colors" aria-label="Demo">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
