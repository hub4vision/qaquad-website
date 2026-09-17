import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { WorkflowDiagram } from "@/components/workflow/WorkflowDiagram";
import { ComparisonTable } from "@/components/migration/ComparisonTable";
import { EvidenceSection } from "@/components/evidence/EvidenceSection";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { CTASection } from "@/components/cta/CTASection";
import { CtaButton } from "@/components/cta/CtaButton";
import { AiQaCycleDiagram } from "@/components/workflow/AiQaCycleDiagram";
import { buildPageMetadata } from "@/lib/seo";
import { industries, solutionSteps } from "@/lib/site-config";
import { InteractiveTestInspector } from "@/components/evidence/InteractiveTestInspector";
import { RoiCalculator } from "@/components/analytics/RoiCalculator";
import { IntegrationGrid } from "@/components/services/IntegrationGrid";
import { SecurityTrustMatrix } from "@/components/services/SecurityTrustMatrix";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-Powered QA Automation for Faster, More Reliable Software Releases",
  description:
    "QAQuad discovers functionality, generates meaningful tests, validates UI + API + database behavior, finds defects with evidence, and builds maintainable regression automation.",
  path: "/",
});

const problems = [
  { title: "Manual regression takes too long", description: "Every release, the same clicks — slower each time the application grows." },
  { title: "Requirements are incomplete", description: "Documentation lags behind what the application actually does today." },
  { title: "Legacy applications are poorly documented", description: "Business rules live in the code and in people's heads, not in specs." },
  { title: "UI-only automation misses backend defects", description: "A green checkmark on screen doesn't mean the database agrees." },
  { title: "Migration projects hide functional gaps", description: "A pixel-perfect new UI can still silently drop business behavior." },
  { title: "Test maintenance is expensive", description: "Brittle selectors and flaky suites cost more to maintain than to write." },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Problem section - ocean tone */}
      <Section tone="ocean" aria-labelledby="problem-heading">
        <SectionHeading
          id="problem-heading"
          eyebrow="Why QA falls behind"
          title="Traditional QA can't keep up with modern release cycles"
          align="center"
          className="mx-auto"
          tone="dark"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.title} className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <h3 className="font-semibold text-white text-lg">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{problem.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Solution section - violet tone */}
      <Section tone="violet" aria-labelledby="solution-heading">
        <SectionHeading
          id="solution-heading"
          eyebrow="How we solve it"
          title="From Application URL to Evidence-Backed QA"
          description="One consistent workflow takes you from an unfamiliar application to a maintainable regression suite."
          tone="dark"
        />
        <div className="mt-12">
          <WorkflowDiagram steps={solutionSteps} columns={4} />
        </div>
      </Section>

      {/* Flagship migration testing section - gradient tone */}
      <Section tone="gradient" aria-labelledby="migration-heading">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              id="migration-heading"
              eyebrow="Flagship capability"
              title="Migration testing that compares behavior, not screenshots"
              description="We don't compare old and new screens pixel-by-pixel. We compare business capability — CRUD operations, business rules, validations, workflows, permissions, calculations, and integrations — and classify every result."
              tone="dark"
            />
            <ul className="mt-6 space-y-2.5 text-sm text-slate-200">
              {["PASS", "PARTIAL", "FAIL", "NOT FOUND", "NOT TESTABLE", "NEEDS BUSINESS CONFIRMATION"].map((label) => (
                <li key={label} className="flex items-center gap-2.5 font-medium">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaButton
                href="/migration-testing"
                trackAs="cta_click"
                trackProps={{ location: "home_migration" }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 border-0"
              >
                Explore Migration Testing
              </CtaButton>
            </div>
          </div>
          <ComparisonTable />
        </div>
      </Section>

      {/* Services - ocean tone */}
      <Section tone="ocean" aria-labelledby="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title="Services built for engineering-led QA"
          align="center"
          className="mx-auto"
          tone="dark"
        />
        <div className="mt-12">
          <ServicesGrid limit={8} />
        </div>
      </Section>

      {/* The 4-Stage AI-QA Predictive Engine */}
      <Section tone="gradient" aria-labelledby="ai-cycle-home-heading">
        <AiQaCycleDiagram />
      </Section>

      {/* How it works - default tone */}
      <Section tone="default" aria-labelledby="how-heading">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading id="how-heading" eyebrow="Delivery process" title="How it works" tone="dark" />
          <Link href="/how-it-works" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
            See the full process →
          </Link>
        </div>
        <div className="mt-12">
          <WorkflowDiagram
            steps={[
              { step: "01", title: "Discover", description: "AI explores your application's functionality." },
              { step: "02", title: "Generate", description: "Meaningful test scenarios are created from real behavior." },
              { step: "03", title: "Execute", description: "Playwright, API, and database checks run the workflows." },
              { step: "04", title: "Automate", description: "Stable scenarios become reusable regression automation." },
            ]}
            columns={4}
          />
        </div>
      </Section>

      {/* Evidence section - dark tone */}
      <Section tone="dark" aria-labelledby="evidence-heading">
        <SectionHeading
          id="evidence-heading"
          eyebrow="No guesswork"
          title="Every important finding has evidence"
          description="Screenshots, traces, API responses, database results, and execution logs back every defect we report."
          tone="dark"
        />
        <div className="mt-12">
          <EvidenceSection />
        </div>
      </Section>

      {/* Interactive Live Test Inspector & Self-Healing Runner */}
      <Section tone="ocean" aria-labelledby="live-runner-heading">
        <SectionHeading
          id="live-runner-heading"
          eyebrow="Interactive Artifact Studio"
          title="See Autonomous QA Execution In Action"
          description="Explore how QAQuad executes Playwright tests, auto-heals broken locators in real time, and asserts dual API + database consistency."
          align="center"
          className="mx-auto"
          tone="dark"
        />
        <div className="mt-12">
          <InteractiveTestInspector />
        </div>
      </Section>

      {/* Interactive ROI & Regression Cost Calculator */}
      <Section tone="dark" aria-labelledby="roi-calculator-heading">
        <RoiCalculator />
      </Section>

      {/* CI/CD & Testing Ecosystem Integration Grid */}
      <Section tone="ocean" aria-labelledby="integration-grid-heading">
        <IntegrationGrid />
      </Section>

      {/* Industries - emerald tone */}
      <Section tone="emerald" aria-labelledby="industries-heading">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading id="industries-heading" eyebrow="Who we work with" title="Built for real business applications" tone="dark" />
          <Link href="/industries" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
            See all industries →
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 3).map((industry) => (
            <IndustryCard key={industry.name} industry={industry} />
          ))}
        </div>
      </Section>

      {/* Enterprise Security, Privacy & IP Ownership Trust Matrix */}
      <Section tone="violet" aria-labelledby="security-trust-heading">
        <SecurityTrustMatrix />
      </Section>

      <CTASection location="home" />
    </>
  );
}
