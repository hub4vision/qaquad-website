"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { primaryNav, servicesMegaMatrix, servicesNav, siteConfig, subNavMatrix } from "@/lib/site-config";
import { NavLink } from "@/components/navigation/NavLink";
import { CtaButton } from "@/components/cta/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { clsx } from "@/lib/clsx";

const navIcons: Record<string, React.ReactNode> = {
  "/ai-qa-automation": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  "/ai-qa-tool": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  ),
  "/migration-testing": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  "/how-it-works": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  "/industries": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  "/about": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
  "/contact": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  ),
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
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
              className="fixed inset-x-0 top-[68px] bottom-0 z-50 overflow-y-auto bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-slate-900 border-t border-slate-200 shadow-2xl flex flex-col justify-between"
            >
              {/* Decorative Subtle Logo Glow Ambient Highlights (Sky Blue, Orange, Purple, Green) */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-sky-500 via-orange-500 via-purple-500 to-emerald-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
                <div className="absolute top-10 left-[-10%] h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
                <div className="absolute top-1/3 right-[-10%] h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
                <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              </div>

              <div className="flex flex-col gap-6 px-5 py-6">
                {/* Menu Title / Quick Status Bar with QAQuad Logo Brand Strip */}
                <div className="flex items-center justify-between border-b border-slate-300/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-800">
                      Navigation Menu
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-semibold text-slate-500 ml-1">
                      QAQuad Suite
                    </span>
                  </div>
                </div>

                {/* Primary Navigation Cards with Expandable Accordion Submenus for All Menus */}
                <nav className="flex flex-col gap-2.5" aria-label="Mobile">
                  {primaryNav.map((item) => {
                    const isServices = item.label === "Services";
                    const hasSubNav = Boolean(subNavMatrix[item.label]);
                    const isExpandable = isServices || hasSubNav;
                    const isExpanded = expandedMenu === item.label;

                    return (
                      <div
                        key={item.href + item.label}
                        className={clsx(
                          "rounded-xl border transition-all duration-200 overflow-hidden shadow-sm",
                          isExpanded
                            ? "border-sky-400 bg-white shadow-md ring-2 ring-sky-400/20"
                            : "border-slate-200/90 bg-white/80 hover:bg-white hover:border-slate-300 backdrop-blur-sm"
                        )}
                      >
                        <div className="flex items-center justify-between p-3.5">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3.5 flex-1 group"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-100 text-sky-600 shadow-sm transition-all group-hover:scale-105 group-hover:from-sky-100 group-hover:to-blue-200 group-hover:text-sky-700">
                              {navIcons[item.href] || (
                                <span className="h-2 w-2 rounded-full bg-sky-500" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                                {item.label}
                              </span>
                              {isExpandable ? (
                                <span className="text-[11px] text-sky-600 font-semibold">
                                  {isExpanded ? "Tap arrow to collapse" : "Tap arrow for sub-options"}
                                </span>
                              ) : (
                                <span className="text-[11px] text-slate-500">
                                  Go to {item.label} page
                                </span>
                              )}
                            </div>
                          </Link>

                          {isExpandable ? (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedMenu((curr) => (curr === item.label ? null : item.label))
                              }
                              aria-expanded={isExpanded}
                              aria-label={`Toggle ${item.label} submenu`}
                              className={clsx(
                                "p-2.5 rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                                isExpanded
                                  ? "border-sky-300 bg-sky-50 text-sky-600"
                                  : "border-slate-200 bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                              )}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={clsx(
                                  "w-5 h-5 transition-transform duration-300",
                                  isExpanded ? "rotate-180 text-orange-500" : "text-slate-500"
                                )}
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="p-2.5 text-slate-400 hover:text-sky-600"
                              aria-label={`Open ${item.label}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-5 w-5"
                                aria-hidden="true"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                            </Link>
                          )}
                        </div>

                        {/* Services Mega Matrix Accordion Content */}
                        {isServices && isExpanded && (
                          <div className="border-t border-slate-200 bg-slate-50/95 p-4 sm:p-5 space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                              <span className="text-xs font-black uppercase tracking-wider text-sky-800">
                                All Quality Engineering Offerings
                              </span>
                              <Link
                                href="/ai-qa-tool"
                                onClick={() => setOpen(false)}
                                className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
                              >
                                AI-QA Tool &rarr;
                              </Link>
                            </div>

                            {servicesMegaMatrix.map((cat) => (
                              <div key={cat.title} className="space-y-2.5">
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200/60 pb-1">
                                  {cat.title}
                                </h4>
                                <div className="grid grid-cols-1 gap-2 pl-2.5 border-l-2 border-sky-400">
                                  {cat.items.map((sub) => (
                                    <Link
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center justify-between py-2 px-3 rounded-xl text-slate-800 hover:text-sky-700 hover:bg-white hover:shadow-sm transition-all"
                                    >
                                      <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-900 leading-snug">
                                          {sub.label}
                                        </span>
                                        {sub.desc && (
                                          <span className="text-xs text-slate-600 font-normal leading-relaxed mt-0.5">
                                            {sub.desc}
                                          </span>
                                        )}
                                      </div>
                                      {sub.badge && (
                                        <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-md bg-sky-100 border border-sky-300 text-sky-800 shrink-0 ml-3">
                                          {sub.badge}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Other Menu Items SubNavMatrix Accordion Content */}
                        {!isServices && hasSubNav && isExpanded && (
                          <div className="border-t border-slate-200 bg-slate-50/95 p-4 sm:p-5 space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                              <span className="text-xs font-black uppercase tracking-wider text-sky-800">
                                {item.label} Topics &amp; Sections
                              </span>
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
                              >
                                View Page &rarr;
                              </Link>
                            </div>

                            {subNavMatrix[item.label]?.map((section) => (
                              <div key={section.title} className="space-y-2.5">
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200/60 pb-1">
                                  {section.title}
                                </h4>
                                <div className="grid grid-cols-1 gap-2 pl-2.5 border-l-2 border-purple-400">
                                  {section.items.map((sub) => (
                                    <Link
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center justify-between py-2 px-3 rounded-xl text-slate-800 hover:text-purple-700 hover:bg-white hover:shadow-sm transition-all"
                                    >
                                      <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-900 leading-snug">
                                          {sub.label}
                                        </span>
                                        {sub.desc && (
                                          <span className="text-xs text-slate-600 font-normal leading-relaxed mt-0.5">
                                            {sub.desc}
                                          </span>
                                        )}
                                      </div>
                                      {sub.badge && (
                                        <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 border border-purple-300 text-purple-800 shrink-0 ml-3">
                                          {sub.badge}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* Core Capabilities Sub-section (Light card with logo accents) */}
                <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-5 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3.5">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                      Core Testing Capabilities
                    </p>
                    <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800">
                      AI + Automation
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { label: "AI-QA Tool & Engine", href: "/ai-qa-tool" },
                      { label: "AI Functional Testing", href: "/ai-qa-automation" },
                      { label: "Playwright Automation", href: "/test-automation" },
                      { label: "API Testing", href: "/test-automation#api-testing" },
                      { label: "Database Validation", href: "/test-automation#database-validation" },
                      { label: "AI QA Agent", href: "/ai-qa-agent" },
                    ].map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3.5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:border-sky-300 hover:bg-white hover:text-sky-700 hover:shadow-sm"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500 group-hover:bg-orange-500 transition-colors" />
                        <span className="truncate">{svc.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Section (Clean light footer) */}
              <div className="border-t border-slate-200 bg-white/95 p-5 flex flex-col gap-3.5 backdrop-blur-md shadow-lg">
                <CtaButton
                  href={siteConfig.primaryCta.href}
                  trackAs="cta_click"
                  trackProps={{ location: "mobile_nav" }}
                  className="w-full justify-center py-3.5 text-base font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md shadow-sky-500/25 border-0"
                  onClick={() => setOpen(false)}
                >
                  {siteConfig.primaryCta.label}
                </CtaButton>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4 text-sky-600" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-semibold text-sky-600 hover:text-sky-700 transition-colors text-sm"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
