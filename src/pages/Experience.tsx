import { Link } from "react-router-dom";
import { experience, projects } from "@/data/site";
import { Breadcrumbs, Comment, ContactCta, Rich } from "@/components/site/Parts";

const heads = ["HEAD → main", "HEAD~1", "HEAD~2 · init"];

export default function Experience() {
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Experience" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="02" label="experience" />
            <h1 id="page-title" className="disp h1 hw">Experience</h1>
            <p className="lead" style={{ maxWidth: 680, marginTop: 24 }}>
              2+ years across software development, cloud infrastructure and enterprise IT in the UAE and India.
            </p>
          </div>
        </div>
      </section>
      <section style={{ paddingBottom: 40 }} aria-label="Roles">
        <div className="wrap">
          {experience.map((e, i) => (
            <article className="xp" key={e.role}>
              <div className="rv">
                <div className="xp-date"><time dateTime={e.start}>{e.period}</time></div>
                {e.current && <span className="badge" style={{ marginTop: 14 }}><span className="dot" />Current</span>}
                <div className="xp-head">{heads[i]}</div>
              </div>
              <div>
                <h2 className="disp h3 rv">{e.role}</h2>
                <div className="xp-co rv">{e.company} · {e.location}</div>
                <ul>{e.points.map((pt) => <li key={pt}><Rich text={pt} /></li>)}</ul>
                {i === 0 && (
                  <p className="body" style={{ marginTop: 20 }}>
                    Related case studies:{" "}
                    <Link className="acc" to={`/projects/${projects[0].slug}`}>WAQTI</Link> ·{" "}
                    <Link className="acc" to={`/projects/${projects[1].slug}`}>USF Demolition platform</Link>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
