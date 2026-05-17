import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      // ─── TASK 1: Font system overhaul ───────────────────────────────────
      // TRƯỚC: font-sans = font-mono = Share Tech Mono (sai — monospace cho prose)
      // SAU:   font-sans = Inter | font-mono = JetBrains Mono | font-title = Rajdhani
      // USAGE:
      //   font-display  → Orbitron       : H1 hero, section decorative labels
      //   font-title    → Rajdhani       : H2, H3, nav links, card titles, buttons
      //   font-sans     → Inter          : body prose, descriptions, bio, paragraphs
      //   font-mono     → JetBrains Mono : tech stack tags, code, data values, badges
      //   font-jp       → Noto Serif JP  : decorative kanji/JP accent text only
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Orbitron", "sans-serif"],
        title: ["Rajdhani", "sans-serif"],
        jp: ["Noto Serif JP", "serif"],
      },

      // ─── TASK 1: Font size scale (base 14→16px) ──────────────────────
      fontSize: {
        xs:   ["12px", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        sm:   ["14px", { lineHeight: "1.5", letterSpacing: "0.015em" }],
        base: ["16px", { lineHeight: "1.6", letterSpacing: "0" }],
        lg:   ["18px", { lineHeight: "1.7", letterSpacing: "0" }],
        xl:   ["20px", { lineHeight: "1.8", letterSpacing: "-0.01em" }],
        "2xl":["24px", { lineHeight: "1.9", letterSpacing: "-0.015em" }],
        "3xl":["32px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "4xl":["40px", { lineHeight: "1",   letterSpacing: "-0.04em" }],
        "5xl":["56px", { lineHeight: "0.95",letterSpacing: "-0.05em" }],
      },

      spacing: {
        gutter: "1.5rem",
        "gutter-lg": "2rem",
        "gutter-xl": "3rem",
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // ─── Cyber Samurai Palette (KHÔNG THAY ĐỔI) ──────────────────
        washi:          "#FAFAF8",
        "deep-ink":     "#0A0A0A",
        // NOTE: stone #888888 trên #0A0A0A = 5.58:1 contrast → ĐÃ PASS WCAG AA
        // Không cần đổi. Đây là correction so với design review ban đầu.
        stone:          "#888888",
        "wez-cyan":     "#8FEFFF",
        "sakura-l":     "#F6D7E3",
        "sakura-d":     "#E8A5C0",
        crimson:        "#6A1B1B",
        enrage:         "#C0392B",
        "status-active":"#00FF88",
        "warn-yellow":  "#FCEE0A",

        // ─── Category colors (dùng cho ProjectCard border + badges) ───
        "cat-pipeline": "#8FEFFF",  // wez-cyan
        "cat-dashboard":"#00FF88",  // status-active
        "cat-analytics":"#FCEE0A",  // warn-yellow
        "cat-other":    "#888888",  // stone
      },

      boxShadow: {
        "manga-sm": "2px 2px 0 #0A0A0A",
        manga:      "4px 4px 0 #0A0A0A",
        "manga-lg": "6px 6px 0 #0A0A0A",
        "manga-xl": "8px 8px 0 #0A0A0A",
        "cyan-glow":    "0 0 20px rgba(143, 239, 255, 0.4)",
        "cyan-glow-sm": "0 0 10px rgba(143, 239, 255, 0.3)",
        "card-hover":   "0 12px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "card-base":    "0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.02)",
      },

      borderRadius: {
        // Manga sharp corners — KHÔNG BAO GIỜ thay đổi
        lg: "0px",
        md: "0px",
        sm: "0px",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glitch-ink": {
          "0%,100%": { textShadow: "none", transform: "none" },
          "20%":     { textShadow: "3px 0 #8FEFFF, -3px 0 #6A1B1B" },
          "40%":     { clipPath: "inset(20% 0 60% 0)", transform: "translateX(4px)" },
          "60%":     { clipPath: "inset(60% 0 20% 0)", transform: "translateX(-4px)" },
          "80%":     { clipPath: "none", transform: "none" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        "float-up": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        "screen-shake": {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "20%":     { transform: "translate(-4px, 2px) rotate(-0.5deg)" },
          "40%":     { transform: "translate(4px, -2px) rotate(0.5deg)" },
          "60%":     { transform: "translate(-3px, -3px) rotate(-0.3deg)" },
          "80%":     { transform: "translate(3px, 2px) rotate(0.3deg)" },
        },
        // ─── Task 6: Page transition animations ───────────────────────
        "page-enter": {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "page-exit": {
          "0%":   { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "skeleton-pulse": {
          "0%,100%": { opacity: "0.4" },
          "50%":     { opacity: "0.7" },
        },
      },

      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-in":         "fade-in 0.5s ease-out",
        "fade-in-up":      "fade-in-up 0.6s ease-out",
        glitch:            "glitch-ink 0.4s ease-in-out",
        blink:             "blink 1s step-end infinite",
        "float-up":        "float-up 2s ease-in-out infinite",
        shake:             "screen-shake 0.5s ease-in-out",
        "page-enter":      "page-enter 0.35s ease-out",
        "page-exit":       "page-exit 0.15s ease-in",
        "skeleton-pulse":  "skeleton-pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
