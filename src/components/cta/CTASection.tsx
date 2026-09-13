import { siteConfig } from "@/lib/site-config";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "./CtaButton";

export function CTASection({
  title = "Find functional gaps before your customers do.",
  description = "Book a free QA assessment and see what a functional, evidence-backed review of your application looks like.",
  location = "cta_section",
}: {
  title?: string;
  description?: string;
  location?: string;
}) {
  return (
    <Section tone="gradient" aria-labelledby="cta-heading">
      <div className="flex flex-col items-start gap-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/60 via-indigo-950/80 to-slate-900/90 p-8 sm:p-12 shadow-2xl backdrop-blur-md lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 id="cta-heading" className="text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-slate-300 text-base">{description}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <CtaButton
            href={siteConfig.primaryCta.href}
            size="lg"
            trackAs="cta_click"
            trackProps={{ location }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 border-0"
          >
            {siteConfig.primaryCta.label}
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
