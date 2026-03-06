"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEMES = [
  { id: "glassmorphism", label: "Glass", icon: "◇" },
  { id: "cyberpunk", label: "Cyber", icon: "◆" },
  { id: "minimal", label: "Minimal", icon: "○" },
  { id: "dark-premium", label: "Premium", icon: "✦" },
] as const;

function useViewTransition() {
  return (callback: () => void) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => Promise<void> }).startViewTransition(callback);
    } else {
      callback();
    }
  };
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const startViewTransition = useViewTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-lg bg-black/10 p-1">
        <div className="h-8 w-16 animate-pulse rounded-md bg-black/20" />
      </div>
    );
  }

  return (
    <div
      className="theme-switcher flex items-center gap-0.5 rounded-lg p-1"
      style={{
        backgroundColor: "var(--theme-surface)",
        border: "1px solid var(--theme-border)",
      }}
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => {
            startViewTransition(() => {
              setTheme(t.id);
            });
          }}
          className={`flex items-center justify-center rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200
            ${theme === t.id ? "bg-[var(--theme-accent)] text-[var(--theme-cta-text)]" : "text-[var(--theme-text-muted)] hover:bg-[var(--theme-surface-solid)] hover:text-[var(--theme-text)]"}`}
          title={`Switch to ${t.label} theme`}
        >
          <span className="hidden sm:inline">{t.label}</span>
          <span className="sm:hidden">{t.icon}</span>
        </button>
      ))}
    </div>
  );
}
