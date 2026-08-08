import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "../../shared/portfolio-data.js";

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Build once at cold-start — no side effects
const SYSTEM_PROMPT = buildSystemPrompt();

export const handler: Handler = async (event) => {
  // ── Preflight ──────────────────────────────────────────────
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  // ── Method guard ───────────────────────────────────────────
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Method not allowed. Use POST." }),
    };
  }

  // ── API key guard ──────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set.");
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Server configuration error: missing API key." }),
    };
  }

  // ── Parse request body ─────────────────────────────────────
  let userMessage: string;
  try {
    const body = JSON.parse(event.body ?? "{}");
    if (typeof body.message !== "string" || body.message.trim() === "") {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: '"message" must be a non-empty string.' }),
      };
    }
    userMessage = body.message.trim();
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Invalid JSON in request body." }),
    };
  }

  // ── Call Gemini 2.5 Flash ──────────────────────────────────
  try {
    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // FIX 1: System prompt goes in config.systemInstruction, not as a user turn.
      // This ensures Gemini treats it as grounding context, not user input.
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 1024,
        // FIX 2: Permissive safety settings so normal portfolio questions about
        // AI, healthcare, or creative projects are never blocked.
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
        ],
      },
      // FIX 3: contents now contains only the actual user message — clean and correct.
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    });

    // FIX 4: Guard for blocked or empty responses and log the reason.
    const candidate = result.candidates?.[0];
    if (!candidate) {
      console.warn("Gemini returned no candidates. PromptFeedback:", result.promptFeedback);
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ reply: "I couldn't generate a response. Please try again." }),
      };
    }

    if (candidate.finishReason && candidate.finishReason !== "STOP" && candidate.finishReason !== "MAX_TOKENS") {
      console.warn("Gemini finish reason:", candidate.finishReason, candidate.safetyRatings);
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ reply: "I couldn't answer that question. Please try rephrasing." }),
      };
    }

    const reply =
      candidate.content?.parts?.[0]?.text?.trim() ??
      "I couldn't generate a response. Please try again.";

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("Gemini API error:", detail);
    return {
      statusCode: 502,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: `Gemini API error: ${detail}` }),
    };
  }
};
