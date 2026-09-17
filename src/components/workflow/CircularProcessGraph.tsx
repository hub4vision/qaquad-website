"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "@/lib/clsx";

export interface StrategyPillar {
  id: string;
  title: string;
  description: string;
  badge?: string;
  position: "top-left" | "top-right" | "mid-left" | "mid-right" | "bottom-left" | "bottom-right";
}

interface CircularProcessGraphProps {
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  centerTitle?: string;
  centerSubtitle?: string;
  pillars: StrategyPillar[];
}

export function CircularProcessGraph({
  sectionEyebrow = "Our Methodology",
  sectionTitle = "OUR STRATEGY",
  sectionSubtitle = "A unified circular framework connecting intelligent strategy, continuous validation, and high-velocity engineering.",
  centerTitle = "QAQuad",
  centerSubtitle = "Quality Engine",
  pillars,
}: CircularProcessGraphProps) {
  const [activePillarId, setActivePillarId] = useState<string>(pillars[0]?.id || "");

  // Separate pillars into left and right sides
  const leftPillars = pillars.filter((p) => p.position.includes("left"));
  const rightPillars = pillars.filter((p) => p.position.includes("right"));

  const activePillar = pillars.find((p) => p.id === activePillarId) || pillars[0];

  return (
    <div className="relative mx-auto max-w-7xl rounded-3xl border border-slate-800 bg-[#080d1a]/90 p-6 md:p-12 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        {sectionEyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {sectionEyebrow}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        )}
      </div>

      {/* Main Circular Diagram Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column Pillars */}
        <div className="lg:col-span-4 space-y-6">
          {leftPillars.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                type="button"
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={clsx(
                  "w-full text-left rounded-2xl p-5 border transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  isActive
                    ? "border-cyan-400 bg-gradient-to-r from-cyan-950/60 to-slate-900 shadow-lg shadow-cyan-500/20 translate-x-1"
                    : "border-slate-800/90 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={clsx(
                        "h-2.5 w-2.5 rounded-full transition-transform duration-300",
                        isActive
                          ? "bg-amber-400 shadow-[0_0_8px_#fbbf24] scale-125"
                          : "bg-cyan-500/60 group-hover:bg-cyan-400"
                      )}
                    />
                    <h3
                      className={clsx(
                        "text-base font-bold transition-colors",
                        isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                      )}
                    >
                      {pillar.title}
                    </h3>
                  </div>
                  {pillar.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                      {pillar.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                  {pillar.description}
                </p>

                {/* Dashed connector line to center on large screens */}
                <div
                  className={clsx(
                    "hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 w-6 border-t-2 border-dashed transition-colors",
                    isActive ? "border-amber-400" : "border-slate-700/60"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Center Circular Emblem & Radial Orbit */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center my-4 lg:my-0">
          <div className="relative flex items-center justify-center">
            {/* Outer Pulsing Glow */}
            <div className="absolute h-64 w-64 rounded-full bg-cyan-500/10 blur-2xl animate-pulse" />

            {/* Orbit Ring 1 (Dashed Outer) */}
            <div className="relative flex items-center justify-center h-56 w-56 sm:h-64 sm:w-64 rounded-full border border-dashed border-cyan-500/30">
              {/* Orbit Ring 2 (Solid Inner Border) */}
              <div className="flex items-center justify-center h-44 w-44 sm:h-52 sm:w-52 rounded-full border-2 border-cyan-400/40 bg-gradient-to-b from-slate-900 via-[#070b14] to-slate-900 shadow-2xl shadow-cyan-900/50">
                {/* Golden/Amber Accent Ring like QualiMatrix */}
                <div className="flex flex-col items-center justify-center h-36 w-36 sm:h-44 sm:w-44 rounded-full border-2 border-amber-400/60 bg-[#060913] p-3 text-center">
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white/95 p-1.5 shadow-md shadow-cyan-500/30 ring-1 ring-white/20 mb-2">
                    <Image
                      src="/QAQuad_emblem.png"
                      alt="QAQuad Emblem"
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                    {centerTitle}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-300">
                    {centerSubtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Pillars */}
        <div className="lg:col-span-4 space-y-6">
          {rightPillars.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                type="button"
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={clsx(
                  "w-full text-left rounded-2xl p-5 border transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  isActive
                    ? "border-cyan-400 bg-gradient-to-l from-cyan-950/60 to-slate-900 shadow-lg shadow-cyan-500/20 -translate-x-1"
                    : "border-slate-800/90 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={clsx(
                        "h-2.5 w-2.5 rounded-full transition-transform duration-300",
                        isActive
                          ? "bg-amber-400 shadow-[0_0_8px_#fbbf24] scale-125"
                          : "bg-cyan-500/60 group-hover:bg-cyan-400"
                      )}
                    />
                    <h3
                      className={clsx(
                        "text-base font-bold transition-colors",
                        isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                      )}
                    >
                      {pillar.title}
                    </h3>
                  </div>
                  {pillar.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                      {pillar.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-5">
                  {pillar.description}
                </p>

                {/* Dashed connector line to center on large screens */}
                <div
                  className={clsx(
                    "hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 w-6 border-t-2 border-dashed transition-colors",
                    isActive ? "border-amber-400" : "border-slate-700/60"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Pillar Highlight Bar */}
      {activePillar && (
        <div className="mt-10 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-white">
              Selected Strategy Focus: <span className="text-cyan-300 font-extrabold">{activePillar.title}</span>
            </span>
          </div>
          <p className="text-xs text-slate-300 text-center sm:text-right">
            Engineered to scale coverage, reduce flaky runs, and accelerate deployment frequency.
          </p>
        </div>
      )}
    </div>
  );
}
