// Vercel serverless function: POST /api/waitlist  { handle, platform, source, at, website }
// Forwards each signup to your Telegram. Set these in Vercel → Project → Settings → Environment Variables:
//   TELEGRAM_BOT_TOKEN  (from @BotFather)
//   TELEGRAM_CHAT_ID    (your chat or channel id)
//   ALLOWED_ORIGIN      (optional, e.g. https://thabatapp-jet.vercel.app)

const hits = new Map(); // best-effort rate limit; resets when the function cold-starts

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const allowed = process.env.ALLOWED_ORIGIN;
  const origin = req.headers.origin || "";
  if (allowed && origin && origin !== allowed) return res.status(403).json({ ok: false, error: "forbidden" });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ ok: false, error: "too_many" });
  recent.push(now); hits.set(ip, recent);

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  // honeypot: bots fill the hidden "website" field; pretend success
  if (body.website) return res.status(200).json({ ok: true });

  const handle = String(body.handle || "").trim().replace(/^@+/, "").toLowerCase();
  const valid = /^[a-z0-9._]{1,30}$/.test(handle) && !/\.\./.test(handle) && !/^\./.test(handle) && !/\.$/.test(handle);
  if (!valid) return res.status(400).json({ ok: false, error: "bad_handle" });

  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return res.status(500).json({ ok: false, error: "not_configured" });

  const source = String(body.source || "").slice(0, 40);
  const text = `🧱 طوبة جديدة في الطابور\n@${handle}\nhttps://instagram.com/${handle}\nالمصدر: ${source || "-"}\n${new Date().toISOString()}`;
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true })
    });
    if (!r.ok || (await r.json()).ok !== true) return res.status(502).json({ ok: false, error: "telegram_failed" });
  } catch {
    return res.status(502).json({ ok: false, error: "telegram_unreachable" });
  }
  return res.status(200).json({ ok: true });
};
