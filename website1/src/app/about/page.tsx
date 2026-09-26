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

import { CircularProcessGraph, type StrategyPillar } from "@/components/workflow/CircularProcessGraph";

const aboutPhilosophyPillars: StrategyPillar[] = [
  {
    id: "evidence-first",
    title: "Evidence Over Opinion",
    description: "Every single defect reported ships with traces, network logs, screenshots, and database state proofs.",
    position: "top-left",
    badge: "Truth",
  },
  {
    id: "behavior-focus",
    title: "Behavior Over Pixels",
    description: "We validate what software achieves for the business logic, not just superficial HTML/CSS alignment.",
    position: "mid-left",
    badge: "Functionality",
  },
  {
    id: "multi-layer-qa",
    title: "Full-Stack Verification",
    description: "Testing browser workflows, API payload contracts, and SQL backend transactions in tight coordination.",
    position: "bottom-left",
    badge: "Full-Stack",
  },
  {
    id: "engineering-led",
    title: "Engineering-Led AI",
    description: "AI accelerates discovery and test authoring, while rigorous QA engineering standards govern every run.",
    position: "top-right",
    badge: "Discipline",
  },
  {
    id: "zero-flake",
    title: "Zero-Flake Automation",
    description: "Self-healing locators and resilient selectors eliminate brittle scripts that break on routine UI releases.",
    position: "mid-right",
    badge: "Stability",
  },
  {
    id: "honest-maturity",
    title: "Transparent Maturity",
    description: "We label illustrative capabilities clearly and pride ourselves on technical honesty with our partners.",
    position: "bottom-right",
    badge: "Integrity",
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

      {/* Circular Philosophy & Engineering Pillars Diagram */}
      <Section tone="ocean" aria-labelledby="about-strategy-heading">
        <CircularProcessGraph
          sectionEyebrow="Engineering Philosophy"
          sectionTitle="OUR CORE STRATEGY & VALUES"
          sectionSubtitle="How disciplined QA engineering, evidence-backed verification, and intelligent AI combine to protect software releases."
          centerTitle="QAQuad"
          centerSubtitle="Core Values"
          pillars={aboutPhilosophyPillars}
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
          <div className="mt-16 pt-12 border-t border-slate-700/60">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Our Leadership</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-8 shadow-xl backdrop-blur-sm">
              <div className="flex-shrink-0">
                <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                  JD
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">John Doe</h4>
                <p className="text-cyan-400 font-medium">Founder & Head of QA Engineering</p>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  With over 15 years of experience leading QA automation for enterprise SaaS and logistics platforms, John founded QAQuad to bridge the gap between AI hype and rigorous, evidence-backed software testing.
                </p>
              </div>
            </div>
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
