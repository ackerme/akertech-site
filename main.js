(function () {
  var S = window.SITE || {};
  function waLink(t) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(t); }

  // כפתור וואטסאפ צף ושנת זכויות יוצרים (בכל העמודים)
  var wa = document.getElementById("wa");
  if (wa) wa.href = waLink("שלום, אשמח לשמוע על השירותים של אקרטק");
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // אחסון מקומי בטוח (עלול להיחסם בגלישה פרטית)
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // ===== באנר עוגיות =====
  if (!get("cookie-ok")) {
    var c = document.createElement("div");
    c.className = "cookie"; c.setAttribute("role", "region"); c.setAttribute("aria-label", "הודעת עוגיות");
    c.innerHTML = '<p>האתר משתמש בעוגיות ובאחסון מקומי לצורך תפקוד תקין ושמירת העדפות. ' +
      '<a href="privacy.html">למידע נוסף</a></p><button class="btn" type="button">הבנתי</button>';
    c.querySelector("button").addEventListener("click", function () { set("cookie-ok", "1"); c.remove(); });
    document.body.appendChild(c);
  }

  // ===== תפריט נגישות =====
  var root = document.documentElement;
  var modes = [["a11y-contrast", "ניגודיות גבוהה"], ["a11y-links", "הדגשת קישורים"], ["a11y-font", "גופן קריא"], ["a11y-still", "עצירת אנימציות"]];
  var saved = {}; try { saved = JSON.parse(get("a11y") || "{}") || {}; } catch (e) {}
  function apply() {
    modes.forEach(function (m) { root.classList.toggle(m[0], !!saved[m[0]]); });
    document.body.style.zoom = saved.zoom ? String(saved.zoom) : "";
  }
  function save() { set("a11y", JSON.stringify(saved)); apply(); sync(); }
  var btn = document.createElement("button");
  btn.className = "a11y-btn"; btn.type = "button";
  btn.setAttribute("aria-label", "תפריט נגישות"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "a11y-panel");
  btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M19 8.5c0 .6-.4 1-1 1.1l-4 .5v3.4l1.9 6.1c.2.6-.2 1.2-.7 1.3-.5.2-1.1-.1-1.3-.7L12 15h-.1l-1.8 5.2c-.2.6-.8.9-1.3.7-.5-.1-.9-.7-.7-1.3L10 13.5v-3.4l-4-.5c-.6-.1-1-.5-1-1.1 0-.6.5-1 1.1-1l5.9.5 5.9-.5c.6 0 1.1.4 1.1 1z"/></svg>';
  var panel = document.createElement("div");
  panel.className = "a11y-panel"; panel.id = "a11y-panel"; panel.hidden = true;
  panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "תפריט נגישות");
  var html = '<h2>נגישות</h2><button type="button" data-z="1">הגדלת טקסט</button><button type="button" data-z="-1">הקטנת טקסט</button>';
  modes.forEach(function (m) { html += '<button type="button" aria-pressed="false" data-m="' + m[0] + '">' + m[1] + '</button>'; });
  html += '<button type="button" data-reset="1">איפוס הגדרות</button><a href="accessibility.html">הצהרת נגישות</a>';
  panel.innerHTML = html;
  function sync() { panel.querySelectorAll("[data-m]").forEach(function (b) { b.setAttribute("aria-pressed", saved[b.dataset.m] ? "true" : "false"); }); }
  panel.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.z) { var z = Math.round(((saved.zoom || 1) + 0.1 * Number(b.dataset.z)) * 10) / 10; saved.zoom = Math.min(1.6, Math.max(0.9, z)); if (saved.zoom === 1) delete saved.zoom; }
    else if (b.dataset.m) { saved[b.dataset.m] = !saved[b.dataset.m]; }
    else if (b.dataset.reset) { saved = {}; }
    save();
  });
  function toggle(open) { panel.hidden = !open; btn.setAttribute("aria-expanded", open ? "true" : "false"); if (open) panel.querySelector("button").focus(); }
  btn.addEventListener("click", function () { toggle(panel.hidden); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { toggle(false); btn.focus(); } });
  document.body.appendChild(panel); document.body.appendChild(btn);
  apply(); sync();

  // ===== קרוסלת לקוחות: לוגו אחד זז הצידה כל 3 שניות =====
  var track = document.getElementById("logos");
  if (track) (function () {
    var vp = track.parentNode, timer = 0, busy = false, paused = false;
    function stillMode() {
      return root.classList.contains("a11y-still") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
    function step() {
      if (busy || paused || document.hidden) return;
      var first = track.firstElementChild; if (!first) return;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      busy = true;
      track.style.transition = "transform .8s ease";
      track.style.transform = "translateX(" + (-(first.offsetWidth + gap)) + "px)";
      setTimeout(function () {
        track.style.transition = "none"; track.appendChild(first); track.style.transform = "none";
        void track.offsetWidth; busy = false;
      }, 820);
    }
    var originals = Array.prototype.slice.call(track.children);
    function setup() {
      clearInterval(timer); track.style.transition = "none"; track.style.transform = "none";
      // מסדרים מחדש: רק המקוריים, בסדר המקורי
      Array.prototype.slice.call(track.querySelectorAll("[data-clone]")).forEach(function (n) { n.remove(); });
      originals.forEach(function (n) { track.appendChild(n); });
      var still = stillMode();
      vp.classList.toggle("static", still);
      track.classList.toggle("moving", !still);
      if (still || originals.length < 2) return;
      // משכפלים את הלוגואים עד שהשורה רחבה מהמסך, כדי שהתנועה תהיה רציפה
      var guard = 0;
      while (track.scrollWidth < vp.clientWidth * 2 && guard++ < 10)
        originals.forEach(function (n) { var c = n.cloneNode(true); c.setAttribute("data-clone", ""); c.setAttribute("aria-hidden", "true"); track.appendChild(c); });
      timer = setInterval(step, 3000);
    }
    vp.addEventListener("mouseenter", function () { paused = true; });
    vp.addEventListener("mouseleave", function () { paused = false; });
    vp.addEventListener("focusin", function () { paused = true; });
    vp.addEventListener("focusout", function () { paused = false; });
    var rt; addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(setup, 200); });
    new MutationObserver(setup).observe(root, { attributes: true, attributeFilter: ["class"] });
    if (document.readyState === "complete") setup(); else addEventListener("load", setup);
  })();

  // טופס יצירת קשר (רק בעמוד contact.html)
  var f = document.getElementById("f"), msg = document.getElementById("msg");
  if (!f) return;

  // מילוי הודעה מראש כשמגיעים מחבילת תמיכה (contact.html?pkg=...)
  var pkg = new URLSearchParams(location.search).get("pkg");
  if (pkg) f.message.value = "מעוניין/ת בבירור לגבי חבילת התמיכה: " + pkg;

  f.addEventListener("submit", async function (e) {
    e.preventDefault();
    var d = { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), message: f.message.value.trim(), website: f.website ? f.website.value : "" };
    msg.style.color = ""; msg.textContent = "שולח...";
    try {
      if (!S.formEndpoint) throw new Error("no endpoint");
      var res = await fetch(S.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(d)
      });
      if (!res.ok) throw new Error("bad status");
      f.reset(); msg.style.color = "#0a8f8f";
      msg.textContent = "תודה! הפנייה התקבלה ונחזור אליכם בהקדם.";
    } catch (err) {
      msg.style.color = "#b3261e";
      msg.innerHTML = 'אפשר לשלוח את הפנייה ישירות ב<a href="' +
        waLink("שלום, שמי " + d.name + ". " + d.message + " (טלפון: " + d.phone + ")") +
        '" target="_blank" rel="noopener">וואטסאפ</a>.';
    }
  });
})();
