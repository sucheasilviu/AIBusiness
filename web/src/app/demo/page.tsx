import type { Metadata } from "next";
import DemoForm from "@/components/DemoForm";
import HowToTest from "@/components/HowToTest";
import { demo, site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Demo | ${site.name}`,
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{demo.title}</h1>
      <p className="mt-2 text-muted">{demo.intro}</p>
      <div className="mt-6">
        <HowToTest />
      </div>
      <div className="mt-6">
        <DemoForm />
      </div>
    </div>
  );
}
