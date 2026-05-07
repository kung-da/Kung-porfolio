import { useMemo, useEffect, useRef } from "react";

/**
 * Realistic sakura petal — five-lobe cherry blossom petal silhouette.
 * Soft pink gradient with subtle translucency and visible curves.
 */
const PetalSVG = ({ size = 24, opacity = 0.8 }: { size?: number; opacity?: number }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    style={{ opacity, display: "block" }}
  >
    <defs>
      <radialGradient id="sakuraGrad" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#ffe8f1" />
        <stop offset="55%" stopColor="#ffb6cf" />
        <stop offset="100%" stopColor="#e87aa6" />
      </radialGradient>
      <linearGradient id="sakuraVein" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#c25b86" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* Petal body — classic sakura petal with notched tip and tapered base */}
    <path
      d="M32 4
         C 22 14, 18 26, 22 38
         C 24 46, 28 52, 32 58
         C 36 52, 40 46, 42 38
         C 46 26, 42 14, 32 4 Z"
      fill="url(#sakuraGrad)"
      stroke="#d96a98"
      strokeOpacity="0.35"
      strokeWidth="0.6"
    />
    {/* Notched tip (signature sakura V-cut) */}
    <path
      d="M32 4 L 30 10 L 32 8 L 34 10 Z"
      fill="#050505"
      fillOpacity="0.25"
    />
    {/* Center vein highlight */}
    <path
      d="M32 8 Q 31 30 32 56"
      stroke="url(#sakuraVein)"
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
);

interface PetalState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  size: number;
  opacity: number;
  swayPhase: number;
  swayAmp: number;
  depth: number; // 0..1, far..near
}

const COUNT = 28;

export const SakuraPetals = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef<PetalState[]>([]);
  const rafRef = useRef<number>();

  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }).map(() => ({
        size: 14 + Math.random() * 22,
        opacity: 0.45 + Math.random() * 0.45,
        depth: Math.random(),
      })),
    []
  );

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    stateRef.current = seeds.map((s) => ({
      x: Math.random() * w,
      y: Math.random() * h - h, // start above viewport for natural entry
      vx: (Math.random() - 0.5) * 0.3,
      vy: 0.3 + Math.random() * 0.7 + s.depth * 0.6,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 0.6,
      size: s.size,
      opacity: s.opacity,
      swayPhase: Math.random() * Math.PI * 2,
      swayAmp: 0.4 + Math.random() * 0.8,
      depth: s.depth,
    }));

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const ww = window.innerWidth;
      const hh = window.innerHeight;
      const t = now / 1000;

      stateRef.current.forEach((p, i) => {
        // Gentle sinusoidal sway (wind)
        const sway = Math.sin(t * 0.6 + p.swayPhase) * p.swayAmp;
        p.x += (p.vx + sway * 0.05) * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        p.rot += p.vrot * dt * 0.06;

        // Wrap
        if (p.y > hh + 40) {
          p.y = -40;
          p.x = Math.random() * ww;
        }
        if (p.x > ww + 40) p.x = -40;
        if (p.x < -40) p.x = ww + 40;

        const el = petalRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg) scale(${0.6 + p.depth * 0.6})`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [seeds]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
    >
      {seeds.map((s, i) => (
        <div
          key={i}
          ref={(el) => (petalRefs.current[i] = el)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            willChange: "transform",
            filter: `blur(${(1 - s.depth) * 1.2}px) drop-shadow(0 0 6px rgba(255,180,210,0.25))`,
          }}
        >
          <PetalSVG size={s.size} opacity={s.opacity} />
        </div>
      ))}
    </div>
  );
};
