"use client";

// Main demo screen: form -> deterministic engine -> /api/ai -> ResultView.
// Owner: gemini-silviu (UI). Engine swap: T30 (codex-silviu's web/src/lib/palletizer.ts).
import { useRef, useState } from "react";
import ResultView from "@/components/ResultView";
import testInputsRaw from "@/data/test-inputs.json";
import { demo } from "@/lib/content";
import type {
  AiExplanation,
  Criterion,
  EngineResult,
  FormField,
  PalletizerFormValues,
  Verdict,
} from "@/lib/types";

const fieldMap = new Map<string, FormField>(demo.fields.map((f) => [f.name, f]));

const emptyValues = (): Record<string, string> =>
  Object.fromEntries(demo.fields.map((f) => [f.name, f.name === "industry" ? "umpluturi" : ""]));

// Built-in fictional fallback records used only until T07 updates src/data/test-inputs.json.
const FALLBACK_TEST_RECORDS: Record<string, string>[] = [
  {
    companyName: "Patiseria Demo SRL",
    industry: "umpluturi",
    bucketWeightKg: "13",
    bucketDiameterMm: "300",
    bucketHeightMm: "320",
    shape: "rotunda",
    handle: "metal",
    material: "plastic",
    lineRatePerMin: "6",
    shiftsPerDay: "3",
    palletType: "eur",
    maxPalletHeightMm: "1600",
    palletChangeMin: "4",
    separator: "da",
    twoPalletSpace: "da",
    conveyorSignals: "da",
    notes: "Linie existentă de umpluturi cu fructe, 3 ture.",
  },
  {
    companyName: "Creme și Glazuri Vest SRL",
    industry: "creme",
    bucketWeightKg: "5",
    bucketDiameterMm: "220",
    bucketHeightMm: "210",
    shape: "rotunda",
    handle: "plastic",
    material: "plastic",
    lineRatePerMin: "8",
    shiftsPerDay: "2",
    palletType: "eur",
    maxPalletHeightMm: "1500",
    palletChangeMin: "3",
    separator: "da",
    twoPalletSpace: "da",
    conveyorSignals: "da",
    notes: "Găleți de 5 kg pentru patiserii artizanale.",
  },
  {
    companyName: "Glazuri Nord Industriale SRL",
    industry: "glazuri",
    bucketWeightKg: "18",
    bucketDiameterMm: "320",
    bucketHeightMm: "350",
    shape: "rotunda",
    handle: "metal",
    material: "plastic",
    lineRatePerMin: "5",
    shiftsPerDay: "2",
    palletType: "industrial",
    maxPalletHeightMm: "1600",
    palletChangeMin: "4",
    separator: "da",
    twoPalletSpace: "da",
    conveyorSignals: "da",
    notes: "Găleți mari de 18 kg peste sarcina utilă UR20.",
  },
  {
    companyName: "Amelioratori Sud SRL",
    industry: "amelioratori",
    bucketWeightKg: "5",
    bucketDiameterMm: "220",
    bucketHeightMm: "220",
    shape: "rotunda",
    handle: "plastic",
    material: "plastic",
    lineRatePerMin: "11",
    shiftsPerDay: "3",
    palletType: "eur",
    maxPalletHeightMm: "1600",
    palletChangeMin: "3",
    separator: "da",
    twoPalletSpace: "da",
    conveyorSignals: "nu_stiu",
    notes: "Linie rapidă de 11 găleți/minut.",
  },
  {
    companyName: "Atelier Date Incomplete SRL",
    industry: "umpluturi",
    bucketWeightKg: "",
    bucketDiameterMm: "2000",
    bucketHeightMm: "320",
    shape: "rotunda",
    handle: "metal",
    material: "plastic",
    lineRatePerMin: "6",
    shiftsPerDay: "2",
    palletType: "eur",
    maxPalletHeightMm: "1600",
    palletChangeMin: "4",
    separator: "da",
    twoPalletSpace: "da",
    conveyorSignals: "da",
    notes: "Caz de test cu date lipsă și diametru greșit.",
  },
  {
    companyName: "Cofetărie Ingrediente Centru SRL",
    industry: "creme",
    bucketWeightKg: "10",
    bucketDiameterMm: "270",
    bucketHeightMm: "280",
    shape: "patrata",
    handle: "fara",
    material: "plastic",
    lineRatePerMin: "6",
    shiftsPerDay: "2",
    palletType: "eur",
    maxPalletHeightMm: "1550",
    palletChangeMin: "4",
    separator: "nu",
    twoPalletSpace: "nu_stiu",
    conveyorSignals: "nu_stiu",
    notes: "Găleți pătrate fără mâner.",
  },
];

