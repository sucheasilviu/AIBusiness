# APPROACH: how we win in 3 hours

## Principles
1. **One product, one main function**, working on the live link by **12:45**. Everything else is decoration.
2. **Parallel lanes.** Every agent owns specific files (AGENTS.md), so two agents never edit the same file.
3. **Claude thinks and checks; Codex and Gemini build.** Claude's usage is our scarcest resource.
4. **Write for the grid.** Every deliverable maps to a criterion (DELIVERABLES.md), using the rules' own words.
5. **Cross-check with a different model** and log what was caught. That *is* the "critical AI use" score.
6. **Deploy early, freeze on time, hand in early.**

## Timeline (Europe/Bucharest)
| Time | Phase | Laptop A: Silviu | Laptop B: Mihai | Gate |
|---|---|---|---|---|
| 11:15 | Preflight | apps open, `git pull`, dev server runs, P0 to each agent | `git pull`, P0 to each agent | PREFLIGHT.md all ticked |
| 11:30 | Brief | brief → CHALLENGE.md §0, push · `/kickoff` | P2 → gemini-mihai (quick scan) | – |
| 11:38 | Decide | read the 3 ideas, decide with Mihai | same | idea picked by **11:42** |
| 11:42 | Spec | claude writes DESCRIPTION.md + TASKS.md, push by 11:55 | gemini-mihai researches the chosen idea | spec pushed |
| 11:55 | Build 1 | codex-silviu: types + prompt + fallback · gemini-silviu: landing + demo UI | codex-mihai: test data → financial model · gemini-mihai: research → strategy | **first deploy by 12:20** |
| 12:25 | Checkpoint 1 | `/checkpoint` | push everything first | – |
| 12:30 | Build 2 | main flow end to end **on the live link by 12:45**, then polish | strategy v1 12:50 · model v1 13:00 · promo brief 13:15 | – |
| 12:55 | Checkpoint 2 | `/checkpoint`: cut whatever is off track | push first | – |
| **13:15** | **FEATURE FREEZE** | fixes and polish only · Claude app: deck + poster (P8) | final numbers, strategy, exports | – |
| 13:30 | QA | gemini-silviu: P7 browser test → evidence/ · claude: AI journal | cross-check numbers (P6) · mock jury (P10) | – |
| **14:00** | **CONTENT FREEZE** | last web push must build green | every file in submission/ | – |
| 14:00 | Final check | `/final-check` | fix only what it lists | all ✅ |
| **14:15** | **HAND IN** | Silviu submits | Mihai double-checks the list | 15 min buffer |
| 14:15–14:30 | Buffer, then rehearse | 3-min pitch run-through twice | Q&A practice | – |
| after | – | **no pushes to main** | – | – |

## Decision rules
- **Picking the idea:** feasibility in 90 minutes × fit to the brief × how easy the business case is to explain. Boring-but-working beats clever-but-risky. The AI feature must be able to fall back.
- **10-minute rule:** a task 10 minutes past its due time gets cut or simplified (claude decides, tells the humans).
- **Blocked agents first:** if a task blocks two agents, re-plan immediately; don't wait for the checkpoint.
- **A red build beats everything:** if the live deploy fails, fixing it is the top task.
- No new npm packages after 13:15. No refactors, ever.
- When two models disagree on a fact or number, claude decides and logs it (AI journal material).

## Usage limits (every plan we use has 5-hour windows)
| Agent | Plan | Watch |
|---|---|---|
| `claude` | Claude Pro, shared between Claude Code and the Claude app | 5-hour session + weekly limit; `/usage` at each checkpoint |
| `codex-*` | ChatGPT Plus | 5-hour window + weekly limit; `/status` in Codex |
| `gemini-*` | Google AI Pro (Antigravity) | per-model quota refreshing every 5 h, plus a weekly cap; Claude models inside Antigravity burn quota fastest |

- **Before 11:30:** no heavy agent use in the 5 hours before kickoff, so every window starts fresh and lasts the whole challenge.
- **During:** one task per prompt, small diffs, no essays. Fast models for small edits (Gemini Flash; lower reasoning in Codex), strong models only for planning and hard bugs.
- **Claude:** `/clear` after kickoff and after each checkpoint (the files hold the state). Never paste long logs.

## If Claude runs out of usage (fallback leader)
1. Silviu opens Antigravity, picks the strongest model available (Claude Opus/Sonnet if the model list shows it, otherwise Gemini Pro) and sends **P9** (handover).
2. Deck and poster switch to **Plan B**: Mihai fills `business/pitch-template.pptx` (PowerPoint or Google Slides) and makes the poster in Canva with a Gemini-generated visual.
3. Optional insurance decided before 11:30: Claude usage credits (paid, pay-as-you-go).

## Risk plan
| Risk | What we do |
|---|---|
| Gemini API slow, down or rate-limited during judging | The app falls back to the canned answer automatically (`source: "fallback"`); the demo never breaks |
| Vercel build fails | Read the build log, fix it; the previous deployment stays live meanwhile |
| Vercel blocks Mihai's commits (private repo on the free plan) | Make the repo public (PREFLIGHT), or let only laptop A push `web/` changes |
| Merge conflict | Lanes prevent most. The human pulling resolves it, or asks claude (`/sync`) |
| Wi-Fi drops | Phone hotspot; report to organizers immediately |
| A laptop dies | The other laptop has the repo; Claude Code can run there |
| An agent loops or produces junk twice | Stop it, open a new chat, send a smaller prompt |
| Live demo fails in the final | Backup video or the screenshots in evidence/ |
