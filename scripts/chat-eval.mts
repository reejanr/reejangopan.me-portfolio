// Regression check for the free in-browser chat assistant.
// Run: npx tsx scripts/chat-eval.mts   (every case must pass)
import { pathToFileURL } from "node:url";
const { answerLocally, search, topics, PERSONAS } = await import(pathToFileURL(process.cwd() + "/src/chat/engine.ts").href);
const { guides } = await import(pathToFileURL(process.cwd() + "/src/chat/guides.ts").href);
const cases: [string, string][] = [
  ["who is reejan", "about"], ["Tell me about Reejan Gopan", "about"], ["is reejan gopan same as reejan r gopan", "faq-1|names"],
  ["how can i contact him", "faq-6|contact"], ["what's his email", "contact"], ["phone number?", "contact"], ["download resume", "cv"],
  ["where is he based", "location"], ["is he available for a job", "availability"], ["are you hiring? is he open to work", "availability"],
  ["work experience", "experience"], ["how many years experience", "experience"], ["where does he work now", "xp-0"],
  ["what did he do at TCS", "xp-2"], ["chimera group", "xp-1"], ["what has he built", "projects|faq-3"], ["tell me about waqti", "p-waqti"],
  ["attendance app", "p-waqti|t-Workforce"], ["usf demolition website", "p-usf"], ["usfgrand website", "p-usf"], ["rental.usfme.com", "p-usf|faq-3"], ["what is GEO", "t-GEO"], ["custom crm", "p-custom-erp|t-CRM"], ["erp and crm for my company", "p-custom-erp|t-ERP|t-CRM|g-"], ["trading bot xauusd", "p-xauusd"], ["ERP", "t-ERP|g-business"],
  ["what services do you offer", "faq-2|services"], ["can he build a react app", "t-React"], ["skills", "skills"], ["tech stack", "skills"],
  ["what databases does he know", "tk-Databases"], ["education", "education"], ["which college", "education"],
  ["certifications", "certifications"], ["is he microsoft certified", "certifications"], ["languages he speaks", "spoken"],
  ["what is supabase", "t-Supabase"], ["explain row level security", "t-Row Level Security"], ["what is RAG", "t-RAG"],
  ["docker experience?", "t-Docker"], ["does he know aws lambda", "t-AWS Lambda"], ["m365 admin", "t-Microsoft 365"],
  ["what is entra id", "t-Microsoft Entra"], ["conditional acess", "t-Conditional Access"], ["postgres", "t-PostgreSQL"],
  ["expereince with pyhton", "t-Python"], ["typscript", "t-TypeScript"], ["core web vitals", "t-Core Web Vitals"],
  ["does he know kotlin", "?"], ["what's the weather today", "?"], ["hello", "smalltalk"], ["thanks!", "smalltalk"],
  ["does he know C#", "t-C#"], ["c++", "t-C++"], ["node.js", "t-Node.js"], ["what is ci/cd", "t-CI/CD"], ["seo", "t-Technical SEO"],
  ["vpn setup", "t-VPN|p-enterprise|g-business"],
  ["best tech stack for an ecommerce store", "g-stacks"], ["which stack for a saas startup", "g-stacks"], ["how to build a mobile app", "g-stacks"],
  ["how do i scale my web app", "g-scaling"], ["my database is slow", "g-scaling|t-Database indexing"], ["what is caching", "g-scaling"], ["how to make my website faster", "g-scaling"],
  ["what do i need before building a website", "g-planning"], ["how much does a website cost", "g-planning"], ["how long to build an app", "g-planning"],
  ["setup business email and domain", "g-planning"], ["how to improve seo", "g-planning"], ["microsoft 365 vs google workspace", "g-startup"],
  ["how can i automate my business", "g-startup"], ["what software does a startup need", "g-startup"], ["automate payroll and attendance", "g-startup"],
  ["cybersecurity for small business", "g-security"], ["monolith vs microservices", "g-stacks"], ["node or python for backend", "g-stacks"],
  ["who built you", "smalltalk"], ["who made this chatbot", "bot|smalltalk"], ["who is devv", "bot|smalltalk"], ["how does this chatbot work", "bot-how"],
  ["can you set up it for my whole company", "g-business"], ["it setup for new office", "g-business"], ["crm setup", "g-business"],
  ["erp for small business", "g-business"], ["can he set up our accounting software", "g-business"], ["it support and maintenance", "g-business"],
  ["backup strategy", "g-business"], ["what can be automated in my business", "g-business"], ["onboarding new employee it", "g-business"],
  ["I run a small or mid-size business", "persona-business"],
  ["I'm a recruiter", "persona-recruiter"], ["I'm hiring / a recruiter", "persona-recruiter"], ["I need a website or app", "persona-client"],
  ["I'm a developer / student", "persona-developer"], ["Just exploring", "persona-exploring"], ["I'm starting a business", "persona-founder"], ["i need a website for my business", "persona-client|g-planning|g-stacks"], ["i am starting a business", "persona-founder|g-startup"],
 ["results achievements", "impact"], ["does he know mongodb", "t-MongoDB"], ["flutter apps", "t-Flutter"],
];
let pass = 0;
for (const [q, want] of cases) {
  const a = answerLocally(q);
  const top = search(q, 1)[0];
  const id = a.id ?? top?.doc.id ?? "-";
  let ok: boolean;
  if (want === "?") ok = !a.confident;
  else if (want === "smalltalk") ok = a.confident && !top;
  else ok = a.confident && (want.split("|").some((w) => id.startsWith(w)) || (!top && want === "about"));
  if (want === "smalltalk") ok = a.confident;
  pass += ok ? 1 : 0;
  console.log(`${ok ? "ok " : "BAD"} ${q.padEnd(42)} -> ${id.padEnd(34)} conf=${a.confident} score=${top?.score.toFixed(2) ?? "-"} cov=${top?.coverage.toFixed(2) ?? "-"}`);
}
console.log(`\n${pass}/${cases.length} correct`);

// Every question offered in the topic menu, persona replies and guide follow-ups must be answerable,
// and every guide must be the top answer for its own title.
const offered = new Set<string>();
topics().forEach((t: { asks: string[] }) => t.asks.forEach((a) => offered.add(a)));
PERSONAS.forEach((p: { next: string[] }) => p.next.forEach((a) => offered.add(a)));
guides.forEach((g: { next?: string[] }) => g.next?.forEach((a) => offered.add(a)));
const unanswerable = [...offered].filter((q) => !answerLocally(q).confident);
const misrouted = guides.filter((g: { ask: string }) => search(g.ask, 1)[0]?.doc.ask !== g.ask).map((g: { ask: string }) => g.ask);
console.log(`${offered.size - unanswerable.length}/${offered.size} offered questions answerable; ${guides.length - misrouted.length}/${guides.length} guides reachable by title`);
[...unanswerable, ...misrouted].forEach((q) => console.log("  FIX:", q));
if (pass < cases.length || unanswerable.length || misrouted.length) process.exit(1);
