import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/ai-qa-automation", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/migration-testing", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/test-automation", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/ai-qa-agent", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/industries", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/case-studies", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/resources", priority: 0.4, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.4, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
