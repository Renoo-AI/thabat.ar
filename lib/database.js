const crypto = require('crypto');
const PREFIX = 'thabat:admin:v1:';
const VISITS = PREFIX + 'visits';
const SIGNUPS = PREFIX + 'signups';
const TOTAL = PREFIX + 'visit_total';
const RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
const urlValue = () => process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const tokenValue = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const configured = () => !!(urlValue() && tokenValue());

async function commands(items, atomic = false) {
  if (!configured()) throw new Error('database_not_configured');
  const url = new URL(urlValue());
  if (url.protocol !== 'https:') throw new Error('invalid_database_url');
  const response = await fetch(url.origin + (atomic ? '/multi-exec' : '/pipeline'), {
    method: 'POST', signal: AbortSignal.timeout(5000),
    headers: { Authorization: `Bearer ${tokenValue()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(items)
  });
  if (!response.ok) throw new Error('database_unavailable');
  const payload = await response.json();
  if (!Array.isArray(payload) || payload.some((item) => item.error)) throw new Error('database_command_failed');
  return payload.map((item) => item.result);
}
const validId = (id) => typeof id === 'string' && /^[a-f0-9-]{36}$/i.test(id) ? id : null;
async function recordVisit(req, data) {
  const now = Date.now();
  const event = { id: crypto.randomUUID(), visitor: validId(data.visitor), page: data.page === '/waitlist' ? '/waitlist' : data.page === '/privacy' ? '/privacy' : '/', at: now };
  await commands([['INCR', TOTAL], ['ZADD', VISITS, now, event.id], ['SET', PREFIX + 'visit:' + event.id, JSON.stringify(event), 'EX', RETENTION_MS / 1000], ['ZREMRANGEBYSCORE', VISITS, '-inf', now - RETENTION_MS]], true);
}
async function recordSignup(handle, visitor, source) {
  const now = Date.now();
  const event = { id: crypto.randomUUID(), handle, visitor: validId(visitor), source, at: now };
  await commands([['ZADD', SIGNUPS, now, JSON.stringify(event)]]);
}
async function summary() {
  const cutoff = Date.now() - RETENTION_MS;
  const [total, count, recentCount, visitIds, signupRows] = await commands([
    ['GET', TOTAL], ['ZCARD', SIGNUPS], ['ZCOUNT', VISITS, cutoff, '+inf'],
    ['ZREVRANGEBYSCORE', VISITS, '+inf', cutoff, 'LIMIT', 0, 200],
    ['ZREVRANGE', SIGNUPS, 0, 999]
  ]);
  const parse = (rows) => (rows || []).flatMap((row) => { try { return [JSON.parse(row)]; } catch { return []; } });
  const visitRows = visitIds.length ? (await commands([['MGET', ...visitIds.map((id) => PREFIX + 'visit:' + id)]]))[0].filter(Boolean) : [];
  const signups = parse(signupRows);
  const byVisitor = new Map();
  for (const signup of signups) if (signup.visitor && !byVisitor.has(signup.visitor)) byVisitor.set(signup.visitor, signup.handle);
  const visits = parse(visitRows).map((visit) => ({ at: visit.at, page: visit.page, handle: byVisitor.get(visit.visitor) || null }));
  return { totalVisits: Number(total || 0), totalSignups: Number(count || 0), recentVisits: Number(recentCount || 0), visits, signups: signups.slice(0, 200).map(({ handle, at, source }) => ({ handle, at, source })) };
}
module.exports = { commands, configured, recordVisit, recordSignup, summary };
