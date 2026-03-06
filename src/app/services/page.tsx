import Link from "next/link";
import { Metadata } from "next";
import { ServicesStickyCTA } from "@/components/ServicesStickyCTA";
import { ROICalculator } from "@/components/ROICalculator";
import { clients } from "@/data/clients";
import { caseStudies } from "@/data/case-studies";
import { testimonials } from "@/data/testimonials";
import { createPageMetadata } from "@/lib/metadata";
import { SEO } from "@/components/SEO";
import { getBreadcrumbSchema, getServiceSchema, getFAQSchema } from "@/lib/schema";
import { Button } from "@/components/ui";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Lock, Bot, Shield, Settings, Check, ArrowRight, DollarSign, Code, Phone, FileText, Scale, Building2, ShieldCheck } from "lucide-react";
import { TOP_SELLING_USE_CASES } from "@/data/top-selling-use-cases";

export const metadata: Metadata = createPageMetadata({
  title: "AI Implementation Services | We Build Everything",
  description:
    "We implement everything: customer service AI ($40M savings), code generation ($2B ARR), voice agents (391% ROI), RAG, legal AI, privacy-first local hosting. We hire the right talent to deliver.",
  path: "/services",
});

const SERVICES_FAQ = [
  {
    question: "How do I know which service I need?",
    answer:
      "Book a free 30-minute audit. We'll assess your setup and recommend the right service—whether you're planning to deploy, already running OpenClaw, or need custom agents.",
  },
  {
    question: "What's included in the free audit?",
    answer:
      "A 30-minute call where we review your current setup, identify critical vulnerabilities, and provide a prioritized action plan. You also get our 47-point Security Checklist.",
  },
  {
    question: "Can I combine multiple services?",
    answer:
      "Yes. Many clients start with a Security Audit, then move to Secure Deployment or Custom Agents, and add Managed Service for ongoing support. We'll design a package that fits your needs.",
  },
  {
    question: "What if I'm not sure about the investment?",
    answer:
      "Start with the free audit. There's no commitment. We'll show you exactly what you need and what it costs. Clients typically see 3x ROI within 90 days—we can help you model the numbers.",
  },
];

const SERVICES = [
  {
    icon: Lock,
    title: "Secure OpenClaw Deployment",
    price: "$5,000 – $15,000",
    priceNote: "Price depends on environment complexity and compliance scope",
    desc: "Turn OpenClaw from banned software into enterprise-ready infrastructure. We implement military-grade security hardening and compliance controls.",
    features: [
      "Network isolation and firewall configuration",
      "Credential vault integration (AWS Secrets Manager / HashiCorp Vault)",
      "Comprehensive audit logging (90-365 day retention)",
      "SOC 2-ready compliance documentation",
      "TLS 1.3 encryption and origin validation",
      "Tool permission sandboxing and domain allowlists",
      "7-day implementation timeline",
      "30-day post-deployment support",
    ],
    deliverables: [
      "Hardened OpenClaw installation",
      "Security architecture documentation",
      "Compliance checklist and audit evidence",
      "Runbook for operations team",
    ],
  },
  {
    icon: Bot,
    title: "Custom Autonomous Agents",
    price: "$3,000 – $10,000 per agent",
    priceNote: "Price depends on integrations, skills, and orchestration complexity",
    desc: "Build intelligent agents that understand your business logic, execute complex workflows, and make decisions within safe boundaries.",
    features: [
      "Custom skill development ($500–$2,000 per skill)",
      "Multi-agent orchestration ($5,000+)",
      "Human-in-the-loop approval workflows",
      "Safety guardrails and policy enforcement",
      "CRM/ERP/internal system integrations",
      "Browser automation with anti-detection",
      "API orchestration and data pipelines",
    ],
    deliverables: [
      "Lead qualification and enrichment agents",
      "Customer support with knowledge base RAG",
      "Document processing and data extraction",
      "Competitive intelligence gathering",
      "QA testing and monitoring",
    ],
  },
  {
    icon: Shield,
    title: "Security Audit & Remediation",
    price: "$2,000 – $5,000",
    priceNote: "Price depends on scope of remediation and number of agents",
    desc: "Already running OpenClaw? We'll find every vulnerability and fix them before bad actors do.",
    features: [
      "Network exposure analysis",
      "Credential and secrets scanning",
      "Plugin marketplace vetting (remove malicious code)",
      "WebSocket security audit",
      "Tool permission review",
      "Logging and monitoring gaps",
      "Compliance readiness check",
    ],
    deliverables: [
      "Fix all critical and high-severity issues",
      "Implement recommended security controls",
      "Provide prioritized remediation roadmap",
      "90-day re-assessment included",
    ],
  },
  {
    icon: Settings,
    title: "Managed OpenClaw Service",
    price: "$500 – $2,000/month",
    priceNote: "Choose tier based on number of agents and support level",
    desc: "Focus on your business while we keep your AI infrastructure secure, updated, and optimized.",
    features: [
      "24/7 monitoring and alerting",
      "Security patch management",
      "Incident response (4-hour SLA)",
      "Plugin vetting and safe updates",
      "Performance optimization",
      "Cost optimization (LLM usage analysis)",
      "Monthly security reports",
      "Quarterly strategy reviews",
    ],
    deliverables: [
      "Essential ($500/mo): 1 agent, monitoring, updates",
      "Professional ($1,000/mo): 3 agents, priority support",
      "Enterprise ($2,000/mo): 10+ agents, dedicated engineer, SLA",
    ],
  },
];

