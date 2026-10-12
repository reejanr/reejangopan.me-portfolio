import { Link, useParams } from "react-router-dom";
import { profile, projects, services } from "@/data/site";
import { guideByAsk, guideSlug, guideSummary } from "@/chat/guides";
import { Breadcrumbs, Comment, ProjectRow, SectionHead } from "@/components/site/Parts";
import { LeadCta } from "@/components/site/LeadCta";
import { ArrowRight, Check } from "@/components/site/Icons";
import NotFound from "./NotFound";

const STEPS = [
  ["Discovery call", "Your goals, team, current tools and what's slowing you down."],
  ["Audit & plan", "A clear roadmap with priorities, timeline and costs — agreed with you."],
  ["Build & set up", "Delivered in phases so the business keeps running."],
  ["Train & document", "Guides and handover so your team is confident."],
  ["Support & improve", "Monitoring, updates and new improvements as you grow."],
];

export default function ServiceDetail() {
  const { id } = useParams();
  const idx = services.findIndex((s) => s.id === id);
  if (idx === -1) return <NotFound />;
  const s = services[idx];
  const proof = s.related.map((slug) => projects.find((p) => p.slug === slug)).filter((p): p is (typeof projects)[number] => !!p);
  const related = s.guides.map(guideByAsk).filter((g): g is NonNullable<ReturnType<typeof guideByAsk>> => !!g);
  const others = services.filter((x) => x.id !== s.id);

  return (
    <>
      <section className="section-sm" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Services", to: "/services" }, { name: s.title }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n={String(idx + 1).padStart(2, "0")} label="service" />
            <h1 id="page-title" className="disp h2 hw" style={{ maxWidth: 980 }}>{s.seoTitle}</h1>
            <p className="lead" style={{ maxWidth: 780, marginTop: 24 }}>{s.text}</p>
            <div className="hero-actions">
              <a className="btn btn-acc" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Enquiry: ${s.title}`)}`}>Get a free consultation</a>
              <a className="btn btn-ghost" href={`${profile.whatsapp}?text=${encodeURIComponent(`Hi Reejan, I'm interested in ${s.title}.`)}`} target="_blank" rel="noopener noreferrer">WhatsApp Reejan</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="included">
        <div className="wrap grid-2" style={{ gap: "32px 64px", alignItems: "start" }}>
          <div>
            <Comment n="01" label="included" />
            <h2 id="included" className="disp h2 hw">What's <span className="serif acc">included</span></h2>
            <div className="tags stagger" style={{ marginTop: 24 }}>{s.tools.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </div>
          <ul className="checks stagger">
            {s.points.map((pt) => <li key={pt}><Check size={16} />{pt}</li>)}
          </ul>
        </div>
      </section>

      <section className="section-sm" aria-labelledby="how">
        <div className="wrap">
          <SectionHead n="02" label="how-it-works" title={<span id="how">How it <span className="serif acc">works</span></span>} />
          <ol className="steps stagger">
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <span className="steps-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="disp">{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {proof.length > 0 && (
        <section className="section-sm" aria-labelledby="proof">
          <div className="wrap">
            <SectionHead n="03" label="proof" title={<span id="proof">Related <span className="serif acc">work</span></span>} />
            {proof.map((p) => <ProjectRow key={p.slug} p={p} i={projects.indexOf(p)} />)}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-sm" aria-labelledby="guides">
          <div className="wrap">
            <SectionHead n="04" label="guides" title={<span id="guides">Helpful <span className="serif acc">guides</span></span>}
              aside={<Link className="text-link" to="/guides">All guides <ArrowRight /></Link>} />
            <ul className="guide-grid stagger">
              {related.map((g) => (
                <li key={g.ask}>
                  <Link className="guide-card spot" to={`/guides/${guideSlug(g.ask)}`}>
                    <h3 className="disp">{g.ask}</h3>
                    <p>{guideSummary(g, 110)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-sm" aria-label="Contact">
        <div className="wrap">
          <LeadCta topic={s.title} title={`Need ${s.title.toLowerCase()}?`} />
          <nav aria-label="Other services" style={{ marginTop: 48 }}>
            <p className="mono faint" style={{ margin: "0 0 14px" }}>Other services</p>
            <div className="tags">
              {others.map((o) => <Link key={o.id} className="tag" to={`/services/${o.id}`}>{o.title}</Link>)}
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
