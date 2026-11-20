# CODEX.md: Codex playbook (codex-silviu, codex-mihai)

Codex loads AGENTS.md automatically; read this file too at the start of each session. Your human tells you your ID.

## Working style (ChatGPT Plus: a 5-hour window and a weekly limit)
- One task per prompt. Read only the files the task names.
- Make the change, run the check, report in at most 5 lines. No long explanations.
- Default reasoning effort; raise it only for a hard bug.
- Your sandbox: you have git access: commit and push your own task files as described in AGENTS.md "Git". If you really need `npm install`, ask your human to approve it (and write why in your status file).

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
- **Financial model** → `business/financial-model.xlsx`, rebuilt for this brief (EUR, one calendar year). Inputs are the blue-on-yellow cells: sheet „Ipoteze” column B (other costs, tax, commercial reserve, conversion rates, cells per client) and sheet „Buget promovare” (channel names, amounts that must total exactly 30,000, estimated relevant requests per channel). Sheet „Rezultat” computes cells needed for 300,000 EUR net profit, the brief's required calculations, the funnel and the delivery calendar.
  1. Propose every input with a one-line justification in `business/financial-summary.md` → "Ipoteze propuse".
  2. Mihai types them into Excel, LibreOffice or Google Sheets (it recalculates by itself). With Python/openpyxl: write only input cells, never a formula; Mihai then opens and saves the file once.
  3. Copy the results from „Rezultat” into `financial-summary.md` → "Rezultate". These numbers are the single source for the strategy, pitch and poster.
- Sanity checks: the budget check says OK; cost per relevant request is plausible for industrial B2B; all orders fit before the last order month; net profit ≥ 300,000 EUR; flag anything odd in your status file.
