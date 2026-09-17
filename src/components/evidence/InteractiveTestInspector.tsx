"use client";

import { useState } from "react";
import { clsx } from "@/lib/clsx";

interface TestTab {
  id: "console" | "trace" | "api" | "selfheal";
  label: string;
  badge: string;
}

const tabs: TestTab[] = [
  { id: "console", label: "Live Test Runner", badge: "Playwright" },
  { id: "selfheal", label: "Self-Healing Engine", badge: "AI Autonomic" },
  { id: "trace", label: "DOM & Visual Trace", badge: "Trace Viewer" },
  { id: "api", label: "API & SQL Contract Diff", badge: "Multi-Tier" },
];

export function InteractiveTestInspector() {
  const [activeTab, setActiveTab] = useState<TestTab["id"]>("console");
  const [isRunning, setIsRunning] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const handleReplay = () => {
    setIsRunning(true);
    setRunKey((prev) => prev + 1);
    setTimeout(() => {
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="relative mx-auto max-w-5xl rounded-3xl border border-slate-700/80 bg-[#060a12] shadow-2xl shadow-cyan-950/50 overflow-hidden">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#0c1424] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-xs text-slate-400">
            qaquad-runner v2.8.4 // chromium-headless-parallel
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReplay}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/60 px-3 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60 transition-colors disabled:opacity-50"
          >
            <span className={clsx("h-2 w-2 rounded-full bg-cyan-400", isRunning && "animate-spin")} />
            {isRunning ? "Executing Scenario..." : "Replay Simulation"}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800/80 bg-[#090f1b] overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "border-cyan-400 bg-slate-900/60 text-white font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30",
            )}
          >
            <span>{tab.label}</span>
            <span
              className={clsx(
                "rounded px-1.5 py-0.5 text-[10px] font-mono",
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-slate-800 text-slate-400",
              )}
            >
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6 font-mono text-xs leading-relaxed min-h-[340px]">
        {/* TAB 1: Console / Test Runner */}
        {activeTab === "console" && (
          <div key={`console-${runKey}`} className="space-y-2 text-slate-300">
            <p className="text-slate-300">
              <span className="text-cyan-400">⚡ [DISCOVERY]</span> Initiating multi-agent run for{" "}
              <span className="text-white">https://app.enterprise-saas.com/checkout/flow</span>
            </p>
            <p className="text-slate-300">
              <span className="text-blue-400">ℹ [BROWSER]</span> Initialized Chromium worker 1 (Viewport 1440x900)
            </p>
            <p className="text-slate-200">
              <span className="text-emerald-400">✓ [STEP 01]</span> Navigated to target checkout portal in 242ms
            </p>
            <p className="text-slate-200">
              <span className="text-emerald-400">✓ [STEP 02]</span> Injected test fixture customer profile:{" "}
              <span className="text-cyan-300">usr_enterprise_tier_491</span>
            </p>
            <div className="my-2 rounded-lg border border-amber-500/30 bg-amber-950/20 p-2.5 text-amber-300">
              <span className="font-bold">⚠️ [DOM RESILIENCE]:</span> Selector{" "}
              <code className="text-amber-200">button[data-testid='submit-order-v1']</code> missing due to deploy
              commit <code className="text-amber-200">#4fa81</code>.
              <br />
              <span className="text-emerald-300 font-bold">
                → Autonomous Self-Heal Activated:
              </span>{" "}
              Resolved target button via semantic text & visual bounds (Confidence: 99.4%) in 12ms.
            </div>
            <p className="text-slate-200">
              <span className="text-emerald-400">✓ [STEP 03]</span> Order submitted. Stripe PaymentIntent{" "}
              <span className="text-cyan-300">pi_3Mv528Lkd</span> confirmed.
            </p>
            <p className="text-slate-200">
              <span className="text-emerald-400">✓ [STEP 04]</span> SQL Verification: Querying PostgreSQL{" "}
              <code className="text-cyan-200">SELECT status FROM orders WHERE id=...</code> →{" "}
              <span className="text-emerald-400 font-bold">&quot;COMPLETED&quot;</span>
            </p>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-slate-400">
              <span>Tests: 4 Passed, 0 Failed, 1 Self-Healed</span>
              <span className="text-emerald-400 font-bold">Total Duration: 1.48s (3.8x baseline)</span>
            </div>
          </div>
        )}

        {/* TAB 2: Self-Healing Engine */}
        {activeTab === "selfheal" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                Zero-Flake Autonomous Locator Adaptation
              </p>
              <p className="text-slate-300 text-xs">
                When development teams update component libraries (e.g. Tailwind, React refactors), old test frameworks crash. QAQuad intercepts locator misses and auto-heals without stopping test suites.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
                <p className="text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
                  Broken Legacy Selector (Old)
                </p>
                <code className="text-rose-200 block bg-black/40 p-2 rounded border border-rose-900/50 overflow-x-auto">
                  button.btn-primary.submit-btn-v1#order-submit
                </code>
                <p className="text-[11px] text-slate-400 mt-2">
                  Result: Element not found error in standard Playwright/Selenium runs.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                  QAQuad Auto-Healed Target (Resolved)
                </p>
                <code className="text-emerald-200 block bg-black/40 p-2 rounded border border-emerald-900/50 overflow-x-auto">
                  getByRole(&apos;button&apos;, &#123; name: /complete order/i &#125;)
                </code>
                <p className="text-[11px] text-emerald-300 mt-2">
                  Matched via Semantic tree + Geometry coordinates. Auto-generates PR patch.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOM & Visual Trace */}
        {activeTab === "trace" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Trace Timeline: 0.00s ──── 0.50s ──── 1.00s ──── 1.48s</span>
              <span className="text-cyan-400 font-bold">100% Visual Fidelity</span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="rounded bg-cyan-950 px-2 py-0.5 text-cyan-300 text-[10px] font-bold">
                  SNAPSHOT @ 0.42s
                </span>
                <span className="text-white text-xs">Modal DOM Open &amp; Focused</span>
              </div>
              <p className="text-slate-400 text-xs">
                Captured full render tree, network waterfall (14 requests, 0 dropped), and accessibility tree tree node count: 184.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] text-slate-300">
                  Network: 200 OK (Stripe SDK)
                </span>
                <span className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] text-slate-300">
                  Viewport: Mobile + Tablet + Desktop verified
                </span>
                <span className="rounded border border-emerald-500/30 bg-emerald-950/40 px-2 py-1 text-[11px] text-emerald-300">
                  LCP: 0.8s
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: API & SQL Contract Diff */}
        {activeTab === "api" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Simultaneous Browser + API + Database Assertion
              </p>
              <p className="text-slate-300 text-xs">
                Unlike simple UI automation, QAQuad verifies that the underlying transactional data matches the screen in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-black/50 p-3">
                <span className="text-cyan-400 font-bold block mb-1">REST API Contract (JSON)</span>
                <pre className="text-[11px] text-slate-300 overflow-x-auto">
{`POST /api/v2/orders/confirm
{
  "order_id": "ord_882941",
  "status": "APPROVED",
  "auth_token": "valid_sha256"
}
→ Status 200 OK (28ms)`}
                </pre>
              </div>

              <div className="rounded-xl border border-slate-800 bg-black/50 p-3">
                <span className="text-emerald-400 font-bold block mb-1">PostgreSQL DB State Diff</span>
                <pre className="text-[11px] text-slate-300 overflow-x-auto">
{`SELECT balance, ledger_status 
FROM enterprise_accounts 
WHERE id = 'acc_491';

BEFORE: balance: $14,200
AFTER:  balance: $13,950 (-$250)
LEDGER: RECONCILED (0.00 drift)`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
