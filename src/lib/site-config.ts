// Single source of truth for site-wide copy fragments, navigation, and
// structured content used across multiple pages/components. Keeping this in
// one place means updating a headline, nav item, or CTA once updates it
// everywhere it's used.

export const siteConfig = {
  name: "QAQuad",
  legalName: "QAQuad",
  tagline: "AI-powered QA automation for faster, more reliable software releases.",
  description:
    "QAQuad provides AI-powered functional testing, Playwright automation, API and database validation, and legacy-to-new application migration testing for software, SaaS, travel technology, ERP/CRM, logistics, and e-commerce companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://qaquad.com",
  contactEmail: "info@QAQuad.com",
  primaryCta: { label: "Book a Free QA Assessment", href: "/contact" },
  secondaryCta: { label: "See How It Works", href: "/how-it-works" },
  social: {
    linkedin: "https://www.linkedin.com/company/qaquad",
    github: "https://github.com/qaquad",
  },
};

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/ai-qa-automation" },
  { label: "AI-QA Tool", href: "/ai-qa-tool" },
  { label: "Migration Testing", href: "/migration-testing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const servicesNav: NavItem[] = [
  { label: "AI-QA Tool & Engine", href: "/ai-qa-tool" },
  { label: "AI Functional Testing", href: "/ai-qa-automation" },
  { label: "Playwright Automation", href: "/test-automation" },
  { label: "API Testing", href: "/test-automation#api-testing" },
  { label: "Database Validation", href: "/test-automation#database-validation" },
  { label: "Migration Testing", href: "/migration-testing" },
  { label: "AI QA Agent", href: "/ai-qa-agent" },
];

export interface ServiceMatrixCategory {
  title: string;
  items: { label: string; href: string; badge?: string; desc?: string }[];
}

export const servicesMegaMatrix: ServiceMatrixCategory[] = [
  {
    title: "AI-QA Services",
    items: [
      { label: "Predictive Analysis", href: "/ai-qa-tool#predictive-analysis", badge: "AI", desc: "Forecast defect hotspots & risk scores" },
      { label: "Self-Healing Scripts", href: "/ai-qa-tool#self-healing", badge: "AI", desc: "Auto-adapt locators to UI changes" },
      { label: "Platform Testing", href: "/ai-qa-automation", desc: "End-to-end multi-platform coverage" },
      { label: "Cognitive Features", href: "/ai-qa-agent", desc: "Vision, voice, and conversational QA" },
      { label: "Robustness Validation", href: "/test-automation", desc: "Chaos, stress & boundary resilience" },
      { label: "Behavioural AI Testing", href: "/ai-qa-tool#behavioural-ai", desc: "Validate LLMs & AI decision models" },
      { label: "Model Evaluation", href: "/ai-qa-tool#model-evaluation", desc: "Accuracy, latency & drift checks" },
      { label: "Data Validation", href: "/test-automation#database-validation", desc: "Data integrity & SQL precision" },
    ],
  },
  {
    title: "Quality Engineering",
    items: [
      { label: "Agile Testing", href: "/how-it-works", desc: "Sprint-aligned continuous validation" },
      { label: "Microservice Testing", href: "/test-automation#api-testing", desc: "Contract & distributed service checks" },
      { label: "Continuous Testing", href: "/test-automation#cicd-qa", desc: "Seamless CI/CD pipeline triggers" },
    ],
  },
  {
    title: "Systems & Platforms",
    items: [
      { label: "Web App Testing", href: "/test-automation", desc: "Cross-browser modern WebApps" },
      { label: "Mobile App Testing", href: "/test-automation", desc: "iOS, Android & responsive viewport" },
      { label: "ERP & CRM Testing", href: "/industries", desc: "Enterprise enterprise workflow QA" },
      { label: "SaaS & Cloud Platforms", href: "/industries", desc: "Multi-tenant cloud apps" },
      { label: "Travel & E-Commerce", href: "/industries", desc: "Complex transactional workflows" },
    ],
  },
  {
    title: "Full-Cycle Testing",
    items: [
      { label: "QA Consulting", href: "/contact", desc: "Strategy & architecture assessment" },
      { label: "Test Automation", href: "/test-automation", desc: "Playwright & Cypress suites" },
      { label: "Managed QA Testing", href: "/how-it-works", desc: "Dedicated high-velocity squads" },
      { label: "Migration Testing", href: "/migration-testing", badge: "Flagship", desc: "Legacy vs modern behavior diff" },
      { label: "Manual & Ad-hoc QA", href: "/how-it-works", desc: "Exploratory expert evaluation" },
    ],
  },
  {
    title: "Test Coverage",
    items: [
      { label: "Functional Testing", href: "/ai-qa-automation", desc: "Core business rule execution" },
      { label: "API & Integration Testing", href: "/test-automation#api-testing", desc: "Payload & contract verification" },
      { label: "Regression Testing", href: "/test-automation", desc: "Zero-drift release protection" },
      { label: "Performance & Stress", href: "/test-automation", desc: "Load, latency & memory metrics" },
      { label: "Compatibility Testing", href: "/test-automation", desc: "Matrix across OS & browsers" },
    ],
  },
];

