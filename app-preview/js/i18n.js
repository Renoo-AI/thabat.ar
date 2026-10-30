// ثبات / Thabat — translation core.
// Arabic is the source language: every string is keyed by its Arabic text, so pages stay readable.
//  - plain text nodes, alt, aria-label, title and meta content are translated automatically
//  - an element marked data-t is translated as one unit (innerHTML), for headings with <em>
//  - script strings go through T("عربي", {vars})
const LANGS = { ar: { dir: "rtl", name: "العربية", short: "ع" }, en: { dir: "ltr", name: "English", short: "EN" }, fr: { dir: "ltr", name: "Français", short: "FR" } };

// Arabic-only build. To ship translations again: add "en"/"fr" here and load js/facts.i18n.en.js + .fr.js
// (kept in _i18n-future/) in learn.html. The dictionary below stays complete for that day.
const ENABLED = ["ar"];

const LANG = (() => {
  let l = null;
  try { l = localStorage.getItem("thabat-lang"); } catch {}
  if (!LANGS[l]) {
    const n = (navigator.language || "ar").slice(0, 2).toLowerCase();
    l = LANGS[n] ? n : "ar";
  }
  return ENABLED.includes(l) ? l : "ar";
})();
document.documentElement.lang = LANG;
document.documentElement.dir = LANGS[LANG].dir;

