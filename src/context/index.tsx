"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({
  children,
  defaultTheme = "system",
  forcedTheme,
}: {
  children: ReactNode;
  defaultTheme?: string;
  forcedTheme?: string | undefined;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      forcedTheme={forcedTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}