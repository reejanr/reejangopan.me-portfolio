import { Link } from "react-router-dom";
import { guides, guideSlug } from "@/chat/guides";
import {
  agentRules, antiPatterns, auditSteps, controls, dataRules, lenses, loadSteps, matrix, migrationSteps, overlays,
  pipeline, plumbing, principles, references, reliability, roadmap, scaleLadder, signals, stackLayers, testLayers,
  threats, traffic, type Card, type Row,
} from "@/data/playbook";
import { Breadcrumbs, Comment, ScrollBand, SectionHead } from "@/components/site/Parts";
import { LeadCta } from "@/components/site/LeadCta";
import { Check } from "@/components/site/Icons";

const Cards = ({ items }: { items: Card[] }) => (
  <ul className="pb-cards stagger">
    {items.map((c) => (
      <li key={c.title} className="pb-card spot">
        <h3 className="disp">{c.title}</h3>
        <p>{c.text}</p>
      </li>
    ))}
  </ul>
);

const Rows = ({ rows, heads }: { rows: Row[]; heads?: [string, string, string?] }) => (
  <div className="pb-table rv" role="table">
    {heads && (
      <div className="pb-tr pb-th" role="row">
        <span role="columnheader">{heads[0]}</span><span role="columnheader">{heads[1]}</span>
        {heads[2] && <span role="columnheader">{heads[2]}</span>}
      </div>
    )}
    {rows.map((r) => (
      <div key={r.a} className="pb-tr" role="row">
        <b role="cell">{r.a}</b><span role="cell">{r.b}</span>{r.c !== undefined && <span role="cell">{r.c}</span>}
      </div>
    ))}
  </div>
);

const Checks = ({ items }: { items: string[] }) => (
  <ul className="checks stagger" style={{ maxWidth: 900 }}>
    {items.map((f) => <li key={f}><Check size={16} />{f}</li>)}
  </ul>
);

const Flow = ({ steps }: { steps: string[] }) => (
  <ol className="pb-flow stagger">
    {steps.map((s, i) => <li key={s}><i>{i + 1}</i><span>{s}</span></li>)}
  </ol>
);

