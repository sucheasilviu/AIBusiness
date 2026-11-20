"use client";

// In-app guide for judges: how to test the main function in 30 seconds.
import Link from "next/link";
import { useState } from "react";
import { howToTest } from "@/lib/content";

export default function HowToTest({ showDemoLink = false }: { showDemoLink?: boolean }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <aside className="relative rounded-2xl border border-brand/20 bg-brand-soft p-5 text-sm">
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute right-3 top-3 rounded-full px-2 text-muted hover:text-ink"
        aria-label="Închide"
      >
        ×
      </button>
      <p className="mb-2 font-semibold text-brand-dark">{howToTest.title}</p>
      <ol className="list-decimal space-y-1 pl-5 text-ink">
        {howToTest.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {showDemoLink && (
        <Link href="/demo" className="mt-3 inline-block font-semibold text-brand hover:underline">
          Mergi la demo →
        </Link>
      )}
    </aside>
  );
}
