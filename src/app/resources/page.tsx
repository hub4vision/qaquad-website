import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

import { CircularProcessGraph, type StrategyPillar } from "@/components/workflow/CircularProcessGraph";
import { WorkflowDiagram } from "@/components/workflow/WorkflowDiagram";
import type { WorkflowStep } from "@/lib/site-config";
import { CTASection } from "@/components/cta/CTASection";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Resources & Guides",
  description: "Guides and educational frameworks on AI QA automation, Playwright test architecture, migration validation, and regression reliability.",
  path: "/resources",
});

const resourceStrategyPillars: StrategyPillar[] = [
  {
    id: "playwright-best-practices",
    title: "Modern Playwright Patterns",
    description: "Battle-tested fixture patterns, parallel worker optimizations, and zero-flake locators.",
    position: "top-left",
    badge: "Automation",
  },
  {
    id: "ai-prompt-engineering",
    title: "AI Test Discovery Models",
    description: "How specialized LLMs generate non-flaky test steps and document live functional business rules.",
    position: "mid-left",
    badge: "AI Engineering",
  },
  {
    id: "migration-checklists",
    title: "Migration QA Playbooks",
    description: "Step-by-step checklists to guarantee zero data loss and parity during database and cloud cutovers.",
    position: "bottom-left",
    badge: "Migration",
  },
  {
    id: "api-contract-standards",
    title: "API & DB Integrity Guides",
    description: "Multi-tier testing methodologies validating REST/GraphQL contracts alongside SQL database state.",
    position: "top-right",
    badge: "Multi-Tier",
  },
  {
    id: "ci-cd-acceleration",
    title: "CI/CD Pipeline Recipes",
    description: "GitHub Actions, GitLab CI, and Docker pipelines for sub-10 minute end-to-end regression suites.",
    position: "mid-right",
    badge: "DevOps",
  },
  {
    id: "defect-attribution",
    title: "Automated RCA Standards",
    description: "Packaging traces, HAR files, and video records into immediate developer-friendly issue tickets.",
    position: "bottom-right",
    badge: "Root Cause",
  },
];

const publishingSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Field Research",
    description: "Extracting lessons and architectural edge cases from real-world enterprise QA engagements.",
  },
  {
    step: "02",
    title: "Open Code Snippets",
    description: "Refining production TypeScript, Playwright configs, and Docker setups into reusable templates.",
  },
  {
    step: "03",
    title: "Peer Engineering Review",
    description: "Validating against latest browser standards and cloud protocols for zero deprecated patterns.",
  },
  {
    step: "04",
    title: "Open Access Guides",
    description: "Published freely to assist development and QA teams in elevating their testing bar.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <SectionHeading as="h1" eyebrow="Resources" title="Coming soon" tone="dark" />
      </Section>

      <Section tone="muted" aria-labelledby="resources-heading">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="info">Coming Soon</Badge>
          <h2 id="resources-heading" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Guides and educational content
          </h2>
          <p className="mt-3 text-slate-300 leading-relaxed">
            We're building out practical guides on AI QA automation, Playwright test design, migration testing, and
            regression automation. In the meantime, see the{" "}
            <Link href="/blog" className="font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
              Blog
            </Link>{" "}
            for initial topics, or{" "}
            <Link href="/how-it-works" className="font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
              How It Works
            </Link>{" "}
            for our delivery process.
          </p>
        </div>
      </Section>

      {/* Circular Knowledge Strategy Diagram */}
      <Section tone="ocean" aria-labelledby="resource-strategy-heading">
        <CircularProcessGraph
          sectionEyebrow="Knowledge Framework"
          sectionTitle="QA ENGINEERING PLAYBOOKS"
          sectionSubtitle="Curated architecture guides, code templates, and automation patterns derived from production QA deployments."
          centerTitle="QAQuad"
          centerSubtitle="Knowledge Hub"
          pillars={resourceStrategyPillars}
        />
      </Section>

      {/* 4-Step Knowledge Workflow */}
      <Section tone="violet" aria-labelledby="publishing-workflow-heading">
        <SectionHeading
          id="publishing-workflow-heading"
          eyebrow="Editorial Process"
          title="How Our Technical Guides Are Authored"
          description="Every guide is peer-reviewed against production test suites and updated continuously."
          align="center"
          className="mx-auto"
          tone="dark"
        />
        <div className="mt-12">
          <WorkflowDiagram steps={publishingSteps} columns={4} />
        </div>
      </Section>

      <CTASection
        location="resources_page"
        title="Looking for a specific testing guide or blueprint?"
        description="Reach out to our engineering team. We are happy to share sample Playwright fixtures and architecture recommendations."
      />
    </>
  );
}
