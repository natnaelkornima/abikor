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
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
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
