"use client";

// Main demo screen: form -> deterministic engine (palletizer.ts) -> /api/ai -> ResultView.
// Owner: gemini-silviu (UI). Engine: codex-silviu (web/src/lib/palletizer.ts).
import { useRef, useState } from "react";
import ResultView from "@/components/ResultView";
import testInputsRaw from "@/data/test-inputs.json";
import { demo } from "@/lib/content";
import { analyze } from "@/lib/palletizer";
import type { AiExplanation, EngineResult, FormField, PalletizerFormValues } from "@/lib/types";

const fieldMap = new Map<string, FormField>(demo.fields.map((f) => [f.name, f]));

const emptyValues = (): Record<string, string> =>
  Object.fromEntries(demo.fields.map((f) => [f.name, f.name === "industry" ? "umpluturi" : ""]));

// Built-in fictional fallback records used only if src/data/test-inputs.json lacks PaletScan keys.
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

    const result = analyze(values as PalletizerFormValues);
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
