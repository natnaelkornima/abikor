import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--k-bg)",
        foreground: "var(--k-text)",
        card: {
          DEFAULT: "var(--k-card)",
          foreground: "var(--k-text)",
        },
        primary: {
          DEFAULT: "#ededed",
          foreground: "#151515",
        },
        secondary: {
          DEFAULT: "var(--k-chip)",
          foreground: "var(--k-text-2)",
        },
        muted: {
          DEFAULT: "var(--k-chip)",
          foreground: "var(--k-muted)",
        },
        accent: {
          DEFAULT: "var(--k-accent)",
          foreground: "#000000",
        },
        border: "var(--k-line)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Geist Sans", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        serif: ["var(--font-geist-serif)", "Geist Serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        "serif-regular": ["var(--font-geist-serif-regular)", "Geist Serif Regular", "Geist Serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        "serif-square": ["var(--font-geist-serif-square)", "Geist Serif Square", "Geist Serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        "serif-triangle": ["var(--font-geist-serif-triangle)", "Geist Serif Triangle", "Geist Serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        "serif-heart": ["var(--font-geist-serif-heart)", "Geist Serif Heart", "Geist Serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      borderRadius: {
        lg: "var(--k-radius)",
        md: "calc(var(--k-radius) - 1px)",
        sm: "calc(var(--k-radius) - 2px)",
      },
    },
  },
};

export default config;
