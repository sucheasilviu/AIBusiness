# PREFLIGHT: everything ready before 11:00

## Tonight, or first thing in the morning (Silviu, ~15 min)
- [ ] **Install the Claude Code commands** (one time; I couldn't write into `.claude` from here). In PowerShell, inside the AIBusiness folder:
  ```
  New-Item -ItemType Directory -Force .claude\commands | Out-Null
  Copy-Item setup\claude-commands\*.md .claude\commands\
  ```
- [ ] **Commit and push this repo** from the AIBusiness folder:
  ```
  git add -A
  git commit -m "Workflow files + starter kit"
  git push
  ```
- [ ] **Make the repo public** (recommended): GitHub → AIBusiness → Settings → General → Danger Zone → Change visibility. Vercel's free plan blocks deployments of commits by anyone but the owner on *private* repos. No secrets are in the repo.
  If you keep it private: only commits from laptop A deploy. Mihai's commits only touch business/, so a "blocked" deployment for them is harmless; the next push from laptop A deploys everything.
- [ ] **Add Mihai as a collaborator:** Settings → Collaborators → Add people. Mihai accepts the invite.
- [ ] **Check git identity on both laptops:** `git config user.email` must be an email verified on your GitHub account (Vercel matches commit authors).
- [ ] **Run the app locally:**
  ```
  cd web
  npm install
  npm run dev
  ```
  Open http://localhost:3000/demo → "Completează cu date de test" → "Analizează cu AI". Under the result you should see "Generat cu Google Gemini (…)". If it says "Rezultat demonstrativ", the key isn't visible: restart the terminal after setting the environment variable, or create `web/.env.local` with `GEMINI_API_KEY=...` (gitignored).

## Morning, by 10:30
**Silviu**
- [ ] **Vercel:** sign up at vercel.com with GitHub → Add New… → Project → import AIBusiness → **Root Directory: `web`** → Environment Variables: `GEMINI_API_KEY` = your key → Deploy. Put the live URL in README.md (Links).
- [ ] Open `<live URL>/api/health` → `"ai": true`. Open `/demo` → test data → a Gemini result.
- [ ] QR code: in `web/` run `npm run qr -- <live URL>/demo` → `submission/qr.png` + `qr.svg`.
- [ ] **Claude Code** in the repo folder: run `/context` once (confirms CLAUDE.md + AGENTS.md are loaded); type `/` and check that kickoff, checkpoint, review, sync and final-check appear. Don't run them.
- [ ] **Claude desktop app:** a new chat with the AIBusiness folder added (+ menu → Add folder), ready for P8 at 12:45.
- [ ] **Codex + Antigravity** open on the repo folder and signed in. In Antigravity, the browser subagent needs its Chrome extension (accept remote debugging the first time).

**Mihai**
- [ ] Accept the GitHub invite → clone the repo → open it in Antigravity and Codex.
- [ ] `npm install` in `web/` only if he will run the app.
- [ ] Excel, LibreOffice or Google Sheets ready for the financial model; a Canva account (Plan B for deck and poster).

**Both**
- [ ] Check the usage left: Claude (Settings → Usage, or `/usage` in Claude Code), Codex (`/status`), Antigravity (model quota). If a weekly limit is nearly used up, tell each other now; the roles in TASKS.md can shift.
- [ ] **No heavy agent use in the 5 hours before 11:00.** Each plan has a 5-hour usage window; starting fresh at kickoff means it lasts the whole challenge. Quick checks are fine.
- [ ] Optional, Silviu: turn on Claude usage credits as paid insurance in case the leader hits its limit.
- [ ] Chargers, phone hotspot, water.
- [ ] Organizer instructions (formats, size limits, where to submit) → CHALLENGE.md §0.

## 10:45 at the desk
- [ ] `git pull` on both laptops.
- [ ] Send **P0** to each of the 4 Codex/Antigravity agents (Claude Code loads CLAUDE.md by itself).
- [ ] Tabs open: live URL, DELIVERABLES.md, PROMPTS.md.

## Optional dry run (15 min, tonight only: it uses Claude usage)
1. Paste this fake brief into CHALLENGE.md §0: *„Soluții bazate pe AI care ajută IMM-urile din România să atragă și să păstreze clienți.”*
2. In Claude Code, run `/kickoff`, pick an idea, let it write DESCRIPTION.md and TASKS.md.
3. Read what it produced, then throw it away: `git restore .`
