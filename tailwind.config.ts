import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        /* Theme-aware glass typography */
        "th-sans": ["var(--th-font-sans)"],
        "th-mono": ["var(--th-font-mono)"],
      },
      colors: {
        /* Theme-aware glass design system colors (th-*) */
        th: {
          background: "var(--th-background)",
          foreground: "var(--th-foreground)",
          primary: "var(--th-primary)",
          "primary-foreground": "var(--th-primary-foreground)",
          secondary: "var(--th-secondary)",
          "secondary-foreground": "var(--th-secondary-foreground)",
          muted: "var(--th-muted)",
          "muted-foreground": "var(--th-muted-foreground)",
          accent: "var(--th-accent)",
          "accent-foreground": "var(--th-accent-foreground)",
          border: "var(--th-border)",
          "border-strong": "var(--th-border-strong)",
          "glass-bg": "var(--th-glass-bg)",
          "glass-bg-strong": "var(--th-glass-bg-strong)",
          "glass-border": "var(--th-glass-border)",
          "glass-shadow": "var(--th-glass-shadow)",
        },
        oc: {
          bg: "#0a0a0b",
          surface: "#141416",
          cream: "#f5f0e8",
          "cream-muted": "#c9c4bc",
          cyan: "#00ffcc",
          "cyan-dim": "#00d4aa",
          amber: "#f5a623",
          coral: "#ff6b6b",
        },
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
        slate: {
          1: "rgb(var(--slate-1) / <alpha-value>)",
          2: "rgb(var(--slate-2) / <alpha-value>)",
          3: "rgb(var(--slate-3) / <alpha-value>)",
          4: "rgb(var(--slate-4) / <alpha-value>)",
          5: "rgb(var(--slate-5) / <alpha-value>)",
          6: "rgb(var(--slate-6) / <alpha-value>)",
          7: "rgb(var(--slate-7) / <alpha-value>)",
          8: "rgb(var(--slate-8) / <alpha-value>)",
          9: "rgb(var(--slate-9) / <alpha-value>)",
          10: "rgb(var(--slate-10) / <alpha-value>)",
          11: "rgb(var(--slate-11) / <alpha-value>)",
          12: "rgb(var(--slate-12) / <alpha-value>)",
        },
        gray: {
          1: "rgb(var(--gray-1) / <alpha-value>)",
          2: "rgb(var(--gray-2) / <alpha-value>)",
          3: "rgb(var(--gray-3) / <alpha-value>)",
          4: "rgb(var(--gray-4) / <alpha-value>)",
          5: "rgb(var(--gray-5) / <alpha-value>)",
          6: "rgb(var(--gray-6) / <alpha-value>)",
          7: "rgb(var(--gray-7) / <alpha-value>)",
          8: "rgb(var(--gray-8) / <alpha-value>)",
          9: "rgb(var(--gray-9) / <alpha-value>)",
          10: "rgb(var(--gray-10) / <alpha-value>)",
          11: "rgb(var(--gray-11) / <alpha-value>)",
          12: "rgb(var(--gray-12) / <alpha-value>)",
        },
        white: "#ffffff",
        black: "#000000",
        cyber: {
          bg: "#0a0a0c",
          "bg-elevated": "#12121a",
          cyan: "#00ffff",
          green: "#00ff88",
          red: "#ff0044",
          border: "rgba(0, 255, 255, 0.15)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        glass: "250ms",
      },
      keyframes: {
        "glass-fade-in": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "glass-fade-in": "glass-fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
    fontSize: {
      "2xs": [
        "11px",
        {
          lineHeight: "1.3",
          letterSpacing: "-0.3px",
          fontWeight: "300",
        },
      ],
      xs: [
        "0.75rem",
        {
          lineHeight: "1rem",
          letterSpacing: "-0.36px",
          fontWeight: "300",
        },
      ],
      sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.42px" }],
      base: ["1rem", { lineHeight: "1.6", letterSpacing: "-0.48px" }],
      lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.72px" }],
      xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.8px" }],
      "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-1.12px" }],
      "3xl": ["1.75rem", { lineHeight: "2.25rem", letterSpacing: "-1.2px" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-1.44px" }],
      "5xl": ["3rem", { letterSpacing: "-1.6px" }],
      "6xl": ["3.75rem", { letterSpacing: "-1.8px" }],
      "7xl": ["4.5rem", { letterSpacing: "-2px" }],
      "8xl": ["6rem", { letterSpacing: "-2.4px" }],
      "9xl": ["8rem", { letterSpacing: "-3.2px" }],
    },
    letterSpacing: {
      tighter: "-0.58px",
      tight: "-0.48px",
    },
    typography: {
      DEFAULT: {
        css: {
          p: {
            letterSpacing: "-0.48px",
          },
          code: {
            letterSpacing: "normal",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
