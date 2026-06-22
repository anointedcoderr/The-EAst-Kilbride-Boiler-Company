import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// SITE PARKED — Anointed Coder lead-generation landing page.
//
// Next.js 16 renamed Middleware to Proxy. While this version of the file is in
// place, EVERY route serves the Anointed Coder pitch page below and nothing
// else. It markets custom web-development services to anyone who lands here and
// drives them to anointedcoder.com / Telegram / WhatsApp.
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
// 503 + Retry-After + noindex keep this off search engines so it doesn't
// pollute the parked domain's SEO. The page still renders normally in every
// browser. To make it a normal indexable page instead, change status to 200
// and remove the robots meta tag.
// ─────────────────────────────────────────────────────────────────────────────

const WEBSITE_URL = "https://www.anointedcoder.com";
const TELEGRAM_URL = "https://t.me/AnointedCoder";
const WHATSAPP_URL = "https://wa.link/fi5z8a";

const HOLDING_PAGE = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Anointed Coder — Custom Website &amp; Web App Development</title>
  <meta name="description" content="Anointed Coder builds premium, custom websites and web apps that grow your business. From concept to launch in weeks." />
  <style>
    :root {
      --bg: #0b0710;
      --violet: #7c3aed;
      --violet-2: #a855f7;
      --text: #f5f3ff;
      --muted: #c3b8de;
      --muted-2: #9a8cc0;
      --card: rgba(255, 255, 255, 0.04);
      --border: rgba(168, 85, 247, 0.22);
      --green: #25d366;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background:
        radial-gradient(1200px 650px at 50% -12%, rgba(124, 58, 237, 0.38), transparent 60%),
        radial-gradient(900px 520px at 112% 115%, rgba(168, 85, 247, 0.20), transparent 55%),
        var(--bg);
      color: var(--text);
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 28px 20px;
      -webkit-font-smoothing: antialiased;
    }
    .card {
      width: 100%;
      max-width: 560px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 48px 40px 40px;
      backdrop-filter: blur(12px);
      box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
      animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    @keyframes rise {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .top { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
    .badge {
      width: 54px;
      height: 54px;
      flex: none;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 22px;
      letter-spacing: -1px;
      color: #fff;
      background: linear-gradient(135deg, var(--violet), var(--violet-2));
      box-shadow: 0 10px 28px rgba(124, 58, 237, 0.55);
    }
    .brand { font-weight: 700; font-size: 16px; letter-spacing: 0.2px; }
    .brand small { display: block; font-weight: 500; font-size: 12px; color: var(--muted-2); letter-spacing: 0.4px; margin-top: 2px; }
    .eyebrow {
      display: inline-block;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: var(--violet-2);
      background: rgba(168, 85, 247, 0.12);
      border: 1px solid var(--border);
      padding: 6px 12px;
      border-radius: 999px;
      margin-bottom: 18px;
    }
    h1 {
      font-size: 30px;
      line-height: 1.18;
      font-weight: 750;
      letter-spacing: -0.6px;
      margin-bottom: 14px;
    }
    h1 .grad {
      background: linear-gradient(100deg, var(--violet-2), #d8b4fe);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .lede { color: var(--muted); font-size: 15.5px; line-height: 1.65; margin-bottom: 24px; }
    .features { list-style: none; display: flex; flex-direction: column; gap: 11px; margin-bottom: 30px; }
    .features li { display: flex; align-items: center; gap: 11px; font-size: 14.5px; color: var(--text); }
    .features .tick {
      width: 22px; height: 22px; flex: none;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: rgba(124, 58, 237, 0.18);
      border: 1px solid var(--border);
      color: var(--violet-2);
    }
    .features .tick svg { width: 12px; height: 12px; }
    .cta-primary {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      width: 100%;
      padding: 16px 20px;
      border-radius: 14px;
      font-size: 15.5px; font-weight: 700;
      text-decoration: none; color: #fff;
      background: linear-gradient(135deg, var(--violet), var(--violet-2));
      box-shadow: 0 12px 30px rgba(124, 58, 237, 0.5);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 38px rgba(124, 58, 237, 0.6); }
    .cta-primary svg { width: 18px; height: 18px; }
    .or { text-align: center; font-size: 12.5px; color: var(--muted-2); margin: 20px 0 14px; letter-spacing: 0.3px; }
    .contacts { display: flex; gap: 12px; }
    .btn {
      flex: 1;
      display: flex; align-items: center; justify-content: center; gap: 9px;
      padding: 13px 14px;
      border-radius: 12px;
      font-size: 14px; font-weight: 600;
      text-decoration: none; color: var(--text);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      transition: transform 0.15s ease, background 0.15s ease;
    }
    .btn:hover { transform: translateY(-2px); background: rgba(255, 255, 255, 0.09); }
    .btn svg { width: 18px; height: 18px; flex: none; }
    .btn-telegram svg { color: #29b6f6; }
    .btn-whatsapp svg { color: var(--green); }
    .foot {
      margin-top: 30px; padding-top: 20px;
      border-top: 1px solid rgba(168, 85, 247, 0.14);
      text-align: center;
      font-size: 12px; color: var(--muted-2); letter-spacing: 0.3px;
    }
    @media (max-width: 480px) {
      .card { padding: 36px 24px 30px; border-radius: 20px; }
      h1 { font-size: 25px; }
      .contacts { flex-direction: column; }
    }
  </style>
</head>
<body>
  <main class="card">
    <div class="top">
      <div class="badge">AC</div>
      <div class="brand">Anointed Coder<small>Custom Web Development Agency</small></div>
    </div>

    <span class="eyebrow">Custom Websites &amp; Web Apps</span>
    <h1>A website that actually <span class="grad">grows your business</span>.</h1>
    <p class="lede">Anointed Coder designs and builds premium, custom websites and web applications — fast. If your online presence isn't winning you customers, we'll build one that does.</p>

    <ul class="features">
      <li><span class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> Custom design &amp; build — never templates</li>
      <li><span class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> From concept to launch in weeks, not months</li>
      <li><span class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> Trusted by businesses across the UK, US &amp; Europe</li>
    </ul>

    <a class="cta-primary" href="${WEBSITE_URL}" target="_blank" rel="noopener">
      Explore Anointed Coder
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>

    <div class="or">Have a project in mind? Message us directly</div>
    <div class="contacts">
      <a class="btn btn-telegram" href="${TELEGRAM_URL}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.94 4.6 18.6 20.3c-.25 1.1-.91 1.37-1.84.85l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.02.5l.36-5.18 9.42-8.51c.41-.36-.09-.56-.63-.2L5.05 13.1l-5.01-1.57c-1.09-.34-1.11-1.09.23-1.61L20.53 3.05c.91-.34 1.71.2 1.41 1.55z"/></svg>
        Telegram
      </a>
      <a class="btn btn-whatsapp" href="${WHATSAPP_URL}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.19-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z"/></svg>
        WhatsApp
      </a>
    </div>

    <div class="foot">Anointed Coder · Custom Websites · Web Apps · SaaS</div>
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
  // Run on every path so the landing page is the only thing reachable.
  matcher: "/:path*",
};
