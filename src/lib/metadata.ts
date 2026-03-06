import type { Metadata } from "next";
import { getCanonicalUrl, SITE_CONFIG } from "./seo";

export type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogImageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path = "",
    ogImage,
    ogImageAlt,
    type = "website",
    publishedTime,
    authors,
    noIndex,
  } = options;

  const canonical = getCanonicalUrl(path || "/");
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  const imagePath = ogImage || SITE_CONFIG.defaultOgImage;
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${base}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt || title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };

  if (type === "article" && (publishedTime || authors)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      publishedTime,
      authors: authors || [],
    };
  }

  return metadata;
}
