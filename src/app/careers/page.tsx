import { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui";
import { createPageMetadata } from "@/lib/metadata";
import { SEO } from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/schema";
import { ArrowRight, Briefcase, Code, Shield, Mic, FileText, Users, Zap, DollarSign } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Careers | We Hire the Right Talent to Deliver",
  description:
    "Join our team of AI specialists. We implement everything—customer service AI, code generation, voice agents, RAG, legal AI, privacy-first solutions. Remote-first, competitive pay, real impact.",
  path: "/careers",
});

const OPEN_POSITIONS = [
  {
    id: "ai-implementation-engineer",
    title: "AI Implementation Engineer",
    type: "Full-time",
    location: "Remote (US/EU)",
    salary: "$120K – $180K + equity",
    icon: Code,
    desc: "Build and deploy customer service AI, RAG systems, voice agents, and automation. Work directly with clients to implement proven use cases with real ROI.",
    skills: [
      "LLM APIs (OpenAI, Anthropic, Gemini)",
      "Python, TypeScript, Next.js",
      "RAG / vector databases (Pinecone, Chroma, Milvus)",
      "AI frameworks (LangChain, LlamaIndex)",
      "Docker, CI/CD, cloud deployment",
    ],
    bonus: ["Previous AI agency or consulting experience", "Shipped production AI systems", "Strong client communication"],
  },
  {
    id: "security-specialist",
    title: "AI Security Specialist (OpenClaw)",
    type: "Full-time / Contract",
    location: "Remote",
    salary: "$140K – $200K + equity",
    icon: Shield,
    desc: "Secure autonomous AI agents. Fix ClawJacked, credential exposure, plugin vulnerabilities. Implement SOC 2-ready deployments for enterprises.",
    skills: [
      "Security hardening (network isolation, TLS, vaults)",
      "Compliance (SOC 2, HIPAA, GDPR)",
      "OpenClaw / autonomous agent architecture",
      "Penetration testing & vulnerability assessment",
      "Audit logging, monitoring, incident response",
    ],
    bonus: ["CISSP, OSCP, or similar certifications", "Enterprise security consulting", "Contributed to security open-source projects"],
  },
  {
    id: "voice-ai-engineer",
    title: "Voice AI Engineer",
    type: "Full-time",
    location: "Remote",
    salary: "$130K – $190K + equity",
    icon: Mic,
    desc: "Build voice agents for sales, support, and operations. Integrate with Twilio, VAPI, Deepgram. Target 391% ROI, <6 month payback.",
    skills: [
      "Voice AI platforms (VAPI, Deepgram, ElevenLabs, Twilio)",
      "Real-time audio processing",
      "Conversational AI design",
      "WebRTC, telephony integrations",
      "CRM integrations (Salesforce, HubSpot)",
    ],
    bonus: ["Shipped production voice agents", "Call center or telecom experience", "Natural language understanding (NLU)"],
  },
  {
    id: "legal-healthcare-ai-specialist",
    title: "Legal / Healthcare AI Specialist",
    type: "Full-time / Contract",
    location: "Remote",
    salary: "$150K – $220K + equity",
    icon: FileText,
    desc: "Implement AI for legal contract review (284% ROI) or healthcare clinical notes (451% ROI). HIPAA/GDPR-compliant, on-prem or private cloud.",
    skills: [
      "Domain expertise in legal or healthcare AI",
      "Compliance (HIPAA, GDPR, SOC 2)",
      "Document processing & extraction",
      "RAG for legal/medical corpora",
      "On-premise / air-gapped deployments",
    ],
    bonus: ["JD, MD, or relevant clinical/legal background", "Worked with Epic, Cerner, or legal tech platforms", "Published research in AI + healthcare/legal"],
  },
  {
    id: "privacy-infra-engineer",
    title: "Privacy & Infrastructure Engineer",
    type: "Full-time",
    location: "Remote",
    salary: "$140K – $200K + equity",
    icon: Shield,
    desc: "Build privacy-first, self-hosted AI solutions. Deploy on-prem LLMs on existing hardware. Target 52–75% cost savings vs cloud.",
    skills: [
      "Self-hosted LLM deployment (Ollama, llama.cpp, vLLM)",
      "On-premise infrastructure (bare metal, VMs, Kubernetes)",
      "Model optimization (quantization, caching)",
      "Cost modeling & capacity planning",
      "HIPAA/GDPR-compliant architecture",
    ],
    bonus: ["Experience with GPU optimization", "Worked in regulated industries (finance, healthcare, government)", "Built private cloud / air-gapped systems"],
  },
  {
    id: "ai-sales-engineer",
    title: "AI Sales Engineer",
    type: "Full-time",
    location: "Remote (US preferred)",
    salary: "$100K – $150K + commission (OTE $200K+)",
    icon: Users,
    desc: "Pre-sales technical consulting. Run audits, scope implementations, present ROI models. Close deals for $50K–$500K projects.",
    skills: [
      "Technical sales / solutions engineering",
      "AI/ML fundamentals (can explain RAG, fine-tuning, agents)",
      "Strong presentation & communication",
      "CRM (Salesforce, HubSpot)",
      "ROI modeling & business case development",
    ],
    bonus: ["Previous AI consulting or agency sales", "Closed enterprise deals >$100K", "Technical background (can code)"],
  },
  {
    id: "founding-engineer",
    title: "Founding Engineer (Multiple Roles)",
    type: "Full-time",
    location: "Remote",
    salary: "$140K – $220K + significant equity",
    icon: Zap,
    desc: "Join as a founding team member. Shape our service offerings, hiring, and growth. Ownership over major use cases (voice, RAG, legal, healthcare, code gen).",
    skills: [
      "Senior-level AI/ML engineering (5+ years)",
      "Shipped production AI systems with real ROI",
      "Full-stack or specialized (voice, security, privacy, legal, healthcare)",
      "Client-facing or consulting experience",
      "Strong autonomy and ownership mindset",
    ],
    bonus: ["Built or scaled an AI consultancy or agency", "Technical leadership or founding experience", "Known in the AI community (open-source, writing, speaking)"],
  },
];

