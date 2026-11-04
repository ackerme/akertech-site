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
    return '<g><g class="' + (o.slump ? "drop" : "") + '">' +
      '<path d="M8 124q0-46 40-48h4q40 2 40 48z" fill="' + o.shirt + '"/><path d="M8 124q0-46 40-48h4q40 2 40 48z" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="2"/>' +
      '<path d="M37 76l13 18 13-18" fill="#fff" stroke="rgba(0,0,0,.15)" stroke-width="2"/>' +
      '<g><g class="' + (calm ? "" : "stress") + '">' +
        '<ellipse cx="50" cy="45" rx="25" ry="28" fill="' + skin + '"/>' + sides +
        beard + cheeks + eyes + glasses + mouth + kippa + sweat +
      '</g></g>' + (o.slump ? '' : arm) + '</g>' + (o.slump ? '<g class="zz"><text x="96" y="40" font-size="18" font-weight="700" fill="#2d699e" font-family="Arial">z</text><text x="108" y="24" font-size="24" font-weight="700" fill="#2d699e" font-family="Arial">Z</text></g>' : '') + '</g>';
  }

  /* ---------- מסך ---------- */
  function screen(title, mode) {
    var g = '<rect width="156" height="108" rx="9" fill="#26303d"/><rect x="7" y="7" width="142" height="90" rx="4" fill="#fff"/>';
    if (mode === "calm") {
      g += '<rect x="7" y="7" width="142" height="13" rx="4" fill="#2d699e"/><text x="78" y="17" text-anchor="middle" font-size="8" fill="#fff" font-family="' + F + '" direction="rtl">' + title + '</text>';
      [30, 46, 38, 58, 50].forEach(function (h, i) { g += '<rect class="bar" style="--t:' + (0.3 + i * .12) + 's" x="' + (20 + i * 22) + '" y="' + (88 - h) + '" width="14" height="' + h + '" rx="3" fill="' + (i % 2 ? "#00c2cc" : "#2d699e") + '"/>'; });
      g += '<circle cx="132" cy="34" r="10" fill="#22c55e"/><path d="M127 34l4 4 7-8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    } else {
      g += '<rect x="7" y="7" width="142" height="13" rx="4" fill="#1f7a46"/><text x="78" y="17" text-anchor="middle" font-size="8" fill="#fff" font-family="' + F + '" direction="rtl">' + title + '</text>';
      for (var r = 0; r < 7; r++) for (var c = 0; c < 4; c++) {
        var bad = (r * 3 + c * 5) % 7 === 0 || (r + c) % 5 === 3;
        g += '<rect class="' + (bad ? "bad" : "") + '" x="' + (7 + c * 35.5) + '" y="' + (20 + r * 11) + '" width="35.5" height="11" fill="' + (bad ? "#ffd6d6" : "#fff") + '" stroke="#d3dae3" stroke-width=".8"/>';
      }
      g += '<text x="25" y="50" text-anchor="middle" font-size="7" fill="#c62828" font-family="' + F + '">#REF!</text><text x="96" y="39" text-anchor="middle" font-size="7" fill="#c62828">???</text><text x="60" y="83" text-anchor="middle" font-size="7" fill="#c62828" font-family="' + F + '">כפול!</text>';
    }
    return g + '<rect x="66" y="108" width="24" height="12" fill="#26303d"/><rect x="48" y="119" width="60" height="6" rx="3" fill="#26303d"/>';
  }

  /* ---------- בועה ---------- */
  function bubble(x, y, text, t, red) {
    var w = Math.max(88, text.length * 7.4 + 28);
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="bub" style="--t:' + t + 's" filter="url(#sh)">' +
      '<rect x="' + (-w / 2) + '" y="-16" width="' + w + '" height="32" rx="16" fill="#fff" stroke="' + (red ? "#e25b5b" : "#d6dee8") + '" stroke-width="1.5"/>' +
      '<path d="M-6 15l6 9 6-9z" fill="#fff"/>' +
      '<text y="5" text-anchor="middle" font-size="13" font-weight="700" font-family="' + F + '" fill="' + (red ? "#c0392b" : "#14233a") + '" direction="rtl">' + text + '</text></g></g>';
  }
  // מיקומי הבועות: מסביב לדמות, בלי להסתיר את המסך
  var SPOTS = [[108, 190], [538, 128], [100, 262], [540, 300], [116, 116], [548, 168], [338, 66]];

  /* ---------- משרד ---------- */
  function office(o) {
    var calm = o.mood === "calm";
    var s = '<defs><filter id="sh" x="-20%" y="-20%" width="140%" height="170%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#1f2d3d" flood-opacity=".15"/></filter>' +
      '<radialGradient id="lamp' + o.id + '" cx="50%" cy="15%" r="85%"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="cam"><rect width="640" height="360" fill="' + o.wall + '"/><rect width="640" height="360" fill="url(#lamp' + o.id + ')"/>' +
      '<rect y="276" width="640" height="84" fill="' + o.floor + '"/><rect y="272" width="640" height="6" fill="rgba(0,0,0,.06)"/>';
    s += '<g transform="translate(38 42)"><rect width="142" height="104" rx="9" fill="#d3e9f7" stroke="#b39874" stroke-width="5"/>' +
      '<path d="M5 86q34-28 68-12t66-12v40H5z" fill="#a4cf9f"/><path d="M5 96q44-20 86-6t48-6v14H5z" fill="#83b67f"/>' +
      '<circle cx="110" cy="27" r="12" fill="#ffd75e"/><path d="M71 5v94M5 52h134" stroke="#b39874" stroke-width="4"/></g>';
    s += '<g transform="translate(232 56)"><circle r="20" fill="#fff" stroke="#8d99a8" stroke-width="3"/><path d="M0-13V0" stroke="#33404f" stroke-width="2.4" stroke-linecap="round"/>' +
      '<g class="' + (calm ? "" : "hand") + '"><path d="M0 0L10 6" stroke="#e25b5b" stroke-width="2" stroke-linecap="round"/></g><circle r="2" fill="#33404f"/></g>';
    s += '<g transform="translate(486 40)" filter="url(#sh)"><path d="M50 0v14" stroke="#8a6a44" stroke-width="2"/>' +
      '<rect y="14" width="116" height="42" rx="10" fill="#fff"/>' + o.signIcon +
      '<text x="72" y="41" text-anchor="middle" font-size="15" font-family="' + H + '" fill="#3b4a5e" direction="rtl">' + o.sign + '</text></g>';
    s += '<g transform="translate(574 210)"><path d="M14 44h24l-4 22H18z" fill="#c98b5b"/><path d="M26 46q-14-20-4-36M26 46q12-18 22-26M26 46q-2-24 6-40" stroke="#5c9b62" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
    s += '<rect x="138" y="244" width="404" height="18" rx="6" fill="#a8794f"/><rect x="138" y="244" width="404" height="5" rx="3" fill="#bf8f62"/>' +
      '<rect x="160" y="262" width="13" height="74" fill="#8a6141"/><rect x="507" y="262" width="13" height="74" fill="#8a6141"/>';
    if (!calm) {
      s += '<g transform="translate(150 206)"><rect y="26" width="64" height="14" fill="#fff" stroke="#ccd3dc"/><rect x="3" y="14" width="64" height="12" fill="#fffef6" stroke="#ccd3dc" transform="rotate(-5 35 20)"/><rect x="1" y="3" width="64" height="12" fill="#fff" stroke="#ccd3dc" transform="rotate(6 33 9)"/></g>' +
        '<rect class="fly" style="--t:0s" x="186" y="168" width="26" height="32" fill="#fff" stroke="#ccd3dc"/><rect class="fly" style="--t:1.3s" x="226" y="160" width="24" height="30" fill="#fffdf2" stroke="#ccd3dc"/>';
    } else {
      s += '<g transform="translate(156 222)"><rect width="56" height="22" rx="4" fill="#e8eef5"/><rect x="6" y="5" width="44" height="3" rx="1.5" fill="#b9c6d6"/><rect x="6" y="12" width="30" height="3" rx="1.5" fill="#b9c6d6"/></g>';
    }
    s += o.props || "";
    s += '<g transform="translate(296 118)" filter="url(#sh)">' + screen(calm ? o.calmTitle : o.messTitle, o.mood) + '</g>';
    s += '<g transform="translate(318 234)"><rect width="92" height="10" rx="3" fill="#dfe5ec" stroke="#9aa6b5"/><path d="M6 4h80M6 7h80" stroke="#b7c1cc" stroke-dasharray="4 2"/></g>';
    s += '<g transform="translate(222 120)">' + person({ shirt: o.shirt, beard: o.beard, kippa: o.kippa, glasses: o.glasses, mood: o.mood, mugT: o.mugT, slump: o.slump }) + '</g>';
    if (!calm) {
      s += '<g transform="translate(462 204)"><circle class="rw" cx="16" cy="18" r="22" fill="none" stroke="#e25b5b" stroke-width="3"/><circle class="rw w2" cx="16" cy="18" r="22" fill="none" stroke="#e25b5b" stroke-width="3"/>' +
        '<g class="ringing"><rect x="4" y="2" width="25" height="34" rx="5" fill="#1d1d1d"/><rect x="7" y="6" width="19" height="24" rx="2" fill="#7fd8a8"/></g>' +
        '<g class="badge"><circle cx="30" cy="2" r="10" fill="#e53935"/><text x="30" y="6.5" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" font-family="' + F + '">' + o.badge + '</text></g></g>';
      var qs = o.q.slice(0, o.qMax || o.q.length);
      qs.forEach(function (text, k) {
        var red = k === qs.length - 1, spot = red ? SPOTS[6] : SPOTS[k % 6];
        s += bubble(spot[0], spot[1], text, 0.25 + k * 0.6, red);
      });
    }
    return s + '</g>';
  }

  /* ---------- העסקים והשאלות ---------- */
  var biz = [
    { id: "a", sign: "צימר", wall: "#f5eddf", floor: "#e0cfb3", shirt: "#f1f4f9", beard: "full", kippa: "black", badge: "12",
      signIcon: '<path d="M14 46l14-16 14 16z" fill="#7fb07c"/><rect x="19" y="41" width="18" height="10" fill="#c98b5b"/>',
      messTitle: "הזמנות - סופי סופי (3)", calmTitle: "הזמנות החודש",
      props: '<g transform="translate(436 214)"><path d="M0 0h24l-3 26H3z" fill="#fff" stroke="#9aa6b5" stroke-width="2"/><path d="M24 6q9 2 0 12" fill="none" stroke="#9aa6b5" stroke-width="2"/></g>',
      q: ["יש מקום בסופ\"ש?", "מה המחיר?", "שלחתי הודעה...", "תחזור אליי דחוף", "הזמנה כפולה!"] },
    { id: "b", sign: "משכנתאות", wall: "#e9f0f7", floor: "#cdd8e4", shirt: "#dfe8f5", beard: "short", kippa: "black", glasses: 1, badge: "9",
      signIcon: '<path d="M14 46l14-14 14 14v8H14z" fill="#2d699e"/><text x="28" y="51" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">%</text>',
      messTitle: "תיקים - מעודכן (חדש)", calmTitle: "תיקי לקוחות",
      props: '<g transform="translate(430 216)"><rect width="30" height="28" rx="4" fill="#3d4a5c"/><rect x="5" y="4" width="20" height="7" fill="#b9e3c6"/><g fill="#cfd8e3"><rect x="5" y="14" width="5" height="4"/><rect x="12.5" y="14" width="5" height="4"/><rect x="20" y="14" width="5" height="4"/><rect x="5" y="20" width="5" height="4"/><rect x="12.5" y="20" width="5" height="4"/><rect x="20" y="20" width="5" height="4" fill="#f59e0b"/></g></g>',
      q: ["מה הסטטוס?", "שלחתי מסמכים", "מתי תהיה תשובה?", "תחזור אליי דחוף", "חסר מסמך!"] },
    { id: "c", sign: "עמותה", wall: "#f3eef8", floor: "#d9cfe4", shirt: "#f7f2e8", beard: "full", kippa: "knit", badge: "7",
      signIcon: '<path d="M28 50s-12-7-12-15a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 15-12 15z" fill="#e25b7a"/>',
      messTitle: "תרומות 2026 (סופי)", calmTitle: "תרומות וקבלות",
      props: '<g transform="translate(428 220)"><rect width="34" height="22" rx="3" fill="#f6d6a8" stroke="#c9a06a"/><path d="M0 0l17 12 17-12" fill="none" stroke="#c9a06a"/><rect x="6" y="-8" width="34" height="22" rx="3" fill="#fbe7c6" stroke="#c9a06a" transform="rotate(-8 23 3)"/></g>',
      q: ["קיבלתי קבלה?", "כמה נאסף?", "מי אחראי על זה?", "צריך דוח!", "קבלה כפולה!"] },
    { id: "d", sign: "חנות", wall: "#eef6f1", floor: "#cfe1d6", shirt: "#e6f2ea", beard: "short", kippa: "black", badge: "15",
      signIcon: '<path d="M16 34h24l-3 18H19z" fill="#00a6b0"/><path d="M22 34v-4a6 6 0 0 1 12 0v4" fill="none" stroke="#00a6b0" stroke-width="2.5"/>',
      messTitle: "מלאי - ישן?", calmTitle: "מלאי והזמנות",
      props: '<g transform="translate(424 206)"><rect y="14" width="40" height="26" fill="#d4a373" stroke="#a7784a"/><rect x="8" width="30" height="16" fill="#e0b88a" stroke="#a7784a"/><path d="M20 14v26M23 0v16" stroke="#a7784a"/></g>',
      q: ["יש במלאי?", "איפה המשלוח?", "אפשר להחליף?", "תחזור אליי", "נגמר המלאי!"] }
  ];
  function svgWrap(inner) { return '<svg viewBox="0 0 640 360" aria-hidden="true">' + inner + '</svg>'; }

  /* ---------- סצנות ---------- */
  var scenes = [];
  var caps = ["בעל הצימר: טלפונים, הודעות ואקסל שלא נגמר", "יועץ המשכנתאות: מסמכים, לקוחות ובנקים", "מנהל העמותה: תרומות, קבלות ומתנדבים", "בעל החנות: מלאי, משלוחים ושאלות בלי סוף"];
  biz.forEach(function (b, i) { scenes.push({ d: i ? 4400 : 5200, cap: caps[i], html: svgWrap(office(Object.assign({}, b, { mood: "stress" }))) }); });

  function grid(mood) {
    var s = '<svg viewBox="0 0 640 360" aria-hidden="true"><rect width="640" height="360" fill="' + (mood === "calm" ? "#e6f4f2" : "#1f2a38") + '"/>';
    biz.forEach(function (b, i) {
      var x = 12 + (i % 2) * 314, y = 12 + Math.floor(i / 2) * 170;
      s += '<g class="tile" style="--t:' + (i * .12) + 's;transform-origin:' + (x + 151) + 'px ' + (y + 83) + 'px"><svg x="' + x + '" y="' + y + '" width="302" height="166" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">' +
        office(Object.assign({}, b, { id: b.id + mood, mood: mood, mugT: i * .7, qMax: 3, slump: mood !== "calm" })) + '</svg>' +
        '<rect x="' + x + '" y="' + y + '" width="302" height="166" rx="12" fill="none" stroke="#fff" stroke-width="5"/></g>';
    });
    return s + '</svg>';
  }
  scenes.push({ d: 4200, cap: "נשמע מוכר?", html: grid("stress") });

  var items = ["מערכת CRM לניהול לקוחות ופניות", "אוטומציות: הודעות ותזכורות", "דוחות בלחיצה אחת", "תמיכה טכנית צמודה TIR 1/2"];
  var why = '<svg viewBox="0 0 640 360" aria-hidden="true"><defs><linearGradient id="bgw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#193f73"/><stop offset="1" stop-color="#2d699e"/></linearGradient></defs>' +
    '<rect width="640" height="360" fill="url(#bgw)"/><circle cx="560" cy="60" r="130" fill="#00d1d1" opacity=".12"/><circle cx="70" cy="330" r="110" fill="#fff" opacity=".06"/>' +
    '<g class="zoomin" style="--t:.1s"><text x="320" y="92" text-anchor="middle" font-size="44" font-family="' + H + '" fill="#fff" direction="rtl">למה לעבוד קשה?</text></g>';
  items.forEach(function (t, i) {
    var y = 144 + i * 44;
    why += '<g class="li" style="--t:' + (0.9 + i * .45) + 's"><rect x="150" y="' + (y - 22) + '" width="340" height="36" rx="18" fill="rgba(255,255,255,.13)"/>' +
      '<circle cx="466" cy="' + (y - 4) + '" r="12" fill="#00d1d1"/><path d="M460 ' + (y - 4) + 'l4 4 8-8" stroke="#06263a" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text x="444" y="' + (y + 2) + '" text-anchor="start" font-size="17" font-weight="700" font-family="' + F + '" fill="#fff" direction="rtl">' + t + '</text></g>';
  });
  scenes.push({ d: 5600, cap: "אקרטק בונה לכם מערכת CRM שעושה את העבודה בשבילכם", html: why + '</svg>' });
  scenes.push({ d: 4200, cap: "עם אקרטק, כולם עובדים בנחת", html: grid("calm") });


  var end = '<svg viewBox="0 0 640 360" aria-hidden="true"><defs><linearGradient id="sh2" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><clipPath id="lc"><rect x="170" y="110" width="300" height="66" rx="12"/></clipPath></defs>' +
    '<rect width="640" height="360" fill="#f7fafd"/><circle cx="320" cy="170" r="190" fill="#e6f4f6"/>' +
    '<g class="zoomin" style="--t:.1s"><image href="logo.webp" x="170" y="110" width="300" height="65" preserveAspectRatio="xMidYMid meet"/>' +
    '<g clip-path="url(#lc)"><rect class="shine" x="170" y="100" width="70" height="90" fill="url(#sh2)" opacity=".7"/></g></g>' +
    '<g class="li" style="--t:.8s"><text x="320" y="220" text-anchor="middle" font-size="20" font-family="' + H + '" fill="#193f73" direction="rtl">מערכות CRM ומידע בהתאמה אישית · תמיכה טכנית</text></g>' +
    '<g class="zoomin" style="--t:1.3s"><rect x="250" y="242" width="140" height="40" rx="20" fill="#193f73"/><text x="320" y="268" text-anchor="middle" font-size="17" font-weight="700" font-family="' + F + '" fill="#fff">צור קשר</text></g></svg>';
  scenes.push({ d: 4200, cap: "", html: end });

  /* ---------- צלילים (נוצרים בדפדפן, בלי קבצים) ---------- */
  var AC = null, soundOn = false, timers = [];
  function osc(f1, f2, dur, type, vol, at) {
    if (!AC) return; var t0 = AC.currentTime + (at || 0), o = AC.createOscillator(), g = AC.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(f1, t0); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol || .12, t0 + .015); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(AC.destination); o.start(t0); o.stop(t0 + dur + .05);
  }
  function noise(dur, at, vol) {
    if (!AC) return; var t0 = AC.currentTime + (at || 0), len = AC.sampleRate * dur, buf = AC.createBuffer(1, len, AC.sampleRate), d = buf.getChannelData(0);
    for (var k = 0; k < len; k++) d[k] = (Math.random() * 2 - 1) * (1 - k / len);
    var s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain(); s.buffer = buf; f.type = "bandpass";
    f.frequency.setValueAtTime(400, t0); f.frequency.exponentialRampToValueAtTime(3000, t0 + dur); g.gain.value = vol || .25;
    s.connect(f); f.connect(g); g.connect(AC.destination); s.start(t0);
  }
  var SFX = {
    office: function (n) {
      for (var r = 0; r < 3; r++) for (var k = 0; k < 6; k++) osc(k % 2 ? 1180 : 940, 0, .06, "square", .035, .2 + r * 1.3 + k * .07);
      for (var b = 0; b < n; b++) osc(520, 900, .09, "sine", .09, .25 + b * .6);
    },
    grid: function () { for (var k = 0; k < 4; k++) osc(420, 300, .1, "triangle", .07, .2 + k * .12); osc(140, 60, .25, "sine", .3, 1.75); osc(110, 50, .25, "sine", .25, 1.9); },
    why: function () { noise(.6, 0, .18); for (var k = 0; k < 4; k++) { osc(1046, 0, .25, "sine", .08, .9 + k * .45); osc(1568, 0, .25, "sine", .05, .95 + k * .45); } },
    calm: function () { osc(523, 0, .6, "sine", .08, .2); osc(659, 0, .6, "sine", .07, .5); osc(784, 0, .9, "sine", .07, .8); },
    end: function () { [523, 659, 784, 1046].forEach(function (f, k) { osc(f, 0, .7, "triangle", .08, .15 + k * .14); }); }
  };
  function cue(n) {
    if (!soundOn || !AC) return;
    var k = scenes[n].sfx; if (k === "office") SFX.office(5); else if (SFX[k]) SFX[k]();
  }
  scenes.forEach(function (sc, k) { sc.sfx = k < 4 ? "office" : ["grid", "why", "calm", "end"][k - 4]; });

  /* ---------- מנוע ---------- */
  var film = document.getElementById("aktFilm"), stage = document.getElementById("aktStage"), cap = document.getElementById("aktCap"),
      prog = document.getElementById("aktProg"), pp = document.getElementById("aktPP");
  scenes.forEach(function (sc) {
    var el = document.createElement("div"); el.className = "akt-scene"; el.innerHTML = sc.html; el.style.setProperty("--d", sc.d / 1000 + "s");
    stage.appendChild(el); sc.el = el;
    var p = document.createElement("i"); p.innerHTML = "<b></b>"; prog.appendChild(p); sc.bar = p.firstChild;
  });
  var i = -1, paused = false, startT = 0, left = 0, raf = 0;
  function show(n) {
    scenes.forEach(function (sc, k) {
      if (k === n) { var c = sc.el.cloneNode(true); sc.el.parentNode.replaceChild(c, sc.el); sc.el = c; void c.offsetWidth; c.classList.add("on"); }
      else sc.el.classList.remove("on");
      sc.bar.style.width = k < n ? "100%" : "0";
    });
    cue(n);
    cap.classList.remove("on");
    setTimeout(function () { cap.textContent = scenes[n].cap; cap.classList.toggle("on", !!scenes[n].cap); }, 300);
  }
  function tick() {
    var sc = scenes[i], el = performance.now() - startT;
    sc.bar.style.width = Math.min(100, el / sc.d * 100) + "%";
    if (el >= sc.d) { next(); return; }
    raf = requestAnimationFrame(tick);
  }
  function next() { i = (i + 1) % scenes.length; show(i); startT = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); }
  var PLAY = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7z"/></svg>', PAUSE = pp.innerHTML;
  function setPaused(v) {
    paused = v; film.classList.toggle("paused", v);
    pp.setAttribute("aria-label", v ? "הפעלת הסרטון" : "עצירת הסרטון"); pp.innerHTML = v ? PLAY : PAUSE;
    if (v) { cancelAnimationFrame(raf); left = performance.now() - startT; } else { startT = performance.now() - left; raf = requestAnimationFrame(tick); }
  }
  pp.addEventListener("click", function () { setPaused(!paused); });
  var snd = document.getElementById("aktSnd"),
      ON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10v4h4l5 4V6L8 10z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
      OFF = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10v4h4l5 4V6L8 10z" fill="currentColor"/><path d="M17 9l4 6M21 9l-4 6"/></svg>';
  snd.innerHTML = OFF;
  snd.addEventListener("click", function () {
    soundOn = !soundOn;
    if (soundOn && !AC) { var C = window.AudioContext || window.webkitAudioContext; if (C) AC = new C(); }
    if (AC && AC.state === "suspended") AC.resume();
    snd.innerHTML = soundOn ? ON : OFF; snd.setAttribute("aria-pressed", soundOn); snd.setAttribute("aria-label", soundOn ? "השתקת צלילים" : "הפעלת צלילים");
  });
  new MutationObserver(function () { if (document.documentElement.classList.contains("a11y-still") && !paused) setPaused(true); }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  if (document.documentElement.classList.contains("a11y-still") || matchMedia("(prefers-reduced-motion: reduce)").matches) { i = scenes.length - 2; show(i); setPaused(true); } else next();
})();
