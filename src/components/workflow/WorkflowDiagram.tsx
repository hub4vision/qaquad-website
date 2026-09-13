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
  return (
    <ol className="flex flex-col items-center gap-1.5 text-center">
      {items.map((item, index) => (
        <li key={item} className="flex w-full flex-col items-center">
          <div className="w-full rounded-lg border border-cyan-500/30 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-100 shadow-md">
            {item}
          </div>
          {index < items.length - 1 ? (
            <span aria-hidden="true" className="py-1 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M12 16l-6-6h12l-6 6z" />
              </svg>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
