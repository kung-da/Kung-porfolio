import { useEffect, useRef, useState } from "react";
import { CircuitBoard, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "ENCOUNTER", id: "home" },
  { label: "INTEL", id: "about" },
  { label: "MOVESET", id: "skills" },
  { label: "ARCHIVES", id: "projects" },
  { label: "RECORD", id: "experience" },
  { label: "DUEL", id: "contact" },
];

export const Navigation = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const observedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 12);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const ratios = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });

        // Header visibility: hide while the Hero section is in the center region.
        setOnHero((ratios.get("home") ?? 0) > 0);

        let bestId: string | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId && bestRatio > 0) setActive(bestId);
      },
      {
        // Track the section that crosses the viewport center.
        // Keep the root area non-zero (top+bottom < 100%).
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    const observeTargets = () => {
      LINKS.forEach((l) => {
        if (observedIdsRef.current.has(l.id)) return;
        const el = document.getElementById(l.id);
        if (!el) return;
        obs.observe(el);
        observedIdsRef.current.add(l.id);
        ratios.set(l.id, 0);
      });
    };

    observeTargets();

    // Sections are lazy-loaded; observe them once they hit the DOM.
    let moRaf = 0;
    const mo = new MutationObserver(() => {
      window.cancelAnimationFrame(moRaf);
      moRaf = window.requestAnimationFrame(() => {
        observeTargets();
        if (observedIdsRef.current.size === LINKS.length) {
          mo.disconnect();
        }
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(raf);
      window.cancelAnimationFrame(moRaf);
      mo.disconnect();
      obs.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);

    const headerEl = document.getElementById("site-header");
    const headerOffset = (headerEl?.offsetHeight ?? 64) + 36 + 12;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setOpen(false);
  };

  return (
    <>
      <header
        id="site-header"
        className={cn(
          "fixed left-0 right-0 top-9 z-[85]",
          "border-b transition-[background-color,border-color,box-shadow,backdrop-filter,opacity,visibility] duration-300 ease-out",
          "after:pointer-events-none after:absolute after:inset-x-6 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-wez-cyan/50 after:to-transparent after:transition-opacity after:duration-300",
          onHero
            ? "opacity-0 invisible pointer-events-none"
            : isScrolled
              ? [
                  "opacity-100 visible bg-background/60 backdrop-blur-xl border-border/60 after:opacity-100",
                  "shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06),0_10px_30px_rgba(0,0,0,0.35)]",
                ]
              : "opacity-100 visible bg-transparent backdrop-blur-sm border-transparent after:opacity-0"
        )}
      >
        <div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 md:h-16 md:px-6">
          {/* Logo */}
          <div className="flex items-center justify-start">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
              className={cn(
                "group inline-flex items-center gap-3 py-2",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "ring-offset-background"
              )}
              aria-label="Go to top"
            >
              <span
                className={cn(
                  "relative grid size-9 place-items-center",
                  "border border-border/60 bg-background/30 backdrop-blur-md",
                  "transition-colors",
                  isScrolled && "border-wez-cyan/30"
                )}
              >
                <CircuitBoard className="size-4 text-wez-cyan" aria-hidden="true" />
                <span className="pointer-events-none absolute inset-0 shadow-cyan-glow-sm opacity-0 transition-opacity group-hover:opacity-100" />
              </span>

              <span className="flex flex-col leading-none">
                <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-foreground uppercase md:text-[12px]">
                  Data Wanderer
                </span>
                <span className="font-jp text-[10px] tracking-[0.18em] text-muted-foreground">
                  データ
                </span>
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center justify-center md:flex"
            aria-label="Primary"
          >
            <div className="flex items-center gap-1">
              {LINKS.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(l.id);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative px-4 py-2",
                      "font-display text-[11px] uppercase tracking-[0.22em]",
                      "text-muted-foreground transition-all duration-200",
                      "hover:text-wez-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "ring-offset-background",
                      isActive && "text-wez-cyan drop-shadow-[0_0_8px_rgba(143,239,255,0.4)]"
                    )}
                  >
                    <span className="transition-colors">
                      {l.label}
                    </span>
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-4 -bottom-0.5 h-px",
                        "bg-gradient-to-r from-transparent via-wez-cyan/80 to-transparent",
                        "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                        isActive && "opacity-100"
                      )}
                    />
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center justify-end md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "border-border/70 bg-background/30 backdrop-blur-xl",
                    "hover:bg-background/50",
                    "transition-colors",
                    isScrolled && "border-wez-cyan/30"
                  )}
                  aria-label={open ? "Close menu" : "Open menu"}
                >
                  <AnimatePresence initial={false} mode="wait">
                    {open ? (
                      <motion.span
                        key="close"
                        initial={{ opacity: 0, rotate: -90, scale: 0.9 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.9 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <X className="size-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="menu"
                        initial={{ opacity: 0, rotate: 90, scale: 0.9 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.9 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <Menu className="size-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={cn(
                  "border-border/60 bg-background/70 backdrop-blur-xl",
                  "pt-12",
                  "shadow-[inset_1px_0_0_hsl(var(--border)/0.6),-20px_0_60px_rgba(0,0,0,0.45)]"
                )}
              >
                <SheetHeader className="space-y-1">
                  <SheetTitle className="font-display text-base tracking-[0.18em] uppercase">
                    Navigation
                  </SheetTitle>
                  <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
                    // data_wanderer
                  </p>
                </SheetHeader>

                <div className="mt-6 flex flex-col">
                  {LINKS.map((l) => {
                    const isActive = active === l.id;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => scrollTo(l.id)}
                        className={cn(
                          "w-full px-4 py-3 text-left",
                          "font-display text-sm uppercase tracking-[0.22em]",
                          "transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          "ring-offset-background",
                          isActive
                            ? "border-l-2 border-wez-cyan bg-wez-cyan/10 text-wez-cyan"
                            : "border-l-2 border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        )}
                      >
                        {l.label}
                      </button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};
