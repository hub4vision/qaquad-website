import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientEmail,
      company,
      phone,
      meetingDate, // YYYY-MM-DD
      meetingTime, // HH:MM or 10:00 AM
      timezone = "Asia/Kolkata (IST)",
      duration = "30 mins",
      platform = "Google Meet",
      agenda = "AI QA Automation Solution & Live Prototype Walkthrough",
      quoteRefId = "",
      targetUrl = "",
      customMessage = "",
      scheduledBy = "QAQuad Admin",
    } = body;

    if (!clientEmail || !meetingDate || !meetingTime) {
      return NextResponse.json(
        { ok: false, message: "Client email, meeting date, and time are required." },
        { status: 400 }
      );
    }

    const meetingId = `QAQ-MEET-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const meetCode = `qaq-${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}`;
    const joinUrl = platform.toLowerCase().includes("zoom")
      ? `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`
      : platform.toLowerCase().includes("team")
      ? `https://teams.microsoft.com/l/meetup-join/qaquad-${meetCode}`
      : `https://meet.google.com/${meetCode}`;

    // Compute Date Range for Calendar
    const formattedDateString = `${meetingDate} ${meetingTime}`;
    const startDateTime = new Date(`${meetingDate}T${meetingTime.includes(":") && meetingTime.length === 5 ? meetingTime : "10:00"}:00`);
    const validStart = isNaN(startDateTime.getTime()) ? new Date(Date.now() + 24 * 60 * 60 * 1000) : startDateTime;
    const durationMinutes = duration.includes("15") ? 15 : duration.includes("45") ? 45 : duration.includes("60") ? 60 : 30;
    const endDateTime = new Date(validStart.getTime() + durationMinutes * 60 * 1000);

    const formatIcsDate = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const dtStartIcs = formatIcsDate(validStart);
    const dtEndIcs = formatIcsDate(endDateTime);
    const dtStampIcs = formatIcsDate(new Date());

    const eventTitle = `QAQuad Discovery Call: AI QA Automation Strategy — ${company || "Client"}`;
    const eventDescription = `Meeting Agenda: ${agenda}\\n\\nClient: ${clientName} (${company || "N/A"})\\nQuote Ref: ${quoteRefId}\\nTarget: ${targetUrl}\\nMeeting Link: ${joinUrl}\\n\\nAs per your application interest and testing requirement, QAQuad has tailored an automated testing solution. We look forward to meeting you!`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//QAQuad//Discovery Call Scheduler//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:${meetingId}@qaquad.com`,
      `DTSTAMP:${dtStampIcs}`,
      `DTSTART:${dtStartIcs}`,
      `DTEND:${dtEndIcs}`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription}`,
      `LOCATION:${joinUrl}`,
      `ORGANIZER;CN="QAQuad Principal QA Lead":mailto:info@QAQuad.com`,
      `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="${clientName || "Client"}":mailto:${clientEmail}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: QAQuad Discovery Meeting starts in 15 minutes",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    // Google Calendar Direct Add Link
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&dates=${dtStartIcs}/${dtEndIcs}&details=${encodeURIComponent(
      `Meeting Link: ${joinUrl}\nAgenda: ${agenda}\nQuote Ref: ${quoteRefId}\nTarget URL: ${targetUrl}\nContact: info@QAQuad.com`
    )}&location=${encodeURIComponent(joinUrl)}`;

    // Hostinger SMTP Setup
    const host = process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER || "info@QAQuad.com";
    const pass = process.env.SMTP_PASS || "Lz5>fvir";
    const from = process.env.LEAD_NOTIFICATION_FROM_EMAIL || user;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const emailHtmlClient = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b;">
        <div style="border-bottom: 2px solid #0284c7; padding-bottom: 18px; margin-bottom: 22px;">
          <h2 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800;">📅 Online Discovery Meeting Scheduled</h2>
          <p style="color: #0284c7; margin: 4px 0 0 0; font-size: 13px; font-weight: 600;">QAQuad AI QA Automation & Scope Alignment</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          Dear <strong>${clientName || "Valued Client"}</strong>,
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
          As per your application interest and requirement for <strong>${company || "your application"}</strong>, our engineering team has synthesized a tailored QA automation roadmap. We have confirmed our online technical discovery session with you.
        </p>

        <div style="margin: 22px 0; padding: 20px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 14px;">
          <h3 style="margin: 0 0 14px 0; color: #0369a1; font-size: 16px; font-weight: 700;">Meeting Invitation Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="border-bottom: 1px solid #e0f2fe;">
              <td style="padding: 8px 0; color: #0369a1; font-weight: 600; width: 160px;">Date:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700; font-size: 14px;">${meetingDate}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f2fe;">
              <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">Time & Timezone:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700; font-size: 14px;">${meetingTime} (${timezone})</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f2fe;">
              <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">Duration:</td>
              <td style="padding: 8px 0; color: #0f172a;">${duration}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f2fe;">
              <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">Meeting Platform:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${platform}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f2fe;">
              <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">Join Meeting URL:</td>
              <td style="padding: 8px 0;"><a href="${joinUrl}" style="color: #0284c7; font-weight: 700; text-decoration: underline;">${joinUrl}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e0f2fe;">
              <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">Quote Reference:</td>
              <td style="padding: 8px 0; color: #0284c7; font-family: monospace; font-weight: 700;">${quoteRefId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #0369a1; font-weight: 600;">Meeting ID:</td>
              <td style="padding: 8px 0; color: #64748b; font-family: monospace;">${meetingId}</td>
            </tr>
          </table>
        </div>

        <div style="margin: 20px 0; padding: 16px; background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 8px;">
          <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 14px; font-weight: 700;">Session Agenda & Deliverables:</h4>
          <p style="margin: 0; color: #334155; font-size: 13px; line-height: 1.5; white-space: pre-wrap;">${agenda}</p>
          ${customMessage ? `<p style="margin: 8px 0 0 0; color: #475569; font-size: 12px; font-style: italic;">Note: ${customMessage}</p>` : ""}
        </div>

        <div style="margin: 26px 0 20px 0; text-align: center; display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
          <a href="${joinUrl}" style="display: inline-block; padding: 12px 26px; background: #0284c7; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 10px; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
            🚀 Join Video Meeting
          </a>
          <a href="${gCalUrl}" target="_blank" style="display: inline-block; padding: 12px 22px; background: #059669; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 10px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
            📅 Add to Google Calendar
          </a>
        </div>

        <p style="font-size: 13px; line-height: 1.5; color: #64748b; text-align: center;">
          (A calendar invitation file <code>invite.ics</code> is attached to this email. Opening it will automatically add the meeting to Apple Calendar, Outlook, or Google Calendar.)
        </p>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
          <p style="margin: 0 0 4px 0;">QAQuad Inc. • Autonomous AI QA Automation</p>
          <p style="margin: 0;">Lead Specialist: <a href="mailto:info@QAQuad.com" style="color: #0284c7;">info@QAQuad.com</a> • Website: <a href="https://qaquad.com" style="color: #0284c7;">qaquad.com</a></p>
        </div>
      </div>
    `;

    // Send email with ICS calendar attachment
    await transporter.sendMail({
      from: `"QAQuad Discovery Session" <${from}>`,
      to: clientEmail,
      cc: "info@QAQuad.com",
      replyTo: "info@QAQuad.com",
      subject: `Confirmed: QAQuad Technical Discovery Session — ${company || "Client"} (${meetingDate} @ ${meetingTime})`,
      html: emailHtmlClient,
      icalEvent: {
        filename: "invite.ics",
        method: "REQUEST",
        content: icsContent,
      },
      attachments: [
        {
          filename: "meeting-invite.ics",
          content: icsContent,
          contentType: "text/calendar; charset=utf-8; method=REQUEST",
        },
      ],
    });

    return NextResponse.json({
      ok: true,
      message: "Meeting scheduled successfully. Calendar invitation sent to client and admin.",
      meetingId,
      joinUrl,
      googleCalendarUrl: gCalUrl,
      meetingDetails: {
        clientName,
        clientEmail,
        company,
        meetingDate,
        meetingTime,
        timezone,
        duration,
        platform,
        agenda,
        quoteRefId,
      },
    });
  } catch (error) {
    console.error("[schedule-meeting] Error:", error);
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Failed to schedule meeting." },
      { status: 500 }
    );
  }
}
