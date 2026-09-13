# Qualisys AI — Marketing Website

A production-ready B2B marketing website for an AI-powered QA automation and
software testing services business, built with Next.js (App Router),
TypeScript, and Tailwind CSS.

> **Before you read further:** see [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)
> for exactly what's been built, what's verified vs. not-yet-verified, and
> what to do first.

## Tech stack

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript (strict mode)
- **Styling:** Tailwind CSS, with design tokens in `tailwind.config.ts`
- **Validation:** Zod (shared client + server contact-form schema)
- **Testing:** Playwright (end-to-end website regression suite)
- **Hosting target:** Vercel (or any Node.js/Next.js-compatible host)

## Project structure

```text
src/
├── app/                     # Routes (App Router) — one folder per page
│   ├── page.tsx             # Home
│   ├── ai-qa-automation/    # AI Functional Testing
│   ├── migration-testing/   # Flagship migration-testing page
│   ├── test-automation/     # Playwright / API / DB / regression / CI-CD
│   ├── ai-qa-agent/         # AI QA Agent architecture + roadmap
│   ├── how-it-works/        # 7-step delivery process
│   ├── industries/          # Industry pages
│   ├── about/                # Company story + principles
│   ├── case-studies/        # "Coming soon" — honest placeholder
│   ├── pricing/              # Indicative packages
│   ├── resources/            # "Coming soon"
│   ├── blog/                  # "Coming soon" + planned topics
│   ├── contact/               # Lead capture form
│   ├── privacy/, terms/       # Legal (draft — see PROJECT_STATUS.md)
│   ├── api/contact/route.ts   # Secure server-side form handler
│   ├── sitemap.ts, robots.ts  # Native Next.js SEO routes
│   └── layout.tsx, globals.css
├── components/
│   ├── layout/               # Header, Footer, MobileNav
│   ├── navigation/           # NavLink (active-state aware)
│   ├── hero/                 # Hero section
│   ├── ui/                   # Button, Container, Section, Badge, SectionHeading
│   ├── services/              # ServiceCard, ServicesGrid
│   ├── workflow/               # Reusable workflow-step diagram
│   ├── migration/               # Old/new comparison table
│   ├── evidence/                 # Evidence cards + example defect
│   ├── forms/                     # ContactForm (client component)
│   ├── cta/                        # CtaButton (tracked), CTASection
│   ├── industries/                  # IndustryCard
│   ├── seo/                          # StructuredData (JSON-LD)
│   └── analytics/                     # Plausible loader (env-gated)
├── lib/                       # site-config, seo, validation, rate-limit, analytics, clsx
└── data/                      # (reserved for future structured content)
tests/                          # Playwright website regression suite
public/                          # favicon, apple touch icon, OG image
```

## Local development

```bash
npm install
cp .env.example .env.local   # fill in what you have; every var is optional for local dev
npm run dev                  # http://localhost:3000
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Run the Playwright suite (builds + starts the app automatically) |
| `npm run test:e2e:ui` | Playwright's interactive UI mode |

## Environment variables

See [`.env.example`](./.env.example) for the full list with explanations.
Nothing is required for local development — the contact form degrades
gracefully (logs the lead server-side) until you configure a real
email/webhook provider. **Never commit `.env.local` or real secrets.**

Required before production launch:

- `NEXT_PUBLIC_SITE_URL` — your real domain, used in metadata/sitemap/OG tags.
- One of `RESEND_API_KEY` (+ `LEAD_NOTIFICATION_TO_EMAIL` /
  `LEAD_NOTIFICATION_FROM_EMAIL`) or `LEAD_WEBHOOK_URL`, so leads actually
  reach you.

Recommended before launch:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — spam protection
  beyond the built-in honeypot + rate limit (see PROJECT_STATUS.md).
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — analytics (optional; site works without it).
- `DATABASE_URL` — if you want leads persisted, not just emailed.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Set the environment variables above in Vercel Project Settings →
   Environment Variables (Production + Preview as appropriate).
4. Deploy. Vercel auto-detects Next.js — no custom build settings needed.
5. Point your domain at the Vercel project and update `NEXT_PUBLIC_SITE_URL`
   to match.

Any other Node.js host that supports Next.js (`next build` + `next start`)
works too.

## Testing

```bash
npx playwright install --with-deps   # first time only, installs browsers
npm run test:e2e
```

The suite covers: homepage load, desktop navigation, mobile navigation,
AI QA Automation page, Migration Testing page, service-page links, contact
form validation, successful contact form submission, CTA buttons, Privacy
page, Terms page, and site-wide internal link integrity — across Chromium,
Edge, Firefox, and a mobile Chrome profile.

## Important: read before launch

This codebase was written in an environment without registry access to
install dependencies or execute a real build — see
[`PROJECT_STATUS.md`](./PROJECT_STATUS.md) for exactly what that means and
what to verify first.
