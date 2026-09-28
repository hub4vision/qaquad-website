"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

type TreeNode = {
  id: string;
  label: string;
  icon: string;
  color: string;
  glow: string;
  desc?: string;
  tag?: string;
  children?: TreeNode[];
};

const testingTree: TreeNode = {
  id: "root",
  label: "QAQuad Testing Services",
  icon: "🧠",
  color: "from-cyan-500 to-blue-600",
  glow: "shadow-cyan-500/40",
  desc: "Full-spectrum AI-powered QA",
  children: [
    {
      id: "functional",
      label: "Functional Testing",
      icon: "⚙️",
      color: "from-blue-500 to-indigo-600",
      glow: "shadow-blue-500/40",
      tag: "Core",
      desc: "Validate every feature & user flow",
      children: [
        { id: "ui-testing", label: "UI / Browser Testing", icon: "🖥️", color: "from-blue-400 to-blue-600", glow: "shadow-blue-400/30", desc: "Playwright & Selenium E2E flows" },
        { id: "form-validation", label: "Form & Validation Testing", icon: "📋", color: "from-blue-400 to-blue-600", glow: "shadow-blue-400/30", desc: "Input rules, error messages" },
        { id: "workflow", label: "Workflow & Business Logic", icon: "🔄", color: "from-blue-400 to-blue-600", glow: "shadow-blue-400/30", desc: "CRUD operations & permissions" },
        { id: "cross-browser", label: "Cross-Browser Testing", icon: "🌐", color: "from-blue-400 to-blue-600", glow: "shadow-blue-400/30", desc: "Chrome, Firefox, Safari, Edge" },
      ],
    },
    {
      id: "api",
      label: "API Testing",
      icon: "🔌",
      color: "from-violet-500 to-purple-600",
      glow: "shadow-violet-500/40",
      tag: "Essential",
      desc: "REST, GraphQL & microservice validation",
      children: [
        { id: "rest-api", label: "REST API Testing", icon: "📡", color: "from-violet-400 to-purple-600", glow: "shadow-violet-400/30", desc: "Endpoints, status codes, payloads" },
        { id: "graphql", label: "GraphQL Testing", icon: "⬡", color: "from-violet-400 to-purple-600", glow: "shadow-violet-400/30", desc: "Queries, mutations & schema" },
        { id: "contract", label: "Contract & Schema Testing", icon: "📝", color: "from-violet-400 to-purple-600", glow: "shadow-violet-400/30", desc: "Pact, OpenAPI compliance" },
        { id: "auth-api", label: "Auth & Token Testing", icon: "🔐", color: "from-violet-400 to-purple-600", glow: "shadow-violet-400/30", desc: "OAuth, JWT, session tokens" },
      ],
    },
    {
      id: "database",
      label: "Database Testing",
      icon: "🗄️",
      color: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-500/40",
      tag: "Deep",
      desc: "SQL, NoSQL & data integrity checks",
      children: [
        { id: "data-integrity", label: "Data Integrity Testing", icon: "🔍", color: "from-emerald-400 to-teal-600", glow: "shadow-emerald-400/30", desc: "Constraints, foreign keys, triggers" },
        { id: "migration-db", label: "Migration Data Validation", icon: "🚀", color: "from-emerald-400 to-teal-600", glow: "shadow-emerald-400/30", desc: "Row counts, schema diffs" },
        { id: "perf-db", label: "Query Performance Testing", icon: "⚡", color: "from-emerald-400 to-teal-600", glow: "shadow-emerald-400/30", desc: "Slow queries, index usage" },
        { id: "nosql", label: "NoSQL Validation", icon: "📦", color: "from-emerald-400 to-teal-600", glow: "shadow-emerald-400/30", desc: "MongoDB, DynamoDB doc checks" },
      ],
    },
    {
      id: "performance",
      label: "Performance Testing",
      icon: "⚡",
      color: "from-amber-500 to-orange-600",
      glow: "shadow-amber-500/40",
      tag: "Scale",
      desc: "Load, stress & concurrency analysis",
      children: [
        { id: "load", label: "Load Testing", icon: "📈", color: "from-amber-400 to-orange-600", glow: "shadow-amber-400/30", desc: "k6, Gatling, JMeter" },
        { id: "stress", label: "Stress & Spike Testing", icon: "💥", color: "from-amber-400 to-orange-600", glow: "shadow-amber-400/30", desc: "Breaking points & recovery" },
        { id: "concurrency", label: "Concurrency Testing", icon: "🔀", color: "from-amber-400 to-orange-600", glow: "shadow-amber-400/30", desc: "Race conditions, deadlocks" },
        { id: "endurance", label: "Endurance Testing", icon: "🏃", color: "from-amber-400 to-orange-600", glow: "shadow-amber-400/30", desc: "Memory leaks over long runs" },
      ],
    },
    {
      id: "security",
      label: "Security Testing",
      icon: "🛡️",
      color: "from-rose-500 to-red-600",
      glow: "shadow-rose-500/40",
      tag: "Critical",
      desc: "OWASP-aligned vulnerability scanning",
      children: [
        { id: "owasp", label: "OWASP Top 10 Checks", icon: "🔒", color: "from-rose-400 to-red-600", glow: "shadow-rose-400/30", desc: "XSS, SQL injection, CSRF" },
        { id: "auth-sec", label: "Auth & Access Control", icon: "🛂", color: "from-rose-400 to-red-600", glow: "shadow-rose-400/30", desc: "Privilege escalation tests" },
        { id: "pentest", label: "API Penetration Testing", icon: "🗡️", color: "from-rose-400 to-red-600", glow: "shadow-rose-400/30", desc: "Fuzzing, injection attacks" },
        { id: "vuln-scan", label: "Dependency Vulnerability Scan", icon: "📦", color: "from-rose-400 to-red-600", glow: "shadow-rose-400/30", desc: "CVE analysis, SBOM" },
      ],
    },
    {
      id: "migration",
      label: "Migration Testing",
      icon: "🚀",
      color: "from-cyan-400 to-sky-600",
      glow: "shadow-cyan-400/40",
      tag: "Flagship",
      desc: "Behavioral comparison: old vs. new",
      children: [
        { id: "baseline", label: "Functional Baseline Capture", icon: "📸", color: "from-cyan-300 to-sky-600", glow: "shadow-cyan-300/30", desc: "Pre-migration test coverage" },
        { id: "gap-analysis", label: "Migration Gap Analysis", icon: "🔎", color: "from-cyan-300 to-sky-600", glow: "shadow-cyan-300/30", desc: "Behavioral diff reporting" },
        { id: "data-migration", label: "Data Migration Validation", icon: "🗄️", color: "from-cyan-300 to-sky-600", glow: "shadow-cyan-300/30", desc: "Row-level accuracy checks" },
        { id: "regression-mig", label: "Post-Migration Regression", icon: "♻️", color: "from-cyan-300 to-sky-600", glow: "shadow-cyan-300/30", desc: "Confirm fixes are stable" },
      ],
    },
  ],
};