function getTestRecords(): Record<string, string>[] {
  const raw = Array.isArray(testInputsRaw) ? (testInputsRaw as Record<string, unknown>[]) : [];
  if (raw.length > 0 && "companyName" in raw[0]) {
    return raw.map((rec) =>
      Object.fromEntries(
        demo.fields.map((f) => {
          const val = rec[f.name];
          return [f.name, val === undefined || val === null ? "" : String(val)];
        }),
      ),
    );
  }
  return FALLBACK_TEST_RECORDS;
}

// TODO(T30): replace placeholderAnalyze with `import { analyze } from "@/lib/palletizer"` once codex-silviu pushes T30.
function placeholderAnalyze(values: Record<string, string>): EngineResult {
  const errors: string[] = [];

  for (const f of demo.fields) {
    if (f.required && !values[f.name]?.trim()) {
      errors.push(`Lipsește câmpul obligatoriu: ${f.label}.`);
    }
  }

  const weight = Number(values.bucketWeightKg);
  const diameter = Number(values.bucketDiameterMm);
  const height = Number(values.bucketHeightMm);
  const lineRate = Number(values.lineRatePerMin);
  const maxPalletH = Number(values.maxPalletHeightMm);
  const changeMin = Number(values.palletChangeMin);
  const shifts = Number(values.shiftsPerDay);

  if (values.bucketWeightKg?.trim() && (!Number.isFinite(weight) || weight <= 0 || weight > 50)) {
    errors.push("Greutatea găleții pline trebuie să fie între 0,1 și 50 kg.");
  }
  if (values.bucketDiameterMm?.trim() && (!Number.isFinite(diameter) || diameter < 150 || diameter > 500)) {
    errors.push("Diametrul / latura găleții trebuie să fie între 150 și 500 mm.");
  }
  if (values.bucketHeightMm?.trim() && (!Number.isFinite(height) || height < 150 || height > 500)) {
    errors.push("Înălțimea găleții trebuie să fie între 150 și 500 mm.");
  }
  if (values.lineRatePerMin?.trim() && (!Number.isFinite(lineRate) || lineRate <= 0 || lineRate > 30)) {
    errors.push("Ritmul liniei trebuie să fie între 0,1 și 30 găleți/minut.");
  }
  if (values.maxPalletHeightMm?.trim() && (!Number.isFinite(maxPalletH) || maxPalletH <= 144)) {
    errors.push("Înălțimea maximă a paletului încărcat trebuie să fie mai mare de 144 mm.");
  }
  if (values.palletChangeMin?.trim() && (!Number.isFinite(changeMin) || changeMin <= 0)) {
    errors.push("Timpul de schimbare a paletului trebuie să fie mai mare de 0 minute.");
  }

  if (errors.length > 0) {
    return { ok: false, errors, criteria: [] };
  }

  const criteria: Criterion[] = [];

  // 1. Payload (UR20 20 kg - 5 kg gripper estimare = 15 kg usable; tested <= 13 kg at PURATOS)
  if (weight > 15) {
    criteria.push({
      id: "payload",
      label: "Sarcină utilă UR20",
      status: "nepotrivit",
      detail: `${weight} kg depășește sarcina utilă estimată de 15 kg (20 kg UR20 minus ~5 kg gripper).`,
    });
  } else if (weight > 13) {
    criteria.push({
      id: "payload",
      label: "Sarcină utilă UR20",
      status: "evaluare",
      detail: `${weight} kg este în limita de 15 kg, dar peste greutatea de 13 kg testată la PURATOS.`,
    });
  } else {
    criteria.push({
      id: "payload",
      label: "Sarcină utilă UR20",
      status: "ok",
      detail: `${weight} kg se încadrează în gama 5–13 kg testată la PURATOS.`,
    });
  }

  // 2. Shape & handle
  if (values.shape === "patrata" || values.handle === "fara") {
    criteria.push({
      id: "gripper",
      label: "Prindere și formă găleată",
      status: "evaluare",
      detail: "Gălețile pătrate sau fără mâner necesită validarea tipului de gripper (vacuum / clește dedicat).",
    });
  } else {
    criteria.push({
      id: "gripper",
      label: "Prindere și formă găleată",
      status: "ok",
      detail: "Găleată rotundă cu mâner, compatibilă cu prinderea testată pe celula UR20.",
    });
  }

  // 3. Robot rate (PURATOS test results: 8.6/min at <=5 kg, 7.4/min at 13 kg)
  let robotRate = 7.4;
  if (weight <= 5) {
    robotRate = 8.6;
  } else if (weight < 13) {
    robotRate = Number((8.6 - ((weight - 5) / 8) * (8.6 - 7.4)).toFixed(1));
  }

  const effectiveRate = Number(Math.min(lineRate, robotRate).toFixed(1));
  const bottleneck: "linie" | "robot" | "echilibrat" =
    lineRate > robotRate ? "robot" : lineRate < robotRate ? "linie" : "echilibrat";

  if (bottleneck === "robot") {
    criteria.push({
      id: "rate",
      label: "Ritm linie vs. robot",
      status: "evaluare",
      detail: `Linia (${lineRate}/min) depășește ritmul estimat al robotului (${robotRate}/min); poate fi necesar buffer sau a 2-a celulă.`,
    });
  } else {
    criteria.push({
      id: "rate",
      label: "Ritm linie vs. robot",
      status: "ok",
      detail: `Robotul (${robotRate}/min, rezultat de test) acoperă ritmul liniei (${lineRate}/min).`,
    });
  }

  // 4. Space & conveyor signals
  if (values.twoPalletSpace !== "da") {
    criteria.push({
      id: "space",
      label: "Spațiu 2 poziții paletizare",
      status: "evaluare",
      detail:
        values.twoPalletSpace === "nu"
          ? "Fără 2 poziții de paletizare, robotul se oprește la schimbarea paletului."
          : "Este necesară verificarea spațiului disponibil pentru 2 poziții de palet.",
    });
  } else {
    criteria.push({
      id: "space",
      label: "Spațiu 2 poziții paletizare",
      status: "ok",
      detail: "Există spațiu pentru 2 poziții, permițând schimbarea paletului fără oprire.",
    });
  }

  if (values.conveyorSignals !== "da") {
    criteria.push({
      id: "signals",
      label: "Semnale transportor",
      status: "evaluare",
      detail: "Semnalele de proces (start/stop) ale transportorului trebuie clarificate la discuția tehnică.",
    });
  } else {
    criteria.push({
      id: "signals",
      label: "Semnale transportor",
      status: "ok",
      detail: "Transportorul dispune de semnale de proces pentru sincronizarea cu celula UR20.",
    });
  }

  // Pallet geometry (simple square grid placeholder; T30 adds optimal staggered/offset layout)
  const palletMm = values.palletType === "industrial" ? { l: 1200, w: 1000 } : { l: 1200, w: 800 };
  const cols = Math.max(1, Math.floor(palletMm.l / diameter));
  const rows = Math.max(1, Math.floor(palletMm.w / diameter));
  const perLayer = cols * rows;
  const sepMm = values.separator === "da" ? 5 : 0;
  const maxByHeight = Math.max(1, Math.floor((maxPalletH - 144) / (height + sepMm)));
  const maxByWeight = Math.max(1, Math.floor(1000 / (perLayer * weight)));
  const layers = Math.max(1, Math.min(maxByHeight, maxByWeight));
  const perPallet = perLayer * layers;
  const palletKg = Math.round(perPallet * weight);

  const positions: { x: number; y: number }[] = [];
  const xStep = palletMm.l / cols;
  const yStep = palletMm.w / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({ x: Math.round((c + 0.5) * xStep), y: Math.round((r + 0.5) * yStep) });
    }
  }

  const bucketsPerHour = Math.round(effectiveRate * 60);
  const robotIdlePct = Math.max(0, Math.round(((robotRate - effectiveRate) / robotRate) * 100));
  const palletFillMin = Number((perPallet / effectiveRate).toFixed(1));
  const palletsPerShift = Number(((bucketsPerHour * 8) / perPallet).toFixed(1));
  const changeOk = values.twoPalletSpace === "da" && changeMin < palletFillMin;

  if (!changeOk && values.twoPalletSpace === "da") {
    criteria.push({
      id: "change",
      label: "Schimbare palet",
      status: "evaluare",
      detail: `Schimbarea (${changeMin} min) depășește timpul de umplere al unui palet (${palletFillMin} min).`,
    });
  }

  const verdict: Verdict = criteria.some((c) => c.status === "nepotrivit")
    ? "nepotrivit"
    : criteria.some((c) => c.status === "evaluare")
      ? "evaluare"
      : "potrivit";

  // Silence unused shifts variable until T30 uses it
  void shifts;

  return {
    ok: true,
    errors: [],
    verdict,
    criteria,
    pattern: {
      perLayer,
      layers,
      perPallet,
      palletKg,
      layout: "grid",
      positions,
      palletMm,
      bucketMm: diameter,
    },
    cycle: {
      lineRate,
      robotRate,
      effectiveRate,
      bucketsPerHour,
      bottleneck,
      robotIdlePct,
      palletFillMin,
      palletsPerShift,
      changeOk,
    },
  };
}

