import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SEO } from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us | Get a Custom OpenClaw Implementation Quote",
  description:
    "Tell us about your AI automation needs. Get a custom implementation plan, pricing, and expert guidance. We respond within 24 hours.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SEO schema={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])} />
      {children}
    </>
  );
}
