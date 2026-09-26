import { clsx } from "@/lib/clsx";

type BadgeTone = "pass" | "partial" | "fail" | "info" | "neutral";

const tones: Record<BadgeTone, string> = {
  pass: "bg-signal-pass/10 text-signal-pass",
  partial: "bg-signal-partial/10 text-signal-partial",
  fail: "bg-signal-fail/10 text-signal-fail",
  info: "bg-signal-info/10 text-signal-info",
  neutral: "bg-ink-100 text-ink-600",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
