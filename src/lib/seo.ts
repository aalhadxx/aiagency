/**
 * SEO configuration and utilities
 */

export const SITE_CONFIG = {
  name: "AI Agency",
  description:
    "Enterprise-grade OpenClaw deployment and autonomous AI agents. Secure, compliant, production-ready in 7 days.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  defaultOgImage: "/og-default.png",
  twitterHandle: "@aiagency",
} as const;

export function getBaseUrl(): string {
  return SITE_CONFIG.url;
}

export function getCanonicalUrl(path: string): string {
  const base = getBaseUrl().replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
