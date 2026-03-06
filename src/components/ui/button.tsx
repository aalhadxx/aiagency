"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const variants = {
  primary:
    "bg-oc-cyan text-oc-bg font-semibold hover:bg-oc-cyan-dim border border-oc-cyan/30",
  secondary:
    "border border-oc-border text-oc-cream font-medium hover:border-oc-cyan/50 hover:text-oc-cyan",
  ghost:
    "text-oc-cream font-medium hover:bg-oc-surface",
  outline:
    "border-2 border-oc-cream/20 text-oc-cream font-medium hover:border-oc-cyan/50 hover:text-oc-cyan",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-lg",
  lg: "px-8 py-4 text-base rounded-xl",
  xl: "px-10 py-5 text-lg rounded-xl",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-oc-cyan/30 focus:ring-offset-2 focus:ring-offset-oc-bg disabled:opacity-50 disabled:cursor-not-allowed";

    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} type="button" {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
