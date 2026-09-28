import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Secure server-side contact form handler.
 *
 * - Re-validates everything with the same zod schema the client uses (never
 *   trusts client-side validation alone).
 * - Rejects honeypot hits and rate-limited IPs before doing any real work.
 * - Never echoes secrets or full lead PII back to the client, and never logs
 *   secrets (there are none to log here — no API keys touch this file's
 *   response path).
 * - Notification delivery is pluggable and fails soft: if no email/webhook
 *   provider is configured (see .env.example), the lead is still logged
 *   server-side and the visitor still gets a normal success response, so the
 *   form never appears broken. Wire up RESEND_API_KEY or LEAD_WEBHOOK_URL
 *   before real launch — see PROJECT_STATUS.md.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form for errors.", issues: result.error.flatten() },
      { status: 422 },
    );
  }

  // Honeypot: a filled "website" field means this was almost certainly
  // submitted by a bot, not a human. Respond with a generic success so the
  // bot doesn't learn its submission was detected, but never deliver or
  // store it as a real lead.
  if (result.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website: _honeypot, ...validatedFields } = result.data;
  const leadForDelivery: LeadForDelivery = {
    ...validatedFields,
    submittedAt: new Date().toISOString(),
    ip,
  };

  try {
    await deliverLead(leadForDelivery);
  } catch (error) {
    // Delivery failing (e.g. a misconfigured provider) should not surface a
    // scary error to the visitor, but it must be visible in server logs so
    // the business doesn't silently lose leads.
    console.error("[contact] lead delivery failed:", error instanceof Error ? error.message : error);
  }

  return NextResponse.json({ ok: true });
}

type LeadForDelivery = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  applicationUrl?: string;
  companyType: string;
  testingRequirement: string;
  currentQaMethod: string;
  isMigrationProject: string;
  message: string;
  submittedAt: string;
  ip: string;
};

async function deliverLead(lead: LeadForDelivery) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const resendApiKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  // 1. Prioritize direct Hostinger SMTP if configured
  if (smtpHost && smtpUser && smtpPass) {
    await sendViaSmtp(lead);
    return;
  }

  // 2. Resend API
  if (resendApiKey) {
    await sendViaResend(lead, resendApiKey);
    return;
  }

  // 3. Webhook
  if (webhookUrl) {
    await sendViaWebhook(lead, webhookUrl);
    return;
  }

  // No provider configured — log server-side only
  console.log("[contact] New lead (no delivery provider configured):", {
    ...lead,
    email: redactEmail(lead.email),
  });
}

