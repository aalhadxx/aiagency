/**
 * Schema.org JSON-LD generators for SEO
 */

import { getBaseUrl, SITE_CONFIG } from "./seo";

export function getOrganizationSchema() {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: baseUrl,
    description: SITE_CONFIG.description,
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
