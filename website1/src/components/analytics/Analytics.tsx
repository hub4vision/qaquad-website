import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Loads Google Analytics (GA4) when NEXT_PUBLIC_GA_ID is configured.
 * This satisfies the requirement to track worldwide visitors, page views, and ranking metrics.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  // If no ID is provided, we can either return null or use a placeholder so the script exists 
  // and the user just needs to set the environment variable.
  if (!gaId) {
    console.warn("NEXT_PUBLIC_GA_ID is missing. Google Analytics is disabled.");
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
