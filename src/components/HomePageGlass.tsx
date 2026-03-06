"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Lock, Bot, Shield, Settings } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StatCard } from "@/components/StatCard";
import { TestimonialCard, ClientLogos } from "@/components/social-proof";
import { testimonials } from "@/data/testimonials";
import { caseStudies } from "@/data/case-studies";
import type { Post } from "@/lib/blog";

const MeshGradient = dynamic(
  () =>
    import("@/components/mesh-gradient").then((mod) => mod.MeshGradientComponent),
  { ssr: false }
);

const SERVICES = [
  {
    icon: Lock,
    title: "Secure OpenClaw Deployment",
    desc: "Security hardening, network isolation, credential vaults, audit logging, SOC 2-ready setup. 7-day implementation.",
    price: "$5K – $15K",
    href: "/services",
    cta: "Learn more →",
  },
  {
    icon: Bot,
    title: "Custom Autonomous Agents",
    desc: "Multi-agent orchestration, custom skills, safety guardrails, human-in-the-loop approvals, domain sandboxing.",
    price: "$3K – $10K per agent",
    href: "/services",
    cta: "Learn more →",
  },
  {
    icon: Shield,
    title: "Security Audit & Remediation",
    desc: "Vulnerability assessment, fix exposed instances, policy-based safety controls, malicious plugin removal.",
    price: "$2K – $5K",
    href: "/book-audit",
    cta: "Book free audit →",
  },
  {
    icon: Settings,
    title: "Managed OpenClaw Service",
    desc: "Ongoing monitoring, updates, incident response, skill marketplace vetting, performance optimization.",
    price: "$500 – $2K/month",
    href: "/services",
    cta: "Learn more →",
  },
];

const RISK_CARDS = [
  {
    num: "01",
    title: "42K–135K Exposed",
    desc: "63% vulnerable to exploitation with critical RCE vulnerabilities",
  },
  {
    num: "02",
    title: "1 in 5 Plugins Malicious",
    desc: "ClawHub marketplace contains dangerous, unvetted code",
  },
  {
    num: "03",
    title: "512 Known Vulnerabilities",
    desc: "8 critical security flaws in default configuration",
  },
];

type HomePageGlassProps = {
  posts: Post[];
};

