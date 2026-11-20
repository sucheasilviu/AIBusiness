// Makes a QR code for the live app, for the poster and the slides.
// Usage (inside web/):  npm run qr -- https://your-app.vercel.app/demo
// Output: ../submission/qr.png (1024 px) and ../submission/qr.svg
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const url = process.argv[2];
if (!url || !/^https?:\/\//.test(url)) {
  console.error("Usage: npm run qr -- https://your-app.vercel.app/demo");
  process.exit(1);
}

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "../../submission");
mkdirSync(outDir, { recursive: true });
await QRCode.toFile(resolve(outDir, "qr.png"), url, { width: 1024, margin: 2 });
await QRCode.toFile(resolve(outDir, "qr.svg"), url, { type: "svg", margin: 2 });
console.log(`QR for ${url} -> ${resolve(outDir, "qr.png")} and qr.svg`);
