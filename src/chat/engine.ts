// Free, in-browser knowledge assistant: the "retrieval" half of RAG.
// Builds a BM25 index over the site's own content (src/data/site.ts) plus the tech
// knowledge bank, with synonyms, light stemming and typo tolerance. No API, no cost.
import {
  SITE_URL, about, certifications, coreStack, education, experience, faqs, languages, profile, projects,
  services, stats, toolkit,
} from "../data/site";
import { techKnowledge } from "./techKnowledge";

type Doc = { id: string; ask: string; q: string; a: string };
export type LocalAnswer = { text: string; confident: boolean; suggestions: string[] };

const url = (path: string) => `${SITE_URL}${path}`;
const plain = (s: string) => s.replace(/\*\*/g, "");

// ---------------- knowledge documents ----------------
function buildDocs(): Doc[] {
  const docs: Doc[] = [];
  const add = (id: string, ask: string, q: string, a: string) => docs.push({ id, ask, q, a });
  const current = experience[0];

  add("about", "Who is Reejan?",
    "who is reejan tell me about reejan about him introduce introduction summary profile background overview bio reejan gopan reejan r gopan person engineer",
    `${about.intro}\n\n${profile.summary}\n\nMore: ${url("/about")}`);
  add("names", "Are Reejan Gopan and Reejan R Gopan the same person?",
    "same person name names spelling also known reejan gopan reejan r gopan alias",
    faqs.find((f) => f.q.startsWith("Are Reejan Gopan"))?.a ?? `Yes — ${profile.name} also goes by ${profile.alternateNames.join(", ")}.`);
  add("contact", "How can I contact Reejan?",
    "contact email email address mail phone call reach number whatsapp message linkedin get in touch talk connect",
    `You can reach Reejan at:\n• Email: ${profile.email}\n• Phone: ${profile.phone}\n• LinkedIn: ${profile.linkedin}\n\nOr use the contact page: ${url("/contact")}`);
  add("cv", "Can I download his CV?",
    "cv resume download pdf curriculum vitae",
    `Yes — download Reejan's CV (PDF): ${url(profile.cv)}`);
  add("location", "Where is Reejan based?",
    "where based location live lives city country dubai uae united arab emirates timezone",
    `Reejan is based in ${profile.location} (Gulf Standard Time, UTC+4).`);
  add("availability", "Is he open to new roles?",
    "open to work available availability job jobs role roles hire hiring opportunity opportunities looking recruit recruiter freelance position vacancy",
    `Yes — Reejan is open to ${profile.openTo} in Dubai and the UAE. The quickest way to reach him is ${profile.email}, or see ${url("/contact")}.`);
  add("terms", "What about salary, rates or notice period?",
    "salary salaries expectation expectations expected compensation package pay rate rates hourly daily price pricing cost quote budget notice period visa relocation relocate contract",
    `Reejan prefers to discuss compensation, rates, notice period and visa details directly. Email ${profile.email} or use ${url("/contact")} — he usually replies quickly.`);
  add("experience", "What is his work experience?",
    "experience work history career jobs employment employer companies how many years worked",
    `Reejan has 2+ years across software development, cloud infrastructure and enterprise IT:\n${experience
      .map((e) => `• ${e.role} — ${e.company}, ${e.location} (${e.period})`)
      .join("\n")}\n\nDetails: ${url("/experience")}`);
  experience.forEach((e, i) => {
    add(`xp-${i}`, `What did he do at ${e.company.split(" (")[0]}?`,
      `${e.role} ${e.company} ${e.location} ${e.current ? "current job now currently present where does he work today" : "previous past former before"}`,
      `**${e.role}** — ${e.company}, ${e.location} (${e.period})\n${e.points.slice(0, 4).map((p) => `• ${plain(p)}`).join("\n")}\n\nMore: ${url("/experience")}`);
  });
  add("projects", "What has Reejan built?",
    "projects project portfolio built build work case studies case study made developed apps applications examples",
    `Reejan's main projects:\n${projects.map((p) => `• ${p.name} — ${p.short}`).join("\n")}\n\nCase studies: ${url("/projects")}`);
  projects.forEach((p) => {
    add(`p-${p.slug}`, `Tell me about ${p.name.split(" — ")[0]}`,
      `${p.name} ${p.slug.replace(/-/g, " ")} ${p.category} ${p.keywords.join(" ")} ${p.stack.join(" ")}`,
      `**${p.name}** (${p.status})\n${p.short}${p.result ? `\nResult: ${p.result}.` : ""}\nBuilt with: ${p.stack.join(", ")}.\n\nCase study: ${url(`/projects/${p.slug}`)}`);
  });
  add("services", "What services does he offer?",
    "services service offer help can he do what does he do freelance consulting work with",
    `Reejan can help with:\n${services.map((s) => `• ${s.title}`).join("\n")}\n\nDetails: ${url("/services")}`);
  services.forEach((s) => {
    add(`s-${s.id}`, `Can he help with ${s.title.toLowerCase()}?`,
      `${s.title} ${s.searchTerms.join(" ")} ${s.tools.join(" ")}`,
      `**${s.title}** — ${s.text}\n${s.points.map((pt) => `• ${pt}`).join("\n")}\n\nMore: ${url(`/services#${s.id}`)}`);
  });
  add("skills", "What is his tech stack?",
    "skills skill tech stack technologies technology tools know knows frameworks expertise strengths good at",
    `Core stack: ${coreStack.join(", ")}.\n\nFull toolkit by area: ${url("/skills")}`);
  toolkit.forEach((t) => {
    add(`tk-${t.label}`, `Which ${t.label.toLowerCase()} does he know?`,
      `${t.label} ${t.label} ${t.label === "Languages" ? "programming languages coding" : ""} ${t.value}`,
      `**${t.label}:** ${t.value}.`);
  });
  add("education", "What is his education?",
    "education degree university college bca study studied qualification graduate kerala",
    `${education.degree} — ${education.school}, ${education.location} (${education.period}).`);
  add("certifications", "What certifications does he have?",
    "certifications certification certified certificate certificates ms-900 ms900 google ads ga4 skillshop",
    certifications.map((c) => `• ${c.name} — ${c.issuer}`).join("\n"));
  add("spoken", "Which languages does he speak?",
    "speak speaks spoken language english malayalam communication",
    languages.map((l) => `• ${l.name} (${l.level})`).join("\n"));
  add("impact", "What results has he delivered?",
    "results impact achievements numbers metrics uptime users saved hours accomplishments",
    stats.map((s) => `• ${s.prefix ?? ""}${s.value}${s.suffix} ${s.label.toLowerCase()}`).join("\n") +
      "\n• 200+ prerendered routes on the USF Demolition platform\n• 40% faster IT setup for Dubai SMBs");
  add("site", "How was this website built?",
    "this website site web page how was this site made chatbot assistant",
    "This site is built with React, TypeScript and Vite, prerendered to static HTML for speed and SEO, and hosted on Vercel. This assistant searches a knowledge base in your browser — free and instant.");
  faqs.forEach((f, i) => add(`faq-${i}`, f.q, f.q, f.a));

  // Technology knowledge bank
  techKnowledge.forEach((t) => {
    add(`t-${t.t}`, `What is ${t.t}?`, `${t.t} ${t.k}`,
      `**${t.t}** — ${t.a}${t.r ? `\n\nHow Reejan uses it: ${t.r}` : ""}${t.link ? `\n\nSee: ${url(t.link)}` : ""}`);
  });

  // Any toolkit skill without a dedicated entry still gets a confident "yes".
  const covered = new Set(tokens(techKnowledge.map((t) => `${t.t} ${t.k}`).join(" ")));
  toolkit.forEach((cat) => {
    cat.value.replace(/\([^)]*\)/g, "").split(/,\s*/).forEach((raw) => {
      const skill = raw.trim();
      const st = tokens(skill);
      if (!skill || !st.length || st.every((t) => covered.has(t))) return;
      add(`k-${skill}`, `Does he know ${skill}?`, skill, `Yes — ${skill} is part of Reejan's ${cat.label.toLowerCase()} skills.`);
    });
  });
  return docs;
}

