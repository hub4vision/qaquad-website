"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, CheckCircle2, RotateCcw, Calendar, FileText } from "lucide-react";
import {
  companyTypeOptions,
  contactFormSchema,
  currentQaMethodOptions,
  migrationProjectOptions,
  testingRequirementOptions,
  type ContactFormValues,
} from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";
import { clsx } from "@/lib/clsx";
import { MeetingScheduler } from "@/components/forms/MeetingScheduler";

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  applicationUrl: "",
  companyType: "software-company",
  testingRequirement: "playwright-automation",
  currentQaMethod: "manual",
  isMigrationProject: "not-sure",
  message: "",
  website: "",
};

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-[600px] animate-pulse rounded-xl bg-slate-100"></div>}>
      <ContactFormInner />
    </Suspense>
  );
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const interest = searchParams?.get("interest");
  const paramUrl = searchParams?.get("url") || searchParams?.get("applicationUrl");
  const paramCompany = searchParams?.get("company");
  const paramName = searchParams?.get("name") || searchParams?.get("clientName");
  const paramEmail = searchParams?.get("email") || searchParams?.get("clientEmail");
  const paramPhone = searchParams?.get("phone") || searchParams?.get("whatsapp");
  const paramRequirement = searchParams?.get("requirement") || searchParams?.get("testingRequirement");
  const paramCategory = searchParams?.get("category");
  const paramScope = searchParams?.get("scope");
  const paramEvidenceId = searchParams?.get("evidenceId");
  const paramScore = searchParams?.get("score");
  const paramRef = searchParams?.get("ref");
  const paramTier = searchParams?.get("tier");
  const paramTab = searchParams?.get("tab");

  const [activeTab, setActiveTab] = useState<"meeting" | "assessment">(
    paramTab === "assessment" ? "assessment" : paramRef ? "meeting" : "meeting"
  );
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [autoFilledBanner, setAutoFilledBanner] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // 1. Check direct search parameters (e.g. from email links or cross-page buttons)
    if (paramUrl || paramCompany || paramName || paramEmail || paramPhone || interest || paramEvidenceId || paramRef) {
      let mappedCompanyType: ContactFormValues["companyType"] = "software-company";
      if (paramCategory) {
        const cat = paramCategory.toLowerCase();
        if (cat.includes("travel")) mappedCompanyType = "travel-technology";
        else if (cat.includes("commerce") || cat.includes("retail")) mappedCompanyType = "ecommerce";
        else if (cat.includes("saas") || cat.includes("cloud")) mappedCompanyType = "saas";
        else if (cat.includes("crm") || cat.includes("erp")) mappedCompanyType = "erp-crm";
        else if (cat.includes("logistic") || cat.includes("supply")) mappedCompanyType = "logistics";
      }

      let constructedMessage = "";
      if (paramRef) {
        constructedMessage += `[Quotation Reference: ${paramRef}] Tier: ${(paramTier || "Enterprise").toUpperCase()}\n`;
      }
      if (paramUrl) {
        constructedMessage += `Target Application: ${paramUrl}\n`;
      }
      if (paramScope) {
        constructedMessage += `Verified Scope: ${paramScope} (${paramScore ? `${paramScore}% Quality Score` : "Verified"})\n`;
      }
      if (paramEvidenceId) {
        constructedMessage += `Evidence Dossier ID: ${paramEvidenceId}\n`;
      }
      if (interest && !constructedMessage.includes(interest)) {
        constructedMessage += `\nRequirement Notes: ${interest}`;
      }

      setValues((prev) => ({
        ...prev,
        name: paramName || prev.name,
        email: paramEmail || prev.email,
        phone: paramPhone || prev.phone,
        applicationUrl: paramUrl || prev.applicationUrl,
        company: paramCompany || prev.company,
        companyType: mappedCompanyType,
        testingRequirement: (paramRequirement as ContactFormValues["testingRequirement"]) || "playwright-automation",
        message: constructedMessage.trim() || prev.message,
      }));

      if (paramCompany || paramUrl || paramName) {
        setAutoFilledBanner(paramCompany || paramUrl || paramName || "Session Context");
      }
      return;
    }

    // 2. Fallback to localStorage session context only if client navigated from sandbox
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("qaquad_assessment_context") || sessionStorage.getItem("qaquad_assessment_context");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.url || parsed.host)) {
            let mappedCompanyType: ContactFormValues["companyType"] = "software-company";
            const cat = (parsed.category || "").toLowerCase();
            if (cat.includes("travel")) mappedCompanyType = "travel-technology";
            else if (cat.includes("commerce") || cat.includes("retail")) mappedCompanyType = "ecommerce";
            else if (cat.includes("saas") || cat.includes("cloud")) mappedCompanyType = "saas";
            else if (cat.includes("crm") || cat.includes("erp")) mappedCompanyType = "erp-crm";
            else if (cat.includes("logistic") || cat.includes("supply")) mappedCompanyType = "logistics";

            const msg = `[Assessment / Quote: ${paramRef || parsed.executionId || "QAQ-LIVE"}]\nTarget Application: ${parsed.url || `https://${parsed.host}`}\nContext: ${parsed.contextName || parsed.host} (${parsed.category || "Web App"})\nVerified Scope: ${parsed.totalScenarios || 4} Scenarios, ${parsed.totalAssertions || 14} Assertions (${parsed.healthScore || 98}% Quality Score)\nEvidence Dossier ID: ${parsed.executionId || "qaq-live"}`;

            setValues((prev) => ({
              ...prev,
              name: prev.name || parsed.name || "",
              email: prev.email || parsed.email || "",
              phone: prev.phone || parsed.phone || "",
              applicationUrl: parsed.url || (parsed.host ? `https://${parsed.host}` : ""),
              company: parsed.company || parsed.host || "",
              companyType: mappedCompanyType,
              testingRequirement: "playwright-automation",
              message: msg,
            }));

            if (parsed.company || parsed.host) {
              setAutoFilledBanner(`${parsed.company || parsed.host} (${parsed.url || parsed.host})`);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load saved assessment context", err);
      }
    }
  }, [searchParams, interest, paramUrl, paramCompany, paramName, paramEmail, paramPhone, paramRequirement, paramCategory, paramScope, paramEvidenceId, paramScore, paramRef, paramTier]);

  const handleClearAutoFill = () => {
    setValues(initialValues);
    setAutoFilledBanner(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("qaquad_assessment_context");
      sessionStorage.removeItem("qaquad_assessment_context");
    }
  };

  function handleFirstInteraction() {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent("contact_form_start");
  }

  function updateField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const result = contactFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstInvalidField = Object.keys(fieldErrors)[0];
      if (firstInvalidField) {
        document.getElementById(firstInvalidField)?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

      if (!response.ok || !payload?.ok) {
        setStatus("error");
        setServerError(payload?.message || "Something went wrong. Please try again in a moment.");
        return;
      }

      setStatus("success");
      trackEvent("contact_form_submit", { companyType: values.companyType });
      setValues(initialValues);
    } catch {
      setStatus("error");
      setServerError("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  return (
    <div className="space-y-5">
      {/* Top Interactive Mode Switcher */}
      <div className="p-1.5 bg-slate-100 rounded-2xl flex items-center gap-1 border border-slate-200 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab("meeting")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "meeting"
              ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <Calendar size={15} className={activeTab === "meeting" ? "text-cyan-600" : "text-slate-500"} />
          <span>📅 Schedule Online Discovery Meeting</span>
          {paramRef && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 text-[10px] font-mono font-bold">
              {paramRef}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("assessment")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "assessment"
              ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-200"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <FileText size={15} className={activeTab === "assessment" ? "text-cyan-600" : "text-slate-500"} />
          <span>📝 Quick Assessment Form</span>
        </button>
      </div>

      {activeTab === "meeting" ? (
        <MeetingScheduler />
      ) : status === "success" ? (
        <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-emerald-900">Thank you.</h3>
          <p className="mt-2 text-emerald-700">We will review your requirement and contact you shortly.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-semibold text-cyan-600 hover:text-cyan-700 underline"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} onChangeCapture={handleFirstInteraction} className="space-y-6">
          {autoFilledBanner && (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-950 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-cyan-100 text-cyan-800 shrink-0">
                  <Sparkles size={16} />
                </span>
                <div>
                  <span className="font-bold text-cyan-900">Auto-filled from AI Sandbox:</span>
                  <span className="text-slate-700 ml-1.5">Loaded application details &amp; test dossier for <strong>{autoFilledBanner}</strong>.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearAutoFill}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-800 hover:text-cyan-950 hover:underline ml-3 shrink-0"
                title="Reset form and clear prefilled data"
              >
                <RotateCcw size={12} />
                <span>Clear</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputClass(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>

        <Field label="Company" htmlFor="company" error={errors.company} required>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => updateField("company", e.target.value)}
            className={inputClass(!!errors.company)}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Business email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone} hint="optional">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      <Field label="Application URL" htmlFor="applicationUrl" error={errors.applicationUrl} hint="optional, test or staging URL">
        <input
          id="applicationUrl"
          name="applicationUrl"
          type="url"
          placeholder="https://app.example.com"
          value={values.applicationUrl}
          onChange={(e) => updateField("applicationUrl", e.target.value)}
          className={inputClass(!!errors.applicationUrl)}
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field label="Company type" htmlFor="companyType" error={errors.companyType} required>
          <select
            id="companyType"
            name="companyType"
            value={values.companyType}
            onChange={(e) => updateField("companyType", e.target.value as ContactFormValues["companyType"])}
            className={inputClass(!!errors.companyType)}
          >
            {companyTypeOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-white text-slate-900">
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Testing requirement" htmlFor="testingRequirement" error={errors.testingRequirement} required>
          <select
            id="testingRequirement"
            name="testingRequirement"
            value={values.testingRequirement}
            onChange={(e) => updateField("testingRequirement", e.target.value as ContactFormValues["testingRequirement"])}
            className={inputClass(!!errors.testingRequirement)}
          >
            {testingRequirementOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-white text-slate-900">
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Current QA method" htmlFor="currentQaMethod" error={errors.currentQaMethod} required>
          <select
            id="currentQaMethod"
            name="currentQaMethod"
            value={values.currentQaMethod}
            onChange={(e) => updateField("currentQaMethod", e.target.value as ContactFormValues["currentQaMethod"])}
            className={inputClass(!!errors.currentQaMethod)}
          >
            {currentQaMethodOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-white text-slate-900">
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Is this a migration project?" htmlFor="isMigrationProject" error={errors.isMigrationProject} required>
        <select
          id="isMigrationProject"
          name="isMigrationProject"
          value={values.isMigrationProject}
          onChange={(e) => updateField("isMigrationProject", e.target.value as ContactFormValues["isMigrationProject"])}
          className={inputClass(!!errors.isMigrationProject)}
        >
          {migrationProjectOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-white text-slate-900">
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="Tell us a little about your application, tech stack, and what you're trying to solve..."
          className={inputClass(!!errors.message)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      {/* Honeypot field */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => updateField("website", e.target.value)}
        />
      </div>

      {serverError ? (
        <div role="alert" className="rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200">
          {serverError}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : "Request Free QA Assessment"}
        </button>
        <p className="text-xs text-slate-500">
          No credit card required. We treat your application access and data under strict confidentiality.
        </p>
      </div>
    </form>
  )}
</div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-900">
        {label}
        {required ? <span className="text-rose-400"> *</span> : null}
        {hint ? <span className="ml-1 text-xs font-normal text-slate-400">({hint})</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-sm text-rose-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return clsx(
    "block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400",
    "focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500",
    hasError ? "border-rose-500" : "border-slate-300",
  );
}
