import { SEO } from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/schema";

export default function ManifestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SEO schema={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/manifesto" }])} />
      {children}
    </>
  );
}
