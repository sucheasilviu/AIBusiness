// POST /api/ai: EngineResult -> AiExplanation
// Owner: codex-silviu. The API key never leaves the server.

import { generateExplanation } from "@/lib/ai";
import type { EngineResult } from "@/lib/types";

export const maxDuration = 30;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasFiniteNumbers(record: Record<string, unknown>, keys: string[]) {
  return keys.every((key) => Number.isFinite(record[key]));
}

function isEngineResult(value: unknown): value is EngineResult {
  if (!isRecord(value)) return false;
  const { ok, errors, verdict, criteria, pattern, cycle } = value;

  if (typeof ok !== "boolean" || !Array.isArray(errors) || !errors.every((error) => typeof error === "string")
      || !Array.isArray(criteria) || !criteria.every((criterion) => (
        isRecord(criterion) && typeof criterion.id === "string" && typeof criterion.label === "string"
        && typeof criterion.detail === "string"
        && (criterion.status === "ok" || criterion.status === "evaluare" || criterion.status === "nepotrivit")
      ))) return false;

  if (ok) {
    if (errors.length > 0 || (verdict !== "potrivit" && verdict !== "evaluare" && verdict !== "nepotrivit")) return false;
  } else if (verdict !== undefined) {
    return false;
  }

  if (pattern !== undefined && (
    !isRecord(pattern) || !hasFiniteNumbers(pattern, ["perLayer", "layers", "perPallet", "palletKg", "bucketMm"])
    || (pattern.layout !== "grid" && pattern.layout !== "offset")
    || !isRecord(pattern.palletMm) || !hasFiniteNumbers(pattern.palletMm, ["l", "w"])
    || !Array.isArray(pattern.positions)
    || !pattern.positions.every((position) => isRecord(position) && hasFiniteNumbers(position, ["x", "y"]))
  )) return false;

  return cycle === undefined || (
    isRecord(cycle) && typeof cycle.changeOk === "boolean"
    && (cycle.palletChangeMin === undefined || (
      typeof cycle.palletChangeMin === "number" && Number.isFinite(cycle.palletChangeMin) && cycle.palletChangeMin > 0
    ))
    && (cycle.bottleneck === "linie" || cycle.bottleneck === "robot" || cycle.bottleneck === "echilibrat")
    && hasFiniteNumbers(cycle, [
      "lineRate", "robotRate", "effectiveRate", "bucketsPerHour", "robotIdlePct", "palletFillMin", "palletsPerShift",
    ])
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Trimite rezultatul analizei în format JSON." }, { status: 400 });
  }
  if (!isEngineResult(body)) {
    return Response.json({ error: "Rezultatul analizei are un format incorect." }, { status: 400 });
  }

  return Response.json(await generateExplanation(body));
}
