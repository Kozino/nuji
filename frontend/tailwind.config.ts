import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: "#F7F3E9",
        ink: "#181C19",
        forest: {
          DEFAULT: "#0E6B49",
          dark: "#0A4E36",
          light: "#DCEDE3",
        },
        gold: {
          DEFAULT: "#D9A62E",
          dark: "#B8841C",
          light: "#FBEFCF",
        },
        clay: {
          DEFAULT: "#B8562F",
          dark: "#93411F",
          light: "#F4E1D4",
        },
        line: "#E4DCC8",
      },
      fontFamily: {
        zilla: ["var(--font-zilla)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(24,28,25,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
export default config;
