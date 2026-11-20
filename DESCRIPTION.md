# DESCRIPTION: product spec (single source of truth)
> **Status: v1.1, 2026-11-20 (claude).** Idea: **A, PaletScan UR20**. After mentor check 1: **one industry, bakery & pastry ingredients** (same industry as PURATOS).
> Agents: if your task contradicts this file, this file wins. Tell your human.
> Sections marked (RO) are written in Romanian because they are copied into deliverables.

## 1. Identity
- **Name:** PaletScan UR20
- **One-liner (RO, max 12 words):** Introduci datele găleții, vezi paletul și afli dacă UR20 se potrivește. *(13:08: photo scanning cut; it may appear only as „în curând”.)*
- **Industry focus:** Romanian producers of **bakery and pastry ingredients** (fillings, creams, glazes, improvers) packed in 5–13 kg buckets. This is PURATOS's own industry, so the PURATOS test results are the reference a prospect recognises. Other bucket industries come only as the national-scaling step.
- **How it answers today's brief:** a phone-friendly tool that helps an industrial client **understand, evaluate and request** a UR20 bucket-palletizing cell like the PURATOS one. Its output is a **relevant request** (segment + palletizing need + enough data for a technical discussion), which is exactly the unit our 30,000 EUR acquisition funnel is measured on.

## 2. Problem (RO)
La producătorii de ingrediente pentru panificație și cofetărie (umpluturi, creme, glazuri, amelioratori), produsul finit iese în găleți de 5 kg și 13 kg, iar paletizarea se face adesea manual: în cazul PURATOS, înainte de automatizare, erau 2 operatori pe tură, în 2–3 ture pe zi (sursa: studiul de caz Tech-Con). La un ritm de 6 găleți/minut cu găleți de 13 kg, asta înseamnă aproximativ 4,7 tone ridicate manual pe oră (calcul: 6 × 60 × 13 kg). Directorul de producție nu are o cale rapidă să afle dacă o celulă robotizată se potrivește liniei lui fără o vizită tehnică, iar integratorul pierde timp cu cereri vagi, fără date.

## 3. Target audience (RO)
- **Segment principal (cine folosește):** producătorii din România de ingrediente pentru panificație și cofetărie care ambalează în găleți de plastic de 5–13 kg (umpluturi, creme, glazuri, amelioratori). **Decidentul:** directorul de producție / directorul de fabrică; avizează directorul de investiții.
- **Scalare națională (pasul următor, nu acum):** alte industrii cu găleți în limitele testate (ex. lactate, creme), după ce avem primii clienți din panificație.
- **Cine plătește:** clientul industrial cumpără celula integrată (130.000 EUR) de la Tech-Con. PaletScan este gratuit pentru client; este instrumentul comercial al Tech-Con.
- **Câți sunt / unde îi găsim:** de completat de `gemini-mihai` (T10) cu surse (ex. ListaFirme / ONRC pe coduri CAEN 1071, 1072, 1089, filtrați pe producătorii de ingrediente, nu pe brutării). Îi găsim pe Google Search (căutări „robot paletizare găleți”, „paletizare automată”), LinkedIn (directori de producție din industria ingredientelor de panificație), târguri și asociații de profil din panificație (de verificat în T10).

## 4. Solution (RO)
PaletScan UR20 este o aplicație web pentru telefon, gândită pentru producătorii de ingrediente de panificație, aceeași industrie ca PURATOS. Directorul de producție fotografiază găleata, iar AI-ul sugerează forma, tipul de mâner și materialul; omul confirmă sau corectează fiecare sugestie și introduce greutatea, dimensiunile și ritmul liniei. Un motor de calcul cu reguli fixe (nu AI) desenează modelul de paletizare, estimează câte găleți încap pe palet, compară ritmul liniei cu ritmurile testate la PURATOS (7,4–8,6 găleți/minut), arată unde este blocajul (linia sau robotul) și dă un verdict: **Potrivit**, **Necesită evaluare** sau **Nepotrivit**, cu motivul pentru fiecare criteriu. La final, aplicația pregătește o cerere tehnică completă, pe care Tech-Con o poate evalua fără o primă vizită.

