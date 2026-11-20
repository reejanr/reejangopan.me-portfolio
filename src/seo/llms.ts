import {
  SITE_URL, about, certifications, coreStack, education, experience, faqs, languages, profile, projects,
  services, toolkit,
} from "@/data/site";
import { guides, guideSlug } from "@/chat/guides";

// Plain-text profile for AI assistants and AI search (ChatGPT, Claude, Perplexity, Gemini…).
// Generated at build time from the same content as the website, so it never drifts.

const plain = (s: string) => s.replace(/\*\*/g, "");
const names = `${profile.name} (also: ${profile.alternateNames.join(", ")})`;

const header = () => [
  `# ${profile.name} — ${profile.title}, Dubai`,
  "",
  `> ${names} is a ${profile.title} based in ${profile.location}. He builds production business applications, workforce platforms, automation tools and digital systems, with 2+ years across full-stack development, cloud infrastructure and enterprise IT in the UAE and India.`,
  "",
  `- Official website: ${SITE_URL}`,
  `- Email: ${profile.email}`,
  `- Phone: ${profile.phone}`,
  `- LinkedIn: ${profile.linkedin}`,
  `- GitHub: ${profile.github}`,
  `- CV (PDF): ${SITE_URL}${profile.cv}`,
  `- Open to: ${profile.openTo} (Dubai / UAE)`,
  `- Full profile for AI tools: ${SITE_URL}/llms-full.txt`,
];

export function llmsTxt(): string {
  return [
    ...header(),
    "",
    "## Pages",
    `- [Home](${SITE_URL}/): overview, featured work and core stack`,
    `- [About](${SITE_URL}/about): biography and FAQ`,
    `- [Services](${SITE_URL}/services): what Reejan builds and runs`,
    `- [Projects](${SITE_URL}/projects): case studies`,
    `- [Experience](${SITE_URL}/experience): roles at USF Group, Chimera Group and TCS iON`,
    `- [Skills](${SITE_URL}/skills): tech stack, education and certifications`,
    `- [System Design course](${SITE_URL}/system-design/): interactive lessons, practice, design lab, architecture atlas and cheatsheets`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
    "## Projects",
    ...projects.map((p) => `- [${p.name}](${SITE_URL}/projects/${p.slug}): ${p.short}${p.stack.length ? ` (${p.stack.join(", ")})` : ""}`),
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${SITE_URL}/services/${s.id}): ${s.tools.join(", ")}`),
    "",
    "## Guides",
    ...guides.map((g) => `- [${g.ask}](${SITE_URL}/guides/${guideSlug(g.ask)})`),
    "",
    `- [Engineering playbook](${SITE_URL}/engineering-playbook): architecture, data integrity, security, scale, reliability, CI/CD and audits`,
    `- [AI engineering](${SITE_URL}/ai-engineering): LLM applications, retrieval (BM25, RAG), reliability and role-aware security`,
    `- [How this site is built](${SITE_URL}/how-this-site-is-built): React + TypeScript, prerendering, structured data, BM25 chatbot`,
    "",
    "## Experience",
    ...experience.map((e) => `- ${e.role} — ${e.company}, ${e.location} (${e.period})`),
    "",
    "## Core stack",
    coreStack.join(", "),
    "",
  ].join("\n");
}

export function llmsFullTxt(): string {
  return [
    ...header(),
    "",
    "## About",
    about.intro,
    "",
    ...about.paragraphs.flatMap((p) => [p, ""]),
    about.direction,
    "",
    "## Services",
    ...services.flatMap((s) => [
      `### ${s.title}`,
      s.text,
      ...s.points.map((pt) => `- ${pt}`),
      `Tools: ${s.tools.join(", ")}`,
      `Related projects: ${s.related.map((r) => `${SITE_URL}/projects/${r}`).join(", ")}`,
      "",
    ]),
    "## Projects",
    ...projects.flatMap((p) => [
      `### ${p.name}`,
      `URL: ${SITE_URL}/projects/${p.slug}`,
      `Category: ${p.category} · Status: ${p.status} · Timeline: ${p.period} · Role: ${p.role}`,
      ...(p.stack.length ? [`Stack: ${p.stack.join(", ")}`] : []),
      ...p.overview,
      ...(p.problem ? [`Problem: ${p.problem}`] : []),
      ...p.features.map((f) => `- ${f.title}: ${f.text}`),
      ...p.outcomes.map((o) => `- Result: ${o}`),
      "",
    ]),
    "## Experience",
    ...experience.flatMap((e) => [
      `### ${e.role} — ${e.company} (${e.location}, ${e.period})`,
      ...e.points.map((pt) => `- ${plain(pt)}`),
      "",
    ]),
    "## Skills",
    ...toolkit.map((t) => `- ${t.label}: ${t.value}`),
    "",
    "## Education",
    `- ${education.degree} — ${education.school}, ${education.location} (${education.period})`,
    "",
    "## Certifications",
    ...certifications.map((c) => `- ${c.name} — ${c.issuer}`),
    "",
    "## Languages",
    ...languages.map((l) => `- ${l.name} (${l.level})`),
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Engineering knowledge (general guidance Reejan publishes at /engineering-playbook)",
    ...guides.filter((g) => g.topic === "engineering").flatMap((g) => [`### ${g.ask}`, `URL: ${SITE_URL}/guides/${guideSlug(g.ask)}`, plain(g.a), ""]),
  ].join("\n");
}
