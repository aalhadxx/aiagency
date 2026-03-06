import Link from "next/link";
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SEO } from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/schema";
import { Button } from "@/components/ui";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Check } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing | OpenClaw AI Security Agency",
  description:
    "Clear pricing for OpenClaw security services. Security audit from $2K, secure deployment from $5K, custom agents from $3K. No surprises.",
  path: "/pricing",
});

const TIERS = [
  {
    name: "Starter",
    price: "From $2,000",
    desc: "Security audit and remediation",
    bestFor: "Teams already running OpenClaw",
    features: [
      "Vulnerability assessment",
      "Fix exposed instances",
      "Plugin security vetting",
      "Prioritized remediation roadmap",
      "90-day re-assessment",
    ],
    cta: "Book Free Audit",
    href: "/book-audit",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "From $5,000",
    desc: "Secure OpenClaw deployment",
    bestFor: "Teams planning to deploy",
    features: [
      "Network isolation & firewall",
      "Credential vault integration",
      "Audit logging (90-365 days)",
      "SOC 2-ready documentation",
      "7-day implementation",
      "30-day post-deployment support",
    ],
    cta: "Get Started",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Full suite + managed service",
    bestFor: "Teams scaling AI automation",
    features: [
      "Everything in Professional",
      "Custom autonomous agents",
      "Multi-agent orchestration",
      "24/7 managed service",
      "Dedicated engineer",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

const COMPARISON = [
  {
    feature: "Security audit",
    Starter: true,
    Professional: false,
    Enterprise: true,
  },
  {
    feature: "Secure deployment",
    Starter: false,
    Professional: true,
    Enterprise: true,
  },
  {
    feature: "Custom agents",
    Starter: false,
    Professional: false,
    Enterprise: true,
  },
  {
    feature: "Managed service",
    Starter: false,
    Professional: false,
    Enterprise: true,
  },
  {
    feature: "SOC 2 documentation",
    Starter: false,
    Professional: true,
    Enterprise: true,
  },
  {
    feature: "7-day implementation",
    Starter: false,
    Professional: true,
    Enterprise: true,
  },
];

export default function PricingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ]);

  return (
    <main className="min-h-screen bg-oc-bg text-oc-cream">
      <SEO schema={breadcrumbSchema} />

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-oc-cyan mb-4">
              Pricing
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Clear tiers. No surprises.
            </h1>
            <p className="text-xl text-oc-cream-muted max-w-2xl mx-auto">
              Start with a free audit or jump straight to deployment. We'll help you choose the right tier.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {TIERS.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.1}>
                <div
                  className={`p-8 rounded-xl border h-full flex flex-col ${
                    tier.highlighted
                      ? "border-oc-cyan/40 bg-oc-cyan/5"
                      : "border-white/10 bg-white/5 backdrop-blur-xl"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="inline-block w-fit text-xs font-semibold uppercase tracking-wider text-oc-cyan mb-4">
                      Most Popular
                    </span>
                  )}
                  <h2 className="font-display text-2xl font-bold text-oc-cream mb-2">
                    {tier.name}
                  </h2>
                  <div className="text-oc-cyan font-bold text-3xl mb-2">
                    {tier.price}
                  </div>
                  <p className="text-oc-cream-muted text-sm mb-4">{tier.desc}</p>
                  <p className="text-oc-cream-muted text-xs mb-6">
                    Best for: {tier.bestFor}
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                        <span className="text-oc-cream-muted">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={tier.href}
                    variant={tier.highlighted ? "primary" : "outline"}
                    size="lg"
                    className="w-full justify-center"
                  >
                    {tier.cta}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
              Compare plans
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-semibold text-oc-cream">
                      Feature
                    </th>
                    <th className="text-left p-4 font-semibold text-oc-cream">
                      Starter
                    </th>
                    <th className="text-left p-4 font-semibold text-oc-cyan">
                      Professional
                    </th>
                    <th className="text-left p-4 font-semibold text-oc-cream">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="p-4 text-oc-cream-muted">{row.feature}</td>
                      <td className="p-4">
                        {row.Starter ? (
                          <Check className="w-5 h-5 text-oc-cyan" />
                        ) : (
                          <span className="text-oc-cream-muted/50">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        {row.Professional ? (
                          <Check className="w-5 h-5 text-oc-cyan" />
                        ) : (
                          <span className="text-oc-cream-muted/50">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        {row.Enterprise ? (
                          <Check className="w-5 h-5 text-oc-cyan" />
                        ) : (
                          <span className="text-oc-cream-muted/50">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Not sure which tier?
            </h2>
            <p className="text-oc-cream-muted text-lg max-w-xl mx-auto mb-10">
              Book a free 30-minute audit. We'll assess your setup and recommend the right service—no commitment.
            </p>
            <Button href="/book-audit" variant="primary" size="lg">
              Book Free Audit
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
