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

import { CircularProcessGraph, type StrategyPillar } from "@/components/workflow/CircularProcessGraph";

const industryStrategyPillars: StrategyPillar[] = [
  {
    id: "travel-tech",
    title: "Travel Technology",
    description: "Multi-currency checkout, GDS flight integrations, fare tier logic, and booking engines.",
    position: "top-left",
    badge: "High Complexity",
  },
  {
    id: "saas-platforms",
    title: "SaaS & Cloud Platforms",
    description: "Multi-tenant tenant isolation, RBAC permissions, and recurring subscription payment gates.",
    position: "mid-left",
    badge: "Cloud Scale",
  },
  {
    id: "logistics",
    title: "Supply Chain & Logistics",
    description: "Real-time dispatch status tracking, barcode scanners, and warehouse inventory sync.",
    position: "bottom-left",
    badge: "Operations",
  },
  {
    id: "erp-crm",
    title: "ERP & CRM Systems",
    description: "Interconnected accounts, ledger journals, quotation workflows, and tax calculation audits.",
    position: "top-right",
    badge: "Enterprise",
  },
  {
    id: "ecommerce",
    title: "E-Commerce & Retail",
    description: "Basket calculation, promotional coupon engines, payment gateways, and stock reservation.",
    position: "mid-right",
    badge: "High Velocity",
  },
  {
    id: "custom-apps",
    title: "Custom Enterprise Apps",
    description: "Legacy desktop-to-web conversions, internal portals, and bespoke operational workflows.",
    position: "bottom-right",
    badge: "Custom Logic",
  },
];

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

      {/* Circular Domain Testing Strategy Diagram */}
      <Section tone="ocean" aria-labelledby="industry-strategy-heading">
        <CircularProcessGraph
          sectionEyebrow="Domain-Specific Engineering"
          sectionTitle="INDUSTRY VALIDATION STRATEGY"
          sectionSubtitle="Targeted automation testing adapted to the unique regulatory, transactional, and architectural challenges of each sector."
          centerTitle="QAQuad"
          centerSubtitle="Domain Core"
          pillars={industryStrategyPillars}
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
