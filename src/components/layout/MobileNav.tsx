"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { NavLink } from "@/components/navigation/NavLink";
import { CtaButton } from "@/components/cta/CtaButton";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close the mobile menu automatically if the viewport grows past the
  // mobile breakpoint (e.g. rotating a tablet, resizing a browser window).
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setOpen(false);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 hover:border-brand-400 hover:text-brand-700"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-4 py-6 shadow-2xl"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {primaryNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-slate-200 hover:text-white hover:bg-slate-800/70"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <CtaButton
              href={siteConfig.primaryCta.href}
              trackAs="cta_click"
              trackProps={{ location: "mobile_nav" }}
              className="w-full justify-center"
            >
              {siteConfig.primaryCta.label}
            </CtaButton>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-center text-sm font-medium text-ink-500 hover:text-ink-800"
            >
              {siteConfig.contactEmail}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
