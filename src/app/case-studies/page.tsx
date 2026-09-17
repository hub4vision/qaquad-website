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
  title: "Case Studies & Validation Methodology",
  description: "Real case studies coming soon. Explore our rigorous validation methodology and case study publication lifecycle.",
  path: "/case-studies",
});

const caseStudyStrategyPillars: StrategyPillar[] = [
  {
    id: "business-context",
    title: "Root Problem Profiling",
    description: "Deep examination of legacy QA bottlenecks, release velocity drag, and production escape patterns.",
    position: "top-left",
    badge: "Problem Context",
  },
  {
    id: "architectural-discovery",
    title: "Layered Discovery",
    description: "Systematic mapping of frontend DOM, microservice API contracts, and SQL state transformations.",
    position: "mid-left",
    badge: "Architecture",
  },
  {
    id: "verifiable-evidence",
    title: "Empirical Defect Logs",
    description: "Zero assumptions — all findings documented with network HAR traces, DOM state diffs, and DB logs.",
    position: "bottom-left",
    badge: "Zero Speculation",
  },
  {
    id: "quantified-metrics",
    title: "Quantified Business ROI",
    description: "Precise measurement of regression cycle speedup, defect escape reduction, and CI/CD time saved.",
    position: "top-right",
    badge: "Measured ROI",
  },
  {
    id: "client-anonymization",
    title: "Strict Confidentiality",
    description: "Case studies published only with explicit client approval or under complete architectural anonymization.",
    position: "mid-right",
    badge: "Confidentiality",
  },
  {
    id: "reproducible-playbooks",
    title: "Repeatable Blueprints",
    description: "Each engagement converts into a modular test asset and reusable automation playbook.",
    position: "bottom-right",
    badge: "Reusability",
  },
];

const lifecycleSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Engagement Scoping",
    description: "Identifying target business workflows, defect risk areas, and initial functional baseline.",
  },
  {
    step: "02",
    title: "AI-Assisted Discovery",
    description: "Exploration across user journeys, capturing edge cases and unexpected application behaviors.",
  },
  {
    step: "03",
    title: "Evidence Compilation",
    description: "Classifying defects by severity and capturing Playwright traces and database mutation diffs.",
  },
  {
    step: "04",
    title: "Review & Publication",
    description: "Publishing anonymized metrics and verified architectural outcomes with client authorization.",
  },
];

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

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
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

      {/* Circular Case Study Validation Strategy */}
      <Section tone="ocean" aria-labelledby="case-study-strategy-heading">
        <CircularProcessGraph
          sectionEyebrow="Evidence-Driven"
          sectionTitle="CASE STUDY VALIDATION STRATEGY"
          sectionSubtitle="How we evaluate client architectures, trace defects to root causes, and measure regression impact."
          centerTitle="QAQuad"
          centerSubtitle="Validation Lab"
          pillars={caseStudyStrategyPillars}
        />
      </Section>

      {/* 4-Step Case Study Publication Lifecycle */}
      <Section tone="violet" aria-labelledby="publication-lifecycle-heading">
        <SectionHeading
          id="publication-lifecycle-heading"
          eyebrow="Lifecycle Flow"
          title="From Initial Scoping to Verified Case Study"
          description="A transparent 4-stage process preserving confidentiality while showcasing verified technical outcomes."
          align="center"
          className="mx-auto"
          tone="dark"
        />
        <div className="mt-12">
          <WorkflowDiagram steps={lifecycleSteps} columns={4} />
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
