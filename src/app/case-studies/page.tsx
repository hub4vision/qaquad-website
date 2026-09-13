import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description: "Real case studies are coming soon. Here's the structure they'll follow once published.",
  path: "/case-studies",
});

const placeholderStructure = [
  { label: "Challenge", description: "The business and technical problem the customer faced before engaging us." },
  { label: "Approach", description: "Which services were used — AI functional testing, migration testing, automation, or a combination." },
  { label: "Findings", description: "A summary of what was discovered, evidence-backed and classified." },
  { label: "Outcome", description: "What changed for the customer's release process or confidence, described honestly." },
];

export default function CaseStudiesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />

      <Section tone="dark" className="pt-16 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Case studies" title="Coming soon" tone="dark" />
      </Section>

      <Section tone="muted" aria-labelledby="coming-soon-heading">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="info">Coming Soon</Badge>
          <h2 id="coming-soon-heading" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            We don't have published case studies yet
          </h2>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Rather than invent customer names, logos, or results, we're keeping this page honest until we have real,
            permissioned case studies to share. Here's the structure each case study will follow once published:
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {placeholderStructure.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-5 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-wide text-cyan-400">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        location="case_studies_page"
        title="Be one of our first published case studies"
        description="Early engagements get closer collaboration and, with your permission, a chance to be featured here."
      />
    </>
  );
}
