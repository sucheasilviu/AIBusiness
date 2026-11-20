# AIBusiness: Sick7 multi-agent workspace

Workspace for the **AI Business Challenge** (Politehnica București, **11:00–14:00**).
Five AI agents on two laptops build one product together. They coordinate through the markdown files in this repo. `claude` is the leader.

| Laptop | Human | Agents |
|---|---|---|
| A | Silviu | `claude` (Claude Code; Claude app for deck + poster) · `codex-silviu` (Codex) · `gemini-silviu` (Antigravity) |
| B | Mihai | `codex-mihai` (Codex) · `gemini-mihai` (Antigravity) |

## At 11:00: start in 5 steps
1. **Silviu** pastes the official brief (and any organizer instructions) into `CHALLENGE.md` §0, then commits and pushes.
2. **Silviu** types `/kickoff` in Claude Code. At the same time **Mihai** sends prompt **P2** (quick market scan) to `gemini-mihai`.
3. Both humans pick one of Claude's 3 ideas, **in 3 minutes max**. Claude writes `DESCRIPTION.md` and `TASKS.md`; Silviu pushes.
4. Both pull. Each human sends **P1** ("next task", in `PROMPTS.md`) to each of their agents.
5. Loop: agent finishes → updates its `status/` file → its human commits and pushes → sends P1 again. Claude runs `/checkpoint` at **11:55** and **12:25**.

Freezes: **12:45** features · **13:30** content · **13:45** hand in. Nobody pushes to `main` after hand-in.

## Files
| File | What it is | Who edits it |
|---|---|---|
| `CHALLENGE.md` | Rules, both scoring grids, today's brief (§0) | Silviu (§0 only) |
| `DESCRIPTION.md` | Product spec, the single source of truth | `claude` |
| `APPROACH.md` | Timeline, freezes, decision rules, usage limits, risk plan | – |
| `TASKS.md` | Task board | `claude` only |
| `DELIVERABLES.md` | The 6 required items: points, owners, file names, done-checks | `claude` |
| `AGENTS.md` | Rules for every agent (Codex and Antigravity load it automatically; Claude imports it) | – |
| `CLAUDE.md` · `GEMINI.md` · `CODEX.md` | Per-tool playbooks | – |
| `PROMPTS.md` | Copy-paste prompts P0–P10 | – |
| `PREFLIGHT.md` | Setup checklist before 11:00 | – |
| `AI_JOURNAL.md` | Jurnal AI deliverable (RO) | `claude` |
| `status/<agent>.md` | Each agent's handoff notes and AI log | that agent only |
| `business/` | Research, strategy, financial model, pitch script, promo (RO) | Mihai's agents + `claude` |
| `web/` | The prototype (Next.js + Gemini). See `web/README.md` | Silviu's agents |
| `evidence/` | Screenshots and recordings proving the app works | `gemini-silviu` |
| `submission/` | Final exported files to hand in | humans |
| `setup/claude-commands/` | Claude Code commands `/kickoff` `/checkpoint` `/review` `/sync` `/final-check`; copied into `.claude/commands/` once (PREFLIGHT) | – |

## Sync (each human, after every finished task)
```
git add -A
git commit -m "T05 gemini-silviu: landing copy"
git pull --rebase
git push
```
On Silviu's laptop you can type `/sync` in Claude Code instead (it builds `web/` first).
A failed Vercel build never takes the live site down: the last good deployment stays online.

## Links (fill in during preflight)
- Repo: https://github.com/sucheasilviu/AIBusiness
- Live app: …
- Vercel project: …
- Submission place (from organizers): …
