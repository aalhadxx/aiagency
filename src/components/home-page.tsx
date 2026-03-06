"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MeshGradientComponent as MeshGradient } from "@/components/mesh-gradient";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ParallaxSection } from "@/components/parallax-section";

export function HomePage() {
  return (
    <main className="min-h-screen bg-oc-bg text-oc-cream overflow-x-hidden">
      {/* Hero - Full viewport, dramatic typography */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <LazyMeshGradient />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-oc-bg/80 via-transparent to-oc-bg" />
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-oc-coral/30 bg-oc-coral/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-oc-coral animate-pulse" />
              <span className="text-sm font-medium text-oc-coral">
                Meta, Google, Microsoft banned OpenClaw from corporate hardware
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
              <span className="block text-oc-cream">Enterprise</span>
              <span className="block text-oc-cream">OpenClaw.</span>
              <span className="block text-oc-cyan">Secure.</span>
            </h1>
            <p className="text-lg md:text-xl text-oc-cream-muted max-w-xl leading-relaxed mb-12">
              Deploy autonomous AI agents with enterprise security, compliance-ready
              infrastructure, and production-grade safety guardrails in 7 days.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book-audit"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-oc-cyan text-oc-bg font-semibold rounded-none transition-all hover:bg-oc-cyan-dim hover:gap-4"
              >
                Book Free Security Audit
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 border border-oc-cream/20 text-oc-cream font-medium transition-all hover:border-oc-cyan/50 hover:text-oc-cyan"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-oc-cream/30 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-oc-cream/50" />
          </motion.div>
        </div>
      </section>

      {/* Trust Bar - Asymmetric, editorial */}
      <section className="relative py-20 border-y border-oc-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <ScrollReveal delay={0}>
              <div className="text-5xl md:text-6xl font-display font-bold text-oc-cyan">50+</div>
              <div className="text-sm text-oc-cream-muted mt-1">Secure Deployments</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="text-5xl md:text-6xl font-display font-bold text-oc-cyan">3×</div>
              <div className="text-sm text-oc-cream-muted mt-1">ROI in 90 Days</div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="text-5xl md:text-6xl font-display font-bold text-oc-amber">7</div>
              <div className="text-sm text-oc-cream-muted mt-1">Days to Production</div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="text-5xl md:text-6xl font-display font-bold text-oc-cream">SOC 2</div>
              <div className="text-sm text-oc-cream-muted mt-1">Compliant</div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services - Bento grid, magazine layout */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-24">
            <ScrollReveal className="lg:col-span-5 lg:pr-16">
              <span className="text-oc-cyan text-sm font-medium tracking-widest uppercase mb-4 block">
                What We Build
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                Production-grade AI automation enterprises trust
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="lg:col-span-7 flex items-end">
              <p className="text-oc-cream-muted text-lg leading-relaxed">
                Security hardening, custom agents, audits, and managed services—all
                designed for the enterprise.
              </p>
            </ScrollReveal>
          </div>

          {/* Asymmetric bento grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <ScrollReveal delay={0} className="lg:col-span-2">
              <Link
                href="/services"
                className="group block p-8 lg:p-10 bg-oc-surface border border-oc-border hover:border-oc-cyan/30 transition-all duration-500 h-full"
              >
                <span className="text-3xl mb-6 block">🔒</span>
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-oc-cyan transition-colors">
                  Secure OpenClaw Deployment
                </h3>
                <p className="text-oc-cream-muted mb-6 leading-relaxed">
                  Security hardening, network isolation, credential vaults, audit logging,
                  SOC 2-ready setup. 7-day implementation.
                </p>
                <div className="text-oc-cyan font-semibold mb-2">$5K – $15K</div>
                <span className="text-sm text-oc-cream-muted group-hover:text-oc-cyan transition-colors">
                  Learn more →
                </span>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link
                href="/services"
                className="group block p-8 lg:p-10 bg-oc-surface border border-oc-border hover:border-oc-cyan/30 transition-all duration-500 h-full"
              >
                <span className="text-3xl mb-6 block">🤖</span>
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-oc-cyan transition-colors">
                  Custom Autonomous Agents
                </h3>
                <p className="text-oc-cream-muted mb-6 leading-relaxed">
                  Multi-agent orchestration, custom skills, safety guardrails, human-in-the-loop.
                </p>
                <div className="text-oc-cyan font-semibold mb-2">$3K – $10K per agent</div>
                <span className="text-sm text-oc-cream-muted group-hover:text-oc-cyan transition-colors">
                  Learn more →
                </span>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link
                href="/book-audit"
                className="group block p-8 lg:p-10 bg-oc-surface border border-oc-border hover:border-oc-cyan/30 transition-all duration-500 h-full"
              >
                <span className="text-3xl mb-6 block">🛡️</span>
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-oc-cyan transition-colors">
                  Security Audit & Remediation
                </h3>
                <p className="text-oc-cream-muted mb-6 leading-relaxed">
                  Vulnerability assessment, fix exposed instances, policy-based safety controls.
                </p>
                <div className="text-oc-cyan font-semibold mb-2">$2K – $5K</div>
                <span className="text-sm text-oc-cream-muted group-hover:text-oc-cyan transition-colors">
                  Book free audit →
                </span>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="lg:col-span-2">
              <Link
                href="/services"
                className="group block p-8 lg:p-10 bg-oc-surface border border-oc-border hover:border-oc-cyan/30 transition-all duration-500 h-full"
              >
                <span className="text-3xl mb-6 block">⚙️</span>
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-oc-cyan transition-colors">
                  Managed OpenClaw Service
                </h3>
                <p className="text-oc-cream-muted mb-6 leading-relaxed">
                  Ongoing monitoring, updates, incident response, skill marketplace vetting,
                  performance optimization.
                </p>
                <div className="text-oc-cyan font-semibold mb-2">$500 – $2K/month</div>
                <span className="text-sm text-oc-cream-muted group-hover:text-oc-cyan transition-colors">
                  Learn more →
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Banned - Bold asymmetric block */}
      <section className="py-32 relative bg-oc-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <ParallaxSection className="lg:col-span-5">
              <ScrollReveal>
                <span className="text-oc-coral text-sm font-medium tracking-widest uppercase mb-4 block">
                  The Risk
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                  Why OpenClaw was banned
                </h2>
              </ScrollReveal>
            </ParallaxSection>
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal delay={0}>
                <div className="p-8 border-l-4 border-oc-coral/50 bg-oc-bg/50">
                  <div className="font-display text-xl font-bold text-oc-coral mb-2">
                    42K–135K Exposed Instances
                  </div>
                  <p className="text-oc-cream-muted">
                    63% vulnerable to exploitation with critical RCE vulnerabilities
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="p-8 border-l-4 border-oc-coral/50 bg-oc-bg/50">
                  <div className="font-display text-xl font-bold text-oc-coral mb-2">
                    1 in 5 Plugins Malicious
                  </div>
                  <p className="text-oc-cream-muted">
                    ClawHub marketplace contains dangerous, unvetted code
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="p-8 border-l-4 border-oc-coral/50 bg-oc-bg/50">
                  <div className="font-display text-xl font-bold text-oc-coral mb-2">
                    512 Known Vulnerabilities
                  </div>
                  <p className="text-oc-cream-muted">
                    8 critical security flaws in default configuration
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-oc-cyan font-medium hover:gap-4 transition-all mt-4"
                >
                  Read our OpenClaw security analysis
                  <span>→</span>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial break - Large quote block */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight text-oc-cream/90 max-w-4xl">
              "We make OpenClaw safe for enterprise. Deploy autonomous agents without the risk."
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Insights CTA - Magazine style */}
      <section className="py-24 border-y border-oc-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <ScrollReveal>
              <span className="text-oc-cyan text-sm font-medium tracking-widest uppercase mb-4 block">
                Insights
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Latest from the blog
              </h2>
              <p className="text-oc-cream-muted text-lg max-w-md">
                Deep dives into AI security, automation, and implementation
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 border border-oc-cream/20 text-oc-cream font-medium transition-all hover:border-oc-cyan/50 hover:text-oc-cyan"
              >
                View All Articles
                <span>→</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA - Bold full-width */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-oc-cyan/10 via-oc-bg to-oc-amber/5" />
        <div className="absolute inset-0 opacity-30">
          <LazyMeshGradient />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
              Ready to deploy
              <br />
              <span className="text-oc-cyan">OpenClaw safely?</span>
            </h2>
            <p className="text-xl text-oc-cream-muted max-w-2xl mx-auto mb-12">
              Get a free 30-minute security consultation. We'll assess your needs and
              show you exactly how to deploy autonomous agents without the risk.
            </p>
            <Link
              href="/book-audit"
              className="group inline-flex items-center gap-2 px-10 py-5 bg-oc-cyan text-oc-bg font-semibold text-lg rounded-none transition-all hover:bg-oc-cyan-dim hover:gap-4"
            >
              Book Your Free Audit Now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
