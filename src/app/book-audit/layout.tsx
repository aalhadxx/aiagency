import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SEO } from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Free OpenClaw Security Audit | 30-Min Consultation",
  description:
    "Book a free 30-minute OpenClaw security audit. Get vulnerability assessment, prioritized action plan, and our 47-point Security Checklist. No commitment.",
  path: "/book-audit",
});

export default function BookAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SEO schema={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Book Audit", url: "/book-audit" }])} />
      {children}
    </>
  );
}
