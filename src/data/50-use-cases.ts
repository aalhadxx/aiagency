/**
 * 50+ AI use cases for small businesses (0-50 employees)
 * Format: "AI that [does specific thing]" - benefit-focused, not technical
 */

export type AIUseCase = {
  id: string;
  title: string;
  category: "customer" | "marketing" | "operations" | "sales" | "productivity" | "finance" | "hr";
  price: string;
};

export const AI_USE_CASES: AIUseCase[] = [
  // CUSTOMER SUPPORT (12)
  { id: "cs-01", title: "AI that answers your customer emails", category: "customer", price: "$0-$20/mo" },
  { id: "cs-02", title: "AI that handles live chat 24/7", category: "customer", price: "$59-$299/mo" },
  { id: "cs-03", title: "AI that writes support ticket responses", category: "customer", price: "$0-$20/mo" },
  { id: "cs-04", title: "AI that answers phone calls", category: "customer", price: "$99-$299/mo" },
  { id: "cs-05", title: "AI that routes support tickets to the right person", category: "customer", price: "$50-$150/mo" },
  { id: "cs-06", title: "AI that creates help articles from common questions", category: "customer", price: "$0-$20/mo" },
  { id: "cs-07", title: "AI that handles refund requests", category: "customer", price: "$50-$150/mo" },
  { id: "cs-08", title: "AI that follows up with unhappy customers", category: "customer", price: "$29-$99/mo" },
  { id: "cs-09", title: "AI that translates customer messages", category: "customer", price: "$10-$30/mo" },
  { id: "cs-10", title: "AI that books appointments for customers", category: "customer", price: "$15-$50/mo" },
  { id: "cs-11", title: "AI that sends order status updates", category: "customer", price: "$20-$60/mo" },
  { id: "cs-12", title: "AI that handles product returns", category: "customer", price: "$50-$150/mo" },

  // MARKETING & CONTENT (15)
  { id: "mk-01", title: "AI that writes your marketing emails", category: "marketing", price: "$0-$20/mo" },
  { id: "mk-02", title: "AI that creates social media posts", category: "marketing", price: "$0-$50/mo" },
  { id: "mk-03", title: "AI that writes blog posts", category: "marketing", price: "$0-$50/mo" },
  { id: "mk-04", title: "AI that designs your graphics", category: "marketing", price: "$10-$20/mo" },
  { id: "mk-05", title: "AI that writes product descriptions", category: "marketing", price: "$0-$20/mo" },
  { id: "mk-06", title: "AI that creates video content", category: "marketing", price: "$0-$30/mo" },
  { id: "mk-07", title: "AI that writes landing pages", category: "marketing", price: "$0-$20/mo" },
  { id: "mk-08", title: "AI that schedules all your social posts", category: "marketing", price: "$6-$19/mo" },
  { id: "mk-09", title: "AI that writes ad copy", category: "marketing", price: "$0-$20/mo" },
  { id: "mk-10", title: "AI that creates email newsletters", category: "marketing", price: "$20-$60/mo" },
  { id: "mk-11", title: "AI that repurposes content across platforms", category: "marketing", price: "$10-$40/mo" },
  { id: "mk-12", title: "AI that writes SEO-optimized content", category: "marketing", price: "$0-$50/mo" },
  { id: "mk-13", title: "AI that creates Instagram carousels", category: "marketing", price: "$10-$20/mo" },
  { id: "mk-14", title: "AI that writes YouTube video scripts", category: "marketing", price: "$0-$20/mo" },
  { id: "mk-15", title: "AI that designs your website", category: "marketing", price: "$100 one-time" },

  // SALES (10)
  { id: "sl-01", title: "AI that qualifies leads automatically", category: "sales", price: "$29-$99/mo" },
  { id: "sl-02", title: "AI that writes cold emails", category: "sales", price: "$0-$50/mo" },
  { id: "sl-03", title: "AI that follows up with prospects", category: "sales", price: "$29-$99/mo" },
  { id: "sl-04", title: "AI that books sales calls", category: "sales", price: "$15-$50/mo" },
  { id: "sl-05", title: "AI that writes proposals", category: "sales", price: "$0-$20/mo" },
  { id: "sl-06", title: "AI that updates your CRM", category: "sales", price: "$29-$99/mo" },
  { id: "sl-07", title: "AI that researches prospects", category: "sales", price: "$20-$60/mo" },
  { id: "sl-08", title: "AI that writes sales scripts", category: "sales", price: "$0-$20/mo" },
  { id: "sl-09", title: "AI that scores leads by priority", category: "sales", price: "$50-$150/mo" },
  { id: "sl-10", title: "AI that sends contract reminders", category: "sales", price: "$20-$60/mo" },

  // OPERATIONS & PRODUCTIVITY (8)
  { id: "op-01", title: "AI that transcribes your meetings", category: "operations", price: "$10-$20/mo" },
  { id: "op-02", title: "AI that writes meeting summaries", category: "operations", price: "$10-$20/mo" },
  { id: "op-03", title: "AI that analyzes your spreadsheets", category: "operations", price: "$0-$20/mo" },
  { id: "op-04", title: "AI that creates project timelines", category: "operations", price: "$0-$20/mo" },
  { id: "op-05", title: "AI that tracks competitor prices", category: "operations", price: "$30-$100/mo" },
  { id: "op-06", title: "AI that monitors your competitors", category: "operations", price: "$30-$100/mo" },
  { id: "op-07", title: "AI that automates data entry", category: "operations", price: "$16-$29/mo" },
  { id: "op-08", title: "AI that manages your inventory", category: "operations", price: "$50-$200/mo" },

  // PRODUCTIVITY & AUTOMATION (8)
  { id: "pr-01", title: "AI that connects all your tools", category: "productivity", price: "$16-$29/mo" },
  { id: "pr-02", title: "AI that summarizes long documents", category: "productivity", price: "$0-$20/mo" },
  { id: "pr-03", title: "AI that extracts data from PDFs", category: "productivity", price: "$10-$40/mo" },
  { id: "pr-04", title: "AI that writes documentation", category: "productivity", price: "$0-$20/mo" },
  { id: "pr-05", title: "AI that organizes your files", category: "productivity", price: "$10-$30/mo" },
  { id: "pr-06", title: "AI that answers questions from your files", category: "productivity", price: "$20-$60/mo" },
  { id: "pr-07", title: "AI that turns audio into text", category: "productivity", price: "$10-$20/mo" },
  { id: "pr-08", title: "AI that writes code for you", category: "productivity", price: "$20/mo" },

  // FINANCE & ADMIN (5)
  { id: "fn-01", title: "AI that reads invoices automatically", category: "finance", price: "$20-$60/mo" },
  { id: "fn-02", title: "AI that chases late payments", category: "finance", price: "$29-$99/mo" },
  { id: "fn-03", title: "AI that forecasts your cash flow", category: "finance", price: "$50-$200/mo" },
  { id: "fn-04", title: "AI that categorizes expenses", category: "finance", price: "$20-$60/mo" },
  { id: "fn-05", title: "AI that generates financial reports", category: "finance", price: "$50-$150/mo" },

  // HR & TEAM (5)
  { id: "hr-01", title: "AI that screens job applications", category: "hr", price: "$29-$99/mo" },
  { id: "hr-02", title: "AI that writes job descriptions", category: "hr", price: "$0-$20/mo" },
  { id: "hr-03", title: "AI that onboards new employees", category: "hr", price: "$50-$150/mo" },
  { id: "hr-04", title: "AI that answers employee questions", category: "hr", price: "$50-$150/mo" },
  { id: "hr-05", title: "AI that schedules team shifts", category: "hr", price: "$30-$100/mo" },
];

export const CATEGORY_LABELS = {
  customer: "Customer Support",
  marketing: "Marketing & Content",
  sales: "Sales & Leads",
  operations: "Operations",
  productivity: "Productivity & Automation",
  finance: "Finance & Admin",
  hr: "HR & Team",
} as const;

// Get count by category
export const getCategoryCount = (category: keyof typeof CATEGORY_LABELS) =>
  AI_USE_CASES.filter(uc => uc.category === category).length;

// Total use cases
export const TOTAL_USE_CASES = AI_USE_CASES.length;
