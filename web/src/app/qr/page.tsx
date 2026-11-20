import type { Metadata } from "next";
import QrCode from "@/components/QrCode";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `Cod QR | ${site.name}`,
};

// Full-screen QR for slides, the poster or the jury's phones.
export default function QrPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-12 text-center">
      <h1 className="text-3xl font-bold text-ink">Scanează și testează {site.name}</h1>
      <p className="mt-2 text-muted">{site.tagline}</p>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <QrCode />
      </div>
    </div>
  );
}
