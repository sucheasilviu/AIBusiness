# CHALLENGE: rules digest
Source: the regulament (sections 5–6, screenshots shared by Silviu). Romanian wording is kept where the grid uses it.

## 0. Today's brief (Silviu pastes it here at 11:00, word for word)
> _(paste the official theme / brief here)_

**Organizer instructions** (they said formats, size limits and the submission place are announced before the start):
- Formats: …
- Size limits: …
- Where and how to submit: …
- Anything else said at the start: …

## 1. Hard facts
- Time: **11:00–14:00** (3 h). Only the version handed in on time is evaluated; later changes are ignored.
- Same requirements for teams and individuals. We use our own laptops. Pre-made code and templates are allowed.
- Testing uses **fictitious data only** (if the theme needs a form, use test data).
- Report technical problems to the organizers **immediately**. If organizer infrastructure fails, the committee decides a fair fix.
- A missing deliverable costs the points of its criterion.
- Optional extras (video, partner offer, extra scenarios) earn **no points by themselves**.
- Strategy, financial model and promo content may be reused in the pitch.

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
7. **The final shifts weight to strategy & finance (30) and AI understanding (20).** Prepare the Q&A in `business/pitch-script.md`.
