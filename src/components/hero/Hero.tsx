import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/cta/CtaButton";
import { VerticalFlow } from "@/components/workflow/WorkflowDiagram";

const heroFlow = ["Application", "AI QA Agent", "Browser + API + SQL", "Test Execution", "Evidence", "Defect", "Regression"];

const trustStrip = ["Playwright", "REST / API", "SQL / Database", "CI/CD", "AI-Assisted QA"];

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0c1a30] via-[#162a4d] to-[#0d2238] border-b border-cyan-500/20">
      {/* Dynamic ambient color glows (Cyan, Indigo, Purple) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-10 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_at_top,black,transparent_80%)]"
      />
      <Container className="relative pt-8 pb-14 sm:pt-12 sm:pb-18 lg:pt-14 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300 shadow-sm">
              ✨ AI-Powered QA Automation
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl drop-shadow-sm">
              AI-Powered QA Automation for Faster, More Reliable Software Releases
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Discover functionality, generate meaningful tests, validate UI + API + database behavior, find defects
              with evidence, and build maintainable regression automation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton
                href={siteConfig.primaryCta.href}
                size="lg"
                trackAs="cta_click"
                trackProps={{ location: "hero" }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 border-0"
              >
                {siteConfig.primaryCta.label}
              </CtaButton>
              <CtaButton
                href={siteConfig.secondaryCta.href}
                variant="secondary"
                size="lg"
                trackAs="secondary_cta_click"
                trackProps={{ location: "hero" }}
                className="border-slate-600 bg-slate-800/60 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 hover:bg-slate-800"
              >
                {siteConfig.secondaryCta.label}
              </CtaButton>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {trustStrip.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                  <dt className="sr-only">Capability</dt>
                  <dd>{item}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-2xl border border-sky-500/30 bg-gradient-to-b from-slate-900/95 via-[#0b1329]/95 to-slate-950/95 p-6 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl ring-1 ring-white/10">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
                <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                  From Code to Confidence
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
              <VerticalFlow items={heroFlow} tone="dark" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