// ---------------- text processing ----------------
const STOP = new Set(
  ("a an the is are was were be been am do does did doing has have had having i me my you your he him his she her it its " +
    "we our they them their this that these those of in on at to for with from by about as into over under and or but if then " +
    "so than too very can could would should will shall may might must what which who whom whose when where why how " +
    "tell know please pls plz hi any some all more most much many just also there here get got give show explain describe " +
    "reejan reejans gopan r mr sir").split(" "),
);
const SYN: Record<string, string> = {
  postgres: "postgresql", pg: "postgresql", js: "javascript", ts: "typescript", py: "python", m365: "microsoft",
  o365: "microsoft", office365: "microsoft", aad: "entra", resume: "cv", hire: "hiring", recruit: "hiring",
  job: "role", jobs: "roles", attendance: "workforce", k8s: "kubernetes", reactjs: "react",
  nodejs: "node", nextjs: "next", gpt: "llm", chatgpt: "llm", ai: "llm", mail: "email", whatsapp: "phone",
  mobile: "phone", tel: "phone", portfolio: "projects", degree: "education", uni: "university", cert: "certification",
  certs: "certifications", qualification: "education", vacancy: "role", company: "employer",
};
const norm = (s: string) =>
  s.toLowerCase()
    .replace(/c#/g, " csharp ").replace(/c\+\+/g, " cplusplus ").replace(/\.net\b/g, " dotnet ")
    .replace(/node\.js/g, " node ").replace(/next\.js/g, " next ").replace(/ci\/cd/g, " cicd ")
    .replace(/tcp\/ip/g, " tcpip ").replace(/asp\.net/g, " aspnet ").replace(/ms-900/g, " ms900 ");
const stem = (w: string) =>
  w.length > 5 && w.endsWith("ing") ? w.slice(0, -3)
  : w.length > 4 && w.endsWith("ies") ? `${w.slice(0, -3)}y`
  : w.length > 4 && /(ch|sh|x|z|ss)es$/.test(w) ? w.slice(0, -2)
  : w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1)
  : w.length > 4 && w.endsWith("ed") ? w.slice(0, -2)
  : w;
