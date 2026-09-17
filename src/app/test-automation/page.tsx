import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata, serviceJsonLd } from "@/lib/seo";
import { InteractiveTestInspector } from "@/components/evidence/InteractiveTestInspector";
import { IntegrationGrid } from "@/components/services/IntegrationGrid";

const pageDescription =
  "Playwright browser automation, REST/API validation, and SQL/database checks, built as maintainable regression automation and wired into CI/CD.";

export const metadata: Metadata = buildPageMetadata({
  title: "Playwright, API, and Database Test Automation",
  description: pageDescription,
  path: "/test-automation",
});

const layers = [
  {
    id: "playwright-automation",
    name: "Playwright Automation",
    description:
      "Browser automation structured around real business workflows rather than brittle selectors, so suites stay useful release after release.",
    points: [
      "Page-object and workflow-based test architecture",
      "Cross-browser execution (Chrome, Edge, Firefox, WebKit)",
      "Data-driven and parameterized test design",
      "Readable failures with screenshots and traces attached",
    ],
  },
  {
    id: "api-testing",
    name: "API Testing",
    description:
      "API checks run alongside the UI workflow they support — confirming requests, responses, status codes, and payloads behave correctly for the business scenario, not just that an endpoint returns 200.",
    points: [
      "Request/response schema and contract validation",
      "Status-code and error-handling verification",
      "Workflow-integrated checks, not standalone smoke tests",
      "Authentication and authorization boundary checks",
    ],
  },
  {
    id: "database-validation",
    name: "Database Validation",
    description:
      "UI success doesn't always mean the database agrees. We validate that critical transactions are correctly and consistently persisted.",
    points: [
      "Post-transaction data integrity checks",
      "Cross-referencing UI/API state against database state",
      "Calculation and derived-field verification",
      "Read-only, least-privilege validation queries",
    ],
  },
  {
    id: "regression-testing",
    name: "Regression Testing",
    description: "Stable, high-value scenarios graduate into a maintained regression suite executed on every release.",
    points: [
      "Release-gate regression execution",
      "Evidence capture on every run",
      "Flaky-test triage and stabilization",
      "Trend reporting across releases",
    ],
  },
  {
    id: "cicd-qa-automation",
    name: "CI/CD QA Automation",
    description: "Your regression suite runs automatically through GitHub Actions, Jenkins, or your existing pipeline.",
    points: [
      "GitHub Actions / Jenkins pipeline integration",
      "Pull-request and release-gate triggers",
      "Structured pass/fail reporting in CI",
      "Parallelized execution for faster feedback",
    ],
  },
];

import { CircularProcessGraph } from "@/components/workflow/CircularProcessGraph";

const testAutomationPillars = [
  {
    id: "expertise",
    title: "Domain Expertise",
    description: "Deep engineering knowledge across Playwright, contract testing, and relational database validation.",
    position: "top-left" as const,
    badge: "Specialized",
  },
  {
    id: "agile-dev",
    title: "Agile Development",
    description: "Dynamic test generation adapting immediately to continuous sprint iterations, PRs, and changing specs.",
    position: "mid-left" as const,
    badge: "Sprint-Ready",
  },
  {
    id: "efficiency",
    title: "High Efficiency",
    description: "70% faster execution cycles with localized parallelization and selective regression running.",
    position: "bottom-left" as const,
    badge: "Speed",
  },
  {
    id: "track-record",
    title: "Proven Track Record",
    description: "Trusted across SaaS, travel tech, logistics, and multi-tenant platforms with zero-drift releases.",
    position: "top-right" as const,
    badge: "Reliable",
  },
  {
    id: "accurate-results",
    title: "Accurate Results",
    description: "Complete elimination of false alarms with multi-layer verification (DOM + API payload + SQL state).",
    position: "mid-right" as const,
    badge: "Zero-Flake",
  },
  {
    id: "quality",
    title: "Continuous Quality",
    description: "End-to-end release gates ensuring that every software update meets enterprise standards before launch.",
    position: "bottom-right" as const,
    badge: "Governance",
  },
];

export default function TestAutomationPage() {
  return (
    <>
      <StructuredData
        data={serviceJsonLd({
          name: "Playwright, API, and Database Test Automation",
          description: pageDescription,
          path: "/test-automation",
        })}
      />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Test Automation", path: "/test-automation" },
        ])}
      />

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <SectionHeading
          as="h1"
          eyebrow="Test Automation"
          title="Maintainable automation across UI, API, and database"
          description="Click-based automation alone misses backend defects. We validate business workflows at every layer they touch."
          tone="dark"
        />
      </Section>

      {/* QualiMatrix-style Circular Strategy Process Graph */}
      <Section tone="ocean" aria-labelledby="strategy-heading">
        <CircularProcessGraph
          sectionEyebrow="Agile Quality Engineering Strategy"
          sectionTitle="OUR AUTOMATION STRATEGY"
          sectionSubtitle="Connecting agile development, domain expertise, and multi-layer validation into one seamless release loop."
          centerTitle="QAQuad"
          centerSubtitle="Automation Loop"
          pillars={testAutomationPillars}
        />
      </Section>

      {layers.map((layer, index) => (
        <Section key={layer.id} id={layer.id} tone={index % 2 === 1 ? "muted" : "default"} aria-labelledby={`${layer.id}-heading`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading id={`${layer.id}-heading`} title={layer.name} description={layer.description} />
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
              {layer.points.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-4 text-sm text-slate-200 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan-400" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      {/* Live Interactive Test Runner & Artifact Inspector */}
      <Section tone="dark" aria-labelledby="automation-inspector-heading">
        <SectionHeading
          id="automation-inspector-heading"
          eyebrow="Live Test Console"
          title="Playwright Execution & Self-Healing Telemetry"
          description="Test runs execute hermetically, auto-healing broken UI selectors and validating relational database transactions in parallel."
          align="center"
          className="mx-auto"
          tone="dark"
        />
        <div className="mt-12">
          <InteractiveTestInspector />
        </div>
      </Section>

      {/* CI/CD & Testing Ecosystem Integration Grid */}
      <Section tone="ocean" aria-labelledby="automation-integrations-heading">
        <IntegrationGrid />
      </Section>

      <CTASection
        location="test_automation_page"
        title="Get a regression suite that survives your next release"
        description="Book a free QA assessment to see how we'd structure automation for your application."
      />
    </>
  );
}
