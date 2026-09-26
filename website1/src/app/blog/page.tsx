import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "Upcoming articles on AI QA, Playwright automation, migration testing, and regression automation.",
  path: "/blog",
});

// Initial blog topics, per the SEO requirements ("Create initial blog topics
// around AI QA, Playwright, migration testing and regression automation").
// These are planned titles, not published posts — each links nowhere yet by
// design, so the page never claims content exists before it does.
const plannedTopics = [
  "What AI functional testing actually discovers that manual testing misses",
  "Playwright automation patterns that survive UI redesigns",
  "Migration testing: how to build a functional baseline from a legacy app",
  "API testing that's integrated with business workflows, not just endpoints",
  "Why UI-only automation misses database and calculation defects",
  "Building a regression suite your team will actually maintain",
];

export default function BlogPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <SectionHeading as="h1" eyebrow="Blog" title="Coming soon" tone="dark" />
      </Section>

      <Section tone="muted" aria-labelledby="featured-posts">
        <div className="mx-auto max-w-5xl">
          <Badge tone="info">Engineering Blog</Badge>
          <h2 id="featured-posts" className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Latest from the QAQuad Team
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Insights on AI functional testing, Playwright automation patterns, and how to stop brittle regression suites.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Playwright</span>
              <h3 className="mt-3 text-lg font-bold text-white">Stop Using Brittle CSS Selectors</h3>
              <p className="mt-3 flex-1 text-sm text-slate-300 leading-relaxed">
                Why your UI tests fail every time marketing changes a button color, and how to use Playwright's role-based locators to build resilient suites.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4">
                <span className="text-xs text-slate-400">September 25, 2026</span>
                <span className="text-xs font-semibold text-cyan-400">Read Article &rarr;</span>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">AI Automation</span>
              <h3 className="mt-3 text-lg font-bold text-white">AI is for Discovery, Not Guessing</h3>
              <p className="mt-3 flex-1 text-sm text-slate-300 leading-relaxed">
                How we use autonomous agents to explore legacy systems and extract business logic, ensuring our test cases reflect reality.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4">
                <span className="text-xs text-slate-400">September 18, 2026</span>
                <span className="text-xs font-semibold text-cyan-400">Read Article &rarr;</span>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-6 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Migration Testing</span>
              <h3 className="mt-3 text-lg font-bold text-white">The Database Doesn't Lie</h3>
              <p className="mt-3 flex-1 text-sm text-slate-300 leading-relaxed">
                Why UI-only migration testing is dangerous, and how we write Playwright tests that assert against SQL tables directly.
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4">
                <span className="text-xs text-slate-400">September 10, 2026</span>
                <span className="text-xs font-semibold text-cyan-400">Read Article &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
