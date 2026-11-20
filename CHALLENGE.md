# CHALLENGE: rules digest
Source: the regulament (sections 5–6, screenshots shared by Silviu). Romanian wording is kept where the grid uses it.

## 0. Today's brief: Tech-Con case study (UR20 robotic palletizing)
Full text: `brief/Cerinte_proba_SYSUP_2026.pdf` (original) and `brief/brief.md` (text for agents). Below is the summary; check the full text for details.

**Mission.** In 3 hours, with AI, build a **web prototype** and a **business proposal** for scaling in Romania UR20 palletizing cells (buckets → pallets) like the two Tech-Con installed at PURATOS. The tool must help an industrial client **understand, evaluate or request** such an application and support a realistic commercial plan. We do NOT design or program the robot, and we don't build a complete product.

**What they want to see.** (1) A priority segment in Romania, a clear **decision-maker** (e.g. production director, investment manager) and an explained production problem. (2) **One testable web function**, useful for that audience, usable **from a phone browser** (a PWA is optional; a mobile-friendly page is enough). (3) An editable financial model + a **digital customer-acquisition plan**. (4) Proof of **critical** AI use, not just generated text or images.

**Case facts (PURATOS test results, NOT guarantees).** Buckets of 5 kg and 13 kg; a pallet holds 100 × 5 kg or 44 × 13 kg. Before: manual palletizing, 2 operators per shift, 2–3 shifts a day. The UR20 picks buckets from the conveyor and places them on one of 2 pallet positions; custom pneumatic gripper + SICK 2D vision checks the handle orientation; 3 safety scanners per cell. Target ≥ 6 buckets/min; tested 7.4/min (13 kg) and 8.6/min (5 kg). Delivery about 4 months. Pallet change and separator placement stay manual.
- Out of scope: transport to logistics (MiR), wrapping, shipping. Attribute no savings, costs or automation to them.
- Not needed: the client's salary savings or payback.
- A faster robot doesn't raise whole-factory throughput: identify the upstream/downstream bottleneck.
- Replication depends on: weight, shape, material, handle and stability of the container (payload includes the gripper); input rate, demand, pallet pattern, separator, space, access, pallet-change rhythm; risk assessment, human interaction, hygiene, procedures; conveyor integration, process signals, the 2 pallet positions.

**Promotion budget: 30,000 EUR/year**, allocations must total exactly 30,000 including the reserve, each cost counted once. The brief's example split is indicative only: Google Search 6,000 · LinkedIn 4,500 · UR20 content 4,500 · web page + SEO/AI 3,750 · simple mobile app/PWA 3,000 · direct marketing + CRM 2,250 · webinars & partnerships 2,250 · YouTube/other tests 1,500 · reserve 2,250. We must explain: the split and why; audience, message and landing point of each action; what we start with, test, increase or cut, and when; targets (relevant requests → technical meetings → orders), how many, on what assumptions; how we verify and what we change if a channel spends without results.
- A **relevant request** = from the chosen segment, with a possible palletizing need and enough data for a technical discussion (a click is not a request). Conversion rates must say from which stage to which. **Cost per relevant request** and **cost per client won** must be defined. One client counts once across channels.
- Contacts must be approachable legitimately (no untargeted mass mailing). No real personal data in the prototype.

