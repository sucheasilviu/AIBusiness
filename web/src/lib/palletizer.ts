import type { Criterion, EngineResult, PalletizerFormValues, PalletizerInput } from "./types";

const RATED_PAYLOAD_KG = 20; // Universal Robots UR20 specification, DESCRIPTION §8.
const GRIPPER_KG = 5; // Project estimate, DESCRIPTION §8.
const LIGHT_WEIGHT_KG = 5; // PURATOS test point, DESCRIPTION §8.
const TESTED_WEIGHT_KG = 13; // PURATOS test point, DESCRIPTION §8.
const LIGHT_RATE = 8.6; // PURATOS test at 5 kg, in buckets/minute.
const HEAVY_RATE = 7.4; // PURATOS test at 13 kg, in buckets/minute.
const PALLET_HEIGHT_MM = 144; // Pallet base height prescribed by DESCRIPTION §8.
const SEPARATOR_MM = 5; // Separator allowance per layer, DESCRIPTION §8.
const PALLET_MAX_KG = 1000; // Estimated maximum load, DESCRIPTION §8.
const PALLET_SIZES = { eur: { l: 1200, w: 800 }, industrial: { l: 1200, w: 1000 } }; // DESCRIPTION §8.
const MIN_BUCKET_MM = 150; // Validation envelope, DESCRIPTION §8.
const MAX_BUCKET_MM = 500; // Validation envelope, DESCRIPTION §8.
const MAX_BUCKET_KG = 50; // Validation envelope, DESCRIPTION §8.
const MAX_LINE_RATE = 30; // Validation envelope, DESCRIPTION §8.
const MINUTES_PER_HOUR = 60; // Time-unit conversion.
const HOURS_PER_SHIFT = 8; // Planning assumption for the per-shift estimate.
const STAGGERED_ROW_PITCH = Math.sqrt(3) / 2; // Height of the equilateral triangle between tangent circle centers.

type Pattern = NonNullable<EngineResult["pattern"]>;
type Cycle = NonNullable<EngineResult["cycle"]>;
type Position = Pattern["positions"][number];

function numberField(raw: unknown, label: string, errors: string[], max = Infinity, min = 0): number {
  const value = typeof raw === "string" && raw.trim() ? Number(raw.replace(",", ".")) : raw;
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0 || value < min || value > max) {
    const range = min > 0 ? `între ${min} și ${max}` : `mai mare decât zero${max < Infinity ? ` și de cel mult ${max}` : ""}`;
    errors.push(`${label} trebuie să fie un număr ${range}.`);
    return NaN;
  }
  return value;
}

function optionField<T extends string>(raw: unknown, options: readonly T[], label: string, errors: string[]): T | undefined {
  const value = options.find((option) => option === raw);
  if (value === undefined) errors.push(`${label} trebuie să aibă o opțiune validă.`);
  return value;
}

function positionsForRows(length: number, width: number, bucket: number, offset: boolean, startOffset = false): Position[] {
  const positions: Position[] = [];
  const radius = bucket / 2;
  const pitch = offset ? bucket * STAGGERED_ROW_PITCH : bucket;
  for (let row = 0; row * pitch <= width - bucket; row++) {
    const inset = offset && (row % 2 === 0) === startOffset ? radius : 0;
    for (let x = inset; x <= length - bucket; x += bucket) {
      positions.push({ x: x + radius, y: row * pitch + radius });
    }
  }
  return positions;
}

