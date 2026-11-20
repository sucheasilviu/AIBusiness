// Top-view and side-view SVG schematic of the palletizing pattern.
// Owner: gemini-silviu (T32). Scales cleanly down to 390 px mobile width.
import { demo } from "@/lib/content";
import type { EngineResult } from "@/lib/types";

type Pattern = NonNullable<EngineResult["pattern"]>;

interface PalletViewProps {
  pattern: Pattern;
  bucketHeightMm?: number;
  shape?: "rotunda" | "patrata";
  hasSeparator?: boolean;
}

const PALLET_BASE_MM = 144;
const SEPARATOR_MM = 5;

export default function PalletView({
  pattern,
  bucketHeightMm = 300,
  shape = "rotunda",
  hasSeparator = false,
}: PalletViewProps) {
  const m = demo.result.palletMetrics;
  const { palletMm, bucketMm, positions, perLayer, layers, perPallet, palletKg, layout } = pattern;

  const pad = 64;
  const padLeft = 96;
  const topW = palletMm.l + padLeft + pad;
  const topH = palletMm.w + pad * 2;
  const radius = Math.max(10, bucketMm / 2 - 4);

  // Side view geometry (mm)
  const sepTotal = hasSeparator && layers > 1 ? (layers - 1) * SEPARATOR_MM : 0;
  const totalHeightMm = layers > 0 ? PALLET_BASE_MM + layers * bucketHeightMm + sepTotal : PALLET_BASE_MM;
  const sideCols = Math.max(1, Math.min(4, Math.floor(palletMm.l / Math.max(1, bucketMm))));
  const sideW = palletMm.l + pad * 2;
  const sideH = Math.max(1200, totalHeightMm + 160);
  const baseY = sideH - 70;
  const palletY = baseY - PALLET_BASE_MM;
  const stackWidth = sideCols * bucketMm;
  const stackStartX = pad + (palletMm.l - stackWidth) / 2;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-base font-bold text-ink">{demo.result.palletTitle}</h4>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-muted">
          {layout === "offset" ? m.layoutOffset : m.layoutGrid} · {palletMm.l}×{palletMm.w} mm
        </span>
      </div>

      {/* Key pallet metrics */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 text-center ring-1 ring-slate-200/70">
          <div className="text-xl font-extrabold text-ink">{perLayer}</div>
          <div className="mt-0.5 text-xs text-muted">{m.perLayer}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center ring-1 ring-slate-200/70">
          <div className="text-xl font-extrabold text-ink">{layers}</div>
          <div className="mt-0.5 text-xs text-muted">{m.layers}</div>
        </div>
        <div className="rounded-xl bg-brand-soft p-3 text-center ring-1 ring-brand/20">
          <div className="text-xl font-extrabold text-brand-dark">{perPallet}</div>
          <div className="mt-0.5 text-xs text-brand-dark">{m.perPallet}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-center ring-1 ring-slate-200/70">
          <div className="text-xl font-extrabold text-ink">{palletKg} kg</div>
          <div className="mt-0.5 text-xs text-muted">{m.palletKg}</div>
        </div>
      </div>

      {perPallet === 0 ? (
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">{m.emptyPallet}</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Top view SVG */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold text-ink">{m.topView}</p>
            <svg
              viewBox={`0 0 ${topW} ${topH}`}
              className="mx-auto block h-auto max-h-56 w-full"
              role="img"
              aria-label={`${m.topView}: ${perLayer} ${m.perLayer}`}
            >
              {/* Pallet footprint */}
              <rect
                x={padLeft}
                y={pad}
                width={palletMm.l}
                height={palletMm.w}
                rx={18}
                fill="#ffffff"
                stroke="#1e293b"
                strokeWidth={12}
              />
              {/* Subtle pallet deck boards */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
                <line
                  key={ratio}
                  x1={padLeft + 12}
                  y1={pad + palletMm.w * ratio}
                  x2={padLeft + palletMm.l - 12}
                  y2={pad + palletMm.w * ratio}
                  stroke="#e2e8f0"
                  strokeWidth={6}
                />
              ))}
              {/* Buckets from engine positions */}
              {positions.map((pos, idx) =>
                shape === "patrata" ? (
                  <rect
                    key={`${pos.x}-${pos.y}-${idx}`}
                    x={padLeft + pos.x - radius}
                    y={pad + pos.y - radius}
                    width={radius * 2}
                    height={radius * 2}
                    rx={16}
                    fill="#fff4ed"
                    stroke="#e8590c"
                    strokeWidth={10}
                  />
                ) : (
                  <g key={`${pos.x}-${pos.y}-${idx}`}>
                    <circle
                      cx={padLeft + pos.x}
                      cy={pad + pos.y}
                      r={radius}
                      fill="#fff4ed"
                      stroke="#e8590c"
                      strokeWidth={10}
                    />
                    <circle
                      cx={padLeft + pos.x}
                      cy={pad + pos.y}
                      r={radius * 0.62}
                      fill="none"
                      stroke="#e8590c"
                      strokeOpacity={0.35}
                      strokeWidth={6}
                    />
                  </g>
                ),
              )}
              {/* Dimension labels */}
              <text
                x={padLeft + palletMm.l / 2}
                y={topH - 14}
                textAnchor="middle"
                fontSize={44}
                fontWeight={600}
                fill="#475569"
              >
                {palletMm.l} mm
              </text>
              <text
                x={42}
                y={pad + palletMm.w / 2}
                textAnchor="middle"
                fontSize={40}
                fontWeight={600}
                fill="#475569"
                transform={`rotate(-90 42 ${pad + palletMm.w / 2})`}
              >
                {palletMm.w} mm
              </text>
            </svg>
          </div>

          {/* Side view SVG */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-ink">{m.sideView}</p>
              <span className="text-xs font-medium text-brand-dark">
                {m.totalHeight}: {Math.round(totalHeightMm)} mm
              </span>
            </div>
            <svg
              viewBox={`0 0 ${sideW} ${sideH}`}
              className="mx-auto block h-auto max-h-56 w-full"
              role="img"
              aria-label={`${m.sideView}: ${layers} ${m.layers}, ${Math.round(totalHeightMm)} mm`}
            >
              {/* Ground line */}
              <line x1={pad - 20} y1={baseY} x2={pad + palletMm.l + 20} y2={baseY} stroke="#94a3b8" strokeWidth={8} />

              {/* Pallet wooden base (144 mm) */}
              <rect
                x={pad}
                y={palletY}
                width={palletMm.l}
                height={PALLET_BASE_MM}
                rx={10}
                fill="#cbd5e1"
                stroke="#1e293b"
                strokeWidth={10}
              />
              <text
                x={pad + palletMm.l / 2}
                y={palletY + PALLET_BASE_MM / 2 + 16}
                textAnchor="middle"
                fontSize={44}
                fontWeight={700}
                fill="#1e293b"
              >
                {m.palletBase}
              </text>

              {/* Stacked bucket layers */}
              {Array.from({ length: layers }).map((_, layerIdx) => {
                const sepOffset = hasSeparator ? layerIdx * SEPARATOR_MM : 0;
                const layerTop = palletY - (layerIdx + 1) * bucketHeightMm - sepOffset;
                return (
                  <g key={layerIdx}>
                    {hasSeparator && layerIdx > 0 && (
                      <rect
                        x={stackStartX - 8}
                        y={layerTop + bucketHeightMm}
                        width={stackWidth + 16}
                        height={SEPARATOR_MM + 4}
                        fill="#1e293b"
                      />
                    )}
                    {Array.from({ length: sideCols }).map((__, colIdx) => (
                      <rect
                        key={colIdx}
                        x={stackStartX + colIdx * bucketMm + 8}
                        y={layerTop + 4}
                        width={Math.max(20, bucketMm - 16)}
                        height={Math.max(20, bucketHeightMm - 8)}
                        rx={14}
                        fill="#fff4ed"
                        stroke="#e8590c"
                        strokeWidth={10}
                      />
                    ))}
                  </g>
                );
              })}

              {/* Height callout */}
              <text
                x={pad + palletMm.l / 2}
                y={Math.max(52, palletY - layers * bucketHeightMm - sepTotal - 28)}
                textAnchor="middle"
                fontSize={48}
                fontWeight={700}
                fill="#1e293b"
              >
                {layers} {m.layers.toLowerCase()} · {Math.round(totalHeightMm)} mm
              </text>
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
