import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

import { CircularProcessGraph, type StrategyPillar } from "@/components/workflow/CircularProcessGraph";
import { WorkflowDiagram } from "@/components/workflow/WorkflowDiagram";
import type { WorkflowStep } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing & Engagement Strategy",
  description: "Indicative starting packages and transparent onboarding workflow for AI QA assessment, automation, and migration testing.",
  path: "/pricing",
});

const pricingStrategyPillars: StrategyPillar[] = [
  {
    id: "zero-risk-discovery",
    title: "Zero-Risk Discovery",
    description: "Free initial assessment and scoping call with zero financial commitment before contract kickoff.",
    position: "top-left",
    badge: "Free Scope",
  },
  {
    id: "fixed-scope-delivery",
    title: "Predictable Costing",
    description: "Milestone-backed, transparent pricing with clear scope boundaries to prevent runaway contractor hours.",
    position: "mid-left",
    badge: "Predictable",
  },
  {
    id: "turnkey-handoff",
    title: "Turnkey IP Ownership",
    description: "All generated Playwright code, test repositories, and pipeline configs belong entirely to your team.",
    position: "bottom-left",
    badge: "100% IP",
  },
  {
    id: "evidence-backed-slas",
    title: "Evidence-Backed SLAs",
    description: "Every finding and test suite deliverable ships with timestamped execution traces, video diffs, and DB logs.",
    position: "top-right",
    badge: "Full Evidence",
  },
  {
    id: "rapid-onboarding",
    title: "48-Hour Onboarding",
    description: "Fast-track access setup with read-only credentials and least-privilege tokens to deliver initial findings in days.",
    position: "mid-right",
    badge: "Rapid Setup",
  },
  {
    id: "elastic-scaling",
    title: "Flexible Scaling",
    description: "Easily transition from a single assessment to dedicated multi-agent monthly regression automation.",
    position: "bottom-right",
    badge: "Flexible",
  },
];

const onboardingSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Intro & Discovery Call",
    description: "30-minute walkthrough to understand your application architecture, tech stack, and release friction points.",
  },
  {
    step: "02",
    title: "Custom Scope & Quote",
    description: "We prepare a transparent engagement plan defining precise test layers, timelines, and deliverables.",
  },
  {
    step: "03",
    title: "Non-Prod Access Setup",
    description: "Least-privilege staging environment credentials provided with full SOC2-aligned data isolation.",
  },
  {
    step: "04",
    title: "Kickoff & Execution",
    description: "AI-driven discovery and automation begins immediately with interactive reports delivered every sprint.",
  },
];

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

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <SectionHeading
          as="h1"
          eyebrow="Packages"
          title="Transparent starting packages, scoped to your assessment"
          description="Pricing is an initial business-planning target, not a market guarantee. Final pricing follows a short discovery call."
          tone="dark"
        />
      </Section>

      {/* Packages Section */}
      <Section aria-labelledby="packages-heading">
        <SectionHeading
          id="packages-heading"
          eyebrow="Tiers"
          title="Engagement Packages"
          description="Transparent, modular scopes customized to the complexity of your application."
          tone="dark"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Circular Value & Engagement Strategy */}
      <Section tone="ocean" aria-labelledby="pricing-strategy-heading">
        <CircularProcessGraph
          sectionEyebrow="Transparent Commitment"
          sectionTitle="OUR ENGAGEMENT STRATEGY"
          sectionSubtitle="Quality engineering priced with predictable milestones, complete IP handover, and evidence-backed deliverables."
          centerTitle="QAQuad"
          centerSubtitle="Value Model"
          pillars={pricingStrategyPillars}
        />
      </Section>

      {/* 4-Step Onboarding Workflow */}
      <Section tone="violet" aria-labelledby="onboarding-workflow-heading">
        <SectionHeading
          id="onboarding-workflow-heading"
          eyebrow="Smooth Kickoff"
          title="How Onboarding Works"
          description="From introductory call to first test execution report in less than one week."
          align="center"
          className="mx-auto"
          tone="dark"
        />
        <div className="mt-12">
          <WorkflowDiagram steps={onboardingSteps} columns={4} />
        </div>
      </Section>

      <CTASection location="pricing_page" title="Get a scoped quote for your application" />
    </>
  );
}
