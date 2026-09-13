import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources",
  description: "Guides and educational content on AI QA automation, Playwright, migration testing, and regression automation — coming soon.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />

      <Section tone="dark" className="pt-16 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Resources" title="Coming soon" tone="dark" />
      </Section>

      <Section tone="muted" aria-labelledby="resources-heading">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="info">Coming Soon</Badge>
          <h2 id="resources-heading" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Guides and educational content
          </h2>
          <p className="mt-3 text-slate-300 leading-relaxed">
            We're building out practical guides on AI QA automation, Playwright test design, migration testing, and
            regression automation. In the meantime, see the{" "}
            <Link href="/blog" className="font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
              Blog
            </Link>{" "}
            for initial topics, or{" "}
            <Link href="/how-it-works" className="font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
              How It Works
            </Link>{" "}
            for our delivery process.
          </p>
        </div>
      </Section>
    </>
  );
}
