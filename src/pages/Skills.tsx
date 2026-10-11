import { certifications, coreStack, education, expanding, languages, toolkit } from "@/data/site";
import { Breadcrumbs, Comment, ContactCta, SectionHead } from "@/components/site/Parts";
import { Check } from "@/components/site/Icons";

export default function Skills() {
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title" style={{ position: "relative", overflow: "hidden" }}>
        <div className="wm" aria-hidden="true">&lt;/&gt;</div>
        <div className="wrap" style={{ position: "relative" }}>
          <Breadcrumbs items={[{ name: "Skills" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="03" label="stack" />
            <h1 id="page-title" className="disp h1 hw">Skills &amp; <span className="serif acc">stack</span></h1>
            <p className="lead" style={{ maxWidth: 680, marginTop: 24 }}>
              The languages, frameworks, cloud platforms and systems I use to build and run production software.
            </p>
          </div>
          <h2 className="mono faint" style={{ margin: "56px 0 16px" }}>Daily drivers</h2>
          <ul className="stackgrid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {coreStack.map((t, i) => (
              <li key={t} className="sk">
                <span className="sk-i">{String(i + 1).padStart(2, "0")}</span>
                <span className="disp sk-t">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="toolkit">
        <div className="wrap">
          <SectionHead n="04" label="full-toolkit" title={<span id="toolkit">Full <span className="serif acc">toolkit</span></span>} />
          <dl style={{ margin: 0 }}>
            {toolkit.map((r) => (
              <div key={r.label} className="skrow"><dt>{r.label}</dt><dd>{r.value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="edu">
        <div className="wrap">
          <SectionHead n="05" label="education" title={<span id="edu">Education &amp; <span className="serif acc">certifications</span></span>} />
          <div className="grid-3">
            <div className="rv">
              <div className="panel">
                <h3 className="mono acc" style={{ margin: 0 }}>Education</h3>
                <p className="disp" style={{ margin: "20px 0 0", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25 }}>{education.degree}</p>
                <p className="body" style={{ margin: "10px 0 0" }}>{education.school}, {education.location}</p>
                <p className="code-font faint" style={{ margin: "14px 0 0", fontSize: 13 }}>{education.period}</p>
              </div>
            </div>
            <div className="rv s2">
              <div className="panel">
                <h3 className="mono acc" style={{ margin: "0 0 8px" }}>Certifications</h3>
                {certifications.map((c) => (
                  <div key={c.name} className="cert"><Check size={16} /><span>{c.name} <span className="faint">— {c.issuer}</span></span></div>
                ))}
              </div>
            </div>
            <div className="rv s3">
              <div className="panel">
                <h3 className="mono acc" style={{ margin: 0 }}>Languages</h3>
                <dl style={{ margin: "16px 0 0" }}>
                  {languages.map((l) => (
                    <div key={l.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                      <dt className="disp" style={{ fontSize: 20, fontWeight: 600 }}>{l.name}</dt>
                      <dd className="code-font faint" style={{ margin: 0, fontSize: 12 }}>{l.level}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 64 }}>
            <h2 className="mono faint" style={{ margin: "0 0 20px" }}>
              <span className="code-font acc" style={{ textTransform: "none", letterSpacing: 0 }}>$ git checkout -b</span> currently-expanding
            </h2>
            <div className="exp">{expanding.map((e) => <span key={e}>{e}</span>)}</div>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
