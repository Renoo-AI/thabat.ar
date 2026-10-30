// ثبات — tiny state + Lucide icons (inline, one stroke weight)
const ICONS = {
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
  feather: '<path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  arrow: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  wind: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  sound: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
  mute: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
};

function paintIcons(root = document) {
  root.querySelectorAll("i[data-i]").forEach((el) => {
    const d = ICONS[el.dataset.i];
    if (!d) return;
    // direction-aware arrows: the source arrow points left. A "back" arrow carried an inline scaleX(-1) for RTL.
    // CSS (.i-back / .i-arrow) flips them per html[dir], so the markup stays direction-free.
    const back = /scaleX\(-1\)/.test(el.getAttribute("style") || "");
    const cls = back ? "i i-back" : el.dataset.i === "arrow" ? "i i-arrow" : "i";
    el.outerHTML = `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  });
}

const DAY = 86400000;
const KEY = "thabat";
const defaults = { reason: null, level: "mid", since: null, blocked: 0, wins: 0, pending: null, startSrv: null, lastSrv: null, lastDev: null, lastMono: null, learned: -1 };

const store = {
  get() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
    catch { return { ...defaults }; }
  },
  set(patch) {
    const next = { ...store.get(), ...patch };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    native.sync(next);
    return next;
  },
};

// The Android shell injects window.ThabatNative. In a plain browser every call is a harmless no-op, so the
// same pages run in both. The web cannot block sites or apps by itself: the native side does that.
const native = {
  get on() { return typeof window.ThabatNative !== "undefined"; },
  sync(s) { try { if (native.on) window.ThabatNative.sync(s.level, !!s.protect); } catch {} },
  mono() { try { return native.on ? Number(window.ThabatNative.elapsed()) : null; } catch { return null; } },
  status() { try { return native.on ? JSON.parse(window.ThabatNative.status()) : null; } catch { return null; } },
  request() { try { if (native.on) window.ThabatNative.request(); } catch {} },
  // blocks the phone recorded while this page was closed: add them to the counter once
  pullEvents() {
    try {
      if (!native.on) return;
      const ev = JSON.parse(window.ThabatNative.events() || "[]");
      if (ev.length) store.set({ blocked: store.get().blocked + ev.length });
    } catch {}
  },
};

// Days are counted automatically: one brick per 24h, never by a button.
// The phone's clock is not trusted. Online we use the time of a network clock; offline we only
// credit forward movement since the last sync, capped at 24h, and a clock moved back earns nothing.
// (A native build should add SystemClock.elapsedRealtime(), which the user cannot change.)
const clock = {
  async serverNow() {
    const tries = [
      async (signal) => (await (await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC", { signal })).json()).unixtime * 1000,
      async (signal) => {
        const j = await (await fetch("https://timeapi.io/api/Time/current/zone?timeZone=UTC", { signal })).json();
        return Date.parse(j.dateTime.replace(/(\.\d{3})\d*/, "$1") + "Z");
      },
    ];
    for (const t of tries) {
      const ac = new AbortController(), id = setTimeout(() => ac.abort(), 4000);
      try { const v = await t(ac.signal); if (Number.isFinite(v)) return v; } catch {} finally { clearTimeout(id); }
    }
    return null;
  },

  // same shape as read(), from what we already stored, with no network wait (paint first, correct later)
  local() {
    const s = store.get(), dev = Date.now(), start = s.startSrv ?? s.since;
    if (!start) return { days: 0, nextIn: DAY, progress: 0, tamper: false, online: false, started: false };
    let now = dev, tamper = false;
    const mono = native.mono();
    if (s.lastSrv && mono != null && s.lastMono != null && mono >= s.lastMono) {
      now = s.lastSrv + (mono - s.lastMono); // unchangeable: counts real elapsed time since the last sync
    } else if (s.lastSrv) {
      const d = dev - s.lastDev;
      tamper = d < 0 || d > DAY;
      now = s.lastSrv + Math.min(Math.max(d, 0), DAY);
    }
    const elapsed = Math.max(0, now - start);
    return { days: Math.floor(elapsed / DAY), nextIn: DAY - (elapsed % DAY), progress: (elapsed % DAY) / DAY, tamper, online: false, started: true, pending: true };
  },

  // -> { days, nextIn (ms), progress (0..1), tamper, online, started }
  async read({ begin = false } = {}) {
    const s = store.get(), dev = Date.now(), srv = await clock.serverNow();
    let now = dev, tamper = false;
    if (srv) {
      now = srv;
      tamper = Math.abs(dev - srv) > 120000;
      store.set({ lastSrv: srv, lastDev: dev, lastMono: native.mono() });
    } else if (s.lastSrv) {
      const mono = native.mono();
      if (mono != null && s.lastMono != null && mono >= s.lastMono) now = s.lastSrv + (mono - s.lastMono);
      else {
        const d = dev - s.lastDev;
        tamper = d < 0 || d > DAY;
        now = s.lastSrv + Math.min(Math.max(d, 0), DAY);
      }
    }
    let start = s.startSrv ?? s.since;
    if (!start && begin) { start = now; store.set({ startSrv: now }); }
    else if (!s.startSrv && s.since) store.set({ startSrv: s.since });
    if (!start) return { days: 0, nextIn: DAY, progress: 0, tamper, online: !!srv, started: false };
    const elapsed = Math.max(0, now - start);
    return { days: Math.floor(elapsed / DAY), nextIn: DAY - (elapsed % DAY), progress: (elapsed % DAY) / DAY, tamper, online: !!srv, started: true };
  },
};

const hms = (ms) => {
  const t = Math.ceil(ms / 1000), p = (n) => String(n).padStart(2, "0");
  return `${p(Math.floor(t / 3600))}:${p(Math.floor((t % 3600) / 60))}:${p(t % 60)}`;
};

// data/blocklist.json: { core, mixed }. soft blocks core; mid/hard add mixed-content sites.
async function isBlocked(host, level = store.get().level) {
  const list = await (await fetch("data/blocklist.json")).json();
  const h = host.toLowerCase().replace(/^www\./, "");
  const hit = (arr) => arr.some((d) => h === d || h.endsWith("." + d));
  return hit(list.core) || (level !== "soft" && hit(list.mixed));
}


const REASONS = { family: "أسرتي", faith: "ديني", self: "نفسي" };
// "for my family" in the reader's language ("من أجلك" when no reason was picked)
const reasonFor = (k) => T(k && REASONS[k] ? "من أجل " + REASONS[k] : "من أجلك");
const LEVELS = { soft: T("خفيف"), mid: T("متوسط"), hard: T("صارم") };
const LEVEL_RANK = { soft: 0, mid: 1, hard: 2 };

// apply a pending (lowered) level once its 24h wait is over
(function settlePending() {
  const s = store.get();
  if (s.pending && Date.now() >= s.pending.at) store.set({ level: s.pending.level, pending: null });
})();

document.addEventListener("DOMContentLoaded", () => { paintIcons(); native.pullEvents(); });
