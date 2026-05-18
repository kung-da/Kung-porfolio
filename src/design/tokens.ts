// ─────────────────────────────────────────────────────────────────────────────
// WEZAEMON DESIGN SYSTEM — TOKENS
// Single source of truth for all design values
// ─────────────────────────────────────────────────────────────────────────────

export const COLORS = {
  black:      "#050508",
  void:       "#0a0a0f",
  crimson:    "#D63A4A",
  blood:      "#A82836",
  ember:      "#EF5A63",
  cyan:       "#00e5ff",
  cyanDim:    "#00b8cc",
  cyanGhost:  "rgba(0, 229, 255, 0.06)",
  gold:       "#c9a84c",
  ash:        "#1a1a2e",
  fog:        "rgba(0, 0, 0, 0.7)",
} as const;

export const DURATION = {
  instant:  100,
  fast:     200,
  normal:   300,
  slow:     500,
  cinematic: 800,
  dramatic: 1200,
} as const;

export const EASING = {
  snap:    [0.16, 1, 0.3, 1]   as const,
  ease:    [0.4, 0, 0.2, 1]    as const,
  spring:  { type: "spring" as const, stiffness: 400, damping: 18 },
  slam:    { type: "spring" as const, stiffness: 600, damping: 12 },
  gentle:  { type: "spring" as const, stiffness: 200, damping: 20 },
} as const;

export const SECTIONS = [
  { id: "home", label: "Home", mission: "Home", num: "00" },
  { id: "about", label: "About me", mission: "About me", num: "01" },
  { id: "skills", label: "Skills", mission: "Skills", num: "02" },
  { id: "projects", label: "Projects", mission: "Projects", num: "03" },
  { id: "experience", label: "Experience", mission: "Experience", num: "04" },
  { id: "contact", label: "Contact", mission: "Contact", num: "05" },
] as const;

export type SectionId = typeof SECTIONS[number]["id"];
