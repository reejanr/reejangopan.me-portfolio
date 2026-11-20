import { Link } from "react-router-dom";
import { Breadcrumbs, Comment, ContactCta, SectionHead } from "@/components/site/Parts";
import { ArrowRight } from "@/components/site/Icons";

const AREAS: { title: string; topics: string[]; text: string }[] = [
  {
    title: "AI coding",
    topics: ["Codex", "Claude Code", "AI-assisted reviews", "Development workflows"],
    text: "AI coding tools speed up implementation, refactoring and test writing. I treat their output like a colleague's pull request: it is read, run and tested before it is merged, and I stay responsible for every change.",
  },
  {
    title: "AI applications",
    topics: ["LLM APIs", "Chatbot development", "AI copilots"],
    text: "Applications that call large language models through an API, wrapped in the product's own logic, permissions and logging, such as the DEVV copilot and the assistant on this site.",
  },
  {
    title: "Retrieval",
    topics: ["RAG", "Embeddings", "BM25", "Vector search"],
    text: "Grounding answers in real content. This site's assistant uses a BM25 ranking engine over the site's own pages, and the toolkit also covers embeddings and vector search for larger knowledge bases.",
  },
  {
    title: "AI reliability",
    topics: ["Retry handling", "Rate limits", "Fallbacks", "Evaluation"],
    text: "Model calls fail, slow down and get rate-limited. Reliable AI features retry with limits, degrade to a working fallback and are checked against a fixed set of test questions.",
  },
  {
    title: "AI security",
    topics: ["Role-aware retrieval", "Authorization", "Data isolation"],
    text: "The model is never the access-control layer. Who may see what is decided by the application before any content reaches the model, so one user's data cannot appear in another user's answer.",
  },
  {
    title: "AI infrastructure",
    topics: ["Provider integration", "Cost control", "Logging", "Observability"],
    text: "Integrating model providers behind a single layer, limiting usage and spend, and keeping logs that make a wrong or slow answer traceable.",
  },
];

export default function AiEngineering() {
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title" style={{ position: "relative", overflow: "hidden" }}>
        <div className="wm" aria-hidden="true">AI</div>
        <div className="wrap" style={{ position: "relative" }}>
          <Breadcrumbs items={[{ name: "AI Engineering" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="06" label="ai-engineering" />
            <h1 id="page-title" className="disp h1 hw">AI <span className="serif acc">engineering</span></h1>
            <p className="lead" style={{ maxWidth: 700, marginTop: 24 }}>
              Building software that uses language models safely, and using AI tools to build software faster, without handing
              over the engineering judgement.
            </p>
          </div>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="scope-title">
        <div className="wrap">
          <SectionHead n="01" label="scope" title={<span id="scope-title">What this <span className="serif acc">is, and is not</span></span>} />
          <ul className="svc-grid stagger">
            <li className="rv">
              <Link to="/devv" className="svc-card spot">
                <span className="disp svc-card-t">Explore the Devv AI module</span>
                <span className="svc-card-d">Knowledge map, BM25 retrieval flow, trust model and a live assistant you can test.</span>
              </Link>
            </li>
            <li className="rv">
              <div className="svc-card">
                <span className="disp svc-card-t">AI application development</span>
                <span className="svc-card-d">Building products that call models through an API: copilots, chatbots and retrieval. This is the focus of this page.</span>
              </div>
            </li>
            <li className="rv">
              <div className="svc-card">
                <span className="disp svc-card-t">AI-assisted coding</span>
                <span className="svc-card-d">Using tools such as Codex and Claude Code to help write and review software. A way of working, not a product.</span>
              </div>
            </li>
            <li className="rv">
              <div className="svc-card">
                <span className="disp svc-card-t">Training machine-learning models</span>
                <span className="svc-card-d">A separate discipline. I use trained models through APIs; I am not presenting myself as a model researcher.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="areas-title">
        <div className="wrap">
          <SectionHead n="02" label="areas" title={<span id="areas-title">Areas of <span className="serif acc">work</span></span>} />
          <dl className="stagger" style={{ margin: 0 }}>
            {AREAS.map((a) => (
              <div key={a.title} className="skrow">
                <dt>{a.title}</dt>
                <dd>
                  <strong>{a.topics.join(" · ")}</strong>
                  <br />
                  {a.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="featured-title">
        <div className="wrap">
          <SectionHead n="03" label="featured" title={<span id="featured-title">Featured <span className="serif acc">examples</span></span>} />
          <ul className="svc-grid stagger">
            <li className="rv">
              <Link to="/projects/devv-ai-workforce-copilot" className="svc-card spot">
                <span className="disp svc-card-t">DEVV — AI workforce copilot</span>
                <span className="svc-card-d">Retrieval, role-aware knowledge and LLM integration inside a workforce platform. Rollout is currently limited.</span>
              </Link>
            </li>
            <li className="rv">
              <Link to="/how-this-site-is-built" className="svc-card spot">
                <span className="disp svc-card-t">The BM25 assistant on this site</span>
                <span className="svc-card-d">A retrieval engine, static prerendering and performance work, with code examples.</span>
              </Link>
            </li>
          </ul>
          <p style={{ marginTop: 28 }}>
            <Link className="text-link" to="/projects">All projects <ArrowRight /></Link>
          </p>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
