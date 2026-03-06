"use client";

import dynamic from "next/dynamic";

export const LazyMeshGradient = dynamic(
  () => import("@/components/mesh-gradient").then((mod) => mod.MeshGradientComponent),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-oc-cyan/5 via-oc-bg to-oc-amber/5 animate-pulse" />
    ),
  }
);
