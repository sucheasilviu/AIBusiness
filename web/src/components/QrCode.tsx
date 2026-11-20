"use client";

// QR code for the live URL of this deployment (uses the address in the browser bar).
import QRCode from "qrcode";
import { useEffect, useState } from "react";

export default function QrCode({ path = "/demo", size = 320 }: { path?: string; size?: number }) {
  const [url, setUrl] = useState("");
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    const target = `${window.location.origin}${path}`;
    setUrl(target);
    QRCode.toDataURL(target, { width: size, margin: 1, errorCorrectionLevel: "M" })
      .then(setDataUrl)
      .catch(() => setDataUrl(""));
  }, [path, size]);

  return (
    <div className="flex flex-col items-center gap-3">
      {dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={dataUrl} alt={`Cod QR pentru ${url}`} width={size} height={size} className="rounded-xl" />
      ) : (
        <div className="animate-pulse rounded-xl bg-slate-100" style={{ width: size, height: size }} />
      )}
      <p className="break-all text-center text-sm text-muted">{url}</p>
    </div>
  );
}
