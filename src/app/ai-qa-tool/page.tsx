import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/cta/CTASection";
import { CtaButton } from "@/components/cta/CtaButton";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata, serviceJsonLd } from "@/lib/seo";
import { AiQaCycleDiagram } from "@/components/workflow/AiQaCycleDiagram";

const pageDescription =
  "QAQuad AI-QA Tool & Engine: Self-healing automation scripts, predictive bug hotspot analysis, multi-agent execution, and real-time regression telemetry.";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-QA Tool & Engine — Predictive Analysis & Self-Healing Automation",
  description: pageDescription,
  path: "/ai-qa-tool",
});

const corePillars = [
  {
    title: "Predictive Defect Analysis",
    id: "predictive-analysis",
    badge: "Machine Learning",
    description:
      "Machine learning models evaluate historical test executions, code churn, and dependency trees to calculate defect probability scores for every page and API route before tests run.",
    capabilities: [
      "Dynamic test prioritization based on commit impact",
      "Defect hotspot heatmap across critical workflows",
      "Regression risk score calculation",
      "Root cause clustering from error stack traces",
    ],
  },
  {
    title: "Self-Healing Test Scripts",
    id: "self-healing",
    badge: "Zero-Flake",
    description:
      "When developers alter CSS classes, DOM hierarchy, or element IDs, our intelligent locator engine re-identifies targets dynamically using visual, contextual, and semantic heuristics.",
    capabilities: [
      "Dynamic selector resolution without stopping test runs",
      "Automatic PR suggestions with modernized locators",
      "Elimination of false-positive build breakages",
      "Cross-browser locator stability (Chromium, Firefox, WebKit)",
    ],
  },
  {
    title: "Behavioural AI & LLM Validation",
    id: "behavioural-ai",
    badge: "GenAI Testing",
    description:
      "Testing non-deterministic applications requires non-traditional QA. We validate chatbot responses, LLM accuracy, safety guardrails, and decision trees with statistical consistency checks.",
    capabilities: [
      "Prompt injection and jailbreak boundary validation",
      "Semantic similarity scoring against ground truth",
      "Hallucination rate and factual consistency tests",
      "Latency, token usage, and cost monitoring",
    ],
  },
  {
    title: "Model Evaluation & Anomaly Detection",
    id: "model-evaluation",
    badge: "Evaluation Suite",
    description:
      "Continuous performance and drift monitoring for production models, checking precision, recall, and runtime inference anomalies under concurrent user loads.",
    capabilities: [
      "Dataset distribution drift monitoring",
      "Accuracy vs latency trade-off benchmarking",
      "Adversarial edge-case scenario generation",
      "Automated compliance and bias auditing",
    ],
  },
];

const dashboardStats = [
  { label: "Locators Auto-Healed", value: "98.7%", change: "+14% vs traditional frameworks" },
  { label: "Regression Cycle Speedup", value: "3.8x", change: "Dynamic test prioritization" },
  { label: "False Positive Reduction", value: "82%", change: "Resilient semantic locators" },
  { label: "Workflow Coverage", value: "100%", change: "Browser + API + DB multi-agent verification" },
];

export default function AiQaToolPage() {
  return (
    <>
      <StructuredData
        data={serviceJsonLd({
          name: "QAQuad AI-QA Tool & Engine",
          description: pageDescription,
          path: "/ai-qa-tool",
        })}
      />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/ai-qa-automation" },
          { name: "AI-QA Tool", path: "/ai-qa-tool" },
        ])}
      />

      {/* Hero Section */}
      <Section tone="dark" className="pt-16 sm:pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <span>Next-Generation Intelligent Quality Assurance</span>
          </div>

          <SectionHeading
            as="h1"
            eyebrow="QAQuad AI-QA Tool Platform"
            title="Intelligent Testing Engine with Self-Healing & Predictive Analytics"
            description="Replace brittle test scripts and endless maintenance with self-healing automation, defect hotspot forecasting, and multi-agent verification."
            align="center"
            tone="dark"
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaButton
              href="/contact"
              trackAs="cta_click"
              trackProps={{ location: "ai_qa_tool_hero" }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 border-0"
            >
              Request AI-QA Tool Access
            </CtaButton>
            <Link
              href="/ai-qa-automation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/80 text-sm font-semibold text-slate-200 hover:border-cyan-400 hover:text-white transition-colors"
            >
              <span>Explore AI Functional Testing</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Simulation Banner */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-700/80 bg-slate-950 p-6 shadow-2xl shadow-cyan-950/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                qaquad-ai-engine // live-telemetry-cluster
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              Real-time Active Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                <p className="mt-2 text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-[11px] text-cyan-400 font-medium">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* The 4-Stage Predictive AI-QA Cycle (QualiMatrix Screenshot 1 match) */}
      <Section tone="ocean" aria-labelledby="cycle-heading">
        <AiQaCycleDiagram />
      </Section>

      {/* Core AI Capabilities Grid */}
      <Section tone="violet" aria-labelledby="capabilities-heading">
        <SectionHeading
          id="capabilities-heading"
          eyebrow="Advanced Capabilities"
          title="Enterprise AI-QA Built for Modern Development"
          description="From predictive regression scoring to testing non-deterministic GenAI workflows, QAQuad delivers verifiable engineering confidence."
          tone="dark"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {corePillars.map((pillar) => (
            <div
              key={pillar.title}
              id={pillar.id}
              className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge tone="info">{pillar.badge}</Badge>
              </div>
              <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{pillar.description}</p>

              <div className="mt-5 border-t border-slate-800/80 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-2.5">
                  Key Specifications
                </p>
                <ul className="space-y-2">
                  {pillar.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-xs text-slate-200">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison: Traditional vs QAQuad AI Engine */}
      <Section tone="dark" aria-labelledby="comparison-heading">
        <SectionHeading
          id="comparison-heading"
          eyebrow="Why AI-QA Matters"
          title="Traditional Scripted Testing vs. QAQuad AI Engine"
          tone="dark"
        />

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/80">
                <th className="p-4 font-semibold text-white">Dimension</th>
                <th className="p-4 font-semibold text-slate-400">Traditional Test Automation</th>
                <th className="p-4 font-semibold text-cyan-400">QAQuad AI-QA Tool & Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-4 font-medium text-white">Locator Maintenance</td>
                <td className="p-4 text-slate-400">Manual edits required whenever class names or IDs change.</td>
                <td className="p-4 text-cyan-300 font-medium">Self-healing heuristics auto-resolve elements in real-time.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Test Scope Selection</td>
                <td className="p-4 text-slate-400">Run everything blindly or rely on slow manual test selection.</td>
                <td className="p-4 text-cyan-300 font-medium">Predictive analysis prioritizes tests targeting high-risk churn areas.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Defect Attribution</td>
                <td className="p-4 text-slate-400">Engineers spend hours reviewing raw console outputs.</td>
                <td className="p-4 text-cyan-300 font-medium">Auto-generated evidence reports with trace, network, and DB state diffs.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Multi-Layer Scope</td>
                <td className="p-4 text-slate-400">Siloed UI tests miss backend database mutations.</td>
                <td className="p-4 text-cyan-300 font-medium">Unified Browser, API, and SQL Database agent verification.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Call to action */}
      <CTASection
        location="ai_qa_tool_page"
        title="Experience AI-Powered Quality Engineering"
        description="Book a technical demo to see our predictive analysis and self-healing automation in action against your application."
      />
    </>
  );
}
