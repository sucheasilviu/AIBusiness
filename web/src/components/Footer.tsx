import Link from "next/link";
import { footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{footer.text}</p>
        <div className="flex gap-4">
          <Link href="/demo" className="hover:text-ink">
            Demo
          </Link>
          <Link href="/qr" className="hover:text-ink">
            Cod QR
          </Link>
        </div>
      </div>
    </footer>
  );
}
