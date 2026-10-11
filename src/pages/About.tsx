import { Link } from "react-router-dom";
import { about, faqs, profile } from "@/data/site";
import { Breadcrumbs, Comment, ContactCta, SectionHead } from "@/components/site/Parts";
import { ArrowRight, Download } from "@/components/site/Icons";

export default function About() {
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "About" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="00" label="about" />
            <h1 id="page-title" className="disp h1 hw">About <span className="serif acc">Reejan</span></h1>
            <p className="lead" style={{ maxWidth: 820, marginTop: 28, color: "var(--fg)" }}>{about.intro}</p>
          </div>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="story">
        <div className="wrap grid-2" style={{ gap: "32px 64px", alignItems: "start" }}>
          <div>
            <h2 id="story" className="disp h3 rv">Software engineering, wired into real operations</h2>
            <div className="hero-actions" style={{ marginTop: 28 }}>
              <a className="btn btn-acc" href={profile.cv} download>Download CV <Download /></a>
              <Link className="btn btn-ghost" to="/experience">Experience</Link>
            </div>
          </div>
          <div>
            {about.paragraphs.map((t) => <p key={t} className="body rv" style={{ margin: "0 0 18px", fontSize: 17 }}>{t}</p>)}
          </div>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="how">
        <div className="wrap">
          <SectionHead n="01" label="how-i-work" title={<span id="how">How I <span className="serif acc">work</span></span>} />
          <ol className="tags" style={{ listStyle: "none", padding: 0, margin: 0, gap: 10 }}>
            {about.lifecycle.map((s, i) => (
              <li key={s} className="tag rv" style={{ fontSize: 14, padding: "10px 14px" }}>
                <span className="acc">{String(i + 1).padStart(2, "0")}</span> {s}
              </li>
            ))}
          </ol>
          <div className="feat-grid" style={{ marginTop: 48 }}>
            {about.differentiators.map((d) => (
              <div key={d.title} className="feat">
                <h3 className="disp">{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
          <p className="lead rv" style={{ marginTop: 40, maxWidth: 820 }}>{about.direction}</p>
          <p className="body" style={{ marginTop: 16 }}>
            See the <Link className="acc" to="/projects">projects</Link> and the full{" "}
            <Link className="acc" to="/skills">tech stack</Link>.
          </p>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="faq">
        <div className="wrap">
          <SectionHead n="02" label="faq" title={<span id="faq">Frequently asked <span className="serif acc">questions</span></span>} />
          <div>
            {faqs.map((f) => (
              <details key={f.q} className="faq">
                <summary className="disp">{f.q}<ArrowRight size={18} className="faq-ic" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
