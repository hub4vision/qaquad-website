import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkflowDiagram } from "@/components/workflow/WorkflowDiagram";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { howItWorksSteps } from "@/lib/site-config";

const pageDescription =
  "A seven-step delivery process — Connect, Discover, Understand, Generate, Execute, Analyze, Automate — for evidence-backed QA automation.";

export const metadata: Metadata = buildPageMetadata({
  title: "How It Works",
  description: pageDescription,
  path: "/how-it-works",
});

import { CircularProcessGraph, type StrategyPillar } from "@/components/workflow/CircularProcessGraph";

const deliveryStrategyPillars: StrategyPillar[] = [
  {
    id: "app-discovery",
    title: "Application Discovery",
    description: "Autonomous crawl of all active routes, auth boundaries, and forms to build a living functional baseline.",
    position: "top-left",
    badge: "Step 1-2",
  },
  {
    id: "rules-extraction",
    title: "Rules Extraction",
    description: "Capturing input validations, edge cases, and business logic directly from runtime application behavior.",
    position: "mid-left",
    badge: "Step 3-4",
  },
  {
    id: "multi-layer-exec",
    title: "Multi-Layer Execution",
    description: "Executing synchronized test scenarios spanning Browser UI, REST/GraphQL APIs, and SQL databases.",
    position: "bottom-left",
    badge: "Step 5",
  },
  {
    id: "evidence-capture",
    title: "Evidence Collection",
    description: "Attaching traces, network waterfall payloads, DB diffs, and screenshots directly to every defect.",
    position: "top-right",
    badge: "Step 6",
  },
  {
    id: "defect-attribution",
    title: "Defect Root-Cause",
    description: "AI clusters stack traces, identifying whether breakages stem from frontend, API, or data layers.",
    position: "mid-right",
    badge: "Step 7",
  },
  {
    id: "zero-drift",
    title: "Continuous Regression",
    description: "Converting confirmed scenarios into permanent, self-healing Playwright automation for CI/CD.",
    position: "bottom-right",
    badge: "Automate",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How It Works", path: "/how-it-works" },
        ])}
      />

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <SectionHeading
          as="h1"
          eyebrow="Delivery process"
          title="From application access to regression automation in seven steps"
          description="The same process powers every engagement, whether it's a first functional assessment or an ongoing regression partnership."
          tone="dark"
        />
      </Section>

      {/* Circular Strategy Process Graph */}
      <Section tone="ocean" aria-labelledby="delivery-strategy-heading">
        <CircularProcessGraph
          sectionEyebrow="Delivery Methodology"
          sectionTitle="OUR DELIVERY STRATEGY"
          sectionSubtitle="Connecting agile development, intelligent exploration, and multi-layer verification into one continuous feedback loop."
          centerTitle="QAQuad"
          centerSubtitle="Delivery Loop"
          pillars={deliveryStrategyPillars}
        />
      </Section>

      <Section aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="sr-only">
          The seven steps
        </h2>
        <WorkflowDiagram steps={howItWorksSteps} columns={4} />
      </Section>

      <Section tone="violet" aria-labelledby="detail-heading">
        <SectionHeading id="detail-heading" eyebrow="What to expect" title="What each step looks like in practice" tone="dark" />
        <div className="mt-10 space-y-4">
          {howItWorksSteps.map((item) => (
            <div key={item.step} className="flex flex-col gap-4 rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm sm:flex-row sm:items-center hover:border-cyan-500/40 transition-colors">
              <div className="flex-none font-mono text-base font-bold text-cyan-400 sm:w-20">{item.step}</div>
              <div>
                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection location="how_it_works_page" />
    </>
  );
}
