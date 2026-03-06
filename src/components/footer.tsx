"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Twitter, Linkedin, Github } from "lucide-react";
import { useState } from "react";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/manifesto", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

const SOCIAL_LINKS = [
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com", label: "GitHub", Icon: Github },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer
      className="theme-footer border-t"
      style={{
        backgroundColor: "var(--theme-footer-bg)",
        borderColor: "var(--theme-border)",
      }}
    >
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-xl font-bold"
              style={{ color: "var(--theme-text)" }}
            >
              AI Agency
            </Link>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Enterprise-grade OpenClaw deployment and autonomous AI agents.
              Secure, compliant, production-ready.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--theme-text)" }}
            >
              Links
            </h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--theme-text)" }}
            >
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail size={14} style={{ color: "var(--theme-accent)" }} />
                <a
                  href="mailto:hello@aiagency.com"
                  className="transition-colors hover:opacity-80"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  hello@aiagency.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={14} style={{ color: "var(--theme-accent)" }} />
                <span style={{ color: "var(--theme-text-muted)" }}>
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={14} style={{ color: "var(--theme-accent)" }} />
                <span style={{ color: "var(--theme-text-muted)" }}>
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--theme-text)" }}
            >
              Newsletter
            </h4>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--theme-text-muted)" }}
            >
              Get updates on OpenClaw and AI security.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                disabled={status === "loading"}
                className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none transition-colors placeholder:opacity-60 focus:ring-2"
                style={{
                  backgroundColor: "var(--theme-surface-solid)",
                  borderColor: "var(--theme-border)",
                  color: "var(--theme-text)",
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: "var(--theme-cta-bg)",
                  color: "var(--theme-cta-text)",
                }}
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
            {status === "success" && (
              <p
                className="mt-2 text-xs"
                style={{ color: "var(--theme-accent)" }}
              >
                Thanks for subscribing!
              </p>
            )}
            {status === "error" && (
              <p
                className="mt-2 text-xs"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </div>

        {/* Bottom: Social + Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row md:pt-10" style={{ borderColor: "var(--theme-border)" }}>
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:opacity-80"
                style={{ color: "var(--theme-accent)" }}
                aria-label={s.label}
              >
                <s.Icon size={20} />
              </a>
            ))}
          </div>
          <p
            className="text-sm"
            style={{ color: "var(--theme-text-muted)" }}
          >
            © {new Date().getFullYear()} AI Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
