import { z } from "zod";

/**
 * Shared contact-form schema, used both client-side (for inline validation
 * before submit) and server-side (in the API route, which never trusts the
 * client and re-validates everything). Keeping one schema in one place means
 * the two layers can never silently drift apart.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(160, "Company name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(32, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  applicationUrl: z
    .string()
    .trim()
    .max(300, "URL is too long.")
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value),
      "Please include http:// or https:// in the URL.",
    ),
  companyType: z.enum(
    [
      "software-company",
      "saas",
      "travel-technology",
      "erp-crm",
      "logistics",
      "ecommerce",
      "agency",
      "other",
    ],
    { errorMap: () => ({ message: "Please select a company type." }) },
  ),
  testingRequirement: z.enum(
    [
      "ai-functional-testing",
      "playwright-automation",
      "api-testing",
      "database-validation",
      "migration-testing",
      "regression-testing",
      "ai-qa-agent",
      "not-sure",
    ],
    { errorMap: () => ({ message: "Please select a testing requirement." }) },
  ),
  currentQaMethod: z.enum(["manual", "in-house-automation", "outsourced-qa", "none", "other"], {
    errorMap: () => ({ message: "Please select your current QA method." }),
  }),
  isMigrationProject: z.enum(["yes", "no", "not-sure"], {
    errorMap: () => ({ message: "Please let us know if this is a migration project." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few details about what you need (10+ characters).")
    .max(4000, "Message is too long."),
  // Honeypot field: real visitors never fill this in because it's hidden
  // from view via CSS, not just `type="hidden"` (which some bots skip
  // filling on purpose). Any non-empty value here is treated as spam.
  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const companyTypeOptions: { value: ContactFormValues["companyType"]; label: string }[] = [
  { value: "software-company", label: "Software company" },
  { value: "saas", label: "SaaS company" },
  { value: "travel-technology", label: "Travel technology" },
  { value: "erp-crm", label: "ERP / CRM" },
  { value: "logistics", label: "Logistics" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "agency", label: "Development agency" },
  { value: "other", label: "Other" },
];

export const testingRequirementOptions: { value: ContactFormValues["testingRequirement"]; label: string }[] = [
  { value: "ai-functional-testing", label: "AI Functional Testing" },
  { value: "playwright-automation", label: "Playwright Automation" },
  { value: "api-testing", label: "API Testing" },
  { value: "database-validation", label: "Database Validation" },
  { value: "migration-testing", label: "Migration Testing" },
  { value: "regression-testing", label: "Regression Testing" },
  { value: "ai-qa-agent", label: "AI QA Agent" },
  { value: "not-sure", label: "Not sure yet" },
];

export const currentQaMethodOptions: { value: ContactFormValues["currentQaMethod"]; label: string }[] = [
  { value: "manual", label: "Manual testing" },
  { value: "in-house-automation", label: "In-house automation" },
  { value: "outsourced-qa", label: "Outsourced QA" },
  { value: "none", label: "No dedicated QA today" },
  { value: "other", label: "Other" },
];

export const migrationProjectOptions: { value: ContactFormValues["isMigrationProject"]; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure yet" },
];
