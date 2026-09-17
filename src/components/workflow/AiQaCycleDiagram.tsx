"use client";

import { useState } from "react";
import { clsx } from "@/lib/clsx";

interface Step {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  bullets: string[];
  metrics: { label: string; value: string };
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: "data-processing",
    title: "Data Processing",
    subtitle: "Telemetry, DOM & Execution Logs",
    badge: "Stage 01",
    description:
      "Collected runtime logs, telemetry, DOM mutations, and API traffic are sanitized, structured, and vectorized. Well-organized test data lays the technical groundwork for reliable model predictions and actionable QA decisions.",
    bullets: [
      "DOM structure and element state extraction",
      "Network API request/response payloads sanitization",
      "Historical execution telemetry & error stack indexing",
      "Business entity lifecycle tracking across states",
    ],
    metrics: { label: "Data Ingestion Speed", value: "< 120ms" },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    id: "ai-model",
    title: "AI Model & Reasoning",
    subtitle: "Anomaly & Behavioral Intelligence",
    badge: "Stage 02",
    description:
      "We integrate specialized machine learning and LLM reasoning algorithms to analyze collected test executions. The engine detects anomalies, edge-case failures, and regressions before they result in production defects or data loss.",
    bullets: [
      "Transformer-driven behavioral pattern recognition",
      "Unsupervised anomaly detection in execution timings",
      "Multi-agent reasoning (Browser, API & SQL agents)",
      "Continuous verification of UI state against business intent",
    ],
    metrics: { label: "Pattern Recognition Acc.", value: "99.4%" },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
  },
  {
    id: "prediction",
    title: "Prediction & Risk Scoring",
    subtitle: "Defect Hotspot Forecasting",
    badge: "Stage 03",
    description:
      "To proactively eliminate bugs, our artificial intelligence models predict high-risk code paths and regression hot-spots. It spots vulnerable application areas, calculates risk scores, and guides engineering teams to fix issues early.",
    bullets: [
      "Defect likelihood scoring per module and endpoint",
      "Dynamic test suite prioritization based on code churn",
      "High-risk user flow impact analysis",
      "Early warning alerts for fragile integration points",
    ],
    metrics: { label: "Regression Risk Filter", value: "85% faster" },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
  {
    id: "feedback",
    title: "Real-time Feedback & Self-Healing",
    subtitle: "Automated Locators & Telemetry Loop",
    badge: "Stage 04",
    description:
      "As testing processes run, our system responds instantly to UI shifts. When locators or DOM trees change, AI self-heals selectors on-the-fly, preventing false failures and triggering real-time diagnostics back to your CI/CD pipeline.",
    bullets: [
      "Auto-adapting Playwright selectors on DOM shifts",
      "Zero flaky false-negatives due to CSS/ID renames",
      "Instant telemetry stream to CI/CD and developer dashboards",
      "Full video, trace, and snapshot evidence attached to each run",
    ],
    metrics: { label: "Script Maintenance Reduction", value: "70%" },
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

export function AiQaCycleDiagram() {
  const [activeStepId, setActiveStepId] = useState<string>("data-processing");

  const currentStep: Step = steps.find((s) => s.id === activeStepId) ?? steps[0]!;

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 p-6 lg:p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
      {/* Header explanation */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-3">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>QualiMatrix-Inspired Continuous Architecture</span>
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
          The 4-Stage Predictive AI-QA Cycle
        </h3>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          How our AI QA Tool engine transforms application interactions into predictive risk scoring and self-healing test automation. Click each stage to inspect.
        </p>
      </div>

      {/* 4 Interactive Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {steps.map((step, idx) => {
          const isActive = step.id === activeStepId;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={clsx(
                "group relative text-left rounded-2xl p-5 transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                isActive
                  ? "border-cyan-400 bg-gradient-to-b from-cyan-950/50 to-slate-900 shadow-lg shadow-cyan-500/20 scale-[1.02]"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={clsx(
                    "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
                    isActive
                      ? "border-cyan-400/40 bg-cyan-500/20 text-cyan-300"
                      : "border-slate-700 bg-slate-800 text-slate-400"
                  )}
                >
                  {step.badge}
                </span>
                <div
                  className={clsx(
                    "p-2 rounded-xl border transition-colors",
                    isActive
                      ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-400/40"
                      : "border-slate-800 bg-slate-800/80 text-slate-400 group-hover:text-slate-200"
                  )}
                >
                  {step.icon}
                </div>
              </div>
              <h4
                className={clsx(
                  "font-bold text-base transition-colors",
                  isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                )}
              >
                {step.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{step.subtitle}</p>

              {/* Progress Connector Indicator */}
              <div className="mt-4 h-1 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={clsx(
                    "h-full transition-all duration-500",
                    isActive ? "w-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "w-0 bg-transparent"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Showcase Panel for Active Step */}
      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/90 p-6 lg:p-8 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-2 text-cyan-400">
              {currentStep.icon}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {currentStep.badge} &bull; {currentStep.subtitle}
              </span>
              <h4 className="text-xl lg:text-2xl font-bold text-white">{currentStep.title}</h4>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">{currentStep.description}</p>

          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Capabilities & Logic
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentStep.bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metric / Stat Callout Card */}
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900 p-6 text-center shadow-lg shadow-cyan-950/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
            {currentStep.metrics.label}
          </span>
          <div className="mt-2 text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {currentStep.metrics.value}
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Validated across continuous regression runs and multi-platform pipelines.
          </p>
        </div>
      </div>
    </div>
  );
}
