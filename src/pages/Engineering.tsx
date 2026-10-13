import { Link } from "react-router-dom";
import { guides } from "@/chat/guides";
import { routes } from "@/seo/seo";
import { Breadcrumbs, Comment, SectionHead } from "@/components/site/Parts";
import { LeadCta } from "@/components/site/LeadCta";
import { Check } from "@/components/site/Icons";

// Simplified excerpts of the real code that runs this site.
const SNIPPETS: { file: string; title: string; text: string; code: string }[] = [
  {
    file: "prerender.js",
    title: "Every page is server-rendered to static HTML",
    text: "At build time each route is rendered with React's renderToString, its own <head> is injected, and the page is written in both URL styles so it resolves on any host. Google gets complete HTML — no blank page waiting for JavaScript.",
    code: [
      "for (const route of routes) {",
      "  const html = template",
      "    .replace(\"<!--app-head-->\", head(route))   // title, meta, canonical, JSON-LD",
      "    .replace(\"<!--app-html-->\", render(route)) // React renderToString",
      "  write(\"dist\" + route + \".html\", html)",
      "  write(\"dist\" + route + \"/index.html\", html)",
      "}",
      "writeSitemap(routes)                           // generated from the same list",
    ].join("\n"),
  },
  {
    file: "src/seo/seo.ts",
    title: "Structured data as one connected graph",
    text: "Each page publishes JSON-LD that links the website, the person, the employer and the page itself — ProfilePage, Service, TechArticle, BreadcrumbList — so search engines and AI assistants understand who built what.",
    code: [
      "const graph = (...nodes: object[]) => [{",
      "  \"@context\": \"https://schema.org\",",
      "  \"@graph\": [website, person, employer, ...nodes],",
      "}];",
      "",
      "// e.g. a service page",
      "graph(page(\"WebPage\", path, title, description), service, breadcrumbs(trail))",
    ].join("\n"),
  },
  {
    file: "src/chat/engine.ts",
    title: "A search engine for the chatbot, written from scratch",
    text: "Devv, the site's assistant, ranks answers with BM25 — the classic search-engine scoring function — plus synonym expansion, stemming and Damerau-Levenshtein typo correction. It runs entirely in the browser: free, instant and private.",
    code: [
      "for (const t of queryTerms) {",
      "  const f = termFreq[doc].get(t);",
      "  if (!f) continue;",
      "  const idf = Math.log(1 + (N - df(t) + 0.5) / (df(t) + 0.5));",
      "  score += idf * (f * (k1 + 1)) /",
      "    (f + k1 * (1 - b + (b * docLen[doc]) / avgLen));",
      "}",
      "// answer only when confident; otherwise suggest related questions",
    ].join("\n"),
  },
  {
    file: "src/components/site/fx.ts",
    title: "Scroll animations that work in every browser",
    text: "Reveal animations are driven by IntersectionObserver and animate only transform and opacity, so they run on the GPU. Content is never hidden without JavaScript, and everything respects reduced-motion settings.",
    code: [
      "const io = new IntersectionObserver((entries) => {",
      "  for (const e of entries) {",
      "    if (!e.isIntersecting) continue;",
      "    reveal(e.target);          // adds .is-in — CSS does the rest",
      "    io.unobserve(e.target);",
      "  }",
      "}, { rootMargin: \"0px 0px -8% 0px\" });",
    ].join("\n"),
  },
];

export default function Engineering() {
  const facts = [
    `${routes.length} pages, every one prerendered to static HTML with its own title, description, canonical URL and structured data`,
    "React 18 + TypeScript + Vite, deployed on Vercel with clean URLs, immutable asset caching and security headers",
    "Lighthouse 100 for desktop performance, SEO and best practices on the pages tested",
    "Light and dark themes, phone-first layouts and keyboard-accessible navigation",
    `A knowledge base of ${guides.length} guides and 100+ technology explanations behind the chat assistant, checked by an automated test suite`,
    "Inline critical CSS, preloaded fonts, and the chat code-split so it never slows the first load",
  ];
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "How this site is built" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="00" label="engineering" />
            <h1 id="page-title" className="disp h2 hw" style={{ maxWidth: 960 }}>
              How this site is <span className="serif acc">built</span>
            </h1>
            <p className="lead" style={{ maxWidth: 780, marginTop: 24 }}>
              Reejan designed and coded reejangopan.me himself — as a working example of how he builds production
              software: fast, accessible, search-friendly and maintainable.
            </p>
          </div>
          <ul className="checks stagger" style={{ marginTop: 40, maxWidth: 900 }}>
            {facts.map((f) => <li key={f}><Check size={16} />{f}</li>)}
          </ul>
        </div>
      </section>

      {SNIPPETS.map((s, i) => (
        <section key={s.file} className="section-sm" aria-labelledby={`snip-${i}`}>
          <div className="wrap grid-2" style={{ gap: "32px 56px", alignItems: "center" }}>
            <div>
              <Comment n={String(i + 1).padStart(2, "0")} label="under-the-hood" />
              <h2 id={`snip-${i}`} className="disp h3 hw">{s.title}</h2>
              <p className="body" style={{ marginTop: 14 }}>{s.text}</p>
            </div>
            <figure className="ide snippet rv" style={{ margin: 0 }}>
              <div className="ide-bar"><i /><i /><i /><figcaption className="code-font" style={{ marginLeft: 10, fontSize: 12, color: "#8e939a" }}>{s.file}</figcaption></div>
              <pre className="code"><code>{s.code}</code></pre>
            </figure>
          </div>
        </section>
      ))}

      <section className="section-sm" aria-label="Next steps">
        <div className="wrap">
          <SectionHead n="05" label="next" title={<>Want this quality <span className="serif acc">for your business?</span></>} />
          <p className="body" style={{ maxWidth: 680 }}>
            The same approach powers his client work — see the <Link className="acc" to="/projects">case studies</Link>,
            the <Link className="acc" to="/services">services</Link> and the <Link className="acc" to="/guides">tech guides</Link>.
          </p>
          <div style={{ marginTop: 32 }}><LeadCta /></div>
        </div>
      </section>
    </>
  );
}
