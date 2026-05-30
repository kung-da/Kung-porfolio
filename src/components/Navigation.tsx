import { useEffect, useRef, useState } from "react";
import { CircuitBoard, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "ABOUT ME", id: "about", jp: "自己紹介" },
  { label: "SKILLS", id: "skills", jp: "スキル" },
  { label: "PROJECTS", id: "projects", jp: "プロジェクト" },
  { label: "EXPERIENCE", id: "experience", jp: "経験" },
  { label: "CONTACT", id: "contact", jp: "連絡" },
];

const headerShellStyle = {
  background:
    "linear-gradient(180deg, rgba(10,10,10,0.92) 0%, rgba(5,5,5,0.82) 100%), linear-gradient(90deg, rgba(143,239,255,0.10), rgba(255,255,255,0.035), rgba(143,239,255,0.08))",
  clipPath: "polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 14px), 0% 10px)",
  boxShadow:
    "0 0 0 1px rgba(143,239,255,0.16), 0 0 0 2px rgba(255,255,255,0.025), 0 14px 34px rgba(0,0,0,0.54), inset 0 1px 0 rgba(255,255,255,0.05)",
} satisfies React.CSSProperties;

const cyanPanelStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.025)",
} satisfies React.CSSProperties;

export const Navigation = () => {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    let raf = 0;

    const updateVisibility = () => {
      raf = 0;
      const hero = document.getElementById("home");
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      setIsPastHero(window.scrollY > heroBottom - 120);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = "";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestId = id;
            bestRatio = ratio;
          }
        });

        if (bestId) setActive(bestId);
      },
      { rootMargin: "-22% 0px -28% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!isPastHero) setOpen(false);
  }, [isPastHero]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id === "home" ? "about" : id);
    setOpen(false);
    isScrollingRef.current = true;

    const offset = id === "home" || window.innerWidth >= 768 ? 0 : 48;
    const targetTop = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 850);
  };

  return (
    <header
      id="site-header"
      className={cn(
        "fixed left-0 right-0 top-5 z-[85] px-3 py-2 transition-[opacity,transform,visibility] duration-500 ease-out sm:px-4",
        isPastHero
          ? "pointer-events-auto visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-4 opacity-0"
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-[14%] top-2 h-px bg-gradient-to-r from-transparent via-wez-cyan/70 to-transparent shadow-[0_0_12px_rgba(143,239,255,0.3)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[940px]">
        <div className="relative overflow-visible rounded-[6px]" style={headerShellStyle}>
          <div
            className="pointer-events-none absolute inset-0 rounded-[6px] bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.18)_3px,rgba(0,0,0,0.18)_4px)]"
            aria-hidden="true"
          />
          <span className="pointer-events-none absolute left-[4px] top-[4px] h-2.5 w-2.5 border-l border-t border-wez-cyan/60" />
          <span className="pointer-events-none absolute bottom-[4px] right-[4px] h-2.5 w-2.5 border-b border-r border-wez-cyan/60" />
          <div className="absolute left-1/2 top-1.5 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="h-0.5 w-1.5 bg-wez-cyan/45" />
            ))}
          </div>

          <div className="relative flex min-h-[48px] items-center justify-between gap-2.5 px-3 py-2 sm:px-4">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                scrollTo("home");
              }}
              className="group flex shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Go to top"
            >
              <span
                className="relative grid size-8 shrink-0 place-items-center border border-wez-cyan/45 bg-[#080808] transition-all duration-300 group-hover:border-wez-cyan/80 group-hover:shadow-[0_0_18px_rgba(143,239,255,0.24),inset_0_0_18px_rgba(143,239,255,0.08)]"
                style={{ clipPath: "polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px)" }}
              >
                <CircuitBoard className="size-3.5 text-wez-cyan" strokeWidth={1.5} aria-hidden="true" />
                <span className="absolute left-0.5 top-0.5 h-1.5 w-1.5 border-l border-t border-wez-cyan/70" />
                <span className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 border-b border-r border-wez-cyan/70" />
              </span>

              <span className="hidden sm:block">
                <span className="block font-display text-[11px] font-bold leading-tight tracking-[0.2em] text-[#E0E0E0] transition-colors group-hover:text-wez-cyan">
                  DATA WANDERER
                </span>
                <span className="mt-0.5 block font-jp text-[8px] tracking-[0.16em] text-crimson/75">
                  データ
                </span>
              </span>
            </a>

            <nav className="hidden flex-1 items-center justify-center md:flex" aria-label="Primary">
              <div className="flex items-center rounded-[4px] px-1.5 py-1" style={cyanPanelStyle}>
                {LINKS.map((link, index) => {
                  const isActive = active === link.id;

                  return (
                    <div key={link.id} className="flex items-center">
                      <a
                        href={`#${link.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollTo(link.id);
                        }}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "group relative flex min-h-7 items-center px-2.5 py-1 font-display text-[10px] font-semibold tracking-[0.16em] transition-all duration-200 lg:px-3",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          isActive
                            ? "text-[#E0E0E0] drop-shadow-[0_0_10px_rgba(143,239,255,0.4)]"
                            : "text-stone hover:text-wez-cyan"
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "pointer-events-none absolute bottom-0 left-2 right-2 h-[2px] rounded-full transition-opacity duration-200",
                            isActive
                              ? "bg-gradient-to-r from-transparent via-wez-cyan to-transparent opacity-100 shadow-[0_0_8px_rgba(143,239,255,0.55)]"
                              : "bg-wez-cyan opacity-0 shadow-[0_0_6px_rgba(143,239,255,0.45)] group-hover:opacity-70"
                          )}
                        />
                      </a>
                      {index < LINKS.length - 1 && <span className="mx-0.5 h-4 w-px bg-slate-600/40" aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <div
                className="hidden items-center gap-1.5 border border-status-active/20 bg-[#050806]/80 px-2.5 py-1 shadow-[inset_0_0_12px_rgba(0,255,136,0.04)] sm:flex"
                aria-label="System online"
              >
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="size-1.5 rounded-full bg-status-active shadow-[0_0_6px_#00ff88,0_0_14px_rgba(0,255,136,0.6)]"
                />
                <span className="whitespace-nowrap font-mono text-[9px] font-medium tracking-[0.14em] text-status-active">
                  SYS: ONLINE
                </span>
              </div>

              <div className="hidden flex-col gap-[3px] lg:flex" aria-hidden="true">
                {[14, 10, 14].map((width, index) => (
                  <span key={index} className={cn("h-[3px]", index === 1 ? "bg-white/35" : "bg-wez-cyan/55")} style={{ width }} />
                ))}
              </div>

              <button
                type="button"
                className="border border-wez-cyan/30 p-1.5 text-wez-cyan transition-colors hover:border-wez-cyan/70 hover:text-[#E0E0E0] md:hidden"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-x-[8%] bottom-0 h-px bg-gradient-to-r from-transparent via-wez-cyan/70 to-transparent"
            aria-hidden="true"
          />
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full mt-2 overflow-hidden border border-wez-cyan/15 bg-[#050505]/95 shadow-[0_8px_40px_rgba(143,239,255,0.08),0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl md:hidden"
              style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
              aria-label="Mobile navigation"
            >
              {LINKS.map((link) => {
                const isActive = active === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className={cn(
                      "flex w-full items-center justify-between border-b border-white/[0.06] px-5 py-3 text-left font-display text-[11px] font-semibold tracking-[0.2em] transition-all duration-200 last:border-0",
                      isActive
                        ? "bg-wez-cyan/10 text-[#E0E0E0] drop-shadow-[0_0_10px_rgba(143,239,255,0.42)]"
                        : "text-stone hover:bg-white/5 hover:text-wez-cyan"
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="font-jp text-[9px] text-crimson/60">{link.jp}</span>
                  </button>
                );
              })}

              <div className="flex items-center gap-2 border-t border-wez-cyan/10 px-5 py-3">
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="size-2 rounded-full bg-status-active shadow-[0_0_6px_#00ff88,0_0_14px_rgba(0,255,136,0.6)]"
                />
                <span className="font-mono text-[10px] tracking-[0.15em] text-status-active">SYS: ONLINE</span>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
