"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  highlighted?: boolean;
}

export function Card({
  children,
  className,
  hover = true,
  highlighted = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "p-6 md:p-8 rounded-xl border bg-oc-surface/50 backdrop-blur-sm transition-all duration-300",
        highlighted
          ? "border-2 border-oc-cyan/30"
          : "border-oc-border",
        hover && "hover:border-oc-cyan/20",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardLinkProps extends CardProps {
  href: string;
}

export function CardLink({
  href,
  children,
  className,
  hover = true,
}: CardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block p-6 md:p-8 rounded-xl border border-oc-border bg-oc-surface/50 backdrop-blur-sm transition-all duration-300 h-full",
        hover && "hover:border-oc-cyan/20 hover:bg-oc-surface/80",
        className
      )}
    >
      {children}
    </Link>
  );
}
