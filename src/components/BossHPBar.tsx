import { useScrollProgress } from "@/hooks/useScrollProgress";

export const BossHPBar = () => {
  const progress = useScrollProgress();
  const hp = Math.max(0, 100 - progress * 100);
  const critical = hp < 20;

  return (
    <div
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 90,
        height: 40,
        background: "#0A0A0A",
        borderBottom: "2px solid #0A0A0A",
        boxShadow: "0 2px 0 #8FEFFF",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 16px",
        color: "#FAFAF8",
      }}
    >
      <span className="font-display text-[10px] tracking-[0.25em] text-cyan-accent shrink-0">
        ⚔ WEZAEMON · TOMBGUARD
      </span>
      {critical && (
        <span className="font-mono-ui text-[10px] animate-blink" style={{ color: "#C0392B" }}>
          CRITICAL
        </span>
      )}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="font-mono-ui text-[10px] hidden sm:inline" style={{ opacity: 0.7 }}>
          HP
        </span>
        <div
          className="flex-1 h-2 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(143,239,255,0.3)" }}
        >
          <div
            className={critical ? "animate-blink" : ""}
            style={{
              width: `${hp}%`,
              height: "100%",
              background: critical ? "#C0392B" : "var(--wez-cyan)",
              boxShadow: critical
                ? "0 0 10px #C0392B"
                : "0 0 10px rgba(143,239,255,0.6)",
              transition: "width 0.15s linear",
            }}
          />
        </div>
        <span className="font-mono-ui text-[10px] tabular-nums shrink-0" style={{ color: "#8FEFFF" }}>
          {Math.round(hp)}%
        </span>
      </div>
    </div>
  );
};