## 5. The main function (the ONE thing judges must be able to test)
- **Input:** optional bucket photo + form (§8) → **AI step:** (a) Gemini vision suggests `shape`, `handle`, `material` with a confidence for each, and the user confirms; (b) Gemini writes a short Romanian explanation + 3 questions for the technical meeting, based on the engine result → **Engine (deterministic, `web/src/lib/palletizer.ts`):** validation, pallet pattern, cycle and bottleneck, verdict per criterion → **Output:** verdict + criteria list + pallet drawing (SVG) + cycle panel + AI explanation + a ready request summary.
- **"It works" means:** on the live link, on a phone, test record 1 gives a verdict, a pallet drawing and a cycle panel in under 10 s. Test record 5 (missing/wrong data) shows the list of problems and no verdict. With no API key or no photo, the same result still appears (AI text from the fallback, form filled by hand).

## 6. Demo flow (max 5 steps; what a judge clicks)
1. Open the link → landing → **„Verifică linia ta”**
2. **„Folosește poza de test”** (or take a photo on the phone) → the AI suggestions appear on the form marked „Sugestie AI · verifică” → the judge confirms or changes them. Or: **„Completează cu date de test”**.
3. **„Analizează linia”**
4. Read the result: verdict, the reason per criterion, pallet drawing (top view + layers), buckets/hour, the bottleneck, the AI explanation and 3 questions for the meeting.
5. **„Pregătește cererea”** → the request summary + „Copiază”. Then load test record 5 → the app lists what is missing or wrong.

## 7. Screens
| Route | Purpose | Owner |
|---|---|---|
| `/` | landing: problem, how it works (3 steps), what the result contains, PURATOS facts (labelled as test results), CTA | gemini-silviu |
| `/demo` | the main function: photo → form → result → request | gemini-silviu (UI) + codex-silviu (logic, API) |
| `/qr` | QR code to the live demo | – (ready) |
| `/api/ai` | POST engine result → AI explanation (or fallback) | codex-silviu |
| `/api/vision` | POST resized photo → AI suggestions (or `source: "fallback"` + "completează manual") | codex-silviu |

## 8. Data
**Form fields** (name → label RO → type → example). Required unless marked optional.
| name | label | type | example |
|---|---|---|---|
| `companyName` | Firma (fictivă) | text | Patiseria Demo SRL |
| `industry` | Produs ambalat | select: `umpluturi`, `creme`, `glazuri`, `amelioratori`, `alta` (default `umpluturi`) | umpluturi |
| `bucketWeightKg` | Greutatea găleții pline (kg) | number | 13 |
| `bucketDiameterMm` | Diametru sus / latura (mm) | number | 300 |
| `bucketHeightMm` | Înălțimea găleții (mm) | number | 320 |
| `shape` | Forma | select: `rotunda`, `patrata` (AI-suggested) | rotunda |
| `handle` | Mâner | select: `metal`, `plastic`, `fara` (AI-suggested) | metal |
| `material` | Material | select: `plastic`, `metal` (AI-suggested) | plastic |
| `lineRatePerMin` | Ritmul liniei (găleți/minut) | number | 6 |
| `shiftsPerDay` | Ture pe zi | select: 1, 2, 3 | 3 |
| `palletType` | Palet | select: `eur` (1200×800), `industrial` (1200×1000) | eur |
| `maxPalletHeightMm` | Înălțime maximă palet încărcat (mm) | number | 1600 |
| `palletChangeMin` | Timp schimbare palet, manual (minute) | number | 4 |
| `separator` | Separator între straturi | select: `da`, `nu` | da |
| `twoPalletSpace` | Loc pentru 2 poziții de paletizare | select: `da`, `nu`, `nu_stiu` | da |
| `conveyorSignals` | Transportorul are semnale de proces (start/stop) | select: `da`, `nu`, `nu_stiu` | nu_stiu |
| `notes` | Observații (opțional) | textarea | „Linie nouă din 2027” |

