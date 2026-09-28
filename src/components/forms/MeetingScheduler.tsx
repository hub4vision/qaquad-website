"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Sparkles,
  Send,
  Building2,
  Mail,
  User,
  Phone,
  Globe,
  FileText,
  Copy,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  AlertCircle
} from "lucide-react";

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
  "08:00 PM"
];

const TIMEZONES = [
  { label: "India Standard Time (IST) - GMT+5:30", value: "IST (GMT+5:30)" },
  { label: "US Eastern Time (EST) - New York", value: "EST (GMT-5)" },
  { label: "US Pacific Time (PST) - San Francisco", value: "PST (GMT-8)" },
  { label: "Greenwich Mean Time (GMT) - London", value: "GMT (GMT+0)" },
  { label: "Central European Time (CET) - Berlin", value: "CET (GMT+1)" },
  { label: "Singapore / Hong Kong Time (SGT)", value: "SGT (GMT+8)" },
  { label: "Australian Eastern Time (AEST) - Sydney", value: "AEST (GMT+10)" },
];

const PLATFORMS = [
  { id: "Google Meet", name: "Google Meet", icon: "🟢", desc: "Instant HD video room link" },
  { id: "Zoom", name: "Zoom Meeting", icon: "🔵", desc: "Direct Zoom link & passkey" },
  { id: "Microsoft Teams", name: "Microsoft Teams", icon: "🟣", desc: "Enterprise Teams conference" },
];

