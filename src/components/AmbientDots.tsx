import { useMemo } from "react";

export const AmbientDots = () => {
  const dots = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: 0.15 + Math.random() * 0.1,
        delay: Math.random() * 20,
        duration: 18 + Math.random() * 22,
      })),
    []
  );

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-up"
          style={{
            width: 4,
            height: 4,
            left: `${d.left}%`,
            top: `${d.top}%`,
            background: "#00d4aa",
            opacity: d.opacity,
            ["--dot-opacity" as any]: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
