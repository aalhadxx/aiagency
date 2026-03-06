/**
 * Schema.org JSON-LD generators for SEO - MAXED for rich snippets + AI citations
 */

import { getBaseUrl, SITE_CONFIG } from "./seo";

export function getOrganizationSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: SITE_CONFIG.name,
    url: baseUrl,
    description: SITE_CONFIG.longDescription,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${baseUrl}/contact`,
      availableLanguage: "English",
      areaServed: "Worldwide",
      email: "contact@aiagency.com",
    },
    knowsAbout: [
      "Customer Service AI",
      "AI Code Generation",
      "AI Voice Agents",
      "RAG Knowledge Bases",
      "Legal AI",
      "Healthcare AI",
      "Privacy-First Local AI",
      "OpenClaw Security",
      "AI Implementation",
      "Enterprise AI Deployment",
      "HIPAA Compliant AI",
      "GDPR Compliant AI",
      "On-Premise AI",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
      bestRating: "5",
    },
  };
}

export function getWebSiteSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getProfessionalServiceSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.longDescription,
    url: baseUrl,
    serviceType: "AI Implementation",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Agency Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Customer Service AI",
            description: "Klarna-style AI: $40M savings, 700 FTEs replaced, 82% faster resolution",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Code Generation",
            description: "Cursor-style: $2B ARR, 55% faster development, 84% more successful builds",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Voice Agents",
            description: "391% ROI, payback <6 months, $10.3M saved over 3 years",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Legal AI",
            description: "284% ROI, payback <6 months, contract review and risk analysis",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Healthcare AI (HIPAA)",
            description: "451% ROI, 50%+ less documentation time, clinical notes automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Privacy-First Local AI",
            description: "On-premise, self-hosted. 52-75% savings vs cloud. GDPR/HIPAA compliant",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "RAG Knowledge Bases",
            description: "$26M annual savings, 73% less research time, document automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "OpenClaw Security",
            description: "Secure deployment, fix ClawJacked, SOC 2-ready in 7 days",
          },
        },
      ],
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

export function getServiceSchema(data: {
  name: string;
  description: string;
  url?: string;
  priceRange?: string;
}) {
  const baseUrl = getBaseUrl();
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    areaServed: "Worldwide",
  };
  if (data.url) {
    schema.url = data.url.startsWith("http") ? data.url : `${baseUrl}${data.url}`;
  }
  if (data.priceRange) {
    schema.offers = {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceRange: data.priceRange,
      },
    };
  }
  return schema;
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(data: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  url?: string;
  imageUrl?: string;
}) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    author: {
      "@type": "Person",
      name: data.author,
    },
    datePublished: data.datePublished,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    ...(data.url && { url: data.url.startsWith("http") ? data.url : `${baseUrl}${data.url}` }),
    ...(data.imageUrl && {
      image: {
        "@type": "ImageObject",
        url: data.imageUrl.startsWith("http") ? data.imageUrl : `${baseUrl}${data.imageUrl}`,
      },
    }),
  };
}
