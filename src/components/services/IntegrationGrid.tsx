import React from "react";

interface IntegrationItem {
  name: string;
  category: "CI/CD" | "Framework" | "Cloud / DB" | "Management";
  description: string;
}

const integrations: IntegrationItem[] = [
  { name: "Playwright", category: "Framework", description: "Native TypeScript/Python test execution with trace capture" },
  { name: "GitHub Actions", category: "CI/CD", description: "Trigger pull request tests and matrix regression jobs" },
  { name: "GitLab CI", category: "CI/CD", description: "Continuous testing stages with artifacts caching" },
  { name: "Jenkins", category: "CI/CD", description: "Distributed pipeline jobs with JUnit and Allure test reports" },
  { name: "Docker", category: "CI/CD", description: "Hermetic containerized test runners with reproducible environments" },
  { name: "Jira / Atlassian", category: "Management", description: "Automated bug tickets with reproduction steps & video traces" },
  { name: "PostgreSQL & MySQL", category: "Cloud / DB", description: "Direct SQL transaction assertions and state rollbacks" },
  { name: "Slack & Teams", category: "Management", description: "Instant defect alerts with root-cause links to PR authors" },
];

export function IntegrationGrid() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Ecosystem Compatibility
        </span>
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Integrates Seamlessly Into Your Existing Stack
        </h2>
        <p className="mt-3 text-sm text-slate-300 leading-relaxed">
          No vendor lock-in. QAQuad executes directly within your repositories, CI/CD runners, and issue tracking tools using standard open-source formats.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((item) => (
          <div
            key={item.name}
            className="group rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-5 shadow-xl backdrop-blur-sm hover:border-cyan-400/50 hover:shadow-cyan-950/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                {item.category}
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {item.name}
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
