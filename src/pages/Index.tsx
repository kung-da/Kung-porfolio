import { useCallback, useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BossHPBar } from "@/components/BossHPBar";
import { Navigation } from "@/components/Navigation";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { useEnragedMode } from "@/hooks/useEnragedMode";

// Lazy load sections below the fold for faster initial load
const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const AbilitySection = lazy(() => import("@/components/sections/AbilitySection").then(m => ({ default: m.AbilitySection })));
const RaidArchives = lazy(() => import("@/components/sections/RaidArchives").then(m => ({ default: m.RaidArchives })));
const LegacySection = lazy(() => import("@/components/sections/LegacySection").then(m => ({ default: m.LegacySection })));
const ContactTerminal = lazy(() => import("@/components/sections/ContactTerminal").then(m => ({ default: m.ContactTerminal })));

const SNAP_SECTION_IDS = ["home", "about", "skills", "projects", "experience", "contact", "footer"];
const SNAP_LOCK_MS = 720;
const SNAP_WHEEL_THRESHOLD = 18;

// Fallback component for lazy sections
const SectionFallback = () => (
  <div className="relative w-full min-h-screen bg-[#050505]" aria-busy="true" />
);

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionFallback />}>{children}</Suspense>
);

const getSnapSections = () =>
  SNAP_SECTION_IDS.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));

const getCurrentSnapIndex = (sections: HTMLElement[]) => {
  const anchor = window.scrollY + window.innerHeight * 0.45;
  let current = 0;

  sections.forEach((section, index) => {
    const top = section.getBoundingClientRect().top + window.scrollY;
    if (top <= anchor) current = index;
  });

  return current;
};

const canScrollInDirection = (element: HTMLElement, direction: number) => {
  const canScrollDown = element.scrollTop + element.clientHeight < element.scrollHeight - 1;
  const canScrollUp = element.scrollTop > 1;
  return (direction > 0 && canScrollDown) || (direction < 0 && canScrollUp);
};

const shouldLetNativeScrollHandle = (event: WheelEvent, direction: number) => {
  const targetElement = event.target instanceof Element
    ? event.target
    : event.target instanceof Node
      ? event.target.parentElement
      : null;
  const nativeScrollRegion = targetElement?.closest("[data-native-scroll]");

  if (nativeScrollRegion instanceof HTMLElement && canScrollInDirection(nativeScrollRegion, direction)) {
    return true;
  }

  let node = event.target as Node | null;

  while (node && node !== document.body) {
    if (node instanceof HTMLElement) {
      const style = window.getComputedStyle(node);
      const canScrollY =
        /(auto|scroll|overlay)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1;

      if (canScrollY) {
        if (canScrollInDirection(node, direction)) return true;
      }
    }

    node = node.parentNode;
  }

  return false;
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(
    typeof window !== "undefined" && !sessionStorage.getItem("booted")
  );
  useEnragedMode();
  const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    if (!isLoading) sessionStorage.setItem("booted", "true");
  }, [isLoading]);

  useEffect(() => {
    let wheelTimer = 0;
    const root = document.documentElement;

    const enableWheelMode = () => {
      root.classList.add("is-wheel-scrolling");
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        root.classList.remove("is-wheel-scrolling");
      }, 180);
    };

    window.addEventListener("wheel", enableWheelMode, { passive: true });

    return () => {
      window.clearTimeout(wheelTimer);
      root.classList.remove("is-wheel-scrolling");
      window.removeEventListener("wheel", enableWheelMode);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    let snapLocked = false;
    let unlockTimer = 0;
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("site-page-snap");

    const unlockSnap = () => {
      snapLocked = false;
    };

    const onWheel = (event: WheelEvent) => {
      if (!event.cancelable || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      if (Math.abs(event.deltaY) < SNAP_WHEEL_THRESHOLD || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      if (shouldLetNativeScrollHandle(event, direction)) return;

      const sections = getSnapSections();
      if (sections.length < 2) return;

      const current = getCurrentSnapIndex(sections);
      const next = Math.min(Math.max(current + direction, 0), sections.length - 1);

      if (next === current) return;

      event.preventDefault();

      if (snapLocked) return;
      snapLocked = true;

      const targetTop = sections[next].getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.round(targetTop),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(unlockSnap, prefersReducedMotion ? 120 : SNAP_LOCK_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      root.classList.remove("site-page-snap");
      window.clearTimeout(unlockTimer);
      window.removeEventListener("wheel", onWheel);
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0] overflow-hidden">
      <NoiseOverlay />
      <BossHPBar />
      <Navigation />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main content with optimized entrance animation */}
      {!isLoading && (
        <motion.main
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.53, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
          style={{ paddingTop: 0 }}
        >
          <div className="snap-panel">
            <HeroSection />
          </div>

          <div className="pure-black-sections">
            <div className="snap-panel">
              <LazySection>
                <AboutSection />
              </LazySection>
            </div>

            <div className="snap-panel">
              <LazySection>
                <AbilitySection />
              </LazySection>
            </div>

            <div className="snap-panel">
              <LazySection>
                <RaidArchives />
              </LazySection>
            </div>

            <div className="snap-panel">
              <LazySection>
                <LegacySection />
              </LazySection>
            </div>
          </div>

          <div className="section-continuum">
            <div className="snap-panel">
              <LazySection>
                <ContactTerminal />
              </LazySection>
            </div>
          </div>

          <Footer />
        </motion.main>
      )}
    </div>
  );
};

export default Index;
