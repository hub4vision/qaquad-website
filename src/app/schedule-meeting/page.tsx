import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MeetingScheduler } from "@/components/forms/MeetingScheduler";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Suspense } from "react";
import { Video, Calendar, Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  title: "Schedule QA Discovery Call & Technical Walkthrough",
  description:
    "Book an online technical discovery session with QAQuad's Principal QA Automation Leads. Review your test coverage blueprint, live self-healing Playwright prototype, and custom quotation.",
  path: "/schedule-meeting",
});

export default function ScheduleMeetingPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Schedule Meeting", path: "/schedule-meeting" },
        ])}
      />

      <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Context & Agenda */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              as="h1"
              eyebrow="Interactive Booking"
              title="Schedule Your QA Discovery Session"
              description="Pick a date and time that fits your engineering team's schedule. We will walk you through a live prototype, tailored locator strategy, and commercial SLA quotation."
              tone="dark"
            />

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-xl space-y-3.5 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-400" />
                <span>What We Cover in this 30-Min Session:</span>
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Live Prototype Demonstration:</strong> Real-time Playwright execution with Base64 visual evidence captures on your target flows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Self-Healing Locators &amp; Zero Flakiness:</strong> How our AI recovery engine adapts to dynamic DOM attribute mutations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>CI/CD &amp; Architecture Review:</strong> GitHub Actions, GitLab CI, or Jenkins matrix integration.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Tailored Commercial Quotation:</strong> Milestone timeline, fixed SLA guarantees, and pilot onboarding steps.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck size={16} />
                <span>SOC2-Aligned NDA &amp; 100% Non-Production Data Confidentiality</span>
              </div>
              <p>
                Need to reach us beforehand? Email directly to{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Meeting Scheduler Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
              <Suspense fallback={<div className="h-[500px] animate-pulse rounded-2xl bg-slate-100" />}>
                <MeetingScheduler />
              </Suspense>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
