import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// One-off image optimisation script.
//
// `next.config.ts` keeps `images: { unoptimized: true }` to stay safely
// inside the Hostinger Next.js plan, so we cannot rely on Next.js's
// build-time srcset / AVIF / WebP pipeline. Instead this script
// pre-compresses every JPEG and PNG in public/images/ in place so the
// browser downloads a smaller file directly.
//
// Settings:
//   JPEG: mozjpeg, quality 72, progressive, default chromaSubsampling
//   PNG : palette quantisation when applicable, max zlib compression
//
// Re-run after adding new images: `npm run optimize:images`.

const IMAGE_DIR = path.resolve("public", "images");

const formatBytes = (n) => {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(2)} MB`;
  if (n > 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
};

// Max width caps. PNG product photos render at <= 320px logical width
// on the largest card surface so 800px is plenty even for 2x retina.
// JPEG hero/portrait may stretch to full viewport so we leave them at
// their authored size unless they are absurdly large.
const PNG_MAX_WIDTH = 800;
const JPEG_MAX_WIDTH = 1920;

async function optimiseFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const original = await fs.readFile(filePath);
  const beforeBytes = original.length;

  let pipeline = sharp(original);
  const meta = await pipeline.metadata();

  let buffer;
  if (ext === ".jpg" || ext === ".jpeg") {
    if (meta.width && meta.width > JPEG_MAX_WIDTH) {
      pipeline = pipeline.resize({ width: JPEG_MAX_WIDTH, withoutEnlargement: true });
    }
    buffer = await pipeline
      .jpeg({
        quality: 72,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer();
  } else if (ext === ".png") {
    if (meta.width && meta.width > PNG_MAX_WIDTH) {
      pipeline = pipeline.resize({ width: PNG_MAX_WIDTH, withoutEnlargement: true });
    }
    buffer = await pipeline
      .png({
        compressionLevel: 9,
        palette: true,
        quality: 80,
        effort: 10,
      })
      .toBuffer();
  } else {
    return { filePath, skipped: true };
  }

  const afterBytes = buffer.length;
  if (afterBytes >= beforeBytes) {
    return { filePath, beforeBytes, afterBytes, skipped: true, reason: "no gain" };
  }

  await fs.writeFile(filePath, buffer);
  return { filePath, beforeBytes, afterBytes, skipped: false };
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const files = await walk(IMAGE_DIR);

  if (files.length === 0) {
    console.log("No JPEG or PNG files found in public/images/");
    return;
  }

  console.log(`Optimising ${files.length} image(s) in ${IMAGE_DIR}\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const file of files) {
    const rel = path.relative(IMAGE_DIR, file).replaceAll(path.sep, "/");
    try {
      const result = await optimiseFile(file);
      results.push({ name: rel, ...result });
      if (!result.skipped) {
        totalBefore += result.beforeBytes;
        totalAfter += result.afterBytes;
      }
    } catch (err) {
      results.push({
        name: rel,
        error: err.message,
      });
    }
  }

  for (const r of results) {
    if (r.error) {
      console.log(`  X ${r.name}: ${r.error}`);
    } else if (r.skipped) {
      console.log(`  - ${r.name}: skipped${r.reason ? ` (${r.reason})` : ""}`);
    } else {
      const saved = r.beforeBytes - r.afterBytes;
      const pct = ((saved / r.beforeBytes) * 100).toFixed(1);
      console.log(
        `  ${r.name}: ${formatBytes(r.beforeBytes)} -> ${formatBytes(
          r.afterBytes
        )}  (-${pct}%)`
      );
    }
  }

  const saved = totalBefore - totalAfter;
  if (saved > 0) {
    const pct = ((saved / totalBefore) * 100).toFixed(1);
    console.log(
      `\nTotal: ${formatBytes(totalBefore)} -> ${formatBytes(
        totalAfter
      )}  (saved ${formatBytes(saved)}, -${pct}%)`
    );
  } else {
    console.log("\nNo savings (all files already optimal).");
  }
}

main().catch((err) => {
  console.error("optimize-images failed:", err);
  process.exit(1);
});
