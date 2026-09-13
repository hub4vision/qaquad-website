import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="dark" className="pt-24 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-cyan-400">404</p>
      <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">This page doesn't exist</h1>
      <p className="mx-auto mt-3 max-w-md text-slate-300">
        The page you're looking for may have moved. Try the homepage, or head straight to a free QA assessment.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/">Go to homepage</Button>
        <Button href="/contact" variant="secondary">
          Book a Free QA Assessment
        </Button>
      </div>
      <p className="mt-8 text-sm">
        <Link href="/how-it-works" className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4">
          Or see how our QA process works →
        </Link>
      </p>
    </Section>
  );
}
