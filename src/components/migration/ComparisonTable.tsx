import { Badge } from "@/components/ui/Badge";

type Row = {
  requirement: string;
  oldResult: string;
  newResult: string;
  outcome: "PASS" | "FAIL" | "GAP";
};

const rows: Row[] = [
  { requirement: "Create booking", oldResult: "PASS", newResult: "PASS", outcome: "PASS" },
  { requirement: "Edit booking", oldResult: "PASS", newResult: "PASS", outcome: "PASS" },
  { requirement: "Cancel booking", oldResult: "PASS", newResult: "FAIL", outcome: "FAIL" },
  { requirement: "Commission calculation", oldResult: "PASS", newResult: "Different", outcome: "GAP" },
  { requirement: "Search", oldResult: "PASS", newResult: "PASS", outcome: "PASS" },
  { requirement: "Export report", oldResult: "PASS", newResult: "Missing", outcome: "GAP" },
];

const outcomeTone: Record<Row["outcome"], "pass" | "fail" | "partial"> = {
  PASS: "pass",
  FAIL: "fail",
  GAP: "partial",
};

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">
            Example functional comparison between a legacy and new application, for illustration only.
          </caption>
          <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-cyan-300 border-b border-slate-700/80">
            <tr>
              <th scope="col" className="px-5 py-3.5 font-semibold">
                Requirement
              </th>
              <th scope="col" className="px-5 py-3.5 font-semibold">
                Old
              </th>
              <th scope="col" className="px-5 py-3.5 font-semibold">
                New
              </th>
              <th scope="col" className="px-5 py-3.5 font-semibold">
                Result
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row) => (
              <tr key={row.requirement} className="hover:bg-slate-800/40 transition-colors">
                <th scope="row" className="px-5 py-3.5 font-medium text-white">
                  {row.requirement}
                </th>
                <td className="px-5 py-3.5 text-slate-300">{row.oldResult}</td>
                <td className="px-5 py-3.5 text-slate-300">{row.newResult}</td>
                <td className="px-5 py-3.5">
                  <Badge tone={outcomeTone[row.outcome]}>{row.outcome}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-800 bg-slate-950/60 px-5 py-3 text-xs text-slate-400">
        Demo / Illustrative example — not real customer results.
      </p>
    </div>
  );
}
