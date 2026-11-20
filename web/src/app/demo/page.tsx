import type { Metadata } from "next";
import DemoForm from "@/components/DemoForm";
import HowToTest from "@/components/HowToTest";
import { demo, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Evaluare linie | ${site.name}`,
  description: demo.intro,
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">{site.name}</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{demo.title}</h1>
        <p className="text-sm text-muted sm:text-base">{demo.intro}</p>
      </div>
      <div className="mt-5">
        <HowToTest />
      </div>
      <div className="mt-6">
        <DemoForm />
      </div>
    </div>
  );
}
