import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

const pageDescription =
  "The AI QA Agent architecture: coordinated browser, API, database, and requirement agents that explore, test, and analyze applications. Available capabilities are clearly separated from the future product roadmap.";

export const metadata: Metadata = buildPageMetadata({
  title: "AI QA Agent",
  description: pageDescription,
  path: "/ai-qa-agent",
});

const agents = [
  { name: "Requirement Agent", description: "Extracts and documents functional requirements, business rules, and validations from observed behavior." },
  { name: "Browser Agent", description: "Explores and exercises the application's UI workflows end to end." },
  { name: "API Agent", description: "Validates request/response behavior alongside the workflows it supports." },
  { name: "Database Agent", description: "Confirms that critical transactions are correctly and consistently persisted." },
  { name: "Test Agent", description: "Generates risk-based test scenarios from the functional knowledge base." },
  { name: "Defect Agent", description: "Compares expected vs. actual behavior and drafts evidence-backed defect reports." },
  { name: "Reporting Agent", description: "Compiles coverage, findings, and evidence into a reviewable QA report." },
];

const availableToday = [
  "AI-assisted application exploration performed by our QA engineers using AI tooling",
  "AI-generated functional requirements and test scenarios, reviewed by a human before execution",
  "Playwright, API, and database validation execution",
  "Evidence-backed defect reporting",
];

const futureRoadmap = [
  "Fully autonomous multi-agent exploration with minimal human setup",
  "Self-service portal for triggering and reviewing AI QA runs",
  "Continuous, autonomous regression monitoring across releases",
  "Expanded integrations across additional data stores and protocols",
];

export default function AiQaAgentPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "AI QA Agent", path: "/ai-qa-agent" },
        ])}
      />

      <Section tone="dark" className="pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Architecture & vision"
          title="An AI QA Agent built from coordinated, specialized agents"
          description="Rather than one generalist AI trying to do everything, the AI QA Agent architecture splits responsibility across agents that each do one part of QA well."
          tone="dark"
        />
      </Section>

      <Section tone="ocean" aria-labelledby="agents-heading">
        <SectionHeading id="agents-heading" eyebrow="The agents" title="What each agent does" tone="dark" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div key={agent.name} className="rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <h3 className="font-bold text-white text-lg">{agent.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{agent.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="violet" aria-labelledby="today-vs-roadmap-heading">
        <SectionHeading id="today-vs-roadmap-heading" eyebrow="Honest about maturity" title="Available today vs. product roadmap" tone="dark" />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-slate-900/95 to-slate-800/85 p-6 shadow-xl backdrop-blur-sm">
            <Badge tone="pass">Available today</Badge>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {availableToday.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/95 to-slate-800/85 p-6 shadow-xl backdrop-blur-sm">
            <Badge tone="info">Future roadmap</Badge>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {futureRoadmap.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-400">
          We label capabilities clearly so you always know what's delivered by an AI-assisted engineering process
          today versus what's on our roadmap.
        </p>
      </Section>

      <CTASection
        location="ai_qa_agent_page"
        title="See the AI QA Agent applied to your application"
        description="Book a free QA assessment to discuss which capabilities fit your current QA needs."
      />
    </>
  );
}
