"use client";

import React from "react";

export type SchemaData = Record<string, unknown> | null;

type SEOProps = {
  /** Array of JSON-LD schema objects to render */
  schemas?: SchemaData[];
  /** Single schema object (convenience) */
  schema?: SchemaData;
};

/**
 * Renders JSON-LD structured data for SEO.
 * Use with Organization, Breadcrumbs, FAQ, Service, Article schemas.
 */
export function SEO({ schemas = [], schema }: SEOProps) {
  const items = schema ? [schema, ...schemas] : schemas;
  const validItems = items.filter((s): s is Record<string, unknown> => s != null && typeof s === "object");

  if (validItems.length === 0) return null;

  return (
    <>
      {validItems.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
