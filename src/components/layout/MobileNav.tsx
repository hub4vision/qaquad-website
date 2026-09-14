"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { primaryNav, servicesNav, siteConfig } from "@/lib/site-config";
import { NavLink } from "@/components/navigation/NavLink";
import { CtaButton } from "@/components/cta/CtaButton";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the mobile menu automatically if the viewport grows past the
  // mobile breakpoint (e.g. rotating a tablet, resizing a browser window).
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setOpen(false);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/90 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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

      {open && mounted
        ? createPortal(
            <div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-x-0 top-[68px] bottom-0 z-50 overflow-y-auto bg-slate-950/98 backdrop-blur-2xl border-t border-slate-800 px-5 py-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <nav className="flex flex-col gap-1" aria-label="Mobile">
                  {primaryNav.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-3 text-lg font-medium text-slate-100 hover:text-cyan-300 hover:bg-slate-900/90 transition-all border border-transparent hover:border-slate-800"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
                    Our Core Capabilities
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {servicesNav.slice(0, 4).map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        onClick={() => setOpen(false)}
                        className="text-sm text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-2 py-1"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                        {svc.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3.5 border-t border-slate-800/80 pt-6">
                <CtaButton
                  href={siteConfig.primaryCta.href}
                  trackAs="cta_click"
                  trackProps={{ location: "mobile_nav" }}
                  className="w-full justify-center py-3.5 text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                  onClick={() => setOpen(false)}
                >
                  {siteConfig.primaryCta.label}
                </CtaButton>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-center text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
