import assert from "node:assert/strict";
import testInputs from "../data/test-inputs.json";
import { analyze } from "./palletizer";
import type { PalletizerFormValues } from "./types";

// DESCRIPTION §8 reference record while T07's shared fixture is being prepared.
const reference = {
  companyName: "Patiseria Demo SRL", industry: "umpluturi",
  bucketWeightKg: 13, bucketDiameterMm: 300, bucketHeightMm: 320,
  shape: "rotunda", handle: "metal", material: "plastic",
  lineRatePerMin: 6, shiftsPerDay: 3, palletType: "eur", maxPalletHeightMm: 1600,
  palletChangeMin: 4, separator: "da", twoPalletSpace: "da", conveyorSignals: "da",
} satisfies PalletizerFormValues;

const usesStarterRecords = testInputs.every((record) => "idea" in record);
const normal = analyze(usesStarterRecords ? reference : testInputs[0]);
const overweight = analyze(usesStarterRecords ? { ...reference, bucketWeightKg: 18 } : testInputs[2]);
const invalid = analyze(usesStarterRecords ? { ...reference, bucketWeightKg: "", bucketDiameterMm: 2000 } : testInputs[4]);
assert.equal(normal.ok, true);
assert.equal(normal.verdict, "potrivit");
assert.equal(normal.cycle?.robotRate, 7.4);
assert.equal(overweight.ok, true);
assert.equal(overweight.verdict, "nepotrivit");
assert.equal(overweight.criteria.find(({ id }) => id === "payload")?.status, "nepotrivit");
assert.equal(invalid.ok, false);
assert.equal(invalid.verdict, undefined);
assert.ok(invalid.errors.some((message) => message.includes("Greutatea")));
assert.ok(invalid.errors.some((message) => message.includes("Diametrul")));

const baseline = analyze(reference);
assert.equal(baseline.pattern?.perLayer, 8);
assert.equal(baseline.pattern?.layers, 4);
assert.equal(baseline.pattern?.perPallet, 32);
assert.equal(baseline.pattern?.palletKg, 416);
assert.equal(baseline.cycle?.bucketsPerHour, 360);
assert.equal(baseline.cycle?.bottleneck, "linie");
assert.equal(baseline.cycle?.changeOk, true);
assert.equal(analyze({ ...reference, palletChangeMin: 32 / 6 }).cycle?.changeOk, false);
assert.equal(analyze({ ...reference, bucketWeightKg: "9", lineRatePerMin: "8" }).cycle?.bottleneck, "echilibrat");
assert.equal(analyze({ ...reference, bucketWeightKg: 15 }).verdict, "evaluare");
assert.equal(analyze({ ...reference, bucketWeightKg: 15.001 }).verdict, "nepotrivit");
assert.equal(analyze({ ...reference, maxPalletHeightMm: 400 }).verdict, "nepotrivit");

const dense = analyze({ ...reference, bucketDiameterMm: 250, bucketHeightMm: 150, maxPalletHeightMm: 3000 });
assert.equal(dense.pattern?.layout, "offset");
assert.equal(dense.pattern?.perPallet, 76);
assert.equal(dense.pattern?.palletKg, 988);

console.log(`Palletizer assertions passed for ${usesStarterRecords ? "the §8 equivalents of" : "the shared"} records 1, 3 and 5, plus boundary cases.`);
