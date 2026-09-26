import type { WorkflowStep } from "@/lib/site-config";
import { clsx } from "@/lib/clsx";

export function WorkflowDiagram({
  steps,
  tone = "default",
  columns = 4,
}: {
  steps: WorkflowStep[];
  tone?: "default" | "dark";
  columns?: 3 | 4 | 5;
}) {
  const gridCols = {
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-2 lg:grid-cols-5",
  }[columns];

  return (
    <ol className={clsx("grid grid-cols-1 gap-4", gridCols)}>
      {steps.map((item, index) => (
        <li
          key={item.step}
          className="relative flex flex-col gap-2 rounded-xl border border-slate-700/60 bg-gradient-to-b from-slate-900/90 to-slate-800/80 p-5 shadow-xl backdrop-blur-sm transition-all duration-200 hover:border-cyan-500/40"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md font-mono text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
          >
            {item.step}
          </span>
          <h3 className="text-base font-semibold text-white">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-300">
            {item.description}
          </p>
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={clsx(
                "absolute -right-2 top-1/2 hidden -translate-y-1/2 sm:block text-cyan-400/60",
                (index + 1) % columns === 0 && "sm:hidden",
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M9 5l7 7-7 7-1.4-1.4L13.2 12 7.6 6.4 9 5z" />
              </svg>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function VerticalFlow({
  items,
  tone = "default",
}: {
  items: string[];
  tone?: "default" | "dark";
}) {
  // Brand gradient indicators from QAQuad logo
  const stageAccents = [
    { border: "border-sky-500/40 hover:border-sky-400", dot: "bg-sky-400 shadow-[0_0_8px_#38bdf8]", text: "text-sky-300" },
    { border: "border-cyan-500/40 hover:border-cyan-400", dot: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]", text: "text-cyan-300" },
    { border: "border-indigo-500/40 hover:border-indigo-400", dot: "bg-indigo-400 shadow-[0_0_8px_#818cf8]", text: "text-indigo-300" },
    { border: "border-purple-500/40 hover:border-purple-400", dot: "bg-purple-400 shadow-[0_0_8px_#c084fc]", text: "text-purple-300" },
    { border: "border-rose-500/40 hover:border-rose-400", dot: "bg-rose-400 shadow-[0_0_8px_#fb7185]", text: "text-rose-300" },
    { border: "border-orange-500/40 hover:border-orange-400", dot: "bg-orange-400 shadow-[0_0_8px_#fb923c]", text: "text-orange-300" },
    { border: "border-emerald-500/40 hover:border-emerald-400", dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]", text: "text-emerald-300" },
  ];

  return (
    <ol className="flex flex-col items-center gap-1.5 text-center">
      {items.map((item, index) => {
        const accent = stageAccents[index % stageAccents.length] ?? {
          border: "border-sky-500/40 hover:border-sky-400",
          dot: "bg-sky-400 shadow-[0_0_8px_#38bdf8]",
          text: "text-sky-300",
        };
        return (
          <li key={item} className="flex w-full flex-col items-center">
            <div
              className={clsx(
                "group relative flex w-full items-center justify-between rounded-xl border bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-100 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                accent.border
              )}
            >
              <span className="flex items-center gap-2">
                <span className={clsx("h-2 w-2 rounded-full", accent.dot)} />
                <span className="tracking-wide text-slate-200 group-hover:text-white transition-colors">
                  {item}
                </span>
              </span>
              <span className={clsx("text-[10px] font-mono font-semibold", accent.text)}>
                0{index + 1}
              </span>
            </div>
            {index < items.length - 1 ? (
              <span aria-hidden="true" className="py-1 text-cyan-400/80 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M12 16l-6-6h12l-6 6z" />
                </svg>
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
