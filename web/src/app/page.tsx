// Landing page. All texts come from src/lib/content.ts (owner: gemini-silviu).
import Link from "next/link";
import HowToTest from "@/components/HowToTest";
import ResultView from "@/components/ResultView";
import { landing, site } from "@/lib/content";
import { fallbackResult } from "@/lib/fallback";
import testInputs from "@/data/test-inputs.json";

// Static preview of what the product returns (uses the canned example, no API call).
const preview = { source: "fallback" as const, result: fallbackResult(testInputs[0] ?? {}) };

export default function Home() {
  const { hero, problem, solution, steps, pricing, finalCta } = landing;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-soft to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/20">
              {hero.eyebrow}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">{hero.title}</h1>
            <p className="mt-4 text-lg text-muted">{hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={site.primaryCta.href}
                className="rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-dark"
              >
                {site.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="rounded-full bg-white px-6 py-3 font-semibold text-ink ring-1 ring-slate-200 transition hover:ring-slate-300"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
            <div className="mt-8 max-w-md">
              <HowToTest showDemoLink />
            </div>
          </div>
          <div className="pointer-events-none select-none md:pl-6" aria-hidden="true">
            <ResultView response={preview} compact />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id={problem.id} className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{problem.title}</h2>
        <p className="mt-3 max-w-3xl text-lg text-muted">{problem.text}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {problem.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 p-5">
              <div className="text-3xl font-extrabold text-brand">{stat.value}</div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Solution */}
      <section id={solution.id} className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{solution.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {solution.items.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id={steps.id} className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{steps.title}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.items.map((step, index) => (
            <li key={step} className="flex gap-4 rounded-2xl border border-slate-200 p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section id={pricing.id} className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">{pricing.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pricing.plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ${plan.highlighted ? "ring-2 ring-brand" : "ring-slate-200"}`}
              >
                <h3 className="font-semibold text-ink">{plan.name}</h3>
                <p className="mt-2 text-3xl font-extrabold text-ink">
                  {plan.price}
                  <span className="text-base font-medium text-muted">{plan.period}</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{finalCta.title}</h2>
        <p className="mt-2 text-muted">{finalCta.text}</p>
        <Link
          href={site.primaryCta.href}
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-dark"
        >
          {site.primaryCta.label}
        </Link>
      </section>
    </>
  );
}
