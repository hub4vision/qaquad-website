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
              className="fixed inset-x-0 top-[68px] bottom-0 z-50 overflow-y-auto bg-[#070b14] border-t border-slate-800 shadow-2xl flex flex-col justify-between"
            >
              {/* Decorative Tech Grid & Ambient Glow Background */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
                <div className="absolute inset-0 bg-grid-faint opacity-60" />
              </div>

              <div className="flex flex-col gap-6 px-5 py-6">
                {/* Menu Title / Quick Status Bar */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-300">
                      Navigation Menu
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Select a service or section
                  </span>
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
                            ? "border-cyan-500/50 bg-slate-900/90 ring-1 ring-cyan-500/20"
                            : "border-slate-800/80 bg-slate-900/60"
                        )}
                      >
                        <div className="flex items-center justify-between p-3.5">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3.5 flex-1 group"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition-colors group-hover:border-cyan-400/50 group-hover:bg-cyan-500/20 group-hover:text-cyan-300">
                              {navIcons[item.href] || (
                                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-base font-semibold text-slate-100 group-hover:text-white">
                                {item.label}
                              </span>
                              {isExpandable ? (
                                <span className="text-[11px] text-cyan-400 font-medium">
                                  {isExpanded ? "Tap arrow to collapse" : "Tap arrow for sub-options"}
                                </span>
                              ) : (
                                <span className="text-[11px] text-slate-400">
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
                                "p-2.5 rounded-lg border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                                isExpanded
                                  ? "border-cyan-500/50 bg-cyan-950/60 text-cyan-300"
                                  : "border-slate-700/80 bg-slate-800/80 text-cyan-400 hover:text-white hover:bg-slate-700"
                              )}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={clsx(
                                  "w-5 h-5 transition-transform duration-300",
                                  isExpanded ? "rotate-180 text-amber-400" : "text-cyan-400"
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
                              className="p-2.5 text-slate-500 hover:text-cyan-400"
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
                          <div className="border-t border-slate-800 bg-[#050812] p-4 space-y-5 animate-fadeIn">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-300">
                                All Quality Engineering Offerings
                              </span>
                              <Link
                                href="/ai-qa-tool"
                                onClick={() => setOpen(false)}
                                className="text-[11px] font-bold text-amber-400 hover:underline"
                              >
                                AI-QA Tool &rarr;
                              </Link>
                            </div>

                            {servicesMegaMatrix.map((cat) => (
                              <div key={cat.title} className="space-y-2">
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                                  {cat.title}
                                </h4>
                                <div className="grid grid-cols-1 gap-1.5 pl-2 border-l border-slate-800">
                                  {cat.items.map((sub) => (
                                    <Link
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-900/90 transition-colors"
                                    >
                                      <div className="flex flex-col">
                                        <span className="font-medium">{sub.label}</span>
                                        {sub.desc && (
                                          <span className="text-[10px] text-slate-400">{sub.desc}</span>
                                        )}
                                      </div>
                                      {sub.badge && (
                                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 shrink-0 ml-2">
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
                          <div className="border-t border-slate-800 bg-[#050812] p-4 space-y-4 animate-fadeIn">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                              <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-300">
                                {item.label} Topics &amp; Sections
                              </span>
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="text-[11px] font-bold text-amber-400 hover:underline"
                              >
                                View Page &rarr;
                              </Link>
                            </div>

                            {subNavMatrix[item.label]?.map((section) => (
                              <div key={section.title} className="space-y-2">
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                                  {section.title}
                                </h4>
                                <div className="grid grid-cols-1 gap-1.5 pl-2 border-l border-slate-800">
                                  {section.items.map((sub) => (
                                    <Link
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={() => setOpen(false)}
                                      className="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-900/90 transition-colors"
                                    >
                                      <div className="flex flex-col">
                                        <span className="font-semibold text-slate-200 hover:text-cyan-300">
                                          {sub.label}
                                        </span>
                                        {sub.desc && (
                                          <span className="text-[10px] text-slate-400">{sub.desc}</span>
                                        )}
                                      </div>
                                      {sub.badge && (
                                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 shrink-0 ml-2">
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

                {/* Core Capabilities Sub-section */}
                <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/70 to-slate-950/80 p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                      Core Testing Capabilities
                    </p>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                      AI + Automation
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                        className="group flex items-center gap-2 rounded-lg border border-slate-800/60 bg-slate-900/40 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-500/40 hover:bg-slate-800/70 hover:text-cyan-300"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 group-hover:shadow-[0_0_6px_#22d3ee]" />
                        <span className="truncate">{svc.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Section */}
              <div className="border-t border-slate-800/90 bg-slate-950/90 p-5 flex flex-col gap-3.5 backdrop-blur-md">
                <CtaButton
                  href={siteConfig.primaryCta.href}
                  trackAs="cta_click"
                  trackProps={{ location: "mobile_nav" }}
                  className="w-full justify-center py-3.5 text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 border-0"
                  onClick={() => setOpen(false)}
                >
                  {siteConfig.primaryCta.label}
                </CtaButton>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-4 w-4 text-cyan-400" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
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
