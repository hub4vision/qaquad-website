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

      <Section tone="dark" className="pt-16 sm:pt-20">
        <SectionHeading as="h1" eyebrow="Blog" title="Coming soon" tone="dark" />
      </Section>

      <Section tone="muted" aria-labelledby="topics-heading">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="info">Coming Soon</Badge>
          <h2 id="topics-heading" className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Planned first topics
          </h2>
          <p className="mt-3 text-slate-300">No posts are published yet. Here's what we're planning to write first.</p>
        </div>
        <ul className="mx-auto mt-10 max-w-2xl space-y-3">
          {plannedTopics.map((topic) => (
            <li key={topic} className="rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 px-5 py-4 text-sm text-slate-200 shadow-xl backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
              {topic}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
