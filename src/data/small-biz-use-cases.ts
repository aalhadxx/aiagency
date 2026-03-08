/**
 * Top 15 AI use cases for SMALL BUSINESSES (0-50 employees)
 * Based on March 2026 research: what SMBs actually buy and can afford
 */

export type SmallBizUseCase = {
  id: string;
  name: string;
  shortDesc: string;
  price: string;
  evidence: string;
  category: "communication" | "marketing" | "support" | "productivity" | "automation";
};

export const SMALL_BIZ_USE_CASES: SmallBizUseCase[] = [
  {
    id: "email-templates",
    name: "Email templates & marketing copy",
    shortDesc: "AI writes your emails, replies, templates. Saves hours every week.",
    price: "$0-$20/mo",
    evidence: "Most common SMB use case. ChatGPT, Claude. Reddit: 'saves me hours every week'",
    category: "communication",
  },
  {
    id: "meeting-transcription",
    name: "Meeting transcription & summaries",
    shortDesc: "AI records meetings, writes summaries, extracts action items.",
    price: "$10-$20/mo",
    evidence: "Fireflies $10/mo, Otter $8-$17/mo. Auto-generates notes.",
    category: "productivity",
  },
  {
    id: "chatbot-support",
    name: "24/7 AI chatbot",
    shortDesc: "Handles 80% of customer questions. Always available. Instant responses.",
    price: "$59-$299/mo",
    evidence: "Garnium $59, ChatFlow $59, ConvoCore $99-$299. 80% inquiries automated.",
    category: "support",
  },
  {
    id: "content-creation",
    name: "Content creation (blogs, social)",
    shortDesc: "AI writes blogs, social posts, landing pages. 70% faster.",
    price: "$0-$50/mo",
    evidence: "Jasper, ChatGPT, Humanic AI $20-$50. Reddit: '70% faster content'",
    category: "marketing",
  },
  {
    id: "lead-capture",
    name: "Lead capture & qualification",
    shortDesc: "AI engages website visitors 24/7. Qualifies leads instantly.",
    price: "$15-$99/mo",
    evidence: "ConvoCore, Customerly. 95% of visitors leave without converting.",
    category: "support",
  },
  {
    id: "social-scheduling",
    name: "Social media scheduling",
    shortDesc: "AI plans and posts to all your social accounts. Automated.",
    price: "$6-$19/mo",
    evidence: "Buffer $6, Orbator $19, Canva Pro $15 for design.",
    category: "marketing",
  },
  {
    id: "competitor-research",
    name: "Competitor research & monitoring",
    shortDesc: "AI tracks competitors' prices, content, product changes.",
    price: "Varies",
    evidence: "Competely, Prodfinity on Product Hunt. Perplexity for research.",
    category: "productivity",
  },
  {
    id: "data-analysis",
    name: "Spreadsheet & data analysis",
    shortDesc: "AI analyzes your data, finds trends, answers questions.",
    price: "$0-$20/mo",
    evidence: "ChatGPT. Reddit: 'data scientist in your pocket'",
    category: "productivity",
  },
  {
    id: "appointment-booking",
    name: "Appointment booking automation",
    shortDesc: "AI schedules meetings, sends reminders. No back-and-forth.",
    price: "Often bundled",
    evidence: "35-40% more appointments booked.",
    category: "automation",
  },
  {
    id: "website-branding",
    name: "Website + branding (one-time)",
    shortDesc: "AI builds your website, logo, branding. Done in hours.",
    price: "$100 one-time",
    evidence: "AutomatWithAI: site, logo, branding, marketing content.",
    category: "marketing",
  },
  {
    id: "crm-email",
    name: "CRM + AI email marketing",
    shortDesc: "AI manages contacts, sends personalized emails, tracks leads.",
    price: "$29-$69/mo",
    evidence: "Nimble $45, NukeSend $49, Humanic $20-$100.",
    category: "marketing",
  },
  {
    id: "workflow-automation",
    name: "No-code workflow automation",
    shortDesc: "Connect your tools. Automate repetitive tasks. No coding.",
    price: "$16-$29/mo",
    evidence: "Zapier, Make.com $16. Connects forms, email, CRM.",
    category: "automation",
  },
  {
    id: "video-image-gen",
    name: "Video & image generation",
    shortDesc: "AI creates images, videos, graphics for your marketing.",
    price: "$0-$20/mo",
    evidence: "Leonardo AI, Luma Dream Machine. FAQ → video tutorials.",
    category: "marketing",
  },
  {
    id: "openclaw",
    name: "OpenClaw security (for dev teams)",
    shortDesc: "Secure AI coding assistant. For small dev teams under 10.",
    price: "$2K-$5K",
    evidence: "Secure deployment, compliance. Only for teams with developers.",
    category: "productivity",
  },
  {
    id: "all-in-one",
    name: "All-in-one AI platform",
    shortDesc: "Multiple AI models in one place. ChatGPT, Claude, Gemini.",
    price: "$6-$20/mo",
    evidence: "SoloGenius $5.99, ChadGPT $9.97. Multiple models, one subscription.",
    category: "productivity",
  },
];

export const SMALL_BIZ_CATEGORIES = {
  communication: "Communication & Email",
  marketing: "Marketing & Content",
  support: "Customer Support",
  productivity: "Productivity & Analysis",
  automation: "Automation & Workflows",
} as const;
