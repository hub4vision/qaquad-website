"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  guidedSteps,
  generateRecommendation,
  quickReplies,
  fallbackResponses,
  type GuidedOption,
} from "@/lib/chatbot-config";
import { clsx } from "@/lib/clsx";
import { trackEvent } from "@/lib/analytics";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

type ChatMode = "guided" | "ai";
type GuidedPhase = "active" | "recommendation" | "lead-capture" | "complete";

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function renderMarkdownLinks(text: string): string {
  let html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="chatbot-link hover:text-cyan-400 underline">$1</a>'
  );
  return html;
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function GlobalChatbot() {
  // Widget state
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Guided flow state
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [guidedPhase, setGuidedPhase] = useState<GuidedPhase>("active");

  // AI Chat state
  const [mode, setMode] = useState<ChatMode>("guided");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! 👋 I'm QAQuad's AI assistant. Ask me anything about our QA services, testing capabilities, or how we can help your team ship faster with confidence.",
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Lead capture state
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen, mode]);

  // Handle outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // ─── Guided Flow Handlers ─────────────────────────────────────────────

  function handleGuidedSelect(option: GuidedOption) {
    const step = guidedSteps[currentStep];
    if (!step) return;
    const newAnswers = { ...answers, [step.id]: option.id };
    setAnswers(newAnswers);

    trackEvent("chatbot_guided_step", { step: step.id, choice: option.id });

    if (currentStep < guidedSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setGuidedPhase("recommendation");
    }
  }

  function handleRestartGuided() {
    setCurrentStep(0);
    setAnswers({});
    setGuidedPhase("active");
    setLeadSubmitted(false);
    setLeadName("");
    setLeadEmail("");
  }

  // ─── AI Chat Handlers ────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text.trim(),
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInputValue("");
      setIsTyping(true);

      trackEvent("chatbot_ai_message", { messageLength: text.length });

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = (await response.json()) as { ok: boolean; reply?: string; message?: string };

        const assistantMsg: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: data.reply || data.message || getFallbackResponse(text),
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        const errorMsg: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content:
            "I'm having trouble connecting right now. You can **[book a free QA assessment](/contact)** to speak with our team directly!",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, isTyping]
  );

  function getFallbackResponse(query: string): string {
    const lower = query.toLowerCase();
    if (lower.includes("service") || lower.includes("offer")) return fallbackResponses.services;
    if (lower.includes("price") || lower.includes("cost") || lower.includes("pricing")) return fallbackResponses.pricing;
    if (lower.includes("migrat")) return fallbackResponses.migration;
    if (lower.includes("industr") || lower.includes("domain")) return fallbackResponses.industries;
    if (lower.includes("when") || lower.includes("start") || lower.includes("timeline") || lower.includes("fast"))
      return fallbackResponses.timeline;
    return fallbackResponses.default;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  }

  // ─── Lead Capture Handler ─────────────────────────────────────────────

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!leadName.trim() || !leadEmail.trim()) return;

    setLeadSubmitting(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          company: "",
          phone: "",
          applicationUrl: "",
          companyType: "software-company",
          testingRequirement: answers["testing-type"] || "not-sure",
          currentQaMethod: answers["qa-setup"] === "no-qa" ? "none" : answers["qa-setup"] || "manual",
          isMigrationProject: answers["testing-type"] === "migration" ? "yes" : "not-sure",
          message: `[Chatbot Lead] Testing: ${answers["testing-type"] || "N/A"}, Setup: ${answers["qa-setup"] || "N/A"}, Industry: ${answers["industry"] || "N/A"}, Timeline: ${answers["timeline"] || "N/A"}`,
          website: "",
        }),
      });

      trackEvent("chatbot_lead_captured");
      setLeadSubmitted(true);
      setGuidedPhase("complete");
    } catch {
      // Silently handle
    } finally {
      setLeadSubmitting(false);
    }
  }

  // ─── Mode Switch Handler ──────────────────────────────────────────────

  function switchToAiChat() {
    setMode("ai");
    trackEvent("chatbot_switch_to_ai");
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function switchToGuided() {
    setMode("guided");
    handleRestartGuided();
    trackEvent("chatbot_switch_to_guided");
  }

  // ─── Render ───────────────────────────────────────────────────────────

  const recommendation = guidedPhase !== "active" ? generateRecommendation(answers) : null;

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            trackEvent("chatbot_opened");
          }}
          className="group fixed bottom-6 right-6 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/40 transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/60"
          aria-label="Open AI Chatbot"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow ring-2 ring-slate-900">
            1
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          className={clsx(
            "fixed z-[100] flex flex-col overflow-hidden border border-slate-700/60 bg-gradient-to-br from-slate-900/98 to-slate-800/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out",
            isMaximized
              ? "inset-0 m-0 rounded-none sm:inset-4 sm:rounded-2xl"
              : "bottom-6 right-6 w-[calc(100%-48px)] sm:w-[450px] rounded-2xl h-[min(calc(100vh-48px),650px)] origin-bottom-right"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700/60 bg-slate-900/80 px-4 py-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-md">
                  Q
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">QAQuad AI Advisor</h3>
                <p className="text-[10px] text-slate-400">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors hidden sm:block"
                aria-label={isMaximized ? "Minimize" : "Maximize"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMaximized ? (
                    <>
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                    </>
                  ) : (
                    <>
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </>
                  )}
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-pink-400 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="bg-slate-900/50 p-2 shrink-0">
            <div className="flex w-full items-center justify-center gap-1 rounded-full border border-slate-700/60 bg-slate-900 p-1">
              <button
                type="button"
                onClick={switchToGuided}
                className={clsx(
                  "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300",
                  mode === "guided"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white"
                )}
              >
                🎯 Guided Flow
              </button>
              <button
                type="button"
                onClick={switchToAiChat}
                className={clsx(
                  "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300",
                  mode === "ai"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/25"
                    : "text-slate-400 hover:text-white"
                )}
              >
                🤖 AI Chat
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {/* ─── Guided Flow Panel ─────────────────────────────────────────── */}
            {mode === "guided" && (
              <div className="p-4 sm:p-5 h-full flex flex-col min-h-0">
                {/* Progress Bar */}
                {guidedPhase === "active" && (
                  <div className="mb-5 shrink-0">
                    <div className="mb-1.5 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Step {currentStep + 1} of {guidedSteps.length}</span>
                      <span>{Math.round(((currentStep) / guidedSteps.length) * 100)}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep) / guidedSteps.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Active Question */}
                {guidedPhase === "active" && (
                  <div className="animate-fade-up flex-1 flex flex-col min-h-0 overflow-y-auto pr-1">
                    <h3 className="text-lg font-bold text-white leading-tight shrink-0">
                      {guidedSteps[currentStep].question}
                    </h3>
                    {guidedSteps[currentStep].subtext && (
                      <p className="mt-1 text-xs text-slate-400 shrink-0">
                        {guidedSteps[currentStep].subtext}
                      </p>
                    )}
                    <div className="mt-4 flex flex-col gap-2.5 flex-1 min-h-0 overflow-y-auto">
                      {guidedSteps[currentStep].options.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleGuidedSelect(option)}
                          className="group flex items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/50 p-3 text-left transition-all duration-200 hover:border-cyan-500/50 hover:bg-slate-700/50 shrink-0"
                        >
                          <span className="text-xl shrink-0" aria-hidden="true">{option.icon}</span>
                          <div className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                              {option.label}
                            </span>
                            {option.description && (
                              <span className="mt-0.5 block text-[10px] text-slate-400 line-clamp-2 leading-tight">
                                {option.description}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        className="mt-4 pt-2 border-t border-slate-700/30 text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 shrink-0"
                      >
                        <span>←</span> Back
                      </button>
                    )}
                  </div>
                )}

                {/* Recommendation */}
                {guidedPhase === "recommendation" && recommendation && (
                  <div className="animate-fade-up h-full flex flex-col">
                    <div className="mb-3 inline-block rounded-full bg-cyan-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400 self-start">
                      Recommendation
                    </div>
                    <h3 className="text-xl font-extrabold text-white">
                      {recommendation.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300 flex-1 overflow-y-auto pr-1">
                      {recommendation.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 shrink-0">
                      {recommendation.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-6 flex flex-col gap-2 shrink-0">
                      <a
                        href={recommendation.ctaHref}
                        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500"
                      >
                        {recommendation.ctaLabel} →
                      </a>
                      <button
                        type="button"
                        onClick={() => setGuidedPhase("lead-capture")}
                        className="flex w-full items-center justify-center rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-cyan-500/50 hover:text-white"
                      >
                        📧 Get Report via Email
                      </button>
                      <button
                        type="button"
                        onClick={handleRestartGuided}
                        className="mt-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors text-center"
                      >
                        ↻ Start Over
                      </button>
                    </div>
                  </div>
                )}

                {/* Lead Capture */}
                {guidedPhase === "lead-capture" && (
                  <div className="animate-fade-up h-full flex flex-col">
                    <h3 className="text-lg font-bold text-white shrink-0">
                      📧 Get Your Report
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 shrink-0">
                      We&#39;ll send you a detailed recommendation.
                    </p>
                    <form onSubmit={handleLeadSubmit} className="mt-4 flex flex-col gap-3 flex-1 overflow-y-auto">
                      <div>
                        <label htmlFor="chatbot-name" className="block text-xs font-medium text-slate-300 mb-1">
                          Your Name
                        </label>
                        <input
                          id="chatbot-name"
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="chatbot-email" className="block text-xs font-medium text-slate-300 mb-1">
                          Work Email
                        </label>
                        <input
                          id="chatbot-email"
                          type="email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="john@company.com"
                          className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className={clsx(
                          "mt-2 w-full rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all",
                          leadSubmitting
                            ? "cursor-not-allowed bg-slate-600"
                            : "bg-gradient-to-r from-purple-500 to-pink-600 shadow-purple-500/25 hover:from-purple-400 hover:to-pink-500"
                        )}
                      >
                        {leadSubmitting ? "Sending..." : "Send Recommendation"}
                      </button>
                    </form>
                    <button
                      type="button"
                      onClick={() => setGuidedPhase("recommendation")}
                      className="mt-auto pt-4 text-xs text-slate-400 hover:text-cyan-400 transition-colors text-center shrink-0"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                {/* Complete */}
                {guidedPhase === "complete" && leadSubmitted && (
                  <div className="animate-fade-up h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
                      ✅
                    </div>
                    <h3 className="text-xl font-extrabold text-white">All Set!</h3>
                    <p className="mt-2 text-xs text-slate-300 max-w-xs">
                      We&#39;ve received your requirements and will email your recommendation to{" "}
                      <strong className="text-cyan-400">{leadEmail}</strong>.
                    </p>
                    <div className="mt-8 flex flex-col w-full gap-2">
                      <a
                        href="/contact"
                        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500"
                      >
                        Book Assessment →
                      </a>
                      <button
                        type="button"
                        onClick={handleRestartGuided}
                        className="text-xs text-slate-400 hover:text-cyan-400 transition-colors p-2"
                      >
                        Start New Evaluation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─── AI Chat Panel ─────────────────────────────────────────────── */}
            {mode === "ai" && (
              <div className="flex flex-col h-full absolute inset-0">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto px-4 py-4" id="chat-messages">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={clsx(
                          "flex animate-fade-up",
                          msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={clsx(
                            "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed break-words",
                            msg.role === "user"
                              ? "rounded-br-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                              : "rounded-bl-sm border border-slate-700/60 bg-slate-800/70 text-slate-200"
                          )}
                          dangerouslySetInnerHTML={{
                            __html: renderMarkdownLinks(msg.content),
                          }}
                        />
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex animate-fade-up justify-start">
                        <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-slate-700/60 bg-slate-800/70 px-3.5 py-3">
                          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: "0ms" }} />
                          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: "150ms" }} />
                          <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>

                {/* Quick Replies */}
                {messages.length <= 2 && !isTyping && (
                  <div className="border-t border-slate-700/40 bg-slate-900/50 px-3 py-2 shrink-0 overflow-x-auto whitespace-nowrap hide-scrollbar">
                    <div className="flex gap-2">
                      {quickReplies.map((qr) => (
                        <button
                          key={qr}
                          type="button"
                          onClick={() => sendMessage(qr)}
                          className="inline-block rounded-full border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300 transition-all hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300 shrink-0"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t border-slate-700/60 bg-slate-900/80 p-3 shrink-0">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef as unknown as React.RefObject<HTMLTextAreaElement>}
                      id="chatbot-input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage(inputValue);
                        }
                      }}
                      placeholder="Ask about our QA services..."
                      disabled={isTyping}
                      rows={1}
                      className="flex-1 resize-none rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 disabled:opacity-50 min-h-[42px] max-h-[100px]"
                    />
                    <button
                      type="button"
                      onClick={() => sendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className={clsx(
                        "flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl transition-all",
                        inputValue.trim() && !isTyping
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl"
                          : "cursor-not-allowed bg-slate-800 text-slate-500"
                      )}
                      aria-label="Send message"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="-ml-0.5 mt-0.5"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[9px] text-slate-500">
                    AI generated responses • Not legally binding
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
