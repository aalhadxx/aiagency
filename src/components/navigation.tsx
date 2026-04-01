"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/manifesto", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="theme-nav sticky top-0 z-[100] w-full border-b backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundColor: "var(--oc-surface)",
        backdropFilter: `blur(20px)`,
        WebkitBackdropFilter: `blur(20px)`,
        borderColor: "var(--oc-border)",
      }}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 py-6 md:h-20 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight md:text-2xl"
          style={{ color: "var(--theme-text)" }}
          onClick={() => setMobileOpen(false)}
        >
          AI Agency
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{ color: "var(--theme-text)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop: Theme + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeSwitcher />
          <Link
            href="/book-audit"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: "var(--theme-cta-bg)",
              color: "var(--theme-cta-text)",
            }}
          >
            Book Audit
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2"
            style={{ color: "var(--theme-text)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="theme-nav-mobile absolute left-0 right-0 top-full border-b md:hidden"
          style={{
            backgroundColor: "var(--theme-nav-bg)",
            backdropFilter: `blur(var(--theme-nav-blur))`,
            borderColor: "var(--theme-border)",
          }}
        >
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  pathname === link.href ? "opacity-100" : "opacity-80"
                }`}
                style={{ color: "var(--theme-text)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-audit"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg px-4 py-3 text-center text-sm font-semibold"
              style={{
                backgroundColor: "var(--theme-cta-bg)",
                color: "var(--theme-cta-text)",
              }}
            >
              Book Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
