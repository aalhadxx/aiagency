"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type StatCardProps = {
  value: string;
  label: string;
  delay?: number;
  suffix?: string;
  prefix?: string;
};

function parseValue(value: string): { numeric: number; suffix: string } | null {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (match) {
    return { numeric: parseFloat(match[1]), suffix: match[2].trim() || "" };
  }
  return null;
}

function AnimatedNumber({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);
  const parsed = parseValue(value);

  useEffect(() => {
    if (!isInView || !parsed) return;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(parsed.numeric * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const id = setTimeout(() => requestAnimationFrame(animate), delay * 100);
    return () => clearTimeout(id);
  }, [isInView, parsed, delay]);

  if (!parsed) return <span ref={ref}>{value}</span>;

  const formatted =
    parsed.numeric % 1 === 0
      ? Math.round(displayValue).toString()
      : displayValue.toFixed(1);

  return (
    <span ref={ref}>
      {formatted}
      {parsed.suffix ? ` ${parsed.suffix}` : ""}
    </span>
  );
}

export function StatCard({
  value,
  label,
  delay = 0,
  prefix = "",
  suffix = "",
}: StatCardProps) {
  const parsed = parseValue(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="text-center"
    >
      <div className="font-display text-4xl md:text-5xl font-bold text-oc-cyan">
        {prefix}
        {parsed ? (
          <AnimatedNumber value={value} delay={delay} />
        ) : (
          value
        )}
        {suffix}
      </div>
      <div className="text-sm text-oc-cream-muted mt-1 uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}
