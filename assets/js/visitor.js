(() => {
  const key = 'thabat_visit_session_v1';
  let visitor = null;
  try {
    visitor = sessionStorage.getItem(key);
    if (!visitor && typeof crypto.randomUUID === 'function') {
      visitor = crypto.randomUUID();
      sessionStorage.setItem(key, visitor);
    }
  } catch {}
  window.thabatVisitorId = visitor;
  const page = location.pathname.replace(/\/$/, '') || '/';
  if (!['/', '/waitlist', '/privacy'].includes(page)) return;
  fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visitor, page }), keepalive: true }).catch(() => {});
})();
