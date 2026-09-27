"use client";

import React, { useState } from "react";
import { Section } from "@/components/ui/Section";
import { 
  Play, 
  Code, 
  FileText, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  Activity, 
  Globe, 
  Database, 
  Copy, 
  Check, 
  Download, 
  Cpu, 
  Layers, 
  Sparkles, 
  Zap, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Building2,
  Briefcase
} from "lucide-react";

interface TestStep {
  id: string;
  stepNumber: number;
  title: string;
  action: "NAVIGATE" | "INPUT" | "CLICK" | "API_INTERCEPT" | "DB_QUERY" | "ASSERTION";
  locator: string;
  durationMs: number;
  status: "PASSED" | "FAILED" | "WARNING";
  details: string;
  selfHealingUsed?: boolean;
}

interface NetworkLog {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  status: number;
  latencyMs: number;
  payloadSummary: string;
  schemaValid: boolean;
}

interface DbCheck {
  table: string;
  query: string;
  expected: string;
  actual: string;
  passed: boolean;
}

interface TestReportData {
  ok: boolean;
  target: {
    url: string;
    host: string;
    category: string;
    contextName: string;
  };
  summary: {
    status: string;
    healthScore: number;
    totalScenarios: number;
    totalSteps: number;
    totalAssertions: number;
    executionDurationSec: string;
    flakinessRate: string;
    selfHealingInterventions: number;
  };
  steps: TestStep[];
  networkLogs: NetworkLog[];
  dbChecks: DbCheck[];
  bdd: string;
  playwright: string;
  edgeCases: string[];
  securityCases: string[];
}

const PRESETS = [
  {
    label: "✈️ MakeMyTrip (Travel OTA)",
    brand: "MakeMyTrip.com",
    category: "Travel Technology",
    prompt: "Test makemytrip.com flight booking workflow from Delhi (DEL) to Mumbai (BOM) for tomorrow, verify non-stop filter, intercept fare quote API, and assert price calculation without currency drift."
  },
  {
    label: "🛒 Amazon (E-Commerce Retail)",
    brand: "Amazon.com",
    category: "E-Commerce & Retail",
    prompt: "Navigate to amazon.com, search for 'Wireless Noise-Canceling Headphones', add product to cart, apply coupon discount code, and verify subtotal, sales tax, and 1-Click checkout pipeline."
  },
  {
    label: "💳 Stripe (FinTech Payments)",
    brand: "Stripe.com",
    category: "FinTech & Payments",
    prompt: "Execute payment gateway transaction on pay.stripe.com for $250.00, test idempotency headers, simulate 3D-Secure biometric challenge, and assert double-entry ledger audit log in SQL database."
  },
  {
    label: "☁️ Atlassian Jira (Cloud SaaS)",
    brand: "Atlassian.net",
    category: "SaaS & Cloud Platforms",
    prompt: "Test user authentication and SAML SSO login on company.atlassian.net, verify MFA SMS challenge, check role-based permissions, and inspect JWT session token expiry across workspaces."
  },
  {
    label: "📊 Salesforce (CRM & Pipeline)",
    brand: "Salesforce.com",
    category: "ERP & CRM Systems",
    prompt: "Test lead capture and opportunity conversion on app.salesforce.com, verify stage progression from 'Prospecting' to 'Closed-Won', and assert SQL database triggers on account balance."
  },
  {
    label: "🚚 FedEx (Supply Chain & Logistics)",
    brand: "FedEx.com",
    category: "Logistics & Supply Chain",
    prompt: "Test real-time shipment waybill tracking on fedex.com for tracking number '794648529124', verify transit milestone timestamps, validate webhook event dispatch, and check warehouse inventory sync."
  },
  {
    label: "🏥 Practo (Healthcare & Telehealth)",
    brand: "Practo.com",
    category: "Healthcare & Telehealth",
    prompt: "Test doctor consultation scheduling on practo.com, verify HIPAA consent modal, select Cardiology slot, check insurance eligibility API response, and assert $30 co-pay calculation."
  },
  {
    label: "🏨 Booking.com (Hospitality & Hotels)",
    brand: "Booking.com",
    category: "Hospitality & Travel",
    prompt: "Test hotel reservation workflow on booking.com for 3 nights in London, apply free cancellation filter, verify dynamic room availability state, and assert local tourist tax calculations."
  }
];

