import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  hoverPlacement?: "top" | "bottom";
}

export function Logo({
  className = "",
  showText = true,
  size = "md",
  hoverPlacement = "bottom",
}: LogoProps) {
  // Sizing matrix for emblem
  const iconDimensions = {
    sm: { size: 36, px: "h-9 w-9" },
    md: { size: 44, px: "h-11 w-11" },
    lg: { size: 54, px: "h-14 w-14" },
  }[size];

  const textSizes = {
    sm: "text-xl tracking-tight",
    md: "text-2xl tracking-tight",
    lg: "text-3xl tracking-tight",
  }[size];

  return (
    <div className={`relative inline-flex items-center select-none group/logo group cursor-pointer ${className}`}>
      <div className="inline-flex items-center gap-3">
        {/* Official QAQuad Multi-Color Q Emblem */}
        <div
          className={`relative flex items-center justify-center shrink-0 ${iconDimensions.px} rounded-xl bg-white p-1 shadow-md shadow-cyan-500/20 ring-1 ring-white/20 transition-all duration-300 group-hover:scale-105 group-hover/logo:scale-105 group-hover:shadow-cyan-400/40`}
        >
          <Image
            src="/QAQuad_emblem.png"
            alt="QAQuad Logo"
            width={iconDimensions.size}
            height={iconDimensions.size}
            priority
            className="h-full w-full object-contain"
          />
        </div>

        {/* Brand Wordmark: Bold, Ultra-Clean & High Contrast Multi-Color */}
        {showText && (
          <div className="flex items-baseline font-sans leading-none">
            {/* "QA" in ultra-bright pure white */}
            <span className={`font-black tracking-tight text-white ${textSizes} drop-shadow-sm`}>
              QA
            </span>
            {/* "Quad" in brilliant multi-color gradient (Cyan -> Rose -> Violet) */}
            <span
              className={`font-black tracking-tight bg-gradient-to-r from-sky-400 via-rose-400 to-violet-400 bg-clip-text text-transparent ${textSizes} drop-shadow-[0_0_16px_rgba(56,189,248,0.35)]`}
            >
              Quad
            </span>
            {/* ".com" badge with emerald/cyan accent */}
            <span className="ml-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 bg-slate-900/90 border border-emerald-500/40 px-1.5 py-0.5 rounded shadow-sm">
              .com
            </span>
          </div>
        )}
      </div>

      {/* Hover Card: Shows full QAQuadLogo.png with all brand details */}
      <div
        className={`pointer-events-none absolute ${
          hoverPlacement === "top" ? "bottom-full pb-3" : "top-full pt-3"
        } left-0 z-50 w-72 sm:w-80 opacity-0 ${
          hoverPlacement === "top" ? "-translate-y-2" : "translate-y-2"
        } scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover/logo:opacity-100 group-hover:translate-y-0 group-hover/logo:translate-y-0 group-hover:scale-100 group-hover/logo:scale-100 group-hover:pointer-events-auto group-hover/logo:pointer-events-auto`}
      >
        <div className="overflow-hidden rounded-2xl border border-cyan-500/40 bg-slate-950/95 p-3.5 shadow-2xl shadow-cyan-950/60 backdrop-blur-2xl ring-1 ring-white/10">
          <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-white p-2 shadow-inner">
            <Image
              src="/QAQuadLogo.png"
              alt="QAQuad Full Logo and Capabilities"
              fill
              sizes="(max-width: 640px) 280px, 320px"
              className="object-contain p-1"
            />
          </div>
          <div className="mt-2.5 px-1 text-center">
            <p className="text-xs font-bold tracking-wide text-cyan-300 uppercase">
              AI-Powered Quality Engineering
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              UI • API • Database • Business Logic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
