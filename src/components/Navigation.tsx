import { useEffect, useState, useRef } from "react";
import { CircuitBoard } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "ABOUT ME", id: "about" },
  { label: "SKILLS", id: "skills" },
  { label: "PROJECTS", id: "projects" },
  { label: "EXPERIENCE", id: "experience" },
  { label: "CONTACT", id: "contact" },
];

export const Navigation = () => {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [glowTrigger, setGlowTrigger] = useState(false);

  const logoRef = useRef<HTMLAnchorElement>(null);
  const isScrollingRef = useRef(false);
  const scrollStateRef = useRef({ isScrolled: false, onHero: true });

  // ── Pulse glow on active page changes ──────────────────────────────────
  useEffect(() => {
    if (active && active !== "home" && !onHero) {
      setGlowTrigger(true);
      const timer = setTimeout(() => setGlowTrigger(false), 900);
      return () => clearTimeout(timer);
    }
  }, [active, onHero]);

  // ── Glitch effect on Logo ───────────────────────────────────────────────
  const triggerGlitch = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.add("animate-glitch");
    setTimeout(() => el.classList.remove("animate-glitch"), 400);
  };

  // ── Scroll + section detection ──────────────────────────────────────────
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const nextScrolled = window.scrollY > 12;
        const nextOnHero = window.scrollY < 300;

        if (scrollStateRef.current.isScrolled !== nextScrolled) {
          scrollStateRef.current.isScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }
        if (scrollStateRef.current.onHero !== nextOnHero) {
          scrollStateRef.current.onHero = nextOnHero;
          setOnHero(nextOnHero);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const ratios = new Map<string, number>();
    const allIds = LINKS.map((l) => l.id);

    const obs = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach((e) => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });

        let bestId: string | null = null;
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        });
        if (bestId && bestRatio > 0) {
          setActive(bestId);
        }
      },
      { rootMargin: "-20% 0px -20% 0px" }
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);
    isScrollingRef.current = true;

    const offset = 86; // fixed HP bar + compact nav
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    setOpen(false);

    // Re-enable observer updates after smooth scroll completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 850);
  };

  // Animation variants for Mobile drawer
  const drawerVariants = {
    hidden: { x: "100%", transition: { type: "tween", duration: 0.25, ease: "easeIn" } },
    visible: { x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.2, ease: "easeIn" } },
  };

  const drawerLinkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.3, ease: "easeOut" }
    })
  };

  return (
    <>
      <header
        id="site-header"
        className={cn(
          "fixed left-0 right-0 top-7 z-[85]",
          "border-b transition-[background-color,border-color,box-shadow,backdrop-filter,opacity,visibility] duration-300 ease-out",
          // Cyan bottom border line
          "after:pointer-events-none after:absolute after:inset-x-6 after:bottom-0 after:h-px after:transition-all after:duration-500",
          onHero
            ? "opacity-0 invisible pointer-events-none"
            : isScrolled
              ? [
                  "opacity-100 visible bg-background/70 backdrop-blur-xl border-border/40",
                  "shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06),0_10px_30px_rgba(0,0,0,0.45),0_1px_6px_rgba(0,245,255,0.08)]",
                  glowTrigger
                    ? "after:opacity-100 after:bg-wez-cyan after:shadow-[0_0_12px_rgba(0,245,255,0.7),0_0_3px_rgba(0,245,255,0.4)] after:scale-y-[1.5]"
                    : "after:opacity-100 after:bg-wez-cyan/35 after:shadow-[0_0_3px_rgba(0,245,255,0.15)] after:scale-y-[1]",
                ]
              : [
                  "opacity-100 visible bg-transparent backdrop-blur-sm border-transparent",
                  "after:opacity-30 after:bg-gradient-to-r after:from-transparent after:via-wez-cyan/30 after:to-transparent after:scale-y-[1]"
                ]
        )}
      >
        <div className="mx-auto grid h-11 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 md:h-12 md:px-6">
          {/* ── LEFT: Logo ─── */}
          <div className="flex items-center justify-start">
            <a
              ref={logoRef}
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
              onMouseEnter={() => triggerGlitch(logoRef.current)}
              className={cn(
                "group inline-flex items-center gap-2 py-1",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "ring-offset-background"
              )}
              aria-label="Go to top"
            >
              <span
                className={cn(
                  "relative grid size-7 place-items-center",
                  "border border-border/60 bg-background/30 backdrop-blur-md",
                  "transition-colors",
                  isScrolled && "border-wez-cyan/30 shadow-[0_0_4px_rgba(0,245,255,0.1)]"
                )}
              >
                <CircuitBoard className="size-3.5 text-wez-cyan" aria-hidden="true" />
                <span className="pointer-events-none absolute inset-0 shadow-cyan-glow-sm opacity-0 transition-opacity group-hover:opacity-100" />
              </span>

              <span className="flex flex-col leading-none">
                <span className="font-display text-[10px] font-semibold tracking-[0.2em] text-foreground uppercase md:text-[11px] group-hover:text-wez-cyan transition-colors">
                  Data Wanderer
                </span>
                <span className="font-jp text-[9px] tracking-[0.16em] text-muted-foreground group-hover:text-wez-cyan/80 transition-colors">
                  データ
                </span>
              </span>
            </a>
          </div>

          {/* ── CENTER: Nav Links ─── */}
          <nav className="hidden items-center justify-center md:flex" aria-label="Primary">
            <div className="flex items-center gap-1">
              {LINKS.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative px-3 py-1.5",
                      "font-display text-[11px] tracking-[0.12em]",
                      "text-muted-foreground transition-all duration-200",
                      "hover:text-wez-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "ring-offset-background",
                      isActive && "text-wez-cyan drop-shadow-[0_0_6px_rgba(0,245,255,0.35)]"
                    )}
                  >
                    <span className="transition-colors">{l.label}</span>
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] transition-all duration-300",
                        "opacity-0 group-hover:opacity-100 group-hover:bg-wez-cyan/40 group-hover:shadow-[0_0_4px_rgba(0,245,255,0.2)]",
                        isActive && "opacity-100 bg-wez-cyan shadow-[0_0_6px_rgba(0,245,255,0.4)]"
                      )}
                    />
                  </a>
                );
              })}
            </div>
          </nav>

          {/* ── RIGHT: Status + Mobile toggle ─── */}
          <div className="flex items-center justify-end gap-3">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:block"
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#00FF88", boxShadow: "0 0 6px rgba(0,255,136,0.4)" }}
            />
            <span
              className="hidden sm:inline font-mono text-[8px] tracking-[0.18em] uppercase"
              style={{ color: "#00FF88", textShadow: "0 0 4px rgba(0,255,136,0.25)" }}
            >
              SYS: ONLINE
            </span>

            {/* Mobile toggle — HUD symbol */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "md:hidden border border-border/70 bg-background/30 backdrop-blur-xl",
                "hover:bg-background/50 transition-colors px-2.5 py-1.5",
                isScrolled && "border-wez-cyan/30"
              )}
            >
              <span className="font-mono text-sm text-wez-cyan">{open ? "✕" : "⊕"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 88, background: "rgba(5,5,8,0.7)", backdropFilter: "blur(4px)" }}
            />

            <motion.nav
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 bottom-0 z-[89] w-[280px] border-l border-border/60 bg-background/70 backdrop-blur-xl pt-12"
              style={{ boxShadow: "inset 1px 0 0 hsl(var(--border) / 0.6), -20px 0 60px rgba(0,0,0,0.45)" }}
            >
              <div className="space-y-1 px-6 pb-6">
                <div className="font-display text-base tracking-[0.18em] uppercase">Navigation</div>
                <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground">Portfolio sections</p>
              </div>

              <div className="mt-6 flex flex-col">
                {LINKS.map((l, i) => {
                  const isActive = active === l.id;
                  return (
                    <motion.button
                      key={l.id}
                      custom={i}
                      variants={drawerLinkVariants}
                      initial="hidden"
                      animate="visible"
                      type="button"
                      onClick={() => scrollTo(l.id)}
                      className={cn(
                        "w-full px-4 py-3 text-left",
                        "font-display text-sm tracking-[0.12em]",
                        "transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive
                          ? "border-l-2 border-wez-cyan bg-wez-cyan/10 text-wez-cyan"
                          : "border-l-2 border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      {l.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
