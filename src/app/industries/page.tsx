import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { industries } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Industries",
  description:
    "AI-powered QA automation for travel technology, SaaS, ERP/CRM, logistics, e-commerce, and other business-critical applications.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <SectionHeading
          as="h1"
          eyebrow="Who we work with"
          title="Built for real business applications, not demo apps"
          description="Every industry below has its own functional risk profile. We tailor discovery and test scenarios to the workflows that actually matter to your business."
          tone="dark"
        />
      </Section>

      <Section aria-labelledby="industries-grid-heading">
        <h2 id="industries-grid-heading" className="sr-only">
          Industries we serve
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.name} industry={industry} />
          ))}
        </div>
      </Section>

      <CTASection location="industries_page" />
    </>
  );
}
