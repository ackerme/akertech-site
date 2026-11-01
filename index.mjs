// Lambda שמגיש את אתר אקרטק ומקבל פניות מהטופס
import { readFile } from "node:fs/promises";
import { join, normalize, extname } from "node:path";

const ROOT = join(process.cwd(), "site");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".webp": "image/webp", ".png": "image/png",
  ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const TEXT = new Set([".html", ".css", ".js", ".svg"]);

async function contact(event) {
  const TO = process.env.TO_EMAIL, FROM = process.env.FROM_EMAIL;
  if (!TO || !FROM) return { statusCode: 503, body: "form not configured" };
  let d;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body || "", "base64").toString() : event.body;
    d = JSON.parse(raw || "{}");
  } catch { return { statusCode: 400, body: "bad json" }; }
  const c = (v, m) => String(v ?? "").trim().slice(0, m);
  const name = c(d.name, 100), phone = c(d.phone, 30), email = c(d.email, 150), message = c(d.message, 3000);
  if (!name || !phone || !message) return { statusCode: 400, body: "missing fields" };
  const { SESv2Client, SendEmailCommand } = await import("@aws-sdk/client-sesv2");
  await new SESv2Client({}).send(new SendEmailCommand({
    FromEmailAddress: FROM, Destination: { ToAddresses: [TO] },
    ReplyToAddresses: email.includes("@") ? [email] : undefined,
    Content: { Simple: { Subject: { Data: `פנייה מהאתר: ${name}`, Charset: "UTF-8" },
      Body: { Text: { Data: `שם: ${name}\nטלפון: ${phone}\nאימייל: ${email}\n\n${message}`, Charset: "UTF-8" } } } }
  }));
  return { statusCode: 200, headers: { "content-type": "application/json" }, body: '{"ok":true}' };
}

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || "GET";
  let path = event.rawPath || "/";
  if (path === "/api/contact") return method === "POST" ? contact(event) : { statusCode: 405, body: "" };
  if (method !== "GET" && method !== "HEAD") return { statusCode: 405, body: "" };
  if (path.endsWith("/")) path += "index.html";
  if (!extname(path)) path += ".html";
  const file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT)) return { statusCode: 403, body: "" };
  try {
    const ext = extname(file), buf = await readFile(file);
    const isText = TEXT.has(ext);
    return { statusCode: 200, isBase64Encoded: !isText,
      headers: { "content-type": TYPES[ext] || "application/octet-stream",
                 "cache-control": ext === ".html" ? "public, max-age=300" : "public, max-age=86400" },
      body: isText ? buf.toString("utf8") : buf.toString("base64") };
  } catch {
    const nf = await readFile(join(ROOT, "index.html"), "utf8");
    return { statusCode: 404, headers: { "content-type": TYPES[".html"] }, body: nf };
  }
};
