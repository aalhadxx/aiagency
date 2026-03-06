/**
 * Top 10–15 AI use cases that are ACTUALLY SELLING
 * Research: Product Hunt, G2, IDC, Menlo Ventures, Gartner, Reddit (r/LocalLLaMA, r/selfhosted, r/Entrepreneur)
 * Reddit .json trick: reddit.com/r/subreddit/top.json returns JSON with posts/titles
 */

export type SellingUseCase = {
  id: string;
  name: string;
  shortDesc: string;
  evidence: string;
  category: "enterprise" | "privacy" | "dev" | "content" | "voice" | "legal" | "automation";
};

export const TOP_SELLING_USE_CASES: SellingUseCase[] = [
  {
    id: "customer-service",
    name: "Customer service & self-service AI",
    shortDesc: "Handle 80% of inquiries autonomously. Klarna-style impact.",
    evidence: "IDC $16.7B spend. Klarna: $40M savings, 700 FTEs replaced, 2.3M convos/month.",
    category: "enterprise",
  },
  {
    id: "code-generation",
    name: "AI coding assistants",
    shortDesc: "Copilot-style. Cursor $2B ARR, GitHub Copilot 20M users.",
    evidence: "Menlo $7.3B spend. 50% of devs use AI daily. 46% faster completion.",
    category: "dev",
  },
  {
    id: "privacy-local",
    name: "Privacy-first local AI",
    shortDesc: "On-prem, self-hosted. Medical, legal, sensitive data. Zero cloud.",
    evidence: "r/LocalLLaMA, r/selfhosted: privacy, cost control, model consistency.",
    category: "privacy",
  },
  {
    id: "content-generation",
    name: "Content generation (marketing, video, docs)",
    shortDesc: "Synthesia $100M ARR. Jasper $55M. 65% of orgs use for marketing.",
    evidence: "G2 Best AI Video. Image gen 441% YoY growth.",
    category: "content",
  },
  {
    id: "rag-knowledge",
    name: "RAG & document chat",
    shortDesc: "Chat with docs, policies, knowledge bases. Citations, no hallucination.",
    evidence: "RAG adoption 31%→51% YoY. BDO Canada: $1.65M savings, 120K docs automated.",
    category: "enterprise",
  },
  {
    id: "voice-agents",
    name: "AI voice agents (sales, support)",
    shortDesc: "Outbound calls, lead qual, CRM updates. ~50 calls/day at $270/mo vs $2K VAs.",
    evidence: "VAPI, Deepgram, Twilio. r/AI_Agents, r/Entrepreneur.",
    category: "voice",
  },
  {
    id: "legal-ai",
    name: "Legal AI (contract review, summarization)",
    shortDesc: "Contract risk, meeting transcription, intake, automated review.",
    evidence: "Gartner top 6 use cases. Menlo: Legal $350M spend.",
    category: "legal",
  },
  {
    id: "revenue-intelligence",
    name: "Revenue intelligence & sales AI",
    shortDesc: "Gong-style. 29% higher sales growth, 11% better go-to-market.",
    evidence: "Gong 4K+ customers. 4,500 companies with revenue intelligence.",
    category: "enterprise",
  },
  {
    id: "process-automation",
    name: "Process automation (RPA + AI)",
    shortDesc: "38% of enterprises prioritize. Ticket triage, HR, workflows.",
    evidence: "IDC top priority. ~30% PTO auto-resolved, 15 hrs/week saved.",
    category: "automation",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & threat intelligence",
    shortDesc: "IDC $13.3B. Third-ranked CIO priority.",
    evidence: "Banking top adopter. Augmented fraud $17B, 31% CAGR.",
    category: "enterprise",
  },
  {
    id: "copilots",
    name: "General-purpose copilots",
    shortDesc: "M365 Copilot, Salesforce Einstein. 10+ products at $1B+ ARR.",
    evidence: "Menlo $8.4B spend. Embedded in existing apps.",
    category: "enterprise",
  },
  {
    id: "healthcare-ai",
    name: "Healthcare AI (HIPAA)",
    shortDesc: "Clinical notes, triage, transcription. On-device for sensitive audio.",
    evidence: "Menlo $3.5B industry-specific. Twofold, Abridge, Suki, Epic AI.",
    category: "privacy",
  },
  {
    id: "openclaw",
    name: "OpenClaw security & deployment",
    shortDesc: "Secure autonomous agents. Fix ClawJacked, credential exposure. 7-day prod.",
    evidence: "Viral use case. Production hardening, SOC 2-ready.",
    category: "enterprise",
  },
];
