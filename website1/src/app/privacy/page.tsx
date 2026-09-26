import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects information, including application test data and credentials.`,
  path: "/privacy",
});

const lastUpdated = "This draft was generated for initial launch and has not yet been reviewed by legal counsel.";

export default function PrivacyPage() {
  return (
    <Section tone="dark" className="pt-4 pb-10 sm:pt-6 sm:pb-12">
      <div className="prose-content mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-400">Legal</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">
          <strong>Draft placeholder — not legal advice.</strong> {lastUpdated} Have qualified counsel review this
          policy for your jurisdiction and actual data practices before launch, per the launch checklist.
        </p>

        <div className="mt-8 space-y-8 text-slate-300">
          <section>
            <h2 className="text-xl font-bold text-white">1. Information we collect</h2>
            <p className="mt-2 leading-relaxed">
              When you submit our contact form, we collect the information you provide: your name, company, work
              email, phone number (optional), application URL (optional), testing requirements, and message. We also
              automatically collect basic technical information (such as IP address, for spam and rate-limit
              protection) when you use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. How we use information</h2>
            <p className="mt-2 leading-relaxed">
              We use the information you submit to respond to your request, scope a potential engagement, and
              communicate with you about our services. We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. Application test data and credentials</h2>
            <p className="mt-2 leading-relaxed">
              If you engage us for testing services, we may request scoped, least-privilege test access to your
              application (for example, a dedicated test account). We do not request or store production credentials
              or plaintext passwords as part of the normal engagement workflow. Where a future service genuinely
              requires storing access credentials, they are encrypted at rest and access-controlled; we will describe
              that handling specifically in your engagement agreement before any credential is shared.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. Data sharing</h2>
            <p className="mt-2 leading-relaxed">
              We do not share your information with third parties except: service providers who help us operate the
              website and deliver services (for example, email delivery or hosting providers), under confidentiality
              obligations; or where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Data retention</h2>
            <p className="mt-2 leading-relaxed">
              We retain contact form submissions and engagement-related data for as long as reasonably necessary to
              respond to your inquiry, deliver services, and meet legal or contractual obligations. You may request
              deletion of your information by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Security</h2>
            <p className="mt-2 leading-relaxed">
              We use HTTPS in production, environment-based secret management (no credentials in source code), and
              least-privilege access controls. No method of transmission or storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">7. Your choices</h2>
            <p className="mt-2 leading-relaxed">
              You may contact us at any time to access, correct, or request deletion of your personal information,
              subject to applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">8. Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about this policy can be sent to{" "}
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
