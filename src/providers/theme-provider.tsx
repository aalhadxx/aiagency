"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const THEMES = ["glassmorphism", "cyberpunk", "minimal", "dark-premium"] as const;

export type Theme = (typeof THEMES)[number];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="glassmorphism"
      themes={[...THEMES]}
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="aiagency-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
