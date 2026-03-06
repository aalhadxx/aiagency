import { basehub } from "basehub";
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { AnalyticsProvider } from "@/lib/analytics";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SITE_CONFIG } from "@/lib/seo";
import { SEO } from "@/components/SEO";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getProfessionalServiceSchema,
} from "@/lib/schema";
import { getFactsSchema } from "@/lib/aeo-helpers";
import { WebVitals } from "@/components/performance/WebVitals";
import { ErrorBoundary } from "@/components/performance/ErrorBoundary";
import "@/basehub.config";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const generateMetadata = async (): Promise<Metadata> => {
  try {
    const data = await basehub().query({
      settings: {
        metadata: {
          titleTemplate: true,
          defaultTitle: true,
          defaultDescription: true,
          favicon: {
            url: true,
          },
          ogImage: {
            url: true,
          },
        },
      },
    });

    return {
      metadataBase: new URL(SITE_CONFIG.url),
      title: {
        template: data.settings.metadata.titleTemplate || "%s | AI Agency",
        default: data.settings.metadata.defaultTitle || "Enterprise-Grade OpenClaw | AI Agency",
      },
      description:
        data.settings.metadata.defaultDescription ||
        "Secure OpenClaw deployment and autonomous AI agents for enterprise",
      icons: {
        icon: data.settings.metadata.favicon.url,
      },
      openGraph: {
        images: [data.settings.metadata.ogImage.url],
        siteName: SITE_CONFIG.name,
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        images: [data.settings.metadata.ogImage.url],
        creator: SITE_CONFIG.twitterHandle,
      },
    };
  } catch {
    // Fallback if BaseHub is not configured - MAXED SEO
    const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");
    const ogImage = `${baseUrl}/og-default.png`;
    return {
      metadataBase: new URL(baseUrl),
      title: {
        default: "We Implement AI Solutions | AI Agency — $40M Saved, 391% ROI, 284% ROI",
        template: "%s | AI Agency",
      },
      description: SITE_CONFIG.description,
      keywords: SITE_CONFIG.keywords,
      authors: [{ name: "AI Agency", url: baseUrl }],
      creator: "AI Agency",
      publisher: "AI Agency",
      formatDetection: { email: false, address: false, telephone: false },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: baseUrl,
        siteName: SITE_CONFIG.name,
        title: "OpenClaw Security & Deployment | AI Agency",
        description: SITE_CONFIG.description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: "AI Agency - We Implement AI Solutions: $40M Saved, 391% ROI, 284% ROI",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        creator: SITE_CONFIG.twitterHandle,
        title: "We Implement AI Solutions | $40M Saved, 391% ROI | AI Agency",
        description: SITE_CONFIG.description,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      },
      alternates: { canonical: baseUrl },
    };
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth ${syne.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <SEO
            schemas={[
              getOrganizationSchema(),
              getWebSiteSchema(),
              getProfessionalServiceSchema(),
              getFactsSchema(),
            ]}
          />
          <AnalyticsProvider>
            <ErrorBoundary>
              <Navigation />
              <main>{children}</main>
              <Footer />
              <WebVitals />
            </ErrorBoundary>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
