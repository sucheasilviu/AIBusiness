"use client";

// Renders the PaletScan UR20 engine result, AI explanation and copyable request summary.
// Owner: gemini-silviu.
import { useState } from "react";
import PalletView from "@/components/PalletView";
import { demo } from "@/lib/content";
import type { AiExplanation, EngineResult, PalletizerFormValues, Verdict } from "@/lib/types";

const VERDICT_STYLES: Record<Verdict, { container: string; badge: string }> = {
  potrivit: {
    container: "border-emerald-200 bg-emerald-50/70",
    badge: "bg-emerald-600 text-white",
  },
  evaluare: {
    container: "border-amber-200 bg-amber-50/70",
    badge: "bg-amber-600 text-white",
  },
  nepotrivit: {
    container: "border-red-200 bg-red-50/70",
    badge: "bg-red-600 text-white",
  },
};

const CRITERION_STYLES: Record<"ok" | "evaluare" | "nepotrivit", string> = {
  ok: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  evaluare: "bg-amber-50 text-amber-800 ring-amber-200",
  nepotrivit: "bg-red-50 text-red-700 ring-red-200",
};

function fmt(n: number, decimals = 1): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(decimals).replace(/\.0+$/, "");
}

function labelOf(value: string | number | undefined): string {
  if (value === undefined || value === "") return "—";
  const key = String(value);
  return demo.optionLabels[key] ?? key;
}

function buildRequestSummary(
  input: PalletizerFormValues,
  engine: EngineResult,
  explanation: AiExplanation | null,
): string {
  const r = demo.result;
  const verdictText = engine.verdict ? r.verdicts[engine.verdict].title : "—";
  const lines: string[] = [
    "CERERE EVALUARE TEHNICĂ — CELULĂ PALETIZARE UR20 (PaletScan)",
    `Firmă: ${labelOf(input.companyName)}`,
    `Produs ambalat: ${labelOf(input.industry)}`,
    "",
    "Date găleată:",
    `- Greutate plină: ${labelOf(input.bucketWeightKg)} kg`,
    `- Dimensiuni: Ø/latură ${labelOf(input.bucketDiameterMm)} mm × înălțime ${labelOf(input.bucketHeightMm)} mm`,
    `- Formă / Mâner / Material: ${labelOf(input.shape)} / ${labelOf(input.handle)} / ${labelOf(input.material)}`,
    "",
    "Date linie și palet:",
    `- Ritm linie: ${labelOf(input.lineRatePerMin)} găleți/min · ${labelOf(input.shiftsPerDay)}`,
    `- Palet: ${labelOf(input.palletType)} · H max ${labelOf(input.maxPalletHeightMm)} mm · Separator: ${labelOf(input.separator)}`,
    `- Schimbare palet: ${labelOf(input.palletChangeMin)} min · 2 poziții: ${labelOf(input.twoPalletSpace)} · Semnale transportor: ${labelOf(input.conveyorSignals)}`,
  ];

  if (input.notes && String(input.notes).trim()) {
    lines.push(`- Observații: ${String(input.notes).trim()}`);
  }

  lines.push("", `Verdict preliminar (reguli fixe): ${verdictText}`);

  if (engine.pattern) {
    lines.push(
      `Estimare palet: ${engine.pattern.perLayer} găleți/strat × ${engine.pattern.layers} straturi = ${engine.pattern.perPallet} găleți/palet (${engine.pattern.palletKg} kg).`,
    );
  }
  if (engine.cycle) {
    lines.push(
      `Ritm (estimare pe baza rezultatelor de test PURATOS): linie ${fmt(engine.cycle.lineRate)}/min vs. robot ${fmt(engine.cycle.robotRate)}/min → efectiv ${fmt(engine.cycle.effectiveRate)}/min (${Math.round(engine.cycle.bucketsPerHour)} găleți/h), blocaj: ${r.bottlenecks[engine.cycle.bottleneck]}.`,
    );
  }

  const flagged = engine.criteria.filter((c) => c.status !== "ok");
  if (flagged.length > 0) {
    lines.push("", "Puncte de verificat:");
    flagged.forEach((c) => lines.push(`- [${r.criterionStatus[c.status]}] ${c.label}: ${c.detail}`));
  }

  if (explanation?.questions?.length) {
    lines.push("", "Întrebări pentru discuția tehnică:");
    explanation.questions.forEach((q, idx) => lines.push(`${idx + 1}. ${q}`));
  }

  return lines.join("\n");
}

interface ResultViewProps {
  engine: EngineResult;
  explanation: AiExplanation | null;
  explanationLoading: boolean;
  explanationError?: string | null;
  input: PalletizerFormValues;
}

