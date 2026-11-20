# DELIVERABLES: what we hand in (by 13:45)

File names: follow the organizer instructions in CHALLENGE.md §0 if they differ.

| # | Deliverable | Points (prelim / final) | Owner | Source in the repo | Hand-in file | Done |
|---|---|---|---|---|---|---|
| 1 | Aplicație web publicată | 35 / 30 | codex-silviu + gemini-silviu | web/ | live URL (+ `01_Aplicatie_Sick7.txt`: link + cum testezi) | ☐ |
| 2 | Strategie pe o pagină | 25 together with #3 / 30 | gemini-mihai → claude review | business/strategy.md | `02_Strategie_Sick7.pdf` | ☐ |
| 3 | Model financiar | (with #2) | codex-mihai + Mihai | business/financial-model.xlsx | `03_Model_financiar_Sick7.xlsx` | ☐ |
| 4 | Material de promovare | 15 / – | claude (app) + gemini-mihai visuals | business/promo-brief.md | `04_Afis_Sick7.png` (+ `.pdf`) | ☐ |
| 5 | Jurnal AI | 15 / 20 | claude | AI_JOURNAL.md | `05_Jurnal_AI_Sick7.pdf` | ☐ |
| 6 | Pitch și demonstrație | 10 / 20 | claude (app) | business/pitch-script.md | `06_Pitch_Sick7.pptx` (+ `.pdf`) | ☐ |

## Done checks
### 1. App
- [ ] The live URL opens in an incognito window and on a phone
- [ ] The main function works end to end with "Completează cu date de test"
- [ ] An AI answer appears in under 15 s (or the fallback answer if the API is down)
- [ ] The "Cum testezi" guide is visible; all text Romanian with diacritics; no lorem ipsum, no dead links
- [ ] Screenshots + recording in evidence/; `/api/health` answers `"ai": true`
- [ ] The last push before hand-in built successfully on Vercel

### 2. Strategy
- [ ] Exactly these headings: Problema · Publicul vizat · Soluția · Atragerea utilizatorilor și clienților · Trei pași de implementare
- [ ] Fits ONE page as PDF, text selectable (not an image)
- [ ] Numbers identical to business/financial-summary.md

### 3. Financial model
- [ ] Opens in Excel and Google Sheets; clicking a result cell shows a formula
- [ ] Sheets Ipoteze, Venituri, Costuri, Rezultat; one base scenario
- [ ] Every assumption has a unit and a source or "(estimare)"; the example values are all replaced

### 4. Promo
- [ ] One poster or post with: mesaj + element vizual + îndemn la acțiune + QR or link
- [ ] Speaks to the audience named in the strategy; same name, price and claims as everywhere else

### 5. AI journal
- [ ] Max one page: Instrumente folosite · Trei prompturi relevante · Exemplu de rezultat AI verificat și corectat

### 6. Pitch
- [ ] Max 5 slides; prototype link + QR; short "cum testezi" steps
- [ ] Same numbers as the model and the strategy
- [ ] Optional: a 60-second backup video of the demo (no points, but insurance for the final)
