import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers3,
  Radio,
  RotateCcw,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import type { ProjectCard, ProjectDetail } from "../types/project";

const CATEGORY_META: Record<string, { code: string; color: string }> = {
  Pipeline: { code: "PIPE", color: "#8FEFFF" },
  Dashboard: { code: "DASH", color: "#00FF88" },
  Analytics: { code: "ANLY", color: "#FCEE0A" },
  Other: { code: "OTHR", color: "#A1A1AA" },
};

const STATUS_COLOR: Record<string, string> = {
  Completed: "#00FF88",
  "In Progress": "#FCEE0A",
  Archived: "#A1A1AA",
};

function DossierPanel({
  title,
  icon: Icon = Terminal,
  children,
  accent = "cyan",
  className = "",
}: {
  title: string;
  icon?: typeof Terminal;
  children: React.ReactNode;
  accent?: "cyan" | "crimson";
  className?: string;
}) {
  const tone = accent === "cyan" ? "text-wez-cyan/85" : "text-crimson/85";

  return (
    <section className={`relative overflow-hidden border border-white/[0.08] bg-[rgba(5,11,17,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_38px_rgba(0,0,0,0.26)] ${className}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wez-cyan/45 to-transparent" />
      <div className="border-b border-white/[0.08] px-5 py-4">
        <div className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] ${tone}`}>
          <Icon size={15} strokeWidth={1.7} />
          {title}
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] px-5 py-8 text-zinc-100 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px] space-y-6">
        <div className="h-10 w-32 animate-skeleton-pulse bg-white/[0.06]" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <div className="h-6 w-44 animate-skeleton-pulse bg-white/[0.06]" />
            <div className="h-16 w-3/4 animate-skeleton-pulse bg-white/[0.06]" />
            <div className="h-5 w-1/2 animate-skeleton-pulse bg-white/[0.06]" />
            <div className="aspect-[16/8] animate-skeleton-pulse bg-white/[0.05]" />
            <div className="h-48 animate-skeleton-pulse bg-white/[0.05]" />
          </div>
          <div className="h-[460px] animate-skeleton-pulse bg-white/[0.05]" />
        </div>
      </div>
    </div>
  );
}

