// רקע מונפש: רשת של שרתים, מחשבים, בתים ואנטנות, וחבילות מידע שעוברות ביניהם.
(function () {
  var cv = document.createElement("canvas");
  cv.className = "net-bg"; cv.setAttribute("aria-hidden", "true");
  document.body.insertBefore(cv, document.body.firstChild);
  var ctx = cv.getContext("2d");
  var still = matchMedia("(prefers-reduced-motion: reduce)");
  var dark = matchMedia("(prefers-color-scheme: dark)");
  var root = document.documentElement;

  var W = 0, H = 0, DPR = 1, nodes = [], edges = [], packets = [], staticLayer = null, t0 = performance.now();
  var KINDS = ["server", "desktop", "house", "antenna", "laptop", "cloud", "server", "phone", "house", "desktop"];

  // מחולל מספרים קבוע, כדי שהסידור לא יקפוץ בכל טעינה
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  function isDark() {
    if (root.classList.contains("a11y-contrast")) return true;
    var th = root.getAttribute("data-theme");
    return th === "dark" || (th !== "light" && dark.matches);
  }
  function colors() {
    return isDark()
      ? { ink: "rgba(150,195,240,.22)", fill: "rgba(19,36,61,.55)", line: "rgba(150,195,240,.12)", a: "rgba(0,209,209,.75)", b: "rgba(120,180,255,.7)", led: "rgba(0,230,180,.8)" }
      : { ink: W < 640 ? "rgba(45,105,158,.2)" : "rgba(45,105,158,.30)", fill: "rgba(255,255,255,.75)", line: W < 640 ? "rgba(45,105,158,.1)" : "rgba(45,105,158,.15)", a: "rgba(0,180,190,.8)", b: "rgba(45,105,158,.7)", led: "rgba(0,200,150,.9)" };
  }

  function layout() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    seed = 7; nodes = []; edges = []; packets = [];
    var gap = W < 640 ? 150 : 230;
    var cols = Math.max(2, Math.ceil(W / gap) + 1), rows = Math.max(2, Math.ceil(H / (gap * 0.85)) + 1);
    var cw = W / (cols - 1), rh = H / (rows - 1), k = 0;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      if (rnd() < 0.18) continue;
      nodes.push({ x: c * cw + (rnd() - 0.5) * cw * 0.55 + (r % 2 ? cw * 0.3 : 0), y: r * rh + (rnd() - 0.5) * rh * 0.5,
        kind: KINDS[(k++ + r * 3) % KINDS.length], s: (W < 640 ? 28 : 36) * (0.85 + rnd() * 0.3), ph: rnd() * 6.28, links: [] });
    }
    // כל צומת מתחבר לשני השכנים הקרובים
    nodes.forEach(function (n, i) {
      var near = nodes.map(function (m, j) { return { j: j, d: (m.x - n.x) * (m.x - n.x) + (m.y - n.y) * (m.y - n.y) }; })
        .filter(function (o) { return o.j !== i; }).sort(function (a, b) { return a.d - b.d; }).slice(0, 2);
      near.forEach(function (o) {
        var a = Math.min(i, o.j), b = Math.max(i, o.j);
        if (!edges.some(function (e) { return e.a === a && e.b === b; })) {
          edges.push({ a: a, b: b }); nodes[a].links.push(b); nodes[b].links.push(a);
        }
      });
    });
    var count = Math.min(60, Math.round(edges.length * 0.55));
    for (var p = 0; p < count; p++) {
      var e = edges[Math.floor(rnd() * edges.length)]; if (!e) break;
      packets.push({ from: e.a, to: e.b, t: rnd(), v: 0.0025 + rnd() * 0.003, c: rnd() < 0.55 ? "a" : "b", env: rnd() < 0.35 });
    }
    drawStatic();
  }

  function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); }

  function icon(n, C) {
    var s = n.s, x = n.x, y = n.y;
    ctx.lineWidth = 1.6; ctx.strokeStyle = C.ink; ctx.fillStyle = C.fill; ctx.lineJoin = "round"; ctx.lineCap = "round";
    switch (n.kind) {
      case "server":
        for (var i = 0; i < 3; i++) { rr(x - s * 0.5, y - s * 0.55 + i * s * 0.38, s, s * 0.32, 4); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x - s * 0.1, y - s * 0.39 + i * s * 0.38); ctx.lineTo(x + s * 0.35, y - s * 0.39 + i * s * 0.38); ctx.stroke(); }
        break;
      case "desktop":
        rr(x - s * 0.6, y - s * 0.5, s * 1.2, s * 0.78, 5); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y + s * 0.28); ctx.lineTo(x, y + s * 0.5); ctx.moveTo(x - s * 0.3, y + s * 0.52); ctx.lineTo(x + s * 0.3, y + s * 0.52); ctx.stroke();
        break;
      case "laptop":
        rr(x - s * 0.45, y - s * 0.45, s * 0.9, s * 0.6, 4); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - s * 0.62, y + s * 0.3); ctx.lineTo(x + s * 0.62, y + s * 0.3); ctx.lineTo(x + s * 0.5, y + s * 0.2); ctx.lineTo(x - s * 0.5, y + s * 0.2); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
      case "phone":
        rr(x - s * 0.25, y - s * 0.5, s * 0.5, s, 6); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - s * 0.06, y + s * 0.38); ctx.lineTo(x + s * 0.06, y + s * 0.38); ctx.stroke();
        break;
      case "house":
        ctx.beginPath(); ctx.moveTo(x - s * 0.6, y - s * 0.05); ctx.lineTo(x, y - s * 0.6); ctx.lineTo(x + s * 0.6, y - s * 0.05); ctx.stroke();
        rr(x - s * 0.45, y - s * 0.12, s * 0.9, s * 0.65, 3); ctx.fill(); ctx.stroke();
        rr(x - s * 0.1, y + s * 0.18, s * 0.2, s * 0.35, 2); ctx.stroke();
        rr(x + s * 0.17, y + s * 0.02, s * 0.16, s * 0.14, 2); ctx.stroke();
        break;
      case "antenna":
        ctx.beginPath(); ctx.moveTo(x - s * 0.3, y + s * 0.55); ctx.lineTo(x, y - s * 0.3); ctx.lineTo(x + s * 0.3, y + s * 0.55);
        ctx.moveTo(x - s * 0.18, y + s * 0.2); ctx.lineTo(x + s * 0.18, y + s * 0.2); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y - s * 0.34, s * 0.07, 0, 6.28); ctx.fillStyle = C.ink; ctx.fill();
        break;
      case "cloud":
        ctx.beginPath(); ctx.arc(x - s * 0.3, y + s * 0.05, s * 0.25, 1.57, 4.71); ctx.arc(x - s * 0.05, y - s * 0.15, s * 0.3, 3.4, 5.9);
        ctx.arc(x + s * 0.3, y + s * 0.02, s * 0.27, 4.4, 1.57); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
    }
  }

  function drawStatic() {
    var C = colors();
    staticLayer = document.createElement("canvas"); staticLayer.width = cv.width; staticLayer.height = cv.height;
    var main = ctx; ctx = staticLayer.getContext("2d"); ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.strokeStyle = C.line; ctx.lineWidth = 1.4; ctx.setLineDash([5, 7]);
    edges.forEach(function (e) { var a = nodes[e.a], b = nodes[e.b]; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
    ctx.setLineDash([]);
    nodes.forEach(function (n) { icon(n, C); });
    ctx = main;
  }

  function frame(now) {
    var C = colors(), t = (now - t0) / 1000, moving = !(still.matches || root.classList.contains("a11y-still"));
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    if (staticLayer) ctx.drawImage(staticLayer, 0, 0);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    // נורות מהבהבות בשרתים וגלים מהאנטנות
    nodes.forEach(function (n) {
      if (n.kind === "server") for (var i = 0; i < 3; i++) {
        var on = Math.sin(t * 3 + n.ph + i * 1.7) > 0.2;
        ctx.beginPath(); ctx.arc(n.x - n.s * 0.3, n.y - n.s * 0.39 + i * n.s * 0.38, n.s * 0.05, 0, 6.28);
        ctx.fillStyle = on ? C.led : C.line; ctx.fill();
      } else if (n.kind === "antenna") for (var w = 0; w < 2; w++) {
        var k = moving ? ((t * 0.6 + n.ph + w * 0.5) % 1) : 0.4 + w * 0.3;
        ctx.beginPath(); ctx.arc(n.x, n.y - n.s * 0.34, n.s * (0.2 + k * 0.5), -2.4, -0.74);
        ctx.strokeStyle = C.ink.replace(/[\d.]+\)$/, (0.35 * (1 - k)).toFixed(2) + ")"); ctx.lineWidth = 1.6; ctx.stroke();
      }
    });
    // חבילות מידע
    packets.forEach(function (p) {
      if (moving) {
        p.t += p.v;
        if (p.t >= 1) { var n = nodes[p.to], nx = n.links[Math.floor(Math.random() * n.links.length)];
          p.from = p.to; p.to = nx === undefined ? p.from : nx; p.t = 0; }
      }
      var a = nodes[p.from], b = nodes[p.to], x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
      ctx.fillStyle = C[p.c];
      if (p.env) { rr(x - 6, y - 4.5, 12, 9, 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(x - 6, y - 4.5); ctx.lineTo(x, y + 0.5); ctx.lineTo(x + 6, y - 4.5);
        ctx.strokeStyle = C.fill; ctx.lineWidth = 1.2; ctx.stroke(); }
      else { ctx.beginPath(); ctx.arc(x, y, 3.6, 0, 6.28); ctx.fill(); }
    });
    if (moving && !document.hidden) raf = requestAnimationFrame(frame); else raf = 0;
  }

  var raf = 0, rt = 0;
  function start() { if (!raf) raf = requestAnimationFrame(frame); }
  addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { layout(); start(); }, 150); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });
  dark.addEventListener && dark.addEventListener("change", function () { drawStatic(); start(); });
  still.addEventListener && still.addEventListener("change", start);
  // שינוי מצב בתפריט הנגישות (ניגודיות / עצירת אנימציות)
  new MutationObserver(function () { drawStatic(); start(); }).observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
  layout(); start();
})();
