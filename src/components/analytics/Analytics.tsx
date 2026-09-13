import Script from "next/script";

/**
 * Loads Plausible (https://plausible.io) only when
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured. Plausible is cookieless and
 * does not track individual visitors across sites, which is why it's the
 * reference choice for "privacy-conscious analytics" in the requirements —
 * swap this component for another provider if you prefer, the rest of the
 * site only depends on the trackEvent() helper in src/lib/analytics.ts.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.tagged-events.js"
      strategy="afterInteractive"
    />
  );
}
