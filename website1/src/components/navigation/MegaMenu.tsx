"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicesMegaMatrix } from "@/lib/site-config";
import { clsx } from "@/lib/clsx";

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isServicesActive =
    pathname.startsWith("/ai-qa-automation") ||
    pathname.startsWith("/ai-qa-tool") ||
    pathname.startsWith("/test-automation") ||
    pathname.startsWith("/ai-qa-agent");

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Close on Escape or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center">
        <Link
          href="/ai-qa-automation"
          className={clsx(
            "text-sm font-semibold transition-colors duration-150 inline-flex items-center gap-1.5 py-2",
            isServicesActive
              ? "text-cyan-400 font-bold"
              : "text-slate-200 hover:text-cyan-300"
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          Services
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={clsx(
              "w-4 h-4 transition-transform duration-200",
              isOpen ? "rotate-180 text-cyan-400" : "text-slate-400"
            )}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>

      {/* Mega Menu Dropdown */}
      <div
        className={clsx(
          "fixed left-1/2 -translate-x-1/2 top-[68px] pt-3 transition-all duration-200 z-50 w-[96vw] max-w-7xl max-h-[85vh] overflow-y-auto",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
      >
        <div className="rounded-2xl border border-slate-700/90 bg-[#070b14]/98 p-6 lg:p-8 shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl ring-1 ring-cyan-500/20">
          {/* Top highlight bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                Quality Engineering &amp; AI-QA Services Matrix
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/ai-qa-tool"
                className="flex items-center gap-2 text-cyan-300 hover:text-white font-bold bg-cyan-950/80 border border-cyan-500/40 px-4 py-1.5 rounded-full transition-all hover:bg-cyan-900/60 shadow-sm shadow-cyan-500/20"
              >
                <span>Explore AI-QA Tool &amp; Engine</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* 5 Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {servicesMegaMatrix.map((column) => (
              <div key={column.title} className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 border-b border-slate-800 pb-2">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group flex flex-col rounded-xl p-2 -mx-1 hover:bg-slate-900/90 hover:border hover:border-cyan-500/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-extrabold text-cyan-300 border border-cyan-400/30 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.desc && (
                          <span className="text-[11px] text-slate-300 group-hover:text-slate-200 line-clamp-1 mt-0.5">
                            {item.desc}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/60 p-4 border border-slate-800">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Need a customized QA solution?</span> Multi-layer browser, API, and SQL database automation built for your release pipeline.
            </div>
            <Link
              href="/contact"
              className="text-xs font-bold text-cyan-300 hover:text-white bg-slate-900/80 hover:bg-cyan-950/80 px-3.5 py-1.5 rounded-lg border border-cyan-500/30 whitespace-nowrap flex items-center gap-1 transition-all"
            >
              Book QA Strategy Session &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