// [arabic, english, french]
const ROWS = [
  // brand
  ["ثبات", "Thabat", "Thabat"],

  // ---- welcome
  ["ثبات — لماذا تريد أن تتوقف؟", "Thabat — Why do you want to stop?", "Thabat — Pourquoi veux-tu arrêter ?"],
  ["ثبات يحجب المواقع والتطبيقات الإباحية ويبني معك جداراً يوماً بعد يوم. ابدأ بسببك.", "Thabat blocks porn sites and apps and builds a wall with you, one day at a time. Start with your reason.", "Thabat bloque les sites et applis pornographiques et bâtit un mur avec toi, jour après jour. Commence par ta raison."],
  ["جدار يُبنى يوماً بعد يوم، وباب يُغلق في وجه الإباحية.", "A wall built day by day, and a door that closes on porn.", "Un mur bâti jour après jour, et une porte qui se ferme à la pornographie."],
  ["باب طيني برتقالي وأخضر مفتوح قليلاً يخرج منه ضوء دافئ", "An orange and green clay door, slightly open, with warm light spilling out", "Une porte en pâte à modeler orange et verte, entrouverte, d'où filtre une lumière chaude"],
  ["لماذا تريد أن <em>تتوقف؟</em>", "Why do you want to <em>stop?</em>", "Pourquoi veux-tu <em>arrêter ?</em>"],
  ["اختر سبباً واحداً. سنذكّرك به حين تحتاج إليه.", "Pick one reason. We'll remind you of it when you need it.", "Choisis une raison. On te la rappellera quand tu en auras besoin."],
  ["أسرتي", "My family", "Ma famille"],
  ["ديني", "My faith", "Ma foi"],
  ["نفسي", "Myself", "Moi-même"],
  ["هذا سببي", "This is my reason", "C'est ma raison"],

  // ---- level + settings
  ["ثبات — قوة الحماية", "Thabat — Protection strength", "Thabat — Force de la protection"],
  ["اختر قوة الحماية: خفيف أو متوسط أو صارم.", "Choose how strong your protection is: light, medium or strict.", "Choisis la force de ta protection : légère, moyenne ou stricte."],
  ["غيّر قوة الحماية. التشديد فوري والتخفيف بعد ٢٤ ساعة.", "Change your protection strength. Tightening is instant; easing takes 24 hours.", "Change la force de ta protection. Renforcer est immédiat ; alléger prend 24 heures."],
  ["رجوع", "Back", "Retour"],
  ["اختر <em>قوة</em> الحماية", "Choose how <em>strong</em> your protection is", "Choisis la <em>force</em> de ta protection"],
  ["قوة <em>الحماية</em>", "Protection <em>strength</em>", "Force de la <em>protection</em>"],
  ["تشديد الحماية فوري. أما تخفيفها فيتأخر ٢٤ ساعة، لتقرر وأنت هادئ.", "Tightening protection is instant. Easing it waits 24 hours, so you decide when you're calm.", "Renforcer la protection est immédiat. L'alléger attend 24 heures, pour que tu décides à tête reposée."],
  ["التشديد فوري. التخفيف يُطبَّق بعد ٢٤ ساعة، لتقرر وأنت هادئ.", "Tightening is instant. Easing applies after 24 hours, so you decide when you're calm.", "Renforcer est immédiat. Alléger s'applique après 24 heures, pour que tu décides à tête reposée."],
  ["خفيف", "Light", "Légère"],
  ["متوسط", "Medium", "Moyenne"],
  ["صارم", "Strict", "Stricte"],
  ["المواقع والتطبيقات الإباحية المعروفة فقط", "Known porn sites and apps only", "Seulement les sites et applis pornographiques connus"],
  ["المعروفة، ومعها مواقع محتواها مختلط", "The known ones, plus sites with mixed content", "Les connus, plus les sites au contenu mixte"],
  ["كل ما سبق، وقفل ليلي لتطبيقات التواصل من ١١ مساءً إلى ٥ صباحاً", "Everything above, plus a night lock on social apps from 11 pm to 5 am", "Tout ce qui précède, plus un verrou de nuit sur les réseaux sociaux de 23 h à 5 h"],
  ["ثبّت الحماية", "Lock in protection", "Valider la protection"],
  ["جدار طيني متين وفيه باب برتقالي صغير", "A sturdy clay wall with a small orange door", "Un solide mur d'argile avec une petite porte orange"],
  ["سياج طيني منخفض وبوابة برتقالية صغيرة ونبتة", "A low clay fence with a small orange gate and a sprout", "Une petite clôture d'argile avec un portillon orange et une pousse"],
  ["باب خزنة طيني دائري ثقيل بعجلة كبيرة", "A heavy round clay vault door with a big wheel", "Une lourde porte de coffre ronde en argile avec une grande roue"],
  ["اختر القوة ثم احفظ.", "Pick a strength, then save.", "Choisis une force, puis enregistre."],
  ["سيصبح المستوى «{l}» بعد ٢٤ ساعة من طلبك.", "Your level becomes “{l}” 24 hours after your request.", "Ton niveau passera à « {l} » 24 heures après ta demande."],
  ["سجّلنا طلبك. ستخفّ الحماية بعد ٢٤ ساعة.", "Request saved. Your protection eases in 24 hours.", "Demande enregistrée. Ta protection s'allégera dans 24 heures."],
  ["تم. حمايتك أقوى الآن.", "Done. Your protection is stronger now.", "C'est fait. Ta protection est plus forte."],
  ["حفظ التغيير", "Save change", "Enregistrer"],
  ["ثبات — الإعدادات", "Thabat — Settings", "Thabat — Réglages"],

  // ---- permissions
  ["ثبات — فعّل الحماية", "Thabat — Turn on protection", "Thabat — Active la protection"],
  ["إذنان بسيطان يسمحان لثبات بحجب المواقع والتطبيقات. لا يغادر أي شيء جهازك.", "Two simple permissions let Thabat block sites and apps. Nothing leaves your device.", "Deux autorisations simples permettent à Thabat de bloquer sites et applis. Rien ne quitte ton appareil."],
  ["ثبات — الأذونات", "Thabat — Permissions", "Thabat — Autorisations"],
  ["باب طيني مغلق بقفل ذهبي كبير", "A closed clay door with a big golden padlock", "Une porte d'argile fermée par un gros cadenas doré"],
  ["إذنان، و<em>يُقفل</em> الباب", "Two permissions, and the door <em>locks</em>", "Deux autorisations, et la porte <em>se verrouille</em>"],
  ["الأول يقرأ اسم الموقع فقط. والثاني يعرف أي تطبيق مفتوح. لا الصفحات ولا الرسائل.", "The first reads the site name only. The second knows which app is open. Never pages, never messages.", "La première lit seulement le nom du site. La seconde sait quelle appli est ouverte. Jamais les pages ni les messages."],
  ["بعد التفعيل تبدأ أول طوبة تلقائياً، ولا يغادر شيء من بياناتك هاتفك.", "Once on, your first brick starts on its own, and none of your data leaves your phone.", "Une fois activée, ta première brique démarre toute seule, et aucune donnée ne quitte ton téléphone."],
  ["فعّل الحماية", "Turn on protection", "Activer la protection"],

  // ---- home
  ["ثبات — جدارك اليوم", "Thabat — Your wall today", "Thabat — Ton mur aujourd'hui"],
  ["طوبة جديدة كل ٢٤ ساعة تلقائياً. شاهد جدارك يكبر من طوبة إلى قلعة.", "A new brick every 24 hours, automatically. Watch your wall grow from a brick to a castle.", "Une nouvelle brique toutes les 24 heures, automatiquement. Regarde ton mur grandir, de la brique au château."],
  ["ثبات — الرئيسية", "Thabat — Home", "Thabat — Accueil"],
  ["الإعدادات", "Settings", "Réglages"],
  ["الإحصائيات", "Statistics", "Statistiques"],
  ["مقدار ما اكتمل من اليوم الحالي", "How much of today is complete", "Part de la journée écoulée"],
  ["الطوبة القادمة بعد", "Next brick in", "Prochaine brique dans"],
  ["الحماية تعمل", "Protection is on", "Protection active"],
  ["الحماية تعمل · مستوى {l}", "Protection on · {l} level", "Protection active · niveau {l}"],
  ["معلومة اليوم", "Today's tip", "Astuce du jour"],
  ["قرأت معلومة اليوم", "Today's tip read", "Astuce du jour lue"],
  ["هل تعلم؟", "Did you know?", "Le savais-tu ?"],
  ["أول طوبة", "First brick", "Première brique"],
  ["جدار", "Wall", "Mur"],
  ["بوابة", "Gate", "Porte"],
  ["بيت", "House", "Maison"],
  ["قلعة", "Castle", "Château"],
  ["طوبة برتقالية مضيئة وحدها وبجانبها نبتة صغيرة", "A single glowing orange brick with a tiny sprout beside it", "Une seule brique orange lumineuse, avec une petite pousse à côté"],
  ["جدار من الطوب الطيني وفوقه طوبة برتقالية مضيئة", "A clay brick wall topped by a glowing orange brick", "Un mur de briques d'argile surmonté d'une brique orange lumineuse"],
  ["جدار طيني عليه نباتات وبوابة مضيئة", "A clay wall with plants and a glowing gate", "Un mur d'argile couvert de plantes avec un portail lumineux"],
  ["بيت طيني صغير بسقف برتقالي ونافذة مضيئة", "A small clay house with an orange roof and a glowing window", "Une petite maison d'argile au toit orange et à la fenêtre éclairée"],
  ["قلعة طينية صغيرة بعلم ذهبي وبوابة مضيئة", "A small clay castle with a golden flag and a glowing gate", "Un petit château d'argile avec un drapeau doré et une porte lumineuse"],
  ["بعد {d}: {n}", "In {d}: {n}", "Dans {d} : {n}"],
  ["وصلت إلى القلعة. حافظ عليها.", "You've reached the castle. Keep it standing.", "Tu as atteint le château. Protège-le."],
  ["لاحظنا أن ساعة الهاتف تغيّرت فتجاهلناها. أيامك تُحسب من الوقت الحقيقي ولن تتأثر.", "We noticed your phone's clock changed and ignored it. Your days count from real time and won't be affected.", "On a vu que l'heure du téléphone a changé et on l'a ignorée. Tes jours se comptent sur l'heure réelle et ne sont pas touchés."],
  ["لا يوجد إنترنت الآن. سنؤكد أيامك فور الاتصال.", "No internet right now. We'll confirm your days as soon as you're back online.", "Pas d'internet pour l'instant. On confirmera tes jours dès que tu seras reconnecté."],
  ["باب طيني مفتوح وقفل ذهبي مفتوح على الأرض: الحماية متوقفة", "An open clay door and an open golden padlock on the ground: protection is off", "Une porte d'argile ouverte et un cadenas doré ouvert au sol : la protection est coupée"],
  ["الحماية متوقفة", "Protection is off", "Protection désactivée"],
  ["الحماية متوقفة فلا يُحجب أي موقع أو تطبيق الآن. أعد تفعيلها لتكمل.", "Protection is off, so no site or app is blocked right now. Turn it back on to continue.", "La protection est coupée : aucun site ni appli n'est bloqué pour l'instant. Réactive-la pour continuer."],
  ["أعد تفعيل الحماية", "Turn protection back on", "Réactiver la protection"],

  // ---- stats
  ["ثبات — جدارك", "Thabat — Your wall", "Thabat — Ton mur"],
  ["كل يوم نظيف طوبة. شاهد جدارك ومحاولات الحجب.", "Every clean day is a brick. See your wall and the attempts we blocked.", "Chaque jour propre est une brique. Vois ton mur et les tentatives bloquées."],
  ["ثبات — الإحصائيات", "Thabat — Statistics", "Thabat — Statistiques"],
  ["ثلاث ميداليات من الطين على رف: برتقالية وخضراء وذهبية بنجمة", "Three clay medals on a shelf: orange, green and gold with a star", "Trois médailles d'argile sur une étagère : orange, verte et dorée avec une étoile"],
  ["كل يوم <em>طوبة</em>", "Every day is a <em>brick</em>", "Chaque jour, une <em>brique</em>"],
  ["آخر خمسة أسابيع من جدارك.", "The last five weeks of your wall.", "Les cinq dernières semaines de ton mur."],
  ["جدار الأيام", "Wall of days", "Mur des jours"],
  ["الجدار فارغ لأنك بدأت للتو. أول طوبة تكتمل تلقائياً بعد ٢٤ ساعة.", "The wall is empty because you just started. Your first brick completes by itself after 24 hours.", "Le mur est vide car tu viens de commencer. Ta première brique se termine toute seule après 24 heures."],
  ["محاولة حُجبت", "attempts blocked", "tentatives bloquées"],
  ["لحظة رغبة عبرتها", "urges you got through", "envies traversées"],
  ["العودة للرئيسية", "Back to home", "Retour à l'accueil"],
  ["الميدالية القادمة بعد {d}.", "Next medal in {d}.", "Prochaine médaille dans {d}."],
  ["جمعت الميداليات الثلاث. ثبّت جدارك.", "You've earned all three medals. Keep your wall strong.", "Tu as gagné les trois médailles. Garde ton mur solide."],

  // ---- blocked
  ["ثبات — الباب مغلق", "Thabat — The door is closed", "Thabat — La porte est fermée"],
  ["تم حجب هذا الموقع أو التطبيق.", "This site or app was blocked.", "Ce site ou cette appli a été bloqué(e)."],
  ["باب مغلق بقفل ذهبي", "A door closed with a golden padlock", "Une porte fermée par un cadenas doré"],
  ["أغلقنا <em>الباب</em> عنك", "We closed the <em>door</em> for you", "On a fermé la <em>porte</em> pour toi"],
  ["الحيوان يعيش بغريزته. وأنت الآن كذلك. عد إلى عقلك.", "An animal lives by instinct. Right now, so are you. Come back to your mind.", "L'animal vit selon son instinct. En ce moment, toi aussi. Reviens à ta raison."],
  ["هذا الموقع محجوب.", "This site is blocked.", "Ce site est bloqué."],
  ["{d} محجوب.", "{d} is blocked.", "{d} est bloqué."],
  ["تطبيق {a} محجوب.", "The app {a} is blocked.", "L'appli {a} est bloquée."],
  ["تذكّر سببك", "Remember your reason", "Souviens-toi de ta raison"],
  ["من أجلك", "for you", "pour toi"],
  ["من أجل أسرتي", "for my family", "pour ma famille"],
  ["من أجل ديني", "for my faith", "pour ma foi"],
  ["من أجل نفسي", "for myself", "pour moi-même"],
  ["تنفّس معنا ٩٠ ثانية", "Breathe with us for 90 seconds", "Respire avec nous 90 secondes"],
  ["ارجع للرئيسية", "Back to home", "Retour à l'accueil"],

  // ---- urge
  ["ثبات — لحظة الرغبة", "Thabat — The urge moment", "Thabat — Le moment de l'envie"],
  ["تنفّس تسعين ثانية. الرغبة موجة وتمرّ.", "Breathe for ninety seconds. An urge is a wave, and it passes.", "Respire pendant quatre-vingt-dix secondes. L'envie est une vague, et elle passe."],
  ["تشغيل الصوت", "Turn sound on", "Activer le son"],
  ["إيقاف الصوت", "Turn sound off", "Couper le son"],
  ["يدان من الطين تحملان كرة خضراء داخل حلقات هادئة", "Two clay hands holding a green sphere inside calm rings", "Deux mains d'argile tenant une sphère verte au centre d'anneaux calmes"],
  ["بحر من الطين الأخضر وموجات كريمية وشمس برتقالية منخفضة", "A green clay sea with cream waves and a low orange sun", "Une mer d'argile verte aux vagues crème sous un soleil orange bas"],
  ["شمعة طينية بلهب برتقالي في طبق أخضر", "A clay candle with an orange flame in a green dish", "Une bougie d'argile à la flamme orange dans une coupelle verte"],
  ["جبلان أخضران وشمس برتقالية تشرق خلفهما ودرب كريمي", "Two green mountains, an orange sun rising behind them and a cream path", "Deux montagnes vertes, un soleil orange qui se lève derrière et un sentier crème"],
  ["شهيق…", "Breathe in…", "Inspire…"],
  ["زفير…", "Breathe out…", "Expire…"],
  ["أحسنت", "Well done", "Bien joué"],
  ["تبقّى {n} ثانية", "{n} seconds left", "{n} secondes restantes"],
  ["انتهت الموجة", "The wave is over", "La vague est passée"],
  ["تذكّر: {r}", "Remember: {r}", "Souviens-toi : {r}"],
  ["عبرت الموجة", "I rode the wave", "J'ai traversé la vague"],

  // ---- learn
  ["ثبات — معلومة اليوم", "Thabat — Today's tip", "Thabat — L'astuce du jour"],
  ["معلومة واحدة هادئة كل يوم تعيد إليك عقلك.", "One calm tip every day that brings your mind back.", "Une astuce calme chaque jour qui te ramène à ta raison."],
  ["المعلومة القادمة بعد", "Next tip in", "Prochaine astuce dans"],
  ["فهمت", "Got it", "Compris"],
  ["معلومة {n} من {m}", "Tip {n} of {m}", "Astuce {n} sur {m}"],

  // ---- native (Android) states
  ["بانتظار موافقتك في إعدادات الهاتف…", "Waiting for your approval in your phone's settings…", "En attente de ton accord dans les réglages du téléphone…"],
  ["DNS خاص مفعّل في الهاتف وقد يتجاوز الحجب. عطّله من إعدادات الشبكة.", "Private DNS is on and may bypass blocking. Turn it off in your network settings.", "Le DNS privé est activé et peut contourner le blocage. Désactive-le dans les réglages réseau."],
  // ---- language picker
  ["اللغة", "Language", "Langue"],
];

