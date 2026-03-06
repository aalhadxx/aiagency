"use client";

import { Shield, Lock, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrustBadgeVariant =
  | "soc2"
  | "gdpr"
  | "hipaa"
  | "iso27001"
  | "ssl"
  | "pen-tested"
  | "custom";

interface TrustBadgeProps {
  variant: TrustBadgeVariant;
  label?: string;
  className?: string;
}

const badgeConfig: Record<
  TrustBadgeVariant,
  { icon: typeof Shield; label: string; title: string }
> = {
  soc2: {
    icon: Shield,
    label: "SOC 2",
    title: "SOC 2 Type II Compliant",
  },
  gdpr: {
    icon: Lock,
    label: "GDPR",
    title: "GDPR Compliant",
  },
  hipaa: {
    icon: Shield,
    label: "HIPAA",
    title: "HIPAA Ready",
  },
  iso27001: {
    icon: Award,
    label: "ISO 27001",
    title: "ISO 27001 Certified",
  },
  ssl: {
    icon: Lock,
    label: "SSL Secured",
    title: "256-bit SSL Encryption",
  },
  "pen-tested": {
    icon: CheckCircle2,
    label: "Pen Tested",
    title: "Third-Party Penetration Tested",
  },
  custom: {
    icon: Shield,
    label: "Secure",
    title: "Enterprise Security",
  },
};

export function TrustBadge({
  variant,
  label: customLabel,
  className,
}: TrustBadgeProps) {
  const config = badgeConfig[variant];
  const Icon = config.icon;
  const label = customLabel ?? config.label;

  return (
    <div
      className={cn(
        "glass-base inline-flex items-center gap-2 px-4 py-2.5 rounded-lg",
        "bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-slate-600/50",
        "text-sm font-medium text-foreground/90",
        "hover:bg-white/10 dark:hover:bg-slate-800/30 transition-colors",
        className
      )}
      title={config.title}
    >
      <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

interface TrustBadgeGridProps {
  badges?: TrustBadgeVariant[];
  className?: string;
}

const defaultBadges: TrustBadgeVariant[] = [
  "soc2",
  "gdpr",
  "iso27001",
  "ssl",
  "pen-tested",
];

export function TrustBadgeGrid({
  badges = defaultBadges,
  className,
}: TrustBadgeGridProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-3 justify-center md:justify-start",
        className
      )}
    >
      {badges.map((variant) => (
        <TrustBadge key={variant} variant={variant} />
      ))}
    </div>
  );
}
