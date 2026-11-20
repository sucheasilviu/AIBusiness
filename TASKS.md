# TASKS: board (only `claude` edits this file)

Status: TODO · DOING · REVIEW · DONE · CUT   ·   Times: Europe/Bucharest
Agents: take the first **TODO** task with your ID whose "After" tasks are DONE. Humans: send P1 (PROMPTS.md) to start the next one.

## Standing tasks (exist whatever the theme; `claude` adjusts them at kickoff)
| ID | Task | Owner | Files | Done when | After | Due | Status |
|---|---|---|---|---|---|---|---|
| T01 | Paste the brief + organizer instructions | Silviu | CHALLENGE.md §0 | pushed | – | 11:03 | TODO |
| T02 | Quick market scan of the theme (P2) | gemini-mihai | business/research.md §0 | 5–8 bullets with sources | T01 | 11:12 | TODO |
| T03 | Kickoff: 3 ideas, recommend one | claude | – | humans picked one | T01 | 11:10 | TODO |
| T04 | Spec + theme tasks | claude | DESCRIPTION.md, TASKS.md | pushed | T03 | 11:25 | TODO |
| T05 | Product copy + landing for the chosen idea | gemini-silviu | web/src/lib/content.ts, web/src/app/page.tsx, globals.css | landing shows the new product in Romanian | T04 | 11:45 | TODO |
| T06 | Result type, prompt and fallback for the main function | codex-silviu | web/src/lib/types.ts, prompts.ts, fallback.ts | POST /api/ai returns the spec's JSON (live or fallback) | T04 | 11:50 | TODO |
| T07 | Test records for the demo form | codex-mihai | web/src/data/test-inputs.json | 6 fictional records, keys = form field names | T04 | 11:45 | TODO |
| T08 | Demo screen for the main function | gemini-silviu | web/src/components/DemoForm.tsx, ResultView.tsx | form → result works locally with test data | T05, T06 | 12:10 | TODO |
| T09 | Push + production smoke test | Silviu | README.md links | live URL shows the new product; /api/health says ai: true | T05 | 11:55 | TODO |
| T10 | Research on the chosen idea | gemini-mihai | business/research.md | market size, 3–5 competitors with prices, channels, sources | T04 | 11:50 | TODO |
| T11 | Financial model inputs + summary | codex-mihai (+ Mihai types) | business/financial-model.xlsx, business/financial-summary.md | inputs set, results copied into the summary | T10 | 12:30 | TODO |
| T12 | Strategy one-pager (RO) | gemini-mihai | business/strategy.md | 5 parts, one page, numbers from the summary | T10 | 12:20 | TODO |
| T13 | Checkpoint 1 | claude | TASKS.md | board updated | – | 11:55 | TODO |
| T14 | Checkpoint 2 | claude | TASKS.md | board updated, cuts decided | – | 12:25 | TODO |
| T15 | Main flow end to end on the live link | gemini-silviu + codex-silviu | – | DESCRIPTION.md §6 works on the live URL | T08, T09 | 12:15 | TODO |
| T16 | Promo brief + 2–3 visuals | gemini-mihai | business/promo-brief.md, business/promo/ | brief + images saved | T12 | 12:45 | TODO |
| T17 | Pitch script + Q&A (RO) | claude | business/pitch-script.md | text for 5 slides, 60-s demo script, 8 Q&A | T11, T12 | 12:45 | TODO |
| T18 | QR code for the live link | Silviu | submission/qr.png | `npm run qr -- <live-url>/demo` done | T09 | 12:30 | TODO |
| T19 | Deck + poster in the Claude app (P8), downloaded | claude (app) + Silviu | submission/ | 06_Pitch and 04_Afis files in submission/ | T16, T17, T18 | 13:15 | TODO |
| T20 | Browser QA on the live link + screenshots (P7) | gemini-silviu | evidence/ | 4 screenshots + recording; bugs listed | feature freeze | 13:15 | TODO |
| T21 | Numbers consistency cross-check (P6) | gemini-mihai | status/gemini-mihai.md | mismatches listed and fixed by owners | T11, T12, T17 | 13:20 | TODO |
| T22 | AI journal (RO, one page) | claude | AI_JOURNAL.md | the 3 required parts | – | 13:20 | TODO |
| T23 | Mock jury (P10) + quick fixes | Mihai | – | scores and the top 3 fixes done | T19, T22 | 13:25 | TODO |
| T24 | Export strategy + AI journal to PDF; copy the xlsx | Mihai | submission/ | files named as in DELIVERABLES.md | T12, T22 | 13:30 | TODO |
| T25 | Final check | claude | – | every DELIVERABLES.md box ticked | all | 13:40 | TODO |
| T26 | HAND IN | Silviu | – | confirmation received | T25 | 13:45 | TODO |
| T27 | Rehearse the 3-min pitch + Q&A | Silviu + Mihai | – | 2 timed run-throughs | T26 | 14:00 | TODO |

## Theme tasks (added by `claude` at kickoff, T30 and up)
| ID | Task | Owner | Files | Done when | After | Due | Status |
|---|---|---|---|---|---|---|---|
| T30 | … | … | … | … | … | … | TODO |

## Cut / parked
- …
