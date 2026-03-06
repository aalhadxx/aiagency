"use client";

import dynamic from "next/dynamic";

export const LazyScrollReveal = dynamic(
  () => import("@/components/scroll-reveal").then((mod) => mod.ScrollReveal),
  {
    ssr: true,
    loading: () => <div className="animate-pulse" />,
  }
);
