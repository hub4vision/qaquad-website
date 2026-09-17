import React from "react";
import Link from "next/link";

const trustPillars = [
  {
    badge: "Confidentiality",
    title: "100% Client Code & IP Ownership",
    description: "Every test suite, Playwright script, fixture library, and CI/CD configuration written for your project is committed directly to your repository under your company's full intellectual property rights.",
  },
  {
    badge: "Environment Isolation",
    title: "Zero Production Access Required",
    description: "Our QA engineers and multi-agent systems operate strictly within sandboxed staging, UAT, or ephemeral review environments using isolated mock test accounts.",
  },
  {
    badge: "SOC2 & Least Privilege",
    title: "Least-Privilege Token Governance",
    description: "Database and API validation utilizes read-only or role-restricted staging credentials. We never store long-lived production secrets or customer PII.",
  },
  {
    badge: "Network Security",
    title: "VPN Bastion & IP Whitelisting",
    description: "Testing runners can be restricted to designated static egress IPs or routed through your organization's internal VPN tunnels with strict audit logging.",
  },
];

export function SecurityTrustMatrix() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Enterprise-Grade Governance
        </span>
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Security, Privacy &amp; IP Trust Assurance
        </h2>
        <p className="mt-3 text-sm text-slate-300 leading-relaxed">
          Designed from day one to satisfy the compliance, confidentiality, and data governance standards of enterprise security teams.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {trustPillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-emerald-500/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                {pillar.badge}
              </span>
              <span className="text-xs text-slate-300 font-mono">SOC2-Aligned</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {pillar.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-300">
          Need a signed Mutual NDA or Security Architecture Review before sharing non-prod URLs?{" "}
          <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-semibold">
            Contact our engineering team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
