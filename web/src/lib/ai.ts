// Server-side Gemini call with a safety net. Owner: codex-silviu.
// Import this only from route handlers (src/app/api/**): it reads GEMINI_API_KEY.
//
// Order of attempts: GEMINI_MODEL (if set) -> gemini-flash-latest -> gemini-flash-lite-latest.
// Each attempt has a timeout; the whole call has a deadline. If everything fails,
// the user still gets fallbackResult() so the demo never breaks.

import { ApiError, GoogleGenAI, ThinkingLevel } from "@google/genai";
import { fallbackResult } from "./fallback";
import { RESULT_JSON_SCHEMA, SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import type { AiResponse, AiResult, DemoInput, ResultItem } from "./types";

const ATTEMPT_TIMEOUT_MS = 12_000;
const TOTAL_DEADLINE_MS = 24_000;

function modelChain(): string[] {
  const chain = [process.env.GEMINI_MODEL, "gemini-flash-latest", "gemini-flash-lite-latest"];
  return [...new Set(chain.filter((m): m is string => Boolean(m && m.trim())))];
}

export function hasApiKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
}

export async function generateResult(input: DemoInput): Promise<AiResponse> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return { source: "fallback", reason: "no-api-key", result: fallbackResult(input) };
  }

  const ai = new GoogleGenAI({ apiKey });
  const deadline = Date.now() + TOTAL_DEADLINE_MS;
  const errors: string[] = [];

  for (const model of modelChain()) {
    // First try the fast + structured variant; if the model rejects those options (HTTP 400),
    // retry the same model with a plain JSON request.
    for (const variant of ["fast-structured", "plain"] as const) {
      const remaining = deadline - Date.now();
      if (remaining < 2_000) break;
      try {
        const response = await ai.models.generateContent({
          model,
          contents: buildUserPrompt(input),
          config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: "application/json",
            abortSignal: AbortSignal.timeout(Math.min(ATTEMPT_TIMEOUT_MS, remaining)),
            ...(variant === "fast-structured"
              ? { responseJsonSchema: RESULT_JSON_SCHEMA, thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
              : {}),
          },
        });
        const result = parseResult(response.text);
        if (result) return { source: "gemini", model, result };
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
  return { source: "fallback", reason: "api-error", result: fallbackResult(input) };
}

function describeError(error: unknown): string {
  if (error instanceof ApiError) return `HTTP ${error.status} ${error.message.slice(0, 120)}`;
  if (error instanceof Error) return `${error.name}: ${error.message.slice(0, 120)}`;
  return String(error);
}

/** Parses the model output defensively and normalises it to AiResult. */
export function parseResult(text: string | undefined): AiResult | null {
  if (!text) return null;
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "").trim();
  let data: unknown;
  try {
    data = JSON.parse(cleaned);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const raw = data as Record<string, unknown>;
  if (typeof raw.title !== "string" || typeof raw.summary !== "string") return null;

  const items: ResultItem[] = Array.isArray(raw.items)
    ? raw.items
        .filter((it): it is Record<string, unknown> => Boolean(it) && typeof it === "object")
        .map((it) => ({
          title: String(it.title ?? "").trim(),
          detail: String(it.detail ?? "").trim(),
          tag: typeof it.tag === "string" ? it.tag : undefined,
        }))
        .filter((it) => it.title || it.detail)
        .slice(0, 8)
    : [];

  const score = typeof raw.score === "number" ? Math.max(0, Math.min(100, Math.round(raw.score))) : undefined;

  return {
    title: raw.title.trim(),
    summary: raw.summary.trim(),
    score,
    scoreLabel: typeof raw.scoreLabel === "string" ? raw.scoreLabel : undefined,
    items,
    nextStep: typeof raw.nextStep === "string" ? raw.nextStep : undefined,
  };
}
