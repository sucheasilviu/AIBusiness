# PROMPTS: copy, replace `<…>`, paste

The files hold the details, so the prompts stay short. IDs: `codex-silviu`, `gemini-silviu`, `codex-mihai`, `gemini-mihai`.

## P0: Priming (10:50, once per agent session)
```
You are <ID> in this repo. Read AGENTS.md and your tool file (GEMINI.md or CODEX.md). Change nothing. Reply in one line: your ID and your lane.
```

## P1: Next task (the workhorse; send it every time an agent finishes)
```
You are <ID>. Read TASKS.md and take the first TODO task with your ID whose "After" tasks are DONE. Follow the task protocol in AGENTS.md: update status/<ID>.md, stay in your lane, check your work, then tell me "T## done" with a one-line summary.
```

## P2: Quick market scan (Mihai → gemini-mihai, 11:02)
```
You are gemini-mihai. Read CHALLENGE.md §0 (today's brief). In 10 minutes, write business/research.md §0 "Scanare rapidă": 5–8 bullets in Romanian: market size, who has the problem, 3 existing solutions with prices, one surprising fact. Every number with a source link or "(estimare)". Then stop and tell me.
```

## P3: Kickoff (Silviu → Claude Code, 11:03)
```
/kickoff
```
Optional context after the command, e.g. `/kickoff we prefer a B2B idea`.

## P4: Checkpoint (Silviu → Claude Code, 11:55 and 12:25)
```
/checkpoint
```

## P5: Fix a bug (any coding agent)
```
You are <ID>. Bug: <what happens> when <steps>. Expected: <what should happen>. Error: <short error text>. Find the root cause in your lane, fix it with the smallest diff, verify (build + reproduce), update status/<ID>.md. If the cause is outside your lane, write it as a blocker instead.
```

## P6: Cross-check (critical AI use: always a DIFFERENT model than the author)
```
You are <ID>. Check <file> critically. List (1) claims or numbers that look wrong or unsupported, and why; (2) anything inconsistent with DESCRIPTION.md §12 and business/financial-summary.md. Don't rewrite the file. Write your findings in status/<ID>.md under "AI log" and tell me the top 3.
```

## P7: Browser QA (Silviu → gemini-silviu, ~13:00)
```
/browser Open <LIVE URL>. Follow the demo flow in DESCRIPTION.md §6 using the "Completează cu date de test" button. Check desktop and a 390 px wide mobile view. Save screenshots of the landing page, the filled form, the result and the mobile view to evidence/ as 01-landing.png, 02-form.png, 03-result.png, 04-mobile.png, and keep the recording. List every bug with steps.
```

## P8: Deck + poster (Silviu → Claude desktop app, new chat with the AIBusiness folder added, 12:45)
```
Read these files from my AIBusiness folder: DESCRIPTION.md, business/pitch-script.md, business/strategy.md, business/financial-summary.md, business/promo-brief.md, the images in business/promo/ and submission/qr.png.
1. Pitch deck, using the Slides type: max 5 slides in Romanian, following pitch-script.md exactly. Slide 2 shows the live link, the QR image and the 3 "Cum testezi" steps. Slide 4 shows the key numbers exactly as in financial-summary.md. 16:9, the accent colour from DESCRIPTION.md §14, one strong visual per slide.
2. Poster, using the Design type: one A4 portrait poster for the audience in strategy.md, with the headline (message), the visual from business/promo/, a call to action and the QR code. Romanian, large readable text.
3. Check every number against financial-summary.md and every Romanian diacritic. Tell me when both are ready; I'll download the deck as PPTX + PDF and the poster as PNG + PDF into submission/ as 06_Pitch_Sick7 and 04_Afis_Sick7.
```
Plan B (Claude out of usage): Mihai fills `business/pitch-template.pptx` in PowerPoint or Google Slides and makes the poster in Canva with an image from business/promo/.

## P9: Handover (Claude out of usage → Antigravity on Silviu's laptop, strongest available model)
```
You are now the team leader, replacing `claude`, which ran out of usage. Read CLAUDE.md (your playbook; skip the parts about Claude Code commands), then TASKS.md and every status/*.md. Run a checkpoint now: update TASKS.md (statuses, next tasks, cuts) so every agent stays busy until the 12:45 feature freeze, add 3 lines to status/claude.md under "Checkpoint log", and tell me which prompt to send to which agent. From now on the `claude` lane is yours.
```

## P10: Mock jury (Mihai → ChatGPT or Gemini app, ~13:20; NOT Claude)
```
Ești comisia de preselecție a unui concurs de afaceri cu AI. Notează strict proiectul nostru pe grila: Aplicație și experiența utilizatorului 35, Strategie și model financiar 25, Utilizarea critică a AI 15, Material de promovare 15, Pitch 10. Materialele sunt atașate; linkul aplicației: <LIVE URL>. Pentru fiecare criteriu: punctajul, cele 2 mari slăbiciuni și cea mai rapidă îmbunătățire (sub 10 minute). La final: punctajul total și orice neconcordanță între documente.
```