**Engine rules** (constants in `palletizer.ts`, each with a comment saying where it comes from):
- Payload: UR20 rated payload 20 kg (Universal Robots spec) − gripper **5 kg (estimare)** = 15 kg usable. ≤ 13 kg → OK (tested at PURATOS); 13–15 kg → `evaluare` (above the tested weight); > 15 kg → `nepotrivit`.
- Robot rate: 8.6/min at ≤ 5 kg, 7.4/min at 13 kg (PURATOS tests), linear in between; > 13 kg → 7.4 and flagged "netestat".
- Pallet pattern: best of a square grid and an offset (staggered) grid on the pallet footprint; layers = floor((maxPalletHeightMm − 144 pallet − separator 5 mm/layer if `da`) / bucketHeightMm); total ≤ 1000 kg per pallet (estimare, typical pallet load).
- Cycle: effective rate = min(line, robot). Line > robot → bottleneck `robot` (suggest a 2nd cell or a buffer); line < robot → bottleneck `linie` (robot idle %). Pallet fill time = buckets per pallet ÷ effective rate; with 2 positions the robot doesn't stop if palletChangeMin < fill time, otherwise flag it.
- Criteria → verdict: any `nepotrivit` → **Nepotrivit**; else any `evaluare` (`fara` handle, `patrata` shape, `nu_stiu` answers, weight above tested, no space, robot bottleneck) → **Necesită evaluare**; else **Potrivit**.
- Validation: missing required fields, numbers ≤ 0, weight > 50 kg, diameter outside 150–500 mm, height outside 150–500 mm, line rate > 30/min → `errors[]`, no verdict.

**Result shape** (`web/src/lib/types.ts`):
```ts
type Verdict = "potrivit" | "evaluare" | "nepotrivit";
type Criterion = { id: string; label: string; status: "ok" | "evaluare" | "nepotrivit"; detail: string };
type EngineResult = {
  ok: boolean; errors: string[];              // errors → no verdict
  verdict?: Verdict; criteria: Criterion[];
  pattern?: { perLayer: number; layers: number; perPallet: number; palletKg: number;
              layout: "grid" | "offset"; positions: { x: number; y: number }[]; // mm, for the SVG
              palletMm: { l: number; w: number }; bucketMm: number };
  cycle?: { lineRate: number; robotRate: number; effectiveRate: number; bucketsPerHour: number;
            bottleneck: "linie" | "robot" | "echilibrat"; robotIdlePct: number;
            palletFillMin: number; palletsPerShift: number; changeOk: boolean };
};
type AiExplanation = { summary: string; questions: string[]; source: "ai" | "fallback" };
type VisionSuggestion = { shape?: {value: string; confidence: number}; handle?: {...}; material?: {...};
                          notes: string; source: "ai" | "fallback" };
```
- Test records: `web/src/data/test-inputs.json` (fictional only, 6 records, all fictional bakery-ingredient producers): 1 normal 13 kg → Potrivit · 2 normal 5 kg, 8/min → Potrivit · 3 18 kg → Nepotrivit · 4 5 kg at 11/min → Necesită evaluare (robot bottleneck) · 5 **missing/wrong data** (empty weight, diameter 2000) → errors · 6 square, no handle, 10 kg → Necesită evaluare.
- Test photo: `web/public/test/galeata-test.png` (generated image of a plain bucket, no logo; declared in the AI journal).

## 9. AI inside the product
- **What the model does:** (1) vision: suggests shape, handle and material from a photo, with confidence; the human confirms every value. (2) Writes the Romanian explanation of the engine's verdict + 3 questions for the technical meeting. **The AI never decides the verdict, the numbers or the pallet pattern**: those come from fixed rules.
- Prompts: `web/src/lib/prompts.ts` · JSON schemas: §8.
- **When the API fails:** vision → „Nu am putut analiza poza, completează manual” and the form still works; explanation → a template text built from the engine result (`fallback.ts`). The demo never breaks.
- **How we explain it to the jury (RO):** AI-ul citește poza și scrie explicația, dar verdictul și cifrele vin din reguli verificabile, iar omul confirmă fiecare sugestie a AI-ului.
- **Main risk of AI errors and how we limit it:** the vision model can misread the handle or the material, and can't measure weight or size from a photo. So weight and dimensions are always typed in by the user, every AI suggestion carries a badge plus a confidence and must be confirmed, and the explanation prompt receives only the engine's numbers and may not invent new ones. `codex-mihai` checks the engine against hand calculations (T35), and every miss goes into the AI log.