export default function DemoForm() {
  const [values, setValues] = useState<Record<string, string>>(emptyValues);
  const [testIndex, setTestIndex] = useState<number>(-1);
  const [engineResult, setEngineResult] = useState<EngineResult | null>(null);
  const [explanation, setExplanation] = useState<AiExplanation | null>(null);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const testRecords = getTestRecords();

  const update = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const fillTestData = () => {
    const next = (testIndex + 1) % testRecords.length;
    setTestIndex(next);
    setValues({ ...emptyValues(), ...testRecords[next] });
    setEngineResult(null);
    setExplanation(null);
    setExplanationError(null);
  };

  const reset = () => {
    setValues(emptyValues());
    setTestIndex(-1);
    setEngineResult(null);
    setExplanation(null);
    setExplanationError(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = placeholderAnalyze(values);
    setEngineResult(result);
    setExplanation(null);
    setExplanationError(null);

    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);

    if (!result.ok) {
      return;
    }

    setExplanationLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as AiExplanation;
      setExplanation(data);
    } catch {
      setExplanationError(demo.result.aiErrorFallback);
    } finally {
      setExplanationLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

  return (
    <div className="space-y-6">
      <form
        onSubmit={submit}
        noValidate
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      >
        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="rounded-full border border-brand bg-brand-soft px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand hover:text-white"
          >
            {demo.testDataLabel}
            {testIndex >= 0 ? ` (${testIndex + 1}/${testRecords.length})` : ""}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-slate-100"
          >
            {demo.resetLabel}
          </button>
        </div>

        {/* Grouped fields */}
        {demo.groups.map((group) => (
          <fieldset key={group.title} className="space-y-3">
            <legend className="text-sm font-bold text-ink">{group.title}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.fields.map((fieldName) => {
                const field = fieldMap.get(fieldName);
                if (!field) return null;
                const isFullWidth = field.type === "textarea" || field.name === "conveyorSignals";

                return (
                  <label key={field.name} className={`block ${isFullWidth ? "sm:col-span-2" : ""}`}>
                    <span className="mb-1 block text-xs font-medium text-ink sm:text-sm">
                      {field.label}
                      {field.required && <span className="text-brand"> *</span>}
                    </span>

                    {field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={values[field.name] ?? ""}
                        onChange={(e) => update(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={values[field.name] ?? ""}
                        onChange={(e) => update(field.name, e.target.value)}
                        className={inputClass}
                      >
                        <option value="">{demo.selectPlaceholder}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {demo.optionLabels[option] ?? option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type === "number" ? "number" : "text"}
                        inputMode={field.type === "number" ? "decimal" : undefined}
                        step={field.type === "number" ? "any" : undefined}
                        value={values[field.name] ?? ""}
                        onChange={(e) => update(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    )}
                    {field.help && <span className="mt-1 block text-xs text-muted">{field.help}</span>}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="space-y-2 pt-2">
          <button
            type="submit"
            disabled={explanationLoading}
            className="w-full rounded-xl bg-brand px-4 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
          >
            {explanationLoading ? demo.loadingLabel : demo.submitLabel}
          </button>
          <p className="text-center text-xs text-muted">{demo.disclaimer}</p>
        </div>
      </form>

      <div ref={resultRef} aria-live="polite">
        {engineResult && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-ink">{demo.resultTitle}</h2>
            <ResultView
              engine={engineResult}
              explanation={explanation}
              explanationLoading={explanationLoading}
              explanationError={explanationError}
              input={values as PalletizerFormValues}
            />
          </div>
        )}
      </div>
    </div>
  );
}
