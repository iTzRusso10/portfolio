/*!
 * Consenso cookie – giusepperussodev.it
 * Nessuna dipendenza, nessuna richiesta a terzi.
 * Conforme alle Linee guida cookie del Garante (10 giugno 2021):
 *  - nessun cookie/strumento non tecnico prima del consenso (blocco preventivo)
 *  - "X" chiude il banner e vale come rifiuto
 *  - "Rifiuta" e "Accetta" identici per stile e peso, nessuna casella pre-selezionata
 *  - scelta conservata 6 mesi, poi si richiede; link "Preferenze cookie" sempre disponibile
 *
 * COME AGGIUNGERE UNO STRUMENTO (es. Meta Pixel, Google Analytics) IN FUTURO
 * 1. Scrivi lo script con type="text/plain" e data-consent="statistiche" oppure "marketing":
 *      <script type="text/plain" data-consent="marketing" data-service="Meta Pixel"> ...codice... </script>
 *      <script type="text/plain" data-consent="statistiche" data-service="Google Analytics" data-src="https://..."></script>
 *    Lo script parte solo dopo il consenso a quella categoria.
 * 2. Aggiorna l'elenco dei servizi nella cookie policy (/cookie-policy/).
 * 3. Per Google (gtag / Consent Mode v2) imposta PRIMA di gtag il default "denied":
 *      gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
 *    Questo file invia poi da solo gtag('consent','update',...) in base alla scelta.
 * Il banner compare da solo appena una pagina contiene almeno uno script bloccato.
 * Anteprima del banner: aggiungi ?cookie-banner=1 all'indirizzo.
 */