function tokens(s: string, query = false): string[] {
  const out: string[] = [];
  for (const raw of norm(s).split(/[^a-z0-9]+/)) {
    if (!raw || STOP.has(raw)) continue;
    out.push(stem(raw));
    if (query && SYN[raw]) out.push(stem(SYN[raw])); // expand: keep the word and add its synonym
  }
  return out;
}
function lev(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

// ---------------- BM25 index ----------------
type Index = { docs: Doc[]; tf: Map<string, number>[]; len: number[]; avg: number; df: Map<string, number>; vocab: string[] };
let INDEX: Index | null = null;
function index(): Index {
  if (INDEX) return INDEX;
  const docs = buildDocs();
  const tf: Map<string, number>[] = [];
  const len: number[] = [];
  const df = new Map<string, number>();
  for (const d of docs) {
    // keywords count 3x, the answer text 1x
    const toks = [...tokens(d.q), ...tokens(d.q), ...tokens(d.q), ...tokens(plain(d.a))];
    const m = new Map<string, number>();
    toks.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1));
    m.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1));
    tf.push(m);
    len.push(toks.length);
  }
  const avg = len.reduce((a, b) => a + b, 0) / len.length;
  INDEX = { docs, tf, len, avg, df, vocab: [...df.keys()] };
  return INDEX;
}

function correct(tok: string, ix: Index): string {
  if (ix.df.has(tok) || tok.length < 5) return tok;
  const max = tok.length >= 7 ? 2 : 1;
  let best = tok;
  let bestD = max + 1;
  for (const v of ix.vocab) {
    if (Math.abs(v.length - tok.length) > max) continue;
    const d = lev(tok, v, max);
    if (d < bestD) {
      bestD = d;
      best = v;
    }
  }
  return best;
}

