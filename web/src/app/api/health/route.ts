// GET /api/health -> { ok, ai, model }  Quick deploy check (no secrets returned).
import { connection } from "next/server";
import { hasApiKey } from "@/lib/ai";

export async function GET() {
  await connection(); // run at request time, not at build time
  return Response.json({
    ok: true,
    ai: hasApiKey(),
    model: process.env.GEMINI_MODEL || "gemini-flash-latest",
    time: new Date().toISOString(),
  });
}
