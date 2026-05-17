// src/pages/ProjectDetailPage.tsx
// ═══════════════════════════════════════════════════════════════════
// Task 4E: Project Detail Page
// Route: /projects/:slug
// Features:
//   - Fetch từ /api/notion-projects?slug=xxx
//   - Skeleton loading (giữ layout, không layout shift)
//   - Error / 404 states phù hợp với Cyber Samurai theme
//   - Next/Prev project navigation
//   - Scroll to top on mount
//   - Dynamic document.title
// ═══════════════════════════════════════════════════════════════════

import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { ProjectDetail, ProjectCard } from "../types/project";

// ─── Category colors ──────────────────────────────────────────────
const CATEGORY_COLOR: Record<string, string> = {
  Pipeline:  "#8FEFFF",  // wez-cyan
  Dashboard: "#00FF88",  // status-active
  Analytics: "#FCEE0A",  // warn-yellow
  Other:     "#888888",  // stone
};

// ─── Status colors ────────────────────────────────────────────────
const STATUS_COLOR: Record<string, string> = {
  "Completed":   "#00FF88",
  "In Progress": "#FCEE0A",
  "Archived":    "#888888",
};

// ═══════════════════════════════════════════════════════════════════
// SKELETON COMPONENT
// ═══════════════════════════════════════════════════════════════════
function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-deep-ink text-washi">
      {/* Back button placeholder */}
      <div className="px-6 md:px-12 pt-8 pb-4">
        <div className="w-24 h-5 bg-[#1A1A1A] animate-skeleton-pulse" />
      </div>

      {/* Header */}
      <div className="px-6 md:px-12 pb-8 space-y-4">
        <div className="flex gap-3">
          <div className="w-20 h-6 bg-[#1A1A1A] animate-skeleton-pulse" />
          <div className="w-24 h-6 bg-[#1A1A1A] animate-skeleton-pulse" />
        </div>
        <div className="w-3/4 h-12 bg-[#1A1A1A] animate-skeleton-pulse" />
        <div className="w-full max-w-xl h-5 bg-[#1A1A1A] animate-skeleton-pulse" />
      </div>

      {/* Cover image placeholder */}
      <div className="w-full aspect-video bg-[#1A1A1A] animate-skeleton-pulse mb-8" />

      {/* Meta row */}
      <div className="px-6 md:px-12 flex gap-3 flex-wrap mb-10">
        {[90, 70, 80, 60].map((w, i) => (
          <div key={i} className={`w-${w === 90 ? '24' : w === 70 ? '20' : '28'} h-7 bg-[#1A1A1A] animate-skeleton-pulse`} />
        ))}
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-3">
          {[100, 90, 95, 70, 85, 100, 60].map((w, i) => (
            <div
              key={i}
              className="h-4 bg-[#1A1A1A] animate-skeleton-pulse"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div className="md:col-span-2 space-y-3">
          <div className="w-32 h-5 bg-[#1A1A1A] animate-skeleton-pulse mb-4" />
          {[85, 70, 90, 65].map((w, i) => (
            <div key={i} className="h-4 bg-[#1A1A1A] animate-skeleton-pulse" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ERROR / 404 COMPONENT
// ═══════════════════════════════════════════════════════════════════
function ProjectError({ type, onRetry }: { type: "not-found" | "network"; onRetry?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deep-ink text-washi flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Error code — manga style */}
        <div className="font-mono text-xs text-wez-cyan tracking-[0.2em] mb-4">
          // SYSTEM_ERROR
        </div>
        <h1 className="font-display text-6xl font-black text-enrage mb-2"
            style={{ textShadow: "4px 4px 0 #0A0A0A" }}>
          {type === "not-found" ? "404" : "ERR"}
        </h1>
        <h2 className="font-title text-xl text-washi mb-4">
          {type === "not-found"
            ? "PROJECT NOT FOUND"
            : "CONNECTION FAILED"}
        </h2>
        <p className="font-sans text-stone text-base mb-8 leading-relaxed">
          {type === "not-found"
            ? "This project doesn't exist in the database, or it hasn't been published yet."
            : "Could not reach the Notion API. Check your connection and try again."}
        </p>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate("/#projects")}
            className="font-title text-sm tracking-wider bg-wez-cyan text-deep-ink px-5 py-2.5 font-semibold hover:bg-washi transition-colors shadow-manga focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
          >
            ← BACK TO PROJECTS
          </button>
          {type === "network" && onRetry && (
            <button
              onClick={onRetry}
              className="font-title text-sm tracking-wider border border-wez-cyan text-wez-cyan px-5 py-2.5 font-semibold hover:bg-wez-cyan hover:text-deep-ink transition-colors shadow-manga focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
            >
              RETRY
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// YOUTUBE EMBED
// ═══════════════════════════════════════════════════════════════════
function YouTubeEmbed({ url }: { url: string }) {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
  if (!videoId) return null;

  return (
    <div className="mt-6">
      <div className="font-mono text-xs text-wez-cyan tracking-widest mb-3 uppercase">
        // Demo Video
      </div>
      <div className="relative w-full aspect-video bg-[#1A1A1A] shadow-manga-lg overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="Project demo video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════
export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();

  const [project,  setProject]  = useState<ProjectDetail | null>(null);
  const [allCards, setAllCards] = useState<ProjectCard[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<"not-found" | "network" | null>(null);

  // ── Scroll to top on page mount ──────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // ── Fetch project detail ─────────────────────────────────────────
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
      const listData   = await listRes.json();

      if (!detailData.project) {
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

  // ── Dynamic SEO & Metadata (Title & Meta Description) ───────────────
  useEffect(() => {
    if (!project) return;
    document.title = `${project.name} · CUNG-MASTER`;

    // Dynamic meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    const originalDesc = metaDesc.getAttribute('content') || 'Wezaemon the Tombguard — Cyber-Undead Samurai Portfolio.';
    metaDesc.setAttribute('content', project.description);

    return () => {
      document.title = 'CUNG-MASTER · Cyber Samurai Portfolio';
      metaDesc?.setAttribute('content', originalDesc);
    };
  }, [project]);

  // ── Next / Prev navigation ───────────────────────────────────────
  const currentIdx = allCards.findIndex((c) => c.slug === slug);
  const prevProject = currentIdx > 0 ? allCards[currentIdx - 1] : null;
  const nextProject = currentIdx >= 0 && currentIdx < allCards.length - 1
    ? allCards[currentIdx + 1]
    : null;

  // ── Render states ────────────────────────────────────────────────
  if (loading) return <ProjectDetailSkeleton />;
  if (error)   return <ProjectError type={error} onRetry={fetchProject} />;
  if (!project) return <ProjectError type="not-found" />;

  const catColor = CATEGORY_COLOR[project.category] ?? "#888888";
  const statusColor = STATUS_COLOR[project.status] ?? "#888888";

  return (
    // Page transition wrapper
    <div className="min-h-screen bg-deep-ink text-washi animate-fade-in-up">

      {/* ── STICKY BACK BUTTON ───────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-deep-ink/90 backdrop-blur-sm border-b border-[#1A1A1A]">
        <div className="container max-w-5xl px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => { navigate("/"); setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 100); }}
            className="font-mono text-sm text-stone hover:text-wez-cyan transition-colors flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
            aria-label="Back to projects"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>BACK</span>
          </button>
          <div className="font-mono text-xs text-stone tracking-widest">
            {project.category.toUpperCase()}
          </div>
        </div>
      </div>

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <header className="container max-w-5xl px-6 pt-10 pb-8">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            className="font-mono text-xs px-3 py-1 font-medium tracking-wider shadow-manga-sm"
            style={{ background: catColor, color: "#0A0A0A" }}
          >
            {project.category.toUpperCase()}
          </span>
          <span
            className="font-mono text-xs px-3 py-1 font-medium tracking-wider border shadow-manga-sm"
            style={{ borderColor: statusColor, color: statusColor }}
          >
            {project.status.toUpperCase()}
          </span>
          {project.timeline && (
            <span className="font-mono text-xs text-stone tracking-wider">
              // {project.timeline}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="font-display font-black text-4xl md:text-5xl text-washi leading-tight mb-4"
          style={{ textShadow: "4px 4px 0 #0A0A0A" }}
        >
          {project.name}
        </h1>

        {/* Description */}
        <p className="font-sans text-lg text-stone leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </header>

      {/* ── COVER IMAGE ──────────────────────────────────────────── */}
      {project.coverImage && (
        <div
          className="w-full aspect-video relative overflow-hidden shadow-manga-xl mb-10"
          style={{ borderTop: `3px solid ${catColor}`, borderBottom: "3px solid #0A0A0A" }}
        >
          <img
            src={project.coverImage}
            alt={`${project.name} cover`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-ink/70 via-transparent to-transparent" />
        </div>
      )}

      {/* ── META ROW ─────────────────────────────────────────────── */}
      <div className="container max-w-5xl px-6 mb-10">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Tech stack tags */}
          {project.techStack.map((tech) => (
            <span key={tech} className="tag-mono">
              {tech}
            </span>
          ))}

          {/* Divider */}
          {(project.githubLink || project.demoLink) && (
            <span className="text-stone font-mono text-xs mx-1">|</span>
          )}

          {/* Links */}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-wez-cyan hover:text-washi transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
            >
              <span aria-hidden="true">⬡</span>
              <span>GitHub</span>
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-status-active hover:text-washi transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
            >
              <span aria-hidden="true">↗</span>
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* ── CONTENT (2-col on desktop) ────────────────────────────── */}
      <main className="container max-w-5xl px-6 pb-16">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">

          {/* LEFT — Long description (60%) */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs text-wez-cyan tracking-widest mb-4">
              // PROJECT_OVERVIEW
            </div>
            <div
              className="font-sans text-base text-[#CCCCCC] leading-relaxed space-y-4 [&_strong]:text-washi [&_strong]:font-semibold [&_code]:font-mono [&_code]:text-wez-cyan [&_code]:text-sm [&_code]:bg-[#1A1A1A] [&_code]:px-1.5 [&_code]:py-0.5 [&_a]:text-wez-cyan [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-none [&_ul]:space-y-2 [&_li]:before:content-['▸'] [&_li]:before:text-wez-cyan [&_li]:before:mr-2"
              dangerouslySetInnerHTML={{ __html: project.longDescription }}
            />
          </div>

          {/* RIGHT — Highlights, Tags, YouTube (40%) */}
          <div className="md:col-span-2 space-y-8">

            {/* Highlights */}
            {project.highlights && (
              <div>
                <div className="font-mono text-xs text-wez-cyan tracking-widest mb-4">
                  // HIGHLIGHTS
                </div>
                <div
                  className="font-sans text-base text-[#CCCCCC] leading-relaxed [&_strong]:text-washi [&_strong]:font-semibold [&_ul]:list-none [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['→'] [&_li]:before:text-wez-cyan [&_li]:before:font-mono [&_li]:before:text-sm [&_li]:before:mt-0.5 [&_li]:before:flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: project.highlights }}
                />
              </div>
            )}

            {/* Tags */}
            {project.tags.length > 0 && (
              <div>
                <div className="font-mono text-xs text-wez-cyan tracking-widest mb-3">
                  // TAGS
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-stone border border-[#2A2A2A] px-2.5 py-1 hover:border-wez-cyan hover:text-wez-cyan transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube embed */}
            {project.youtubeEmbed && (
              <YouTubeEmbed url={project.youtubeEmbed} />
            )}
          </div>
        </div>
      </main>

      {/* ── PREV / NEXT NAVIGATION ───────────────────────────────── */}
      {(prevProject || nextProject) && (
        <nav
          className="border-t border-[#1A1A1A] mt-8"
          aria-label="Project navigation"
        >
          <div className="container max-w-5xl px-6 py-8 grid grid-cols-2 gap-4">
            {/* Prev */}
            <div>
              {prevProject && (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  className="group flex flex-col gap-1 hover:text-wez-cyan transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
                >
                  <span className="font-mono text-xs text-stone group-hover:text-wez-cyan tracking-wider">
                    ← PREV
                  </span>
                  <span className="font-title text-sm font-semibold text-washi group-hover:text-wez-cyan leading-tight">
                    {prevProject.name}
                  </span>
                </Link>
              )}
            </div>

            {/* Next */}
            <div className="text-right">
              {nextProject && (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group flex flex-col gap-1 items-end hover:text-wez-cyan transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
                >
                  <span className="font-mono text-xs text-stone group-hover:text-wez-cyan tracking-wider">
                    NEXT →
                  </span>
                  <span className="font-title text-sm font-semibold text-washi group-hover:text-wez-cyan leading-tight">
                    {nextProject.name}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

    </div>
  );
}
