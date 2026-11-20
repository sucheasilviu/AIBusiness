// Prompt for the main AI function. Owner: codex-silviu.
// Keep the output contract in sync with AiResult (types.ts) and RESULT_JSON_SCHEMA.

import type { DemoInput } from "./types";

export const SYSTEM_PROMPT = [
  "Ești un consultant de afaceri pentru antreprenori la început de drum din România.",
  "Scrii doar în limba română, cu diacritice, concis și concret.",
  "Nu inventa statistici precise; dacă estimezi, spune „aproximativ”.",
  "Răspunzi doar cu JSON valid, conform schemei cerute, fără alt text.",
].join(" ");

export function buildUserPrompt(input: DemoInput): string {
  return [
    "Analizează ideea de afacere de mai jos pentru piața din România.",
    "Date de intrare (JSON):",
    JSON.stringify(input, null, 2),
    "",
    "Returnează JSON cu forma:",
    '{"title": string (max 8 cuvinte), "summary": string (2-3 propoziții),',
    ' "score": number 0-100, "scoreLabel": string (ex. „Potențial bun”),',
    ' "items": [{"title": string, "detail": string (max 25 cuvinte), "tag": "punct forte" | "risc" | "recomandare"}] (exact 5 elemente: 2 puncte forte, 2 riscuri, 1 recomandare),',
    ' "nextStep": string (o acțiune concretă pentru săptămâna aceasta)}',
  ].join("\n");
}

/** JSON Schema sent to Gemini as responseJsonSchema (structured output). */
export const RESULT_JSON_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    summary: { type: "string" },
    score: { type: "number" },
    scoreLabel: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          detail: { type: "string" },
          tag: { type: "string" },
        },
        required: ["title", "detail"],
      },
    },
    nextStep: { type: "string" },
  },
  required: ["title", "summary", "items"],
} as const;
