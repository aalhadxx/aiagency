"use client";

import dynamic from "next/dynamic";

export const LazyParallaxSection = dynamic(
  () => import("@/components/parallax-section").then((mod) => mod.ParallaxSection),
  {
    ssr: true,
    loading: () => <div className="animate-pulse" />,
  }
);
