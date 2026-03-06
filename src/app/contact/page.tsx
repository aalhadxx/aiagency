"use client";

import { useState } from "react";
import Link from "next/link";
import { trackConversion } from "@/lib/analytics";
import { Button, Input, Textarea, Select } from "@/components/ui";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Check } from "lucide-react";
import { clients } from "@/data/clients";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
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
    if (!formData.service) next.service = "Please select a service";
    if (!formData.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      trackConversion.contactFormSubmitted(formData.service);
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
            Thanks for reaching out!
          </h1>
          <p className="text-oc-cream-muted mb-8">
            We'll get back to you within 24 hours. Check your email for confirmation.
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
          {/* Left: Form — minimal friction */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="text-sm font-medium tracking-widest uppercase text-oc-cyan mb-4">
                Contact
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
                Let's talk strategy
              </h1>
              <p className="text-lg text-oc-cream-muted mb-12">
                Tell us about your requirements. We'll respond within 24 hours.
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
                    Company <span className="text-oc-cream-muted/70">(optional)</span>
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-oc-cream-muted mb-2">
                    Service *
                  </label>
                  <Select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    error={!!errors.service}
                  >
                    <option value="">Select a service...</option>
                    <option value="deployment">Secure OpenClaw Deployment</option>
                    <option value="agents">Custom Autonomous Agents</option>
                    <option value="audit">Security Audit & Remediation</option>
                    <option value="managed">Managed Service</option>
                    <option value="consultation">General Consultation</option>
                  </Select>
                  {errors.service && (
                    <p className="mt-1 text-sm text-oc-coral">{errors.service}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-oc-cream-muted mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What are you trying to achieve?"
                    error={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-oc-coral">{errors.message}</p>
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
                  {loading ? "Sending..." : "Send Message"}
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
                <h3 className="font-display font-bold text-oc-cream mb-3">
                  Prefer email?
                </h3>
                <a
                  href="mailto:contact@aiagency.com"
                  className="text-oc-cyan hover:underline"
                >
                  contact@aiagency.com
                </a>
                <p className="text-oc-cream-muted text-sm mt-2">
                  Mon–Fri 9am–6pm EST
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
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

            <ScrollReveal delay={0.4}>
              <div className="p-6 rounded-xl border border-oc-cyan/20 bg-oc-cyan/5">
                <h3 className="font-display font-bold text-oc-cream mb-2">
                  Need a quick answer?
                </h3>
                <p className="text-oc-cream-muted text-sm mb-4">
                  Book a free 30-minute audit for immediate guidance.
                </p>
                <Button href="/book-audit" variant="primary" size="md">
                  Book Free Audit
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
