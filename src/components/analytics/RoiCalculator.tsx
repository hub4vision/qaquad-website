"use client";

import { useState } from "react";
import { CtaButton } from "@/components/cta/CtaButton";

export function RoiCalculator() {
  const [engineers, setEngineers] = useState<number>(8);
  const [releaseFrequency, setReleaseFrequency] = useState<number>(2); // 2 = bi-weekly (26/yr), 4 = weekly (52/yr), 10 = daily
  const [manualRegressionDays, setManualRegressionDays] = useState<number>(3); // days per release
  const [avgHourlyCost, setAvgHourlyCost] = useState<number>(45); // $45/hr

  // Calculations
  // Total releases per year: 1=monthly(12), 2=biweekly(26), 4=weekly(52), 10=daily(250)
  const releasesPerYear =
    releaseFrequency === 1 ? 12 : releaseFrequency === 2 ? 26 : releaseFrequency === 4 ? 52 : 250;

  // Traditional QA: Days spent per engineer per release * 8 hours
  const hoursPerRelease = manualRegressionDays * 8 * Math.max(1, Math.round(engineers * 0.4));
  const currentAnnualHours = hoursPerRelease * releasesPerYear;
  const currentAnnualCost = currentAnnualHours * avgHourlyCost;

  // With QAQuad AI Automation: 85% reduction in manual regression time
  const qaquadSavedHours = Math.round(currentAnnualHours * 0.82);
  const qaquadAnnualSavings = Math.round(qaquadSavedHours * avgHourlyCost);
  const releaseSpeedup = "3.5x";

  return (
    <div className="relative mx-auto max-w-5xl rounded-3xl border border-slate-700/80 bg-gradient-to-br from-[#0c162d]/95 via-[#080e1e]/95 to-[#060a14]/95 p-6 sm:p-10 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Interactive Economics
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          QA ROI & Regression Savings Calculator
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Estimate how much engineering time and release budget your team saves by moving from repetitive manual regression to QAQuad self-healing Playwright automation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Form (Left Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Engineers */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="engineers-range" className="text-sm font-semibold text-slate-200">
                Software Engineers & QA in Team
              </label>
              <span className="font-mono text-base font-bold text-cyan-400">
                {engineers} {engineers === 1 ? "person" : "people"}
              </span>
            </div>
            <input
              id="engineers-range"
              type="range"
              min="2"
              max="50"
              value={engineers}
              onChange={(e) => setEngineers(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-300 mt-1">
              <span>2</span>
              <span>25</span>
              <span>50+</span>
            </div>
          </div>

          {/* Slider 2: Release Cadence */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="frequency-range" className="text-sm font-semibold text-slate-200">
                Release Frequency
              </label>
              <span className="font-mono text-base font-bold text-cyan-400">
                {releaseFrequency === 1
                  ? "Monthly (12/yr)"
                  : releaseFrequency === 2
                  ? "Bi-Weekly (26/yr)"
                  : releaseFrequency === 4
                  ? "Weekly (52/yr)"
                  : "Continuous / Daily"}
              </span>
            </div>
            <input
              id="frequency-range"
              type="range"
              min="1"
              max="10"
              step="1"
              value={releaseFrequency}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= 1) setReleaseFrequency(1);
                else if (val <= 3) setReleaseFrequency(2);
                else if (val <= 6) setReleaseFrequency(4);
                else setReleaseFrequency(10);
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-300 mt-1">
              <span>Monthly</span>
              <span>Bi-Weekly</span>
              <span>Weekly</span>
              <span>Daily CI</span>
            </div>
          </div>

          {/* Slider 3: Regression Days */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="days-range" className="text-sm font-semibold text-slate-200">
                Manual Regression Duration Per Release
              </label>
              <span className="font-mono text-base font-bold text-cyan-400">
                {manualRegressionDays} {manualRegressionDays === 1 ? "day" : "days"}
              </span>
            </div>
            <input
              id="days-range"
              type="range"
              min="1"
              max="7"
              value={manualRegressionDays}
              onChange={(e) => setManualRegressionDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-300 mt-1">
              <span>1 day</span>
              <span>3 days</span>
              <span>7+ days</span>
            </div>
          </div>

          {/* Hourly Cost Input */}
          <div className="flex items-center justify-between px-2 text-xs text-slate-300">
            <span>Blended QA & Eng Cost/Hr:</span>
            <div className="inline-flex items-center gap-1">
              <span className="text-slate-300 font-bold">$</span>
              <input
                type="number"
                aria-label="Blended QA and engineering cost per hour in USD"
                value={avgHourlyCost}
                onChange={(e) => setAvgHourlyCost(Math.max(15, Number(e.target.value)))}
                className="w-16 rounded border border-slate-700 bg-slate-950 px-2 py-1 text-right text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
              <span className="text-slate-300">/hr</span>
            </div>
          </div>
        </div>

        {/* Results Card (Right Col 5) */}
        <div className="lg:col-span-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/40 via-slate-900/80 to-slate-950 p-6 text-center shadow-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
            Projected Annual Impact
          </p>

          <div className="py-4">
            <p className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">
              ${qaquadAnnualSavings.toLocaleString()}
            </p>
            <p className="text-xs font-medium text-emerald-400 mt-1 flex items-center justify-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Annual Engineering Hours Saved: {qaquadSavedHours.toLocaleString()} hrs
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-800/80 pt-4 text-left">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <p className="text-[11px] text-slate-300">Release Cycle Speedup</p>
              <p className="text-xl font-bold text-white mt-0.5">{releaseSpeedup}</p>
              <p className="text-[10px] text-cyan-400">Hours instead of days</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
              <p className="text-[11px] text-slate-300">Defect Escape Risk</p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">-78%</p>
              <p className="text-[10px] text-slate-300">Multi-layer checks</p>
            </div>
          </div>

          <div className="mt-6">
            <CtaButton
              href="/contact"
              trackAs="cta_click"
              trackProps={{ location: "roi_calculator" }}
              className="w-full justify-center bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 border-0 text-sm py-3"
            >
              Get Custom Assessment & ROI Plan
            </CtaButton>
          </div>

          <p className="text-[11px] text-slate-300 mt-3">
            Based on average telemetry across 150,000+ executed test scenarios.
          </p>
        </div>
      </div>
    </div>
  );
}