**Financial data (scenario values, EUR excl. VAT, one calendar year 1 Jan–31 Dec).** Promotion budget 30,000 (cap) · price per cell **130,000** (integrated UR20 cell, installation, training) · direct cost per cell **110,000** → contribution **20,000/cell**, which is NOT net profit · shareholders want **300,000 EUR net profit** for the year, after all costs and tax (other costs and tax are not given: we declare assumptions).
- Required in the editable table: total promotion (≤ 30,000), contribution per cell, annual revenue, annual direct cost, result after promotion (before other costs and tax), cost per request or per client.
- We must argue: **how many cells** reach the target; how the promotion produces enough requests and meetings; how Tech-Con supports demos, technical evaluation, delivery and service at that volume; which extra financial data is needed to verify net profit, and **what commercial reserve** we propose. Only cells sold AND delivered within the year count (≈ 4-month delivery → late orders don't count).

**Deliverables as adapted by the brief.**
- App: a simple tool usable in a phone browser; public link + short test steps; show a **normal case and a missing/wrong-data case** with fictitious data. In-app AI only if it serves the function and can be demonstrated.
- Strategy (1 page): problem, **segment/decision-maker**, solution, customer acquisition, **national scaling**, 3 steps.
- Financial model: editable table with formulas (**not** a screenshot or PDF), one currency (EUR) and one period (the calendar year).
- Promo: one post or poster for the chosen audience, message + visual + CTA, **connected to the digital journey** (it leads to the tool).
- AI journal (1 page): tools, 3 real prompts, one result verified and corrected, showing the error and the fix.
- Pitch (≤ 5 slides): problem, function, value, finances, steps + link and test instructions.

**Brief's hand-in checklist.** The link opens and someone else can test the function · strategy and AI journal within limits · pitch ≤ 5 slides · model editable, with formulas, same currency and period · statements about PURATOS separate facts from assumptions and refer only to UR20 palletizing · the promo has an audience and a CTA · **the package contains the team code and instructions**.

**Brief's suggested timeline** (matches APPROACH.md): −15–0 min understanding, segment, function, roles · 0–60 prototype + strategy, data and model structure · 60–120 finish the function and formulas, promo · 120–155 tests, verify an AI result, AI journal · 155–180 pitch, coherence check, public link, hand-in.

**Workflow notes.** `business/financial-model.xlsx` is being rebuilt for this brief (EUR, one calendar year, cells + funnel + 30,000 budget) by Claude in the chat, ready around 12:00. Until then `codex-mihai` drafts the budget split and funnel assumptions in `business/financial-summary.md`. The old SaaS example content in `web/` (IdeaCheck, pricing plans) must all be replaced.

**Organizer instructions.**
- Formats: …
- Size limits: …
- Where and how to submit: …
- Official hand-in deadline: 14:30 (start 11:30) unless announced otherwise
- Working data: the case PDF above (in `brief/`)
- Team code: …

## 1. Hard facts
- Time: **11:30–14:30** (3 h). Only the version handed in on time is evaluated; later changes are ignored.
- Same requirements for teams and individuals. We use our own laptops. Pre-made code and templates are allowed.
- Testing uses **fictitious data only** (if the theme needs a form, use test data).
- Report technical problems to the organizers **immediately**. If organizer infrastructure fails, the committee decides a fair fix.
- A missing deliverable costs the points of its criterion.
- Optional extras (video, partner offer, extra scenarios) earn **no points by themselves**.
- Strategy, financial model and promo content may be reused in the pitch.
- **§3** Theme, working data, requirements and the deadline are given at the start. The project itself is built only during the 3 hours; accounts, practice and generic templates can be prepared before.
- **§4** An AI feature inside the app is **optional**; how AI was used to build the solution is evaluated. Paid plans or the number of tools earn nothing by themselves. We must check every result, calculation and function, and be able to explain our decisions.
- **§4 Mentors** (business, finance, technology, communication) can be asked for clarifications and feedback during the 3 hours. They guide; they don't do the work.
- **§7** Every external resource and template used must be **declared in the AI journal**, respecting licences. Presenting results or functions that don't exist is forbidden (score correction or disqualification).
- **§9** Never put real personal data, confidential information or material we have no rights to into any AI tool.
- **Final** takes place on a later day, after the 24 h appeal window.

## 2. The six deliverables (what the rules literally ask)
| # | Deliverable (RO) | Must contain | Limits |
|---|---|---|---|
| 1 | **Aplicație web publicată** | prototip accesibil prin link; cel puțin o funcție principală testabilă; parcurs simplu de utilizare; date de test dacă există formular | demonstrate the idea, not a complete product |
| 2 | **Strategie pe o pagină** | problema, publicul vizat, soluția, modul de atragere a utilizatorilor sau clienților, trei pași de implementare | max 1 page |
| 3 | **Model financiar** | tabel editabil cu formule: principalele ipoteze, costuri, venituri, rezultatul estimat | one base scenario (more scenarios optional) |
| 4 | **Material de promovare** | o postare sau un afiș: mesaj, element vizual, îndemn la acțiune pentru publicul ales | video and partner offer optional |
| 5 | **Jurnal AI** | instrumentele folosite, trei prompturi relevante, un exemplu de rezultat AI verificat și corectat de echipă | max 1 page |
| 6 | **Pitch și demonstrație** | prezentare de max. 5 slide-uri + linkul prototipului + indicații scurte pentru testarea funcției principale | backup video optional |

## 3. Preselection: committee, assisted by AI, same grid for everyone
| Criteriu | Puncte |
|---|---|
| Aplicație și experiența utilizatorului | 35 |
| Strategie și model financiar | 25 |
| Utilizarea critică a AI | 15 |
| Material de promovare | 15 |
| Pitch predat | 10 |
| **Total** | **100** |

- The **top 10 teams with at least 60 points** reach the final.
- An AI gives an indicative score; the committee checks the results, the **proof that it works** and any inconsistencies. The decision is not fully automated.
- Ties: app score → strategy & financial → critical AI use → committee re-evaluation.

## 4. Final: 5 business jurors; preselection points don't carry over
- Finalists are published on startup.upb.ro; team coordinators are told at their workstations.
- **3 minutes** pitch + demo, **2 minutes** jury questions. Score = average of the jurors.

| Criteriu | Puncte |
|---|---|
| Aplicație și demonstrație | 30 |
| Strategie și model financiar | 30 |
| Utilizarea și înțelegerea AI | 20 |
| Prezentare și răspunsuri | 20 |

- Ties: app → strategy & financial → AI → jury deliberation.

## 5. What this means for us
1. **Write for two readers: an AI and a human.** Use the rules' Romanian words as headings in every deliverable ("Problema", "Publicul vizat", "Soluția"...). PDFs must contain real text, not images of text. Use clear file names.
2. **The app is worth the most and breaks ties.** One main function that works end to end on the live link beats five half-features. The "Completează cu date de test" button and the "Cum testezi" guide stay in the app.
3. **"Critical" AI use means showing the checking, not just the using.** Log every time a model was wrong and how we caught it (`status/*.md` → `AI_JOURNAL.md`). Cross-check important outputs with a different model.
4. **Consistency gets checked.** The same numbers (price, customers, revenue, break-even, funding need) must appear in the strategy, financial model, pitch and poster. They all copy from `business/financial-summary.md`.
5. **Proof of functioning:** screenshots and a recording in `evidence/`; the live link tested in an incognito window and on a phone.
6. **Promo is 15 points, as much as AI use.** It gets a dedicated owner and a real visual.
7. **Declare our pre-made kit** (web starter, financial model and deck templates, workflow files) in the AI journal: already pre-filled in AI_JOURNAL.md.
8. **Only claim what the demo really does.** Plans are labelled as plans, estimates as "(estimare)". No fake features on the landing page, poster or slides.
9. **Use the mentors twice:** business model + numbers after the spec, pitch + poster before the content freeze. A human expert check is also good AI-journal evidence.
10. **The final shifts weight to strategy & finance (30) and AI understanding (20).** Prepare the Q&A in `business/pitch-script.md`.
