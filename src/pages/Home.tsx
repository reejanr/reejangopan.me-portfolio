import { Link } from "react-router-dom";
import { coreStack, experience, hero, practices, profile, projects, services, stats } from "@/data/site";
import { routes } from "@/seo/seo";
import { CodeWindow, ContactCta, Network, ProjectRow, Rich, ScrollBand, SectionHead, Ticker } from "@/components/site/Parts";
import { ArrowRight, ArrowUpRight, Download } from "@/components/site/Icons";
import { guides, guideSlug } from "@/chat/guides";
import { principles, roadmap } from "@/data/playbook";
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
                  Full-Stack Software <span className="serif acc" style={{ fontSize: "1.12em" }}>Engineer</span>
                </span>
              </h1>
              <p className="in d2" style={{ margin: "20px 0 0", fontFamily: "\"JetBrains Mono\", \"Mono Fallback\", monospace", fontSize: 14, letterSpacing: "0.02em", color: "var(--acc-ink)" }}>{hero.focus.join(" • ")}</p>
              <p className="lead in d2" style={{ margin: "16px 0 0", maxWidth: 580, color: "var(--fg)" }}>{hero.tagline}</p>
              <ul className="tags in d3" style={{ margin: "18px 0 0", padding: 0, listStyle: "none" }}>
                {hero.chips.map((c) => <li key={c} className="tag">{c}</li>)}
              </ul>
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
          <p className="scroll-hint in d5" aria-hidden="true"><span>$ scroll --down</span><i /></p>
          <div className="stats in d5">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="disp stat-v" style={{ margin: 0 }}>
                  <span className="sr-only">{`${s.prefix ?? ""}${s.value}${s.suffix}`}</span>
                  <span className="count" aria-hidden="true" data-p={s.prefix ?? ""} data-s={s.suffix} style={{ ["--to" as string]: s.value }} />
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

      <section className="section" aria-labelledby="case-title">
        <div className="wrap">
          <SectionHead
            n="02" label="featured-case-study"
            title={<span id="case-title">Featured <span className="serif acc">case study</span></span>}
            aside={<Link className="text-link" to={`/projects/${projects[0].slug}`}>Read the case study <ArrowRight /></Link>}
          />
          <div className="grid-2 rv" style={{ gap: "28px 64px", alignItems: "start" }}>
            <div>
              <h3 className="disp h3" style={{ margin: 0 }}>{projects[0].name}</h3>
              <p className="mono faint" style={{ margin: "10px 0 0" }}>{projects[0].status} · {projects[0].role}</p>
              <p className="body" style={{ margin: "18px 0 0" }}>{projects[0].problem}</p>
            </div>
            <div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {projects[0].features.slice(0, 4).map((f) => (
                  <li key={f.title} className="body" style={{ margin: "0 0 10px" }}><strong>{f.title}.</strong> {f.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="practices-title">
        <div className="wrap">
          <SectionHead n="03" label="engineering-practices" title={<span id="practices-title">Engineering <span className="serif acc">practices</span></span>} />
          <dl className="stagger" style={{ margin: 0 }}>
            {practices.map((p) => (
              <div key={p.title} className="skrow"><dt>{p.title}</dt><dd>{p.text}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="handbook-title">
        <div className="wrap">
          <SectionHead
            n="03+" label="engineering-handbook"
            title={<span id="handbook-title">Software engineering <span className="serif acc">handbook</span></span>}
            aside={<Link className="text-link" to="/engineering-playbook">Read the handbook <ArrowRight /></Link>}
          />
          <p className="lead rv" style={{ maxWidth: 760, margin: 0 }}>
            Architecture, data integrity, security, scalability, reliability and delivery — the methods behind production-grade systems, explained in full.
          </p>
          <ul className="pb-cards stagger" style={{ marginTop: 32 }}>
            {principles.map((c) => (
              <li key={c.title} className="pb-card spot"><h3 className="disp">{c.title}</h3><p>{c.text}</p></li>
            ))}
          </ul>
          <ol className="pb-road stagger" style={{ marginTop: 24 }}>
            {roadmap.slice(0, 3).map((r) => (
              <li key={r.p}><span className="pb-p">{r.p}</span><div><h3 className="disp">{r.name}</h3><p>{r.text}</p></div></li>
            ))}
          </ol>
          <ul className="tags stagger" style={{ margin: "24px 0 0", padding: 0, listStyle: "none" }}>
            {["Architecture", "Data integrity", "Security", "Scalability", "Reliability & SRE", "CI/CD", "Testing", "Cloud & DevOps", "Audits"].map((t) => <li key={t} className="tag">{t}</li>)}
          </ul>
          <div className="rv" style={{ marginTop: 28 }}>
            <Link className="btn btn-acc" to="/engineering-playbook">Open the engineering handbook <ArrowUpRight /></Link>
            {" "}<a className="btn btn-ghost" href="/system-design/">Try the system design course <ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ai-title">
        <div className="wrap">
          <SectionHead
            n="04" label="ai-engineering"
            title={<span id="ai-title">AI engineering <span className="serif acc">&amp; automation</span></span>}
            aside={<Link className="text-link" to="/ai-engineering">AI engineering <ArrowRight /></Link>}
          />
          <p className="lead rv" style={{ maxWidth: 760, margin: 0 }}>
            Retrieval-grounded assistants, role-aware access and AI-assisted development, built so the application, not the model, decides who sees what.
          </p>
          <ul className="tags stagger" style={{ margin: "24px 0 0", padding: 0, listStyle: "none" }}>
            {["LLM API integration", "BM25 retrieval", "Role-aware retrieval", "AI-assisted development", "Process automation"].map((t) => <li key={t} className="tag">{t}</li>)}
          </ul>
          <div className="rv" style={{ marginTop: 28 }}>
            <Link className="btn btn-acc" to="/devv">Explore Devv AI</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="xp-title">
        <div className="wrap">
          <SectionHead
            n="05" label="experience"
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

      <section className="section" aria-labelledby="evidence-title">
        <div className="wrap">
          <SectionHead n="06" label="evidence" title={<span id="evidence-title">The work, <span className="serif acc">in numbers</span></span>} />
          <div className="stats stagger">
            {[
              { v: "6", l: "WAQTI operational roles documented in the case study" },
              { v: "4", l: "USF Group websites built and run" },
              { v: String(projects.length), l: "Featured projects, each with its own case study" },
              { v: String(routes.length), l: "Pages prerendered on this portfolio's last build" },
            ].map((e) => (
              <div key={e.l}>
                <p className="disp stat-v" style={{ margin: 0 }}>{e.v}</p>
                <p className="stat-l" style={{ marginBottom: 0 }}>{e.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="stack-title" style={{ position: "relative", overflow: "hidden" }}>
        <div className="wm" aria-hidden="true">&lt;/&gt;</div>
        <div className="wrap" style={{ position: "relative" }}>
          <SectionHead
            n="07" label="stack"
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

      <section className="section" aria-labelledby="writing-title">
        <div className="wrap">
          <SectionHead
            n="08" label="technical-writing"
            title={<span id="writing-title">Technical <span className="serif acc">writing</span></span>}
            aside={<Link className="text-link" to="/guides">All guides <ArrowRight /></Link>}
          />
          <ul className="svc-grid stagger">
            {guides.slice(0, 3).map((g) => (
              <li key={g.ask} className="rv">
                <Link to={`/guides/${guideSlug(g.ask)}`} className="svc-card spot">
                  <span className="disp svc-card-t">{g.ask}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="body" style={{ marginTop: 20 }}>
            See also <Link className="acc" to="/how-this-site-is-built">how this site is built</Link>, including its BM25 assistant.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-title">
        <div className="wrap">
          <SectionHead
            n="09" label="services"
            title={<span id="svc-title">What I <span className="serif acc">build &amp; run</span></span>}
            aside={<Link className="text-link" to="/services">All services <ArrowRight /></Link>}
          />
          <ul className="svc-grid stagger">
            {services.map((s) => (
              <li key={s.id} className="rv">
                <Link to={`/services/${s.id}`} className="svc-card spot">
                  <span className="disp svc-card-t">{s.title}</span>
                  <span className="svc-card-d">{s.tools.slice(0, 4).join(" · ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ScrollBand a={["AI", "Code", "Secure", "Automate"]} b={["Build", "Deploy", "Cloud", "Systems"]} />

      <ContactCta />
    </>
  );
}
