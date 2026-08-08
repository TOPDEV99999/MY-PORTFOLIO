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
      contents: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I'm Nova, Daniel's portfolio assistant. I'll answer all questions based on the information provided. How can I help?" }],
        },
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    });

    const reply =
      result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
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