const DICT = new Map(ROWS.map(([ar, en, fr]) => [ar, { en, fr }]));
const IDX = { en: 1, fr: 2 };

function T(s, vars) {
  let out = s;
  if (LANG !== "ar") { const r = DICT.get(s); if (r) out = r[LANG]; }
  return vars ? out.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : "{" + k + "}")) : out;
}

// numbers in the reader's own digits: ١٢ in Arabic, 12 elsewhere
const num = (n) => (LANG === "ar" ? Number(n).toLocaleString("ar-EG") : String(n));

// "day" with correct agreement: Arabic has dual and a 3–10 / 11+ split; fr/en just singular/plural
function unitDays(k) {
  if (LANG === "ar") return k === 1 ? "يوم" : k === 2 ? "يومان" : k >= 3 && k <= 10 ? "أيام" : k > 10 ? "يوماً" : "يوم";
  if (LANG === "fr") return k > 1 ? "jours" : "jour";
  return k === 1 ? "day" : "days";
}
function daysLabel(k) {
  if (LANG === "ar") return k === 1 ? "يوم واحد" : k === 2 ? "يومان" : k <= 10 ? `${k} أيام` : `${k} يوماً`;
  if (LANG === "fr") return `${k} ${k > 1 ? "jours" : "jour"}`;
  return `${k} ${k === 1 ? "day" : "days"}`;
}

