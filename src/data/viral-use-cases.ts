/**
 * 50 Viral AI Use Cases — What enterprises actually want and are implementing
 * Core: We implement AI solutions. OpenClaw is 1 of many.
 */

export type UseCase = {
  id: string;
  name: string;
  shortDesc: string;
  category: "agents" | "privacy" | "automation" | "voice" | "knowledge" | "dev" | "security" | "other";
  demand: "high" | "medium"; // viral = high demand
};

export const VIRAL_USE_CASES: UseCase[] = [
  // Privacy & Local Hosting (user's example)
  {
    id: "privacy-local",
    name: "Privacy-first local AI",
    shortDesc: "On-premise, air-gapped, or self-hosted LLMs using existing hardware. Zero data leaves your network.",
    category: "privacy",
    demand: "high",
  },
  {
    id: "existing-hardware",
    name: "AI on your existing hardware",
    shortDesc: "Deploy models on in-house GPUs, workstations, or servers. Maximize ROI on infrastructure you already own.",
    category: "privacy",
    demand: "high",
  },
  {
    id: "data-sovereignty",
    name: "Data sovereignty & compliance",
    shortDesc: "HIPAA, GDPR, SOC 2—keep sensitive data in-region. No cloud, no third-party access.",
    category: "privacy",
    demand: "high",
  },

  // Autonomous Agents
  {
    id: "openclaw",
    name: "OpenClaw security & deployment",
    shortDesc: "Secure autonomous AI agents. Fix ClawJacked, credential exposure, malicious plugins. Production in 7 days.",
    category: "security",
    demand: "high",
  },
  {
    id: "customer-service-agents",
    name: "Customer service AI agents",
    shortDesc: "Handle 80% of inquiries autonomously. 60% faster response, 40% cost savings. Klarna-style $40M+ impact.",
    category: "agents",
    demand: "high",
  },
  {
    id: "sales-lead-agents",
    name: "Sales & lead qualification agents",
    shortDesc: "Autonomous lead scoring, nurturing, CRM updates. 3x more qualified leads.",
    category: "agents",
    demand: "high",
  },
  {
    id: "it-support-agents",
    name: "IT support & help desk agents",
    shortDesc: "Resolve ~50% of tickets without human escalation. L1 automation at scale.",
    category: "agents",
    demand: "high",
  },
  {
    id: "multi-agent-orchestration",
    name: "Multi-agent workflows",
    shortDesc: "Coordinating agents delegating to specialists. Complex workflows, human-in-the-loop escalation.",
    category: "agents",
    demand: "high",
  },

  // Voice AI
  {
    id: "voice-agents",
    name: "AI voice agents",
    shortDesc: "Natural phone/voice customer service. Sub-second response, multi-step resolution, cross-channel continuity.",
    category: "voice",
    demand: "high",
  },
  {
    id: "voice-to-action",
    name: "Voice-to-action automation",
    shortDesc: "Speak to trigger workflows—orders, support, internal tools. Hands-free operations.",
    category: "voice",
    demand: "high",
  },

  // Knowledge & RAG
  {
    id: "rag-knowledge-base",
    name: "RAG knowledge assistants",
    shortDesc: "Chat with your docs, policies, manuals. HR, legal, IT help desks. Citations, no hallucination.",
    category: "knowledge",
    demand: "high",
  },
  {
    id: "agentic-rag",
    name: "Agentic RAG",
    shortDesc: "Multi-step retrieval, tool use, self-critique. Complex Q&A across large corpora.",
    category: "knowledge",
    demand: "high",
  },
  {
    id: "internal-search",
    name: "Semantic internal search",
    shortDesc: "Find anything across Confluence, Notion, SharePoint. Natural language, not keywords.",
    category: "knowledge",
    demand: "high",
  },

  // Developer Productivity
  {
    id: "coding-agents",
    name: "Autonomous coding agents",
    shortDesc: "GitHub Copilot-style agents. Draft PRs, fix bugs, write tests. 55% faster, 39% quality gain.",
    category: "dev",
    demand: "high",
  },
  {
    id: "dev-copilot-rollout",
    name: "Enterprise copilot rollout",
    shortDesc: "Deploy and govern AI coding tools across teams. Secure, compliant, policy-controlled.",
    category: "dev",
    demand: "high",
  },
  {
    id: "code-review-ai",
    name: "AI code review",
    shortDesc: "Automated security, style, and logic review. Pre-merge quality gates.",
    category: "dev",
    demand: "high",
  },

  // Automation & Operations
  {
    id: "document-automation",
    name: "Document processing automation",
    shortDesc: "Extract, classify, route. Invoices, contracts, forms. 70% reduction in manual processing.",
    category: "automation",
    demand: "high",
  },
  {
    id: "workflow-automation",
    name: "AI workflow orchestration",
    shortDesc: "Trigger, branch, and complete workflows across systems. Human-in-the-loop where needed.",
    category: "automation",
    demand: "high",
  },
  {
    id: "email-automation",
    name: "Email & comms automation",
    shortDesc: "Triage, draft, route. Inbox zero for teams. Smart replies with context.",
    category: "automation",
    demand: "high",
  },
  {
    id: "meeting-assistants",
    name: "Meeting AI assistants",
    shortDesc: "Transcribe, summarize, action items. Zoom/Teams integration. Async follow-ups.",
    category: "automation",
    demand: "high",
  },

  // Industry-specific
  {
    id: "legal-ai",
    name: "Legal contract AI",
    shortDesc: "Review, extract clauses, risk flagging. Compliance and due diligence.",
    category: "other",
    demand: "high",
  },
  {
    id: "healthcare-ai",
    name: "Healthcare AI (HIPAA)",
    shortDesc: "Clinical notes, triage, patient-facing chatbots. On-prem or HIPAA cloud.",
    category: "privacy",
    demand: "high",
  },
  {
    id: "fintech-ai",
    name: "Fintech & banking AI",
    shortDesc: "Fraud detection, compliance, customer chatbots. Regulated environment ready.",
    category: "other",
    demand: "high",
  },
  {
    id: "manufacturing-ai",
    name: "Manufacturing & supply chain AI",
    shortDesc: "Predictive maintenance, demand forecasting, inventory optimization.",
    category: "automation",
    demand: "high",
  },
  {
    id: "hr-ai",
    name: "HR & recruiting AI",
    shortDesc: "Screening, onboarding, policy Q&A. Bias reduction, audit trails.",
    category: "automation",
    demand: "high",
  },
  {
    id: "marketing-ai",
    name: "Marketing AI",
    shortDesc: "Content gen, segmentation, attribution. 15-20% conversion lift.",
    category: "automation",
    demand: "high",
  },

  // Security & Governance
  {
    id: "ai-security-audit",
    name: "AI security audits",
    shortDesc: "Pen test your AI agents. Prompt injection, data leakage, access control.",
    category: "security",
    demand: "high",
  },
  {
    id: "ai-governance",
    name: "AI governance & compliance",
    shortDesc: "Audit logging, model versioning, human oversight. SOC 2, ISO 27001 ready.",
    category: "security",
    demand: "high",
  },
  {
    id: "prompt-injection-defense",
    name: "Prompt injection defense",
    shortDesc: "Guardrails, input sanitization, output validation. Protect your agents.",
    category: "security",
    demand: "high",
  },

  // More viral use cases
  {
    id: "chatbot-custom",
    name: "Custom chatbots",
    shortDesc: "Branded, domain-specific. Support, sales, internal. Your data, your rules.",
    category: "agents",
    demand: "high",
  },
  {
    id: "content-generation",
    name: "Content generation pipelines",
    shortDesc: "Blogs, docs, social. Brand-aligned, SEO-optimized. Human-in-loop or fully automated.",
    category: "automation",
    demand: "high",
  },
  {
    id: "data-analysis-ai",
    name: "AI-powered data analysis",
    shortDesc: "Natural language to SQL, dashboards, insights. BI democratization.",
    category: "knowledge",
    demand: "high",
  },
  {
    id: "translation-localization",
    name: "AI translation & localization",
    shortDesc: "Real-time, domain-aware. Support, docs, product. 50+ languages.",
    category: "automation",
    demand: "high",
  },
  {
    id: "summarization",
    name: "Document summarization",
    shortDesc: "Long docs → exec summaries. Reports, emails, tickets. Configurable depth.",
    category: "automation",
    demand: "high",
  },
  {
    id: "sentiment-analysis",
    name: "Sentiment & feedback AI",
    shortDesc: "NPS, reviews, support tickets. Real-time sentiment, trend detection.",
    category: "automation",
    demand: "high",
  },
  {
    id: "recommendation-engines",
    name: "Recommendation engines",
    shortDesc: "Products, content, next-best-action. Personalization at scale.",
    category: "automation",
    demand: "high",
  },
  {
    id: "anomaly-detection",
    name: "Anomaly detection",
    shortDesc: "Fraud, ops, security. Real-time alerts. Explainable outputs.",
    category: "automation",
    demand: "high",
  },
  {
    id: "form-automation",
    name: "Form & intake automation",
    shortDesc: "Extract, validate, route. Applications, claims, requests. No manual data entry.",
    category: "automation",
    demand: "high",
  },
  {
    id: "scheduling-ai",
    name: "AI scheduling",
    shortDesc: "Calendar optimization, meeting scheduling. Cal.com, Calendly integration.",
    category: "automation",
    demand: "high",
  },
  {
    id: "ticket-routing",
    name: "Smart ticket routing",
    shortDesc: "Classify, prioritize, assign. Support, IT, HR. SLA-aware.",
    category: "automation",
    demand: "high",
  },
  {
    id: "conversational-ivr",
    name: "Conversational IVR",
    shortDesc: "Replace phone menus. Natural language to resolution. Voice + chat.",
    category: "voice",
    demand: "high",
  },
  {
    id: "internal-chatbot",
    name: "Internal AI assistant",
    shortDesc: "Slack/Teams bot. Answer questions, run workflows, fetch data.",
    category: "agents",
    demand: "high",
  },
  {
    id: "customer-success-ai",
    name: "Customer success AI",
    shortDesc: "Churn prediction, health scoring, proactive outreach. Expansion signals.",
    category: "automation",
    demand: "high",
  },
  {
    id: "compliance-monitoring",
    name: "Compliance monitoring AI",
    shortDesc: "Policy adherence, regulatory change. Audit-ready reports.",
    category: "security",
    demand: "high",
  },
  {
    id: "training-ai",
    name: "AI training & onboarding",
    shortDesc: "Personalized learning paths, simulations, Q&A. Onboard faster.",
    category: "knowledge",
    demand: "high",
  },
  {
    id: "research-assistant",
    name: "Research assistant AI",
    shortDesc: "Literature review, synthesis, citation. Academic or enterprise.",
    category: "knowledge",
    demand: "high",
  },
  {
    id: "agentic-software",
    name: "Agentic software engineering",
    shortDesc: "Full-stack agents. Plan, code, test, deploy. With human oversight.",
    category: "dev",
    demand: "high",
  },
  {
    id: "devops-ai",
    name: "DevOps & SRE AI",
    shortDesc: "Incident response, runbook automation, remediation. Reduce MTTR.",
    category: "dev",
    demand: "high",
  },
  {
    id: "api-integration",
    name: "AI API integrations",
    shortDesc: "Connect LLMs to your APIs. Tool use, function calling. Secure, governed.",
    category: "dev",
    demand: "high",
  },
  {
    id: "fine-tuning",
    name: "Model fine-tuning",
    shortDesc: "Custom models on your data. Domain-specific. Privacy-preserving.",
    category: "privacy",
    demand: "high",
  },
  {
    id: "evaluation-ai",
    name: "AI evaluation & testing",
    shortDesc: "Benchmark outputs, regression tests, human-in-loop eval. Ship with confidence.",
    category: "dev",
    demand: "high",
  },
  {
    id: "edge-ai",
    name: "Edge AI deployment",
    shortDesc: "Run models on edge devices. Low latency, offline. IoT, retail, manufacturing.",
    category: "privacy",
    demand: "high",
  },
  {
    id: "cost-optimization",
    name: "AI cost optimization",
    shortDesc: "Right-size models, cache, batch. 50%+ savings vs naive cloud usage.",
    category: "other",
    demand: "high",
  },
];

export const USE_CASE_CATEGORIES = {
  agents: "Autonomous Agents",
  privacy: "Privacy & Local",
  automation: "Automation",
  voice: "Voice AI",
  knowledge: "Knowledge & RAG",
  dev: "Developer Productivity",
  security: "Security & Governance",
  other: "Industry & Specialized",
} as const;
