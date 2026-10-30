// ثبات — app + site blocker rules (reference implementation).
// The Android service ports exactly these rules, reading the same data/appblocklist.json.
//
//   appVerdict({ pkg, label }, level, hour) -> { action: "block" | "night" | "allow", why }
//
// Matching works on WORDS, not substrings, so "Java Helper" is not a "jav…" app and "Essex" is not "sex".

const Blocker = (() => {
  let list = null;
  const load = async () => (list ??= await (await fetch("data/appblocklist.json")).json());

  const words = (s) => String(s || "").toLowerCase().split(/[^a-z0-9؀-ۿ]+/).filter(Boolean);

  function verdict(app, level, hour, L) {
    const pkg = String(app.pkg || "").toLowerCase();
    const ws = [...words(pkg), ...words(app.label)];

    // 1. recovery / filter apps and system packages are never touched
    if (L.porn.never_block_packages.some((p) => pkg.startsWith(p))) return { action: "allow", why: "system" };
    if (ws.some((w) => L.porn.never_block_if_word_present.includes(w))) return { action: "allow", why: "recovery or filter app" };

    // 2. known porn brands, every level. A word matches if it IS the brand or starts/ends with it
    //    ("pornhubapp"), but never when the brand is buried inside ("aeromexico" is not "erome").
    const hitBrand = (w, b) => w === b || (b.length >= 5 && (w.startsWith(b) || w.endsWith(b)));
    const brand = L.porn.brands.find((b) => ws.some((w) => hitBrand(w, b)));
    if (brand) return { action: "block", why: "brand: " + brand };

    // 2b. words that are never innocent, every level (whole word, or a stem like "porn…")
    const stems = new Set(L.porn.prefix_words);
    const core = ws.find((x) => L.porn.core_words.some((r) => x === r || (stems.has(r) && x.startsWith(r))));
    if (core) return { action: "block", why: "word: " + core };

    // 3. riskier words, medium and strict only. Whole word, or a prefix for the few stems that are
    //    never innocent ("porn…"); other words need length >= 5 to be a prefix ("milf" must not eat "Milford").
    if (level !== "soft") {
      const w = ws.find((x) => L.porn.risky_words.some((r) => x === r));
      if (w) return { action: "block", why: "word: " + w };
    }
    // 4. strict: night lock on social apps
    if (level === "hard" && L.social.packages[app.pkg]) {
      const night = hour >= L.social.night_from || hour < L.social.night_to;
      if (night) return { action: "night", why: "night lock: " + L.social.packages[app.pkg] };
    }
    return { action: "allow", why: "no match" };
  }

  return {
    async appVerdict(app, level = store.get().level, hour = new Date().getHours()) {
      return verdict(app, level, hour, await load());
    },
    _verdict: verdict, // for tests that pass the list in directly
  };
})();
