import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/Logo.png";

const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const MOBILE_SCROLL_OFFSET = 88;
const SCROLL_UNLOCK_MS = 850;

export const Header = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const isScrollingRef = useRef(false);
  const scrollUnlockTimerRef = useRef(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateVisibility = () => {
      animationFrame = 0;
      const hero = document.getElementById("home");
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      const nextValue = window.scrollY > heroBottom - 120;
      setIsPastHero((current) => (current === nextValue ? current : nextValue));
    };

    const handleScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
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

        let nextSection = "";
        let highestRatio = 0;

        ratios.forEach((ratio, id) => {
          if (ratio > highestRatio) {
            nextSection = id;
            highestRatio = ratio;
          }
        });

        if (nextSection) {
          setActiveSection((current) => (current === nextSection ? current : nextSection));
        }
      },
      { rootMargin: "-22% 0px -28% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!isPastHero) setMobileMenuOpen(false);
  }, [isPastHero]);

  useEffect(() => {
    return () => window.clearTimeout(scrollUnlockTimerRef.current);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    setActiveSection(id === "home" ? "about" : id);
    setMobileMenuOpen(false);
    isScrollingRef.current = true;

    const offset = id === "home" || window.innerWidth >= 768 ? 0 : MOBILE_SCROLL_OFFSET;
    const targetTop = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    window.clearTimeout(scrollUnlockTimerRef.current);
    scrollUnlockTimerRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
    }, SCROLL_UNLOCK_MS);
  }, []);

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <header
      id="site-header"
      className={cn(
        "fixed inset-x-0 top-8 z-[85] px-2 transition-[opacity,transform,visibility] duration-500 ease-out sm:px-3",
        isPastHero
          ? "pointer-events-auto visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-3 opacity-0"
      )}
    >
      <div className="relative mx-auto w-full">
        <div className="pointer-events-none absolute inset-x-[8%] -bottom-px h-px bg-gradient-to-r from-transparent via-red-500/35 to-transparent blur-[0.5px]" />

        <div className="relative rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_16px_48px_rgba(0,0,0,0.42),0_1px_0_rgba(255,255,255,0.04)_inset,0_-10px_35px_rgba(127,29,29,0.035)_inset] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="grid min-h-[62px] grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-2 sm:px-5 lg:px-6">
            <a
              href="#home"
              onClick={(event) => handleAnchorClick(event, "home")}
              className="group flex min-w-0 shrink-0 items-center gap-3 rounded-xl py-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-red-400/50"
              aria-label="Go to homepage"
            >
              <span className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-red-400/20 bg-[#061126] shadow-[0_0_24px_rgba(127,29,29,0.14)] transition-all duration-300 group-hover:border-red-300/35 group-hover:shadow-[0_0_28px_rgba(127,29,29,0.2)]">
                <img
                  src={logo}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-[1.55] object-cover object-[50%_47%]"
                />
                <span className="pointer-events-none absolute inset-0 rounded-[11px] ring-1 ring-inset ring-white/[0.06]" />
              </span>

              <span className="hidden min-w-0 sm:block">
                <span className="block truncate font-title text-sm font-semibold leading-none tracking-[0.12em] text-zinc-100 lg:text-[15px]">
                  HÀ SINH CUNG
                </span>
                <span className="mt-1.5 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-500">
                  <span className="size-1 rounded-full bg-red-400/80" />
                  Data Engineer
                </span>
              </span>
            </a>

            <nav className="hidden w-full max-w-[560px] grid-cols-5 items-center justify-self-center rounded-xl border border-white/[0.065] bg-white/[0.018] p-1 md:grid" aria-label="Primary navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => handleAnchorClick(event, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative flex justify-center rounded-lg px-2 py-2 font-sans text-xs font-medium tracking-[0.035em] outline-none transition-all duration-200",
                      "focus-visible:ring-2 focus-visible:ring-red-400/40",
                      isActive
                        ? "bg-white/[0.055] text-zinc-50 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]"
                        : "text-zinc-400 hover:bg-white/[0.035] hover:text-zinc-100"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-1 h-px rounded-full bg-gradient-to-r from-transparent via-red-400 to-transparent transition-opacity duration-200",
                        isActive
                          ? "opacity-80 shadow-[0_0_8px_rgba(248,113,113,0.42)]"
                          : "opacity-0 group-hover:opacity-35"
                      )}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center justify-self-end gap-2">
              <div className="hidden items-center gap-2 px-2 xl:flex" aria-label="System online">
                <motion.span
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="size-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_7px_rgba(103,232,249,0.45)]"
                />
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-500">
                  Online
                </span>
              </div>

              <a
                href="#contact"
                onClick={(event) => handleAnchorClick(event, "contact")}
                className="hidden items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.065] px-3.5 py-2.5 font-sans text-xs font-medium text-red-100 outline-none transition-all duration-200 hover:border-red-300/35 hover:bg-red-400/[0.1] hover:shadow-[0_0_20px_rgba(127,29,29,0.15)] focus-visible:ring-2 focus-visible:ring-red-400/50 sm:flex"
              >
                Connect
                <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((value) => !value)}
                className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.025] text-zinc-300 outline-none transition-colors hover:border-red-400/25 hover:bg-red-400/[0.055] hover:text-red-100 focus-visible:ring-2 focus-visible:ring-red-400/50 md:hidden"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-navigation"
              initial={{ opacity: 0, y: -8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 p-2 shadow-[0_24px_65px_rgba(0,0,0,0.62)] backdrop-blur-xl md:hidden"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => handleAnchorClick(event, item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative flex items-center justify-between rounded-xl px-4 py-3 font-sans text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-red-400/40",
                      isActive
                        ? "bg-red-400/[0.07] text-zinc-50"
                        : "text-zinc-400 hover:bg-white/[0.035] hover:text-zinc-100"
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        isActive
                          ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.55)]"
                          : "bg-white/10"
                      )}
                    />
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={(event) => handleAnchorClick(event, "contact")}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 font-sans text-sm font-medium text-red-100 outline-none transition-colors hover:bg-red-400/[0.11] focus-visible:ring-2 focus-visible:ring-red-400/50"
              >
                Connect
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export const Navigation = Header;
