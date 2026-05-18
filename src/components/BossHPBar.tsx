import { memo } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export const BossHPBar = memo(() => {
  const progress = useScrollProgress();
  const hp = Math.max(0, 100 - progress * 100);
  const critical = hp < 20;

  return (
    <div
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 90,
        height: 28,
        background: "#050505",
        borderBottom: `2px solid ${critical ? "#D63A4A" : "#1a1a2e"}`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 14px",
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
      }}
    >
      {/* Boss Name */}
      <span className="font-display text-[8px] tracking-[0.28em] text-crimson shrink-0 hidden sm:inline">
        ⚔ WEZAEMON
      </span>

      {/* Threat Level Flash */}
      {critical && (
        <span
          className="font-mono-ui text-[8px] tracking-widest"
          style={{ color: "#D63A4A", animation: "blink 0.4s step-end infinite" }}
        >
          !! CRITICAL
        </span>
      )}

      {/* HP Label */}
      <span className="font-mono-ui text-[8px] text-dim hidden sm:inline">HP</span>

      {/* HP Bar */}
      <div
        className="flex-1 h-[5px] relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${critical ? "rgba(214,58,74,0.5)" : "rgba(0,245,255,0.2)"}`,
          clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
        }}
      >
        <div
          style={{
            width: `${hp}%`,
            height: "100%",
            background: critical
              ? "linear-gradient(90deg, #D63A4A, #5A1118)"
              : "linear-gradient(90deg, #00F5FF, #0088aa)",
            boxShadow: critical
              ? "0 0 12px #D63A4A"
              : "0 0 8px rgba(0,245,255,0.5)",
            transition: "width 0.15s linear",
            willChange: "width",
          }}
        />
      </div>

      {/* HP Percentage */}
      <span
        className="font-mono-ui text-[9px] tabular-nums shrink-0"
        style={{ color: critical ? "#D63A4A" : "#00F5FF" }}
      >
        {Math.round(hp)}%
      </span>
    </div>
  );
});

BossHPBar.displayName = "BossHPBar";
