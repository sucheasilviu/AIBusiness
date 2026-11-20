// Every text a judge sees lives here. Romanian, with diacritics (ă â î ș ț).
// Owner: gemini-silviu. Retarget the product by editing this file first.
// The example product below (IdeaCheck) is a placeholder: replace it at kickoff.

import type { FormField } from "./types";

export const site = {
  name: "IdeaCheck",
  team: "Sick7",
  tagline: "Află în 30 de secunde dacă ideea ta de afacere are șanse.",
  description: "Prototip demonstrativ realizat la AI Business Challenge 2026.",
  nav: [
    { href: "/#solutie", label: "Soluția" },
    { href: "/#cum-functioneaza", label: "Cum funcționează" },
    { href: "/#preturi", label: "Prețuri" },
  ],
  primaryCta: { href: "/demo", label: "Încearcă demo" },
};

export const landing = {
  hero: {
    eyebrow: "Prototip AI · Echipa Sick7",
    title: "Validează-ți ideea de afacere înainte să investești",
    subtitle:
      "Descrii ideea, iar asistentul AI îți arată punctele forte, riscurile și primul pas concret, adaptat pieței din România.",
    secondaryCta: { href: "/#cum-functioneaza", label: "Cum funcționează" },
  },
  problem: {
    id: "problema",
    title: "Problema",
    text: "Mulți antreprenori la început de drum investesc timp și bani într-o idee fără să o fi verificat. Consultanța costă, iar informațiile sunt împrăștiate.",
    stats: [
      { value: "3 din 5", label: "idei pornesc fără nicio validare (estimare)" },
      { value: "2.000+ lei", label: "costul mediu al unei consultanțe inițiale (estimare)" },
      { value: "săptămâni", label: "până la primul feedback real" },
    ],
  },
  solution: {
    id: "solutie",
    title: "Soluția",
    items: [
      { icon: "⚡", title: "Analiză în 30 de secunde", text: "Completezi un formular scurt și primești o evaluare structurată." },
      { icon: "🎯", title: "Adaptată României", text: "Ține cont de oraș, buget și publicul tău țintă." },
      { icon: "🧭", title: "Pasul următor clar", text: "Nu doar scor: primești o acțiune concretă pentru săptămâna asta." },
    ],
  },
  steps: {
    id: "cum-functioneaza",
    title: "Cum funcționează",
    items: [
      "Descrii ideea, publicul și bugetul.",
      "Modelul AI analizează ideea după criterii de piață.",
      "Primești scor, puncte forte, riscuri și pasul următor.",
    ],
  },
  pricing: {
    id: "preturi",
    title: "Prețuri",
    plans: [
      { name: "Gratuit", price: "0 lei", period: "", features: ["3 analize pe lună", "Scor și pas următor"], highlighted: false },
      { name: "Pro", price: "29 lei", period: "/lună", features: ["Analize nelimitate", "Raport descărcabil", "Comparare între idei"], highlighted: true },
      { name: "Incubatoare", price: "Ofertă", period: "", features: ["Conturi pentru echipe", "Panou de administrare"], highlighted: false },
    ],
  },
  finalCta: {
    title: "Testează acum, cu date fictive",
    text: "Durează 30 de secunde. Nu ai nevoie de cont.",
  },
};

export const demo = {
  title: "Analizează o idee de afacere",
  intro: "Completează formularul sau apasă „Completează cu date de test”.",
  submitLabel: "Analizează cu AI",
  loadingLabel: "Analizăm ideea…",
  testDataLabel: "Completează cu date de test",
  resetLabel: "Golește formularul",
  resultTitle: "Rezultatul analizei",
  disclaimer: "Folosește doar date fictive. Prototip demonstrativ.",
  fields: [
    {
      name: "idea",
      label: "Descrie ideea",
      type: "textarea",
      placeholder: "Ex.: o aplicație care conectează studenții cu meditatori verificați…",
      required: true,
    },
    { name: "audience", label: "Cui se adresează?", type: "text", placeholder: "Ex.: elevi de liceu din orașe mari", required: true },
    { name: "budget", label: "Buget de pornire (lei)", type: "number", placeholder: "Ex.: 15000" },
    {
      name: "city",
      label: "Unde lansezi?",
      type: "select",
      options: ["București", "Cluj-Napoca", "Iași", "Timișoara", "Constanța", "Brașov", "Online, la nivel național"],
    },
  ] satisfies FormField[],
};

export const howToTest = {
  title: "Cum testezi (30 de secunde)",
  steps: [
    "Deschide pagina „Încearcă demo”.",
    "Apasă „Completează cu date de test”.",
    "Apasă „Analizează cu AI” și citește rezultatul.",
  ],
};

export const footer = {
  text: "Prototip realizat de echipa Sick7 la AI Business Challenge 2026. Toate datele sunt fictive.",
};
