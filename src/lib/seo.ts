import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageSeoInput = {
  title: string;
  description: string;
  path: string; // e.g. "/migration-testing"
  noIndex?: boolean;
};

/**
 * Builds a consistent per-page Metadata object: unique title, description,
 * canonical URL, and Open Graph / Twitter tags. Call this from each page's
 * `export const metadata` (or `generateMetadata`) so every route gets unique,
 * accurate SEO metadata instead of the layout default being reused everywhere.
 */
export function buildPageMetadata({ title, description, path, noIndex }: PageSeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${siteConfig.url}/og-image.png`],
    },
  };
}

/** Minimal JSON-LD builders. Rendered via the StructuredData component. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github].filter(Boolean),
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: "Software Quality Assurance and Testing",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
