import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { CircularProcessGraph, type StrategyPillar } from "@/components/workflow/CircularProcessGraph";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Free QA Assessment",
  description:
    "Tell us about your application and testing needs. We'll review your requirement and get back to you with next steps for a free QA assessment.",
  path: "/contact",
});

const assessmentPillars: StrategyPillar[] = [
  {
    id: "confidentiality-pact",
    title: "SOC2-Aligned NDA",
    description: "Strict non-disclosure agreements executed before receiving any application credentials or schemas.",
    position: "top-left",
    badge: "Confidentiality",
  },
  {
    id: "least-privilege-env",
    title: "Isolated Staging",
    description: "We work exclusively within non-production, sandboxed staging environments with dummy test accounts.",
    position: "mid-left",
    badge: "Security",
  },
  {
    id: "exploratory-discovery",
    title: "AI Journey Discovery",
    description: "Multi-agent autonomous exploration across high-traffic user journeys to detect undocumented business flows.",
    position: "bottom-left",
    badge: "Discovery",
  },
  {
    id: "findings-report",
    title: "Executive Findings Report",
    description: "Comprehensive initial report with real defect evidence, trace logs, and actionable coverage hotspots.",
    position: "top-right",
    badge: "Free Deliverable",
  },
  {
    id: "playwright-blueprint",
    title: "Automation Blueprint",
    description: "A tailored Playwright automation roadmap and locator strategy presented to your engineering leads.",
    position: "mid-right",
    badge: "Roadmap",
  },
  {
    id: "zero-obligation",
    title: "Zero Obligation",
    description: "No retainers or upfront financial commitment. Use the findings and recommendations however you see fit.",
    position: "bottom-right",
    badge: "Risk-Free",
  },
];

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              as="h1"
              eyebrow="Get started"
              title="Book a Free QA Assessment"
              description="Share a few details about your application and current QA process. We'll review your requirement and contact you shortly with next steps."
              tone="dark"
            />
            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <p>
                Prefer email? Reach us directly at{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
              <p>
                Your test data and credentials are handled securely — we never ask for production credentials or
                store secrets outside of least-privilege, purpose-scoped access. See our{" "}
                <a href="/privacy" className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-[#0f172a] p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      {/* Circular Free Assessment Strategy Diagram */}
      <Section tone="ocean" aria-labelledby="assessment-strategy-heading">
        <CircularProcessGraph
          sectionEyebrow="Safe & Transparent"
          sectionTitle="OUR ASSESSMENT STRATEGY"
          sectionSubtitle="A seamless, zero-risk pathway to discovering hidden functional gaps, measuring test coverage, and reviewing empirical bug evidence."
          centerTitle="QAQuad"
          centerSubtitle="Assessment"
          pillars={assessmentPillars}
        />
      </Section>
    </>
  );
}
