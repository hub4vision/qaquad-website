"use client";

/**
 * Privacy-conscious, env-gated event tracking. When
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is unset (the default), every call here is a
 * safe no-op — the site works identically with or without analytics
 * configured. See src/components/analytics/Analytics.tsx for the loader
 * script and PROJECT_STATUS.md for setup notes.
 *
 * Events tracked per the requirements doc:
 *  - hero_cta_click / cta_click — "Book a Free QA Assessment" clicks anywhere
 *  - secondary_cta_click — "See How It Works" clicks
 *  - contact_form_start — first interaction with the contact form
 *  - contact_form_submit — successful submission
 *  - service_page_cta_click — CTA clicks from a specific service page
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackEvent(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (!window.plausible) return;
  window.plausible(event, props ? { props } : undefined);
}
