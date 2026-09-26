import Link from "next/link";
import type { Service } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 via-slate-800/60 to-slate-900/90 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-cyan-500/10">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">{service.name}</h3>
        <Badge tone={service.priority === "P0" ? "info" : "neutral"}>{service.priority}</Badge>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{service.shortDescription}</p>
      <Link
        href={service.href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300"
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
          <path d="M9 5l7 7-7 7-1.4-1.4L13.2 12 7.6 6.4 9 5z" />
        </svg>
      </Link>
    </div>
  );
}