## 10. Business model (must match `business/financial-model.xlsx`)
- **Revenue:** sale of integrated UR20 palletizing cells (robot, gripper, vision, safety, installation, training) at **130,000 EUR/cell**. PaletScan is free; it is the acquisition tool. Service contracts: "plan", no numbers.
- **Direct cost:** 110,000 EUR/cell → contribution **20,000 EUR/cell** (not net profit).
- **Main other costs:** promotion 30,000 EUR (cap); other annual costs for sales, demos, technical evaluation, service and administration: **50,000 EUR (estimare)**; profit tax 16% (Romanian corporate tax rate).
- Only cells **sold and delivered** within 1 Jan–31 Dec count; delivery takes about 4 months → **last order month: August**.

## 11. Go-to-market (RO): cum atragem clienții
1. **Căutare cu intenție (ian.–apr.):** Google Search pe „robot paletizare găleți”, „paletizare automată” → pagina PaletScan; LinkedIn către directorii de producție ai producătorilor de ingrediente pentru panificație → studiul de caz UR20 (aceeași industrie) + PaletScan. Măsurăm cererea relevantă (cu date tehnice), nu clicul.
2. **Dovadă și încredere (feb.–iun.):** conținut UR20 (video și cifre de test PURATOS, cu acordul clientului), webinar „Paletizarea găleților de umpluturi și creme în 30 de minute”, demonstrații la Tech-Con, prezență la târgurile de panificație; cererile din PaletScan intră într-un CRM, iar inginerul răspunde în 48 h.
3. **Scalare națională (mar.–aug.):** acoperim toți producătorii de ingrediente de panificație din țară, apoi extindem la industrii vecine cu găleți în limitele testate (lactate, creme); dublăm bugetul pe canalele cu cost per cerere relevantă sub țintă, tăiem ce nu aduce cereri în 6 săptămâni; ultima comandă livrabilă în an: august.

## 12. Key numbers (everyone copies from here; codex-mihai keeps it in sync with financial-summary.md)
All EUR excl. VAT, calendar year 1 Jan–31 Dec. "(estimare)" = team assumption; codex-mihai confirms them in the model (T11).
| Metric | Value | Source |
|---|---|---|
| Price per cell | 130,000 | brief |
| Direct cost per cell / contribution | 110,000 / 20,000 | brief |
| Promotion budget | 30,000 (cap, incl. reserve) | brief |
| Other annual costs | 50,000 (estimare) | team |
| Profit tax | 16% | Romanian corporate tax |
| Net profit target | 300,000 | brief |
| Cells needed for the target | **22** (22 × 20,000 − 30,000 − 50,000 = 360,000 pre-tax → 302,400 net) | model |
| Cells planned, with commercial reserve | **25** (+3, ~14% reserve) | model |
| Revenue / direct cost at 25 cells | 3,250,000 / 2,750,000 | model |
| Result after promotion (before other costs and tax), 25 cells | 470,000 | model |
| Net profit at 25 cells | 352,800 | model |
| Cells per client won | 1.5 (estimare; PURATOS took 2) | team |
| Clients won (orders by Aug) | 17 | model |
| Funnel | 170 relevant requests → 68 technical meetings (40%) → 17 orders (25%) (estimare) | model |
| Cost per relevant request / per client won | ≈ 176 / ≈ 1,765 | model |
| Proposed budget split | Google Search 7,000 · LinkedIn 6,000 · UR20 content 4,500 · web page PaletScan + SEO/AI 3,500 · direct marketing + CRM 2,500 · webinars & demos 3,000 · tests (YouTube etc.) 1,000 · reserve 2,500 = **30,000** | team |
| Last order month for delivery in the year | August | brief (≈ 4-month delivery) |
| Market size (bakery-ingredient producers in RO) | T10 fills it, with sources. **Check:** 17 clients must be a credible share; if not, the plan moves dairy/creams into the year-1 funnel | research |

## 13. Out of scope (do NOT build)
- Accounts and login, payments, admin panels, a real database, actually sending the request (the demo shows the summary + "Copiază"; the text says sending is simulated).
- Savings, salaries or payback for the client (the brief says it isn't needed), and anything about MiR transport, wrapping or shipping.
- Robot programming, 3D simulation, claims that PURATOS numbers are guarantees (they are **test results**).
- Measuring weight or dimensions from the photo.

## 14. Brand
- Accent colour: **#E8590C** (industrial orange) on slate #1E293B · Tone: practical, engineer to production director, short sentences, no hype · Tagline (RO): **„Datele găleții. Paletul tău. Cererea gata.”** · CTA (RO): **„Verifică linia ta”**
