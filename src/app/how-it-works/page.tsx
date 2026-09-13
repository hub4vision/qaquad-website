import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkflowDiagram } from "@/components/workflow/WorkflowDiagram";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { howItWorksSteps } from "@/lib/site-config";

const pageDescription =
  "A seven-step delivery process — Connect, Discover, Understand, Generate, Execute, Analyze, Automate — for evidence-backed QA automation.";

export const metadata: Metadata = buildPageMetadata({
  title: "How It Works",
  description: pageDescription,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How It Works", path: "/how-it-works" },
        ])}
      />

      <Section tone="dark" className="pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Delivery process"
          title="From application access to regression automation in seven steps"
          description="The same process powers every engagement, whether it's a first functional assessment or an ongoing regression partnership."
          tone="dark"
        />
      </Section>

      <Section aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="sr-only">
          The seven steps
        </h2>
        <WorkflowDiagram steps={howItWorksSteps} columns={4} />
      </Section>

      <Section tone="violet" aria-labelledby="detail-heading">
        <SectionHeading id="detail-heading" eyebrow="What to expect" title="What each step looks like in practice" tone="dark" />
        <div className="mt-10 space-y-4">
          {howItWorksSteps.map((item) => (
            <div key={item.step} className="flex flex-col gap-4 rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm sm:flex-row sm:items-center hover:border-cyan-500/40 transition-colors">
              <div className="flex-none font-mono text-base font-bold text-cyan-400 sm:w-20">{item.step}</div>
              <div>
                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection location="how_it_works_page" />
    </>
  );
}