async function sendViaSmtp(lead: LeadForDelivery) {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "info@QAQuad.com";
  const pass = process.env.SMTP_PASS || "Lz5>fvir";
  const from = process.env.LEAD_NOTIFICATION_FROM_EMAIL || user;
  const to = process.env.LEAD_NOTIFICATION_TO_EMAIL || "info@QAQuad.com";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const formattedText = formatLeadAsText(lead);

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #0f172a; margin: 0; font-size: 22px;">New QA Assessment / Quotation Request</h2>
        <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Submitted via QAQuad.com</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 160px; font-weight: 600;">Name:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company:</td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(lead.company)}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; color: #0284c7;"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
        ${lead.phone ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(lead.phone)}</td></tr>` : ""}
        ${lead.applicationUrl ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Application URL:</td><td style="padding: 8px 0; color: #0f172a;"><a href="${escapeHtml(lead.applicationUrl)}">${escapeHtml(lead.applicationUrl)}</a></td></tr>` : ""}
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company Type:</td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(lead.companyType)}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Testing Requirement:</td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(lead.testingRequirement)}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Current QA Method:</td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(lead.currentQaMethod || "Automated & AI Engine")}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Migration Project:</td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(lead.isMigrationProject || "No")}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Submitted:</td><td style="padding: 8px 0; color: #64748b;">${escapeHtml(lead.submittedAt)}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #0284c7;">
        <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 14px;">Scope / Message:</h4>
        <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(lead.message)}</p>
      </div>

      <div style="margin: 22px 0 10px 0; text-align: center;">
        <a href="https://qaquad.com/contact?tab=meeting&ref=QAQ-QU0-14249&company=${encodeURIComponent(lead.company)}&email=${encodeURIComponent(lead.email)}&name=${encodeURIComponent(lead.name)}&phone=${encodeURIComponent(lead.phone || '')}&url=${encodeURIComponent(lead.applicationUrl || '')}" style="display: inline-block; padding: 12px 26px; background: #0284c7; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 10px; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
          📅 Schedule Online Discovery Meeting with Client
        </a>
      </div>
    </div>
  `;

  // 1. Send admin notification
  await transporter.sendMail({
    from: `"QAQuad Inquiries" <${from}>`,
    to,
    replyTo: lead.email,
    subject: `New QA Assessment / Quote Request — ${lead.company} (${lead.name})`,
    text: formattedText,
    html: htmlContent,
  });

  // 2. Automatically send confirmation & quotation summary directly to the client's email
  if (lead.email && lead.email.includes("@")) {
    try {
      const clientHtmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
          <div style="border-bottom: 2px solid #0284c7; padding-bottom: 18px; margin-bottom: 22px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800;">QAQuad Quotation & Assessment Confirmation</h2>
            <p style="color: #0284c7; margin: 4px 0 0 0; font-size: 13px; font-weight: 600;">Autonomous AI QA Automation & Continuous Reliability</p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Dear <strong>${escapeHtml(lead.name)}</strong>,
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Thank you for reaching out to <strong>QAQuad</strong>. We have received your QA automation details and our Principal QA Automation Lead has been assigned to your scope.
          </p>

          <div style="margin: 18px 0; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px; font-weight: 700;">Submission Summary:</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr><td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 160px;">Organization:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${escapeHtml(lead.company)}</td></tr>
              ${lead.applicationUrl ? `<tr><td style="padding: 6px 0; color: #64748b; font-weight: 600;">Target Application:</td><td style="padding: 6px 0; color: #0284c7;"><a href="${escapeHtml(lead.applicationUrl)}">${escapeHtml(lead.applicationUrl)}</a></td></tr>` : ""}
              <tr><td style="padding: 6px 0; color: #64748b; font-weight: 600;">Testing Type:</td><td style="padding: 6px 0; color: #0f172a;">${escapeHtml(lead.testingRequirement)}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b; font-weight: 600;">Estimated Turnaround:</td><td style="padding: 6px 0; color: #059669; font-weight: 700;">Within 2 Business Hours</td></tr>
            </table>
          </div>

          <div style="margin: 18px 0; padding: 14px; background: #ecfdf5; border-left: 4px solid #059669; border-radius: 8px;">
            <h4 style="margin: 0 0 4px 0; color: #065f46; font-size: 13px;">Scope & Notes:</h4>
            <p style="margin: 0; color: #047857; font-size: 12px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(lead.message)}</p>
          </div>

          <div style="margin: 22px 0 14px 0; text-align: center;">
            <a href="https://qaquad.com/contact?tab=meeting&ref=QAQ-QU0-14249&company=${encodeURIComponent(lead.company)}&email=${encodeURIComponent(lead.email)}&name=${encodeURIComponent(lead.name)}&phone=${encodeURIComponent(lead.phone || '')}&url=${encodeURIComponent(lead.applicationUrl || '')}" style="display: inline-block; padding: 12px 28px; background: #0284c7; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 10px; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
              📅 Schedule QA Discovery Call Online
            </a>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #334155;">
            If you need to schedule an immediate technical discovery call with our team, feel free to click above, reply directly to this email, or visit our website.
          </p>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
            <p style="margin: 0 0 2px 0;">QAQuad Inc. • Autonomous AI QA Automation</p>
            <p style="margin: 0;">Email: <a href="mailto:info@QAQuad.com" style="color: #0284c7;">info@QAQuad.com</a> • Website: <a href="https://qaquad.com" style="color: #0284c7;">qaquad.com</a></p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"QAQuad Enterprise QA" <${from}>`,
        to: lead.email,
        replyTo: "info@QAQuad.com",
        subject: `QAQuad Quotation & QA Assessment Scope Confirmation — ${lead.company}`,
        text: `Dear ${lead.name},\n\nThank you for reaching out to QAQuad. We have received your QA automation details for ${lead.company}.\n\nScope Summary:\n${lead.message}\n\nOur team will be in touch within 2 business hours.\n\nBest regards,\nQAQuad Team\ninfo@QAQuad.com`,
        html: clientHtmlContent,
      });
    } catch (clientMailErr) {
      console.error("[contact] Failed to send client auto-confirmation email:", clientMailErr);
    }
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendViaResend(lead: LeadForDelivery, apiKey: string) {
  const to = process.env.LEAD_NOTIFICATION_TO_EMAIL;
  const from = process.env.LEAD_NOTIFICATION_FROM_EMAIL;
  if (!to || !from) {
    throw new Error("RESEND_API_KEY is set but LEAD_NOTIFICATION_TO_EMAIL / LEAD_NOTIFICATION_FROM_EMAIL is missing.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email,
      subject: `New QA assessment request — ${lead.company}`,
      text: formatLeadAsText(lead),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API responded with ${response.status}`);
  }
}

async function sendViaWebhook(lead: LeadForDelivery, webhookUrl: string) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: formatLeadAsText(lead), lead }),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook responded with ${response.status}`);
  }
}

function formatLeadAsText(lead: LeadForDelivery) {
  return [
    `Name: ${lead.name}`,
    `Company: ${lead.company}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.applicationUrl ? `Application URL: ${lead.applicationUrl}` : null,
    `Company type: ${lead.companyType}`,
    `Testing requirement: ${lead.testingRequirement}`,
    `Current QA method: ${lead.currentQaMethod}`,
    `Migration project: ${lead.isMigrationProject}`,
    `Submitted: ${lead.submittedAt}`,
    "",
    "Message:",
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");
}

function redactEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***";
  return `${local.slice(0, 2)}***@${domain}`;
}
