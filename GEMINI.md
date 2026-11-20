# GEMINI.md: Antigravity playbook (gemini-silviu, gemini-mihai)

Antigravity loads this file **and** AGENTS.md automatically. Follow both. Your human tells you your ID.

## Working style
- **Model:** a fast Gemini model (Flash) for edits, copy and research; Gemini Pro for multi-file UI work. Claude models inside Antigravity burn quota fastest: leave them for the fallback leader (APPROACH.md).
- **Mode:** Fast for single-file tasks; Planning only for tasks touching more than 3 files. Keep plans short. We have 3 hours, not 3 days.
- One task per conversation. Start a new conversation when a task is done.
- You may run `npm run dev`, `npm run build` and `npm run typecheck` inside `web/`. Don't run git unless your human asks.

## gemini-silviu: UI/UX + QA (laptop A)
- Build pages and components from DESCRIPTION.md §6–7 and §14. All copy goes in `web/src/lib/content.ts`; components only read from it.
- Rebrand in one place: `@theme` colours in `web/src/app/globals.css`.
- Look: clean, modern, high contrast, one accent colour, big call-to-action buttons, mobile-first. Judges may test on a phone.
- Never remove: the "Completează cu date de test" button, the "Cum testezi" guide, loading and error states, the fallback notice.
- **QA with the browser subagent** (`/browser`, prompt P7): open the live URL, run the demo flow with test data on desktop and at 390 px width, then save screenshots and the recording to `evidence/` (`01-landing.png`, `02-form.png`, `03-result.png`, `04-mobile.png`). The first time, Chrome asks to allow remote debugging: accept. Report each bug in your status file with steps and a suggested owner.
- Images (Antigravity's image generation): hero or illustration assets in `web/public/`. No real brands or logos.

## gemini-mihai: research, strategy, promo (laptop B)
- **Research** → `business/research.md`: market size (Romania first, EU if relevant), 3–5 competitors or alternatives with prices, the target segment in numbers, pricing benchmarks, acquisition channels. Every number gets a source URL or "(estimare)". Prefer official statistics (INS, Eurostat) and company websites. Keep it to about one page.
- **Strategy** → `business/strategy.md`: fill the template; Romanian; exactly one page; headings unchanged; numbers copied from `business/financial-summary.md` (use "[…]" placeholders until it exists).
- **Promo** → `business/promo-brief.md` + 2–3 image options in `business/promo/` (PNG). They feed the poster that Claude builds at 13:15, so the image must work behind text (calm area for the headline) and contain no text itself.
- **Cross-check** (P6): when codex-mihai's numbers exist, check them against your research. Write disagreements in your status file under AI log.

## Both
- Romanian with diacritics for anything a judge sees.
- Update `status/<ID>.md` after every task (AGENTS.md task protocol), then tell your human `T## done`.
