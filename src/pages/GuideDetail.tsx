import { Link, useParams } from "react-router-dom";
import { profile } from "@/data/site";
import { guideByAsk, guideBySlug, guides, guideSlug, guideSummary, topicLabels } from "@/chat/guides";
import { Breadcrumbs, Comment } from "@/components/site/Parts";
import { RichText } from "@/components/site/RichText";
import { LeadCta } from "@/components/site/LeadCta";
import { ArrowLeft } from "@/components/site/Icons";
import NotFound from "./NotFound";

export default function GuideDetail() {
  const { slug } = useParams();
  const g = slug ? guideBySlug(slug) : undefined;
  if (!g) return <NotFound />;
  const related = (g.next ?? []).map(guideByAsk).filter((x): x is NonNullable<typeof x> => !!x);
  const more = guides.filter((x) => x.topic === g.topic && x.ask !== g.ask && !related.includes(x)).slice(0, 3);

  return (
    <>
      <article className="section-sm" aria-labelledby="page-title">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <Breadcrumbs items={[{ name: "Guides", to: "/guides" }, { name: g.ask }]} />
          <header style={{ marginTop: 32 }}>
            <Comment n="guide" label={g.topic} />
            <Link className="tag" to={`/guides#${g.topic}`}>{topicLabels[g.topic]}</Link>
            <h1 id="page-title" className="disp h2 hw" style={{ marginTop: 18 }}>{g.ask}</h1>
            <p className="byline">
              By <Link to="/about">{profile.name}</Link> · {profile.title}, {profile.location}
            </p>
          </header>
          <RichText text={g.a} />
        </div>
      </article>

      {(related.length > 0 || more.length > 0) && (
        <section className="section-sm" aria-labelledby="related" style={{ paddingTop: 0 }}>
          <div className="wrap" style={{ maxWidth: 880 }}>
            <h2 id="related" className="mono faint" style={{ margin: "0 0 16px" }}>Related guides</h2>
            <ul className="guide-grid">
              {[...related, ...more].slice(0, 4).map((r) => (
                <li key={r.ask}>
                  <Link className="guide-card spot" to={`/guides/${guideSlug(r.ask)}`}>
                    <h3 className="disp">{r.ask}</h3>
                    <p>{guideSummary(r, 100)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-sm" aria-label="Contact">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <LeadCta topic={g.ask.replace(/\?$/, "")} title="Want help putting this into practice?" />
          <p style={{ marginTop: 32 }}>
            <Link className="text-link" to="/guides"><ArrowLeft /> All guides</Link>
          </p>
        </div>
      </section>
    </>
  );
}
