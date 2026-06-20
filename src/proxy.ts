import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// SITE PARKED — temporary "Contact Anointed Coder" holding page.
//
// Next.js 16 renamed Middleware to Proxy. While this version of the file is in
// place, EVERY route serves the contact page below and nothing else.
//
// The full website code is untouched elsewhere in this repo, and the ORIGINAL
// version of this file (the admin-session gate) is preserved on the
// `full-site` branch.
//
// ▶ TO RESTORE THE LIVE SITE (brings back the real site + its admin gate):
//     git checkout full-site -- src/proxy.ts
//     git commit -m "restore: bring site back live"
//     git push
//   Vercel auto-redeploys the full website.
//
// The 503 status + Retry-After header tells search engines this is a temporary
// outage, so rankings recover cleanly once restored. The page still renders
// normally in every browser.
// ─────────────────────────────────────────────────────────────────────────────

const TELEGRAM_URL = "https://t.me/AnointedCoder";
const WHATSAPP_URL = "https://wa.link/fi5z8a";

const HOLDING_PAGE = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Contact Anointed Coder</title>
  <style>
    :root {
      --bg: #0b0710;
      --violet: #7c3aed;
      --violet-2: #a855f7;
      --text: #f5f3ff;
      --muted: #b9add6;
      --card: rgba(255, 255, 255, 0.04);
      --border: rgba(168, 85, 247, 0.25);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background:
        radial-gradient(1100px 600px at 50% -10%, rgba(124, 58, 237, 0.35), transparent 60%),
        radial-gradient(900px 500px at 110% 110%, rgba(168, 85, 247, 0.18), transparent 55%),
        var(--bg);
      color: var(--text);
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      -webkit-font-smoothing: antialiased;
    }
    .card {
      width: 100%;
      max-width: 480px;
      text-align: center;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 44px 32px;
      backdrop-filter: blur(10px);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
    }
    .badge {
      width: 64px;
      height: 64px;
      margin: 0 auto 22px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 26px;
      letter-spacing: -1px;
      color: #fff;
      background: linear-gradient(135deg, var(--violet), var(--violet-2));
      box-shadow: 0 10px 30px rgba(124, 58, 237, 0.5);
    }
    h1 {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 12px;
    }
    p {
      color: var(--muted);
      font-size: 15.5px;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .actions { display: flex; flex-direction: column; gap: 12px; }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 14px 18px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
    }
    .btn svg { width: 20px; height: 20px; flex: none; }
    .btn:hover { transform: translateY(-2px); }
    .btn-telegram {
      color: #fff;
      background: linear-gradient(135deg, var(--violet), var(--violet-2));
      box-shadow: 0 8px 24px rgba(124, 58, 237, 0.45);
    }
    .btn-whatsapp {
      color: var(--text);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
    }
    .btn-whatsapp:hover { background: rgba(255, 255, 255, 0.09); }
    .foot {
      margin-top: 26px;
      font-size: 12.5px;
      color: rgba(185, 173, 214, 0.6);
      letter-spacing: 0.3px;
    }
  </style>
</head>
<body>
  <main class="card">
    <div class="badge">AC</div>
    <h1>Contact Anointed Coder</h1>
    <p>This website is currently offline. For access or any enquiry, please get in touch with Anointed Coder using the options below.</p>
    <div class="actions">
      <a class="btn btn-telegram" href="${TELEGRAM_URL}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.6 18.6 20.3c-.25 1.1-.91 1.37-1.84.85l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.02.5l.36-5.18 9.42-8.51c.41-.36-.09-.56-.63-.2L5.05 13.1l-5.01-1.57c-1.09-.34-1.11-1.09.23-1.61L20.53 3.05c.91-.34 1.71.2 1.41 1.55z"/></svg>
        Message on Telegram
      </a>
      <a class="btn btn-whatsapp" href="${WHATSAPP_URL}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.19-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z"/></svg>
        Chat on WhatsApp
      </a>
    </div>
    <div class="foot">Anointed Coder</div>
  </main>
</body>
</html>`;

export function proxy(): NextResponse {
  return new NextResponse(HOLDING_PAGE, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "retry-after": "604800",
    },
  });
}

export const config = {
  // Run on every path so the holding page is the only thing reachable.
  matcher: "/:path*",
};
