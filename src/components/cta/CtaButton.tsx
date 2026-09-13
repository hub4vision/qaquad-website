"use client";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  trackAs: string;
  trackProps?: Record<string, string>;
};

/**
 * Thin client-side wrapper around <Button> that fires an analytics event on
 * click before navigating. Used for every "Book a Free QA Assessment" / "See
 * How It Works" style call-to-action so CTA engagement is measurable per the
 * analytics requirements, without making the base Button component (used in
 * lots of non-tracked places too) always client-side.
 */
export function CtaButton({ href, children, variant = "primary", size = "md", className, trackAs, trackProps }: CtaButtonProps) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => trackEvent(trackAs, trackProps)}
    >
      {children}
    </Button>
  );
}
