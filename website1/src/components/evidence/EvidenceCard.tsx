import { clsx } from "@/lib/clsx";

const icons: Record<string, JSX.Element> = {
  screenshot: (
    <path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm1 2v10h14V7H5zm3 8l3-4 2 2.5L16 9l3 6H8z" />
  ),
  trace: <path d="M3 12h4l2-7 4 14 2-7h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  api: <path d="M8 5l-5 7 5 7M16 5l5 7-5 7M13 4l-2 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  database: (
    <path
      d="M12 3c4.418 0 8 1.343 8 3s-3.582 3-8 3-8-1.343-8-3 3.582-3 8-3zm-8 3v12c0 1.657 3.582 3 8 3s8-1.343 8-3V6M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  log: <path d="M4 4h16v16H4V4zm3 4h10M7 9h10M7 13h6M7 17h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  diff: <path d="M6 3v18M18 3v18M6 8h6M6 16h6M14 12h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  defect: <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.14A1 1 0 003 19.5h18a1 1 0 00.87-1.5L13.71 3.86a1 1 0 00-1.73 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
};

export function EvidenceCard({
  icon,
  title,
  description,
}: {
  icon: keyof typeof icons;
  title: string;
  description: string;
}) {
  return (
    <div className={clsx("flex flex-col gap-3 rounded-xl border border-ink-800 bg-ink-900 p-5")}>
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-300" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          {icons[icon]}
        </svg>
      </span>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-300">{description}</p>
    </div>
  );
}
