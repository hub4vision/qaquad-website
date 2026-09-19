// ---------------------------------------------------------------------------
// Chatbot Configuration — Guided Flow Decision Tree & Gemini System Prompt
// ---------------------------------------------------------------------------

// ─── Guided Flow Types ──────────────────────────────────────────────────────

export interface GuidedOption {
  id: string;
  label: string;
  icon: string; // Emoji icon
  description?: string;
}

export interface GuidedStep {
  id: string;
  question: string;
  subtext?: string;
  options: GuidedOption[];
}

export interface Recommendation {
  title: string;
  description: string;
  services: string[];
  ctaLabel: string;
  ctaHref: string;
}

// ─── Guided Flow Steps ──────────────────────────────────────────────────────

export const guidedSteps: GuidedStep[] = [
  {
    id: "testing-type",
    question: "What type of testing are you looking for?",
    subtext: "Select the primary area you need help with",
    options: [
      { id: "functional", label: "Functional Testing", icon: "🧪", description: "End-to-end UI, API & database validation" },
      { id: "migration", label: "Migration Testing", icon: "🔄", description: "Legacy-to-new application comparison" },
      { id: "automation", label: "Test Automation", icon: "⚙️", description: "Playwright / Selenium framework setup" },
      { id: "api-db", label: "API & Database Testing", icon: "🔗", description: "REST/GraphQL + data integrity checks" },
      { id: "regression", label: "Regression Suite", icon: "🔁", description: "Automated regression for every release" },
      { id: "not-sure", label: "Not Sure Yet", icon: "💡", description: "Help me figure out what I need" },
    ],
  },
  {
    id: "qa-setup",
    question: "What does your current QA setup look like?",
    subtext: "This helps us tailor the right approach",
    options: [
      { id: "no-qa", label: "No QA Process", icon: "🚫", description: "We don't have formal testing" },
      { id: "manual", label: "Mostly Manual", icon: "✋", description: "Manual testing by developers or QA team" },
      { id: "partial", label: "Partial Automation", icon: "🔧", description: "Some automated tests, but gaps exist" },
      { id: "full", label: "Full Automation", icon: "✅", description: "Automated but need optimization/migration" },
    ],
  },
  {
    id: "industry",
    question: "Which industry is your application in?",
    subtext: "We have domain expertise across all these sectors",
    options: [
      { id: "fintech", label: "FinTech / Banking", icon: "💳" },
      { id: "healthcare", label: "Healthcare", icon: "🏥" },
      { id: "ecommerce", label: "E-Commerce / Retail", icon: "🛒" },
      { id: "travel", label: "Travel / Hospitality", icon: "✈️" },
      { id: "erp-crm", label: "ERP / CRM / SaaS", icon: "📊" },
      { id: "other", label: "Other", icon: "🏢" },
    ],
  },
  {
    id: "timeline",
    question: "How soon do you need this?",
    subtext: "We can mobilize quickly for urgent engagements",
    options: [
      { id: "urgent", label: "ASAP (This Week)", icon: "🚀", description: "Critical release or migration deadline" },
      { id: "soon", label: "Within 2-4 Weeks", icon: "📅", description: "Upcoming sprint or project phase" },
      { id: "planning", label: "Planning Phase", icon: "📋", description: "Evaluating options, no immediate deadline" },
      { id: "exploring", label: "Just Exploring", icon: "🔍", description: "Want to understand capabilities first" },
    ],
  },
];

// ─── Recommendation Generator ───────────────────────────────────────────────

export function generateRecommendation(answers: Record<string, string>): Recommendation {
  const testingType = answers["testing-type"];
  const qaSetup = answers["qa-setup"];
  const timeline = answers["timeline"];

  // Migration-specific recommendation
  if (testingType === "migration") {
    return {
      title: "AI-Powered Migration Testing",
      description:
        "Our flagship migration testing compares business behavior — not just screenshots. We validate CRUD operations, business rules, workflows, and data integrity between legacy and new systems, classifying every result as PASS, PARTIAL, FAIL, or NOT FOUND.",
      services: ["Legacy-to-New Comparison", "Business Rule Validation", "Data Migration Integrity", "Playwright Automation"],
      ctaLabel: "Book Free Migration Assessment",
      ctaHref: "/contact",
    };
  }

  // No QA process + urgent
  if (qaSetup === "no-qa" && (timeline === "urgent" || timeline === "soon")) {
    return {
      title: "Rapid QA Jumpstart Package",
      description:
        "We'll deploy our AI QA agents to autonomously discover your application's functionality, generate test scenarios from real behavior, and deliver a comprehensive findings report with evidence — all within your first week.",
      services: ["AI Discovery & Exploration", "Automated Test Generation", "Evidence-Backed Defect Reports", "Regression Foundation"],
      ctaLabel: "Get QA Running This Week",
      ctaHref: "/contact",
    };
  }

  // Automation focused
  if (testingType === "automation" || testingType === "regression") {
    return {
      title: "Enterprise Test Automation Framework",
      description:
        "We build maintainable, self-healing Playwright automation suites with dual API + database assertions. Our scripts auto-adapt to UI changes and integrate directly into your CI/CD pipeline.",
      services: ["Playwright Framework Setup", "Self-Healing Locators", "CI/CD Integration", "Regression Suite Management"],
      ctaLabel: "Book Automation Assessment",
      ctaHref: "/contact",
    };
  }

  // API & Database
  if (testingType === "api-db") {
    return {
      title: "API & Database Validation Suite",
      description:
        "Complete REST/GraphQL API testing with schema validation, plus deep database assertion layers that verify every UI action reflects correctly in your data store. No more green checkmarks hiding backend bugs.",
      services: ["API Contract Testing", "Database Assertion Layer", "Data Integrity Validation", "Performance Benchmarking"],
      ctaLabel: "Book API Testing Assessment",
      ctaHref: "/contact",
    };
  }

  // Default / functional / not-sure
  return {
    title: "AI-Powered Functional QA",
    description:
      "Our AI agents explore your application autonomously, generate meaningful test scenarios, execute them across UI, API, and database layers, and produce evidence-backed defect reports. Every finding includes screenshots, traces, and execution logs.",
    services: ["AI Functional Discovery", "Multi-Layer Validation", "Evidence-Backed Reports", "Maintainable Automation"],
    ctaLabel: "Book a Free QA Assessment",
    ctaHref: "/contact",
  };
}

