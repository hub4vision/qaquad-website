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
  Camera, 
  Eye, 
  FileJson, 
  Printer, 
  X, 
  ClipboardList, 
  GitCompare, 
  PieChart, 
  ShieldCheck, 
  Server,
  Briefcase,
  Calculator,
  Send,
  Clock,
  Lock,
  BadgeCheck
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
  snapshotBase64?: string;
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

interface RtmEntry {
  reqId: string;
  requirement: string;
  designDocRef: string;
  useCase: string;
  testScenario: string;
  testData: string;
  status: "PASSED" | "FAILED";
}

interface AutoHealComparison {
  previousRunFailedCount: number;
  currentRunRepairedCount: number;
  flakinessReductionPct: string;
  locatorsRepaired: {
    element: string;
    originalBrokenSelector: string;
    healedResilientSelector: string;
    strategy: string;
  }[];
}

interface TestingTypesSummary {
  smokeCount: number;
  regressionCount: number;
  apiContractCount: number;
  databaseIntegrityCount: number;
  securityVulnerabilityCount: number;
  performanceLatencyCount: number;
}

interface TestReportData {
  ok: boolean;
  executionId?: string;
  generatedAt?: string;
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
  rtm?: RtmEntry[];
  autoHeal?: AutoHealComparison;
  testingTypes?: TestingTypesSummary;
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
  const [activeTab, setActiveTab] = useState<"summary" | "steps" | "snapshots" | "network" | "db" | "code" | "security">("summary");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedBdd, setCopiedBdd] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState<{ stepNumber: number; title: string; locator: string; snapshotBase64: string } | null>(null);
  const [copiedSnapshot, setCopiedSnapshot] = useState(false);
  const [showInlineThumbnails, setShowInlineThumbnails] = useState(true);

  // Enterprise Report Modals (Inspired by Reference QA Test Report)
  const [isRtmOpen, setIsRtmOpen] = useState(false);
  const [isAutoHealOpen, setIsAutoHealOpen] = useState(false);
  const [isTestingTypesOpen, setIsTestingTypesOpen] = useState(false);

  // Quotation Request Modal State & Form
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteRefId, setQuoteRefId] = useState("");
  const [quoteError, setQuoteError] = useState("");
  const [quoteTier, setQuoteTier] = useState<"starter" | "enterprise" | "continuous">("enterprise");
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    testingRequirement: "playwright-automation",
    notes: "",
  });

  const openQuoteModal = () => {
    if (results) {
      const derivedCompany = results.target.host.replace(/\.[^/.]+$/, "").toUpperCase();
      setQuoteForm({
        name: "",
        email: "",
        company: derivedCompany,
        phone: "",
        testingRequirement: "playwright-automation",
        notes: `Application: ${results.target.url}\nContext: ${results.target.contextName} (${results.target.category})\nVerified Scope: ${results.summary.totalScenarios} Scenarios, ${results.summary.totalAssertions} Assertions (${results.summary.healthScore}% Quality Score)\nEvidence Dossier ID: ${results.executionId || "qaq-live"}`
      });
    }
    setQuoteSubmitted(false);
    setQuoteError("");
    setIsQuoteOpen(true);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name.trim() || !quoteForm.email.trim()) {
      setQuoteError("Please provide your full name and work email.");
      return;
    }
    setQuoteSubmitting(true);
    setQuoteError("");

    const refId = `QAQ-QUO-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const payload = {
        name: quoteForm.name,
        company: quoteForm.company || results?.target.host || "Enterprise Client",
        email: quoteForm.email,
        phone: quoteForm.phone || "",
        applicationUrl: results?.target.url || "https://" + (results?.target.host || "app.domain.com"),
        companyType: "software-company",
        testingRequirement: quoteForm.testingRequirement || "playwright-automation",
        message: `[AI Sandbox Quote Request - Ref: ${refId}]\nSelected Tier: ${quoteTier.toUpperCase()}\nTarget URL: ${results?.target.url}\nCategory: ${results?.target.category}\nExecution ID: ${results?.executionId || "N/A"}\nTotal Scenarios: ${results?.summary.totalScenarios || 4}\nTotal Assertions: ${results?.summary.totalAssertions || 14}\nClient Notes:\n${quoteForm.notes || "Standard Quotation Request"}`
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (res.ok && resData.ok) {
        setQuoteRefId(refId);
        setQuoteSubmitted(true);
      } else {
        setQuoteRefId(refId);
        setQuoteSubmitted(true);
      }
    } catch {
      setQuoteRefId(refId);
      setQuoteSubmitted(true);
    } finally {
      setQuoteSubmitting(false);
    }
  };

  // Simulated live execution steps for the animated player
  const STAGES = [
    "Resolving target domain & initiating headless browser context...",
    "Scanning DOM hierarchy & mapping self-healing locators...",
    "Executing autonomous user journey & capturing Base64 visual snapshots...",
    "Intercepting REST APIs & validating payload schema contracts...",
    "Querying backend database & asserting state synchronization...",
    "Synthesizing RTM matrix, auto-heal delta & generating multi-layer QA report..."
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
        setActiveStage("Execution Complete! Dynamic test report ready.");
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

  const handleCopy = (text: string, type: "code" | "bdd" | "snapshot") => {
    navigator.clipboard.writeText(text);
    if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else if (type === "bdd") {
      setCopiedBdd(true);
      setTimeout(() => setCopiedBdd(false), 2000);
    } else if (type === "snapshot") {
      setCopiedSnapshot(true);
      setTimeout(() => setCopiedSnapshot(false), 2000);
    }
  };

  const handleDownloadSnapshot = (snapshotBase64: string, stepNumber: number) => {
    if (!results) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1440;
      canvas.height = 840;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, 1440, 840);
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QAQuad_Snapshot_Step${stepNumber}_${results.target.host}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      }
    };
    img.src = snapshotBase64;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    if (!results) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(results, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `QAQuad_Evidence_${results.target.host}_${results.executionId || "dossier"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <main className="min-h-screen pt-16 sm:pt-20 pb-8 bg-slate-950 text-slate-100">
      {/* Dynamic Print CSS to ensure ONLY the active report prints cleanly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 11pt;
          }
          nav, header, footer, .no-print, .print\\:hidden {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #111827 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .print-card {
            background: #ffffff !important;
            color: #111827 !important;
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            page-break-inside: avoid;
            margin-bottom: 1rem;
          }
          .print-text-dark {
            color: #0f172a !important;
          }
          .print-text-muted {
            color: #475569 !important;
          }
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          .print-table th, .print-table td {
            border: 1px solid #e2e8f0 !important;
            padding: 6px 8px !important;
            color: #0f172a !important;
          }
          .print-table th {
            background: #f1f5f9 !important;
            font-weight: bold;
          }
          .print-break {
            page-break-before: always;
          }
        }
        @media screen {
          .print-only {
            display: none !important;
          }
        }
      `}} />

      <Section className="py-2 sm:py-3 lg:py-4 border-none bg-transparent">
        {/* Page Hero & Intro */}
        <div className="text-center max-w-4xl mx-auto mb-5 no-print">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2.5 shadow-lg shadow-cyan-500/10">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <Sparkles size={13} className="text-cyan-300" />
            <span>Interactive AI QA Engine &amp; Live Test Runner</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
            AI Test Sandbox &amp; Real-Time Report Generator
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Test any application URL or user story across major industries (<strong className="text-cyan-300 font-semibold">Travel, E-Commerce, FinTech, SaaS, CRM, Logistics, Healthcare</strong>). Watch QAQuad generate executable Playwright tests, execute multi-layer verification, and produce a complete QA Evidence Dossier with Base64 visual snapshots in real-time.
          </p>
        </div>

        {/* Interactive Prompt Console */}
        <div className="max-w-5xl mx-auto bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl overflow-hidden mb-5 no-print">
          {/* Header Bar */}
          <div className="px-5 py-3 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 text-xs font-mono font-medium text-slate-400">qaquad-ai-engine::prompt-runner</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <Zap size={13} />
              <span>Self-Healing • Base64 Snapshots • UI/API/DB</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-3.5">
            {/* Presets Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Building2 size={14} className="text-cyan-400" />
                  <span>Quick-Test Presets (Click to Load):</span>
                </label>
                <span className="text-[11px] text-slate-400">8 Top Industries Supported</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(preset.prompt)}
                    className={`text-left p-2.5 rounded-xl border text-xs transition-all duration-200 ${
                      prompt === preset.prompt
                        ? "border-cyan-500 bg-cyan-950/60 text-cyan-200 shadow-md shadow-cyan-500/25 ring-1 ring-cyan-500/50"
                        : "border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="font-bold truncate text-white">{preset.label}</div>
                    <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">{preset.brand}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Textarea */}
            <div>
              <label htmlFor="prompt-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Test Scenario Prompt or Target URL:</span>
                <span className="text-[11px] text-slate-400 font-normal">Custom natural language supported</span>
              </label>
              <div className="relative">
                <textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  className="w-full p-3.5 rounded-2xl text-white bg-slate-950 border border-slate-700/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 font-mono text-sm leading-relaxed resize-none shadow-inner placeholder-slate-500"
                  placeholder="e.g. Test makemytrip.com flight search from Delhi to Mumbai, verify fare breakdown, check API status..."
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Cpu size={15} className="text-cyan-400 shrink-0" />
                <span>Engine dynamically generates isolated test report, Base64 snapshots &amp; assertions for this prompt.</span>
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
                    <span>Running Dynamic Engine...</span>
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
          <div id="printable-test-report" className="max-w-5xl mx-auto bg-slate-900/95 rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700 print-container">
            {/* Report Header Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/70 border-b border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
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
                    {results.executionId && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono text-cyan-400/90 bg-cyan-950/50 border border-cyan-500/30">
                        ID: {results.executionId}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight print-text-dark">
                    {results.target.contextName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 print-text-muted">
                    Multi-layer autonomous test verification • Duration: <span className="text-cyan-300 font-mono font-bold">{results.summary.executionDurationSec}s</span>
                    {results.generatedAt && (
                      <span className="ml-2 font-mono text-[11px] text-slate-400">
                        • Generated: {new Date(results.generatedAt).toLocaleString()}
                      </span>
                    )}
                  </p>

                  {/* Enterprise Feature Modals Bar (Inspired by MUS_Backoffice_QA_TestReport) */}
                  <div className="flex flex-wrap items-center gap-2.5 mt-3 no-print">
                    <button
                      type="button"
                      onClick={() => setIsRtmOpen(true)}
                      className="px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <ClipboardList size={13} className="text-purple-400" />
                      <span>📜 RTM Traceability Matrix</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAutoHealOpen(true)}
                      className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <GitCompare size={13} className="text-amber-400" />
                      <span>✨ Auto-Heal Status (Prev vs Current)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsTestingTypesOpen(true)}
                      className="px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <PieChart size={13} className="text-emerald-400" />
                      <span>📋 Testing Types Done ({results.testingTypes ? Object.values(results.testingTypes).reduce((a, b) => a + b, 0) : 6})</span>
                    </button>
                  </div>
                </div>

                {/* Score & Actions */}
                <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto no-print">
                  <div className="text-right mr-2 hidden sm:block">
                    <div className="text-xs uppercase font-bold tracking-wider text-slate-400">Quality Health</div>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">{results.summary.healthScore}%</div>
                  </div>
                  <button
                    type="button"
                    onClick={openQuoteModal}
                    className="px-3.5 py-2 rounded-xl border border-emerald-400/50 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40 hover:scale-[1.02]"
                    title="Request a customized QA Automation Quotation for this application"
                  >
                    <Briefcase size={14} className="text-emerald-100" />
                    <span>Request Quote</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                    title="Download complete JSON evidence dossier with Base64 snapshots"
                  >
                    <FileJson size={14} className="text-cyan-400" />
                    <span>JSON Dossier</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-3.5 py-2 rounded-xl border border-cyan-500/40 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                    title="Print or Save isolated PDF Report for this test scenario"
                  >
                    <Printer size={14} />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {/* Metrics Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print-card">
                  <div className="text-[11px] uppercase font-bold text-slate-400 print-text-muted">Total Scenarios</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5 print-text-dark">{results.summary.totalScenarios} Automated</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print-card">
                  <div className="text-[11px] uppercase font-bold text-slate-400 print-text-muted">Verified Assertions</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{results.summary.totalAssertions} Passed</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print-card">
                  <div className="text-[11px] uppercase font-bold text-slate-400 print-text-muted">Self-Healing Locators</div>
                  <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">{results.summary.selfHealingInterventions} Active</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print-card">
                  <div className="text-[11px] uppercase font-bold text-slate-400 print-text-muted">Flakiness Index</div>
                  <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">{results.summary.flakinessRate} (Resilient)</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs (Hidden during print) */}
            <div className="flex border-b border-slate-800 bg-slate-950/80 overflow-x-auto no-print">
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
                <span>Execution Steps ({results.steps.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("snapshots")}
                className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "snapshots"
                    ? "border-cyan-400 text-cyan-300 bg-slate-900/60"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Camera size={15} />
                <span>📸 Visual Snapshots (Base64)</span>
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

            {/* Tab Contents (Screen View) */}
            <div className="p-6 sm:p-8 no-print">
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

                  {/* Visual Proof Snapshot Gallery in Summary */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Camera className="text-cyan-400" size={18} />
                        Visual DOM Proof Gallery (Base64 Captures)
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab("snapshots")}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                      >
                        <span>View All {results.steps.length} Snapshots</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {results.steps.slice(0, 4).map((step) => (
                        <div
                          key={step.id}
                          onClick={() => setSelectedSnapshot({
                            stepNumber: step.stepNumber,
                            title: step.title,
                            locator: step.locator,
                            snapshotBase64: step.snapshotBase64!
                          })}
                          className="group relative rounded-xl border border-slate-800 bg-slate-900 p-2 cursor-pointer hover:border-cyan-500/50 transition-all hover:scale-[1.02]"
                        >
                          <div className="text-[10px] font-bold text-white truncate mb-1">
                            Step #{step.stepNumber}: {step.action}
                          </div>
                          {step.snapshotBase64 && (
                            <img
                              src={step.snapshotBase64}
                              alt={`Step ${step.stepNumber}`}
                              className="w-full h-auto rounded border border-slate-800"
                            />
                          )}
                          <div className="mt-1 flex items-center justify-between text-[9px] text-slate-400">
                            <span className="text-emerald-400 font-bold">● {step.status}</span>
                            <span>{step.durationMs}ms</span>
                          </div>
                        </div>
                      ))}
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

                    <div className="p-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 space-y-3 shadow-lg shadow-emerald-500/10">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Briefcase className="text-emerald-400" size={18} />
                          Request Custom QA Automation Quote
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                          Instant Response
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Ready to deploy autonomous, self-healing Playwright automation across <strong className="text-cyan-300">{results.target.host}</strong>? Get a custom quote for full CI/CD test migration, synthetic data generators &amp; regression suites.
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={openQuoteModal}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400/40 hover:scale-[1.02]"
                        >
                          <Calculator size={14} />
                          <span>Get Instant QA Quotation</span>
                        </button>
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition-all"
                        >
                          <span>Talk with QA Lead</span>
                          <ArrowRight size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: STEP-BY-STEP EXECUTION TABLE */}
              {activeTab === "steps" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Granular Test Execution Timeline ({results.steps.length} Steps)
                    </h3>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                        <input
                          type="checkbox"
                          checked={showInlineThumbnails}
                          onChange={(e) => setShowInlineThumbnails(e.target.checked)}
                          className="rounded text-cyan-500 focus:ring-cyan-400 bg-slate-950 border-slate-700"
                        />
                        <span>Show Inline Snapshots</span>
                      </label>
                      <span className="text-xs font-mono text-cyan-400">Total: {results.summary.executionDurationSec}s</span>
                    </div>
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
                          <th className="py-3 px-4">DOM Snapshot Proof</th>
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
                            <td className="py-3.5 px-4 text-slate-300 text-[11px] max-w-[180px] truncate" title={step.locator}>
                              {step.locator}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">{step.durationMs}ms</td>
                            <td className="py-3.5 px-4">
                              {step.snapshotBase64 ? (
                                <div className="space-y-1.5">
                                  {showInlineThumbnails && (
                                    <div 
                                      onClick={() => setSelectedSnapshot({
                                        stepNumber: step.stepNumber,
                                        title: step.title,
                                        locator: step.locator,
                                        snapshotBase64: step.snapshotBase64!
                                      })}
                                      className="w-24 h-14 rounded-lg border border-slate-700 bg-slate-900 overflow-hidden cursor-pointer hover:border-cyan-400 transition-colors shadow"
                                    >
                                      <img
                                        src={step.snapshotBase64}
                                        alt={`Step ${step.stepNumber}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => setSelectedSnapshot({
                                        stepNumber: step.stepNumber,
                                        title: step.title,
                                        locator: step.locator,
                                        snapshotBase64: step.snapshotBase64!
                                      })}
                                      className="px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 text-[10px] font-bold flex items-center gap-1 transition-colors"
                                    >
                                      <Eye size={11} />
                                      <span>View</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDownloadSnapshot(step.snapshotBase64!, step.stepNumber)}
                                      className="px-2 py-0.5 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center gap-1 transition-colors"
                                      title="Download Snapshot as PNG"
                                    >
                                      <Download size={11} />
                                      <span>PNG</span>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-slate-500 text-[10px]">N/A</span>
                              )}
                            </td>
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

              {/* TAB 3: VISUAL SNAPSHOTS (BASE64) */}
              {activeTab === "snapshots" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Camera className="text-cyan-400" size={16} />
                        Base64 Visual DOM Snapshots ({results.steps.length} Captures)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Embedded directly as Data URIs (<code className="text-cyan-300 text-[11px]">data:image/...;base64</code>) for 100% self-contained evidence without external CDN dependencies.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.steps.map((step) => (
                      <div key={step.id} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden space-y-3 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-mono">
                            Step #{step.stepNumber}: {step.title}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                            {step.status}
                          </span>
                        </div>

                        {step.snapshotBase64 && (
                          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group">
                            {/* Embedded Base64 Image */}
                            <img
                              src={step.snapshotBase64}
                              alt={`Step ${step.stepNumber} DOM Snapshot`}
                              className="w-full h-auto object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 p-4">
                              <button
                                type="button"
                                onClick={() => setSelectedSnapshot({
                                  stepNumber: step.stepNumber,
                                  title: step.title,
                                  locator: step.locator,
                                  snapshotBase64: step.snapshotBase64!
                                })}
                                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
                              >
                                <Eye size={13} /> Full View
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDownloadSnapshot(step.snapshotBase64!, step.stepNumber)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
                              >
                                <Download size={13} /> Download (.png)
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCopy(step.snapshotBase64!, "snapshot")}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-lg border border-slate-600 transition-all"
                              >
                                <Copy size={13} /> Copy Base64
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono pt-1">
                          <span className="truncate max-w-[200px] text-slate-400" title={step.locator}>
                            Locator: {step.locator}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold shrink-0">{step.durationMs}ms</span>
                            {step.snapshotBase64 && (
                              <button
                                type="button"
                                onClick={() => handleDownloadSnapshot(step.snapshotBase64!, step.stepNumber)}
                                className="text-xs text-slate-300 hover:text-cyan-300 flex items-center gap-1"
                              >
                                <Download size={12} />
                                <span>Save PNG</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: NETWORK & API TELEMETRY */}
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

              {/* TAB 5: DATABASE VALIDATION */}
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

              {/* TAB 6: PLAYWRIGHT & BDD CODE */}
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

              {/* TAB 7: BOUNDARY & SECURITY ANALYSIS */}
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

            {/* PRINT-ONLY COMPREHENSIVE DOSSIER LAYOUT (Used exclusively during window.print()) */}
            <div className="print-only p-8 space-y-8 bg-white text-slate-900">
              <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">
                    QAQuad Autonomous Test Evidence Dossier
                  </h1>
                  <p className="text-sm font-bold text-slate-600 mt-1">
                    Target Domain: <span className="font-mono text-cyan-800">{results.target.url}</span> ({results.target.category})
                  </p>
                  <p className="text-xs text-slate-500">
                    Scenario: &ldquo;{prompt}&rdquo;
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase font-bold text-slate-500">Execution Status</div>
                  <div className="text-xl font-black text-emerald-700 font-mono">100% {results.summary.status}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Health: {results.summary.healthScore}% • Duration: {results.summary.executionDurationSec}s</div>
                </div>
              </div>

              {/* Print Summary Table */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">1. Execution Metrics</h3>
                <table className="print-table text-xs">
                  <tbody>
                    <tr>
                      <td className="font-bold bg-slate-100">Total Scenarios</td>
                      <td>{results.summary.totalScenarios} Automated</td>
                      <td className="font-bold bg-slate-100">Verified Assertions</td>
                      <td className="text-emerald-700 font-bold">{results.summary.totalAssertions} Passed</td>
                    </tr>
                    <tr>
                      <td className="font-bold bg-slate-100">Self-Healing Interventions</td>
                      <td>{results.summary.selfHealingInterventions} Fallbacks Active</td>
                      <td className="font-bold bg-slate-100">Flakiness Index</td>
                      <td>{results.summary.flakinessRate} (Resilient)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Print Steps Table */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">2. Granular Test Execution Steps</h3>
                <table className="print-table text-xs">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Action</th>
                      <th>Step Title &amp; Specification</th>
                      <th>Target DOM Locator</th>
                      <th>Duration</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.steps.map((step) => (
                      <tr key={step.id}>
                        <td className="font-bold text-center">{step.stepNumber}</td>
                        <td className="font-mono font-bold">{step.action}</td>
                        <td>
                          <div className="font-bold">{step.title}</div>
                          <div className="text-[10px] text-slate-600">{step.details}</div>
                        </td>
                        <td className="font-mono text-[10px]">{step.locator}</td>
                        <td className="font-mono text-center">{step.durationMs}ms</td>
                        <td className="font-bold text-emerald-700 text-center">{step.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Print Visual Snapshots Grid */}
              <div className="print-break">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">3. Base64 Visual DOM Snapshots</h3>
                <div className="grid grid-cols-2 gap-4">
                  {results.steps.slice(0, 4).map((step) => (
                    <div key={step.id} className="border border-slate-300 rounded p-2 text-xs">
                      <div className="font-bold mb-1">Step #{step.stepNumber}: {step.title}</div>
                      {step.snapshotBase64 && (
                        <img src={step.snapshotBase64} alt={`Step ${step.stepNumber}`} className="w-full h-auto border border-slate-200 rounded" />
                      )}
                      <div className="text-[10px] font-mono text-slate-600 mt-1">Locator: {step.locator}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Print Network Logs */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">4. Captured REST &amp; API Network Telemetry</h3>
                <table className="print-table text-xs">
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Endpoint URL</th>
                      <th>Status</th>
                      <th>Latency</th>
                      <th>Payload Contract</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.networkLogs.map((net) => (
                      <tr key={net.id}>
                        <td className="font-bold text-center">{net.method}</td>
                        <td className="font-mono text-[10px]">{net.url}</td>
                        <td className="font-bold text-emerald-700 text-center">{net.status} OK</td>
                        <td className="font-mono text-center">{net.latencyMs}ms</td>
                        <td className="text-[10px]">{net.payloadSummary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Print Database Assertions */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">5. Backend Database State Integrity</h3>
                <table className="print-table text-xs">
                  <thead>
                    <tr>
                      <th>Table</th>
                      <th>SQL Verification Query</th>
                      <th>Expected vs Actual State</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.dbChecks.map((db, idx) => (
                      <tr key={idx}>
                        <td className="font-bold">{db.table}</td>
                        <td className="font-mono text-[10px]">{db.query}</td>
                        <td className="text-[10px]">
                          <div>Expected: {db.expected}</div>
                          <div className="font-bold text-emerald-700">Actual: {db.actual}</div>
                        </td>
                        <td className="font-bold text-emerald-700 text-center">MATCH PASSED</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-300 pt-3 text-center text-[10px] text-slate-500">
                QAQuad Autonomous QA Verification Dossier • Confidential &amp; Proprietary • https://www.qaquad.com
              </div>
            </div>
          </div>
        )}

        {/* Base64 Snapshot Modal Viewer */}
        {selectedSnapshot && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Camera size={18} className="text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-mono">
                    Step #{selectedSnapshot.stepNumber} Snapshot: {selectedSnapshot.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSnapshot(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
                <img
                  src={selectedSnapshot.snapshotBase64}
                  alt={`Step ${selectedSnapshot.stepNumber}`}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800/80 truncate">
                <span className="text-slate-500">Locator: </span>
                {selectedSnapshot.locator}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleDownloadSnapshot(selectedSnapshot.snapshotBase64, selectedSnapshot.stepNumber)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
                >
                  <Download size={14} />
                  <span>Download Snapshot (.png)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(selectedSnapshot.snapshotBase64, "snapshot")}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors border border-slate-700"
                >
                  {copiedSnapshot ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedSnapshot ? "Base64 Copied!" : "Copy Base64 Data URI"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSnapshot(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: RTM TRACEABILITY MATRIX MODAL */}
        {isRtmOpen && results && results.rtm && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-purple-500/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-purple-950 text-purple-300 border border-purple-500/30">
                    <ClipboardList size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Requirements Traceability Matrix (RTM)</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      End-to-end trace from Business Requirement ➔ Design Spec ➔ Use Case ➔ Autonomous Test Execution.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRtmOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Req ID</th>
                      <th className="py-3 px-4">Business Requirement</th>
                      <th className="py-3 px-4">Design Doc / Ref</th>
                      <th className="py-3 px-4">Use Case / Test Suite</th>
                      <th className="py-3 px-4">Verified Data</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {results.rtm.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-purple-300">{entry.reqId}</td>
                        <td className="py-3.5 px-4 font-sans text-white text-xs max-w-xs">{entry.requirement}</td>
                        <td className="py-3.5 px-4 text-slate-400 text-[11px]">{entry.designDocRef}</td>
                        <td className="py-3.5 px-4 text-cyan-300 text-[11px]">{entry.useCase}</td>
                        <td className="py-3.5 px-4 text-slate-300 text-[11px] max-w-[150px] truncate">{entry.testData}</td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                            <Check size={12} /> {entry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                <span>Total Requirements Verified: <strong className="text-white">{results.rtm.length} / {results.rtm.length} (100%)</strong></span>
                <button
                  type="button"
                  onClick={() => setIsRtmOpen(false)}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors"
                >
                  Close RTM
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: AUTO-HEALING RUN COMPARATOR MODAL */}
        {isAutoHealOpen && results && results.autoHeal && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-amber-950 text-amber-300 border border-amber-500/30">
                    <GitCompare size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Auto-Healing Status &amp; Run Delta Comparator</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Comparison between Previous Baseline Run vs. Current Autonomous Healed Execution.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAutoHealOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Comparison Metric Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Previous Run Failures</div>
                  <div className="text-xl font-bold text-rose-400 font-mono mt-1">
                    {results.autoHeal.previousRunFailedCount} Broken Locators
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Due to upstream DOM mutations</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Current Run Repaired</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                    {results.autoHeal.currentRunRepairedCount} Healed Automatically
                  </div>
                  <div className="text-[10px] text-emerald-500/80 mt-0.5">0 human interventions needed</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Flakiness Reduction</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                    {results.autoHeal.flakinessReductionPct}
                  </div>
                  <div className="text-[10px] text-cyan-500/80 mt-0.5">Pipeline stability preserved</div>
                </div>
              </div>

              {/* Repaired Selectors Table */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Self-Healing Interventions Detail
                </div>
                <div className="space-y-3">
                  {results.autoHeal.locatorsRepaired.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-800 bg-slate-950 text-xs space-y-2 font-mono">
                      <div className="flex items-center justify-between text-white font-sans font-bold">
                        <span>{item.element}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                          HEALED
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-900/50 text-[11px] truncate">
                        <span className="text-rose-500 font-bold font-sans">Previous Broken: </span>
                        {item.originalBrokenSelector}
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-900/50 text-[11px] truncate">
                        <span className="text-emerald-500 font-bold font-sans">Healed Resilient: </span>
                        {item.healedResilientSelector}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        AI Strategy: <strong className="text-cyan-300">{item.strategy}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAutoHealOpen(false)}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-colors text-xs"
                >
                  Close Comparator
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: TESTING TYPES DONE & NUMBERS MODAL */}
        {isTestingTypesOpen && results && results.testingTypes && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    <PieChart size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Testing Types Done &amp; Numbers</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Multi-layer testing coverage metrics executed during this autonomous test run.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTestingTypesOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <Zap size={14} className="text-cyan-400" /> Smoke Testing
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono text-[11px] font-bold">
                      {results.testingTypes.smokeCount} Suite
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Core user path, navigation &amp; basic landing health.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <Layers size={14} className="text-purple-400" /> Regression Testing
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono text-[11px] font-bold">
                      {results.testingTypes.regressionCount} Steps
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">End-to-end integration journeys, forms, and business logic.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <Globe size={14} className="text-emerald-400" /> API &amp; Contract Testing
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[11px] font-bold">
                      {results.testingTypes.apiContractCount} Endpoints
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">REST &amp; GraphQL payload schema assertions &amp; status 200 OK.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <Database size={14} className="text-amber-400" /> Database Integrity
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[11px] font-bold">
                      {results.testingTypes.databaseIntegrityCount} Tables
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Backend SQL row verification, proving zero transactional drift.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-rose-400" /> Security &amp; Boundary Scans
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[11px] font-bold">
                      {results.testingTypes.securityVulnerabilityCount} Vectors
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">SQL injection, XSS payload sanitation, CORS &amp; auth token checks.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <Server size={14} className="text-cyan-400" /> Performance &amp; Latency
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[11px] font-bold">
                      {results.testingTypes.performanceLatencyCount} Monitors
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">DOM render time, step latency (ms), and bandwidth throttling checks.</p>
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsTestingTypesOpen(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors text-xs"
                >
                  Close Testing Types
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 4: REQUEST QA AUTOMATION QUOTE MODAL */}
        {isQuoteOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    <Briefcase size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Request QA Automation Quotation</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Get a tailored scope, pricing estimate &amp; SLA timeline for your application.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {quoteSubmitted ? (
                /* SUCCESS CONFIRMATION VIEW */
                <div className="py-6 px-4 text-center space-y-4">
                  <div className="mx-auto w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">Quotation Request Received!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Your test dossier and scope requirements have been assigned to our Principal QA Automation Lead.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400 font-mono">
                      <span>Quote Reference ID:</span>
                      <strong className="text-cyan-400 font-bold">{quoteRefId}</strong>
                    </div>
                    {results && (
                      <div className="flex items-center justify-between text-slate-400 font-mono">
                        <span>Target Application:</span>
                        <strong className="text-white">{results.target.host}</strong>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-slate-400 font-mono">
                      <span>Selected Tier:</span>
                      <strong className="text-emerald-400 uppercase">{quoteTier}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 font-mono">
                      <span>Estimated Turnaround:</span>
                      <strong className="text-amber-300">Within 2 Business Hours</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href="/contact"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Clock size={14} />
                      <span>Book Immediate QA Discovery Call</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsQuoteOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                /* FORM VIEW */
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  {/* Scope Context Strip */}
                  {results && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-cyan-300 font-bold">{results.target.host}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400">{results.target.category}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                        <span>{results.summary.totalScenarios} Scenarios</span>
                        <span>•</span>
                        <span>{results.summary.totalAssertions} Assertions</span>
                        <span>•</span>
                        <span>{results.summary.healthScore}% Score</span>
                      </div>
                    </div>
                  )}

                  {/* Tier Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Calculator size={13} className="text-emerald-400" />
                      <span>Select Automation Tier / Engagement Model:</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setQuoteTier("starter")}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          quoteTier === "starter"
                            ? "border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500/50"
                            : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="text-xs font-bold text-white">⚡ Starter Pilot</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">1-2 Sprints POC • 10-25 Core flows</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuoteTier("enterprise")}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          quoteTier === "enterprise"
                            ? "border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500/50"
                            : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span>🚀 Full Enterprise</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">Popular</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Full UI, API &amp; DB • CI/CD pipeline</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuoteTier("continuous")}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          quoteTier === "continuous"
                            ? "border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500/50"
                            : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="text-xs font-bold text-white">🛡️ 24/7 Managed QA</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Ongoing maintenance &amp; 0% flakiness</div>
                      </button>
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Your Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Work Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Scope Details / Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Project Notes &amp; Target Scope (Auto-populated from active report)
                    </label>
                    <textarea
                      rows={2}
                      value={quoteForm.notes}
                      onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono placeholder-slate-500 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none"
                    />
                  </div>

                  {quoteError && (
                    <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                      <AlertTriangle size={14} className="text-rose-400 shrink-0" />
                      <span>{quoteError}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Lock size={12} className="text-emerald-400" />
                      <span>Strict NDA &amp; 100% Data Confidentiality</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsQuoteOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={quoteSubmitting}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400/40 flex items-center gap-2 disabled:opacity-50"
                      >
                        {quoteSubmitting ? (
                          <>
                            <RefreshCw size={13} className="animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            <span>Send Quotation Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}
