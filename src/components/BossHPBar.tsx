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
        height: 36,
        background: "#050505",
        borderBottom: `2px solid ${critical ? "#FF003C" : "#1a1a2e"}`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 16px",
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
      }}
    >
      {/* Boss Name */}
      <span className="font-display text-[9px] tracking-[0.3em] text-crimson shrink-0 hidden sm:inline">
        ⚔ WEZAEMON
      </span>

      {/* Threat Level Flash */}
      {critical && (
        <span
          className="font-mono-ui text-[9px] tracking-widest"
          style={{ color: "#FF003C", animation: "blink 0.4s step-end infinite" }}
        >
          !! CRITICAL
        </span>
      )}

      {/* HP Label */}
      <span className="font-mono-ui text-[9px] text-dim hidden sm:inline">HP</span>

      {/* HP Bar */}
      <div
        className="flex-1 h-[6px] relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${critical ? "rgba(255,0,60,0.5)" : "rgba(0,245,255,0.2)"}`,
          clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
        }}
      >
        <div
          style={{
            width: `${hp}%`,
            height: "100%",
            background: critical
              ? "linear-gradient(90deg, #FF003C, #8B0000)"
              : "linear-gradient(90deg, #00F5FF, #0088aa)",
            boxShadow: critical
              ? "0 0 12px #FF003C"
              : "0 0 8px rgba(0,245,255,0.5)",
            transition: "width 0.15s linear",
          }}
        />
      </div>

      {/* HP Percentage */}
      <span
        className="font-mono-ui text-[10px] tabular-nums shrink-0"
        style={{ color: critical ? "#FF003C" : "#00F5FF" }}
      >
        {Math.round(hp)}%
      </span>
    </div>
  );
};
