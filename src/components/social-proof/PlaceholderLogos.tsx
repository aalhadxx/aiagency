"use client";

import { cn } from "@/lib/utils";

const logoMap: Record<
  string,
  (props: { className?: string }) => React.ReactElement
> = {
  fintech: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <rect x="0" y="4" width="10" height="24" rx="2" />
      <rect x="16" y="8" width="10" height="16" rx="2" />
      <rect x="32" y="0" width="10" height="32" rx="2" />
      <rect x="48" y="8" width="6" height="16" rx="1" />
      <rect x="58" y="12" width="6" height="8" rx="1" />
    </svg>
  ),
  scaleops: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="40" cy="16" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="64" cy="16" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  dataflow: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <path d="M8 8v16h8l8-8-8-8H8z" fill="currentColor" />
      <rect x="28" y="8" width="8" height="16" fill="currentColor" />
      <path d="M44 8l12 8-12 8V8z" fill="currentColor" />
      <circle cx="68" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  cloudnine: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <path d="M16 20a6 6 0 1 1 0-12 8 8 0 0 1 12 6 6 6 0 0 1 6 6 4 4 0 0 1-4 4H16z" fill="currentColor" />
      <rect x="36" y="12" width="28" height="2" rx="1" fill="currentColor" />
      <rect x="36" y="18" width="24" height="2" rx="1" fill="currentColor" />
      <ellipse cx="72" cy="16" rx="6" ry="4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  securebank: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <path d="M8 8h6v16H8V8zm2 2v12h2V10h-2z" fill="currentColor" />
      <rect x="22" y="10" width="12" height="12" rx="2" fill="currentColor" />
      <path d="M42 12l8 8-8 8 2 2 10-10-10-10-2 2z" fill="currentColor" />
      <rect x="58" y="8" width="18" height="4" rx="1" fill="currentColor" />
      <rect x="58" y="20" width="14" height="4" rx="1" fill="currentColor" />
    </svg>
  ),
  innovatelabs: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <path d="M8 28V4h4l8 16 8-16h4v24h-4V14l-4 8-4-8v14h-4z" fill="currentColor" />
      <circle cx="48" cy="16" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M64 8v16h4V12h8v12h4V8h-16z" fill="currentColor" />
    </svg>
  ),
  techventures: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <path d="M8 28L16 4h4l8 24h-4l-2-6H14l-2 6H8zm6-10h8l-4-12-4 12z" fill="currentColor" />
      <rect x="36" y="8" width="4" height="16" fill="currentColor" />
      <rect x="44" y="8" width="4" height="16" fill="currentColor" />
      <rect x="52" y="8" width="4" height="16" fill="currentColor" />
      <path d="M64 8v16h12v-4H68v-8h8V8H64z" fill="currentColor" />
    </svg>
  ),
  nexus: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="28" y1="8" x2="28" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="36" y1="8" x2="36" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="44" y1="8" x2="44" y2="24" stroke="currentColor" strokeWidth="2" />
      <circle cx="56" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M68 8v16h12v-4h-8v-8h8V8h-12z" fill="currentColor" />
    </svg>
  ),
  quantum: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <path d="M8 16a8 8 0 1 1 16 0 8 8 0 0 1-16 0zm2 0a6 6 0 1 0 12 0 6 6 0 0 0-12 0z" fill="currentColor" />
      <path d="M32 8l8 16h-4l-2-4h-4l-2 4h-4l8-16z" fill="currentColor" />
      <path d="M52 8v16h4V14h6v10h4V8h-14z" fill="currentColor" />
      <circle cx="72" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  vertex: ({ className }) => (
    <svg viewBox="0 0 80 32" className={cn("w-full h-8", className)} fill="currentColor">
      <path d="M8 28V4l12 12L8 28zm4-4l4-4-4-4v8z" fill="currentColor" />
      <circle cx="36" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M52 8v16h4V12h8v12h4V8h-16z" fill="currentColor" />
      <path d="M68 8v16h12v-4h-8v-8h8V8h-12z" fill="currentColor" />
    </svg>
  ),
};

export function PlaceholderLogo({
  logoId,
  className,
}: {
  logoId: string;
  className?: string;
}) {
  const Logo = logoMap[logoId] ?? logoMap.fintech;
  return <Logo className={className} />;
}
