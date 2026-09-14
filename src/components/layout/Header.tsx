import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { NavLink } from "@/components/navigation/NavLink";
import { CtaButton } from "@/components/cta/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/60 bg-slate-950 shadow-xl shadow-black/40">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg" aria-label={`${siteConfig.name}.com home`}>
          <Logo size="md" />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-7" aria-label="Primary">
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaButton
            href={siteConfig.primaryCta.href}
            trackAs="cta_click"
            trackProps={{ location: "header" }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 border-0"
          >
            {siteConfig.primaryCta.label}
          </CtaButton>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
