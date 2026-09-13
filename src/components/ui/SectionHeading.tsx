import { clsx } from "@/lib/clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
  tone = "dark",
  as: Component = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
  tone?: "default" | "dark";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-400">
          {eyebrow}
        </p>
      ) : null}
      <Component id={id} className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
        {title}
      </Component>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}
