import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: `Why ${siteConfig.name} exists, how we approach QA, and the engineering standards behind every engagement.`,
  path: "/about",
});

const principles = [
  {
    title: "Evidence over opinion",
    description: "Every defect we report ships with the screenshot, trace, API response, or database result that supports it.",
  },
  {
    title: "Behavior over pixels",
    description: "We test what an application does for the business, not just what it looks like.",
  },
  {
    title: "Honest about maturity",
    description: "We label demo and illustrative content clearly, and never claim a capability isn't real when it is, or is real when it isn't.",
  },
  {
    title: "Engineering-led, not generic AI",
    description: "AI accelerates discovery and generation — a structured engineering process, evidence, and human review govern every finding.",
  },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <SectionHeading
          as="h1"
          eyebrow="About us"
          title="A practical engineering partner for QA, not a generic AI agency"
          description="We built this company around a simple belief: releases should be validated against what the business actually needs the software to do — with evidence, not guesswork."
          tone="dark"
        />
      </Section>

      <Section tone="ocean" aria-labelledby="story-heading">
        <div className="mx-auto max-w-3xl space-y-6 text-slate-200">
          <h2 id="story-heading" className="text-2xl font-bold text-white sm:text-3xl">
            Why we exist
          </h2>
          <p className="leading-relaxed text-slate-300 text-lg">
            Manual regression testing doesn&apos;t scale with modern release cadence, and UI-only automation misses the
            defects that hurt the most — a calculation that&apos;s quietly wrong, a status that never updates in the
            database, a business rule that got lost in a migration. We combine AI-assisted application discovery
            with disciplined engineering practice — Playwright, API, and database validation — to catch those
            defects before your customers do.
          </p>
          <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-5 backdrop-blur-sm">
            <p className="leading-relaxed text-slate-300 text-base">
              This is a new company. We don&apos;t yet have published case studies or customer testimonials to share, and
              we&apos;d rather say that plainly than invent them — see our{" "}
              <a href="/case-studies" className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                Case Studies
              </a>{" "}
              page for what&apos;s coming.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="violet" aria-labelledby="principles-heading">
        <SectionHeading id="principles-heading" eyebrow="How we work" title="Our principles" tone="dark" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {principles.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <h3 className="font-bold text-lg text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection location="about_page" />
    </>
  );
}
