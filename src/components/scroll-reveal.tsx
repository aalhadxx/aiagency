"use client";

import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  amount?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  
  const offsets = { up: 48, down: -48, left: 48, right: -48 };
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const value = offsets[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, [axis]: value }}
      animate={isInView ? { opacity: 1, [axis]: 0 } : { opacity: 0, [axis]: value }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
