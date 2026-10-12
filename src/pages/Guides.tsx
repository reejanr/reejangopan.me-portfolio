import { Link } from "react-router-dom";
import { guides, guideSlug, guideSummary, topicIntros, topicLabels, type Topic } from "@/chat/guides";
import { Breadcrumbs, Comment } from "@/components/site/Parts";
import { LeadCta } from "@/components/site/LeadCta";

export default function Guides() {
  const topics = Object.keys(topicLabels) as Topic[];
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Guides" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="01" label="guides" />
            <h1 id="page-title" className="disp h1 hw">Tech <span className="serif acc">guides</span></h1>
            <p className="lead" style={{ maxWidth: 760, marginTop: 24 }}>
              Practical, no-jargon answers on choosing a tech stack, scaling, planning a website or app, and running IT
              and automation for a growing business — written by Reejan R Gopan from real projects in Dubai.
            </p>
            <nav className="tags" aria-label="Guide topics" style={{ marginTop: 28 }}>
              {topics.map((t) => <a key={t} className="tag" href={`#${t}`}>{topicLabels[t]}</a>)}
            </nav>
          </div>
        </div>
      </section>

      {topics.map((t, ti) => (
        <section key={t} id={t} className="section-sm" aria-labelledby={`h-${t}`}>
          <div className="wrap">
            <Comment n={String(ti + 1).padStart(2, "0")} label={t} />
            <div className="sec-head">
              <h2 id={`h-${t}`} className="disp h2 hw">{topicLabels[t]}</h2>
              <p className="body" style={{ margin: 0, maxWidth: 420 }}>{topicIntros[t]}</p>
            </div>
            <ul className="guide-grid stagger">
              {guides.filter((g) => g.topic === t).map((g) => (
                <li key={g.ask}>
                  <Link className="guide-card spot" to={`/guides/${guideSlug(g.ask)}`}>
                    <h3 className="disp">{g.ask}</h3>
                    <p>{guideSummary(g, 120)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section-sm" aria-label="Contact">
        <div className="wrap"><LeadCta /></div>
      </section>
    </>
  );
}
