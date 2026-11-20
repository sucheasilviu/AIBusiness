"use client";

// The main function: form -> /api/ai -> result. Owner: gemini-silviu (UI) + codex-silviu (API).
import { useRef, useState } from "react";
import ResultView from "@/components/ResultView";
import { demo } from "@/lib/content";
import { nextTestInput } from "@/lib/fake-data";
import type { AiResponse, DemoInput, FormField } from "@/lib/types";

const fields: FormField[] = demo.fields;
const emptyValues = (): DemoInput => Object.fromEntries(fields.map((f) => [f.name, ""]));

export default function DemoForm() {
  const [values, setValues] = useState<DemoInput>(emptyValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AiResponse | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const update = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const fillTestData = () => {
    setValues({ ...emptyValues(), ...nextTestInput() });
    setError(null);
  };

  const reset = () => {
    setValues(emptyValues());
    setResponse(null);
    setError(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const missing = fields.filter((f) => f.required && !values[f.name]?.trim());
    if (missing.length > 0) {
      setError(`Completează: ${missing.map((f) => f.label).join(", ")}.`);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as AiResponse;
      setResponse(data);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    } catch {
      setError("Nu am putut obține rezultatul. Verifică conexiunea și încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={fillTestData}
            className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-soft"
          >
            {demo.testDataLabel}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-slate-100"
          >
            {demo.resetLabel}
          </button>
        </div>

        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-1 block text-sm font-medium text-ink">
              {field.label}
              {field.required && <span className="text-brand"> *</span>}
            </span>
            {field.type === "textarea" ? (
              <textarea
                rows={4}
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
                <option value="">Alege…</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === "number" ? "number" : "text"}
                inputMode={field.type === "number" ? "numeric" : undefined}
                value={values[field.name] ?? ""}
                onChange={(e) => update(field.name, e.target.value)}
                placeholder={field.placeholder}
                className={inputClass}
              />
            )}
            {field.help && <span className="mt-1 block text-xs text-muted">{field.help}</span>}
          </label>
        ))}

        {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? demo.loadingLabel : demo.submitLabel}
        </button>
        <p className="text-center text-xs text-muted">{demo.disclaimer}</p>
      </form>

      <div ref={resultRef} aria-live="polite">
        {loading && (
          <div className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-muted">
            {demo.loadingLabel}
          </div>
        )}
        {!loading && response && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-ink">{demo.resultTitle}</h2>
            <ResultView response={response} />
          </div>
        )}
      </div>
    </div>
  );
}
