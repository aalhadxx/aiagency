/**
 * SEO configuration and utilities - MAXED for search + AI citations
 */

export const SITE_CONFIG = {
  name: "AI Agency",
  description:
    "We build AI that makes money. Klarna saved $40M. Cursor is at $2B ARR. Voice agents get 391% ROI. We find people who've done it and get them to build yours.",
  longDescription:
    "Klarna saved $40M with customer service AI. Cursor is at $2B ARR with code generation. Voice agents get 391% ROI. Legal AI: 284% ROI. Healthcare AI: 451% ROI. Local hosting saves 52-75% vs cloud. We find people who've built this stuff and get them to build yours. No BS. First 100 clients get 50% off.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  defaultOgImage: "/og-default.png",
  twitterHandle: "@aiagency",
  keywords: [
    "customer service AI",
    "AI code generation",
    "voice AI agents",
    "legal AI",
    "healthcare AI HIPAA",
    "privacy-first AI",
    "local AI deployment",
    "on-premise AI",
    "self-hosted LLM",
    "RAG implementation",
    "enterprise AI",
    "AI compliance",
    "OpenClaw security",
    "AI implementation agency",
    "Klarna AI",
    "Cursor AI",
    "391% ROI voice agents",
    "284% ROI legal AI",
    "451% ROI healthcare AI",
  ],
  category: "Technology",
  locale: "en_US",
} as const;

export function getBaseUrl(): string {
  return SITE_CONFIG.url.replace(/\/$/, "");
}

export function getCanonicalUrl(path: string): string {
  const base = getBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
