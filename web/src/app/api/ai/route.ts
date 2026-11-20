// POST /api/ai  body: DemoInput (JSON object of strings)  ->  AiResponse
// Owner: codex-silviu. The API key never leaves the server.

import { generateResult } from "@/lib/ai";
import type { DemoInput } from "@/lib/types";

export const maxDuration = 30;

const MAX_FIELD_LENGTH = 2_000;
const MAX_FIELDS = 20;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Body must be a JSON object." }, { status: 400 });
  }

  const input: DemoInput = {};
  for (const [key, value] of Object.entries(body as Record<string, unknown>).slice(0, MAX_FIELDS)) {
    if (value === null || value === undefined) continue;
    input[key] = String(value).slice(0, MAX_FIELD_LENGTH);
  }

  const response = await generateResult(input);
  return Response.json(response);
}