(function () {
  "use strict";

  var KEY = "grd_consent";
  var VERSION = 1;                       // aumenta quando cambiano i servizi: il banner ricompare
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182; // ~6 mesi
  var ALWAYS_SHOW = false;               // true = mostra il banner anche senza strumenti opzionali

  var EN = /^en/i.test(document.documentElement.lang || "");
  var T = EN ? {
    title: "Cookies",
    text: "This site only uses what it needs to work. With your OK I can also use statistics and marketing tools. You can change your mind at any time.",
    accept: "Accept all", reject: "Reject", custom: "Customise", save: "Save choices",
    close: "Close and reject", policy: "Cookie policy",
    prefs: "Cookie preferences",
    nec: "Necessary", necD: "Needed for the site to work and to remember this choice. Always on.",
    stat: "Statistics", statD: "Anonymous counts of visits to improve the pages.",
    mkt: "Marketing", mktD: "Measuring ads on Meta (Instagram, Facebook) or Google.",
    none: "Not in use at the moment.", inUse: "Services: ",
    policyUrl: "/cookie-policy/"
  } : {
    title: "Cookie",
    text: "Questo sito usa solo ciò che serve per funzionare. Con il tuo consenso posso usare anche strumenti di statistica e marketing. Puoi cambiare idea quando vuoi.",
    accept: "Accetta tutti", reject: "Rifiuta", custom: "Personalizza", save: "Salva le scelte",
    close: "Chiudi e rifiuta", policy: "Cookie policy",
    prefs: "Preferenze cookie",
    nec: "Necessari", necD: "Servono a far funzionare il sito e a ricordare questa scelta. Sempre attivi.",
    stat: "Statistiche", statD: "Conteggi anonimi delle visite per migliorare le pagine.",
    mkt: "Marketing", mktD: "Misurare le inserzioni su Meta (Instagram, Facebook) o Google.",
    none: "Al momento non in uso.", inUse: "Servizi: ",
    policyUrl: "/cookie-policy/"
  };

  var CATS = ["statistiche", "marketing"];

  /* ---------- memoria della scelta (localStorage: strumento tecnico) ---------- */
  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!c || c.v !== VERSION || !c.t || Date.now() - c.t > MAX_AGE) return null;
      return c;
    } catch (e) { return null; }
  }
  function write(choice) {
    var c = { v: VERSION, t: Date.now(), statistiche: !!choice.statistiche, marketing: !!choice.marketing };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    return c;
  }

  /* ---------- servizi presenti nella pagina ---------- */
  function blocked() { return document.querySelectorAll('script[type="text/plain"][data-consent]'); }
  function servicesFor(cat) {
    var out = [];
    Array.prototype.forEach.call(blocked(), function (s) {
      var n = s.getAttribute("data-service");
      if (s.getAttribute("data-consent") === cat && n && out.indexOf(n) < 0) out.push(n);
    });
    return out;
  }
  function hasOptional() { return blocked().length > 0; }

  /* ---------- applica la scelta ---------- */
  function apply(c) {
    Array.prototype.forEach.call(blocked(), function (old) {
      if (!c[old.getAttribute("data-consent")]) return;
      var s = document.createElement("script");
      Array.prototype.forEach.call(old.attributes, function (a) {
        if (a.name !== "type" && a.name !== "data-src") s.setAttribute(a.name, a.value);
      });
      if (old.getAttribute("data-src")) s.src = old.getAttribute("data-src"); else s.text = old.text;
      old.parentNode.replaceChild(s, old);
    });
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: c.statistiche ? "granted" : "denied",
        ad_storage: c.marketing ? "granted" : "denied",
        ad_user_data: c.marketing ? "granted" : "denied",
        ad_personalization: c.marketing ? "granted" : "denied"
      });
    }
    try { document.dispatchEvent(new CustomEvent("consent:change", { detail: c })); } catch (e) {}
  }

  function decide(choice) { var c = write(choice); hide(); apply(c); }

  /* ---------- interfaccia ---------- */
  var css =
    ".cc{position:fixed;z-index:2147483000;left:12px;right:12px;bottom:12px;max-width:560px;margin:0 auto;background:#170B2E;color:#F4F0FF;border:1px solid rgba(244,240,255,.14);border-radius:18px;box-shadow:0 18px 50px rgba(23,11,46,.45);padding:18px 18px 16px;max-height:calc(100vh - 24px);overflow:auto;outline:0;font:15px/1.5 \"DM Sans\",system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif}" +
    ".cc[hidden]{display:none}" +
    ".cc h2{margin:0 36px 6px 0;font:800 17px/1.2 \"Sora\",system-ui,sans-serif;color:#fff}" +
    ".cc p{margin:0 0 12px;color:#CFC5EA}" +
    ".cc a{color:#D4FF3F}" +
    ".cc-x{position:absolute;top:10px;right:10px;width:36px;height:36px;border:0;border-radius:50%;background:transparent;color:#CFC5EA;font-size:22px;line-height:1;cursor:pointer}" +
    ".cc-x:hover{background:rgba(244,240,255,.08);color:#fff}" +
    ".cc-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}" +
    ".cc-b{flex:1 1 auto;min-height:44px;padding:0 16px;border-radius:999px;font-family:inherit;font-weight:700;font-size:15px;line-height:1;cursor:pointer;border:1px solid rgba(244,240,255,.35);background:transparent;color:#F4F0FF}" +
    ".cc-b:hover{border-color:#F4F0FF}" +
    ".cc-b.eq{background:#F4F0FF;color:#170B2E;border-color:#F4F0FF}.cc-b.eq:hover{background:#fff}" +
    ".cc-link{background:none;border:0;color:#B79BFF;text-decoration:underline;font:inherit;cursor:pointer;padding:6px 2px}" +
    ".cc-cats{margin:4px 0 14px;display:grid;gap:8px}" +
    ".cc-cat{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;background:rgba(244,240,255,.05);border-radius:12px;padding:10px 12px}" +
    ".cc-cat b{display:block;color:#fff}.cc-cat small{display:block;color:#CFC5EA;font-size:13px}" +
    ".cc-sw{position:relative;flex:0 0 44px;width:44px;height:26px;margin-top:2px}" +
    ".cc-sw input{position:absolute;inset:0;opacity:0;margin:0;cursor:pointer}" +
    ".cc-sw span{position:absolute;inset:0;border-radius:999px;background:#4A3D66;transition:background .15s}" +
    ".cc-sw span:after{content:\"\";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .15s}" +
    ".cc-sw input:checked+span{background:#7C3AED}.cc-sw input:checked+span:after{transform:translateX(18px)}" +
    ".cc-sw input:disabled+span{opacity:.6}" +
    ".cc-sw input:focus-visible+span{outline:2px solid #D4FF3F;outline-offset:2px}" +
    ".cc-b:focus-visible,.cc-x:focus-visible,.cc-link:focus-visible{outline:2px solid #D4FF3F;outline-offset:2px}" +
    "@media (max-width:480px){.cc{left:8px;right:8px;bottom:8px;padding:16px 14px 14px}.cc-b{flex:1 1 40%}}";

  var box, catsBox, lastFocus;

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  function catRow(id, name, desc, checked, disabled) {
    var svc = id === "necessari" ? [] : servicesFor(id);
    var note = id === "necessari" ? "" : "<small>" + (svc.length ? T.inUse + svc.join(", ") : T.none) + "</small>";
    return '<div class="cc-cat"><div><b id="cc-l-' + id + '">' + name + "</b><small>" + desc + "</small>" + note + "</div>" +
      '<label class="cc-sw"><input type="checkbox" data-cat="' + id + '" aria-labelledby="cc-l-' + id + '"' +
      (checked ? " checked" : "") + (disabled ? " disabled" : "") + "><span></span></label></div>";
  }

  function build() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    box = el("div", { "class": "cc", role: "dialog", "aria-modal": "false", "aria-labelledby": "cc-t", "aria-describedby": "cc-d", tabindex: "-1", hidden: "" });
    box.innerHTML =
      '<button type="button" class="cc-x" data-act="reject" aria-label="' + T.close + '" title="' + T.close + '">&times;</button>' +
      '<h2 id="cc-t">' + T.title + "</h2>" +
      '<p id="cc-d">' + T.text + ' <a href="' + T.policyUrl + '">' + T.policy + "</a></p>" +
      '<div class="cc-cats" hidden></div>' +
      '<div class="cc-row">' +
        '<button type="button" class="cc-b eq" data-act="reject">' + T.reject + "</button>" +
        '<button type="button" class="cc-b eq" data-act="accept">' + T.accept + "</button>" +
        '<button type="button" class="cc-b" data-act="save" hidden>' + T.save + "</button>" +
        '<button type="button" class="cc-link" data-act="custom">' + T.custom + "</button>" +
      "</div>";
    catsBox = box.querySelector(".cc-cats");
    box.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-act]"); if (!b) return;
      var a = b.getAttribute("data-act");
      if (a === "accept") decide({ statistiche: true, marketing: true });
      else if (a === "reject") decide({ statistiche: false, marketing: false });
      else if (a === "custom") showCats(read());
      else if (a === "save") {
        var ch = {};
        CATS.forEach(function (c) { ch[c] = !!catsBox.querySelector('input[data-cat="' + c + '"]').checked; });
        decide(ch);
      }
    });
    box.addEventListener("keydown", function (ev) { if (ev.key === "Escape") decide({ statistiche: false, marketing: false }); });
    document.body.appendChild(box);
  }

  function showCats(c) {
    c = c || {};
    catsBox.innerHTML =
      catRow("necessari", T.nec, T.necD, true, true) +
      catRow("statistiche", T.stat, T.statD, !!c.statistiche, false) +
      catRow("marketing", T.mkt, T.mktD, !!c.marketing, false);
    catsBox.hidden = false;
    box.querySelector('[data-act="save"]').hidden = false;
    box.querySelector('[data-act="custom"]').hidden = true;
    var first = catsBox.querySelector("input:not([disabled])"); if (first) first.focus();
  }

  function show(withCats) {
    if (!box) build();
    lastFocus = document.activeElement;
    catsBox.hidden = true; catsBox.innerHTML = "";
    box.querySelector('[data-act="save"]').hidden = true;
    box.querySelector('[data-act="custom"]').hidden = false;
    box.hidden = false;
    if (withCats) showCats(read()); else box.focus({ preventScroll: true });
  }
  function hide() {
    if (box) box.hidden = true;
    if (lastFocus && lastFocus.focus && lastFocus !== document.body) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }

  /* ---------- avvio ---------- */
  function init() {
    document.addEventListener("click", function (ev) {
      var a = ev.target.closest && ev.target.closest("[data-cookie-prefs]");
      if (a) { ev.preventDefault(); show(true); }
    });
    var c = read();
    var force = /[?&]cookie-banner=1\b/.test(location.search);
    if (c) apply(c);
    if (force || (!c && (ALWAYS_SHOW || hasOptional()))) show(false);
  }

  window.cookieConsent = { open: function () { show(true); }, get: read };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
