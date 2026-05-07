import { useMemo } from "react";

export const AmbientDots = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: 0.3 + Math.random() * 0.7,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        color: Math.random() > 0.85 ? "#FF1493" : Math.random() > 0.5 ? "#00BFFF" : "#ffffff",
      })),
    []
  );

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div className="absolute inset-0 starfield opacity-60" />
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            background: s.color,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
