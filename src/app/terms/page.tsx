import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: `The terms governing use of the ${siteConfig.name} website and services.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section tone="dark" className="pt-16 sm:pt-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-400">Legal</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Terms of Service</h1>
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">
          <strong>Draft placeholder — not legal advice.</strong> This draft was generated for initial launch and has
          not yet been reviewed by legal counsel. Have qualified counsel review these terms for your jurisdiction
          before launch, per the launch checklist. Actual service engagements should be governed by a separate,
          signed statement of work / services agreement — these website terms alone do not constitute one.
        </p>

        <div className="mt-8 space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white">1. Acceptance of terms</h2>
            <p className="mt-2 leading-relaxed">
              By accessing or using this website, you agree to these Terms of Service. If you do not agree, please do
              not use the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. Website use</h2>
            <p className="mt-2 leading-relaxed">
              This website is provided for informational purposes about {siteConfig.name}&apos;s services. You agree
              not to misuse the website, attempt to gain unauthorized access to it, or use it to transmit unlawful,
              harmful, or infringing content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. No professional engagement formed by browsing</h2>
            <p className="mt-2 leading-relaxed">
              Submitting the contact form or browsing this website does not, by itself, create a services agreement,
              professional engagement, or obligation on either party. Actual testing engagements are governed by a
              separate signed agreement that will set out scope, fees, confidentiality, data handling, and
              deliverables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. Intellectual property</h2>
            <p className="mt-2 leading-relaxed">
              All content on this website — including text, graphics, diagrams, and logos — is the property of{" "}
              {siteConfig.legalName} or its licensors, unless otherwise noted, and may not be reproduced without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Illustrative and demo content</h2>
            <p className="mt-2 leading-relaxed">
              Examples on this website labeled &quot;Demo,&quot; &quot;Illustrative,&quot; or &quot;Sample&quot; are
              for explanatory purposes only and do not represent real customer results, testimonials, or guarantees
              of outcome.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Disclaimer of warranties</h2>
            <p className="mt-2 leading-relaxed">
              This website is provided &quot;as is&quot; without warranties of any kind, express or implied, to the
              fullest extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">7. Limitation of liability</h2>
            <p className="mt-2 leading-relaxed">
              To the fullest extent permitted by law, {siteConfig.legalName} will not be liable for any indirect,
              incidental, or consequential damages arising from use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">8. Changes to these terms</h2>
            <p className="mt-2 leading-relaxed">
              We may update these terms from time to time. Continued use of the website after changes constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">9. Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
