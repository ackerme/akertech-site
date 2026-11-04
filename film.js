(function () {
  if (!document.getElementById("aktFilm")) return;
  var F = "Assistant, Arial, sans-serif", H = "'Secular One', Assistant, sans-serif";

  /* ---------- דמות ---------- */
  function person(o) {
    var skin = "#f1c9a1", hair = o.hair || "#4a3426";
    var beard = o.beard === "short"
      ? '<path d="M30 54q4 18 20 20 16-2 20-20-6 8-20 8t-20-8z" fill="' + hair + '"/>'
      : '<path d="M27 50q1 28 23 30 22-2 23-30-6 12-23 12t-23-12z" fill="' + hair + '"/>';
    // שיער: רק בצדדים (פאות), הכיפה יושבת למעלה – כיפה אחת בלבד
    var sides = '<path d="M26 46q-2-14 5-22l3 2q-4 8-3 20z" fill="' + hair + '"/><path d="M74 46q2-14-5-22l-3 2q4 8 3 20z" fill="' + hair + '"/>';
    var kippa = o.kippa === "knit"
      ? '<path d="M33 22a17 9 0 0 1 34 0q-17-5-34 0z" fill="#2f5f93"/><path d="M37 19.5q13-4 26 0" stroke="#fff" stroke-width="1.4" stroke-dasharray="2 2" fill="none"/>'
      : '<path d="M33 22a17 9 0 0 1 34 0q-17-5-34 0z" fill="#141414"/>';
    var calm = o.mood === "calm";
    var eyes = calm
      ? '<path d="M38 44q4-4 8 0M54 44q4-4 8 0" stroke="#1d1d1d" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : '<circle cx="42" cy="43" r="2.7" fill="#1d1d1d"/><circle cx="58" cy="43" r="2.7" fill="#1d1d1d"/><path d="M36 35l9 3M64 35l-9 3" stroke="#1d1d1d" stroke-width="2.2" stroke-linecap="round"/>';
    var mouth = calm
      ? '<path d="M43 58q7 6 14 0" fill="none" stroke="#7a2e2e" stroke-width="2.4" stroke-linecap="round"/>'
      : '<path d="M44 60q6-5 12 0" fill="none" stroke="#1d1d1d" stroke-width="2.2" stroke-linecap="round"/>';
    var glasses = o.glasses ? '<g fill="none" stroke="#333" stroke-width="1.8"><circle cx="42" cy="43" r="7"/><circle cx="58" cy="43" r="7"/><path d="M49 43h2"/></g>' : "";
    var cheeks = calm ? '<circle cx="34" cy="51" r="4" fill="#f4a3a3" opacity=".5"/><circle cx="66" cy="51" r="4" fill="#f4a3a3" opacity=".5"/>' : "";
    var arm = calm
      ? '<g class="sip" style="--t:' + (o.mugT || 0) + 's"><path d="M84 112q14-6 10-30" stroke="' + o.shirt + '" stroke-width="13" stroke-linecap="round" fill="none"/>' +
        '<rect x="86" y="66" width="18" height="20" rx="3" fill="#fff" stroke="#9aa6b5" stroke-width="2"/><path d="M104 70q7 3 0 10" fill="none" stroke="#9aa6b5" stroke-width="2"/>' +
        '<path class="steam" style="--t:' + (o.mugT || 0) + 's" d="M92 60q-4-6 0-12M98 60q-4-6 0-12" stroke="#c7d0db" stroke-width="2" fill="none" stroke-linecap="round"/></g>'
      : '<g class="rub"><path d="M86 112q16-24 6-56" stroke="' + o.shirt + '" stroke-width="13" stroke-linecap="round" fill="none"/><circle cx="89" cy="50" r="8.5" fill="' + skin + '"/></g>';
    var sweat = calm ? "" : '<path class="sweat" d="M77 31q3.5 6 0 9-3.5-3 0-9z" fill="#7cc6f0"/>';
    return '<g><g>' +
      '<path d="M8 124q0-46 40-48h4q40 2 40 48z" fill="' + o.shirt + '"/><path d="M8 124q0-46 40-48h4q40 2 40 48z" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="2"/>' +
      '<path d="M37 76l13 18 13-18" fill="#fff" stroke="rgba(0,0,0,.15)" stroke-width="2"/>' +
      '<g><g class="' + (calm ? "" : "stress") + '">' +
        '<ellipse cx="50" cy="45" rx="25" ry="28" fill="' + skin + '"/>' + sides +
        beard + cheeks + eyes + glasses + mouth + kippa + sweat +
      '</g></g>' + arm + '</g></g>';
  }

  /* ---------- מסך (צג דק, ממשק מודרני) ---------- */
  function screen(title, mode, accent) {
    var W = 176, Hh = 108;
    var g = '<rect x="-3" y="-3" width="' + (W + 6) + '" height="' + (Hh + 6) + '" rx="8" fill="#0b1220"/>' +
      '<rect width="' + W + '" height="' + Hh + '" rx="5" fill="' + (mode === "calm" ? "#f4f7fb" : "#ffffff") + '"/>';
    if (mode === "calm") {
      // דשבורד CRM
      g += '<rect width="34" height="' + Hh + '" rx="5" fill="#13233b"/><rect x="8" y="10" width="18" height="18" rx="5" fill="' + accent + '"/>';
      for (var k = 0; k < 4; k++) g += '<rect x="9" y="' + (38 + k * 15) + '" width="16" height="4" rx="2" fill="' + (k ? "#3a4d6b" : "#7fb3ff") + '"/>';
      g += '<text x="' + (W - 8) + '" y="16" text-anchor="start" font-size="8.5" font-weight="700" fill="#13233b" font-family="' + F + '" direction="rtl">' + title + '</text>';
      [["128", "#2d699e"], ["94%", "#16a34a"], ["0", "#0ea5b7"]].forEach(function (c, k) {
        var x = 42 + k * 44;
        g += '<rect x="' + x + '" y="24" width="38" height="24" rx="5" fill="#fff" stroke="#e2e8f0"/><text x="' + (x + 19) + '" y="41" text-anchor="middle" font-size="10" font-weight="800" fill="' + c[1] + '" font-family="' + F + '">' + c[0] + '</text>';
      });
      g += '<rect x="42" y="54" width="126" height="46" rx="5" fill="#fff" stroke="#e2e8f0"/>' +
        '<path class="draw" d="M48 92 L66 84 L82 87 L98 74 L116 78 L134 64 L160 60" fill="none" stroke="' + accent + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M48 92 L66 84 L82 87 L98 74 L116 78 L134 64 L160 60 V96 H48z" fill="' + accent + '" opacity=".1"/>' +
        '<circle cx="160" cy="60" r="3.5" fill="' + accent + '"/>';
    } else {
      // גיליון מבולגן
      g += '<rect width="' + W + '" height="14" rx="5" fill="#1d6f42"/><circle cx="8" cy="7" r="2" fill="#ff5f57"/><circle cx="15" cy="7" r="2" fill="#febc2e"/><circle cx="22" cy="7" r="2" fill="#28c840"/>' +
        '<text x="' + (W / 2) + '" y="10" text-anchor="middle" font-size="7" fill="#fff" font-family="' + F + '" direction="rtl">' + title + '</text>' +
        '<rect y="14" width="' + W + '" height="9" fill="#f1f5f9"/><rect x="4" y="16" width="16" height="5" rx="1" fill="#cbd5e1"/><rect x="24" y="16" width="70" height="5" rx="1" fill="#fff" stroke="#cbd5e1" stroke-width=".5"/>';
      for (var r = 0; r < 7; r++) for (var c = 0; c < 5; c++) {
        var bad = (r * 3 + c * 5) % 7 === 0 || (r + c) % 6 === 4;
        g += '<rect class="' + (bad ? "bad" : "") + '" x="' + (c * 35.2) + '" y="' + (23 + r * 11.8) + '" width="35.2" height="11.8" fill="' + (bad ? "#fee2e2" : "#fff") + '" stroke="#dbe2ea" stroke-width=".7"/>';
      }
      g += '<text x="18" y="56" text-anchor="middle" font-size="6.5" fill="#b91c1c" font-family="' + F + '">#REF!</text><text x="122" y="44" text-anchor="middle" font-size="6.5" fill="#b91c1c">#N/A</text><text x="70" y="92" text-anchor="middle" font-size="6.5" fill="#b91c1c" font-family="' + F + '">כפול</text>' +
        '<g class="err"><rect x="54" y="48" width="70" height="30" rx="4" fill="#fff" stroke="#ef4444"/><rect x="54" y="48" width="70" height="8" rx="4" fill="#ef4444"/><text x="89" y="70" text-anchor="middle" font-size="7.5" font-weight="700" fill="#b91c1c" font-family="' + F + '" direction="rtl">הקובץ לא נשמר</text></g>';
    }
    // מעמד דק
    return g + '<path d="M' + (W / 2 - 4) + ' ' + (Hh + 3) + 'h8l4 16h-16z" fill="#94a3b8"/><rect x="' + (W / 2 - 24) + '" y="' + (Hh + 18) + '" width="48" height="5" rx="2.5" fill="#64748b"/>';
  }

  /* ---------- פלטת צבעים: בהיר / כהה (מתחלפת לפי מצב האתר) ---------- */
  var P, DARK;
  function isDark() {
    var r = document.documentElement, th = r.getAttribute("data-theme");
    if (r.classList.contains("a11y-contrast")) return true;
    return th === "dark" || (th !== "light" && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function setPal() {
    DARK = isDark();
    P = DARK ? {
      wallTop: "#1c2840", wallBot: "#131c2e", wallLine: "#22304a", lampOp: ".10", floorTop: "#1a2436", floorBot: "#111827", floorLine: "#2a3a55",
      sky: "#1e3a5f", hill1: "#2f5d4a", hill2: "#264d3e", sun: "#f3e9b0", frame: "#060a13",
      deskTop: "#33435e", deskEdge: "#26344a", legs: "#94a3b8", signBg: "#1e293b", signText: "#e2e8f0",
      bubBg: "rgba(30,41,59,.97)", bubText: "#e2e8f0", bubStroke: "#334155", paper: "#cbd5e1",
      gridStress: "#060b16", gridCalm: "#0c2427", tile: "#2a3a55", endBg: "#0d1728", endCircle: "#13294a", endText: "#cfe3f6",
      kb: "#334155", kbStroke: "#64748b", tray: "#2a3a55", trayLine: "#64748b"
    } : {
      wallTop: "#f3f6fa", wallBot: "#e4eaf2", wallLine: "#dfe6ef", lampOp: ".9", floorTop: "#cfd8e3", floorBot: "#b9c4d2", floorLine: "#aab6c5",
      sky: "#cfe5f6", hill1: "#a7cfa3", hill2: "#87b784", sun: "#ffd75e", frame: "#0f172a",
      deskTop: "#f8fafc", deskEdge: "#cbd5e1", legs: "#334155", signBg: "#ffffff", signText: "#0f172a",
      bubBg: "rgba(255,255,255,.97)", bubText: "#0f172a", bubStroke: "#e2e8f0", paper: "#ffffff",
      gridStress: "#1f2a38", gridCalm: "#e6f4f2", tile: "#ffffff", endBg: "#f7fafd", endCircle: "#e6f4f6", endText: "#193f73",
      kb: "#e2e8f0", kbStroke: "#94a3b8", tray: "#e2e8f0", trayLine: "#94a3b8"
    };
  }

  /* ---------- התראה: גדולה וקריאה ---------- */
  var APPS = [["#25d366", "W"], ["#2563eb", "@"], ["#f59e0b", "☎"], ["#25d366", "W"], ["#2563eb", "@"], ["#25d366", "W"]];
  function bubble(x, y, text, t, red, k) {
    var w = Math.max(130, text.length * 9.2 + 62), ap = red ? ["#ef4444", "!"] : APPS[k % APPS.length];
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="bub" style="--t:' + t + 's" filter="url(#sh)">' +
      '<rect x="' + (-w / 2) + '" y="-20" width="' + w + '" height="40" rx="12" fill="' + P.bubBg + '" stroke="' + (red ? "#f87171" : P.bubStroke) + '" stroke-width="1.5"/>' +
      '<rect x="' + (w / 2 - 34) + '" y="-13" width="26" height="26" rx="8" fill="' + ap[0] + '"/>' +
      '<text x="' + (w / 2 - 21) + '" y="5.5" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="Arial">' + ap[1] + '</text>' +
      '<text x="' + (w / 2 - 42) + '" y="6" text-anchor="start" font-size="16" font-weight="700" font-family="' + F + '" fill="' + (red ? "#ef4444" : P.bubText) + '" direction="rtl">' + text + '</text></g></g>';
  }
  var SPOTS = [[112, 192], [528, 136], [108, 266], [528, 304], [118, 120], [536, 190], [372, 56]];

  /* ---------- משרד ---------- */
  function office(o) {
    var calm = o.mood === "calm", ac = o.accent || "#2d699e";
    var s = '<defs><filter id="sh" x="-20%" y="-20%" width="140%" height="170%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="' + (DARK ? ".35" : ".14") + '"/></filter>' +
      '<linearGradient id="wall' + o.id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + P.wallTop + '"/><stop offset="1" stop-color="' + P.wallBot + '"/></linearGradient>' +
      '<radialGradient id="lamp' + o.id + '" cx="50%" cy="10%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity="' + P.lampOp + '"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="floor' + o.id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + P.floorTop + '"/><stop offset="1" stop-color="' + P.floorBot + '"/></linearGradient></defs>' +
      '<g class="cam"><rect width="640" height="360" fill="url(#wall' + o.id + ')"/>' +
      '<g stroke="' + P.wallLine + '" stroke-width="2">' + [80, 160, 240, 320, 400, 480, 560].map(function (x) { return '<path d="M' + x + ' 0V272"/>'; }).join("") + '</g>' +
      '<rect width="640" height="360" fill="url(#lamp' + o.id + ')"/>' +
      '<rect y="272" width="640" height="88" fill="url(#floor' + o.id + ')"/><rect y="270" width="640" height="4" fill="' + P.floorLine + '"/>';
    // חלון
    s += '<g transform="translate(36 40)"><rect width="146" height="104" rx="4" fill="' + P.frame + '"/><rect x="4" y="4" width="138" height="96" rx="2" fill="' + P.sky + '"/>' +
      (DARK ? '<circle cx="30" cy="22" r="1.4" fill="#fff"/><circle cx="58" cy="36" r="1.1" fill="#fff"/><circle cx="96" cy="18" r="1.2" fill="#fff"/>' : '') +
      '<path d="M4 84q34-26 68-12t70-12v40H4z" fill="' + P.hill1 + '"/><path d="M4 94q44-18 86-6t52-6v18H4z" fill="' + P.hill2 + '"/><circle cx="114" cy="26" r="11" fill="' + P.sun + '"/><path d="M73 4v96" stroke="' + P.frame + '" stroke-width="3"/></g>';
    // שעון דיגיטלי
    s += '<g transform="translate(196 44)" filter="url(#sh)"><rect width="66" height="26" rx="6" fill="#0b1220" stroke="' + (DARK ? "#334155" : "none") + '"/>' +
      '<text x="33" y="18.5" text-anchor="middle" font-size="15" font-weight="700" fill="' + (calm ? "#4ade80" : "#f87171") + '" font-family="Consolas, monospace" class="' + (calm ? "" : "blink") + '">' + (calm ? "16:00" : "23:47") + '</text></g>';
    // שלט
    s += '<g transform="translate(482 38)" filter="url(#sh)"><rect width="122" height="46" rx="8" fill="' + P.signBg + '"/><rect x="116" width="6" height="46" rx="3" fill="' + ac + '"/><g transform="translate(-4 -16)">' + o.signIcon + '</g>' +
      '<text x="80" y="29" text-anchor="middle" font-size="14" font-family="' + H + '" fill="' + P.signText + '" direction="rtl">' + o.sign + '</text></g>';
    // נתב
    s += '<g transform="translate(500 226)"><rect width="40" height="16" rx="3" fill="#0b1220" stroke="' + (DARK ? "#334155" : "none") + '"/>' +
      '<circle class="led" cx="8" cy="8" r="2.2" fill="#22c55e"/><circle class="led l2" cx="15" cy="8" r="2.2" fill="#22c55e"/><circle class="led l3" cx="22" cy="8" r="2.2" fill="' + (calm ? "#22c55e" : "#f59e0b") + '"/>' +
      '<path d="M32 0v-12M37 0v-16" stroke="#64748b" stroke-width="2" stroke-linecap="round"/></g>';
    // שולחן
    s += '<rect x="132" y="244" width="416" height="12" rx="4" fill="' + P.deskTop + '"/><rect x="132" y="252" width="416" height="5" rx="2" fill="' + P.deskEdge + '"/>' +
      '<path d="M156 257l-8 79M524 257l8 79" stroke="' + P.legs + '" stroke-width="7" stroke-linecap="round"/><ellipse cx="340" cy="340" rx="200" ry="8" fill="#000" opacity="' + (DARK ? ".25" : ".08") + '"/>';
    if (!calm) {
      s += '<g transform="translate(150 208)"><rect y="24" width="62" height="12" rx="1" fill="' + P.paper + '" stroke="#94a3b8"/><rect x="3" y="12" width="62" height="11" fill="' + P.paper + '" stroke="#94a3b8" transform="rotate(-5 34 18)"/><rect x="1" y="2" width="62" height="11" fill="' + P.paper + '" stroke="#94a3b8" transform="rotate(6 32 8)"/></g>' +
        '<rect class="fly" style="--t:0s" x="186" y="168" width="24" height="30" rx="1" fill="' + P.paper + '" stroke="#94a3b8"/><rect class="fly" style="--t:1.3s" x="224" y="158" width="22" height="28" rx="1" fill="' + P.paper + '" stroke="#94a3b8"/>';
    } else {
      s += '<g transform="translate(160 226)"><rect width="52" height="18" rx="4" fill="' + P.tray + '"/><rect x="6" y="5" width="40" height="3" rx="1.5" fill="' + P.trayLine + '"/><rect x="6" y="11" width="26" height="3" rx="1.5" fill="' + P.trayLine + '"/></g>';
    }
    s += o.props || "";
    s += '<g transform="translate(288 108)" filter="url(#sh)">' + screen(calm ? o.calmTitle : o.messTitle, o.mood, ac) + '</g>';
    s += '<g transform="translate(320 236)"><rect width="96" height="9" rx="2.5" fill="' + P.kb + '" stroke="' + P.kbStroke + '" stroke-width=".8"/><path d="M5 3.5h86M5 6h86" stroke="' + P.kbStroke + '" stroke-width=".8" stroke-dasharray="3.5 1.5"/></g><ellipse cx="430" cy="240" rx="6" ry="4" fill="' + P.kb + '" stroke="' + P.kbStroke + '" stroke-width=".8"/>';
    s += '<g transform="translate(212 120)">' + person({ shirt: o.shirt, beard: o.beard, kippa: o.kippa, glasses: o.glasses, mood: o.mood, mugT: o.mugT }) + '</g>';
    if (!calm) {
      s += '<g transform="translate(466 206)"><circle class="rw" cx="13" cy="16" r="20" fill="none" stroke="#ef4444" stroke-width="2.5"/><circle class="rw w2" cx="13" cy="16" r="20" fill="none" stroke="#ef4444" stroke-width="2.5"/>' +
        '<g class="ringing"><rect width="26" height="38" rx="6" fill="#0b1220"/><rect x="2.5" y="3" width="21" height="30" rx="4" fill="#1e3a5f"/><rect x="5" y="9" width="16" height="5" rx="2" fill="#25d366"/><rect x="5" y="16" width="16" height="5" rx="2" fill="#60a5fa"/><rect x="5" y="23" width="16" height="5" rx="2" fill="#25d366"/></g>' +
        '<g class="badge"><circle cx="26" cy="0" r="9.5" fill="#ef4444"/><text x="26" y="4" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" font-family="' + F + '">' + o.badge + '</text></g></g>';
      var qs = o.q.slice(0, o.qMax || o.q.length);
      qs.forEach(function (text, k) {
        var red = k === qs.length - 1, spot = red ? SPOTS[6] : SPOTS[k % 6];
        s += bubble(spot[0], spot[1], text, 0.2 + k * 0.5, red, k);
      });
    }
    return s + '</g>';
  }

  /* ---------- העסקים והשאלות ---------- */
  var biz = [
    { id: "a", accent: "#16a34a", sign: "צימר", wall: "#f5eddf", floor: "#e0cfb3", shirt: "#f1f4f9", beard: "full", kippa: "black", badge: "12",
      signIcon: '<path d="M14 46l14-16 14 16z" fill="#7fb07c"/><rect x="19" y="41" width="18" height="10" fill="#c98b5b"/>',
      messTitle: "הזמנות - סופי סופי (3)", calmTitle: "הזמנות החודש",
      props: '<g transform="translate(436 214)"><path d="M0 0h24l-3 26H3z" fill="#fff" stroke="#9aa6b5" stroke-width="2"/><path d="M24 6q9 2 0 12" fill="none" stroke="#9aa6b5" stroke-width="2"/></g>',
      q: ["יש מקום בסופ\"ש?", "מה המחיר?", "שלחתי הודעה...", "תחזור אליי דחוף", "הזמנה כפולה!"] },
    { id: "b", accent: "#2563eb", sign: "משכנתאות", wall: "#e9f0f7", floor: "#cdd8e4", shirt: "#dfe8f5", beard: "short", kippa: "black", glasses: 1, badge: "9",
      signIcon: '<path d="M14 46l14-14 14 14v8H14z" fill="#2d699e"/><text x="28" y="51" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">%</text>',
      messTitle: "תיקים - מעודכן (חדש)", calmTitle: "תיקי לקוחות",
      props: '<g transform="translate(430 216)"><rect width="30" height="28" rx="4" fill="#3d4a5c"/><rect x="5" y="4" width="20" height="7" fill="#b9e3c6"/><g fill="#cfd8e3"><rect x="5" y="14" width="5" height="4"/><rect x="12.5" y="14" width="5" height="4"/><rect x="20" y="14" width="5" height="4"/><rect x="5" y="20" width="5" height="4"/><rect x="12.5" y="20" width="5" height="4"/><rect x="20" y="20" width="5" height="4" fill="#f59e0b"/></g></g>',
      q: ["מה הסטטוס?", "שלחתי מסמכים", "מתי תהיה תשובה?", "תחזור אליי דחוף", "חסר מסמך!"] },
    { id: "c", accent: "#db2777", sign: "עמותה", wall: "#f3eef8", floor: "#d9cfe4", shirt: "#f7f2e8", beard: "full", kippa: "knit", badge: "7",
      signIcon: '<path d="M28 50s-12-7-12-15a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 15-12 15z" fill="#e25b7a"/>',
      messTitle: "תרומות 2026 (סופי)", calmTitle: "תרומות וקבלות",
      props: '<g transform="translate(428 220)"><rect width="34" height="22" rx="3" fill="#f6d6a8" stroke="#c9a06a"/><path d="M0 0l17 12 17-12" fill="none" stroke="#c9a06a"/><rect x="6" y="-8" width="34" height="22" rx="3" fill="#fbe7c6" stroke="#c9a06a" transform="rotate(-8 23 3)"/></g>',
      q: ["קיבלתי קבלה?", "כמה נאסף?", "מי אחראי על זה?", "צריך דוח!", "קבלה כפולה!"] },
    { id: "d", accent: "#0891b2", sign: "חנות", wall: "#eef6f1", floor: "#cfe1d6", shirt: "#e6f2ea", beard: "short", kippa: "black", badge: "15",
      signIcon: '<path d="M16 34h24l-3 18H19z" fill="#00a6b0"/><path d="M22 34v-4a6 6 0 0 1 12 0v4" fill="none" stroke="#00a6b0" stroke-width="2.5"/>',
      messTitle: "מלאי - ישן?", calmTitle: "מלאי והזמנות",
      props: '<g transform="translate(424 206)"><rect y="14" width="40" height="26" fill="#d4a373" stroke="#a7784a"/><rect x="8" width="30" height="16" fill="#e0b88a" stroke="#a7784a"/><path d="M20 14v26M23 0v16" stroke="#a7784a"/></g>',
      q: ["יש במלאי?", "איפה המשלוח?", "אפשר להחליף?", "תחזור אליי", "נגמר המלאי!"] }
  ];
  function svgWrap(inner) { return '<svg viewBox="0 0 640 360" aria-hidden="true">' + inner + '</svg>'; }

  /* ---------- בניית הסצנות (נבנות מחדש כשמצב בהיר/כהה מתחלף) ---------- */
  function grid(mood) {
    var s = '<svg viewBox="0 0 640 360" aria-hidden="true"><rect width="640" height="360" fill="' + (mood === "calm" ? P.gridCalm : P.gridStress) + '"/>';
    biz.forEach(function (b, i) {
      var x = 12 + (i % 2) * 314, y = 12 + Math.floor(i / 2) * 170;
      s += '<g class="tile" style="--t:' + (i * .12) + 's;transform-origin:' + (x + 151) + 'px ' + (y + 83) + 'px"><svg x="' + x + '" y="' + y + '" width="302" height="166" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">' +
        office(Object.assign({}, b, { id: b.id + mood, mood: mood, mugT: i * .7, qMax: 3 })) + '</svg>' +
        '<rect x="' + x + '" y="' + y + '" width="302" height="166" rx="12" fill="none" stroke="' + P.tile + '" stroke-width="5"/></g>';
    });
    return s + '</svg>';
  }
  function buildScenes() {
    setPal();
    var list = [];
    biz.forEach(function (b, i) { list.push({ d: i ? 3400 : 3800, html: svgWrap(office(Object.assign({}, b, { mood: "stress" }))) }); });
    list.push({ d: 3200, html: grid("stress") });
    var items = ["מערכת CRM לניהול לקוחות ופניות", "אוטומציות: הודעות ותזכורות", "דוחות בלחיצה אחת", "תמיכה טכנית צמודה TIR 1/2"];
    var why = '<svg viewBox="0 0 640 360" aria-hidden="true"><defs><linearGradient id="bgw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + (DARK ? "#0d1b33" : "#193f73") + '"/><stop offset="1" stop-color="' + (DARK ? "#1a3a63" : "#2d699e") + '"/></linearGradient></defs>' +
      '<rect width="640" height="360" fill="url(#bgw)"/><circle cx="560" cy="60" r="130" fill="#00d1d1" opacity=".12"/><circle cx="70" cy="330" r="110" fill="#fff" opacity=".06"/>' +
      '<g class="zoomin" style="--t:.1s"><text x="320" y="92" text-anchor="middle" font-size="44" font-family="' + H + '" fill="#fff" direction="rtl">למה לעבוד קשה?</text></g>';
    items.forEach(function (t, i) {
      var y = 144 + i * 46;
      why += '<g class="li" style="--t:' + (0.8 + i * .4) + 's"><rect x="140" y="' + (y - 24) + '" width="360" height="40" rx="20" fill="rgba(255,255,255,.13)"/>' +
        '<circle cx="474" cy="' + (y - 4) + '" r="13" fill="#00d1d1"/><path d="M467 ' + (y - 4) + 'l5 5 9-9" stroke="#06263a" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text x="450" y="' + (y + 2) + '" text-anchor="start" font-size="18" font-weight="700" font-family="' + F + '" fill="#fff" direction="rtl">' + t + '</text></g>';
    });
    list.push({ d: 4600, html: why + '</svg>' });
    list.push({ d: 3200, html: grid("calm") });
    var end = '<svg viewBox="0 0 640 360" aria-hidden="true"><defs><linearGradient id="sh2" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><clipPath id="lc"><rect x="160" y="100" width="320" height="86" rx="18"/></clipPath></defs>' +
      '<rect width="640" height="360" fill="' + P.endBg + '"/><circle cx="320" cy="170" r="190" fill="' + P.endCircle + '"/>' +
      '<g class="zoomin" style="--t:.1s"><rect x="160" y="100" width="320" height="86" rx="18" fill="#fff"/><image href="logo.webp" x="180" y="110" width="280" height="66" preserveAspectRatio="xMidYMid meet"/>' +
      '<g clip-path="url(#lc)"><rect class="shine" x="160" y="96" width="70" height="96" fill="url(#sh2)" opacity=".7"/></g></g>' +
      '<g class="li" style="--t:.8s"><text x="320" y="226" text-anchor="middle" font-size="20" font-family="' + H + '" fill="' + P.endText + '" direction="rtl">מערכות CRM ומידע בהתאמה אישית · תמיכה טכנית</text></g>' +
      '<g class="zoomin" style="--t:1.3s"><a href="contact.html"><rect x="250" y="248" width="140" height="42" rx="21" fill="' + (DARK ? "#00c2cc" : "#193f73") + '"/><text x="320" y="275" text-anchor="middle" font-size="17" font-weight="700" font-family="' + F + '" fill="' + (DARK ? "#06263a" : "#fff") + '">צור קשר</text></a></g></svg>';
    list.push({ d: 3400, html: end });
    return list;
  }

  /* ---------- מנוע: מתחיל כשנכנס למסך, רץ פעם אחת ונעצר על הסיום ---------- */
  var film = document.getElementById("aktFilm"), stage = document.getElementById("aktStage"),
      prog = document.getElementById("aktProg"), pp = document.getElementById("aktPP"), rp = document.getElementById("aktReplay");
  var scenes = [], i = -1, paused = true, ended = false, started = false, inView = false, startT = 0, left = 0, raf = 0;
  function render() {
    stage.innerHTML = ""; prog.innerHTML = "";
    scenes = buildScenes();
    scenes.forEach(function (sc) {
      var el = document.createElement("div"); el.className = "akt-scene"; el.innerHTML = sc.html; el.style.setProperty("--d", sc.d / 1000 + "s");
      stage.appendChild(el); sc.el = el;
      var p = document.createElement("i"); p.innerHTML = "<b></b>"; prog.appendChild(p); sc.bar = p.firstChild;
    });
    film.classList.toggle("dark", DARK);
  }
  function show(n, fresh) {
    scenes.forEach(function (sc, k) {
      if (k === n) { if (fresh !== false) { var c = sc.el.cloneNode(true); sc.el.parentNode.replaceChild(c, sc.el); sc.el = c; void c.offsetWidth; } sc.el.classList.add("on"); }
      else sc.el.classList.remove("on");
      sc.bar.style.width = k < n ? "100%" : (k === n && ended ? "100%" : "0");
    });
  }
  function tick() {
    var sc = scenes[i], el = performance.now() - startT;
    sc.bar.style.width = Math.min(100, el / sc.d * 100) + "%";
    if (el >= sc.d) { if (i === scenes.length - 1) { finish(); return; } next(); return; }
    raf = requestAnimationFrame(tick);
  }
  function next() { i++; show(i); startT = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); }
  var PLAY = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z"/></svg>', PAUSE = pp.innerHTML;
  function setPaused(v) {
    paused = v; film.classList.toggle("paused", v);
    pp.setAttribute("aria-label", v ? "הפעלת הסרטון" : "עצירת הסרטון"); pp.innerHTML = v ? PLAY : PAUSE;
    if (v) { cancelAnimationFrame(raf); left = performance.now() - startT; } else { startT = performance.now() - left; raf = requestAnimationFrame(tick); }
  }
  function finish() { ended = true; cancelAnimationFrame(raf); paused = true; film.classList.add("ended"); pp.hidden = true; rp.hidden = false; }
  function play() {
    ended = false; film.classList.remove("ended", "paused"); pp.hidden = false; rp.hidden = true; started = true;
    paused = false; pp.innerHTML = PAUSE; pp.setAttribute("aria-label", "עצירת הסרטון"); i = -1; next();
  }
  function staticMode() { return document.documentElement.classList.contains("a11y-still") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches); }
  function showEnd() { ended = true; i = scenes.length - 1; show(i); film.classList.add("ended"); pp.hidden = true; rp.hidden = false; }
  pp.addEventListener("click", function () { setPaused(!paused); });
  rp.addEventListener("click", play);

  render();
  if (staticMode()) showEnd();
  else if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        inView = e.isIntersecting;
        if (inView && !started && !staticMode()) play();
        else if (!inView && started && !ended && !paused) setPaused(true);
        else if (inView && started && !ended && paused && film.dataset.auto === "1") setPaused(false);
        film.dataset.auto = (!inView && started && !ended) ? "1" : "";
      });
    }, { threshold: .4 }).observe(film);
  } else play();

  // מצב בהיר/כהה או עצירת אנימציות השתנו
  function onThemeChange() {
    var cur = i; render();
    if (staticMode()) { setPaused(true); showEnd(); return; }
    if (cur >= 0) { i = cur; show(i, true); if (ended) { show(i, false); } }
  }
  if (window.matchMedia) { var mq = matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", onThemeChange); }
  var lastDark = DARK, lastStill = staticMode();
  new MutationObserver(function () {
    var d = isDark(), st = staticMode();
    if (d !== lastDark || st !== lastStill) { lastDark = d; lastStill = st; onThemeChange(); }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
})();
