// Custom cursor: small crimson crosshair + lagging cyan ring
import { useCursorGlow } from "@/hooks/useCursorGlow";

export const CustomCursor = () => {
  useCursorGlow();

  return (
    <>
      {/* Inner dot / crosshair — REMOVED CROSSHAIR AS REQUESTED */}
      <div
        id="custom-cursor"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />

      {/* Outer lagging ring */}
      <div
        id="custom-cursor-ring"
        aria-hidden="true"
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "1px solid #00e5ff",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
      />

      <style>{`
        #custom-cursor-ring.cursor-hover {
          width: 40px !important;
          height: 40px !important;
          border-color: #D63A4A !important;
          margin-top: -8px;
          margin-left: -8px;
          box-shadow: 0 0 10px rgba(214, 58, 74, 0.36);
        }
        @media (pointer: coarse) {
          #custom-cursor, #custom-cursor-ring { display: none !important; }
        }
      `}</style>
    </>
  );
};
