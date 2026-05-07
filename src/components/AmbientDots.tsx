import { useMemo } from "react";

/**
 * Cinematic ambient layer: faint stars + drifting volumetric fog.
 * Calm, atmospheric, never noisy.
 */
export const AmbientDots = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.4 + 0.4,
        opacity: 0.15 + Math.random() * 0.5,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 5,
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 20,
        duration: 18 + Math.random() * 18,
      })),
    []
  );

  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Volumetric fog */}
      <div className="absolute inset-0 fog-layer animate-fog-drift" />
      <div className="absolute inset-0 scanline opacity-60" />

      {/* Distant stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            background: "#ffffff",
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Floating cyan motes */}
      {particles.map((p, i) => (
        <div
          key={`p${i}`}
          className="absolute rounded-full animate-float-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: -10,
            background: "hsl(192 100% 70%)",
            boxShadow: "0 0 8px hsl(192 100% 70% / 0.7)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