function palletPattern(
  bucketMm: number, bucketHeight: number, bucketWeight: number, heightLimit: number,
  palletType: PalletizerInput["palletType"], round: boolean, separator: boolean,
): Pattern {
  const palletMm = PALLET_SIZES[palletType];
  const { l, w } = palletMm;
  let positions = positionsForRows(l, w, bucketMm, false);
  let layout: Pattern["layout"] = "grid";
  if (round) {
    for (const startOffset of [false, true]) {
      const alongLength = positionsForRows(l, w, bucketMm, true, startOffset);
      const alongWidth = positionsForRows(w, l, bucketMm, true, startOffset).map(({ x, y }) => ({ x: y, y: x }));
      for (const candidate of [alongLength, alongWidth]) {
        if (candidate.length > positions.length) {
          positions = candidate;
          layout = "offset";
        }
      }
    }
  }

  const perLayer = positions.length;
  const layerPitch = bucketHeight + (separator ? SEPARATOR_MM : 0);
  const heightLayers = Math.max(0, Math.floor((heightLimit - PALLET_HEIGHT_MM) / layerPitch));
  const perPallet = Math.min(perLayer * heightLayers, Math.floor(PALLET_MAX_KG / bucketWeight));
  const layers = perPallet > 0 ? Math.ceil(perPallet / perLayer) : 0;
  return { perLayer, layers, perPallet, palletKg: perPallet * bucketWeight, layout, positions, palletMm, bucketMm };
}

function cycleFor(weight: number, lineRate: number, perPallet: number, palletChangeMin: number, twoPositions: boolean): Cycle {
  const testedSpan = TESTED_WEIGHT_KG - LIGHT_WEIGHT_KG;
  const weightInSpan = Math.min(testedSpan, Math.max(0, weight - LIGHT_WEIGHT_KG));
  const robotRate = LIGHT_RATE + (HEAVY_RATE - LIGHT_RATE) * weightInSpan / testedSpan;
  const effectiveRate = Math.min(lineRate, robotRate);
  const bucketsPerHour = effectiveRate * MINUTES_PER_HOUR;
  const bottleneck = lineRate > robotRate ? "robot" : lineRate < robotRate ? "linie" : "echilibrat";
  const palletFillMin = perPallet / effectiveRate;
  return {
    lineRate, robotRate, effectiveRate, bucketsPerHour, bottleneck,
    robotIdlePct: (1 - effectiveRate / robotRate) * 100,
    palletFillMin, palletChangeMin, palletsPerShift: Math.floor(bucketsPerHour * HOURS_PER_SHIFT / perPallet),
    changeOk: twoPositions && palletChangeMin < palletFillMin,
  };
}

