import { Link, useParams } from "react-router-dom";
import { projects } from "@/data/site";
import { Breadcrumbs, Comment, ContactCta, SectionHead } from "@/components/site/Parts";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "@/components/site/Icons";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return <NotFound />;
  const p = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <article>
        <header className="section-sm" style={{ paddingBottom: 48 }}>
          <div className="wrap">
            <Breadcrumbs items={[{ name: "Projects", to: "/projects" }, { name: p.name }]} />
            <div style={{ marginTop: 32 }}>
              <Comment n={String(idx + 1).padStart(2, "0")} label="case-study" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                <span className="badge"><span className="dot" />{p.status}</span>
                <span className="tag">{p.category}</span>
              </div>
              <h1 className="disp h2 hw" style={{ maxWidth: 980 }}>{p.name}</h1>
              <p className="lead" style={{ maxWidth: 760, marginTop: 24 }}>{p.short}</p>
              {p.link && (
                <a className="btn btn-acc" style={{ marginTop: 28 }} href={p.link.href} target="_blank" rel="noopener noreferrer">
                  {p.link.label} <ArrowUpRight />
                </a>
              )}
            </div>
            <dl className="facts rv" style={{ marginTop: 48 }}>
              <div><dt>Role</dt><dd>{p.role}</dd></div>
              <div><dt>Timeline</dt><dd>{p.period}</dd></div>
              <div><dt>Status</dt><dd>{p.status}</dd></div>
              <div><dt>Stack</dt><dd>{p.stack.slice(0, 4).join(", ")}</dd></div>
            </dl>
          </div>
        </header>

        <section className="section-sm" aria-labelledby="overview">
          <div className="wrap grid-2" style={{ gap: "32px 64px", alignItems: "start" }}>
            <div>
              <h2 id="overview" className="disp h3 rv">Overview</h2>
              {p.problem && (
                <>
                  <h3 className="mono faint" style={{ margin: "28px 0 10px" }}>The problem</h3>
                  <p className="body rv" style={{ margin: 0 }}>{p.problem}</p>
                </>
              )}
            </div>
            <div>
              {p.overview.map((t) => <p key={t} className="lead rv" style={{ margin: "0 0 18px" }}>{t}</p>)}
            </div>
          </div>
        </section>

        <section className="section-sm" aria-labelledby="built">
          <div className="wrap">
            <SectionHead n="02" label="what-i-built" title={<span id="built">What I <span className="serif acc">built</span></span>} />
            <div className="feat-grid">
              {p.features.map((f) => (
                <div key={f.title} className="feat">
                  <h3 className="disp">{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-sm" aria-labelledby="results">
          <div className="wrap grid-2" style={{ gap: "32px 64px", alignItems: "start" }}>
            <div>
              <Comment n="03" label="results" />
              <h2 id="results" className="disp h2 hw">Results</h2>
            </div>
            <ul className="checks">
              {p.outcomes.map((o) => <li key={o}><Check size={16} />{o}</li>)}
            </ul>
          </div>
        </section>

        <section className="section-sm" aria-labelledby="tech">
          <div className="wrap">
            <h2 id="tech" className="mono faint" style={{ margin: "0 0 16px" }}>Technology</h2>
            <div className="tags">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
            <p className="body" style={{ marginTop: 24 }}>
              See how this fits my wider <Link className="acc" to="/skills">tech stack</Link> and{" "}
              <Link className="acc" to="/experience">work experience</Link>.
            </p>
          </div>
        </section>
      </article>

      <nav className="section-sm" aria-label="More projects">
        <div className="wrap pager">
          <Link to={`/projects/${prev.slug}`}>
            <span className="mono faint" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><ArrowLeft size={14} /> Previous</span>
            <span className="disp" style={{ display: "block", marginTop: 10, fontSize: 20, fontWeight: 600 }}>{prev.name}</span>
          </Link>
          <Link to={`/projects/${next.slug}`} className="next">
            <span className="mono faint" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>Next <ArrowRight size={14} /></span>
            <span className="disp" style={{ display: "block", marginTop: 10, fontSize: 20, fontWeight: 600 }}>{next.name}</span>
          </Link>
        </div>
      </nav>
      <ContactCta />
    </>
  );
}
