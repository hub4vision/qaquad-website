// Shared fixtures for the website Playwright suite.

export const p0Pages = [
  { path: "/", name: "Home" },
  { path: "/ai-qa-automation", name: "AI QA Automation" },
  { path: "/migration-testing", name: "Migration Testing" },
  { path: "/test-automation", name: "Test Automation" },
  { path: "/how-it-works", name: "How It Works" },
  { path: "/contact", name: "Contact" },
  { path: "/privacy", name: "Privacy Policy" },
  { path: "/terms", name: "Terms" },
];

export const allInternalPages = [
  ...p0Pages,
  { path: "/ai-qa-agent", name: "AI QA Agent" },
  { path: "/industries", name: "Industries" },
  { path: "/about", name: "About" },
  { path: "/case-studies", name: "Case Studies" },
  { path: "/pricing", name: "Pricing" },
  { path: "/resources", name: "Resources" },
  { path: "/blog", name: "Blog" },
];

export const validContactSubmission = {
  name: "Jordan Test",
  company: "Acme QA Testing Co",
  email: "jordan@example.com",
  message: "We release weekly and need help with regression coverage across UI, API, and database checks.",
};
