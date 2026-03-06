import { basehub } from "basehub";
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { AnalyticsProvider } from "@/lib/analytics";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SITE_CONFIG } from "@/lib/seo";
import { SEO } from "@/components/SEO";
import { getOrganizationSchema } from "@/lib/schema";
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
    // Fallback if BaseHub is not configured
    return {
      metadataBase: new URL(SITE_CONFIG.url),
      title: "Enterprise-Grade OpenClaw | AI Agency",
      description: "Secure OpenClaw deployment and autonomous AI agents for enterprise",
      openGraph: { siteName: SITE_CONFIG.name, locale: "en_US" },
      twitter: { card: "summary_large_image", creator: SITE_CONFIG.twitterHandle },
    };
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <SEO schema={getOrganizationSchema()} />
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
