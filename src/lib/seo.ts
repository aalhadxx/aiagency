/**
 * SEO configuration and utilities - MAXED for search + AI citations
 */

export const SITE_CONFIG = {
  name: "AI Agency",
  description:
    "We implement AI solutions with proven ROI. Customer service AI ($40M saved), code generation ($2B ARR), voice agents (391% ROI), legal AI (284% ROI), healthcare AI (451% ROI), privacy-first local hosting. We hire the right talent to deliver.",
  longDescription:
    "We implement everything: Customer service AI like Klarna ($40M savings). Code generation like Cursor ($2B ARR). Voice agents (391% ROI, <6 month payback). Legal AI (284% ROI). Healthcare AI (451% ROI). Privacy-first local hosting (52-75% savings vs cloud). RAG ($26M annual savings). We hire AI specialists who've shipped these use cases before. Production-ready in 7 days. First 100 launch partners get 50% off.",
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