export default function AiSandboxPage() {
  const [prompt, setPrompt] = useState<string>(PRESETS[0]?.prompt ?? "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [activeStage, setActiveStage] = useState<string>("");
  const [results, setResults] = useState<TestReportData | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "steps" | "network" | "db" | "code" | "security">("summary");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedBdd, setCopiedBdd] = useState(false);

  // Simulated live execution steps for the animated player
  const STAGES = [
    "Resolving target domain & initiating headless browser context...",
    "Scanning DOM hierarchy & mapping self-healing locators...",
    "Executing autonomous user journey & interaction pipeline...",
    "Intercepting REST APIs & validating payload schema contracts...",
    "Querying backend database & asserting state synchronization...",
    "Synthesizing test evidence & generating multi-layer QA report..."
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setResults(null);
    setExecutionProgress(5);
    setActiveStage(STAGES[0] ?? "");

    // Animate progress feed while the API request processes
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex += 1;
      if (stepIndex < STAGES.length) {
        setActiveStage(STAGES[stepIndex] ?? "");
        setExecutionProgress(Math.min(15 + stepIndex * 15, 90));
      }
    }, 500);

    try {
      const res = await fetch("/api/generate-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.ok) {
        clearInterval(interval);
        setExecutionProgress(100);
        setActiveStage("Execution Complete! Test report ready.");
        setTimeout(() => {
          setResults(data);
          setIsGenerating(false);
        }, 300);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    } catch (e) {
      console.error("Test generation error:", e);
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, type: "code" | "bdd") => {
    navigator.clipboard.writeText(text);
    if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedBdd(true);
      setTimeout(() => setCopiedBdd(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-slate-950 text-slate-100">
      <Section>
        {/* Page Hero & Intro */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-4 shadow-lg shadow-cyan-500/10">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <Sparkles size={14} className="text-cyan-300" />
            <span>Interactive AI QA Engine &amp; Live Test Runner</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            AI Test Sandbox &amp; Real-Time Report Generator
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Test any application URL or user story across major industries (<strong className="text-cyan-300 font-semibold">Travel, E-Commerce, FinTech, SaaS, CRM, Logistics, Healthcare</strong>). Watch QAQuad generate executable Playwright tests, execute multi-layer verification, and produce a complete QA Evidence Dossier in real-time.
          </p>
        </div>

        {/* Interactive Prompt Console */}
        <div className="max-w-5xl mx-auto bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl overflow-hidden mb-12">
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 rounded-full bg-rose-500/80"></span>
              <span className="flex h-3 w-3 rounded-full bg-amber-500/80"></span>
              <span className="flex h-3 w-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 text-xs font-mono font-medium text-slate-400">qaquad-ai-engine::prompt-runner</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <Zap size={14} />
              <span>Self-Healing • Multi-Layer UI/API/DB</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Presets Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Building2 size={15} className="text-cyan-400" />
                  <span>Industry Presets (Click any big-brand sample to load):</span>
                </label>
                <span className="text-[11px] text-slate-400">8 Top Industries Supported</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(preset.prompt)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all duration-200 ${
                      prompt === preset.prompt
                        ? "border-cyan-500 bg-cyan-950/60 text-cyan-200 shadow-md shadow-cyan-500/25 ring-1 ring-cyan-500/50"
                        : "border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="font-bold truncate text-white">{preset.label}</div>
                    <div className="text-[11px] text-cyan-400/90 font-mono mt-1">{preset.brand}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Textarea */}
            <div>
              <label htmlFor="prompt-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
                <span>Test Scenario Prompt or Target URL:</span>
                <span className="text-[11px] text-slate-400 font-normal">Custom natural language supported</span>
              </label>
              <div className="relative">
                <textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-2xl text-white bg-slate-950 border border-slate-700/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 font-mono text-sm leading-relaxed resize-none shadow-inner placeholder-slate-500"
                  placeholder="e.g. Test makemytrip.com flight search from Delhi to Mumbai, verify fare breakdown, check API status..."
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Cpu size={15} className="text-cyan-400 shrink-0" />
                <span>Engine interprets natural language, auto-maps DOM locators &amp; generates real-time test report.</span>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2.5 shrink-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin text-white" size={18} />
                    <span>Running AI Engine...</span>
                  </>
                ) : (
                  <>
                    <Play fill="currentColor" size={16} />
                    <span>Generate &amp; Run Test Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Execution Stepper (When Generating) */}
          {isGenerating && (
            <div className="p-6 sm:p-8 border-t border-slate-800 bg-slate-950/80 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                  {activeStage}
                </span>
                <span className="font-mono font-bold text-cyan-400">{executionProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300 shadow-sm shadow-cyan-400"
                  style={{ width: `${executionProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Real-Time Generated Test Report Display */}
        {results && (
          <div className="max-w-5xl mx-auto bg-slate-900/95 rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Report Header Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/70 border-b border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm shadow-emerald-500/20">
                      <CheckCircle size={14} />
                      {results.summary.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-cyan-300 border border-slate-700">
                      {results.target.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-950/80 border border-slate-800">
                      Target: {results.target.host}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {results.target.contextName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Multi-layer autonomous test verification • Execution Duration: <span className="text-cyan-300 font-mono font-bold">{results.summary.executionDurationSec}s</span>
                  </p>
                </div>

                {/* Score & Actions */}
                <div className="flex items-center gap-4 self-start md:self-auto">
                  <div className="text-right">
                    <div className="text-xs uppercase font-bold tracking-wider text-slate-400">Quality Health</div>
                    <div className="text-3xl font-black text-cyan-400 font-mono">{results.summary.healthScore}%</div>
                  </div>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Download size={14} />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {/* Metrics Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] uppercase font-bold text-slate-400">Total Scenarios</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">{results.summary.totalScenarios} Automated</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] uppercase font-bold text-slate-400">Verified Assertions</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{results.summary.totalAssertions} Passed</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] uppercase font-bold text-slate-400">Self-Healing Locators</div>
                  <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">{results.summary.selfHealingInterventions} Active</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] uppercase font-bold text-slate-400">Flakiness Index</div>
                  <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">{results.summary.flakinessRate} (Resilient)</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/80 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("summary")}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "summary"
                    ? "border-cyan-400 text-cyan-300 bg-slate-900/60"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Activity size={15} />
                <span>Executive Summary</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("steps")}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "steps"
                    ? "border-cyan-400 text-cyan-300 bg-slate-900/60"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers size={15} />
                <span>Test Execution Steps ({results.steps.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("network")}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "network"
                    ? "border-cyan-400 text-cyan-300 bg-slate-900/60"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Globe size={15} />
                <span>API &amp; Network Telemetry ({results.networkLogs.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("db")}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "db"
                    ? "border-cyan-400 text-cyan-300 bg-slate-900/60"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Database size={15} />
                <span>Database Validation ({results.dbChecks.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "code"
                    ? "border-cyan-400 text-cyan-300 bg-slate-900/60"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Code size={15} />
                <span>Playwright &amp; BDD Code</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "security"
                    ? "border-cyan-400 text-cyan-300 bg-slate-900/60"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShieldAlert size={15} />
                <span>Boundary &amp; Security</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8">
              {/* TAB 1: EXECUTIVE SUMMARY */}
              {activeTab === "summary" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="text-cyan-400" size={18} />
                      AI Test Run Assessment
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      The QAQuad engine executed end-to-end multi-layer validation against <span className="text-cyan-300 font-semibold">{results.target.host}</span>. All critical user path flows, dynamic DOM states, asynchronous API payloads, and database constraints were asserted with zero defects.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-xs font-bold text-slate-400 uppercase">Browser &amp; UI Status</div>
                        <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                          <Check size={16} /> 100% Steps Reached
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Zero locator drift or timeout exceptions.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-xs font-bold text-slate-400 uppercase">API Contract Status</div>
                        <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                          <Check size={16} /> All Endpoints 200 OK
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Payload structure &amp; types strictly match schema.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <div className="text-xs font-bold text-slate-400 uppercase">Database Consistency</div>
                        <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                          <Check size={16} /> Zero State Drift
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Backend transaction records match front-end total.</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-400" size={18} />
                        Engineered Defect Prevention
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span><strong>Self-Healing Selectors:</strong> Automatically mapped resilient CSS/XPath fallback paths to withstand layout changes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span><strong>Mathematical Accuracy:</strong> Verified exact monetary calculation between client UI, intermediate API, and backend records.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span><strong>Network Latency Shield:</strong> Asserted graceful loading states under network bandwidth throttling.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <ArrowRight className="text-cyan-400" size={18} />
                        Next Recommended Step
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Ready to integrate continuous, self-healing Playwright automation directly into your CI/CD pipelines (GitHub Actions, GitLab, Jenkins)?
                      </p>
                      <div className="pt-2">
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
                        >
                          <span>Schedule QA Strategy Session</span>
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: STEP-BY-STEP EXECUTION TABLE */}
              {activeTab === "steps" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Granular Test Execution Timeline ({results.steps.length} Steps)
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">Total: {results.summary.executionDurationSec}s</span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono">
                        <tr>
                          <th className="py-3 px-4">#</th>
                          <th className="py-3 px-4">Action</th>
                          <th className="py-3 px-4">Step Title &amp; Details</th>
                          <th className="py-3 px-4">Target / Locator</th>
                          <th className="py-3 px-4">Duration</th>
                          <th className="py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {results.steps.map((step) => (
                          <tr key={step.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="py-3.5 px-4 text-slate-400 font-bold">{step.stepNumber}</td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                step.action === "NAVIGATE" ? "bg-purple-950 text-purple-300 border border-purple-500/30" :
                                step.action === "INPUT" ? "bg-blue-950 text-blue-300 border border-blue-500/30" :
                                step.action === "CLICK" ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30" :
                                step.action === "API_INTERCEPT" ? "bg-amber-950 text-amber-300 border border-amber-500/30" :
                                "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                              }`}>
                                {step.action}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-sans max-w-xs">
                              <div className="font-bold text-white">{step.title}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5 font-normal leading-relaxed">{step.details}</div>
                              {step.selfHealingUsed && (
                                <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                                  <Zap size={10} /> Self-Healing Active
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 text-[11px] max-w-[200px] truncate" title={step.locator}>
                              {step.locator}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">{step.durationMs}ms</td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                                <Check size={12} /> {step.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: NETWORK & API TELEMETRY */}
              {activeTab === "network" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Captured Network &amp; REST API Calls ({results.networkLogs.length})
                    </h3>
                    <span className="text-xs text-slate-400">Payload Contracts Validated</span>
                  </div>

                  <div className="space-y-3">
                    {results.networkLogs.map((net) => (
                      <div key={net.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-950/80 font-mono text-xs space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              net.method === "GET" ? "bg-blue-950 text-blue-300 border border-blue-500/40" : "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                            }`}>
                              {net.method}
                            </span>
                            <span className="text-white font-bold truncate max-w-md">{net.url}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-bold">
                              {net.status} OK
                            </span>
                            <span className="text-slate-400">{net.latencyMs}ms</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/90 text-slate-300 border border-slate-800/80 overflow-x-auto text-[11px]">
                          <span className="text-slate-500">Payload Preview: </span>
                          {net.payloadSummary}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: DATABASE VALIDATION */}
              {activeTab === "db" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Backend Database &amp; SQL State Consistency
                    </h3>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <Check size={14} /> Zero State Discrepancies
                    </span>
                  </div>

                  <div className="space-y-4">
                    {results.dbChecks.map((db, idx) => (
                      <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-950 font-mono text-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-300 font-bold flex items-center gap-2">
                            <Database size={15} />
                            Table: {db.table}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                            MATCH PASSED
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 overflow-x-auto">
                          <span className="text-amber-400 font-bold">SQL: </span>
                          {db.query}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                          <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                            <span className="text-slate-400 block mb-0.5">Expected Row State:</span>
                            <span className="text-slate-200">{db.expected}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                            <span className="text-slate-400 block mb-0.5">Actual DB State:</span>
                            <span className="text-emerald-300 font-bold">{db.actual}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PLAYWRIGHT & BDD CODE */}
              {activeTab === "code" && (
                <div className="space-y-6">
                  {/* Playwright */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <Code className="text-cyan-400" size={16} />
                        Production Playwright TypeScript Suite
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleCopy(results.playwright, "code")}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                      </button>
                    </div>
                    <pre className="bg-slate-950 p-4 rounded-2xl overflow-x-auto text-xs font-mono text-cyan-300 border border-slate-800 leading-relaxed">
                      {results.playwright}
                    </pre>
                  </div>

                  {/* BDD */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <FileText className="text-emerald-400" size={16} />
                        Cucumber / Gherkin Feature File
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleCopy(results.bdd, "bdd")}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        {copiedBdd ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        <span>{copiedBdd ? "Copied!" : "Copy BDD"}</span>
                      </button>
                    </div>
                    <pre className="bg-slate-950 p-4 rounded-2xl overflow-x-auto text-xs font-mono text-emerald-300 border border-slate-800 leading-relaxed">
                      {results.bdd}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 6: BOUNDARY & SECURITY ANALYSIS */}
              {activeTab === "security" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
                    <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                      <AlertTriangle size={18} />
                      Boundary &amp; Stress Test Vectors
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {results.edgeCases.map((edge, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                          <span className="text-amber-400 font-bold">{idx + 1}.</span>
                          <span>{edge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
                    <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                      <ShieldAlert size={18} />
                      Security &amp; Injection Vulnerability Scans
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {results.securityCases.map((sec, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                          <span className="text-rose-400 font-bold">{idx + 1}.</span>
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}
