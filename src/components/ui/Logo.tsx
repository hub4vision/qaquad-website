import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className = "",
  showText = true,
  size = "md",
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
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official QAQuad Multi-Color Q Emblem */}
      <div
        className={`relative flex items-center justify-center shrink-0 ${iconDimensions.px} rounded-xl bg-white p-1 shadow-md shadow-cyan-500/20 ring-1 ring-white/20 transition-transform duration-200 hover:scale-105`}
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
  );
}
