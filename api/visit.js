const db = require('../lib/database');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  if (req.headers['sec-fetch-site'] && !['same-origin', 'none'].includes(req.headers['sec-fetch-site'])) return res.status(403).json({ ok: false });
  if (!db.configured()) return res.status(204).end();
  try {
    let data = req.body;
    if (typeof data === 'string') { try { data = JSON.parse(data); } catch { data = {}; } }
    await db.recordVisit(req, data || {});
  } catch { return res.status(503).end(); }
  return res.status(204).end();
};