// ─── Pricing Packages ─────────────────────────────────────────────────────────

import { DualCurrencyPrice } from "@/components/pricing/DualCurrencyPrice";

type Package = {
  name: string;
  badge: string;
  badgeColor: string;
  minInr: number;
  maxInr: number;
  priceNote: string;
  marketRef: string;
  icon: string;
  color: string;
  glow: string;
  services: string[];
  highlight?: boolean;
};

const packages: Package[] = [
  {
    name: "Starter QA Assessment",
    badge: "Entry",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    minInr: 25000,
    maxInr: 50000,
    priceNote: "One-time",
    marketRef: "Market avg: ₹20K–₹60K",
    icon: "🔍",
    color: "from-blue-500/20 to-indigo-500/10",
    glow: "border-blue-500/30",
    services: [
      "UI / Functional testing (1 module)",
      "API endpoint smoke tests",
      "Basic DB integrity check",
      "Coverage assessment report",
      "Sample evidence & findings",
    ],
  },
  {
    name: "QA Automation Bundle",
    badge: "Popular",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    minInr: 75000,
    maxInr: 200000,
    priceNote: "Project-based",
    marketRef: "Market avg: ₹80K–₹2.5L",
    icon: "⚙️",
    color: "from-cyan-500/20 to-blue-500/10",
    glow: "border-cyan-500/40",
    highlight: true,
    services: [
      "Full Playwright & Selenium E2E automation",
      "API + DB layer test suites",
      "Regression suite build-out",
      "CI/CD pipeline integration",
      "Evidence-backed test reports",
      "IP handover (all code yours)",
    ],
  },
  {
    name: "Performance + Security Pack",
    badge: "Enterprise",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    minInr: 150000,
    maxInr: 400000,
    priceNote: "Project-based",
    marketRef: "Market avg: ₹1.5L–₹5L",
    icon: "🛡️",
    color: "from-amber-500/20 to-rose-500/10",
    glow: "border-amber-500/30",
    services: [
      "Load & stress testing (k6/Gatling)",
      "OWASP Top 10 security audit",
      "API penetration testing",
      "Concurrency & race condition checks",
      "CVE dependency scan",
      "Executive risk summary report",
    ],
  },
  {
    name: "Migration QA Complete",
    badge: "Flagship",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-400/30",
    minInr: 200000,
    maxInr: 500000,
    priceNote: "End-to-end",
    marketRef: "Market avg: ₹2.5L–₹6L",
    icon: "🚀",
    color: "from-violet-500/20 to-purple-500/10",
    glow: "border-violet-500/30",
    services: [
      "Pre-migration baseline capture",
      "Behavioral diff (old vs new)",
      "Data migration validation",
      "API contract regression",
      "Post-migration regression suite",
      "Timestamped evidence archive",
    ],
  },
  {
    name: "Managed QA Retainer",
    badge: "Monthly",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    minInr: 50000,
    maxInr: 150000,
    priceNote: "Per month",
    marketRef: "Market avg: ₹60K–₹2L/mo",
    icon: "♾️",
    color: "from-emerald-500/20 to-teal-500/10",
    glow: "border-emerald-500/30",
    services: [
      "Continuous regression execution",
      "Suite maintenance & updates",
      "Release-by-release QA reports",
      "On-call defect triage support",
      "Monthly KPI dashboard",
    ],
  },
];

