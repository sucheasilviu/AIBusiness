// Landing page for PaletScan UR20. All texts come from src/lib/content.ts (owner: gemini-silviu).
import Link from "next/link";
import HowToTest from "@/components/HowToTest";
import { landing, site } from "@/lib/content";

export default function Home() {
  const { hero, problem, steps, resultOverview, puratos, finalCta } = landing;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-soft via-white to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-18">
          <div>
            <p className="mb-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-dark ring-1 ring-brand/25">
              {hero.eyebrow}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={site.primaryCta.href}
                className="rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-dark"
              >
                {site.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="rounded-full bg-white px-6 py-3 font-semibold text-ink ring-1 ring-slate-300 transition hover:ring-slate-400"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
            <div className="mt-8 max-w-md">
              <HowToTest showDemoLink />
            </div>
          </div>

          {/* Static preview card showing what the demo outputs */}
          <div className="md:pl-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {hero.preview.badge}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                  {hero.preview.verdict}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-bold text-ink">{hero.preview.title}</h2>
              <p className="mt-1 text-sm text-muted">{hero.preview.summary}</p>

              {/* Simple schematic of 8 buckets on an EUR pallet */}
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <svg
                  viewBox="0 0 240 160"
                  className="mx-auto h-36 w-full max-w-[260px]"
                  role="img"
                  aria-label="Schemă palet EUR cu 8 găleți pe strat"
                >
                  <rect
                    x="8"
                    y="8"
                    width="224"
                    height="144"
                    rx="8"
                    fill="#ffffff"
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                  {[42, 94, 146, 198].map((cx) =>
                    [50, 110].map((cy) => (
                      <g key={`${cx}-${cy}`}>
                        <circle cx={cx} cy={cy} r="22" fill="#fff4ed" stroke="#e8590c" strokeWidth="2.5" />
                        <circle cx={cx} cy={cy} r="14" fill="none" stroke="#e8590c" strokeOpacity="0.35" strokeWidth="1.5" />
                      </g>
                    ))
                  )}
                </svg>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {hero.preview.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-slate-50 p-2.5 text-center ring-1 ring-slate-200/70">
                    <div className="text-sm font-bold text-ink">{m.value}</div>
                    <div className="text-xs text-muted">{m.label}</div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-muted">{hero.preview.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id={problem.id} className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{problem.title}</h2>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{problem.text}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {problem.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="text-2xl font-extrabold text-brand sm:text-3xl">{stat.value}</div>
              <div className="mt-2 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works (3 steps) */}
      <section id={steps.id} className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{steps.title}</h2>
          <p className="mt-2 text-muted">{steps.subtitle}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.items.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-xs ring-1 ring-slate-200"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What the result contains */}
      <section id={resultOverview.id} className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{resultOverview.title}</h2>
        <p className="mt-2 text-muted">{resultOverview.subtitle}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {resultOverview.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand-dark">
                {item.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PURATOS reference facts (labelled as test results) */}
      <section id={puratos.id} className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-300">{puratos.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{puratos.title}</h2>
          <p className="mt-3 max-w-3xl text-slate-300">{puratos.text}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {puratos.facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-slate-700 bg-slate-800/70 p-5">
                <div className="text-2xl font-extrabold text-brand sm:text-3xl">{fact.value}</div>
                <div className="mt-2 text-sm text-slate-300">{fact.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">{puratos.disclaimer}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{finalCta.title}</h2>
        <p className="mt-2 text-muted">{finalCta.text}</p>
        <Link
          href={site.primaryCta.href}
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-white shadow-sm transition hover:bg-brand-dark"
        >
          {site.primaryCta.label}
        </Link>
      </section>
    </>
  );
}