// ─── Quick Reply Buttons for AI Chat ────────────────────────────────────────

export const quickReplies = [
  "What services does QAQuad offer?",
  "How does AI-powered testing work?",
  "Do you support migration testing?",
  "What industries do you serve?",
  "How fast can you start?",
  "What's your pricing model?",
];

// ─── AI Chat Fallback (No Gemini Key) ───────────────────────────────────────

export const fallbackResponses: Record<string, string> = {
  services:
    "QAQuad offers AI-powered functional testing, Playwright automation, API & database validation, migration testing, and regression suite management. Would you like to book a free assessment to discuss your specific needs?",
  pricing:
    "We offer flexible engagement models — Fixed-Price Sprints for defined scope, Managed QA Retainers for ongoing coverage, and Staff Augmentation for embedding QA engineers in your team. Let's discuss what fits your budget on a quick call.",
  migration:
    "Our flagship migration testing compares business behavior between legacy and new systems — not just screenshots. We validate CRUD operations, business rules, workflows, and data integrity, classifying every result. Want to see it in action?",
  industries:
    "We serve FinTech, Healthcare, E-Commerce, Travel/Hospitality, ERP/CRM, and SaaS companies. Our AI agents adapt to any domain. Which industry is your application in?",
  timeline:
    "We can mobilize within 48 hours for urgent engagements. Our AI agents start discovering your application's functionality from day one. How soon do you need QA coverage?",
  default:
    "I'd love to help you with that! For detailed answers, I recommend booking a free QA assessment where our team can dive deep into your specific needs. Would you like to schedule one?",
};

// ─── Gemini System Prompt ───────────────────────────────────────────────────

export const GEMINI_SYSTEM_PROMPT = `You are QAQuad's AI QA Advisor — a friendly, knowledgeable assistant embedded on the QAQuad website (qaquad.com). Your goal is to help visitors understand QAQuad's services, answer their questions about QA testing, and guide them toward booking a free QA assessment.

## About QAQuad
QAQuad provides AI-powered QA automation for faster, more reliable software releases. Key capabilities:

### Core Services
1. **AI-Powered Functional Testing** — Multi-agent AI autonomously explores applications, generates test scenarios from real behavior, and validates across UI, API, and database layers.
2. **Migration Testing** (Flagship) — Compares business behavior between legacy and new systems. Validates CRUD operations, business rules, workflows, permissions, and data integrity. Every result is classified: PASS, PARTIAL, FAIL, NOT FOUND, NOT TESTABLE, or NEEDS BUSINESS CONFIRMATION.
3. **Playwright Test Automation** — Self-healing automation scripts with dual API + database assertions. Auto-adapts to UI changes. Full CI/CD integration.
4. **API & Database Validation** — REST/GraphQL contract testing plus deep database assertion layers ensuring UI actions reflect correctly in the data store.
5. **Regression Suite Management** — Maintainable, automated regression that scales with your application.
6. **AI QA Agent** — Autonomous testing agent that discovers functionality, generates tests, detects defects, and builds regression automation.

### Key Differentiators
- Evidence-backed reporting: Every defect includes screenshots, traces, API responses, database results, and execution logs.
- 4-Stage AI-QA Predictive Engine: Predictive analysis, self-healing scripts, automated discovery, cognitive features.
- Multi-layer validation: UI + API + Database consistency checks on every test.
- Industry expertise: FinTech, Healthcare, E-Commerce, Travel, ERP/CRM, SaaS.

### Engagement Models
- **Fixed-Price Sprint**: Defined scope, clear deliverables, predictable cost.
- **Managed QA Retainer**: Ongoing coverage with dedicated QA team.
- **Staff Augmentation**: Embed QA engineers directly in your team.

### Free Assessment Offer
QAQuad offers a free initial QA assessment that includes:
- NDA execution for confidentiality
- Work in isolated staging environments
- AI journey discovery across high-traffic user flows
- Executive findings report with real defect evidence
- Tailored Playwright automation roadmap

## Your Behavior Rules
1. Be warm, professional, and concise. Use short paragraphs.
2. Always relate answers back to QAQuad's capabilities.
3. When the visitor describes a problem, suggest the most relevant QAQuad service.
4. Frequently encourage booking a free QA assessment (link: /contact).
5. If asked about pricing specifics, explain the engagement models and suggest a call.
6. Never make up capabilities QAQuad doesn't have.
7. If asked about competitors, be professional — focus on QAQuad's strengths without disparaging others.
8. Keep responses under 150 words unless the visitor asks for detail.
9. Use markdown formatting sparingly — bold for emphasis, bullet points for lists.
10. End responses with a question or call-to-action when natural.`;
