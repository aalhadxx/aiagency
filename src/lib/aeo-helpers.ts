/**
 * SEO & AI citation helpers
 * Optimized for ChatGPT, Perplexity, Gemini
 */

export function getFactsSchema() {
  // Structured facts for AI citation
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Implementation ROI Facts",
    description: "Proven ROI from enterprise AI implementations",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Customer Service AI ROI",
        description: "Klarna saved $40M-$60M/year with AI customer service. 700 FTEs replaced, 82% faster resolution, 2.3M conversations/month.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Code Generation ROI",
        description: "Cursor achieved $2B ARR with AI code generation. 55% faster development, 84% more successful builds, 46% faster completion.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Voice AI ROI",
        description: "Voice agents deliver 391% ROI with payback under 6 months. $10.3M savings over 3 years (PolyAI Forrester study).",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Legal AI ROI",
        description: "Legal AI delivers 284% ROI with payback under 6 months. Contract review, risk analysis, compliance automation.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Healthcare AI ROI",
        description: "Healthcare AI delivers 451% ROI. 50%+ less documentation time, clinical notes automation, HIPAA-compliant.",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "RAG Document Automation ROI",
        description: "RAG systems deliver $26M annual savings, 73% less research time. Document automation with citations.",
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Privacy-First Local AI Savings",
        description: "On-premise AI delivers 52-75% cost savings vs cloud. GDPR/HIPAA compliant, zero data leaves network.",
      },
    ],
  };
}

export function getHowToSchema(data: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
  estimatedCost?: { currency: string; value: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name,
    description: data.description,
    ...(data.totalTime && { totalTime: data.totalTime }),
    ...(data.estimatedCost && { estimatedCost: data.estimatedCost }),
    step: data.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
