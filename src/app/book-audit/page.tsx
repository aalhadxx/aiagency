"use client";

import { useState } from "react";
import Link from "next/link";
import { trackConversion } from "@/lib/analytics";
import { Button, Input, Select } from "@/components/ui";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Check } from "lucide-react";
import { clients } from "@/data/clients";

const WHAT_TO_EXPECT = [
  { step: 1, title: "Book", desc: "Fill out the form. We'll confirm within 1 hour." },
  { step: 2, title: "Prep", desc: "We'll send a short prep checklist (5 min)." },
  { step: 3, title: "Call", desc: "30-min video call to assess your setup." },
  { step: 4, title: "Report", desc: "Get a prioritized action plan within 48 hours." },
];

export default function BookAuditPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    currentSetup: "",
    timeline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Enter a valid email";
    if (!formData.company.trim()) next.company = "Company is required";
    if (!formData.currentSetup) next.currentSetup = "Please select your current setup";
    if (!formData.timeline) next.timeline = "Please select a timeline";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      trackConversion.auditBooked(formData.company, formData.timeline);
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-oc-bg text-oc-cream flex items-center justify-center p-6">
        <div className="max-w-md w-full p-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-oc-cyan/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-oc-cyan" />
          </div>
          <h1 className="font-display text-2xl font-bold text-oc-cream mb-4">
            Audit Booked!
          </h1>
          <p className="text-oc-cream-muted mb-8">
            Check your email for calendar invite and preparation checklist. We'll see you soon!
          </p>
          <Button href="/" variant="primary" size="md">
            Back to Home
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-oc-bg text-oc-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Form — minimal fields */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-oc-cyan/30 bg-oc-cyan/10 mb-8">
                <span className="text-sm font-medium text-oc-cyan">
                  100% Free · No Commitment
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
                Free OpenClaw Security Audit
              </h1>
              <p className="text-lg text-oc-cream-muted mb-12">
                30-minute consultation where we'll assess your AI infrastructure and identify vulnerabilities before they become incidents.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-oc-cream-muted mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    error={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-oc-coral">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-oc-cream-muted mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    error={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-oc-coral">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-oc-cream-muted mb-2">
                    Company *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    error={!!errors.company}
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-oc-coral">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="currentSetup" className="block text-sm font-medium text-oc-cream-muted mb-2">
                    Current Setup *
                  </label>
                  <Select
                    id="currentSetup"
                    name="currentSetup"
                    required
                    value={formData.currentSetup}
                    onChange={handleChange}
                    error={!!errors.currentSetup}
                  >
                    <option value="">Select...</option>
                    <option value="running">Already running OpenClaw</option>
                    <option value="planning">Planning to deploy</option>
                    <option value="evaluating">Evaluating options</option>
                    <option value="other">Other AI automation</option>
                  </Select>
                  {errors.currentSetup && (
                    <p className="mt-1 text-sm text-oc-coral">
                      {errors.currentSetup}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-oc-cream-muted mb-2">
                    Timeline *
                  </label>
                  <Select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    error={!!errors.timeline}
                  >
                    <option value="">Select...</option>
                    <option value="urgent">Urgent (ASAP)</option>
                    <option value="soon">Within 2 weeks</option>
                    <option value="month">Within a month</option>
                    <option value="exploring">Just exploring</option>
                  </Select>
                  {errors.timeline && (
                    <p className="mt-1 text-sm text-oc-coral">{errors.timeline}</p>
                  )}
                </div>

                {submitError && (
                  <p className="text-sm text-oc-coral bg-oc-coral/10 rounded-lg px-4 py-2">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                >
                  {loading ? "Submitting..." : "Book My Free Audit"}
                </Button>

                <p className="text-xs text-oc-cream-muted text-center">
                  We'll only use your info to respond. No spam, ever.
                </p>
              </form>
            </ScrollReveal>
          </div>

          {/* Right: Trust signals */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="font-display font-bold text-oc-cream mb-4">
                  What to Expect
                </h3>
                <div className="space-y-6">
                  {WHAT_TO_EXPECT.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-oc-cyan/20 flex items-center justify-center text-oc-cyan font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-oc-cream">{item.title}</h4>
                        <p className="text-sm text-oc-cream-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="font-display font-bold text-oc-cream mb-3">
                  What We'll Review
                </h3>
                <ul className="space-y-2 text-sm text-oc-cream-muted">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                    Network exposure and firewall config
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                    Credential storage and secrets
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                    Plugin security and malicious code
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                    Tool permissions and sandboxing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                    Logging and audit trails
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-oc-cyan flex-shrink-0" />
                    Compliance gaps (SOC 2, GDPR)
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="p-6 rounded-xl border border-oc-cyan/20 bg-oc-cyan/5">
                <h3 className="font-display font-bold text-oc-cream mb-2">
                  Bonus: Free Security Checklist
                </h3>
                <p className="text-oc-cream-muted text-sm">
                  Everyone who books gets our 47-point OpenClaw Security Checklist (normally $299).
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-xs font-semibold text-oc-cream-muted uppercase tracking-wider mb-4">
                  Trusted by
                </h3>
                <div className="flex flex-wrap gap-3">
                  {clients.slice(0, 6).map((client) => (
                    <span
                      key={client.id}
                      className="text-oc-cream-muted text-sm font-medium px-3 py-1.5 rounded-lg bg-white/5"
                    >
                      {client.name}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