export interface SubMenuItem {
  label: string;
  href: string;
  badge?: string;
  desc?: string;
}

export interface SubNavSection {
  title: string;
  items: SubMenuItem[];
}

export const subNavMatrix: Record<string, SubNavSection[]> = {
  "AI-QA Tool": [
    {
      title: "Engine Capabilities",
      items: [
        { label: "Predictive Analysis", href: "/ai-qa-tool#predictive-analysis", badge: "AI", desc: "Defect forecasting & risk score calculation" },
        { label: "Self-Healing Scripts", href: "/ai-qa-tool#self-healing", badge: "Auto", desc: "Automated locator resolution on DOM changes" },
        { label: "Behavioural AI Testing", href: "/ai-qa-tool#behavioural-ai", badge: "LLM", desc: "Validate non-deterministic conversational AI" },
        { label: "Model Evaluation", href: "/ai-qa-tool#model-evaluation", desc: "Accuracy, latency, and drift benchmarks" },
      ],
    },
    {
      title: "Interactive Framework",
      items: [
        { label: "4-Stage QA Cycle", href: "/ai-qa-tool#cycle-heading", desc: "Data Processing → Model → Prediction → Feedback" },
        { label: "Live Telemetry Cluster", href: "/ai-qa-tool#telemetry", desc: "Real-time execution dashboard simulation" },
      ],
    },
  ],
  "Migration Testing": [
    {
      title: "Legacy-to-New Verification",
      items: [
        { label: "Functional Parity Analysis", href: "/migration-testing", badge: "Flagship", desc: "Compare business behavior between legacy & new" },
        { label: "Old vs New Scorecard", href: "/migration-testing#classification-heading", desc: "PASS, PARTIAL, FAIL, and GAP classification" },
        { label: "Database & ETL Validation", href: "/migration-testing#database", desc: "Post-migration calculation & data integrity" },
      ],
    },
    {
      title: "Strategy & Process",
      items: [
        { label: "Migration Strategy Graph", href: "/migration-testing#migration-strategy-heading", desc: "Circular legacy discovery & cutover readiness" },
        { label: "Illustrative Comparison", href: "/migration-testing#example-heading", desc: "Side-by-side behavioral gap demonstration" },
      ],
    },
  ],
  "How It Works": [
    {
      title: "Delivery Workflow",
      items: [
        { label: "7-Step QA Process", href: "/how-it-works", desc: "Connect → Discover → Understand → Generate → Execute → Analyze → Automate" },
        { label: "AI Application Explorer", href: "/how-it-works#steps-heading", desc: "Autonomous screen and form mapping" },
        { label: "Evidence Collection", href: "/how-it-works#detail-heading", desc: "Screenshots, traces, and DB diffs on every run" },
      ],
    },
  ],
  Industries: [
    {
      title: "Specialized Sectors",
      items: [
        { label: "Travel Technology", href: "/industries#travel-technology", badge: "Complex", desc: "Multi-currency booking engines & fare logic" },
        { label: "SaaS & Cloud Platforms", href: "/industries#saas", desc: "Multi-tenant permissions & subscription billing" },
        { label: "ERP & CRM Systems", href: "/industries#erp-crm", desc: "Interconnected workflows & calculation audit" },
        { label: "Logistics & Supply Chain", href: "/industries#logistics", desc: "Order fulfillment & status pipeline testing" },
        { label: "E-Commerce", href: "/industries#e-commerce", desc: "Cart, checkout, payments & inventory sync" },
      ],
    },
  ],
  About: [
    {
      title: "Company & Vision",
      items: [
        { label: "About QAQuad", href: "/about", desc: "Engineering-first quality assurance philosophy" },
        { label: "AI QA Agent Architecture", href: "/ai-qa-agent", badge: "Multi-Agent", desc: "Coordinated browser, API, and database agents" },
        { label: "Pricing & Engagement", href: "/pricing", desc: "Flexible audit & managed testing models" },
        { label: "Case Studies", href: "/case-studies", desc: "Real-world release velocity benchmarks" },
      ],
    },
  ],
  Contact: [
    {
      title: "Connect With Our Engineers",
      items: [
        { label: "Book a QA Assessment", href: "/contact", badge: "Free", desc: "Scope a proof-of-concept run for your app" },
        { label: "Technical Advisory", href: "/contact", desc: "Speak directly with QA automation architects" },
      ],
    },
  ],
};

