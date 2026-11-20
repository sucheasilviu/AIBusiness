# Jurnal AI: Echipa Sick7 · PaletScan UR20

## Instrumente folosite
| Instrument | Model | Pentru ce l-am folosit |
|---|---|---|
| Claude Code (Anthropic) | Claude Opus 5.5 | coordonarea celor 4 agenți, alegerea ideii, specificația produsului, plan și verificări, scenariul pitch-ului, acest jurnal |
| Claude (aplicația) | Claude | prezentarea (5 slide-uri) și afișul |
| Codex (OpenAI) | modelul implicit din Codex | motorul de calcul pentru paletizare, ruta AI, promptul, modelul financiar |
| Antigravity (Google) | Gemini | interfața și desenul paletului, testarea în browser, cercetarea de piață, strategia, imaginile pentru afiș |
| Gemini API (Google) | gemini-3.1-flash-lite | funcția AI din aplicație: explicația verdictului și 3 întrebări pentru întâlnirea tehnică |

**Regula de bază:** în aplicație, AI-ul nu decide nimic. Verdictul, numărul de găleți pe palet, ritmul și blocajul vin dintr-un motor cu reguli fixe, verificat cu teste automate. AI-ul doar explică rezultatul.

## Trei prompturi relevante
1. **Alegerea ideii:** „find something more technically impressive while keeping the focus on the business part” (către Claude Code) → ne-a propus PaletScan: calcul de paletizare + desen al paletului + o cerere tehnică gata completată pentru Tech-Con.
2. **Motorul de calcul:** „Do T30 in TASKS.md now (palletizing engine, web/src/lib/palletizer.ts), following DESCRIPTION.md §8 engine rules. […] When the asserts pass and npm run build is green, commit and push” (către Codex) → motorul determinist, cu teste pe cazul normal, cazul nepotrivit și cazul cu date greșite.
3. **Corectarea AI-ului:** „Bug: the live AI explanation called palletFillMin (5.3 min) a "pallet change" time […] label both values explicitly in the user prompt and add the rule: use only the numbers given, with their labels.” (către Codex) → promptul corectat, verificat apoi pe modelul live.

## Exemplu de rezultat AI verificat și corectat
- **Ce a generat AI-ul:** pentru găleata de 13 kg și linia de 6 găleți/min, explicația Gemini din aplicația publicată întreba dacă se poate face „o schimbare a paletului mai rapidă decât cele 5,3 minute estimate”.
- **Cum am verificat:** am comparat fiecare cifră din textul AI cu rezultatul motorului de calcul. 32 găleți/palet, 416 kg și 19% timp de așteptare al robotului erau corecte.
- **Ce era greșit:** 5,3 minute nu este timpul de schimbare, ci timpul de **umplere** a unui palet (32 găleți ÷ 6 găleți/min). Timpul de schimbare introdus era 4 minute. Un director de producție ar fi tras o concluzie greșită.
- **Varianta corectată:** promptul trimite acum ambele valori cu etichete explicite („timp de umplere a unui palet” și „timp de schimbare manuală a paletului”) și interzice folosirea altor cifre. La retestare pe modelul live, explicația a folosit corect „timpul estimat de umplere”.
- **Ce am învățat:** un AI poate folosi cifra corectă cu eticheta greșită. De aceea cifrele vin din reguli, iar textul AI se verifică număr cu număr.

**Alte corecturi prinse:** (1) Claude a propus inițial un segment din 3 industrii; mentorul ne-a cerut o singură industrie, iar la verificare gălețile de vopsea și tencuială depășesc adesea sarcina utilă a robotului, așa că am ales ingredientele de panificație, industria PURATOS. (2) La cercetare, Gemini a arătat că doar producătorii de ingrediente de panificație nu acoperă 17 clienți într-un an; am adăugat în strategie extinderea spre industrii vecine (lactate, sosuri, gemuri). (3) Model AI configurat inițial: unele ID-uri dădeau 404 sau expirau; le-am testat pe rând și l-am ales pe cel care răspunde (gemini-3.1-flash-lite), iar aplicația are un text de rezervă dacă AI-ul nu răspunde.

## Resurse externe și șabloane folosite (declarate conform §7)
- Șablon web generic, pregătit înainte de concurs, fără legătură cu tema: Next.js (MIT), React (MIT), Tailwind CSS (MIT), @google/genai (Apache-2.0), qrcode (MIT).
- Șabloane generice pregătite înainte cu ajutorul AI (Claude): structura modelului financiar (completat în concurs), șablon de prezentare cu pictograme Font Awesome Free (CC BY 4.0), fișierele de lucru pentru agenți.
- Date de lucru de la organizatori: studiul de caz Tech-Con / PURATOS (`brief/Cerinte_proba_SYSUP_2026.pdf`).
- Imagini generate cu Gemini (Antigravity): `galeata-test.png`, `poster-bg-1.png`, `poster-bg-2.png`, fără logouri sau text.
- Surse publice pentru cercetare: Termene.ro, TopFirme.com, Verti.ro, RisCo.ro, INS/Eurostat, IFR World Robotics, GastroPan.ro și repere de cost per clic B2B (lista completă în `business/research.md`).
- Instrument auxiliar: graphify (hartă a codului, folosită doar intern).

## Cum am lucrat cu AI
Cinci agenți AI pe două laptopuri, fiecare cu fișierele lui, coordonați prin `TASKS.md` și `DESCRIPTION.md`. Fiecare cifră importantă a fost verificată prin calcul, prin testele motorului sau de un al doilea model, iar fiecare greșeală prinsă a fost notată în jurnalele de lucru ale agenților.