// Generic words that only matter when nothing more specific was asked.
const SOFT = new Set(["experience", "know", "knowledge", "familiar", "use", "us", "using", "work", "skill", "expertise", "good", "expert", "able", "build", "built", "app", "setup", "doe"].map(stem));
const NOT_PROFILE = /^(t-|k-|tk-|p-|s-|faq-)/; // technology, skill, project and service entries

export function search(query: string, limit = 5): { doc: Doc; score: number; coverage: number }[] {
  const ix = index();
  let q = [...new Set(tokens(query, true).map((t) => correct(t, ix)))];
  const specific = q.filter((t) => !SOFT.has(t));
  if (specific.length) q = specific;
  if (!q.length) return [];
  // "his/him/he/reejan" signals a question about him rather than a technology definition
  const personal = /\b(his|him|he|he's|reejan|gopan|your)\b/i.test(query);
  const N = ix.docs.length;
  const k1 = 1.2;
  const b = 0.75;
  const results = ix.docs.map((doc, i) => {
    let score = 0;
    let hit = 0;
    for (const t of q) {
      const f = ix.tf[i].get(t);
      if (!f) continue;
      hit++;
      const n = ix.df.get(t) ?? 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * ix.len[i]) / ix.avg)));
    }
    if (personal && !NOT_PROFILE.test(doc.id)) score *= 1.6;
    return { doc, score, coverage: hit / q.length };
  });
  return results.filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
}

// ---------------- conversation layer ----------------
const SMALLTALK: [RegExp, string][] = [
  [/^(hi|hello|hey|hai|hola|salam|assalamu|good (morning|afternoon|evening)|yo)\b/i,
    "Hi! Ask me anything about Reejan — his projects, experience, skills, availability — or about the technologies he works with."],
  [/\b(thank|thanks|thx|cheers|great|awesome|nice|cool|perfect)\b/i, "You're welcome! Anything else you'd like to know about Reejan or his work?"],
  [/^(bye|goodbye|see you|cya)\b/i, `Thanks for visiting! You can always reach Reejan at ${profile.email}.`],
  [/\b(who|what) are you\b|\bare you (a )?(bot|ai|human|real)\b/i,
    "I'm the assistant on Reejan's portfolio. I answer from a knowledge base about him and the technologies he works with — instantly, right in your browser."],
  [/^(help|what can (i|you) (ask|do))\b/i, "Try asking about his projects (like WAQTI), his experience, his skills, whether he's open to roles, or what a technology like Supabase or RAG is."],
];

const DEFAULT_SUGGESTIONS = ["What has Reejan built?", "Is he open to new roles?", "What is his tech stack?"];

export function answerLocally(query: string): LocalAnswer {
  const q = query.trim();
  for (const [re, reply] of SMALLTALK) {
    if (re.test(q) && q.split(/\s+/).length <= 6) return { text: reply, confident: true, suggestions: DEFAULT_SUGGESTIONS };
  }
  if (!tokens(q).length && /\b(reejan|gopan|him|he|yourself)\b/i.test(q)) {
    const doc = index().docs.find((d) => d.id === "about")!;
    return { text: doc.a, confident: true, suggestions: DEFAULT_SUGGESTIONS };
  }
  const hits = search(q, 6);
  const top = hits[0];
  const suggestions = hits.slice(1).map((h) => h.doc.ask).filter((s, i, arr) => arr.indexOf(s) === i).slice(0, 3);

  // Confident only when every key word matched, or at least half matched strongly.
  if (top && top.score >= 2.2 && (top.coverage === 1 || (top.coverage >= 0.5 && top.score >= 6))) {
    return { text: top.doc.a, confident: true, suggestions: suggestions.length ? suggestions : DEFAULT_SUGGESTIONS };
  }
  const near = hits.slice(0, 3).map((h) => h.doc.ask);
  return {
    text: near.length
      ? "I'm not certain I have that in my knowledge base. Did you mean one of these?"
      : `I don't have that in my knowledge base yet. Try asking about his projects, experience or skills — or email Reejan at ${profile.email}.`,
    confident: false,
    suggestions: near.length ? near : DEFAULT_SUGGESTIONS,
  };
}
