"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics (Vercel Analytics captures these automatically)
    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va("track", "web_vital", {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }
    // Log in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vital] ${metric.name}:`, metric.value, metric.rating);
    }
  });
  return null;
}
