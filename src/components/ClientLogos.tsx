"use client";

import { motion } from "framer-motion";

const LOGOS = [
  { name: "FinTech Solutions", width: 120 },
  { name: "ScaleOps", width: 100 },
  { name: "DataFlow Inc", width: 110 },
  { name: "CloudNine", width: 100 },
  { name: "SecureBank", width: 110 },
  { name: "InnovateLabs", width: 115 },
];

export function ClientLogos() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-12 md:gap-16 py-8"
    >
      {LOGOS.map((logo, i) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          style={{ minWidth: logo.width }}
        >
          <span className="text-oc-cream-muted text-sm font-medium tracking-wide">
            {logo.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