export function HomePageGlass({ posts }: HomePageGlassProps) {
  return (
    <main className="min-h-screen bg-oc-bg text-oc-cream overflow-x-hidden scroll-smooth">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]">
          <MeshGradient />
        </div>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,255,204,0.15), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(245,166,35,0.08), transparent 40%)",
          }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              <span className="block text-oc-cream">
                Secure OpenClaw Deployment for Enterprise
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-oc-cyan mb-8">
              OpenClaw: The open-source autonomous AI agent platform—now enterprise-ready.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 mb-12 max-w-2xl">
              <p className="text-oc-cream-muted text-lg leading-relaxed">
                We make OpenClaw safe for enterprise. Deploy autonomous AI agents with
                enterprise security, compliance-ready infrastructure, and production-grade
                safety guardrails in 7 days.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book-audit"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-oc-cyan text-oc-bg font-semibold rounded-xl transition-all hover:bg-oc-cyan-dim hover:gap-4 border border-oc-cyan/30"
              >
                Book Audit
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border border-white/20 text-oc-cream font-medium rounded-xl transition-all hover:border-oc-cyan/50 hover:text-oc-cyan hover:bg-white/5"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Bar with Animated Stats */}
      <section className="relative py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <StatCard value="50+" label="Secure Deployments" delay={0} />
            <StatCard value="3x" label="ROI in 90 Days" delay={0.1} />
            <StatCard value="7" label="Days to Production" delay={0.2} />
            <StatCard value="SOC 2" label="Compliant" delay={0.3} />
          </div>
        </div>
      </section>

      {/* 3. Social Proof: Client Logos + Testimonial */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-oc-cream">
              Trusted by leading enterprises
            </h2>
            <p className="text-oc-cream-muted mb-12 max-w-xl">
              Companies that deployed OpenClaw safely with our help
            </p>
          </ScrollReveal>
          <ClientLogos />
          <ScrollReveal delay={0.2} className="mt-16">
            <TestimonialCard testimonial={testimonials[0]} delay={0} />
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 mb-20">
            <ScrollReveal className="lg:col-span-6">
              <span className="text-oc-cyan text-sm font-medium tracking-widest uppercase mb-4 block">
                What We Build
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-oc-cream">
                Production-grade AI automation enterprises trust
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="lg:col-span-6 flex items-end">
              <p className="text-oc-cream-muted text-lg">
                Security hardening, custom agents, audits, and managed services
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <Link
                  href={service.href}
                  className="group block p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-oc-cyan/30 transition-all duration-500 h-full"
                >
                  <service.icon className="w-10 h-10 text-oc-cyan mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-xl font-bold mb-4 text-oc-cream group-hover:text-oc-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-oc-cream-muted mb-6 leading-relaxed text-sm">
                    {service.desc}
                  </p>
                  <div className="text-oc-cyan font-semibold mb-2">{service.price}</div>
                  <span className="text-sm text-oc-cream-muted group-hover:text-oc-cyan transition-colors">
                    {service.cta}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Problem We Solve */}
      <section className="py-32 relative bg-oc-surface/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <span className="text-oc-coral text-sm font-medium tracking-widest uppercase mb-4 block">
              The Problem We Solve
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-oc-cream mb-16">
              Why OpenClaw was banned—and how we fix it
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {RISK_CARDS.map((card, i) => (
              <ScrollReveal key={card.num} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-oc-coral/30 transition-all">
                  <div className="text-oc-coral font-bold text-sm tracking-widest mb-3">
                    {card.num}
                  </div>
                  <h3 className="font-display text-xl font-bold text-oc-cream mb-3">
                    {card.title}
                  </h3>
                  <p className="text-oc-cream-muted leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3} className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-oc-cyan font-medium hover:gap-4 transition-all"
            >
              Read our OpenClaw security analysis
              <span>→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Case Studies */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <span className="text-oc-cyan text-sm font-medium tracking-widest uppercase mb-4 block">
              Case Studies
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-oc-cream mb-16">
              Real results from real deployments
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.slice(0, 3).map((study, i) => (
              <ScrollReveal key={study.id} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-oc-cyan/30 transition-all h-full flex flex-col">
                  {study.metric && (
                    <div className="text-oc-cyan font-bold text-2xl mb-4">
                      {study.metric}
                    </div>
                  )}
                  <h3 className="font-display text-xl font-bold text-oc-cream mb-2">
                    {study.title}
                  </h3>
                  <p className="text-oc-cream-muted text-sm mb-4">{study.client}</p>
                  <p className="text-oc-cream-muted text-sm leading-relaxed flex-1">
                    {study.challenge}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {study.results.slice(0, 2).map((r, j) => (
                      <li key={j} className="text-oc-cyan/90 text-sm flex items-center gap-2">
                        <span className="text-oc-cyan">✓</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Latest Blog Posts - only if we have posts */}
      {posts.length > 0 && (
        <section className="py-32 relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <ScrollReveal>
                <span className="text-oc-cyan text-sm font-medium tracking-widest uppercase mb-4 block">
                  Latest Insights
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-oc-cream">
                  From the blog
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-oc-cyan font-medium hover:gap-4 transition-all"
                >
                  View all articles
                  <span>→</span>
                </Link>
              </ScrollReveal>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.1}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-oc-cyan/30 hover:bg-white/10 transition-all h-full"
                  >
                    <time className="text-oc-cream-muted text-sm">{post.meta.date}</time>
                    <h3 className="font-display text-xl font-bold text-oc-cream mt-2 mb-3 group-hover:text-oc-cyan">
                      {post.meta.title}
                    </h3>
                    <p className="text-oc-cream-muted text-sm line-clamp-3">
                      {post.meta.excerpt}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,255,204,0.08), transparent 60%), radial-gradient(ellipse 60% 60% at 20% 80%, rgba(245,166,35,0.05), transparent 50%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.08]">
          <MeshGradient />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="p-12 md:p-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-oc-cream mb-6">
                Ready to deploy OpenClaw safely?
              </h2>
              <p className="text-xl text-oc-cream-muted max-w-2xl mx-auto mb-10">
                Get a free 30-minute security consultation. We&apos;ll assess your needs
                and show you exactly how to deploy autonomous agents without the risk.
              </p>
              <Link
                href="/book-audit"
                className="group inline-flex items-center gap-2 px-10 py-5 bg-oc-cyan text-oc-bg font-semibold text-lg rounded-xl transition-all hover:bg-oc-cyan-dim hover:gap-4"
              >
                Book Your Free Audit Now
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
