// Shared types. Owner: codex-silviu.

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

/** Retained for the starter UI until the PaletScan demo form takes over. */
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

export interface PalletizerInput {
  companyName: string;
  industry: "umpluturi" | "creme" | "glazuri" | "amelioratori" | "alta";
  bucketWeightKg: number;
  bucketDiameterMm: number;
  bucketHeightMm: number;
  shape: "rotunda" | "patrata";
  handle: "metal" | "plastic" | "fara";
  material: "plastic" | "metal";
  lineRatePerMin: number;
  shiftsPerDay: 1 | 2 | 3;
  palletType: "eur" | "industrial";
  maxPalletHeightMm: number;
  palletChangeMin: number;
  separator: "da" | "nu";
  twoPalletSpace: "da" | "nu" | "nu_stiu";
  conveyorSignals: "da" | "nu" | "nu_stiu";
  notes?: string;
}

/** Form and test values before numeric conversion and required-field validation. */
export type PalletizerFormValues = {
  [Field in keyof PalletizerInput]?: PalletizerInput[Field] extends number
    ? PalletizerInput[Field] | string
    : PalletizerInput[Field] | "";
};

export type Verdict = "potrivit" | "evaluare" | "nepotrivit";

export interface Criterion {
  id: string;
  label: string;
  status: "ok" | "evaluare" | "nepotrivit";
  detail: string;
}

export interface EngineResult {
  ok: boolean;
  errors: string[];
  verdict?: Verdict;
  criteria: Criterion[];
  pattern?: {
    perLayer: number;
    layers: number;
    perPallet: number;
    palletKg: number;
    layout: "grid" | "offset";
    positions: { x: number; y: number }[]; // mm
    palletMm: { l: number; w: number };
    bucketMm: number;
  };
  cycle?: {
    lineRate: number;
    robotRate: number;
    effectiveRate: number;
    bucketsPerHour: number;
    bottleneck: "linie" | "robot" | "echilibrat";
    robotIdlePct: number;
    palletFillMin: number;
    palletChangeMin?: number;
    palletsPerShift: number;
    changeOk: boolean;
  };
}

export interface AiExplanation {
  summary: string;
  questions: string[];
  source: "ai" | "fallback";
}

type VisualField = "shape" | "handle" | "material";

export type VisionSuggestion = {
  [Field in VisualField]?: { value: PalletizerInput[Field]; confidence: number }; // 0 to 1
} & { notes: string; source: "ai" | "fallback" };
