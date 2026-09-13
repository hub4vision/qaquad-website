import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkflowDiagram } from "@/components/workflow/WorkflowDiagram";
import { ComparisonTable } from "@/components/migration/ComparisonTable";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/cta/CTASection";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata, serviceJsonLd } from "@/lib/seo";
import { migrationWorkflowSteps, resultClassifications } from "@/lib/site-config";

const pageDescription =
  "Validate what your new system must do, not just how it looks. AI-powered migration testing compares business capability and behavior between your legacy and new applications, with evidence on every gap.";

export const metadata: Metadata = buildPageMetadata({
  title: "Legacy-to-New Application Migration Testing",
  description: pageDescription,
  path: "/migration-testing",
});

const whatWeCompare = [
  "Business capabilities",
  "Functional behavior",
  "CRUD operations",
  "Business rules",
  "Validation rules",
  "Workflows",
  "Roles and permissions",
  "Data behavior",
  "Calculations",
  "Status transitions",
  "API behavior",
  "Database behavior",
  "Reports",
  "Integrations",
];

const toneMap = { pass: "pass", partial: "partial", fail: "fail", info: "info" } as const;

export default function MigrationTestingPage() {
  return (
    <>
      <StructuredData
        data={serviceJsonLd({
          name: "Legacy-to-New Application Migration Testing",
          description: pageDescription,
          path: "/migration-testing",
        })}
      />
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Migration Testing", path: "/migration-testing" },
        ])}
      />

      <Section tone="dark" className="pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Flagship capability"
          title="Migrate Your Application Without Losing Its Business Functionality"
          description="Validate what the new system must do — not just how it looks."
          tone="dark"
        />
      </Section>

      <Section tone="ocean" aria-labelledby="not-pixels-heading">
        <div className="max-w-3xl">
          <h2 id="not-pixels-heading" className="text-2xl font-bold text-white sm:text-3xl">
            We do not simply compare old and new UI screens.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            A migration can look pixel-perfect and still quietly drop a business rule. We treat your old application
            as the functional source of truth — once you confirm it — and compare what the new application actually
            does against it, at every layer.
          </p>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
          {whatWeCompare.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
              <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="violet" aria-labelledby="workflow-heading">
        <SectionHeading id="workflow-heading" eyebrow="Process" title="Old application to evidence-backed gap analysis" align="center" className="mx-auto" tone="dark" />
        <div className="mt-12">
          <WorkflowDiagram steps={migrationWorkflowSteps} columns={5} />
        </div>
      </Section>

      <Section tone="gradient" aria-labelledby="classification-heading">
        <SectionHeading id="classification-heading" eyebrow="Result classification" title="Every requirement gets a clear result" tone="dark" />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resultClassifications.map((item) => (
            <div key={item.label} className="flex items-start gap-4 rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-5 shadow-xl backdrop-blur-sm">
              <Badge tone={toneMap[item.tone]}>{item.label}</Badge>
              <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ocean" aria-labelledby="example-heading">
        <SectionHeading id="example-heading" eyebrow="Example output" title="Functional comparison, illustrated" tone="dark" />
        <div className="mt-10">
          <ComparisonTable />
        </div>
      </Section>

      <CTASection
        location="migration_testing_page"
        title="Validate your migration before your customers find the gaps"
        description="Book a free QA assessment to scope a functional baseline for your legacy application."
      />
    </>
  );
}
