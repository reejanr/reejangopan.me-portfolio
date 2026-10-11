import { Link } from "react-router-dom";
import { coreStack, experience, profile, projects, services, stats } from "@/data/site";
import { CodeWindow, ContactCta, Network, ProjectRow, Rich, SectionHead, Ticker } from "@/components/site/Parts";
import { ArrowRight, ArrowUpRight, Download } from "@/components/site/Icons";
import { useDubaiTime, useScramble } from "@/components/site/fx";

export default function Home() {
  const current = experience[0];
  const nameRef = useScramble<HTMLSpanElement>(profile.name, 350);
  const time = useDubaiTime();
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="grid-bg" aria-hidden="true" />
        <div className="scan" aria-hidden="true" />
        <div className="wrap hero-out" style={{ position: "relative" }}>
          <div className="hero-grid">
            <div>
              <p className="pill in" style={{ margin: 0 }}>
                <span className="dot" /><span>{profile.location}{time && <span className="clock"> · {time} GST</span>} · Open to {profile.openTo}</span>
              </p>
              <h1 id="hero-title" className="disp h1" style={{ marginTop: 28 }}>
                <span className="ln"><span ref={nameRef}>{profile.name}</span></span>{" "}
                <span className="in d1" style={{ display: "block", marginTop: 18, fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.2, letterSpacing: "-0.02em", fontWeight: 600 }}>
                  Software &amp; Systems <span className="serif acc" style={{ fontSize: "1.12em" }}>Engineer</span>
                </span>
              </h1>
              <p className="lead in d2" style={{ margin: "24px 0 0", maxWidth: 580, color: "var(--fg)" }}>{profile.tagline}</p>
              <p className="body in d3" style={{ margin: "14px 0 0", maxWidth: 580 }}>{profile.summary}</p>
              <div className="hero-actions in d4">
                <a className="btn btn-acc" href={profile.cv} download>Download CV <Download /></a>
                <Link className="btn btn-ghost" to="/projects">View projects <ArrowUpRight /></Link>
              </div>
            </div>
            <div className="in d2" style={{ position: "relative" }}>
              <Network />
              <CodeWindow />
            </div>
          </div>
          <div className="stats in d5">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="disp stat-v" style={{ margin: 0 }}>
                  <span className="sr-only">{`${s.prefix ?? ""}${s.value}${s.suffix}`}</span>
                  <span aria-hidden="true">
                    {s.prefix}<span className="count" style={{ ["--to" as string]: s.value }} />
                    <span className="acc">{s.suffix}</span>
                  </span>
                </p>
                <p className="stat-l" style={{ marginBottom: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker
        a={["React", "TypeScript", "JavaScript", "Python", "Node.js", "Next.js", "PostgreSQL", "Supabase", "MySQL", "MongoDB", "Express", "Flask", "ASP.NET Core", "Tailwind CSS"]}
        b={["AWS", "Azure", "Docker", "Linux", "CI/CD", "GitHub", "Vercel", "Cloudflare", "Microsoft 365", "Entra ID", "Windows Server", "Active Directory", "Gemini", "Vertex AI", "RAG", "Pinecone"]}
      />

      <section className="section" aria-labelledby="work-title">
        <div className="wrap">
          <SectionHead
            n="01" label="featured-work"
            title={<span id="work-title">Featured <span className="serif acc">work</span></span>}
            aside={<Link className="text-link" to="/projects">All projects <ArrowRight /></Link>}
          />
          <div>
            {projects.slice(0, 4).map((p, i) => <ProjectRow key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="xp-title">
        <div className="wrap">
          <SectionHead
            n="02" label="experience"
            title={<span id="xp-title">Experience</span>}
            aside={<Link className="text-link" to="/experience">Full experience <ArrowRight /></Link>}
          />
          <article className="xp">
            <div className="rv">
              <div className="xp-date">{current.period}</div>
              <span className="badge" style={{ marginTop: 14 }}><span className="dot" />Current</span>
              <div className="xp-head">HEAD → main</div>
            </div>
            <div>
              <h3 className="disp h3 rv">{current.role}</h3>
              <div className="xp-co rv">{current.company} · {current.location}</div>
              <ul className="stagger">
                {current.points.slice(0, 4).map((pt) => <li key={pt}><Rich text={pt} /></li>)}
              </ul>
            </div>
          </article>
          <div style={{ marginTop: 24 }}>
            <p className="body" style={{ margin: 0 }}>
              Previously: {experience.slice(1).map((e) => `${e.role} at ${e.company}`).join(" · ")}.{" "}
              <Link className="acc" to="/experience" style={{ fontWeight: 600 }}>See all roles →</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="stack-title" style={{ position: "relative", overflow: "hidden" }}>
        <div className="wm" aria-hidden="true">&lt;/&gt;</div>
        <div className="wrap" style={{ position: "relative" }}>
          <SectionHead
            n="03" label="stack"
            title={<span id="stack-title">Core <span className="serif acc">stack</span></span>}
            aside={<Link className="text-link" to="/skills">Full toolkit <ArrowRight /></Link>}
          />
          <ul className="stackgrid stagger" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {coreStack.map((t, i) => (
              <li key={t} className="sk spot">
                <span className="sk-i">{String(i + 1).padStart(2, "0")}</span>
                <span className="disp sk-t">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-title">
        <div className="wrap">
          <SectionHead
            n="04" label="services"
            title={<span id="svc-title">What I <span className="serif acc">build &amp; run</span></span>}
            aside={<Link className="text-link" to="/services">All services <ArrowRight /></Link>}
          />
          <ul className="svc-grid stagger">
            {services.map((s) => (
              <li key={s.id} className="rv">
                <Link to={`/services#${s.id}`} className="svc-card spot">
                  <span className="disp svc-card-t">{s.title}</span>
                  <span className="svc-card-d">{s.tools.slice(0, 4).join(" · ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
