'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ConversionCarousel } from '@/components/ConversionCarousel';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-oc-bg">
      {/* Hero Section — Lead with the real problem */}
      <section className="section container-custom">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal>
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-oc-surface px-4 py-2 text-sm font-medium text-oc-cyan">
                <span className="h-2 w-2 animate-pulse rounded-full bg-oc-cyan"></span>
                Launch Partners — Building Our First 100 Success Stories
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-5xl font-bold tracking-tight text-oc-cream sm:text-6xl md:text-7xl">
              We build AI that makes money.
              <br />
              <span className="gradient-text">We hire people who've done it before.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-oc-cream-muted md:text-xl">
              Klarna saved $40M. Cursor is at $2B ARR. Voice agents get 391% ROI. We find the people who built this stuff and get them to build yours.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/book-audit" className="btn-primary">
                Claim Your Free Consultation
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/services" className="btn-secondary">
                See What We Build
              </Link>
            </div>
          </ScrollReveal>

          {/* Early Adopter Offer — First 10 clients */}
          <ScrollReveal delay={0.4}>
            <div className="mt-12 rounded-xl border-2 border-oc-cyan/50 bg-oc-surface/80 p-6 backdrop-blur-sm">
              <div className="text-sm font-semibold uppercase tracking-wider text-oc-cyan">
                Launch Offer — First 10 Clients Only
              </div>
              <p className="mt-2 text-lg font-semibold text-oc-cream">
                50% off your first deployment + 90-day free security monitoring
              </p>
              <p className="mt-1 text-sm text-oc-cream-muted">
                Free audit included. No credit card. No obligation. We'll assess your needs and recommend the right solution—and hire the specialists who can build it.
              </p>
            </div>
          </ScrollReveal>

          {/* Trust Bar — Authentic */}
          <ScrollReveal delay={0.5}>
            <div className="mt-16 grid grid-cols-2 gap-6 border-t border-oc-border pt-12 text-center md:grid-cols-4">
              <div>
                <div className="text-3xl font-bold text-oc-cream">7 Days</div>
                <div className="mt-1 text-sm text-oc-cream-muted">To Production</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-oc-cream">100</div>
                <div className="mt-1 text-sm text-oc-cream-muted">Launch Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-oc-cream">0</div>
                <div className="mt-1 text-sm text-oc-cream-muted">Fake Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-oc-cream">100%</div>
                <div className="mt-1 text-sm text-oc-cream-muted">Authentic</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Selling Points Carousel */}
      <section className="border-y border-oc-border bg-oc-surface/30">
        <ConversionCarousel />
      </section>

      {/* Why we build — OpenClaw is 1 of many */}
      <section className="section border-y border-oc-border bg-oc-surface/30">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-oc-cream md:text-4xl lg:text-5xl">
                OpenClaw is one thing. We build everything.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-oc-cream-muted">
                Customer service AI. Voice agents. RAG. Coding copilots. Legal, healthcare. Privacy-first local hosting. If someone's made money with it, we can build it.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {[
                  { stat: '$40M', desc: 'Klarna saved with customer service AI. 700 FTEs replaced, 82% faster resolution' },
                  { stat: '391% ROI', desc: 'Voice agents: payback <6 months, $10.3M saved over 3 years (PolyAI Forrester)' },
                  { stat: '$2B ARR', desc: 'Cursor-style code generation. 55% faster tasks, 84% more successful builds' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-oc-border bg-oc-surface/50 p-6 backdrop-blur-sm"
                  >
                    <div className="text-3xl font-bold text-oc-cyan">{item.stat}</div>
                    <div className="mt-2 text-sm text-oc-cream-muted">{item.desc}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-8 text-lg text-oc-cream-muted">
                Legal AI: 284% ROI, payback &lt;6 months (Lexis+ Forrester). RAG: $26M annual savings, 73% less research time. Healthcare AI: 451% ROI, 50%+ less documentation. Privacy-first local hosting: 52–75% savings vs cloud.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-oc-cyan transition-all hover:gap-3">
                See what we can build
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What You Get — Concrete deliverables */}
      <section className="section container-custom">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold text-oc-cream md:text-4xl lg:text-5xl">
              What you get
            </h2>
            <p className="mt-4 text-lg text-oc-cream-muted">
              Concrete deliverables. No fluff. Clear timeline.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Privacy & Local AI',
              desc: 'On-premise, air-gapped, or self-hosted. Use existing hardware. HIPAA, GDPR, SOC 2. Zero data leaves your network. 52–75% savings vs cloud.',
              icon: '🔒',
            },
            {
              title: 'OpenClaw Security',
              desc: 'Multi-layer sandboxing, credential vaults, network isolation. Fix ClawJacked, malicious plugins. Production in 7 days.',
              icon: '🛡️',
            },
            {
              title: 'Voice, RAG, Agents',
              desc: 'AI voice agents, RAG knowledge bases, customer service automation, coding copilots. We build what enterprises actually want.',
              icon: '🤖',
            },
            {
              title: 'Compliance & Monitoring',
              desc: 'SOC 2, GDPR, HIPAA audit trails. Real-time monitoring, incident response, ongoing support. We partner with you.',
              icon: '📊',
            },
          ].map((service, i) => (
            <ScrollReveal key={i} delay={0.1 * i}>
              <div className="card-hover group rounded-xl border border-oc-border bg-oc-surface/50 p-8 backdrop-blur-sm">
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="font-display text-xl font-bold text-oc-cream">{service.title}</h3>
                <p className="mt-2 text-oc-cream-muted">{service.desc}</p>
                <div className="mt-6">
                  <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-oc-cyan transition-all group-hover:gap-3">
                    Learn more
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-12 rounded-xl border border-oc-border bg-oc-surface/50 p-8 backdrop-blur-sm">
            <h3 className="font-display text-lg font-bold text-oc-cream">Tech stack</h3>
            <p className="mt-2 text-oc-cream-muted">
              Docker, Kubernetes, HashiCorp Vault, Prometheus/Grafana, audit logging. We use battle-tested tools and adapt to your environment.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Early Adopter Offer — Full section */}
      <section className="section border-y border-oc-border bg-oc-surface/30">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold text-oc-cream md:text-4xl lg:text-5xl">
                Join our launch cohort
              </h2>
              <p className="mt-4 text-lg text-oc-cream-muted">
                We&apos;re building our first 100 success stories by end of March 2026. Early adopters get more.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { title: 'Client #1–10', desc: '50% off first deployment + 90-day free monitoring' },
                { title: 'Client #11–50', desc: '30% off + priority support' },
                { title: 'Client #51–100', desc: '15% off + launch partner badge' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-oc-border bg-oc-surface/50 p-6 backdrop-blur-sm"
                >
                  <div className="font-display text-lg font-bold text-oc-cream">{item.title}</div>
                  <div className="mt-2 text-sm text-oc-cream-muted">{item.desc}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-8">
              <p className="text-center text-sm font-medium text-oc-cream">
                Risk reversal: 30-day money-back guarantee if we don&apos;t deliver.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex justify-center">
              <Link href="/book-audit" className="btn-primary text-lg">
                Book Free Audit — Start Now
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Story — Credibility */}
      <section className="section container-custom">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-oc-cream md:text-4xl">
              Why us
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-oc-cream-muted">
              Klarna saved $40M with customer service AI. Cursor is at $2B ARR. Voice agents get 391% ROI. We find people who've built this and get them to build yours. If it makes money, we can build it.
            </p>
            <p className="mt-4 text-oc-cream-muted">
              We have 0 clients. We're new. We're not hiding that. But we can access the people who've actually shipped these systems. That's what you're paying for.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/careers" className="text-sm font-medium text-oc-cyan hover:underline">
                Join our team
              </Link>
              <span className="text-oc-cream-muted">·</span>
              <Link href="/blog" className="text-sm font-medium text-oc-cyan hover:underline">
                Read our blog
              </Link>
              <span className="text-oc-cream-muted">·</span>
              <Link href="/services" className="text-sm font-medium text-oc-cyan hover:underline">
                See our services
              </Link>
              <span className="text-oc-cream-muted">·</span>
              <Link href="/contact" className="text-sm font-medium text-oc-cyan hover:underline">
                Get in touch
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="section container-custom">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-3xl font-bold text-oc-cream md:text-4xl lg:text-5xl">
              Want to talk?
            </h2>
            <p className="mt-4 text-lg text-oc-cream-muted">
              We'll figure out what you need and find people who can build it. No BS.
            </p>
            <div className="mt-10">
              <Link href="/book-audit" className="btn-primary text-lg">
                Book Free Consultation
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <p className="mt-4 text-sm text-oc-cream-muted">
              30-minute call · No credit card required · Instant calendar booking
            </p>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
