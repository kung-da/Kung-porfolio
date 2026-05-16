// Interstitial divider between sections — film-cut feel
interface SectionDividerProps {
  num: string;
  label: string;
}

export const SectionDivider = ({ num, label }: SectionDividerProps) => (
  <div
    className="relative flex items-center justify-center py-0"
    style={{ height: 60 }}
    aria-hidden="true"
  >
    {/* Fading crimson line */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        height: 1,
        background:
          "linear-gradient(to right, transparent 0%, #8b0000 30%, #8b0000 70%, transparent 100%)",
        opacity: 0.35,
      }}
    />
    {/* Section ID tag */}
    <span
      style={{
        position: "relative",
        background: "#060610",
        padding: "0 16px",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.25em",
        color: "rgba(139, 0, 0, 0.5)",
        textTransform: "uppercase",
      }}
    >
      // {num} — {label}
    </span>
  </div>
);