function Block({ n, label, title, lead, children }: { n: string; label: string; title: React.ReactNode; lead?: string; children: React.ReactNode }) {
  return (
    <section className="section-sm" id={label} aria-label={label}>
      <div className="wrap">
        <SectionHead n={n} label={label} title={title} />
        {lead && <p className="body rv" style={{ maxWidth: 760, margin: "0 0 28px" }}>{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export default function EngineeringPlaybook() {
  const eng = guides.filter((g) => g.topic === "engineering");
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Engineering playbook" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="00" label="engineering-playbook" />
            <h1 id="page-title" className="disp h1 hw" style={{ maxWidth: 1000 }}>
              Software Engineering <span className="serif acc">Handbook</span>
            </h1>
            <p className="lead" style={{ maxWidth: 780, marginTop: 24 }}>
              A reference for building and operating production-grade systems: architecture, data integrity, security,
              scalability, reliability and delivery governance, with an evidence-based method for auditing them.
            </p>
            <div className="pb-core rv">
              <b>Core principle</b>
              <p>
                Build the simplest architecture that meets verified reliability, security and throughput goals. Prove
                readiness with measurements, repeatable tests and safe operations — not with the number of
                technologies installed.
              </p>
            </div>
            <nav className="tags" aria-label="Playbook sections" style={{ marginTop: 28 }}>
              {["foundations", "capacity", "architecture", "data", "security", "reliability", "delivery", "roadmap", "audit"].map((s) => (
                <a key={s} className="tag" href={`#${s}`}>{s}</a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <ScrollBand
        a={["Architecture", "Security", "Scalability", "Reliability", "Observability", "CI/CD"]}
        b={["Data integrity", "Idempotency", "Zero downtime", "Threat modelling", "SRE", "Load testing"]}
      />

      <Block n="01" label="foundations" title={<>What “enterprise-grade” <span className="serif acc">really means</span></>}
        lead="Reliable correctness under retries, races and outages; protected data; predictable latency and cost; recoverability; clear ownership; and economics that fit the business.">
        <Cards items={principles} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>Eight lenses for every design review</h3>
        <Rows rows={lenses} />
        <p className="body rv" style={{ maxWidth: 760, marginTop: 24 }}>
          Every non-trivial decision gets an <Link className="acc" to="/guides/how-do-i-document-architecture-decisions-adrs">architecture decision record</Link>:
          context, at least two alternatives, constraints, the choice, expected signals, and a rollback plan.
        </p>
      </Block>

      <Block n="02" label="capacity" title={<>Planning for <span className="serif acc">100,000 users</span></>}
        lead="Daily users, concurrent sessions, in-flight requests and RPS are not interchangeable — model the workload, then prove it.">
        <Rows rows={traffic} heads={["Term", "Meaning", "Engineering consequence"]} />
        <figure className="ide snippet rv" style={{ margin: "32px 0 0", maxWidth: 760 }}>
          <div className="ide-bar"><i /><i /><i /><figcaption className="code-font" style={{ marginLeft: 10, fontSize: 12, color: "#8e939a" }}>capacity-model</figcaption></div>
          <pre className="code"><code>{[
            "rps = users × actions_per_min × api_calls_per_action ÷ 60",
            "",
            "// illustration — not a benchmark:",
            "100,000 users × 1 action / 30 s  ≈ 3,333 actions/s",
            "× 4 uncached API calls            ≈ 13,333 API req/s",
            "// …before retries, bots and background jobs",
            "",
            "99.9%  uptime ≈ 43.2 min downtime / 30 days",
            "99.95% uptime ≈ 21.6 min downtime / 30 days",
          ].join("\n")}</code></pre>
        </figure>
        <h3 className="disp h4 rv" style={{ margin: "40px 0 16px" }}>The load-test sequence</h3>
        <Flow steps={loadSteps} />
        <p className="body rv" style={{ maxWidth: 760, marginTop: 20 }}>
          Never claim capacity that has not been demonstrated by a workload test and a recovery test at the target.
        </p>
      </Block>

      <Block n="03" label="architecture" title={<>A reference architecture, <span className="serif acc">layer by layer</span></>}
        lead="A representative scalable workload. Use managed services where possible — it is a map, not a shopping list.">
        <Cards items={stackLayers} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>What to adopt now, later, or almost never</h3>
        <div className="pb-tiers stagger">
          {matrix.map((m) => (
            <div key={m.tier} className={`pb-tier ${m.tone}`}>
              <b>{m.tier}</b><p>{m.items}</p>
            </div>
          ))}
        </div>
        <p className="body rv" style={{ maxWidth: 760, marginTop: 24 }}>
          Modular monolith first. Kubernetes, microservices and sharding are justified by measurements and team shape,
          not by appearances — see <Link className="acc" to="/guides/do-i-need-kubernetes-microservices-or-sharding">when they make sense</Link>.
        </p>
      </Block>

      <Block n="04" label="data" title={<>Data, ACID <span className="serif acc">and consistency</span></>}
        lead="A correctness-first model: invariants live in the database, and everything that can be retried must be safe to retry.">
        <Checks items={dataRules} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>Scaling a database — in order</h3>
        <Rows rows={scaleLadder} heads={["Technique", "Use when", "Hazard"]} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>Zero-downtime schema changes</h3>
        <Flow steps={migrationSteps} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>Cache, queues, files, search and APIs</h3>
        <Cards items={plumbing} />
      </Block>

      <Block n="05" label="security" title={<>Security, privacy <span className="serif acc">and abuse defence</span></>}
        lead="No system can promise to be unhackable. A defensible claim is that known risks are systematically reduced, tested, monitored and recoverable.">
        <h3 className="disp h4 rv" style={{ margin: "0 0 16px" }}>Threats to design against</h3>
        <Checks items={threats} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>Preventive, detective and recovery controls</h3>
        <Rows rows={controls} />
        <p className="body rv" style={{ maxWidth: 760, marginTop: 24 }}>
          Classify data as public, internal, confidential or highly sensitive; keep ID documents and payroll in private
          storage with signed access; review UAE and cross-border obligations with counsel. Verify against OWASP ASVS 5.0,
          the OWASP Top 10:2025 and the OWASP API Security Top 10.
        </p>
      </Block>

      <Block n="06" label="reliability" title={<>Reliability, SRE <span className="serif acc">and recovery</span></>}
        lead="Design around failure: every dependency will eventually be slow, down or wrong.">
        <Cards items={reliability} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>The golden signals</h3>
        <Rows rows={signals} />
        <p className="body rv" style={{ maxWidth: 760, marginTop: 24 }}>
          Give each critical journey an SLI, an SLO, an error budget, an owner and a dashboard. State RPO and RTO per
          datastore, keep encrypted backups in an independent failure domain, and test the <em>restore</em> — a
          successful backup is not proof of a successful recovery.
        </p>
      </Block>

      <Block n="07" label="delivery" title={<>CI/CD, testing <span className="serif acc">and teamwork</span></>}
        lead="A change reaches production only through a pipeline that proves it is safe — with humans approving what is destructive.">
        <Flow steps={pipeline} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>The test pyramid</h3>
        <Rows rows={testLayers} />
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>Many engineers (and AI agents), one codebase</h3>
        <Checks items={agentRules} />
      </Block>

      <Block n="08" label="roadmap" title={<>A rollout roadmap <span className="serif acc">by risk</span></>}
        lead="Sequence the work by risk and evidence, not by technology fashion.">
        <ol className="pb-road stagger">
          {roadmap.map((r) => (
            <li key={r.p}>
              <span className="pb-p">{r.p}</span>
              <div>
                <h3 className="disp">{r.name}</h3>
                <p>{r.text}</p>
                <small><Check size={13} /> Exit: {r.exit}</small>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>Anti-patterns to catch early</h3>
        <Checks items={antiPatterns} />
      </Block>

      <Block n="09" label="audit" title={<>Auditing a system <span className="serif acc">with evidence</span></>}
        lead="Audit first, redesign later. A dependency being installed proves nothing — verified configuration, tests and telemetry do.">
        <Cards items={auditSteps} />
        <p className="body rv" style={{ maxWidth: 760, marginTop: 24 }}>
          Findings are ranked P0 (exploitable compromise or data corruption) to P3 (enhancement); maturity is scored 0–5
          only when evidence backs it, and “unverified” is always an acceptable answer.
        </p>
        <h3 className="disp h4 rv" style={{ margin: "48px 0 16px" }}>Domain checklists</h3>
        <Cards items={overlays} />
      </Block>

      <Block n="10" label="go-deeper" title={<>Go <span className="serif acc">deeper</span></>}
        lead={`${eng.length} detailed guides cover each topic above — also available to ask the Devv assistant on this site.`}>
        <ul className="guide-grid stagger">
          {eng.map((g) => (
            <li key={g.ask}>
              <Link className="guide-card spot" to={`/guides/${guideSlug(g.ask)}`}>
                <h3 className="disp">{g.ask}</h3>
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mono faint" style={{ margin: "40px 0 12px" }}>Standards referenced</h3>
        <ul className="tags">
          {references.map((r) => (
            <li key={r.url} style={{ listStyle: "none" }}>
              <a className="tag" href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
            </li>
          ))}
        </ul>
      </Block>

      <section className="section-sm" aria-label="Contact">
        <div className="wrap"><LeadCta /></div>
      </section>
    </>
  );
}
