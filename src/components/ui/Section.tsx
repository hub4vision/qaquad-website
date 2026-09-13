import { clsx } from "@/lib/clsx";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  tone?: "default" | "muted" | "dark" | "gradient" | "ocean" | "violet" | "emerald";
  children: React.ReactNode;
  "aria-labelledby"?: string;
};

const tones = {
  default: "bg-gradient-to-b from-[#0f172a]/95 via-[#1e293b]/90 to-[#0f172a]/95 text-slate-100 backdrop-blur-md",
  muted: "bg-gradient-to-r from-[#172554]/75 via-[#1e1b4b]/80 to-[#1e293b]/75 text-slate-100 backdrop-blur-md",
  dark: "bg-gradient-to-br from-[#030712] via-[#0f172a] to-[#1e1b4b] text-white",
  gradient: "bg-gradient-to-tr from-[#1e3a8a]/80 via-[#3b0764]/70 to-[#0f172a]/90 text-white backdrop-blur-md",
  ocean: "bg-gradient-to-b from-[#083344]/80 via-[#0e7490]/20 to-[#0f172a]/90 text-white backdrop-blur-md",
  violet: "bg-gradient-to-r from-[#2e1065]/70 via-[#4c1d95]/50 to-[#1e1b4b]/80 text-white backdrop-blur-md",
  emerald: "bg-gradient-to-b from-[#064e3b]/60 via-[#047857]/20 to-[#0f172a]/90 text-white backdrop-blur-md",
};

export function Section({ id, className, containerClassName, tone = "default", children, ...rest }: SectionProps) {
  return (
    <section id={id} className={clsx("relative py-16 sm:py-20 lg:py-24 border-y border-slate-700/40", tones[tone], className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
