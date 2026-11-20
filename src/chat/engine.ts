// Free, in-browser knowledge assistant: the "retrieval" half of RAG.
// Builds a BM25 index over the site's own content (src/data/site.ts) plus the tech
// knowledge bank, with synonyms, light stemming and typo tolerance. No API, no cost.
import {
  SITE_URL, about, certifications, coreStack, education, experience, faqs, languages, profile, projects,
  services, stats, toolkit,
} from "../data/site";
import { techKnowledge } from "./techKnowledge";
import { guides, guideSlug, topicLabels, type Topic } from "./guides";

type Doc = { id: string; ask: string; q: string; a: string; next?: string[] };
export type LocalAnswer = { text: string; confident: boolean; suggestions: string[]; id?: string };

const url = (path: string) => `${SITE_URL}${path}`;
const plain = (s: string) => s.replace(/\*\*/g, "");

// Who's visiting? Each persona gets a tailored answer and next steps.
export const PERSONAS = [
  {
    id: "recruiter", label: "I'm hiring / a recruiter",
    q: "recruiter hiring manager hr i am hiring i'm hiring talent acquisition employer candidate looking for developer",
    a: `Great — here's the quick version:\n• **Role:** ${profile.title} in ${profile.location}, 2+ years across full-stack development, cloud and enterprise IT\n• **Open to:** ${profile.openTo}\n• **Highlights:** built WAQTI (a production workforce platform) and a 200+ route web platform; runs Microsoft 365 for 50+ users at 99%+ uptime\n• **CV:** ${url(profile.cv)}\n• **Contact:** ${profile.email} · ${profile.phone}`,
    next: ["What is his work experience?", "What is his tech stack?", "What has Reejan built?"],
  },
  {
    id: "client", label: "I need a website or app",
    q: "need a website need an app client build my website build my app hire developer freelance project quote my business website",
    a: `Happy to help you plan it. Reejan builds business websites, web apps and internal systems end to end — design, development, database, hosting, SEO and support.\n• Services: ${url("/services")}\n• Start a conversation: ${profile.email}\n\nUseful first reads:`,
    next: ["What do I need before building a website?", "What do I need before building a web app?", "Best tech stack for a business website?"],
  },
  {
    id: "business", label: "I run a small or mid-size business",
    q: "run a business business owner small business mid size company sme smb our company need it support set up our office managing director operations manager",
    a: `Reejan can be your one technology partner — IT infrastructure, Microsoft 365, website, CRM, ERP, accounting system integration, automation and ongoing support, planned and set up in phases.\n• See what's included: ${url("/services/complete-business-setup")}\n• Talk it through: ${profile.email}`,
    next: ["Can Reejan set up everything for my business?", "What is the process of hiring Reejan for a project?", "What can be automated in a small business?"],
  },
  {
    id: "founder", label: "I'm starting a business",
    q: "starting a business startup founder new company entrepreneur small business owner launch company",
    a: "Exciting! Reejan helps businesses set up their tech, automate operations and build their first products — from Microsoft 365, security and IT setup to custom apps. Here's where most founders start:",
    next: ["What tech does a startup company need?", "How can a business automate its processes?", "Fastest way to build an MVP?"],
  },
  {
    id: "developer", label: "I'm a developer / student",
    q: "developer student learning engineer programmer i am a developer i'm a student learn coding fellow developer",
    a: "Welcome! I can explain technologies, compare stacks and share how Reejan approaches architecture, scaling and security. Some good starting points:",
    next: ["Which database should I use?", "How do I scale a web app?", "Monolith or microservices?"],
  },
  {
    id: "exploring", label: "Just exploring",
    q: "just exploring browsing looking around just looking curious",
    a: `Welcome to Reejan's portfolio! He's a ${profile.title} in Dubai who builds production business apps, workforce platforms and cloud systems. Pick anything below — or ask me a question.`,
    next: ["What has Reejan built?", "What services does he offer?", "Who built this chatbot?"],
  },
];