export const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Pricing", href: "/pricing" },
  ],
  services: servicesNav,
  resources: [
    { label: "AI-QA Tool", href: "/ai-qa-tool" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "How It Works", href: "/how-it-works" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priority: "P0" | "P1" | "P2";
  href: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    id: "ai-functional-testing",
    slug: "ai-qa-automation",
    name: "AI Functional Testing",
    shortDescription:
      "AI explores your application, understands workflows, and generates meaningful functional test scenarios.",
    description:
      "Our AI QA Agent explores your application the way a skilled tester would — walking through screens, forms, and workflows to build a functional knowledge base of what the application actually does, then generating test scenarios that reflect real business behavior rather than generic UI clicks.",
    priority: "P0",
    href: "/ai-qa-automation",
    capabilities: [
      "Application discovery and page/workflow mapping",
      "Business rule and validation-rule extraction",
      "Functional requirement generation from observed behavior",
      "Risk-based test scenario generation",
    ],
  },
  {
    id: "playwright-automation",
    slug: "test-automation",
    name: "Playwright Test Automation",
    shortDescription: "Reliable, maintainable browser automation built for long-term regression coverage.",
    description:
      "We build Playwright automation suites structured around real business workflows, not brittle selectors — designed to stay useful release after release instead of becoming a maintenance burden.",
    priority: "P0",
    href: "/test-automation",
    capabilities: [
      "Page-object and workflow-based test architecture",
      "Cross-browser execution (Chrome, Edge, Firefox, WebKit)",
      "Data-driven and parameterized test design",
      "CI/CD-ready test suites",
    ],
  },
  {
    id: "api-testing",
    slug: "test-automation",
    name: "API Testing",
    shortDescription: "Validate REST/API behavior as part of complete business workflows, not in isolation.",
    description:
      "API checks are executed alongside the UI workflow they support, confirming that requests, responses, status codes, and payloads behave correctly for the business scenario being tested — not just that an endpoint returns 200.",
    priority: "P0",
    href: "/test-automation#api-testing",
    capabilities: [
      "Request/response schema and contract validation",
      "Status-code and error-handling verification",
      "Workflow-integrated API checks (not standalone smoke tests)",
      "Authentication and authorization boundary checks",
    ],
  },
  {
    id: "database-validation",
    slug: "test-automation",
    name: "Database Validation",
    shortDescription: "Verify SQL/database state after critical business transactions.",
    description:
      "UI success doesn't always mean the database agrees. We validate that critical transactions — bookings, orders, status changes, calculations — are correctly and consistently persisted, catching defects that UI-only automation cannot see.",
    priority: "P0",
    href: "/test-automation#database-validation",
    capabilities: [
      "Post-transaction data integrity checks",
      "Cross-referencing UI/API state against database state",
      "Calculation and derived-field verification",
      "Read-only, least-privilege validation queries",
    ],
  },
  {
    id: "migration-testing",
    slug: "migration-testing",
    name: "Legacy-to-New Application Migration Testing",
    shortDescription: "Compare functional behavior between legacy and new applications — not just screens.",
    description:
      "When you migrate to a new system, the risk isn't a button that moved — it's a business rule that quietly changed. We build a functional knowledge base from your legacy application and validate that the new one reproduces the same business capability, flagging every gap with evidence.",
    priority: "P0",
    href: "/migration-testing",
    capabilities: [
      "Legacy application functional discovery and baseline capture",
      "Equivalent-workflow execution on the new application",
      "PASS / PARTIAL / FAIL / NOT FOUND / NEEDS BUSINESS CONFIRMATION classification",
      "Evidence-backed gap and defect analysis",
    ],
  },
  {
    id: "regression-testing",
    slug: "test-automation",
    name: "Regression Testing",
    shortDescription: "Execute repeatable release validation with evidence and reporting.",
    description:
      "Stable, high-value scenarios graduate into a maintained regression suite, executed on every release so your team gets fast, evidence-backed confidence before shipping.",
    priority: "P1",
    href: "/test-automation",
    capabilities: [
      "Release-gate regression execution",
      "Evidence capture on every run",
      "Flaky-test triage and stabilization",
      "Trend reporting across releases",
    ],
  },
  {
    id: "ai-qa-agent",
    slug: "ai-qa-agent",
    name: "AI QA Agent",
    shortDescription: "AI-assisted exploration, test generation, execution, and defect analysis.",
    description:
      "Our AI QA Agent architecture combines a browser agent, API agent, database agent, and requirement agent to explore, test, and analyze applications with less manual setup over time.",
    priority: "P1",
    href: "/ai-qa-agent",
    capabilities: [
      "Coordinated browser, API, and database agents",
      "Automated requirement and test-scenario generation",
      "Evidence capture and defect-report drafting",
      "Human review and approval before any release-gating action",
    ],
  },
  {
    id: "cicd-qa",
    slug: "test-automation",
    name: "CI/CD QA Automation",
    shortDescription: "Run automated regression continuously through GitHub Actions, Jenkins, or your pipeline.",
    description:
      "We wire your regression suite into your existing CI/CD pipeline so QA runs automatically on every pull request or release build, with results reported back where your team already works.",
    priority: "P2",
    href: "/test-automation",
    capabilities: [
      "GitHub Actions / Jenkins pipeline integration",
      "Pull-request and release-gate triggers",
      "Structured pass/fail reporting in CI",
      "Parallelized execution for faster feedback",
    ],
  },
];