function ProjectError({ type, onRetry }: { type: "not-found" | "network"; onRetry?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-zinc-100">
      <div className="w-full max-w-md border border-crimson/25 bg-[rgba(5,11,17,0.78)] p-6 shadow-[inset_0_1px_0_rgba(214,58,74,0.08),0_18px_44px_rgba(0,0,0,0.32)]">
        <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-crimson">
          <ShieldAlert size={16} strokeWidth={1.7} />
          System error
        </div>
        <h1 className="font-display text-5xl font-bold text-zinc-50">
          {type === "not-found" ? "404" : "ERR"}
        </h1>
        <p className="mt-4 font-mono text-sm leading-relaxed text-zinc-400">
          {type === "not-found"
            ? "Project dossier was not found or has not been published."
            : "Could not reach the project database. Try reconnecting."}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => {
              sessionStorage.setItem("booted", "true");
              navigate("/");
              setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 80);
            }}
            className="border border-wez-cyan/35 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-wez-cyan transition-colors hover:bg-wez-cyan/10"
          >
            Back to projects
          </button>
          {type === "network" && onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 border border-crimson/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-enrage transition-colors hover:bg-crimson/10"
            >
              <RotateCcw size={13} strokeWidth={1.7} />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function YouTubeEmbed({ url }: { url: string }) {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
  if (!videoId) return null;

  return (
    <div className="overflow-hidden border border-white/[0.08] bg-black/40">
      <div className="border-b border-white/[0.08] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-wez-cyan/80">
        Demo video
      </div>
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="Project demo video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function HtmlPanel({ title, html }: { title: string; html: string }) {
  if (!html) return null;

  return (
    <DossierPanel title={title}>
      <div
        className="project-dossier-copy max-w-none font-mono text-[15px] leading-8 text-zinc-300 [&_a]:text-wez-cyan [&_a]:underline [&_a]:underline-offset-4 [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-wez-cyan [&_li]:mb-2 [&_p+p]:mt-4 [&_strong]:text-zinc-50"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </DossierPanel>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [allCards, setAllCards] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"not-found" | "network" | null>(null);

  useEffect(() => {
    sessionStorage.setItem("booted", "true");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const fetchProject = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      setLoading(false);
      setError("network");
    }, 10_000);

    try {
      const [detailRes, listRes] = await Promise.all([
        fetch(`/api/notion-projects?slug=${encodeURIComponent(slug)}`),
        fetch("/api/notion-projects"),
      ]);

      clearTimeout(timeout);

      if (!detailRes.ok || !listRes.ok) throw new Error("API error");

      const detailData = await detailRes.json();
      const listData = await listRes.json();

      if (!detailData.project) {
        setProject(null);
        setError("not-found");
      } else {
        setProject(detailData.project);
        setAllCards(listData.projects ?? []);
      }
    } catch {
      clearTimeout(timeout);
      setError("network");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchProject(); }, [fetchProject]);

  useEffect(() => {
    if (!project) return;
    const originalTitle = document.title;
    document.title = `${project.name} · CUNG-MASTER`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    const originalDesc = metaDesc.getAttribute("content") || "";
    metaDesc.setAttribute("content", project.description);

    return () => {
      document.title = originalTitle;
      metaDesc?.setAttribute("content", originalDesc);
    };
  }, [project]);

  if (loading) return <ProjectDetailSkeleton />;
  if (error) return <ProjectError type={error} onRetry={fetchProject} />;
  if (!project) return <ProjectError type="not-found" />;

  const currentIdx = allCards.findIndex((card) => card.slug === slug);
  const prevProject = currentIdx > 0 ? allCards[currentIdx - 1] : null;
  const nextProject = currentIdx >= 0 && currentIdx < allCards.length - 1 ? allCards[currentIdx + 1] : null;
  const category = CATEGORY_META[project.category] ?? CATEGORY_META.Other;
  const statusColor = STATUS_COLOR[project.status] ?? "#A1A1AA";

  const backToProjects = () => {
    sessionStorage.setItem("booted", "true");
    navigate("/");
    setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-zinc-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_0%_30%,rgba(214,58,74,0.12),transparent_24rem),radial-gradient(circle_at_100%_34%,rgba(143,239,255,0.095),transparent_26rem),linear-gradient(180deg,#050505,#030303_48%,#050505)]" />

      <div className="sticky top-0 z-30 border-b border-white/[0.08] bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
          <button
            onClick={backToProjects}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-wez-cyan"
            aria-label="Back to projects"
          >
            <ArrowLeft size={15} strokeWidth={1.7} />
            Back
          </button>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: category.color }}>
            {category.code} dossier
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]"
        >
          <div className="flex min-h-[330px] flex-col justify-center border border-white/[0.08] bg-[linear-gradient(135deg,rgba(214,58,74,0.07),rgba(5,11,17,0.62)_42%,rgba(143,239,255,0.045))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_70px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10">
            <div className="mb-5 flex max-w-[760px] items-center gap-4">
              <Layers3 size={17} className="text-crimson" strokeWidth={1.6} />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-crimson">
                Project Dossier
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-crimson/70 via-crimson/20 to-transparent" />
            </div>

            <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-[0.04em] text-zinc-50 drop-shadow-[0_0_18px_rgba(214,58,74,0.28)] sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            <p className="mt-6 max-w-3xl font-mono text-base leading-8 text-zinc-300">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="border px-3 py-2 font-mono text-xs uppercase tracking-[0.16em]" style={{ borderColor: `${category.color}55`, color: category.color }}>
                {project.category}
              </span>
              <span className="border px-3 py-2 font-mono text-xs uppercase tracking-[0.16em]" style={{ borderColor: `${statusColor}66`, color: statusColor }}>
                {project.status}
              </span>
              {project.timeline && (
                <span className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.025] px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300">
                  <CalendarClock size={13} strokeWidth={1.7} className="text-crimson" />
                  {project.timeline}
                </span>
              )}
            </div>
          </div>

          <aside className="border border-white/[0.08] bg-[rgba(5,11,17,0.78)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_52px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between gap-4">
              <span
                className="flex h-14 w-14 items-center justify-center border bg-black/20 font-mono text-sm font-semibold"
                style={{ borderColor: `${category.color}55`, color: category.color }}
              >
                {category.code}
              </span>
              <span className="border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ borderColor: `${statusColor}66`, color: statusColor }}>
                {project.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-5">
              <div className="border border-white/[0.08] bg-white/[0.025] p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">Category</p>
                <p className="mt-2 font-mono text-sm uppercase tracking-[0.12em] text-zinc-100">{project.category}</p>
              </div>
              <div className="border border-white/[0.08] bg-white/[0.025] p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">Featured</p>
                <p className="mt-2 font-mono text-sm uppercase tracking-[0.12em] text-zinc-100">{project.featured ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-wez-cyan/25 text-wez-cyan/80 transition-colors hover:border-wez-cyan hover:bg-wez-cyan/10 hover:text-wez-cyan"
                  aria-label="Open GitHub repository"
                >
                  <Github size={16} strokeWidth={1.8} />
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-crimson/35 text-enrage/80 transition-colors hover:border-crimson hover:bg-crimson/10 hover:text-enrage"
                  aria-label="Open live demo"
                >
                  <ExternalLink size={16} strokeWidth={1.8} />
                </a>
              )}
            </div>

            {project.techStack.length > 0 && (
              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-wez-cyan/80">Primary stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span key={tech} className="border border-wez-cyan/20 bg-wez-cyan/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-wez-cyan/75">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </motion.header>

        {project.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 overflow-hidden border border-white/[0.08] bg-black/40 shadow-[0_22px_54px_rgba(0,0,0,0.35)]"
          >
            <div className="relative aspect-[16/7] min-h-[280px]">
              <img
                src={project.coverImage}
                alt={`${project.name} cover`}
                className="h-full w-full object-cover opacity-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.62)),radial-gradient(circle_at_70%_20%,rgba(143,239,255,0.14),transparent_34%)]" />
            </div>
          </motion.div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <HtmlPanel title="Project overview" html={project.longDescription} />
            {project.youtubeEmbed && <YouTubeEmbed url={project.youtubeEmbed} />}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <HtmlPanel title="Highlights" html={project.highlights} />

            {project.techStack.length > 0 && (
              <DossierPanel title="Tech stack" icon={CheckCircle2}>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="border border-wez-cyan/20 bg-wez-cyan/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-wez-cyan/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </DossierPanel>
            )}

            {project.tags.length > 0 && (
              <DossierPanel title="Tags" icon={Radio} accent="crimson">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </DossierPanel>
            )}
          </aside>
        </div>

        {(prevProject || nextProject) && (
          <nav className="mt-10 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-2" aria-label="Project navigation">
            <div>
              {prevProject && (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  className="group flex min-h-24 flex-col justify-center border border-white/[0.08] bg-black/30 p-4 no-underline transition-colors hover:border-wez-cyan/30 hover:bg-wez-cyan/[0.04]"
                >
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 group-hover:text-wez-cyan">
                    <ArrowLeft size={13} strokeWidth={1.7} />
                    Prev dossier
                  </span>
                  <span className="mt-2 font-display text-lg font-bold text-zinc-100">{prevProject.name}</span>
                </Link>
              )}
            </div>
            <div>
              {nextProject && (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group flex min-h-24 flex-col justify-center border border-white/[0.08] bg-black/30 p-4 text-right no-underline transition-colors hover:border-wez-cyan/30 hover:bg-wez-cyan/[0.04]"
                >
                  <span className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 group-hover:text-wez-cyan">
                    Next dossier
                    <ArrowRight size={13} strokeWidth={1.7} />
                  </span>
                  <span className="mt-2 font-display text-lg font-bold text-zinc-100">{nextProject.name}</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </main>
    </div>
  );
}
