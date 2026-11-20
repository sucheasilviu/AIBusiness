# TASKS: board (only `claude` edits this file)

Status: TODO · DOING · REVIEW · DONE · CUT   ·   Times: Europe/Bucharest
Agents: take the first **TODO** task with your ID whose "After" tasks are DONE. Humans: send P1 (PROMPTS.md) to start the next one.
Product: **PaletScan UR20** (see DESCRIPTION.md). **One industry: bakery & pastry ingredient producers** (mentor check 1). Live demo target: **12:45**. Feature freeze **13:15**.

## Standing tasks
| ID | Task | Owner | Files | Done when | After | Due | Status |
|---|---|---|---|---|---|---|---|
| T01 | Paste the brief + organizer instructions | Silviu | CHALLENGE.md §0 | pushed | – | 11:33 | DONE |
| T02 | Quick market scan | gemini-mihai | business/research.md §0 | – | T01 | 11:42 | CUT (merged into T10) |
| T03 | Kickoff: 3 ideas, recommend one | claude | – | humans picked one | T01 | 11:40 | DONE |
| T04 | Spec + theme tasks | claude | DESCRIPTION.md, TASKS.md | pushed | T03 | 11:55 | DONE |
| T05 | Product copy + landing for PaletScan UR20 | gemini-silviu | web/src/lib/content.ts, web/src/app/page.tsx, globals.css | landing in Romanian per DESCRIPTION §1–4, §14 (accent #E8590C), speaking to bakery-ingredient producers (fillings, creams, glazes), not "any factory"; all old IdeaCheck/pricing copy gone; PURATOS numbers labelled "rezultate de test"; no claims beyond §6 | T04 | 12:15 | TODO |
| T06 | Types, prompts and fallback per DESCRIPTION §8–9 | codex-silviu | web/src/lib/types.ts, prompts.ts, fallback.ts, ai.ts, web/src/app/api/ai/route.ts | form field types + EngineResult/AiExplanation/VisionSuggestion exist; POST /api/ai takes an EngineResult and returns AiExplanation (live or fallback); typecheck passes | T04 | 12:10 | TODO |
| T07 | Test records for the demo form | codex-mihai | web/src/data/test-inputs.json | 6 fictional records exactly as DESCRIPTION §8 (keys = form field names; all fictional bakery-ingredient producers, `industry` from the new list; record 5 = missing/wrong data) | T04 | 12:10 | TODO |
| T08 | Demo screen: form + result | gemini-silviu | web/src/components/DemoForm.tsx, ResultView.tsx, web/src/app/demo/page.tsx | all §8 fields; "Completează cu date de test" cycles records; result shows verdict, criteria, cycle numbers, AI text, errors list; "Pregătește cererea" + "Copiază"; works at 390 px | T05, T06 | 12:40 | TODO |
| T09 | Push + production smoke test | Silviu | README.md links | live URL shows PaletScan; /api/health says ai: true | T05 | 12:25 | TODO |
| T10 | Research on the segment (RO, with sources) | gemini-mihai | business/research.md | §0–6 filled for **bakery & pastry ingredient producers only**: how many in RO (CAEN 1071/1072/1089, ingredient makers not bakeries), the top 10 by size if public, their trade fairs and associations, any public fact on manual palletizing or labour shortage in food production; 3–5 competitors/alternatives (other integrators, manual, palletizers) with prices if public, channel costs (Google/LinkedIn CPC in RO); every number linked or "(estimare)" | T04 | 12:20 | TODO |
| T11 | Financial model inputs + summary | codex-mihai (+ Mihai types) | business/financial-model.xlsx, business/financial-summary.md | inputs = DESCRIPTION §12; formulas give 22 needed / 25 planned cells, net 352,800; budget rows sum to exactly 30,000; summary tables filled; any mismatch reported to claude | T04 | 13:00 | TODO |
| T12 | Strategy one-pager (RO) | gemini-mihai | business/strategy.md | one industry (bakery ingredients), its problem told in its own terms; 5 parts (Problema, Publicul vizat/decidentul, Soluția, Atragerea clienților + scalare națională, 3 pași), one page, numbers from §12 / financial-summary | T10 | 12:50 | TODO |
| T13 | Checkpoint 1 | claude | TASKS.md | board updated | – | 12:25 | TODO |
| T14 | Checkpoint 2 | claude | TASKS.md | board updated, cuts decided | – | 12:55 | TODO |
| T15 | Main flow end to end on the live link | gemini-silviu + codex-silviu | – | DESCRIPTION §6 works on the live URL, on a phone | T08, T30, T09 | 12:45 | TODO |
| T16 | Promo brief + 2–3 visuals (RO) | gemini-mihai | business/promo-brief.md, business/promo/ | audience = production director at a bakery-ingredient producer; message + visual + CTA „Verifică linia ta” + QR to /demo; no PURATOS number shown as a guarantee | T12 | 13:15 | TODO |
| T17 | Pitch script + Q&A (RO) | claude | business/pitch-script.md | text for 5 slides, 60-s demo script, 8 Q&A | T11, T12 | 13:15 | TODO |
| T18 | QR code for the live link | Silviu | submission/qr.png | `npm run qr -- <live-url>/demo` done | T09 | 13:00 | TODO |
| T19 | Deck + poster in the Claude app (P8), downloaded | claude (app) + Silviu | submission/ | 06_Pitch and 04_Afis files in submission/ | T16, T17, T18 | 13:45 | TODO |
| T20 | Browser QA on the live link + screenshots (P7) | gemini-silviu | evidence/ | 4 screenshots + recording (incl. test record 5 errors and the photo flow); bugs listed | feature freeze | 13:45 | TODO |
| T21 | Numbers consistency cross-check (P6) | gemini-mihai | status/gemini-mihai.md | mismatches listed and fixed by owners | T11, T12, T17 | 13:50 | TODO |
| T22 | AI journal (RO, one page) | claude | AI_JOURNAL.md | the 3 required parts + templates and resources declared (§7) | – | 13:50 | TODO |
| T23 | Mock jury (P10) + quick fixes | Mihai | – | scores and the top 3 fixes done | T19, T22 | 13:55 | TODO |
| T24 | Export strategy + AI journal to PDF; copy the xlsx | Mihai | submission/ | files named as in DELIVERABLES.md | T12, T22 | 14:00 | TODO |
| T25 | Final check | claude | – | every DELIVERABLES.md box ticked | all | 14:10 | TODO |
| T26 | HAND IN | Silviu | – | confirmation received | T25 | 14:15 | TODO |
| T27 | Prepare the final (later day): rehearse the 3-min pitch + Q&A | Silviu + Mihai | – | 2 timed run-throughs | finalists announced | later | TODO |
| T28 | Mentor check 1 (business/finance mentor) | Mihai | business/mentor-notes.md | (1) DONE: mentor said focus on one industry's problem → we picked bakery ingredients; write that in mentor-notes.md. Still to ask: (2) are 50k other costs + 16% tax + 1.5 cells/client credible, and what commercial reserve would you hold? (3) is 170 requests → 68 meetings → 17 orders by August realistic for 30k EUR? (4) can a 4-month delivery support 25 cells in one year: what would you check? Answers written; claude told | T04 | 12:30 | TODO |
| T29 | Mentor check 2 (communication mentor) | Mihai | business/mentor-notes.md | asked: (1) is the 60-s demo clear to a non-engineer? (2) does the poster headline + CTA make a production director scan the QR? (3) which slide is weakest? Feedback written; owners fixed it | T17, T16 | 13:45 | TODO |

## Theme tasks
| ID | Task | Owner | Files | Done when | After | Due | Status |
|---|---|---|---|---|---|---|---|
| T30 | Palletizing engine (deterministic) | codex-silviu | web/src/lib/palletizer.ts (+ palletizer.check.ts self-check) | `analyze(input): EngineResult` implements DESCRIPTION §8 engine rules + validation; each constant commented with its source; a self-check with asserts on test records 1, 3, 5 runs green (`npx tsx`); demo calls it client-side or via /api/ai | T06 | 12:30 | TODO |
| T31 | Vision route: photo → suggestions | codex-silviu | web/src/app/api/vision/route.ts, web/src/lib/vision.ts, web/src/lib/image.ts (client resize ≤ 1024 px, JPEG) | POST image → VisionSuggestion JSON (Gemini, JSON schema); no key / error / > 4 MB → `source: "fallback"` + message; never returns weight or size | T06 | 12:45 | TODO |
| T32 | Pallet drawing (SVG) | gemini-silviu | web/src/components/PalletView.tsx | top view of the pallet with bucket circles from `pattern.positions` (mm → viewBox), side view showing layers + height; labels: per layer, layers, per pallet, kg; scales at 390 px | T30 | 12:55 | TODO |
| T33 | Cycle panel (simple animation) | gemini-silviu | web/src/components/CycleView.tsx | two bars "linie" vs "robot" (găleți/minut), bottleneck highlighted, buckets/hour, pallet A/B fill progress with a CSS animation; no new npm package. **First to cut if late.** | T32 | 13:10 | TODO |
| T34 | Photo step on /demo | gemini-silviu | web/src/components/PhotoScan.tsx, web/public/test/galeata-test.png | `<input type="file" accept="image/*" capture="environment">` + "Folosește poza de test"; calls /api/vision; prefills shape/handle/material with a „Sugestie AI · verifică” badge + confidence; fallback message works | T31, T36 | 13:05 | TODO |
| T35 | Verify the engine by hand (critical AI check) | codex-mihai | web/src/data/expected-results.json, status/codex-mihai.md | for all 6 test records: expected perLayer, layers, perPallet, robotRate, bottleneck, verdict computed independently of palletizer.ts (spreadsheet or by hand, show the math); after T30, compare and list every mismatch in AI log | T07 | 12:40 | TODO |
| T36 | Test bucket image | gemini-mihai | business/promo/galeata-test.png | a generated photo-like image of a plain white plastic 13 kg bucket with a metal handle, no logo, no text; generator declared in AI log; Silviu copies it to web/public/test/ | T10 | 12:30 | TODO |
| T37 | Vision accuracy check | codex-silviu | status/codex-silviu.md | /api/vision run on the test image + 2 other bucket images (round/square, with/without handle): table of AI answer vs truth; every miss logged in AI log (journal material) | T31, T36 | 13:10 | TODO |

## Cut / parked
- T02 merged into T10 (idea already picked).
- Dairy, paints, construction: parked as the national-scaling step (paint/plaster buckets are often above the usable payload).
- If late at 12:55: cut T33 first, then the camera capture in T34 (keep "Folosește poza de test").
