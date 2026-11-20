import { Link } from "react-router-dom";
import { BotAvatar } from "@/components/site/ChatWidget";
import { Breadcrumbs, ContactCta, SectionHead } from "@/components/site/Parts";

const KNOWLEDGE = [
  {
    title: "Profile & availability",
    text: "Reejan's background, experience, education, certifications, CV, location, availability and contact routes.",
    examples: ["Who is Reejan?", "Is he open to new roles?", "What certifications does he have?"],
  },
  {
    title: "Projects & outcomes",
    text: "The published case studies for WAQTI, DEVV, ERP and CRM work, web platforms, trading analysis and IT infrastructure.",
    examples: ["What has Reejan built?", "Tell me about WAQTI", "Tell me about DEVV"],
  },
  {
    title: "Engineering knowledge",
    text: "Architecture, scalability, databases, caching, queues, security, reliability, testing, CI/CD and production readiness.",
    examples: ["How should caching work?", "How do queues and retries work?", "What should a CI/CD pipeline include?"],
  },
  {
    title: "Technology explainers",
    text: "Clear explanations of the languages, frameworks, cloud platforms, infrastructure and AI technologies in Reejan's toolkit.",
    examples: ["What is Supabase?", "What is RAG?", "What is Docker?"],
  },
  {
    title: "Business planning",
    text: "Practical guidance for websites, applications, business systems, startup stacks, automation and digital transformation.",
    examples: ["What do I need before building a web app?", "How can a business use AI?", "Which database should I use?"],
  },
  {
    title: "Services & next steps",
    text: "What Reejan can build, the tools involved, relevant examples and the quickest route to start a conversation.",
    examples: ["What services does he offer?", "Can he build an ERP?", "How can I contact Reejan?"],
  },
];

const PIPELINE = [
  { name: "Question", detail: "The visitor asks in natural language." },
  { name: "Normalise", detail: "Synonyms, light stemming and typo correction improve recall." },
  { name: "Retrieve", detail: "BM25 ranks the most relevant entries in the local knowledge base." },
  { name: "Confidence", detail: "A threshold decides whether the match is strong enough to answer." },
  { name: "Respond", detail: "Devv returns the grounded answer, useful links and follow-up prompts." },
];

const PRINCIPLES = [
  ["Grounded first", "Published portfolio content and guides are the source of truth for facts about Reejan."],
  ["Private by default", "Confident answers are retrieved in the browser, so ordinary questions do not need a server call."],
  ["Honest uncertainty", "When confidence is low, Devv offers nearby questions or says the answer is not in its knowledge base."],
  ["Optional AI fallback", "A configured server endpoint can help with open-ended questions; the local assistant remains the reliable fallback."],
  ["No access-control theatre", "For business copilots, permissions must be applied before content reaches a model—not invented in a prompt."],
  ["Accessible motion", "Every reveal, hover and 3D effect respects reduced-motion preferences and keeps the content usable without animation."],
] as const;

function openDevv(prompt = "") {
  window.dispatchEvent(new CustomEvent("devv:open", { detail: { prompt } }));
}

export default function DevvAssistant() {
  return (
    <>
      <section className="section-sm devv-hero" aria-labelledby="page-title">
        <div className="grid-bg devv-grid" aria-hidden="true" />
        <div className="wrap" style={{ position: "relative" }}>
          <Breadcrumbs items={[{ name: "Devv AI assistant" }]} />
          <div className="devv-hero-grid">
            <div>
              <p className="mono acc in" style={{ margin: 0 }}>Local retrieval · optional AI · grounded answers</p>
              <h1 id="page-title" className="disp h1 in d1" style={{ marginTop: 20 }}>
                Meet <span className="serif acc">Devv</span>
              </h1>
              <p className="lead in d2" style={{ maxWidth: 700, marginTop: 24 }}>
                Reejan's portfolio assistant turns project evidence, engineering guides and technology knowledge into a fast,
                searchable conversation—without pretending it knows facts that are not published.
              </p>
              <div className="hero-actions in d3">
                <button type="button" className="btn btn-acc" onClick={() => openDevv()}>Ask Devv</button>
                <a className="btn btn-ghost" href="#knowledge">Explore the knowledge</a>
              </div>
              <ul className="devv-status in d4" aria-label="Devv capabilities">
                <li><span className="dot" />Browser-first retrieval</li>
                <li>Typo tolerant</li>
                <li>Source-linked answers</li>
              </ul>
            </div>

            <div className="devv-core-wrap in d2">
              <div className="devv-core tilt" aria-label="Devv knowledge engine illustration">
                <div className="devv-orbit orbit-a" aria-hidden="true" />
                <div className="devv-orbit orbit-b" aria-hidden="true" />
                <span className="devv-chip chip-a">BM25</span>
                <span className="devv-chip chip-b">RAG</span>
                <span className="devv-chip chip-c">GUIDES</span>
                <span className="devv-chip chip-d">PROJECTS</span>
                <div className="devv-avatar"><BotAvatar size={92} /></div>
                <p className="mono">knowledge.ready()</p>
                <strong className="disp">Ask. Retrieve. Explain.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="knowledge" className="section" aria-labelledby="knowledge-title">
        <div className="wrap">
          <SectionHead n="01" label="knowledge-map" title={<span id="knowledge-title">What Devv <span className="serif acc">knows</span></span>} />
          <p className="lead rv" style={{ maxWidth: 780, margin: "0 0 32px" }}>
            The knowledge module is built from the same structured content that powers this portfolio, its case studies and its
            engineering handbook. Choose any example to open the assistant with that question ready to send.
          </p>
          <ul className="devv-knowledge stagger">
            {KNOWLEDGE.map((item) => (
              <li key={item.title} className="devv-knowledge-card spot">
                <h2 className="disp">{item.title}</h2>
                <p>{item.text}</p>
                <div className="devv-prompts">
                  {item.examples.map((question) => (
                    <button type="button" key={question} onClick={() => openDevv(question)}>{question}</button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section devv-flow-section" aria-labelledby="flow-title">
        <div className="wrap">
          <SectionHead n="02" label="retrieval-flow" title={<span id="flow-title">How an answer <span className="serif acc">moves</span></span>} />
          <ol className="devv-flow stagger">
            {PIPELINE.map((step, index) => (
              <li key={step.name}>
                <span className="devv-step">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="disp">{step.name}</h2>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
          <div className="devv-demo rv">
            <div>
              <p className="mono acc" style={{ margin: 0 }}>Try the full path</p>
              <h2 className="disp h3" style={{ marginTop: 10 }}>Ask a real question</h2>
              <p className="body" style={{ margin: "10px 0 0" }}>The prompt opens in Devv so you can inspect the answer and follow its suggested next steps.</p>
            </div>
            <button type="button" className="btn btn-acc" onClick={() => openDevv("How does this chatbot work?")}>Test the knowledge engine</button>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="wrap">
          <SectionHead n="03" label="trust-model" title={<span id="principles-title">Built for <span className="serif acc">useful trust</span></span>} />
          <dl className="devv-principles stagger">
            {PRINCIPLES.map(([title, text]) => (
              <div key={title}>
                <dt className="disp">{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
          <div className="devv-links rv">
            <Link className="btn btn-ghost" to="/projects/devv-ai-workforce-copilot">Read the DEVV case study</Link>
            <Link className="btn btn-ghost" to="/how-this-site-is-built">See how this site is built</Link>
            <a className="btn btn-ghost" href="/system-design/#/atlas/rag-assistant">Explore the RAG architecture</a>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
