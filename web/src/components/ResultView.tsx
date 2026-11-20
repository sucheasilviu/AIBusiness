// Renders the AI result. Works for the generic AiResult shape (title, summary, score, items, nextStep).
import type { AiResponse } from "@/lib/types";

const TAG_STYLES: Record<string, string> = {
  "punct forte": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  risc: "bg-amber-50 text-amber-800 ring-amber-200",
  recomandare: "bg-brand-soft text-brand-dark ring-brand/30",
};

export default function ResultView({ response, compact = false }: { response: AiResponse; compact?: boolean }) {
  const { result, source, model } = response;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-ink">{result.title}</h3>
          <p className="mt-2 text-muted">{result.summary}</p>
        </div>
        {typeof result.score === "number" && (
          <div className="shrink-0 rounded-2xl bg-brand px-4 py-3 text-center text-white">
            <div className="text-3xl font-extrabold leading-none">{result.score}</div>
            <div className="mt-1 text-xs opacity-90">{result.scoreLabel ?? "din 100"}</div>
          </div>
        )}
      </div>

      {result.items.length > 0 && (
        <ul className={`mt-5 grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
          {result.items.map((item, index) => (
            <li key={`${item.title}-${index}`} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              {item.tag && (
                <span
                  className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
                    TAG_STYLES[item.tag.toLowerCase()] ?? "bg-slate-100 text-slate-700 ring-slate-200"
                  }`}
                >
                  {item.tag}
                </span>
              )}
              <p className="font-semibold text-ink">{item.title}</p>
              <p className="text-sm text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      )}

      {result.nextStep && (
        <div className="mt-5 rounded-xl border-l-4 border-brand bg-brand-soft p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">Pasul următor</p>
          <p className="mt-1 text-ink">{result.nextStep}</p>
        </div>
      )}

      {!compact && (
        <p className="mt-4 text-xs text-muted">
          {source === "gemini"
            ? `Generat cu Google Gemini${model ? ` (${model})` : ""}. Verifică informațiile înainte de decizii importante.`
            : "Rezultat demonstrativ: modelul AI nu este disponibil momentan, așa că afișăm un exemplu."}
        </p>
      )}
    </div>
  );
}
