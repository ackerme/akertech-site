(function () {
  var S = window.SITE || {};
  function waLink(t) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(t); }

  // כפתור וואטסאפ צף ושנת זכויות יוצרים (בכל העמודים)
  var wa = document.getElementById("wa");
  if (wa) wa.href = waLink("שלום, אשמח לשמוע על השירותים של אקרטק");
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // טופס יצירת קשר (רק בעמוד contact.html)
  var f = document.getElementById("f"), msg = document.getElementById("msg");
  if (!f) return;

  // מילוי הודעה מראש כשמגיעים מחבילת תמיכה (contact.html?pkg=...)
  var pkg = new URLSearchParams(location.search).get("pkg");
  if (pkg) f.message.value = "מעוניין/ת בבירור לגבי חבילת התמיכה: " + pkg;

  f.addEventListener("submit", async function (e) {
    e.preventDefault();
    var d = { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };
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
