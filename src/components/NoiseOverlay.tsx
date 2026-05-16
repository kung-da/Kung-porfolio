// Lightweight noise overlay — uses CSS-only approach instead of SVG filter
// The SVG filter has been replaced with a static noise texture for better GPU performance
export const NoiseOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-[9999]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
      opacity: 0.12,
      mixBlendMode: "overlay",
      contain: "strict",
    }}
  />
);
