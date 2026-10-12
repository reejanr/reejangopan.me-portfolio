// On-page SEO check for every prerendered page. Run after "npm run build": node scripts/seo-audit.mjs
import fs from "node:fs";
import { pathToFileURL } from "node:url";
const { routes } = await import(pathToFileURL(process.cwd() + "/dist/server/entry-server.js").href);
const known = new Set(routes);
const titles = new Map(), descs = new Map();
let issues = 0, minWords = 1e9, minPage = "";
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
for (const r of routes) {
  const f = r === "/" ? "dist/index.html" : `dist${r}.html`;
  const h = fs.readFileSync(f, "utf8");
  const title = decode((h.match(/<title[^>]*>([^<]*)/) || [])[1] || "");
  const desc = decode((h.match(/name="description" content="([^"]*)/) || [])[1] || "");
  const canon = (h.match(/rel="canonical" href="([^"]*)/) || [])[1];
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  let ld = 0; for (const m of h.matchAll(/application\/ld\+json">(.*?)<\/script>/gs)) { JSON.parse(m[1]); ld++; }
  const links = [...h.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]).filter((x) => !x.startsWith("/assets") && !/\.(png|jpg|ico|pdf|webmanifest|txt|xml)$/.test(x));
  const broken = [...new Set(links.filter((x) => !known.has(x)))];
  const body = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<head[\s\S]*?<\/head>/g, "").replace(/<[^>]+>/g, " ");
  const words = body.split(/\s+/).filter(Boolean).length;
  if (words < minWords) { minWords = words; minPage = r; }
  const p = [];
  if (title.length > 65 || title.length < 20) p.push(`title ${title.length}`);
  if (desc.length > 160 || desc.length < 70) p.push(`desc ${desc.length}`);
  if (h1 !== 1) p.push(`h1=${h1}`);
  if (canon !== `https://reejangopan.me${r === "/" ? "/" : r}`) p.push(`canonical ${canon}`);
  if (!ld) p.push("no json-ld");
  if (broken.length) p.push(`broken ${broken.join(",")}`);
  if (titles.has(title)) p.push(`dup title with ${titles.get(title)}`); titles.set(title, r);
  if (descs.has(desc)) p.push(`dup desc with ${descs.get(desc)}`); descs.set(desc, r);
  if (p.length) { issues += p.length; console.log("FIX", r, "|", p.join("; "), "|", title); }
}
const sm = fs.readFileSync("dist/sitemap.xml", "utf8");
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace("https://reejangopan.me", "") || "/");
const missing = routes.filter((r) => !smUrls.includes(r === "/" ? "/" : r));
console.log(`pages ${routes.length} | sitemap ${smUrls.length} (missing ${missing.length}) | issues ${issues} | thinnest page ${minPage} (${minWords} words)`);