export function analyze(input: PalletizerFormValues | Record<string, unknown>): EngineResult {
  const errors: string[] = [];
  if (typeof input.companyName !== "string" || !input.companyName.trim()) errors.push("Completează firma.");
  optionField(input.industry, ["umpluturi", "creme", "glazuri", "amelioratori", "alta"], "Produsul ambalat", errors);
  const weight = numberField(input.bucketWeightKg, "Greutatea găleții (kg)", errors, MAX_BUCKET_KG);
  const diameter = numberField(input.bucketDiameterMm, "Diametrul sau latura găleții (mm)", errors, MAX_BUCKET_MM, MIN_BUCKET_MM);
  const height = numberField(input.bucketHeightMm, "Înălțimea găleții (mm)", errors, MAX_BUCKET_MM, MIN_BUCKET_MM);
  const shape = optionField(input.shape, ["rotunda", "patrata"], "Forma", errors);
  const handle = optionField(input.handle, ["metal", "plastic", "fara"], "Mânerul", errors);
  optionField(input.material, ["plastic", "metal"], "Materialul", errors);
  const lineRate = numberField(input.lineRatePerMin, "Ritmul liniei (găleți/minut)", errors, MAX_LINE_RATE);
  optionField(typeof input.shiftsPerDay === "number" ? String(input.shiftsPerDay) : input.shiftsPerDay, ["1", "2", "3"], "Numărul de ture", errors);
  const palletType = optionField(input.palletType, ["eur", "industrial"], "Tipul paletului", errors);
  const heightLimit = numberField(input.maxPalletHeightMm, "Înălțimea maximă a paletului (mm)", errors);
  const changeMin = numberField(input.palletChangeMin, "Timpul de schimbare a paletului (minute)", errors);
  const separator = optionField(input.separator, ["da", "nu"], "Separatorul între straturi", errors);
  const space = optionField(input.twoPalletSpace, ["da", "nu", "nu_stiu"], "Spațiul de paletizare", errors);
  const signals = optionField(input.conveyorSignals, ["da", "nu", "nu_stiu"], "Semnalele transportorului", errors);
  if (errors.length || !palletType) return { ok: false, errors, criteria: [] };

  const pattern = palletPattern(diameter, height, weight, heightLimit, palletType, shape === "rotunda", separator === "da");
  const cycle = pattern.perPallet > 0 ? cycleFor(weight, lineRate, pattern.perPallet, changeMin, space === "da") : undefined;
  const usablePayload = RATED_PAYLOAD_KG - GRIPPER_KG;
  const criteria: Criterion[] = [
    {
      id: "payload", label: "Sarcină utilă",
      status: weight > usablePayload ? "nepotrivit" : weight > TESTED_WEIGHT_KG ? "evaluare" : "ok",
      detail: weight > usablePayload
        ? `Greutatea depășește sarcina utilă de ${usablePayload} kg (estimare). Ritmul la această greutate este netestat.`
        : weight > TESTED_WEIGHT_KG
          ? `Greutatea se încadrează în sarcina utilă estimată, dar ritmul este netestat peste ${TESTED_WEIGHT_KG} kg.`
          : `Greutatea este în intervalul testat până la ${TESTED_WEIGHT_KG} kg.`,
    },
    {
      id: "shape", label: "Forma găleții", status: shape === "patrata" ? "evaluare" : "ok",
      detail: shape === "patrata" ? "Forma pătrată necesită verificarea prinderii." : "Forma rotundă permite evaluarea cu prinderea de referință.",
    },
    {
      id: "handle", label: "Mâner", status: handle === "fara" ? "evaluare" : "ok",
      detail: handle === "fara" ? "Găleata fără mâner necesită verificarea prinderii." : "Găleata are mâner.",
    },
    {
      id: "space", label: "Spațiu de paletizare", status: space === "da" ? "ok" : "evaluare",
      detail: space === "da" ? "Sunt disponibile două poziții." : space === "nu" ? "Nu este loc pentru două poziții." : "Confirmă spațiul disponibil pentru două poziții.",
    },
    {
      id: "signals", label: "Semnalele transportorului", status: signals === "nu_stiu" ? "evaluare" : "ok",
      detail: signals === "da" ? "Transportorul are semnale de proces." : signals === "nu" ? "Transportorul nu are semnale de proces." : "Verifică dacă transportorul are semnale de proces.",
    },
    {
      id: "pattern", label: "Încadrare pe palet", status: cycle ? "ok" : "nepotrivit",
      detail: cycle ? "Gălețile încap pe palet în limitele declarate." : "Niciun strat nu încape la dimensiunile declarate.",
    },
  ];
  if (cycle) {
    criteria.push({
      id: "throughput", label: "Ritmul de paletizare", status: cycle.bottleneck === "robot" ? "evaluare" : "ok",
      detail: cycle.bottleneck === "robot" ? "Linia este mai rapidă decât robotul. Evaluează un tampon sau o a doua celulă."
        : cycle.bottleneck === "linie" ? "Ritmul liniei limitează debitul." : "Ritmul liniei este egal cu ritmul estimat al robotului.",
    }, {
      id: "palletChange", label: "Schimbarea paletului", status: cycle.changeOk ? "ok" : "evaluare",
      detail: cycle.changeOk ? "Paletul plin poate fi schimbat în timp ce se umple celălalt."
        : "Schimbarea paletului poate întrerupe paletizarea.",
    });
  }
  const verdict = criteria.some(({ status }) => status === "nepotrivit") ? "nepotrivit"
    : criteria.some(({ status }) => status === "evaluare") ? "evaluare" : "potrivit";
  return { ok: true, errors, verdict, criteria, pattern, cycle };
}
