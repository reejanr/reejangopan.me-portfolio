// Regression check for the free in-browser chat assistant.
// Run: npx tsx scripts/chat-eval.mts   (expects 56/56)
import { pathToFileURL } from "node:url";
const { answerLocally, search } = await import(pathToFileURL(process.cwd() + "/src/chat/engine.ts").href);
const cases: [string, string][] = [
  ["who is reejan", "about"], ["Tell me about Reejan Gopan", "about"], ["is reejan gopan same as reejan r gopan", "faq-1|names"],
  ["how can i contact him", "faq-6|contact"], ["what's his email", "contact"], ["phone number?", "contact"], ["download resume", "cv"],
  ["where is he based", "location"], ["is he available for a job", "availability"], ["are you hiring? is he open to work", "availability"],
  ["work experience", "experience"], ["how many years experience", "experience"], ["where does he work now", "xp-0"],
  ["what did he do at TCS", "xp-2"], ["chimera group", "xp-1"], ["what has he built", "projects|faq-3"], ["tell me about waqti", "p-waqti"],
  ["attendance app", "p-waqti|t-Workforce"], ["usf demolition website", "p-usf"], ["trading bot xauusd", "p-xauusd"], ["ERP", "t-ERP"],
  ["what services do you offer", "faq-2|services"], ["can he build a react app", "t-React"], ["skills", "skills"], ["tech stack", "skills"],
  ["what databases does he know", "tk-Databases"], ["education", "education"], ["which college", "education"],
  ["certifications", "certifications"], ["is he microsoft certified", "certifications"], ["languages he speaks", "spoken"],
  ["what is supabase", "t-Supabase"], ["explain row level security", "t-Row Level Security"], ["what is RAG", "t-RAG"],
  ["docker experience?", "t-Docker"], ["does he know aws lambda", "t-AWS Lambda"], ["m365 admin", "t-Microsoft 365"],
  ["what is entra id", "t-Microsoft Entra"], ["conditional acess", "t-Conditional Access"], ["postgres", "t-PostgreSQL"],
  ["expereince with pyhton", "t-Python"], ["typscript", "t-TypeScript"], ["core web vitals", "t-Core Web Vitals"],
  ["does he know kotlin", "?"], ["what's the weather today", "?"], ["hello", "smalltalk"], ["thanks!", "smalltalk"],
  ["does he know C#", "t-C#"], ["c++", "t-C++"], ["node.js", "t-Node.js"], ["what is ci/cd", "t-CI/CD"], ["seo", "t-Technical SEO"],
  ["vpn setup", "t-VPN|p-enterprise"], ["results achievements", "impact"], ["does he know mongodb", "t-MongoDB"], ["flutter apps", "t-Flutter"],
];
let pass = 0;
for (const [q, want] of cases) {
  const a = answerLocally(q);
  const top = search(q, 1)[0];
  const id = top?.doc.id ?? "-";
  let ok: boolean;
  if (want === "?") ok = !a.confident;
  else if (want === "smalltalk") ok = a.confident && !top;
  else ok = a.confident && (want.split("|").some((w) => id.startsWith(w)) || (!top && want === "about"));
  if (want === "smalltalk") ok = a.confident;
  pass += ok ? 1 : 0;
  console.log(`${ok ? "ok " : "BAD"} ${q.padEnd(42)} -> ${id.padEnd(34)} conf=${a.confident} score=${top?.score.toFixed(2) ?? "-"} cov=${top?.coverage.toFixed(2) ?? "-"}`);
}
console.log(`\n${pass}/${cases.length} correct`);
