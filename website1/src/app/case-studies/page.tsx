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
    description: "Classifying defects by severity and capturing Playwright/Selenium traces and database mutation diffs.",
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

      <Section tone="muted" aria-labelledby="featured-case-study">
        <div className="mx-auto max-w-4xl">
          <Badge tone="pass">Featured Case Study</Badge>
          <h2 id="featured-case-study" className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Legacy ERP Migration for a Global Logistics Provider
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            How QAQuad helped a multi-national logistics firm migrate a 15-year-old on-premise ERP to a modern SaaS stack with zero critical production defects.
          </p>
          
          <div className="mt-12 space-y-8">
            <div className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-8 shadow-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-cyan-400">The Challenge</h3>
              <p className="mt-4 text-slate-300 leading-relaxed">
                The client was migrating an aging, undocumented logistics ERP handling $2B+ in annual freight to a new cloud-native microservices architecture. Manual testing was taking 4 weeks per release, and previous migration attempts resulted in severe order-routing failures.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-8 shadow-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-cyan-400">Our Approach</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li className="flex gap-3"><span className="text-cyan-500">✓</span> <strong>AI Discovery:</strong> Mapped 400+ undocumented legacy workflows and business rules.</li>
                <li className="flex gap-3"><span className="text-cyan-500">✓</span> <strong>Dual-Execution:</strong> Ran transactions in both the legacy and new system simultaneously.</li>
                <li className="flex gap-3"><span className="text-cyan-500">✓</span> <strong>Full-Stack Validation:</strong> Checked not just the UI, but API contracts and SQL database state to ensure data migrated perfectly.</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-8 shadow-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold text-cyan-400">The Findings</h3>
                <p className="mt-4 text-slate-300 leading-relaxed">
                  We identified <strong>47 critical behavioral gaps</strong> between the old and new systems before go-live, including a tax calculation rounding error that would have cost $120k/month.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-8 shadow-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold text-emerald-400">The Outcome</h3>
                <p className="mt-4 text-slate-300 leading-relaxed">
                  The client successfully cut over to the new system on a single weekend. <strong>Regression cycle time was reduced from 4 weeks to 3 hours</strong> using our automated Playwright suites.
                </p>
              </div>
            </div>
          </div>
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
