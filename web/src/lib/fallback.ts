// Romanian fallback explanations. Owner: codex-silviu.

import type { AiExplanation, AiResult, DemoInput, EngineResult, Verdict } from "./types";

const verdictSummaries: Record<Verdict, string> = {
  potrivit: "Linia este potrivită conform criteriilor verificate.",
  evaluare: "Linia necesită evaluare tehnică înainte de alegerea celulei de paletizare.",
  nepotrivit: "Linia este nepotrivită pentru configurația evaluată.",
};

export function fallbackExplanation({ verdict, criteria, cycle }: EngineResult): AiExplanation {
  const mainCriterion = criteria.find(({ status }) => status === "nepotrivit")
    ?? criteria.find(({ status }) => status === "evaluare")
    ?? criteria[0];
  const summary = verdict ? verdictSummaries[verdict] : "Verifică datele de intrare pentru a obține o evaluare a liniei.";
  const throughputQuestion = cycle?.bottleneck === "robot"
    ? "Ce variații de ritm trebuie să preia un tampon între linie și robot?"
    : "Cum variază ritmul de ieșire a găleților între produse și ture?";
  return {
    source: "fallback",
    summary: mainCriterion && verdict ? `${summary} ${mainCriterion.detail}` : summary,
    questions: [
      "Ce tipuri de găleți și mânere trebuie să prindă robotul în producție?",
      throughputQuestion,
      "Cum sunt schimbate paleții și ce spațiu rămâne disponibil în jurul transportorului?",
    ],
  };
}

// Used by the starter landing preview until T05 replaces that page.
export function fallbackResult(input: DemoInput): AiResult {
  const idea = (input.idea || "ideea ta").trim();
  const shortIdea = idea.length > 60 ? `${idea.slice(0, 57)}…` : idea;
  const city = input.city || "orașul ales";
  const rawAudience = (input.audience || "publicul țintă").trim();
  const audience = rawAudience.charAt(0).toLowerCase() + rawAudience.slice(1);

  return {
    title: "Idee promițătoare, de validat rapid",
    summary: `„${shortIdea}” răspunde unei nevoi reale pentru ${audience}. Cel mai mare risc este costul de atragere a primilor clienți în ${city}, așa că merită un test mic înainte de investiții mari.`,
    score: 72,
    scoreLabel: "Potențial bun",
    items: [
      { tag: "punct forte", title: "Nevoie clară", detail: "Problema este ușor de explicat și de recunoscut de publicul țintă." },
      { tag: "punct forte", title: "Pornire ieftină", detail: "Un prototip simplu poate fi testat cu buget mic, în câteva săptămâni." },
      { tag: "risc", title: "Concurență indirectă", detail: "Clienții folosesc deja soluții improvizate; trebuie arătat clar de ce ești mai bun." },
      { tag: "risc", title: "Cost de achiziție", detail: "Primii 100 de clienți pot costa mai mult decât estimezi; testează canalele devreme." },
      { tag: "recomandare", title: "Pagină de precomandă", detail: "Lansează o pagină simplă cu ofertă și măsoară câți lasă adresa de e-mail." },
    ],
    nextStep: "Vorbește în această săptămână cu 10 oameni din publicul țintă și notează cât ar plăti.",
  };
}
