// Every text a judge sees lives here. Romanian, with diacritics (ă â î ș ț).
// Owner: gemini-silviu. Single source of copy for PaletScan UR20 (DESCRIPTION.md).

import type { FormField } from "./types";

export const site = {
  name: "PaletScan UR20",
  team: "Sick7",
  tagline: "Fotografiază găleata. Vezi paletul. Cere oferta.",
  description:
    "Fotografiezi găleata, vezi paletul și afli dacă UR20 se potrivește liniei tale de ingrediente pentru panificație și cofetărie.",
  nav: [
    { href: "/#problema", label: "Problema" },
    { href: "/#cum-functioneaza", label: "Cum funcționează" },
    { href: "/#rezultat", label: "Ce primești" },
    { href: "/#puratos", label: "Rezultate de test" },
  ],
  primaryCta: { href: "/demo", label: "Verifică linia ta" },
};

export const landing = {
  hero: {
    eyebrow: "Ingrediente de panificație și cofetărie · Celulă UR20",
    title: "Fotografiază găleata. Vezi paletul. Cere oferta.",
    subtitle:
      "Află direct de pe telefon dacă o celulă de paletizare UR20 se potrivește liniei tale de umpluturi, creme, glazuri sau amelioratori în găleți de 5–13 kg.",
    secondaryCta: { href: "/#cum-functioneaza", label: "Cum funcționează" },
    preview: {
      badge: "Exemplu demonstrativ",
      verdict: "Potrivit",
      title: "Găleată 13 kg · Palet EUR (1200×800)",
      summary:
        "Linia de 6 găleți/min se încadrează sub ritmul robotului UR20 (7,4 găleți/min — rezultat de test PURATOS).",
      metrics: [
        { label: "Pe strat", value: "8 găleți" },
        { label: "Total palet", value: "32 găleți" },
        { label: "Ritm efectiv", value: "360 / oră" },
        { label: "Blocaj", value: "Linia" },
      ],
      note: "Verdictul și schema de paletizare vin din reguli fixe verificabile, nu din AI.",
    },
  },
  problem: {
    id: "problema",
    title: "De ce paletizarea manuală blochează linia",
    text: "La producătorii de ingrediente pentru panificație și cofetărie (umpluturi, creme, glazuri, amelioratori), produsul finit iese în găleți de 5 kg și 13 kg, iar paletizarea se face adesea manual. Directorul de producție nu are o cale rapidă să afle dacă o celulă robotizată se potrivește liniei fără o vizită tehnică, iar integratorul pierde timp cu cereri vagi, fără date.",
    stats: [
      {
        value: "2 operatori / tură",
        label: "paletizare manuală în 2–3 ture pe zi înainte de automatizare (studiu de caz PURATOS, Tech-Con)",
      },
      {
        value: "~4,7 tone / oră",
        label: "ridicate manual la 6 găleți/min × 13 kg (calcul: 6 × 60 × 13 kg)",
      },
      {
        value: "5–13 kg",
        label: "gama de găleți de umpluturi, creme și glazuri testată cu celula UR20",
      },
    ],
  },
  steps: {
    id: "cum-functioneaza",
    title: "Cum funcționează",
    subtitle: "Trei pași simpli, direct de pe telefon. Nu ai nevoie de cont.",
    items: [
      {
        title: "Fotografiezi găleata și completezi datele liniei",
        text: "AI-ul sugerează forma, mânerul și materialul; tu confirmi sau corectezi fiecare sugestie și introduci greutatea, dimensiunile și ritmul liniei.",
      },
      {
        title: "Motorul de reguli calculează paletul și ritmul",
        text: "Un calcul cu reguli fixe (nu AI) desenează așezarea pe palet, compară ritmul liniei cu ritmurile testate și arată unde este blocajul.",
      },
      {
        title: "Primești verdictul și cererea tehnică completă",
        text: "Vezi motivul pentru fiecare criteriu, explicația AI, 3 întrebări pentru discuția tehnică și rezumatul cererii gata de copiat.",
      },
    ],
  },
  resultOverview: {
    id: "rezultat",
    title: "Ce conține rezultatul evaluării",
    subtitle: "Date concrete pentru directorul de producție și pentru prima discuție tehnică cu Tech-Con.",
    items: [
      {
        tag: "Reguli fixe",
        title: "Verdict și motiv pe fiecare criteriu",
        text: "Potrivit, Necesită evaluare sau Nepotrivit — verificat pe sarcină, dimensiuni, mâner, ritm, spațiu pentru 2 paleți și semnalele transportorului.",
      },
      {
        tag: "Schemă 2D",
        title: "Desenul paletului și numărul de straturi",
        text: "Vedere de sus cu poziția găleților pe palet EUR sau industrial, straturile, totalul de găleți și greutatea estimată a paletului.",
      },
      {
        tag: "Ritm linie",
        title: "Comparație linie vs. robot și blocajul",
        text: "Găleți/minut și găleți/oră, indicarea blocajului (linia sau robotul) și verificarea timpului de schimbare a paletului.",
      },
      {
        tag: "Cerere completă",
        title: "Explicație AI, 3 întrebări și rezumat de copiat",
        text: "AI-ul explică verdictul pe baza cifrelor din motor, propune 3 întrebări pentru întâlnirea tehnică și pregătește cererea gata de copiat.",
      },
    ],
  },
  puratos: {
    id: "puratos",
    eyebrow: "Referință din aceeași industrie · Rezultate de test",
    title: "Cifre din studiul de caz PURATOS (rezultate de test)",
    text: "Valorile de mai jos sunt rezultate de test măsurate la implementarea celulei UR20 la PURATOS (producător de ingrediente pentru panificație și cofetărie), nu garanții pentru orice linie. Fiecare linie se evaluează pe datele ei reale.",
    facts: [
      {
        value: "7,4 găleți / min",
        label: "pentru găleți de 13 kg — rezultat de test PURATOS",
      },
      {
        value: "8,6 găleți / min",
        label: "pentru găleți de 5 kg — rezultat de test PURATOS",
      },
      {
        value: "2 celule UR20",
        label: "integrate la PURATOS pentru paletizarea găleților (studiu de caz Tech-Con)",
      },
    ],
    disclaimer:
      "Rezultate de test, nu garanții. AI-ul nu decide verdictul și nu măsoară greutatea sau dimensiunile din fotografie.",
  },
  finalCta: {
    title: "Verifică linia ta în mai puțin de un minut",
    text: "Testează direct în browser cu date fictive de test. Nu ai nevoie de cont.",
  },
};

