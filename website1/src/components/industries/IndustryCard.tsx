import type { Industry } from "@/lib/site-config";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-[#0f172a] p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10">
      <h3 className="text-lg font-semibold text-white">{industry.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{industry.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {industry.painPoints.map((point) => (
          <li key={point} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-400" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
