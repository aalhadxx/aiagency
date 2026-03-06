import { getPosts } from "@/lib/blog";
import { HomePageGlass } from "@/components/HomePageGlass";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import { SEO } from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Enterprise-Grade OpenClaw | Secure AI Agent Deployment",
  description:
    "Deploy OpenClaw safely for enterprise. Security hardening, autonomous AI agents, SOC 2 compliance—production-ready in 7 days. Book a free security audit.",
  path: "/",
});

export default function Home() {
  const posts = getPosts();

  return (
    <>
      <SEO schema={getBreadcrumbSchema([{ name: "Home", url: "/" }])} />
      <HomePageGlass posts={posts} />
    </>
  );
}
