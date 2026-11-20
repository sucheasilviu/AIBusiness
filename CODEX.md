# CODEX.md: Codex playbook (codex-silviu, codex-mihai)

Codex loads AGENTS.md automatically; read this file too at the start of each session. Your human tells you your ID.

## Working style (ChatGPT Plus: a 5-hour window and a weekly limit)
- One task per prompt. Read only the files the task names.
- Make the change, run the check, report in at most 5 lines. No long explanations.
- Default reasoning effort; raise it only for a hard bug.
- Your sandbox: `.git` is read-only and network access is off by default. Don't commit. If you really need `npm install`, ask your human to approve it (and write why in your status file).

## codex-silviu: app logic (laptop A)
- Files: `web/src/lib/types.ts`, `prompts.ts`, `fallback.ts`, `ai.ts`, `fake-data.ts`, and `web/src/app/api/**`.
- Retargeting the main function at kickoff:
  1. `types.ts`: change `AiResult` only if the product needs a different shape (keep `title`, `summary`, `items` if you can; the UI already renders them).
  2. `prompts.ts`: system prompt + user prompt for the new task. Romanian output, strict JSON, short. Keep `RESULT_JSON_SCHEMA` in sync with the type.
  3. `fallback.ts`: a believable canned answer for the new product (it is what judges see if the API is down).
  4. Leave `ai.ts` alone unless needed: model chain, timeouts and fallback already work.
- Check: `npm run build`, then POST a test record to `/api/ai` (`npm run dev`, then use the demo page or curl). Paste one real model output into your status file: it is AI-journal material.
- Hard bugs anywhere in `web/` can be assigned to you; fix the root cause, smallest diff.

## codex-mihai: numbers + test data (laptop B)
- **Test data** → `web/src/data/test-inputs.json`: 6 fictional records whose keys match the form fields in `web/src/lib/content.ts` (`demo.fields[].name`). Romanian names, cities and realistic values. No real people.
- **Financial model** → `business/financial-model.xlsx`. The formulas are already built (sheets Ipoteze → Venituri → Costuri → Rezultat). Only the **blue-on-yellow cells in column B of "Ipoteze"** are inputs.
  1. Propose every input value with a one-line justification (research or "(estimare)") in `business/financial-summary.md` → "Ipoteze propuse". Rename the 3 revenue streams to fit the product and switch unused ones off (0).
  2. Mihai types the values into Excel, LibreOffice or Google Sheets (the sheet recalculates by itself). If you edit with Python/openpyxl instead: write only Ipoteze!B cells, never overwrite a formula, and have Mihai open and save the file once so the results are calculated.
  3. Copy the results from sheet "Rezultat" (rows 5–15 for years 1–3; rows 18–26 for the key indicators) into `financial-summary.md` → "Rezultate". These numbers are the single source for the strategy, pitch and poster.
- Sanity checks: no negative customers, gross margin plausible, CAC below LTV, the break-even month makes sense. Flag anything odd in your status file.
