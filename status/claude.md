# status/claude.md (only `claude` edits this file)

## Now
- (task ID + one line)

## Done
<!-- newest first: T## · what changed (files) · how it was checked · notes for the next agent -->

## Blockers
<!-- what you need, from whom (whose lane), since when -->

## AI log
<!-- one line each: what a model got wrong or which prompt worked well · how it was caught · the fix -->
- Claude proposed a segment covering 3 industries (bakery, dairy, paints/construction) · the mentor said to focus on one industry's problem; on re-check, paint/plaster buckets are often above the UR20's usable load · narrowed to bakery ingredients (PURATOS's own industry)
- 13:30 live /api/ai (gemini-3.1-flash-lite), test record 1: numbers 32 buckets/pallet, 416 kg, 19% robot idle all match the engine; BUT a question calls 5.3 min a "pallet change" time; 5.3 min is the pallet FILL time (32 ÷ 6/min), the change time entered was 4 min · caught by checking each AI number against the EngineResult · fix: prompt must label palletFillMin vs palletChangeMin explicitly (codex-silviu)
- Gemini (graphify repo map) returned nodes for only 10 of 43 docs and said nothing about the rest · caught by graphify's coverage warning · retried once, then used only for the code map

## Checkpoint log
<!-- 12:25 / 12:55: 3 lines each: on track?, what changed, what was cut -->
- 12:51 · NOT on track: ~25 min behind; T05 + T06 done, T30 engine + T08 demo not started; no visible work from laptop B (nothing pushed)
- Changed: live demo now due 13:10; T30 is the top priority; T07 urgent; T09 deploy now; T35/T37 checks allowed until 13:25
- Cut: T33 cycle animation. Vision (T31/T34/T37) only if T30 + T08 work by 13:05. Freeze 13:15 unchanged

