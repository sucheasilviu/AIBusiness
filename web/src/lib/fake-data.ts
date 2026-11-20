// Fictional test data for the demo form. The records live in src/data/test-inputs.json
// (owner: codex-mihai). Never put real personal data here.

import type { DemoInput } from "./types";
import testInputs from "@/data/test-inputs.json";

const records = testInputs as DemoInput[];

/** Returns a different test record on each call (cycles through the list). */
let cursor = Math.floor(Math.random() * Math.max(records.length, 1));
export function nextTestInput(): DemoInput {
  if (records.length === 0) return {};
  cursor = (cursor + 1) % records.length;
  return { ...records[cursor] };
}

export const testInputCount = records.length;
