"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "@/lib/clsx";

export function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "text-sm font-semibold transition-colors duration-150",
        isActive
          ? "text-cyan-400 font-bold border-b-2 border-cyan-400 pb-0.5"
          : "text-slate-200 hover:text-white hover:text-cyan-300",
        className,
      )}
    >
      {children}
    </Link>
  );
}