// ---------------- knowledge documents ----------------
function buildDocs(): Doc[] {
  const docs: Doc[] = [];
  const add = (id: string, ask: string, q: string, a: string, next?: string[]) => docs.push({ id, ask, q, a, next });
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
    "open to work available availability job jobs role roles hire hiring opportunity opportunities looking freelance position vacancy",
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
      `${e.role} ${e.company} ${e.location} ${e.current ? "current job now currently present where does he work" : "previous past former before"}`,
      `**${e.role}** — ${e.company}, ${e.location} (${e.period})\n${e.points.slice(0, 4).map((p) => `• ${plain(p)}`).join("\n")}\n\nMore: ${url("/experience")}`);
  });
  add("projects", "What has Reejan built?",
    "projects project portfolio built build work case studies case study made developed apps applications examples",
    `Reejan's main projects:\n${projects.map((p) => `• ${p.name} — ${p.short}`).join("\n")}\n\nCase studies: ${url("/projects")}`);
  projects.forEach((p) => {
    add(`p-${p.slug}`, `Tell me about ${p.name.split(" — ")[0]}`,
      `${p.name} ${p.slug.replace(/-/g, " ")} ${p.category} ${p.keywords.join(" ")} ${p.stack.join(" ")}`,
      `**${p.name}** (${p.status})\n${p.short}${p.result ? `\nResult: ${p.result}.` : ""}${p.stack.length ? `
Built with: ${p.stack.join(", ")}.` : ""}\n\nCase study: ${url(`/projects/${p.slug}`)}`);
  });
  add("services", "What services does he offer?",
    "services service offer help can he do what does he do freelance consulting work with",
    `Reejan can help with:\n${services.map((s) => `• ${s.title}`).join("\n")}\n\nDetails: ${url("/services")}`);
  services.forEach((s) => {
    add(`s-${s.id}`, `Can he help with ${s.title.toLowerCase()}?`,
      `${s.title} ${s.searchTerms.join(" ")} ${s.tools.join(" ")}`,
      `**${s.title}** — ${s.text}\n${s.points.map((pt) => `• ${pt}`).join("\n")}\n\nMore: ${url(`/services/${s.id}`)}`);
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
      "\n• 4 USF Group websites with 300+ prerendered pages\n• 40% faster IT setup for Dubai SMBs");
  add("site", "How was this website built?",
    "this website site web page how was this website made portfolio site technology",
    "This site is built with React, TypeScript and Vite, prerendered to static HTML for speed and SEO, and hosted on Vercel. This assistant searches a knowledge base in your browser — free and instant.");
  faqs.forEach((f, i) => add(`faq-${i}`, f.q, f.q, f.a));

  // About this assistant
  add("bot", "Who built this chatbot?",
    "who made created developed designed you this chatbot chat bot assistant devv creator built by",
    "I'm **Devv**, the assistant on this site — designed and built by Reejan R Gopan. I answer from a knowledge base about Reejan and the technologies he works with, searching it right in your browser so answers are instant and free. It's the retrieval idea behind RAG.",
    ["How does this chatbot work?", "Tech stack for an AI app or chatbot?", "What has Reejan built?"]);
  add("bot-how", "How does this chatbot work?",
    "how does this chatbot work how do you work rag knowledge base search engine bm25 technology behind chatbot",
    "Reejan built me as a lightweight RAG system:\n• Everything on this site plus 150+ technology, planning and startup guides form my knowledge base\n• Your question is matched against it by a search engine (BM25) that understands synonyms and typos\n• The best match is shown with links and follow-up suggestions — all inside your browser, with no server cost\n• If I'm not sure, I say so instead of guessing",
    ["What knowledge does Devv have?", "Tech stack for an AI app or chatbot?", "What is RAG (Retrieval-Augmented Generation)?"]);
  add("bot-knowledge", "What knowledge does Devv have?",
    "devv knowledge full knowledge topics coverage what can devv answer know details knowledge base",
    `Devv's knowledge covers:\n• Reejan's profile, experience, education, certifications and availability\n• Published projects, outcomes, services and contact routes\n• Engineering guides on architecture, security, scale, data, reliability, testing and delivery\n• Technology explainers and practical planning guides for websites, applications, startups and business automation\n\nExplore the complete knowledge map and trust model: ${url("/devv")}`,
    ["How does this chatbot work?", "What has Reejan built?", "What is his tech stack?"]);
  PERSONAS.forEach((p) => add(`persona-${p.id}`, p.label, p.q, p.a, p.next));

  // Practical guides: stacks, scaling, planning, startups, security
  guides.forEach((g, i) => add(`g-${g.topic}-${i}`, g.ask, `${g.ask} ${g.k}`, `${g.a}\n\nFull guide: ${url(`/guides/${guideSlug(g.ask)}`)}`, g.next));

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
  tel: "phone", portfolio: "projects", degree: "education", uni: "university", cert: "certification",
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
    if (!raw || raw.length < 2 || STOP.has(raw)) continue;
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
const SOFT = new Set(["experience", "know", "knowledge", "familiar", "use", "us", "using", "skill", "expertise", "good", "expert", "able", "doe"].map(stem));
const SOFT_PERSONAL = new Set(["work", "build", "built", "app", "setup"].map(stem));
const PROFILE = /^(about|names|contact|cv|location|availability|terms|experience|xp-\d+|projects|services|skills|education|spoken|impact)$/;

export function search(query: string, limit = 5): { doc: Doc; score: number; coverage: number }[] {
  const ix = index();
  // "his/him/he/reejan" signals a question about him rather than a technology definition
  const personal = /\b(his|him|he|he's|reejan|gopan|your)\b/i.test(query);
  // "how / best / which / should / vs" questions are asking for advice, which the guides give
  const advice = /\b(how|best|which|should|choose|vs|versus|need|before|compare)\b/i.test(query);
  let q = [...new Set(tokens(query, true).map((t) => correct(t, ix)))];
  const specific = q.filter((t) => !SOFT.has(t) && !(personal && SOFT_PERSONAL.has(t)));
  if (specific.length) q = specific;
  if (!q.length) return [];
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
    if (personal && PROFILE.test(doc.id)) score *= 1.6;
    // General guides answer "how should I..." questions, not questions about Reejan himself.
    // "For businesses" guides describe what Reejan offers, so they stay relevant to personal questions.
    if (doc.id.startsWith("g-business")) score *= 1.0;
    else if (doc.id.startsWith("g-")) score *= personal ? 0.35 : advice ? 1.2 : 0.85;
    // Visitor-type answers are chosen from buttons; typed questions should prefer specific answers.
    if (doc.id.startsWith("persona-")) score *= 0.7;
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
    "I'm **Devv**, the assistant Reejan designed and built for this site. I answer from a knowledge base about him and the technologies he works with — instantly, right in your browser."],
  [/\b(who|which) (made|built|created|developed|designed|programmed) you\b|\bwho is your (creator|developer|maker)\b/i,
    "Reejan R Gopan designed and built me — a lightweight RAG assistant that searches this site's knowledge base right in your browser."],
  [/^(help|what can (i|you) (ask|do))\b/i, "Try asking about his projects (like WAQTI), his experience, his skills, whether he's open to roles, or what a technology like Supabase or RAG is."],
];

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
let ASK_MAP: Map<string, Doc> | null = null;
function byAsk(): Map<string, Doc> {
  if (!ASK_MAP) {
    ASK_MAP = new Map();
    for (const d of index().docs) if (!ASK_MAP.has(key(d.ask))) ASK_MAP.set(key(d.ask), d);
  }
  return ASK_MAP;
}

const DEFAULT_SUGGESTIONS = ["What has Reejan built?", "Is he open to new roles?", "What is his tech stack?"];

export function answerLocally(query: string): LocalAnswer {
  const q = query.trim();
  for (const [re, reply] of SMALLTALK) {
    if (re.test(q) && q.split(/\s+/).length <= 6) return { text: reply, confident: true, suggestions: DEFAULT_SUGGESTIONS };
  }
  if (!tokens(q).length && /\b(reejan|gopan|him|he|yourself)\b/i.test(q)) {
    const doc = index().docs.find((d) => d.id === "about")!;
    return { id: doc.id, text: doc.a, confident: true, suggestions: DEFAULT_SUGGESTIONS };
  }
  const exact = byAsk().get(key(q));
  if (exact) {
    const rel = search(q, 4).map((h) => h.doc.ask).filter((a) => a !== exact.ask).slice(0, 3);
    return { id: exact.id, text: exact.a, confident: true, suggestions: exact.next ?? (rel.length ? rel : DEFAULT_SUGGESTIONS) };
  }
  const hits = search(q, 6);
  const top = hits[0];
  const suggestions = hits.slice(1).map((h) => h.doc.ask).filter((s, i, arr) => arr.indexOf(s) === i).slice(0, 3);

  // Confident only when every key word matched, or at least half matched strongly.
  if (top && top.score >= 2.2 && (top.coverage === 1 || (top.coverage >= 0.5 && top.score >= 6))) {
    return { id: top.doc.id, text: top.doc.a, confident: true, suggestions: top.doc.next ?? (suggestions.length ? suggestions : DEFAULT_SUGGESTIONS) };
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

// ---------------- topic menu ----------------
export type MenuTopic = { id: string; label: string; asks: string[] };
export function topics(): MenuTopic[] {
  const byTopic = (t: Topic) => guides.filter((g) => g.topic === t).map((g) => g.ask);
  return [
    { id: "devv", label: "Devv AI", asks: ["What knowledge does Devv have?", "How does this chatbot work?", "Who built this chatbot?", "What is RAG?"] },
    { id: "about", label: "About Reejan", asks: ["Who is Reejan?", "Is he open to new roles?", "What is his work experience?", "What certifications does he have?", "How can I contact Reejan?", "Can I download his CV?"] },
    { id: "work", label: "Projects", asks: ["What has Reejan built?", ...projects.map((p) => `Tell me about ${p.name.split(" — ")[0]}`)] },
    { id: "skills", label: "Skills", asks: ["What is his tech stack?", "Does he know AWS?", "What is his experience with Supabase?", "Does he know Microsoft 365?", "Does he work with AI?"] },
    ...(Object.keys(topicLabels) as Topic[]).map((t) => ({ id: t, label: topicLabels[t], asks: byTopic(t) })),
    { id: "tech", label: "Tech explained", asks: ["What is React?", "What is Supabase?", "What is Row Level Security?", "What is RAG?", "What is Docker?", "What is CI/CD?", "What is Entra ID?", "What is Core Web Vitals?"] },
  ];
}
