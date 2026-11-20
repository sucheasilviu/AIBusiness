# Cercetare de piață — PaletScan UR20
> Owner: `gemini-mihai`. Fiecare cifră are sursă sau „(estimare)”. Datele PURATOS sunt rezultate de test (brief), nu garanții.

## 0. Scanare rapidă
- **Mărimea pieței (România):** Codul CAEN 1089 („Alte produse alimentare n.c.a.”, unde intră ingredientele/drojdia/premixurile) are ~315–400 firme active (cifră de afaceri cumulată ~2,1 mld. RON) [[S1]](#6-surse); însă producătorii cu fabrică locală care ambalează ingrediente de panificație/cofetărie în găleți de 5–13 kg sunt estimați la **25–45 de companii (estimare)**, dintre care ~10–15 fabrici mari/medii (restul fiind distribuitori/importatori).
- **Cine are problema:** Directorii de producție din fabricile de ingrediente de panificație și cofetărie (umpluturi, creme, glazuri, amelioratori), unde paletizarea manuală la 6 găleți/min × 13 kg înseamnă **~4,7 tone ridicate manual pe oră** (calcul din datele brief-ului; la PURATOS lucrau 2 operatori/tură, 2–3 ture/zi, sursă: brief).
- **3 soluții existente și prețuri:**
  1. **Kit cobot UR20 + Robotiq PE20 (doar hardware + gripper, fără integrare CE/conveior):** 80.000–95.000 EUR, plus 13.000–35.000+ EUR integrare și siguranță [[S2]](#6-surse) (total comparabil cu celula la cheie Tech-Con: **130.000 EUR**, brief).
  2. **Celulă robotizată industrială la cheie (ABB/FANUC/KUKA — integratori RO precum Eurodac Automation, INNO Robotics PalletPro):** 35.000–55.000 EUR variante compacte entry-level; **60.000–120.000+ EUR** celule industriale complete de mare viteză [[S3]](#6-surse).
  3. **Paletizare manuală (status quo):** investiție inițială 0 EUR, dar 2 operatori/tură × 2–3 ture (brief) și expunere directă la deficitul cronic de personal.
- **Un fapt surprinzător:** România a înregistrat în 2024–2025 o scădere de **11,7%** a volumului de muncă din sectorul agroalimentar — cel mai abrupt declin din UE [[S4]](#6-surse) — în timp ce densitatea de roboți industriali a României rămâne mult sub media UE-27 de **231–240 roboți / 10.000 angajați** (istoric sub 20/10.000 în România) [[S5]](#6-surse).
- **Semnal critic pentru modelul financiar (§12):** Nișa „doar producători de ingrediente de panificație din România” (~25–45 fabrici, estimare) este excelentă ca **prim segment de intrare (beachhead)** datorită referinței PURATOS, dar **prea îngustă singură** pentru 170 de cereri relevante și 17 clienți noi în 8 luni; pentru a atinge 25 de celule în Anul 1, funnel-ul trebuie deschis din trimestrul 2 și către industriile alimentare adiacente cu găleți de 5–13 kg (lactate/iaurt/smântână, sosuri/maioneze, gemuri/procesare fructe).

## 1. Mărimea pieței
- **Piața totală (TAM — România, fabrici alimentare cu ambalare în găleți 5–13 kg):** CAEN 1089 (~315–400 firme active) + CAEN 1072 (~310–330 firme active cu bilanț, 4,6 mld. RON, din care top 10% fac >91% din piață [[S6]](#6-surse)) + procesatori de lactate/sosuri/fructe. Estimăm **300–450 de fabrici alimentare** în România cu linii de ambalare la găleată sau recipient rigid compatibil (estimare). *(Notă: CAEN 1071 are >6.000 de firme active [[S6]](#6-surse), dar acestea sunt brutării/patiserii, nu producători de ingrediente.)*
- **Piața accesibilă (SAM — segment principal + adiacent alimentar compatibil UR20):**
  - *Segment de intrare (ingrediente panificație & cofetărie la găleată 5–13 kg):* **25–45 producători cu fabrică în RO** (estimare), cu potențial de 35–60 celule (estimare; PURATOS a instalat 2 celule).
  - *Extindere Anul 1 (lactate la găleată, sosuri/maioneze HoReCa, gemuri/fructe procesate):* încă **120–180 fabrici medii/mari** (estimare) → SAM combinat: **~150–225 fabrici** (~225–340 celule potențiale la 1,5 celule/fabrică, estimare).
- **Ținta realistă în Anul 1 (SOM — din DESCRIPTION §12):** **17 clienți / 25 celule** (comenzi până în august, livrare ~4 luni; 3.250.000 EUR venituri). Reprezintă ~8–11% din SAM combinat (estimare) — **credibil doar dacă** beachhead-ul de ingrediente panificație aduce primii 4–6 clienți (estimare), iar adiacentele alimentare (lactate, creme, sosuri, gemuri) aduc diferența de 11–13 clienți în lunile 3–8.

## 2. Publicul vizat
- **Segment principal:** Producătorii din România de ingrediente pentru panificație și cofetărie (umpluturi termostabile, creme, glazuri, amelioratori, gemuri industriale) care ambalează în găleți de 5–13 kg. **Decident:** directorul de producție / directorul de fabrică; avizează directorul de investiții / administratorul.
- **Cine plătește:** Clientul industrial cumpără celula UR20 la cheie (130.000 EUR, brief) de la Tech-Con; PaletScan UR20 este gratuit (instrument de calificare comercială).
- **Principalii jucători identificați în România (Top 10 public — fabrici locale vs. distribuitori):**
  1. **Dr. Oetker RO SRL** (fabrică Curtea de Argeș — creme, glazuri, ingrediente deserturi): 483,5 mil. RON, 510 angajați (2025) [[S7]](#6-surse).
  2. **Orkla Foods România SA** (3 fabrici: București, Covasna, Iași — divizia B2B umpluturi *Credi*, creme *Paticrem*, margarină industrială): 399,3 mil. RON, 391 angajați (2025) [[S7]](#6-surse).
  3. **Puratos Prod SRL** (fabrică Tunari, Ilfov — umpluturi fructe, creme, glazuri; referința Tech-Con, 2 celule UR20): ~276,6 mil. RON, ~150 angajați (2025) [[S8]](#6-surse).
  4. **Rompak SRL** (fabrică Pașcani — Pakmaya: drojdie, amelioratori, premixuri): ~218,6 mil. RON, 254 angajați (2025) [[S8]](#6-surse).
  5. **Zeelandia SRL** (fabrică Valea Lupului/Miroslava, Iași — umpluturi fructe, creme, glazuri, mixuri): ~89,9 mil. RON, 105 angajați (2025) [[S8]](#6-surse).
  6. **Eurocas** (producție proprie în RO — umpluturi de fructe, creme, toppinguri la găleată B2B) [[S9]](#6-surse).
  7. **Duro** (fabrică RO — gemuri/marmelade termostabile pentru patiserie/biscuiți) [[S9]](#6-surse).
  8. **Annabella / Râureni** (procesare fructe, gemuri și piureuri inclusiv pentru segmentul industrial/HoReCa) [[S9]](#6-surse).
  9. **Lesaffre România SRL** (~106,1 mil. RON, 22 angajați) & **Ireks Pan România SRL** (~43,2 mil. RON, 29 angajați) — predomină distribuția/importul, dar au contact direct cu fabricile de profil [[S7]](#6-surse) [[S8]](#6-surse). *(Alți furnizori activi prin distribuție/import: Dawn Foods, Bakels, Azaria Food, CrisFoods.)*
- **Unde îi găsim (târguri, asociații, digital):** **GastroPan** (cel mai mare târg B2B de panificație/cofetărie din RO, organizat anual la Sibiu/Târgu Mureș, mii de vizitatori B2B) [[S10]](#6-surse), **ROMPAN** (Patronatul Român din Industria de Morărit și Panificație) [[S10]](#6-surse), **INDAGRA FOOD** / **RoAliment**, **LinkedIn** (filtru: Director Producție / Plant Manager în industria alimentară RO) și **Google Search**.

## 3. Concurenți și alternative
| Nume / Alternativă | Ce oferă | Preț | Punct slab |
|---|---|---|---|
| **Tech-Con (celulă UR20 la cheie)** | Robot UR20 + gripper pneumatic + viziune SICK 2D (mâner) + 3 scannere siguranță + instalare + instruire | **130.000 EUR** (brief) | Schimbare palet & separator manuale; livrare ~4 luni |
| **Kit UR20 + Robotiq PE20 (alți distribuitori)** | Braț UR20 (55–65k) + kit PE20 (19–23k) + gripper vacuum (5–8k), fără integrare completă CE/găleți | **80.000–95.000 EUR** hardware + 13–35k+ integrare [[S2]](#6-surse) | Gripperul vacuum nu rezolvă orientarea mânerului găleții fără viziune și gripper dedicat |
| **Integratori locali roboți industriali (Eurodac Automation, INNO Robotics PalletPro, Smart Tech)** | Celule cu roboți industriali ABB, FANUC (M-410), KUKA (KR PA) + garduri de protecție | **35.000–55.000 EUR** (compact) / **60.000–120.000+ EUR** (complex) [[S3]](#6-surse) | Amprentă mare (garduri fixe), flexibilitate mai mică la spații înguste, ofertare lentă doar după vizită |
| **Paletizare manuală (status quo)** | 2 operatori/tură × 2–3 ture (cazul PURATOS înainte de automatizare, brief) | **0 EUR** CAPEX; cost recurent salarial (estimare) | Deficit critic de personal (-11,7% forță muncă agroalimentară RO [[S4]](#6-surse)), efort de ~4,7 t/oră |

## 4. Repere de preț
- Prețul celulei Tech-Con (**130.000 EUR**, brief) este **aliniat pieței** pentru o celulă completă cu UR20: doar hardware-ul UR20 + kit standard + gripper ajunge la 80.000–95.000 EUR, iar adăugarea viziunii 2D SICK, a gripperului pneumatic dedicat pentru găleți, a 3 scannere de siguranță, a integrării de conveior, a certificării CE și a instruirii adaugă 25.000–40.000 EUR [[S2]](#6-surse) (estimare).
- Avantajul comercial nu este „cel mai mic preț”, ci **soluția deja validată pe găleți de 5 kg și 13 kg în industria de ingrediente (PURATOS)**, amprenta compactă colaborativă și pre-evaluarea rapidă prin **PaletScan UR20**.

## 5. Canale de atragere a clienților (buget total: 30.000 EUR/an, DESCRIPTION §12)
| Canal | Buget propus (EUR) | Cost unitar estimat (RO) | Rezultat așteptat (An 1, estimare — aliniat `financial-summary.md`) |
|---|---|---|---|
| **Google Search** („robot paletizare găleți”, „paletizare automată”) | 7.000 | CPC **0,80–3,50 EUR** [[S11]](#6-surse) | **43 cereri relevante** |
| **LinkedIn Ads** (directori producție/fabrică industrie alimentară RO) | 6.000 | CPC **6,00–14,00 EUR** [[S11]](#6-surse) | **37 cereri relevante** |
| **Conținut UR20 (4.500) + PaletScan & SEO/AI (3.500)** | 8.000 | Producție video/caz + pagină web | **50 cereri relevante** (28 + 22; alocare proporțională model) |
| **Webinarii, demonstrații & târguri (ex. GastroPan/ROMPAN)** | 3.000 | Participare / webinar B2B | **19 cereri relevante** |
| **Direct marketing legitim + CRM (2.500) + teste YouTube (1.000) + rezervă (2.500)** | 6.000 | Contactare B2B țintită + retargeting | **21 cereri relevante** (15 + 6 + 0 din rezervă înainte de realocare) |
| **Total (țintă model §12)** | **30.000** | **~176 EUR / cerere relevantă** | **170 cereri → 68 întâlniri (40%) → 17 clienți (25%)** |

## 6. Surse
1. TopFirme / Termene — Statistici CAEN 1089 România (~315–400 firme active, ~2,1 mld. RON): https://www.topfirme.com · https://termene.ro
2. Prețuri hardware UR20 (55–65k EUR), Robotiq PE20 (19–23k EUR) și integrare celulă: https://www.mybotshop.de · https://robotiq.com · https://automationdistribution.com
3. Prețuri celule industriale de paletizare și integratori în România (Eurodac Automation, INNO Robotics, Smart Tech): https://eurodacautomation.ro · https://inno-robotics.com · https://smart-technology.ro
4. Deficit forță de muncă agroalimentară România (-11,7%, 2024–2025, Eurostat / INS): https://insse.ro · https://revista-ferma.ro
5. Densitatea de roboți industriali UE-27 (231–240 / 10.000 angajați) vs. România (IFR World Robotics): https://ifr.org · https://business-review.eu
6. Statistici CAEN 1071 (>6.000 firme) și CAEN 1072 (~310–330 firme active, 4,6 mld. RON): https://termene.ro · https://verti.ro
7. Date financiare 2025 (bilanțuri MF) — Dr. Oetker RO, Orkla Foods România, Ireks Pan România: https://termene.ro · https://www.risco.ro
8. Date financiare 2025 — Puratos Prod, Rompak (Pakmaya), Zeelandia, Lesaffre România: https://termene.ro · https://verti.ro · https://datefirma.ro
9. Producători români de umpluturi/creme/gemuri B2B la găleată: https://eurocas.ro · https://duro.ro · https://www.orkla.ro · https://www.zeelandia.ro
10. Târg și asociație panificație/cofetărie România — GastroPan & ROMPAN: https://www.gastropan.ro
11. Repere CPC B2B România (Google Ads 0,80–3,50 EUR; LinkedIn Ads 6–14 EUR): https://pixeragency.ro · https://aimers.io · https://dafe.ro
