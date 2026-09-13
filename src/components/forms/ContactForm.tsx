"use client";

import { useRef, useState } from "react";
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

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  applicationUrl: "",
  companyType: "software-company",
  testingRequirement: "not-sure",
  currentQaMethod: "manual",
  isMigrationProject: "not-sure",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

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

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-8 text-center backdrop-blur-md">
        <h3 className="text-xl font-semibold text-white">Thank you.</h3>
        <p className="mt-2 text-slate-300">We will review your requirement and contact you shortly.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} onChangeCapture={handleFirstInteraction} className="space-y-6">
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
              <option key={option.value} value={option.value} className="bg-slate-900 text-white">
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
              <option key={option.value} value={option.value} className="bg-slate-900 text-white">
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
              <option key={option.value} value={option.value} className="bg-slate-900 text-white">
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
            <option key={option.value} value={option.value} className="bg-slate-900 text-white">
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
        <p className="text-xs text-slate-400">
          No credit card required. We treat your application access and data under strict confidentiality.
        </p>
      </div>
    </form>
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
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-200">
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
    "block w-full rounded-xl border bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 backdrop-blur-sm",
    "focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400",
    hasError ? "border-rose-500" : "border-slate-700",
  );
}
