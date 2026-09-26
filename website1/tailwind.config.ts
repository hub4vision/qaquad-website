import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        // Design-system tokens. See src/app/globals.css for the CSS custom
        // properties these reference — change the brand palette in one place.
        ink: {
          950: "#0a0e17",
          900: "#0f1420",
          800: "#161d2e",
          700: "#212a3f",
          600: "#334059",
          500: "#4c5972",
          400: "#71809b",
          300: "#a3aec2",
          200: "#cbd3e0",
          100: "#e6eaf2",
          50: "#f5f7fb",
        },
        brand: {
          950: "#031b2e",
          900: "#053253",
          800: "#074877",
          700: "#0a5f9e",
          600: "#0f7bc7",
          500: "#2296e6",
          400: "#5db4ee",
          300: "#96d0f4",
          200: "#c4e6f9",
          100: "#e3f3fc",
          50: "#f2fafd",
        },
        signal: {
          pass: "#1a9e6f",
          partial: "#c98a14",
          fail: "#d5443a",
          info: "#2296e6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(10, 14, 23, 0.04), 0 8px 24px -8px rgba(10, 14, 23, 0.10)",
        "card-hover": "0 4px 8px 0 rgba(10, 14, 23, 0.06), 0 16px 32px -12px rgba(10, 14, 23, 0.16)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
