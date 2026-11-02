// Lambda שמגיש את אתר אקרטק ומקבל פניות מהטופס.
// כל קבצי האתר נמצאים באותה תיקייה; הכתובת /css/style.css מגישה את style.css וכו'.
import { readFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

const ROOT = process.cwd();
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".webp": "image/webp", ".png": "image/png",
  ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const TEXT = new Set([".html", ".css", ".js", ".svg"]);

// פנייה מהטופס: נשלחת במייל (Amazon SES) ובוואטסאפ (CallMeBot) לבעל האתר בלבד.
// משתני סביבה ב-Lambda:
//   TO_EMAIL, FROM_EMAIL         - כתובת שמקבלת ושולחת (מאומתת ב-SES)
//   WA_PHONE, WA_APIKEY          - מספר וואטסאפ (972...) ומפתח CallMeBot
async function sendEmail(subject, text, replyTo) {
  const TO = process.env.TO_EMAIL, FROM = process.env.FROM_EMAIL;
  if (!TO || !FROM) return false;
  const { SESv2Client, SendEmailCommand } = await import("@aws-sdk/client-sesv2");
  await new SESv2Client({}).send(new SendEmailCommand({
    FromEmailAddress: FROM, Destination: { ToAddresses: [TO] },
    ReplyToAddresses: replyTo ? [replyTo] : undefined,
    Content: { Simple: { Subject: { Data: subject, Charset: "UTF-8" }, Body: { Text: { Data: text, Charset: "UTF-8" } } } }
  }));
  return true;
}

async function sendWhatsApp(text) {
  const phone = process.env.WA_PHONE, key = process.env.WA_APIKEY;
  if (!phone || !key) return false;
  const url = "https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(phone) +
    "&text=" + encodeURIComponent(text) + "&apikey=" + encodeURIComponent(key);
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error("callmebot " + res.status);
  return true;
}

async function contact(event) {
  let d;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString() : event.body;
    d = JSON.parse(raw || "{}");
  } catch { return { statusCode: 400, body: "bad json" }; }
  const c = (v, m) => String(v ?? "").trim().slice(0, m);
  if (c(d.website, 200)) return { statusCode: 200, body: '{"ok":true}' }; // מלכודת ספאם
  const name = c(d.name, 100), phone = c(d.phone, 30), email = c(d.email, 150), message = c(d.message, 3000);
  if (!name || !phone || !message) return { statusCode: 400, body: "missing fields" };

  const text = `פנייה חדשה מהאתר אקרטק\n\nשם: ${name}\nטלפון: ${phone}\nאימייל: ${email || "-"}\n\n${message}`;
  const results = await Promise.allSettled([
    sendEmail(`פנייה מהאתר: ${name}`, text, email.includes("@") ? email : undefined),
    sendWhatsApp(text)
  ]);
  results.forEach((r, i) => { if (r.status === "rejected") console.error(i ? "whatsapp" : "email", r.reason); });
  const sent = results.some(r => r.status === "fulfilled" && r.value === true);
  if (!sent) return { statusCode: 503, body: "not delivered" };
  return { statusCode: 200, headers: { "content-type": "application/json" }, body: '{"ok":true}' };
}

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || "GET";
  const path = event.rawPath || "/";
  if (path === "/api/contact") return method === "POST" ? contact(event) : { statusCode: 405, body: "" };
  if (method !== "GET" && method !== "HEAD") return { statusCode: 405, body: "" };

  let name = basename(path) || "index.html";
  if (!extname(name)) name += ".html";
  const ext = extname(name);
  if (!TYPES[ext]) return { statusCode: 404, body: "" };
  try {
    const buf = await readFile(join(ROOT, name));
    const isText = TEXT.has(ext);
    return { statusCode: 200, isBase64Encoded: !isText,
      headers: { "content-type": TYPES[ext],
                 "cache-control": [".webp", ".png", ".jpg", ".svg", ".ico"].includes(ext) ? "public, max-age=86400" : "public, max-age=300" },
      body: isText ? buf.toString("utf8") : buf.toString("base64") };
  } catch {
    const home = await readFile(join(ROOT, "index.html"), "utf8");
    return { statusCode: 404, headers: { "content-type": TYPES[".html"] }, body: home };
  }
};
