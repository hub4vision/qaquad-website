import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing",
  description: "Indicative starting packages for AI QA assessment, automation, and migration testing engagements.",
  path: "/pricing",
});

const packages = [
  {
    name: "AI QA Assessment",
    target: "Indicative starting target: ₹25K–₹50K",
    includes: ["Application discovery", "Coverage assessment", "Sample test scenarios", "Sample findings with evidence"],
  },
  {
    name: "QA Automation",
    target: "Indicative starting target: ₹75K–₹2L+",
    includes: ["Playwright + API + database automation", "Regression suite build-out", "Evidence-backed reporting"],
  },
  {
    name: "Migration QA",
    target: "Indicative starting target: ₹2L–₹5L+",
    includes: ["Old/new functional baseline", "Migration gap analysis", "Evidence for every finding", "Regression handoff"],
  },
  {
    name: "Managed QA Automation",
    target: "Custom monthly",
    includes: ["Continuous regression execution", "Suite maintenance", "Release-by-release reporting", "Ongoing support"],
  },
];

export default function PricingPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />

      <Section tone="dark" className="pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Packages"
          title="Transparent starting packages, scoped to your assessment"
          description="Pricing is an initial business-planning target, not a market guarantee. Final pricing follows a short discovery call."
          tone="dark"
        />
      </Section>

      <Section aria-labelledby="packages-heading">
        <h2 id="packages-heading" className="sr-only">
          Packages
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <div key={pkg.name} className="flex flex-col rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <Badge tone="info">Indicative</Badge>
              <h3 className="mt-4 text-lg font-bold text-white">{pkg.name}</h3>
              <p className="mt-1 text-sm text-cyan-300 font-medium">{pkg.target}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-300">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-400">
          Figures above are placeholder business-planning targets for India-market launch, not a quote. Replace with
          final commercial pricing after customer discovery, and add currency/region variants as you expand.
        </p>
      </Section>

      <CTASection location="pricing_page" title="Get a scoped quote for your application" />
    </>
  );
}