export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

export const howItWorksSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Connect",
    description:
      "You provide your application URL and authorized test access (a scoped test account, never production credentials shared insecurely).",
  },
  {
    step: "02",
    title: "Discover",
    description: "AI explores the application's functionality — pages, workflows, forms, and data entities.",
  },
  {
    step: "03",
    title: "Understand",
    description: "Requirements, workflows, validation rules, and business rules are identified and documented.",
  },
  {
    step: "04",
    title: "Generate",
    description: "AI creates meaningful test scenarios based on real observed behavior and risk.",
  },
  {
    step: "05",
    title: "Execute",
    description: "Playwright, API, and database checks execute the workflows end to end.",
  },
  {
    step: "06",
    title: "Analyze",
    description: "Evidence is evaluated against expected behavior and defects are identified and classified.",
  },
  {
    step: "07",
    title: "Automate",
    description: "Stable, high-value scenarios become reusable, CI/CD-ready regression automation.",
  },
];

export const solutionSteps: WorkflowStep[] = [
  { step: "01", title: "Discover", description: "Map the application's pages, workflows, and data entities." },
  { step: "02", title: "Understand", description: "Extract business rules, validations, and permissions." },
  { step: "03", title: "Generate", description: "Produce risk-based, meaningful test scenarios." },
  { step: "04", title: "Execute", description: "Run workflows across UI, API, and database." },
  { step: "05", title: "Validate", description: "Compare expected vs. actual behavior with evidence." },
  { step: "06", title: "Report", description: "Deliver evidence-backed, classified findings." },
  { step: "07", title: "Retest", description: "Confirm fixes against the original defect." },
  { step: "08", title: "Regression", description: "Fold stable scenarios into ongoing release regression." },
];

