import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkflowDiagram } from "@/components/workflow/WorkflowDiagram";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata, serviceJsonLd } from "@/lib/seo";

const pageDescription =
  "AI explores your application, understands workflows, extracts business rules, and generates meaningful functional test scenarios — not generic UI clicks.";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Functional Testing",
  description: pageDescription,
  path: "/ai-qa-automation",
});

const discoverySteps = [
  { step: "01", title: "Application URL + Objective", description: "You provide the application and the business objective for testing." },
  { step: "02", title: "AI Application Explorer", description: "AI walks through pages, forms, and workflows like a skilled tester." },
  { step: "03", title: "Functional Requirements", description: "Business rules, validations, and workflows are extracted and documented." },
  { step: "04", title: "AI Test Scenario Generator", description: "Risk-based scenarios are generated from what the application actually does." },
  { step: "05", title: "Playwright / API / SQL Execution", description: "Scenarios execute across the browser, API, and database layers." },
  { step: "06", title: "Evidence Collection", description: "Screenshots, traces, responses, and query results are captured." },
  { step: "07", title: "Defect Analysis", description: "Findings are compared against expected behavior and classified." },
  { step: "08", title: "AI QA Report", description: "A clear, evidence-backed report of coverage and defects is delivered." },
];

const differentiators = [
  {
    title: "Understands behavior, not just markup",
    description: "The AI explorer follows workflows the way a user would — filling forms, submitting, and observing outcomes — rather than only crawling links.",
  },
  {
    title: "Business rules become documented requirements",
    description: "Validation rules, calculations, and permissions discovered during exploration are written down, so your team gets a living functional baseline, not just test results.",
  },
  {
    title: "Risk-based, not exhaustive-for-its-own-sake",
    description: "Scenarios are prioritized by business risk and likelihood of defect, so effort goes where it matters most.",
  },
  {
    title: "Evidence on every finding",
    description: "Every reported defect ships with the screenshot, trace, API response, or database result that supports it.",
  },
];

import { AiQaCycleDiagram } from "@/components/workflow/AiQaCycleDiagram";

export default function AiQaAutomationPage() {
  return (
    <>
      <StructuredData
        data={serviceJsonLd({
          name: "AI Functional Testing",
          description: pageDescription,
          path: "/ai-qa-automation",
        })}
      />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI Functional Testing", path: "/ai-qa-automation" },
        ])}
      />

      <Section tone="dark" className="pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="AI Functional Testing"
          title="Application discovery, requirements, test scenarios, execution, and evidence"
          description="Your application already has functionality — often more than anyone has fully documented. We use AI to discover it, turn it into requirements, and validate it with evidence."
          tone="dark"
        />
      </Section>

      {/* The 4-Stage AI-QA Predictive Engine */}
      <Section tone="ocean" aria-labelledby="ai-cycle-heading">
        <AiQaCycleDiagram />
      </Section>

      <Section tone="ocean" aria-labelledby="workflow-heading">
        <SectionHeading id="workflow-heading" eyebrow="Execution Workflow" title="End-to-End Discovery & Execution" align="center" className="mx-auto" tone="dark" />
        <div className="mt-12">
          <WorkflowDiagram steps={discoverySteps} columns={4} />
        </div>
      </Section>

      <Section tone="violet" aria-labelledby="different-heading">
        <SectionHeading id="different-heading" eyebrow="Why it's different" title="Not generic AI testing" tone="dark" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <h3 className="font-bold text-lg text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        location="ai_qa_automation_page"
        title="See what AI-driven discovery finds in your application"
        description="Book a free QA assessment and get a first look at your functional coverage."
      />
    </>
  );
}
