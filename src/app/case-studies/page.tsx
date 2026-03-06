import Link from "next/link";
import { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import { createPageMetadata } from "@/lib/metadata";
import { SEO } from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/schema";
import { Button } from "@/components/ui";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies | OpenClaw AI Security Deployments",
  description:
    "Real results from enterprises that deployed OpenClaw safely. FinTech, SaaS, Data & Analytics—see how we deliver SOC 2 compliance, 3x ROI, and zero incidents.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
  ]);

  return (
    <main className="min-h-screen bg-oc-bg text-oc-cream">
      <SEO schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-oc-cyan mb-4">
              Case Studies
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Real results from real deployments
            </h1>
            <p className="text-xl text-oc-cream-muted max-w-2xl">
              Enterprises that deployed OpenClaw safely with our help. From exposed instances to SOC 2-ready infrastructure in weeks.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.id} delay={0.1}>
                <article className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                  <div className="lg:col-span-5">
                    <div className="text-oc-cyan font-bold text-sm tracking-widest mb-2">
                      {study.industry}
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                      {study.title}
                    </h2>
                    <p className="text-oc-cream-muted text-lg mb-6">
                      {study.client}
                    </p>
                    {study.metric && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-oc-cyan/10 border border-oc-cyan/20">
                        <span className="text-oc-cyan font-bold text-2xl">
                          {study.metric}
                        </span>
                        <span className="text-oc-cream-muted text-sm">
                          key result
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-7 space-y-8">
                    <div>
                      <h3 className="font-display text-lg font-bold text-oc-cream mb-3">
                        The Challenge
                      </h3>
                      <p className="text-oc-cream-muted leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-oc-cream mb-3">
                        Our Solution
                      </h3>
                      <p className="text-oc-cream-muted leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-oc-cream mb-3">
                        Results
                      </h3>
                      <ul className="space-y-3">
                        {study.results.map((result, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-oc-cream-muted"
                          >
                            <Check className="w-5 h-5 text-oc-cyan flex-shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
                {index < caseStudies.length - 1 && (
                  <div className="mt-24 border-t border-white/10" />
                )}
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
              Ready for similar results?
            </h2>
            <p className="text-oc-cream-muted text-lg max-w-xl mx-auto mb-10">
              Book a free 30-minute audit. We'll assess your setup and show you exactly how to deploy safely.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/book-audit" variant="primary" size="lg" className="group">
                Book Free Audit
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Get a Quote
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