export const migrationWorkflowSteps: WorkflowStep[] = [
  { step: "01", title: "Old Application", description: "Treated as the functional source of truth once confirmed by the customer." },
  { step: "02", title: "AI Application Exploration", description: "AI explores modules, pages, entities, and workflows." },
  { step: "03", title: "Functional Knowledge Base", description: "Extracted CRUD, business rules, validations, permissions, and calculations." },
  { step: "04", title: "Functional Requirements", description: "Baseline requirements derived from observed legacy behavior." },
  { step: "05", title: "New Application", description: "Equivalent workflows are independently explored and executed." },
  { step: "06", title: "Equivalent Workflow Testing", description: "The same business scenarios are run against the new system." },
  { step: "07", title: "UI + API + Database Validation", description: "Behavior is validated at every layer, not just the screen." },
  { step: "08", title: "Evidence", description: "Screenshots, traces, responses, and query results are captured." },
  { step: "09", title: "Defect / Gap Analysis", description: "Findings are classified and reported with evidence." },
  { step: "10", title: "Regression Automation", description: "Confirmed workflows become the new system's regression baseline." },
];

export type Industry = {
  name: string;
  description: string;
  painPoints: string[];
};

export const industries: Industry[] = [
  {
    name: "Travel Technology",
    description:
      "Booking engines, reservation systems, and backoffice platforms with complex pricing, inventory, and multi-currency logic.",
    painPoints: [
      "Complex fare, commission, and markup calculations across currencies",
      "High-volume booking, amendment, and cancellation workflows",
      "Legacy backoffice migrations with undocumented business rules",
    ],
  },
  {
    name: "SaaS",
    description: "Multi-tenant SaaS products shipping frequent releases under tight regression timelines.",
    painPoints: [
      "Weekly or biweekly releases with growing regression scope",
      "Multi-tenant permission and data-isolation risk",
      "Subscription, billing, and plan-tier logic that's easy to break silently",
    ],
  },
  {
    name: "ERP / CRM",
    description: "Back-office systems where a quiet calculation or workflow regression has outsized business impact.",
    painPoints: [
      "Deep, interconnected modules where one change ripples elsewhere",
      "Role- and permission-based workflows that are hard to cover manually",
      "Reports and exports that must match underlying data exactly",
    ],
  },
  {
    name: "Logistics",
    description: "Shipment, routing, and fulfillment platforms where status transitions and integrations are critical.",
    painPoints: [
      "Multi-step status transitions across shipment lifecycles",
      "Third-party carrier and warehouse integrations",
      "Time-sensitive workflows where a defect has real operational cost",
    ],
  },
  {
    name: "E-commerce",
    description: "Storefronts and order-management systems where checkout and inventory accuracy are non-negotiable.",
    painPoints: [
      "Cart, pricing, discount, and tax calculation edge cases",
      "Inventory and order-status consistency across channels",
      "Peak-traffic releases with little room for regression",
    ],
  },
  {
    name: "FinTech / Business Applications",
    description: "Applications where calculation accuracy, auditability, and data integrity carry real financial weight.",
    painPoints: [
      "Calculation and rounding accuracy under regulatory scrutiny",
      "Auditability and evidence requirements for every finding",
      "Low tolerance for undetected functional regressions",
    ],
  },
];

export type ResultClassification = {
  label: string;
  description: string;
  tone: "pass" | "partial" | "fail" | "info";
};

export const resultClassifications: ResultClassification[] = [
  { label: "PASS", description: "New application reproduces the legacy behavior correctly.", tone: "pass" },
  { label: "PARTIAL", description: "Behavior is present but differs in a way that needs review.", tone: "partial" },
  { label: "FAIL", description: "Expected behavior does not work correctly in the new application.", tone: "fail" },
  { label: "NOT FOUND", description: "No equivalent functionality could be located in the new application.", tone: "fail" },
  { label: "NOT TESTABLE", description: "Could not be verified given current access, data, or environment.", tone: "info" },
  { label: "NEEDS BUSINESS CONFIRMATION", description: "A behavior change may be intentional — requires stakeholder sign-off.", tone: "partial" },
];
