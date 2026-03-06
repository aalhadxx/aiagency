"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string; // e.g. "50+", "3x", "7", "SOC 2"
  suffix?: string; // e.g. " days", " ROI"
  label: string;
  className?: string;
  /** If value is numeric (e.g. "50"), animate from 0. Set to false for non-numeric like "3x", "SOC 2" */
  animate?: boolean;
}

function parseValue(value: string): { numeric: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { numeric: parseInt(match[1], 10), suffix: match[2] };
}

export function StatCard({
  value,
  suffix = "",
  label,
  className,
  animate = true,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState<string>(value);
  const parsed = animate ? parseValue(value) : null;

  useEffect(() => {
    if (!isInView || !parsed) {
      if (!parsed) setDisplayValue(value);
      return;
    }

    const { numeric, suffix: valueSuffix } = parsed;
    const duration = 1500;
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = numeric / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), numeric);
      setDisplayValue(`${current}${valueSuffix}`);
      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, parsed, value]);

  return (
    <div
      ref={ref}
      className={cn(
        "glass-card glass-transition p-6 md:p-8 text-center",
        "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tabular-nums">
        {displayValue}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