export const demo = {
  title: "Verifică linia de paletizare UR20",
  intro: "Completează datele liniei de găleți sau apasă „Completează cu date de test” pentru a rula un exemplu fictiv.",
  submitLabel: "Analizează linia",
  loadingLabel: "Analizăm linia…",
  testDataLabel: "Completează cu date de test",
  resetLabel: "Golește formularul",
  resultTitle: "Rezultatul evaluării UR20",
  disclaimer: "Folosește doar date fictive. Trimiterea cererii este simulată în acest prototip demonstrativ.",
  fields: [
    {
      name: "companyName",
      label: "Firma (fictivă)",
      type: "text",
      placeholder: "Ex.: Patiseria Demo SRL",
      required: true,
    },
    {
      name: "industry",
      label: "Produs ambalat",
      type: "select",
      options: ["umpluturi", "creme", "glazuri", "amelioratori", "alta"],
      required: true,
    },
    {
      name: "bucketWeightKg",
      label: "Greutatea găleții pline (kg)",
      type: "number",
      placeholder: "Ex.: 13",
      required: true,
    },
    {
      name: "bucketDiameterMm",
      label: "Diametru sus / latura (mm)",
      type: "number",
      placeholder: "Ex.: 300",
      required: true,
    },
    {
      name: "bucketHeightMm",
      label: "Înălțimea găleții (mm)",
      type: "number",
      placeholder: "Ex.: 320",
      required: true,
    },
    {
      name: "shape",
      label: "Forma găleții",
      type: "select",
      options: ["rotunda", "patrata"],
      required: true,
    },
    {
      name: "handle",
      label: "Mâner",
      type: "select",
      options: ["metal", "plastic", "fara"],
      required: true,
    },
    {
      name: "material",
      label: "Material",
      type: "select",
      options: ["plastic", "metal"],
      required: true,
    },
    {
      name: "lineRatePerMin",
      label: "Ritmul liniei (găleți/minut)",
      type: "number",
      placeholder: "Ex.: 6",
      required: true,
    },
    {
      name: "shiftsPerDay",
      label: "Ture pe zi",
      type: "select",
      options: ["1", "2", "3"],
      required: true,
    },
    {
      name: "palletType",
      label: "Tip palet",
      type: "select",
      options: ["eur", "industrial"],
      required: true,
    },
    {
      name: "maxPalletHeightMm",
      label: "Înălțime maximă palet încărcat (mm)",
      type: "number",
      placeholder: "Ex.: 1600",
      required: true,
    },
    {
      name: "palletChangeMin",
      label: "Timp schimbare palet, manual (minute)",
      type: "number",
      placeholder: "Ex.: 4",
      required: true,
    },
    {
      name: "separator",
      label: "Separator între straturi",
      type: "select",
      options: ["da", "nu"],
      required: true,
    },
    {
      name: "twoPalletSpace",
      label: "Loc pentru 2 poziții de paletizare",
      type: "select",
      options: ["da", "nu", "nu_stiu"],
      required: true,
    },
    {
      name: "conveyorSignals",
      label: "Transportorul are semnale de proces (start/stop)",
      type: "select",
      options: ["da", "nu", "nu_stiu"],
      required: true,
    },
    {
      name: "notes",
      label: "Observații (opțional)",
      type: "textarea",
      placeholder: "Ex.: Linie nouă din 2027",
    },
  ] satisfies FormField[],
};

export const howToTest = {
  title: "Cum testezi (sub 1 minut)",
  steps: [
    "Apasă „Verifică linia ta” pentru a deschide pagina de evaluare.",
    "Apasă „Completează cu date de test” (sau folosește poza de test).",
    "Apasă „Analizează linia” și citește verdictul, desenul paletului și ritmul.",
    "Apasă „Pregătește cererea” pentru a copia rezumatul tehnic.",
  ],
};

export const footer = {
  text: "PaletScan UR20 · Prototip demonstrativ realizat de echipa Sick7 la AI Business Challenge 2026. Toate datele sunt fictive; trimiterea cererii este simulată.",
};
