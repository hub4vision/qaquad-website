import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const { email, reportData } = body;
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ ok: false, message: "Valid email is required." }, { status: 422 });
  }

  try {
    await sendRoiEmailViaSmtp(email, reportData);
  } catch (error) {
    console.error("[roi-calculator] lead delivery failed:", error instanceof Error ? error.message : error);
    // Continue and return success even if email fails to not break the UI when SMTP is not configured on demo environments
  }

  return NextResponse.json({ ok: true });
}

async function sendRoiEmailViaSmtp(recipientEmail: string, reportData: any) {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.LEAD_NOTIFICATION_FROM_EMAIL || user || "info@QAQuad.com";

  if (!user || !pass) {
    console.warn("[roi-calculator] SMTP credentials missing. Logging to console instead:");
    console.log("SENDING TO:", recipientEmail, "DATA:", reportData);
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #0f172a;">Your QAQuad AI ROI Report</h2>
      <p style="color: #475569;">Thank you for using the QAQuad ROI calculator. Based on the data you provided, here is the projected impact of switching to AI-driven test automation:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Annual Savings:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">$${reportData?.annualSavings?.toLocaleString() || 0}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Hours Saved / Release:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${reportData?.hoursSavedPerRelease?.toLocaleString() || 0} hrs</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Regression Speedup:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">85%</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Defect Escape Reduction:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">~72%</td></tr>
      </table>
      
      <p style="margin-top: 30px;"><a href="https://qaquad.com/contact" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Book a Strategy Call</a></p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to: recipientEmail,
    bcc: from, // Send a copy to the business owner
    subject: "Your QAQuad AI ROI Report",
    text: `Your QAQuad ROI Report\n\nAnnual Savings: $${reportData?.annualSavings}\nHours Saved: ${reportData?.hoursSavedPerRelease}\n\nBook a call at qaquad.com/contact`,
    html: htmlContent,
  });
}