const WHY_JOIN = [
  {
    icon: DollarSign,
    title: "Competitive pay + equity",
    desc: "Top-of-market cash compensation plus meaningful equity. OTE for sales roles >$200K.",
  },
  {
    icon: Zap,
    title: "Real impact",
    desc: "Build systems with proven ROI: $40M saved, 391% ROI, <6 month payback. Not vaporware.",
  },
  {
    icon: Users,
    title: "Remote-first",
    desc: "Work from anywhere. Async-first culture. Flexible hours. We care about output, not where you sit.",
  },
  {
    icon: Briefcase,
    title: "Own your domain",
    desc: "We hire specialists who know their craft. You own your use case end-to-end—strategy, implementation, client success.",
  },
];

export default function CareersPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ]);

  return (
    <main className="min-h-screen bg-oc-bg text-oc-cream">
      <SEO schemas={[breadcrumbSchema].filter(Boolean)} />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-oc-cyan mb-4">
              Careers
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We hire the right talent to deliver.
            </h1>
            <p className="text-xl text-oc-cream-muted max-w-3xl">
              We implement everything with proven ROI: customer service AI ($40M saved), code generation ($2B ARR), voice agents (391% ROI), legal AI (284% ROI), privacy-first local hosting. Join a team that builds real solutions—not vaporware.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 md:py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
              Why join us
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_JOIN.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                  <item.icon className="w-8 h-8 text-oc-cyan mb-4" />
                  <h3 className="font-semibold text-oc-cream mb-2">{item.title}</h3>
                  <p className="text-sm text-oc-cream-muted">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Open positions
            </h2>
            <p className="text-oc-cream-muted mb-12 max-w-2xl">
              We're building our founding team. Remote-first. Top-of-market compensation. Real impact.
            </p>
          </ScrollReveal>
          <div className="space-y-6">
            {OPEN_POSITIONS.map((job, i) => (
              <ScrollReveal key={job.id} delay={i * 0.05}>
                <div className="p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:border-oc-cyan/30 transition-all">
                  <div className="flex items-start gap-6 mb-6">
                    <job.icon className="w-10 h-10 text-oc-cyan flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3 className="font-display text-2xl font-bold text-oc-cream">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="px-3 py-1 rounded-full bg-oc-cyan/10 text-oc-cyan font-medium">
                            {job.type}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white/5 text-oc-cream-muted">
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <p className="text-oc-cyan font-semibold mb-4">{job.salary}</p>
                      <p className="text-oc-cream-muted mb-6">{job.desc}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-oc-cream mb-3">Required skills</h4>
                          <ul className="space-y-2">
                            {job.skills.map((skill) => (
                              <li key={skill} className="flex items-start gap-2 text-sm text-oc-cream-muted">
                                <span className="text-oc-cyan mt-1">•</span>
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-oc-cream mb-3">Nice to have</h4>
                          <ul className="space-y-2">
                            {job.bonus.map((bonus) => (
                              <li key={bonus} className="flex items-start gap-2 text-sm text-oc-cream-muted">
                                <span className="text-oc-cyan mt-1">+</span>
                                {bonus}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Button
                        href={`mailto:careers@aiagency.com?subject=Application: ${job.title}`}
                        variant="primary"
                        size="md"
                        className="group"
                      >
                        Apply for this role
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Don't see your role?
            </h2>
            <p className="text-xl text-oc-cream-muted max-w-xl mx-auto mb-10">
              We're always looking for exceptional AI specialists. If you've shipped production AI systems with real ROI, we want to talk.
            </p>
            <Button
              href="mailto:careers@aiagency.com?subject=General Application"
              variant="primary"
              size="lg"
              className="group"
            >
              Send us your background
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
