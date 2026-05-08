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
      fontFamily: {
        sans: ["Share Tech Mono", "monospace"],
        mono: ["Share Tech Mono", "monospace"],
        display: ["Orbitron", "sans-serif"],
        jp: ["Noto Serif JP", "serif"],
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
        washi: "#FAFAF8",
        "deep-ink": "#0A0A0A",
        stone: "#888888",
        "wez-cyan": "#8FEFFF",
        "sakura-l": "#F6D7E3",
        "sakura-d": "#E8A5C0",
        crimson: "#6A1B1B",
        enrage: "#C0392B",
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      boxShadow: {
        "manga-sm": "2px 2px 0 #0A0A0A",
        manga: "4px 4px 0 #0A0A0A",
        "manga-lg": "6px 6px 0 #0A0A0A",
        "manga-xl": "8px 8px 0 #0A0A0A",
        "cyan-glow": "0 0 20px rgba(143, 239, 255, 0.4)",
        "cyan-glow-sm": "0 0 10px rgba(143, 239, 255, 0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glitch-ink": {
          "0%,100%": { textShadow: "none", transform: "none" },
          "20%": { textShadow: "3px 0 #8FEFFF, -3px 0 #6A1B1B" },
          "40%": { clipPath: "inset(20% 0 60% 0)", transform: "translateX(4px)" },
          "60%": { clipPath: "inset(60% 0 20% 0)", transform: "translateX(-4px)" },
          "80%": { clipPath: "none", transform: "none" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "float-up": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "screen-shake": {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "20%": { transform: "translate(-4px, 2px) rotate(-0.5deg)" },
          "40%": { transform: "translate(4px, -2px) rotate(0.5deg)" },
          "60%": { transform: "translate(-3px, -3px) rotate(-0.3deg)" },
          "80%": { transform: "translate(3px, 2px) rotate(0.3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        glitch: "glitch-ink 0.4s ease-in-out",
        blink: "blink 1s step-end infinite",
        "float-up": "float-up 2s ease-in-out infinite",
        shake: "screen-shake 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