function translateDom() {
  if (LANG === "ar") return;
  // headings with inline markup are translated as one unit
  document.querySelectorAll("[data-t]").forEach((el) => { el.innerHTML = T(el.innerHTML.trim()); });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      !n.nodeValue.trim() || /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) || n.parentNode.closest("[data-t]")
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((n) => { const s = n.nodeValue.trim(), r = DICT.get(s); if (r) n.nodeValue = n.nodeValue.replace(s, r[LANG]); });
  document.querySelectorAll("[alt],[aria-label],[title]").forEach((el) => {
    ["alt", "aria-label", "title"].forEach((a) => { if (el.hasAttribute(a)) el.setAttribute(a, T(el.getAttribute(a))); });
  });
  document.querySelectorAll("meta[content]").forEach((m) => m.setAttribute("content", T(m.getAttribute("content"))));
  document.title = T(document.title);
}

function setLang(l) {
  try { localStorage.setItem("thabat-lang", l); } catch {}
  location.reload();
}

// a three-button language switch, mounted wherever a header carries data-langs
function mountLangPicker() {
  if (ENABLED.length < 2) return; // nothing to choose between
  document.querySelectorAll("[data-langs]").forEach((host) => {
    const g = document.createElement("div");
    g.className = "langs"; g.setAttribute("role", "group"); g.setAttribute("aria-label", T("اللغة"));
    Object.entries(LANGS).forEach(([code, v]) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = v.short; b.lang = code; b.title = v.name;
      b.setAttribute("aria-pressed", String(code === LANG));
      b.addEventListener("click", () => code !== LANG && setLang(code));
      g.appendChild(b);
    });
    host.appendChild(g);
  });
}

document.addEventListener("DOMContentLoaded", () => { translateDom(); mountLangPicker(); });