export default function ResultView({
  engine,
  explanation,
  explanationLoading,
  explanationError,
  input,
}: ResultViewProps) {
  const [showRequest, setShowRequest] = useState(false);
  const [copied, setCopied] = useState(false);
  const r = demo.result;

  // Invalid / missing data: show errors list and NO verdict.
  if (!engine.ok || !engine.verdict) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50/80 p-5 shadow-sm sm:p-6">
        <h3 className="text-lg font-bold text-red-900">{r.errorsTitle}</h3>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-red-800">
          {engine.errors.map((err, idx) => (
            <li key={`${err}-${idx}`}>{err}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-red-700">{r.errorsHint}</p>
      </div>
    );
  }

  const verdictStyle = VERDICT_STYLES[engine.verdict];
  const verdictCopy = r.verdicts[engine.verdict];
  const requestText = buildRequestSummary(input, engine, explanation);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Verdict banner */}
      <div className={`rounded-2xl border p-5 shadow-sm sm:p-6 ${verdictStyle.container}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{r.verdictLabel}</p>
            <h3 className="mt-1 text-2xl font-extrabold text-ink">{verdictCopy.title}</h3>
            <p className="mt-1 text-sm text-muted">{verdictCopy.subtitle}</p>
          </div>
          <span className={`rounded-full px-4 py-1.5 text-sm font-bold shadow-xs ${verdictStyle.badge}`}>
            {verdictCopy.title}
          </span>
        </div>
      </div>

      {/* Criteria list */}
      {engine.criteria.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h4 className="text-base font-bold text-ink">{r.criteriaTitle}</h4>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {engine.criteria.map((c) => (
              <li key={c.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">{c.label}</span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${CRITERION_STYLES[c.status]}`}
                  >
                    {r.criterionStatus[c.status]}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{c.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Pallet drawing & summary (T32) */}
      {engine.pattern && (
        <PalletView
          pattern={engine.pattern}
          bucketHeightMm={Number(input.bucketHeightMm) || 300}
          shape={input.shape === "patrata" ? "patrata" : "rotunda"}
          hasSeparator={input.separator === "da"}
        />
      )}

      {/* Cycle summary (T33 CycleView plugs in here) */}
      {engine.cycle && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-base font-bold text-ink">{r.cycleTitle}</h4>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                engine.cycle.bottleneck === "robot"
                  ? "bg-amber-100 text-amber-900"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {r.cycleMetrics.bottleneck}: {r.bottlenecks[engine.cycle.bottleneck]}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
              <div className="text-xs text-muted">{r.cycleMetrics.lineRate}</div>
              <div className="mt-0.5 text-lg font-extrabold text-ink">
                {fmt(engine.cycle.lineRate)}{" "}
                <span className="text-xs font-normal text-muted">{r.cycleMetrics.unitPerMin}</span>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
              <div className="text-xs text-muted">{r.cycleMetrics.robotRate}</div>
              <div className="mt-0.5 text-lg font-extrabold text-brand-dark">
                {fmt(engine.cycle.robotRate)}{" "}
                <span className="text-xs font-normal text-muted">{r.cycleMetrics.unitPerMin}</span>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
              <div className="text-xs text-muted">{r.cycleMetrics.bucketsPerHour}</div>
              <div className="mt-0.5 text-lg font-extrabold text-ink">
                {Math.round(engine.cycle.bucketsPerHour)}{" "}
                <span className="text-xs font-normal text-muted">{r.cycleMetrics.unitPerHour}</span>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
              <div className="text-xs text-muted">{r.cycleMetrics.palletFill}</div>
              <div className="mt-0.5 text-lg font-extrabold text-ink">
                {fmt(engine.cycle.palletFillMin)}{" "}
                <span className="text-xs font-normal text-muted">{r.cycleMetrics.unitMin}</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
            <span>
              {r.cycleMetrics.robotIdle}: <strong className="text-ink">{Math.round(engine.cycle.robotIdlePct)}%</strong>
            </span>
            <span>
              {r.cycleMetrics.palletsPerShift}: <strong className="text-ink">{fmt(engine.cycle.palletsPerShift)}</strong>
            </span>
            <span className={engine.cycle.changeOk ? "text-emerald-700" : "text-amber-800 font-medium"}>
              {engine.cycle.changeOk ? r.cycleMetrics.changeOk : r.cycleMetrics.changeWarn}
            </span>
          </div>
        </section>
      )}

      {/* AI explanation & 3 questions */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h4 className="text-base font-bold text-ink">{r.aiTitle}</h4>

        {explanationLoading && (
          <div className="mt-3 animate-pulse rounded-xl bg-slate-50 p-4 text-sm text-muted">{r.aiLoading}</div>
        )}

        {!explanationLoading && explanationError && (
          <p className="mt-3 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs text-amber-900">{explanationError}</p>
        )}

        {!explanationLoading && explanation && (
          <div className="mt-3 space-y-4">
            <p className="text-sm leading-relaxed text-ink">{explanation.summary}</p>
            {explanation.questions.length > 0 && (
              <div className="rounded-xl border-l-4 border-brand bg-brand-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                  {r.aiQuestionsTitle}
                </p>
                <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-ink">
                  {explanation.questions.map((q, idx) => (
                    <li key={`${q}-${idx}`}>{q}</li>
                  ))}
                </ol>
              </div>
            )}
            <p className="text-xs text-muted">
              {explanation.source === "ai" ? r.aiSourceLive : r.aiSourceFallback}
            </p>
          </div>
        )}
      </section>

      {/* Prepare & copy technical request */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowRequest((v) => !v)}
            className="w-full rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            {showRequest ? r.requestHideButton : r.requestButton}
          </button>
          {showRequest && (
            <button
              type="button"
              onClick={handleCopy}
              className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:w-auto"
            >
              {copied ? r.copiedButton : r.copyButton}
            </button>
          )}
        </div>

        {showRequest && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-ink">{r.requestTitle}</p>
            <pre className="max-h-80 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-ink">
              {requestText}
            </pre>
            <p className="text-xs text-muted">{r.requestSimulatedNote}</p>
          </div>
        )}
      </section>
    </div>
  );
}
