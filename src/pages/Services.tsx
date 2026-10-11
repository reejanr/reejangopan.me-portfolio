import { Link } from "react-router-dom";
import { profile, projects, services } from "@/data/site";
import { Breadcrumbs, Comment, ContactCta } from "@/components/site/Parts";
import { ArrowRight, Check } from "@/components/site/Icons";

const projectName = (slug: string) => projects.find((p) => p.slug === slug)?.name.split(" — ")[0] ?? slug;

export default function Services() {
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Services" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="01" label="services" />
            <h1 id="page-title" className="disp h1 hw">What I <span className="serif acc">build &amp; run</span></h1>
            <p className="lead" style={{ maxWidth: 760, marginTop: 24 }}>
              Software engineering and systems work for businesses in Dubai and across the UAE — every service below is
              backed by production work you can read about in the case studies.
            </p>
            <nav aria-label="Services on this page" className="tags" style={{ marginTop: 28 }}>
              {services.map((s) => <a key={s.id} className="tag" href={`#${s.id}`}>{s.title}</a>)}
            </nav>
          </div>
        </div>
      </section>

      <section aria-label="Services" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className="svc-block rv">
              <div>
                <span className="proj-n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h2 className="disp h3">{s.title}</h2>
                <p className="body" style={{ margin: "12px 0 0", fontSize: 17, maxWidth: 760 }}>{s.text}</p>
                <ul className="svc-points">
                  {s.points.map((pt) => <li key={pt}><Check size={15} />{pt}</li>)}
                </ul>
                <div className="tags" style={{ marginTop: 18 }}>{s.tools.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                <p className="body" style={{ margin: "18px 0 0", fontSize: 14.5 }}>
                  <span className="faint">Related work: </span>
                  {s.related.map((slug, j) => (
                    <span key={slug}>
                      {j > 0 && " · "}
                      <Link className="acc" to={`/projects/${slug}`} style={{ fontWeight: 600 }}>{projectName(slug)}</Link>
                    </span>
                  ))}
                </p>
                <p className="faint" style={{ margin: "10px 0 0", fontSize: 13 }}>
                  Relevant for: {s.searchTerms.join(" · ")}
                </p>
              </div>
            </article>
          ))}
          <p className="lead" style={{ marginTop: 48 }}>
            Hiring or planning a project?{" "}
            <Link className="text-link" to="/contact" style={{ display: "inline-flex" }}>Contact {profile.name} <ArrowRight /></Link>
          </p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
