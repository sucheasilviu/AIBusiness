// Server-side Gemini call with a safety net. Owner: codex-silviu.
// Import this only from route handlers (src/app/api/**): it reads GEMINI_API_KEY.
//
// Try GEMINI_MODEL first when set, then 3.1 Flash-Lite, 3.5 Flash-Lite and Flash Latest.
// Each attempt has a timeout; the whole call has a deadline. If everything fails,
// the user still gets a Romanian explanation generated from the engine result.

import { ApiError, GoogleGenAI, ThinkingLevel } from "@google/genai";
import { fallbackExplanation } from "./fallback";
import { RESULT_JSON_SCHEMA, SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import type { AiExplanation, EngineResult } from "./types";

// Leave time for rendering within the demo's ten-second target.
const ATTEMPT_TIMEOUT_MS = 8_000;
const TOTAL_DEADLINE_MS = 9_000;

function modelChain(): string[] {
  const chain = [process.env.GEMINI_MODEL, "gemini-3.1-flash-lite", "gemini-3.5-flash-lite", "gemini-flash-latest"];
  return [...new Set(chain.filter((m): m is string => Boolean(m && m.trim())))];
}

export function hasApiKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
}

export async function generateExplanation(result: EngineResult): Promise<AiExplanation> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey || !result.ok) {
    return fallbackExplanation(result);
  }

  const ai = new GoogleGenAI({ apiKey });
  const deadline = Date.now() + TOTAL_DEADLINE_MS;
  const errors: string[] = [];
  const contents = buildUserPrompt(result);

  for (const model of modelChain()) {
    // First try the fast + structured variant; if the model rejects those options (HTTP 400),
    // retry the same model with a plain JSON request.
    for (const variant of ["fast-structured", "plain"] as const) {
      const remaining = deadline - Date.now();
      if (remaining <= 0) break;
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: "application/json",
            abortSignal: AbortSignal.timeout(Math.min(ATTEMPT_TIMEOUT_MS, remaining)),
            ...(variant === "fast-structured"
              ? { responseJsonSchema: RESULT_JSON_SCHEMA, thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
              : {}),
          },
        });
        const explanation = parseExplanation(response.text);
        if (explanation) return { ...explanation, source: "ai" };
        errors.push(`${model}/${variant}: invalid JSON`);
        break; // the model answered but badly: try the next model
      } catch (error) {
        errors.push(`${model}/${variant}: ${describeError(error)}`);
        const status = error instanceof ApiError ? error.status : undefined;
        if (status === 400 && variant === "fast-structured") continue; // retry plain
        break; // 404 / 429 / 5xx / timeout: next model
      }
    }
  }

  console.error("[ai] all attempts failed ->", errors.join(" | "));
  return fallbackExplanation(result);
}

function describeError(error: unknown): string {
  if (error instanceof ApiError) return `HTTP ${error.status}`;
  return error instanceof Error ? error.name : "Unknown error";
}

function parseExplanation(text: string | undefined): Omit<AiExplanation, "source"> | null {
  if (!text) return null;
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "").trim();
  let data: unknown;
  try {
    data = JSON.parse(cleaned);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const { summary, questions } = data as Record<string, unknown>;
  if (typeof summary !== "string" || !summary.trim()
      || !Array.isArray(questions) || questions.length !== 3
      || !questions.every((question): question is string => typeof question === "string" && !!question.trim())) {
    return null;
  }

  return { summary: summary.trim(), questions: questions.map((question) => question.trim()) };
}
