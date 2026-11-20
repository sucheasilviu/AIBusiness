// Shared types. Owner: codex-silviu.
// Retarget the product by changing DemoInput fields (see content.ts) and AiResult.

export type FieldType = "text" | "textarea" | "number" | "select";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  help?: string;
}

/** What the demo form sends to /api/ai: field name -> value. */
export type DemoInput = Record<string, string>;

export interface ResultItem {
  title: string;
  detail: string;
  /** Short label shown as a chip, e.g. "punct forte", "risc", "recomandare". */
  tag?: string;
}

/** What the AI must return. Keep it small and easy to render. */
export interface AiResult {
  title: string;
  summary: string;
  /** Optional 0–100 score shown as a big number. */
  score?: number;
  scoreLabel?: string;
  items: ResultItem[];
  nextStep?: string;
}

export interface AiResponse {
  /** "gemini" = live model answer, "fallback" = canned answer (no key / API error). */
  source: "gemini" | "fallback";
  model?: string;
  reason?: string;
  result: AiResult;
}
