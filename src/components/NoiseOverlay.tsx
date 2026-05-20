export const NoiseOverlay = () => (
  <div
    className="noise-overlay fixed inset-0 pointer-events-none z-[9999]"
    style={{
      backgroundImage:
        "repeating-radial-gradient(circle at 18% 22%, rgba(255,255,255,0.055) 0 1px, transparent 1px 7px), repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 9px)",
      backgroundSize: "180px 180px, 220px 220px",
      opacity: 0.08,
      mixBlendMode: "soft-light",
      contain: "strict",
      transform: "translateZ(0)",
    }}
  />
);
