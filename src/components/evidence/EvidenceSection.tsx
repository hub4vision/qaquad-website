import { Badge } from "@/components/ui/Badge";

const evidenceTypes = [
  { icon: "screenshot" as const, title: "Screenshot", description: "Visual state of the application at the moment of the check." },
  { icon: "trace" as const, title: "Browser trace", description: "Step-by-step execution trace for reproducing the scenario." },
  { icon: "api" as const, title: "API response", description: "Actual request/response payloads and status codes." },
  { icon: "database" as const, title: "Database result", description: "Query results confirming (or contradicting) persisted state." },
  { icon: "log" as const, title: "Execution log", description: "Full step log tying evidence back to the test scenario." },
  { icon: "diff" as const, title: "Expected vs. actual", description: "Direct comparison showing exactly where behavior diverged." },
];

import { EvidenceCard } from "./EvidenceCard";

export function EvidenceSection() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
        {evidenceTypes.map((item) => (
          <EvidenceCard key={item.title} {...item} />
        ))}
      </div>

      <div className="rounded-2xl border border-ink-800 bg-ink-900 p-6 font-mono text-sm">
        <div className="flex items-center justify-between">
          <span className="text-ink-400">DEF-BOOK-004</span>
          <Badge tone="fail">HIGH</Badge>
        </div>
        <dl className="mt-4 space-y-3 text-ink-200">
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Requirement</dt>
            <dd>FR-BOOK-001 — Booking confirmation updates status</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Expected</dt>
            <dd>Booking status = CONFIRMED</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Actual</dt>
            <dd>UI = CONFIRMED · Database = PENDING</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Evidence</dt>
            <dd>Screenshot + API response + SQL query result</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs italic text-ink-500">Illustrative example — not a real customer finding.</p>
      </div>
    </div>
  );
}