// ─── Tree Node Component ──────────────────────────────────────────────────────

function TreeNodeCard({
  node,
  depth = 0,
  isLast = false,
}: {
  node: TreeNode;
  depth?: number;
  isLast?: boolean;
}) {
  const [expanded, setExpanded] = useState(depth < 1);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      {/* Connector line from parent */}
      {depth > 0 && (
        <div className="absolute left-0 top-0 flex h-full w-8">
          <div className="ml-3 border-l-2 border-slate-700/60 h-full" />
        </div>
      )}

      <div className={depth > 0 ? "pl-8 relative" : ""}>
        {/* Horizontal connector */}
        {depth > 0 && (
          <div className="absolute left-0 top-6 ml-3 w-5 border-t-2 border-slate-700/60" />
        )}

        {/* Card */}
        <div
          className={`
            group relative flex items-start gap-3 rounded-xl p-3 mb-2 cursor-pointer
            border transition-all duration-200
            ${hasChildren
              ? `bg-gradient-to-br ${node.color.replace("from-", "from-").replace("to-", "to-")}/10 hover:border-opacity-60 border-slate-700/50 hover:bg-slate-800/60`
              : "bg-slate-900/50 border-slate-800/50 hover:border-slate-600/60 hover:bg-slate-800/40"
            }
            ${expanded && hasChildren ? "border-slate-600/60" : ""}
          `}
          onClick={() => hasChildren && setExpanded((e) => !e)}
          role={hasChildren ? "button" : undefined}
          aria-expanded={hasChildren ? expanded : undefined}
        >
          {/* Icon */}
          <span
            className={`
              flex-none w-9 h-9 rounded-lg flex items-center justify-center text-lg
              bg-gradient-to-br ${node.color} shadow-lg ${node.glow}
            `}
          >
            {node.icon}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors">
                {node.label}
              </span>
              {node.tag && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                  {node.tag}
                </span>
              )}
            </div>
            {node.desc && (
              <p className="text-xs text-slate-400 mt-0.5 leading-tight">{node.desc}</p>
            )}
          </div>

          {/* Expand arrow */}
          {hasChildren && (
            <span
              className={`flex-none text-slate-400 transition-transform duration-200 mt-0.5 ${
                expanded ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          )}
        </div>

        {/* Children */}
        {hasChildren && expanded && (
          <div className="ml-4">
            {node.children!.map((child, i) => (
              <TreeNodeCard
                key={child.id}
                node={child}
                depth={depth + 1}
                isLast={i === node.children!.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestingServicesPage() {
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-2xl" />
          <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-violet-600/10 rounded-full blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            QA Service Catalogue
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Testing Services{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Tree
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            Explore our complete QA service hierarchy — from UI automation to
            security audits — and find the right bundle for your project.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {[
              { label: "Service Categories", value: "6" },
              { label: "Testing Types", value: "24+" },
              { label: "Packages Available", value: "5" },
              { label: "Avg. Market Rate Match", value: "98%" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center px-5 py-3 rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm"
              >
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testing Tree ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🌳</span> Service Hierarchy
          </h2>
          <button
            onClick={() => setExpandAll((v) => !v)}
            className="text-xs font-semibold px-4 py-1.5 rounded-full border border-slate-600/60 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all bg-slate-900/60"
          >
            {expandAll ? "Collapse All" : "Expand All"}
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {testingTree.children?.map((c) => (
            <span
              key={c.id}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-300 px-3 py-1 rounded-full border border-slate-700/50 bg-slate-900/50"
            >
              <span>{c.icon}</span> {c.label}
            </span>
          ))}
        </div>

        {/* Tree */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-6">
          <TreeNodeCard node={testingTree} depth={0} />
          {testingTree.children?.map((child, i) => (
            <TreeNodeCard
              key={child.id}
              node={child}
              depth={1}
              isLast={i === (testingTree.children?.length ?? 0) - 1}
            />
          ))}
        </div>

        {/* Tip */}
        <p className="mt-4 text-xs text-slate-500 text-center">
          💡 Click any category to expand/collapse its sub-services
        </p>
      </section>

      {/* ── Packages / Pricing ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 border-t border-slate-800/60">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-300 mb-4">
              💰 Current Market Pricing — India 2024–25
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Service Bundles &{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Packages
              </span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-slate-400 text-sm">
              Indicative prices benchmarked against the current India QA market (2024–25). 
              Final pricing follows a free 30-minute discovery call.
            </p>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`
                  relative flex flex-col rounded-2xl border p-6 transition-all duration-300
                  bg-gradient-to-br ${pkg.color} backdrop-blur-sm
                  hover:scale-[1.02] hover:shadow-xl ${pkg.glow}
                  ${pkg.highlight ? "ring-1 ring-cyan-500/40" : ""}
                `}
              >
                {/* Popular badge */}
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg shadow-cyan-500/30">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">{pkg.icon}</span>
                  <div>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${pkg.badgeColor}`}
                    >
                      {pkg.badge}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-white">{pkg.name}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-700/40">
                  <div className="text-xl font-extrabold text-white">
                    <DualCurrencyPrice minInr={pkg.minInr} maxInr={pkg.maxInr} />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">{pkg.priceNote}</span>
                    <span className="text-[10px] text-slate-500">{pkg.marketRef}</span>
                  </div>
                </div>

                {/* Services list */}
                <ul className="flex-1 space-y-2 mb-6">
                  {pkg.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1 flex-none w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`
                    block text-center text-sm font-bold py-2.5 rounded-xl transition-all duration-200
                    ${pkg.highlight
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                      : "bg-slate-800/80 text-slate-200 border border-slate-700/60 hover:border-slate-500/60 hover:text-white"
                    }
                  `}
                >
                  Get a Free Quote →
                </Link>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-10 text-center">
            <p className="text-xs text-slate-500 max-w-2xl mx-auto">
              ⚠️ Prices above are business-planning estimates benchmarked against the India QA services market (2024–25).
              Actual pricing depends on application complexity, team size, and engagement scope.
              All packages include a free 30-minute discovery call.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              Book a Free Discovery Call
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
