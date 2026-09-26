import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { GEMINI_SYSTEM_PROMPT } from "@/lib/chatbot-config";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * AI Chat API route — calls Gemini API with QAQuad system prompt.
 *
 * - Rate-limited per IP (reuses existing rate-limit utility).
 * - Gracefully degrades if GEMINI_API_KEY is not set.
 * - Never exposes the API key or system prompt to the client.
 * - Validates message history shape before forwarding.
 */
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate shape
  const { messages } = body as { messages?: ChatMessage[] };
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Messages array is required." },
      { status: 422 }
    );
  }

  // Cap conversation length to prevent abuse
  const trimmedMessages = messages.slice(-20);

  const apiKey = process.env.GEMINI_API_KEY;

  // Graceful degradation: no API key configured
  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      reply:
        "I appreciate your question! Our AI chat is being configured. In the meantime, I'd love to help you through our guided flow above, or you can **[book a free QA assessment](/contact)** to discuss your needs with our team directly.",
    });
  }

  try {
    // Use the Gemini REST API directly to avoid extra SDK weight on the server
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Build the Gemini request payload
    const contents = trimmedMessages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const geminiPayload = {
      system_instruction: {
        parts: [{ text: GEMINI_SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 512,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    };

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text().catch(() => "Unknown error");
      console.error("[chat] Gemini API error:", geminiResponse.status, errorText);
      return NextResponse.json({
        ok: true,
        reply:
          "I'm having a moment — let me collect my thoughts! In the meantime, you can **[book a free QA assessment](/contact)** and our team will get back to you personally.",
      });
    }

    const geminiData = (await geminiResponse.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const reply =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'd love to help! Could you tell me more about your testing needs, or would you like to **[book a free QA assessment](/contact)**?";

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error("[chat] Unexpected error:", error);
    return NextResponse.json({
      ok: true,
      reply:
        "Something went wrong on my end. Please try again, or **[book a free QA assessment](/contact)** to speak with our team directly.",
    });
  }
}
