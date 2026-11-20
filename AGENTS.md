# AGENTS.md: rules for every AI agent in this repo

You are one of five AI agents building a product for a 3-hour business challenge (11:00–14:00, Europe/Bucharest) for team **Sick7**. Humans: **Silviu** (laptop A) and **Mihai** (laptop B). Leader: `claude`.
Your human tells you your ID at the start of the session. If you don't know it, ask.

## Who is who
| ID | Tool | Laptop | Lane: files you may edit | Used for |
|---|---|---|---|---|
| `claude` | Claude Code (+ Claude app) | A | TASKS.md, DESCRIPTION.md, DELIVERABLES.md, AI_JOURNAL.md, business/pitch-script.md | plan, spec, review, integration, business writing, deck + poster |
| `codex-silviu` | Codex | A | web/src/lib/** (except content.ts), web/src/app/api/**, web/package.json | app logic, AI integration, API routes, bug fixing |
| `gemini-silviu` | Antigravity | A | web/src/app/** (except api/), web/src/components/**, web/src/lib/content.ts, web/public/**, evidence/** | UI/UX, pages, styling, browser testing |
| `codex-mihai` | Codex | B | business/financial-model.xlsx, business/financial-summary.md, web/src/data/** | numbers, spreadsheet, test data |
| `gemini-mihai` | Antigravity | B | business/research.md, business/strategy.md, business/promo-brief.md, business/promo/** | web research, Romanian business writing, visuals |

Everyone also edits **only their own** `status/<ID>.md`. Humans own CHALLENGE.md §0, submission/** and git.

## Before every task
1. `TASKS.md`: take the first **TODO** task with your ID whose "After" tasks are DONE.
2. `DESCRIPTION.md`: the product spec. It wins over everything else.
3. Your tool file: CLAUDE.md, GEMINI.md or CODEX.md.

Read only what the task needs. Don't scan the whole repo.

## Task protocol
1. Write the task ID and one line under **Now** in `status/<ID>.md`.
2. Work only inside your lane. If you need a change in someone else's file, write it under **Blockers** (what, why, whose lane) and tell your human. Don't edit it yourself.
3. Check your work against the Definition of done (below).
4. Update `status/<ID>.md`: move the task to **Done** with the files changed, how you checked them, and anything the next agent needs to know.
5. If a model got something wrong and it was caught, or a prompt worked especially well, add one line to **AI log**: what happened, how it was caught, the fix. This feeds the Jurnal AI, which is worth points.
6. Tell your human in one line: `T## done: <summary>`. Then stop. Never start unassigned work.

Never edit TASKS.md (only `claude` does). Never edit another agent's status file.

## Definition of done
- **Code:** `npm run build` in `web/` passes (for tiny changes, `npm run typecheck`). The page works in the browser with no console errors, on desktop and on a phone-width screen.
- **Business documents:** in Romanian; the required headings unchanged; numbers copied from DESCRIPTION.md §12 or business/financial-summary.md.
- **Research:** every number has a source link, or is marked "(estimare)". Never present an invented fact as real.

## Git
- **Humans run git** (commit, pull, push). Agents don't, unless their human asks.
- Codex: `.git` is read-only in your sandbox, so never try to commit.
- Don't rename, move or delete files you don't own.

## Code rules (web/)
- Next.js 16 (App Router, Cache Components on) + TypeScript + Tailwind 4. Read `web/README.md` and `web/AGENTS.md` first.
- Every text a user sees is in Romanian, in `web/src/lib/content.ts`. Don't hard-code copy in components.
- AI calls only on the server, through `web/src/lib/ai.ts` and `/api/ai`. Never expose `GEMINI_API_KEY` to the browser. Keep the fallback working.
- Fake data only (`web/src/data/test-inputs.json`). No real people, no real ID numbers.
- No new npm packages without a reason written in your status file; none at all after 12:45.
- Small, focused changes. No refactors. No lorem ipsum in anything a judge can see.
- Mobile-friendly: judges may open the app on a phone via the QR code.

## Secrets
Never commit keys. `GEMINI_API_KEY` lives in Vercel's environment variables and in the local environment or `web/.env.local` (gitignored).

## Language
Agent files, code and comments: English. Everything a judge sees: Romanian with correct diacritics (ă â î ș ț).

## Time
12:45 feature freeze · 13:30 content freeze · 13:45 hand-in. After 13:45 nobody pushes to `main`.

## When stuck
After two failed attempts at the same thing, stop. Write the blocker in your status file and tell your human. Don't loop.