export function MeetingScheduler() {
  const searchParams = useSearchParams();
  const paramRef = searchParams?.get("ref") || "";
  const paramCompany = searchParams?.get("company") || "";
  const paramUrl = searchParams?.get("url") || searchParams?.get("applicationUrl") || "";
  const paramName = searchParams?.get("name") || searchParams?.get("clientName") || "";
  const paramEmail = searchParams?.get("email") || searchParams?.get("clientEmail") || "";
  const paramPhone = searchParams?.get("phone") || searchParams?.get("whatsapp") || "";
  const paramTier = searchParams?.get("tier") || "";

  // Calculate default date (tomorrow or next business day)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split("T")[0] || "";

  const [formData, setFormData] = useState({
    clientName: paramName,
    clientEmail: paramEmail,
    company: paramCompany,
    phone: paramPhone,
    targetUrl: paramUrl,
    quoteRefId: paramRef,
    meetingDate: defaultDateStr,
    meetingTime: "11:30 AM",
    timezone: "IST (GMT+5:30)",
    duration: "30 mins",
    platform: "Google Meet",
    agenda: "Customized AI QA Automation Blueprint, Self-Healing Locators Demo & Commercial Quotation Finalization",
    customMessage: "As per your interest and application challenges, QAQuad has synthesized a tailored QA solution. Please accept this meeting invitation to review the blueprint.",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [meetingResult, setMeetingResult] = useState<{
    meetingId: string;
    joinUrl: string;
    googleCalendarUrl: string;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-populate from URL search params (e.g. from email link) or session storage
  useEffect(() => {
    // 1. If params exist in URL, populate dynamically
    if (paramName || paramEmail || paramCompany || paramPhone || paramUrl || paramRef) {
      setFormData((prev) => ({
        ...prev,
        clientName: paramName || prev.clientName,
        clientEmail: paramEmail || prev.clientEmail,
        company: paramCompany || prev.company,
        phone: paramPhone || prev.phone,
        targetUrl: paramUrl || prev.targetUrl,
        quoteRefId: paramRef || prev.quoteRefId,
      }));
      return;
    }

    // 2. Check browser storage if client navigated from sandbox
    try {
      const stored = localStorage.getItem("qaquad_assessment_context") || sessionStorage.getItem("qaquad_assessment_context");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          setFormData((prev) => ({
            ...prev,
            company: prev.company || parsed.company || (parsed.host ? parsed.host.replace(/\.[^/.]+$/, "").toUpperCase() : ""),
            targetUrl: prev.targetUrl || parsed.url || (parsed.host ? `https://${parsed.host}` : ""),
            clientName: prev.clientName || parsed.name || "",
            clientEmail: prev.clientEmail || parsed.email || "",
            phone: prev.phone || parsed.phone || "",
            quoteRefId: prev.quoteRefId || parsed.executionId || "",
          }));
        }
      }
    } catch {
      // ignore
    }
  }, [paramRef, paramCompany, paramUrl, paramName, paramEmail, paramPhone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientEmail || !formData.meetingDate || !formData.meetingTime) {
      setErrorMessage("Please ensure client email, meeting date, and time are filled.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/schedule-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setMeetingResult({
          meetingId: data.meetingId,
          joinUrl: data.joinUrl,
          googleCalendarUrl: data.googleCalendarUrl,
        });
        setStatus("success");
      } else {
        setErrorMessage(data.message || "Failed to schedule meeting.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMessage("Network error occurred while booking the meeting.");
      setStatus("error");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (status === "success" && meetingResult) {
    return (
      <div className="space-y-6 text-slate-800 animate-in fade-in duration-300">
        <div className="text-center space-y-2 py-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Meeting Confirmed &amp; Dispatched!</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            A formal calendar invitation and Google Meet details have been sent to{" "}
            <strong className="text-cyan-700 font-bold">{formData.clientEmail}</strong> and our Principal QA Lead.
          </p>
        </div>

        {/* Meeting Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-inner">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-2">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Session</span>
              <h3 className="font-bold text-slate-900 text-base">QA Discovery &amp; Solution Blueprint Walkthrough</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {formData.platform} • {formData.duration}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div>
              <span className="text-slate-500 font-semibold block">Date &amp; Time:</span>
              <strong className="text-slate-900 text-sm">{formData.meetingDate} @ {formData.meetingTime}</strong>
              <div className="text-slate-500 text-[11px]">{formData.timezone}</div>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Client / Scope:</span>
              <strong className="text-slate-900 text-sm">{formData.clientName} {formData.company ? `(${formData.company})` : ""}</strong>
              {formData.quoteRefId && (
                <div className="text-cyan-700 font-mono text-[11px] font-bold">Ref: {formData.quoteRefId}</div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Direct Video Room URL:</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={meetingResult.joinUrl}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono text-cyan-700 font-bold"
              />
              <button
                type="button"
                onClick={() => handleCopy(meetingResult.joinUrl)}
                className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
              >
                {copiedLink ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copiedLink ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={meetingResult.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Video size={16} />
            <span>Open Video Room</span>
            <ExternalLink size={12} />
          </a>
          <a
            href={meetingResult.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Calendar size={16} />
            <span>Add to Google Calendar</span>
            <ExternalLink size={12} />
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
          >
            Schedule Another Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
      {/* Scope Banner: Only display when scope context or quotation reference exists */}
      {(formData.company || formData.quoteRefId) && (
        <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-600 text-white shadow-sm">
              <Sparkles size={14} />
            </span>
            <div>
              <span className="font-bold text-cyan-950">Active Scope Context: </span>
              <strong className="text-cyan-800 font-extrabold">{formData.company || "Custom QA Scope"}</strong>
              {formData.quoteRefId && (
                <span className="text-slate-500 font-mono text-[11px] ml-1.5">({formData.quoteRefId})</span>
              )}
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Tailored Solution Ready
          </span>
        </div>
      )}

      {/* Participant Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <User size={13} className="text-cyan-600" />
            <span>Client Full Name</span> <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            placeholder="e.g. John Doe"
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Mail size={13} className="text-cyan-600" />
            <span>Client Email (Invite Recipient)</span> <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
            placeholder="e.g. client@company.com"
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Building2 size={13} className="text-cyan-600" />
            <span>Company / Organization</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Acme Corp"
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Phone size={13} className="text-cyan-600" />
            <span>Phone / WhatsApp (Optional)</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +1 (555) 000-0000"
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
          />
        </div>
      </div>

      {/* Date & Time Grid */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Calendar size={14} className="text-cyan-600" />
          <span>Select Meeting Schedule &amp; Format:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Meeting Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.meetingDate}
              onChange={(e) => setFormData({ ...formData, meetingDate: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Time Slot <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.meetingTime}
              onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
            >
              <option value="15 mins">⚡ 15 Mins (Quick Audit)</option>
              <option value="30 mins">🚀 30 Mins (Standard Walkthrough)</option>
              <option value="45 mins">🛡️ 45 Mins (Architecture Deep Dive)</option>
            </select>
          </div>
        </div>

        {/* Timezone & Platform */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
              <Globe size={12} className="text-cyan-600" />
              <span>Timezone</span>
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
              <Video size={12} className="text-cyan-600" />
              <span>Video Platform</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, platform: p.id })}
                  className={`px-2 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                    formData.platform === p.id
                      ? "bg-cyan-600 text-white border-cyan-600 shadow-sm ring-2 ring-cyan-500/20"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <span className="mr-1">{p.icon}</span>
                  <span>{p.id.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agenda & Custom Message */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText size={14} className="text-cyan-600" />
              <span>Session Agenda &amp; Focus Topics</span> <span className="text-rose-500">*</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Included in calendar invitation</span>
          </label>
          <textarea
            rows={4}
            value={formData.agenda}
            onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
            placeholder="e.g. 1. AI QA Automation Blueprint Overview&#10;2. Self-Healing Locators & Multi-Layer Coverage Demo&#10;3. CI/CD Pipeline Integration & Timeline"
            className="w-full min-h-[110px] p-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-y shadow-sm leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-cyan-600" />
              <span>Personalized Note to Client (e.g. Solution pitch)</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Personalized message</span>
          </label>
          <textarea
            rows={4}
            value={formData.customMessage}
            onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
            placeholder="e.g. As per your interest and application challenges, QAQuad has synthesized a tailored QA solution. Please accept this meeting invitation to review the blueprint."
            className="w-full min-h-[110px] p-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-y shadow-sm leading-relaxed"
          />
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle size={15} className="text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200">
        <span className="text-xs text-slate-500 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Auto-generates Google Meet link &amp; Calendar .ics file</span>
        </span>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === "submitting" ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              <span>Scheduling &amp; Dispatching Invites...</span>
            </>
          ) : (
            <>
              <Send size={14} />
              <span>Confirm &amp; Send Meeting Invite</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
