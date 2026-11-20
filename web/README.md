# web/ — the prototype (Next.js 16 + Tailwind 4 + Gemini)

## Run locally
```
cd web
npm install
npm run dev        # http://localhost:3000  ·  /demo  ·  /qr  ·  /api/health
```
The AI needs `GEMINI_API_KEY` (system environment variable or `web/.env.local`, see `.env.example`).
Without a key the app still works and shows the canned fallback answer.

## Deploy (Vercel)
Import the GitHub repo, set **Root Directory = `web`**, add `GEMINI_API_KEY` in Environment Variables, deploy.
Every push to `main` redeploys. A failed build never replaces the last good deployment.

## Where to change what (retargeting the product)
| To change | Edit | Lane |
|---|---|---|
| Name, all texts, form fields, "Cum testezi" steps | `src/lib/content.ts` | gemini-silviu |
| Brand colours | `src/app/globals.css` (`@theme`) | gemini-silviu |
| Landing layout | `src/app/page.tsx` | gemini-silviu |
| Demo screen layout / result rendering | `src/components/DemoForm.tsx`, `ResultView.tsx` | gemini-silviu |
| Result shape | `src/lib/types.ts` (+ `RESULT_JSON_SCHEMA` in prompts.ts) | codex-silviu |
| What the AI is asked | `src/lib/prompts.ts` | codex-silviu |
| Canned answer when AI is down | `src/lib/fallback.ts` | codex-silviu |
| Model order, timeouts | `src/lib/ai.ts` | codex-silviu |
| Test records for the "date de test" button | `src/data/test-inputs.json` | codex-mihai |

Keep `content.ts` fields, `test-inputs.json` keys and the prompt in sync.

## Rules for agents working here
- This is Next.js 16 with Cache Components on. Read `AGENTS.md` in this folder and the docs in `node_modules/next/dist/docs/` before using an API you're unsure about.
- Keep server components static. Put interactivity in client components (`"use client"`) and anything secret or dynamic in route handlers (`src/app/api/**`). If the build says uncached data was accessed outside `<Suspense>`, move that code into a client component or a route handler.
- Don't use `Date.now()`, `Math.random()` or `new Date()` in server components (breaks prerendering).
- Before saying "done": `npm run build` passes.

## Handy
- `npm run qr -- https://<live-url>/demo` writes `../submission/qr.png` and `qr.svg`.
- `npm run typecheck` is a fast check for small changes.