export default function ServicesPage() {
  const serviceSchemas = [
    getServiceSchema({
      name: "Secure OpenClaw Deployment",
      description:
        "Security hardening, network isolation, credential vaults, audit logging, and SOC 2-ready setup. 7-day implementation.",
      url: "/services",
      priceRange: "$5,000 - $15,000",
    }),
    getServiceSchema({
      name: "Custom Autonomous Agents",
      description:
        "Multi-agent orchestration, custom skills, safety guardrails, human-in-the-loop approvals, and domain sandboxing.",
      url: "/services",
      priceRange: "$3,000 - $10,000 per agent",
    }),
    getServiceSchema({
      name: "Security Audit & Remediation",
      description:
        "Vulnerability assessment, fix exposed instances, implement policy-based safety controls, and malicious plugin removal.",
      url: "/book-audit",
      priceRange: "$2,000 - $5,000",
    }),
    getServiceSchema({
      name: "Managed OpenClaw Service",
      description:
        "Ongoing monitoring, updates, incident response, skill marketplace vetting, and performance optimization.",
      url: "/services",
      priceRange: "$500 - $2,000/month",
    }),
  ];
  const faqSchema = getFAQSchema(SERVICES_FAQ);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <main className="min-h-screen bg-oc-bg text-oc-cream">
      <SEO
        schemas={[breadcrumbSchema, ...serviceSchemas, faqSchema].filter(Boolean)}
      />
      <ServicesStickyCTA />

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-oc-cyan mb-4">
              We Implement Everything
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We build any AI solution.
              <br />
              <span className="text-oc-cyan">We hire the right talent to deliver.</span>
            </h1>
            <p className="text-xl text-oc-cream-muted max-w-2xl">
              Klarna saved $40M with customer service AI. Cursor is at $2B ARR with code generation. Voice agents get 391% ROI. If it works, we can build it. We hire people who've done it before.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Bar + Client Logos */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-oc-cyan">50+</div>
              <div className="text-xs font-medium text-oc-cream-muted uppercase tracking-wider mt-1">
                Secure Deployments
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-oc-cyan">3×</div>
              <div className="text-xs font-medium text-oc-cream-muted uppercase tracking-wider mt-1">
                ROI in 90 Days
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-oc-cyan">7</div>
              <div className="text-xs font-medium text-oc-cream-muted uppercase tracking-wider mt-1">
                Days to Production
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-oc-cyan">SOC 2</div>
              <div className="text-xs font-medium text-oc-cream-muted uppercase tracking-wider mt-1">
                Compliant
              </div>
            </div>
          </div>
          <p className="text-xs font-semibold text-oc-cream-muted uppercase tracking-wider mb-6 text-center">
            Trusted by leading enterprises
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {clients.slice(0, 8).map((client) => (
              <span
                key={client.id}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-oc-cream-muted text-sm font-medium"
              >
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What We Implement - 13 Validated Use Cases */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-oc-cyan mb-4">
              What We Build
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              13 AI systems we build
            </h2>
            <p className="text-oc-cream-muted max-w-3xl mb-12">
              Customer service AI. Voice agents. Code generation. Legal contract analysis. Healthcare clinical notes. RAG document search. Privacy-first local hosting. Cybersecurity. Process automation. Revenue intelligence. And more.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_SELLING_USE_CASES.map((useCase, i) => {
              const iconMap: Record<string, any> = {
                "customer-service": Bot,
                "code-generation": Code,
                "privacy-local": ShieldCheck,
                "content-generation": FileText,
                "rag-knowledge": FileText,
                "voice-agents": Phone,
                "legal-ai": Scale,
                "revenue-intelligence": DollarSign,
                "process-automation": Settings,
                "cybersecurity": Shield,
                "copilots": Bot,
                "healthcare-ai": Building2,
                "openclaw": Lock,
              };
              const Icon = iconMap[useCase.id] || Bot;
              return (
                <ScrollReveal key={useCase.id} delay={i * 0.03}>
                  <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-oc-cyan/30 transition-all h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <Icon className="w-6 h-6 text-oc-cyan flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-oc-cream mb-1">
                          {useCase.name}
                        </h3>
                        <p className="text-sm text-oc-cream-muted mb-3">
                          {useCase.shortDesc}
                        </p>
                        <p className="text-xs text-oc-cyan font-medium">
                          {useCase.evidence}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal delay={0.4}>
            <div className="mt-12 p-6 rounded-xl border-2 border-oc-cyan/30 bg-oc-cyan/5">
              <p className="font-semibold text-oc-cream mb-2">
                Need something else?
              </p>
              <p className="text-oc-cream-muted text-sm mb-4">
                Need something else? We build AI systems that work.
              </p>
              <Button href="/book-audit" variant="primary" size="md" className="group">
                Book Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <p className="text-sm font-medium tracking-widest uppercase text-oc-cyan mb-4">
                  ROI Calculator
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  See how quickly our services pay for themselves
                </h2>
                <p className="text-oc-cream-muted">
                  Adjust the sliders to model your team's time savings. Most clients see positive ROI within 4–8 weeks.
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2}>
                <div className="p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <ROICalculator />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Book", desc: "Free 30-min audit" },
                { step: 2, title: "Call", desc: "Discovery & assessment" },
                { step: 3, title: "Proposal", desc: "Custom scope & quote" },
                { step: 4, title: "Start", desc: "Deploy in 7 days" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-oc-cyan/20 flex items-center justify-center text-oc-cyan font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-display font-bold text-oc-cream mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-oc-cream-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
              Service Details
            </h2>
          </ScrollReveal>
          <div className="space-y-24">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.05}>
                <div className="p-8 md:p-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <div className="flex items-start gap-6 mb-8">
                    <service.icon className="w-12 h-12 text-oc-cyan flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-oc-cream mb-2">
                        {service.title}
                      </h3>
                      <div className="text-oc-cyan font-bold text-xl mb-1">
                        {service.price}
                      </div>
                      <p className="text-sm text-oc-cream-muted">
                        {service.priceNote}
                      </p>
                    </div>
                  </div>
                  <p className="text-oc-cream-muted text-lg mb-8">
                    {service.desc}
                  </p>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="font-display font-bold text-oc-cream mb-4">
                        What's Included
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-3 text-oc-cream-muted"
                          >
                            <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-oc-cream mb-4">
                        Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-3 text-oc-cream-muted"
                          >
                            <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                      href={service.title.includes("Audit") ? "/book-audit" : "/contact"}
                      variant="primary"
                      size="md"
                      className="group"
                    >
                      {service.title.includes("Audit")
                        ? "Book Free Audit"
                        : "Get Quote"}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button href="/pricing" variant="outline" size="md">
                      Compare pricing
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Case Studies
              </h2>
              <p className="text-oc-cream-muted">
                Real results from enterprises we've helped
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Button href="/case-studies" variant="outline" size="md">
                View all case studies
              </Button>
            </ScrollReveal>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, i) => (
              <ScrollReveal key={study.id} delay={i * 0.1}>
                <Link
                  href="/case-studies"
                  className="block p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-oc-cyan/30 transition-all h-full"
                >
                  <div className="text-oc-cyan font-bold text-xl mb-2">
                    {study.metric}
                  </div>
                  <h3 className="font-display font-bold text-oc-cream mb-2">
                    {study.title}
                  </h3>
                  <p className="text-sm text-oc-cream-muted line-clamp-2">
                    {study.challenge}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              What Clients Say
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <p className="text-oc-cream-muted italic mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-oc-cyan/20 flex items-center justify-center text-oc-cyan font-bold text-sm">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-oc-cream">{t.name}</div>
                      <div className="text-sm text-oc-cream-muted">
                        {t.role}, {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <div className="space-y-4 max-w-3xl">
            {SERVICES_FAQ.map((faq, i) => (
              <ScrollReveal key={faq.question} delay={i * 0.05}>
                <details className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <summary className="font-semibold text-oc-cream cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center">
                    {faq.question}
                    <span className="text-oc-cyan group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-4 text-oc-cream-muted">{faq.answer}</p>
                </details>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-oc-cream-muted max-w-xl mx-auto mb-10">
              Book a free 30-minute consultation—we'll assess your needs and recommend the right service. No commitment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href="/book-audit"
                variant="primary"
                size="lg"
                className="group"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Get a Custom Quote
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
