import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/site";
import { ArrowUpRight, Check } from "./Icons";

// "// 01 · featured-work" comment that types out on scroll.
export function Comment({ n, label }: { n: string; label: string }) {
  const text = `// ${n} · ${label}`;
  return (
    <span className="cmt" style={{ ["--c" as string]: text.length }} aria-hidden="true">
      // <b>{n}</b> · {label}
    </span>
  );
}

export function SectionHead({
  n, label, title, aside, as: Tag = "h2",
}: { n: string; label: string; title: ReactNode; aside?: ReactNode; as?: "h1" | "h2" }) {
  return (
    <>
      <Comment n={n} label={label} />
      <div className="sec-head">
        <Tag className="disp h2 hw">{title}</Tag>
        {aside}
      </div>
    </>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map((it) => (
          <li key={it.name}>
            {it.to ? <Link to={it.to}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ProjectRow({ p, i, headingLevel = 3 }: { p: Project; i: number; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link className="proj rv" to={`/projects/${p.slug}`} aria-label={`${p.name} — read case study`}>
      <span className="scanl" aria-hidden="true" />
      <span className="proj-n">{String(i + 1).padStart(2, "0")}</span>
      <div>
        <H className="disp proj-t">{p.name}</H>
        <div className="proj-meta"><span>{p.category}</span><span>·</span><span>{p.status}</span></div>
        <p className="proj-d">{p.short}</p>
        {p.result && (
          <div className="proj-m"><Check size={14} />{p.result}</div>
        )}
        <div className="tags">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      </div>
      <ArrowUpRight size={28} className="proj-a" />
    </Link>
  );
}

// Renders **bold** segments from the content file.
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((s, i) => (i % 2 ? <strong key={i}>{s}</strong> : s))}</>;
}

export function CodeWindow() {
  const lines: { n: number; t: number; d: number; c: ReactNode }[] = [
    { n: 16, t: 0.35, d: 0.6, c: <><span className="k">const</span> <span className="v">reejan</span> <span className="p">=</span> <span className="p">{"{"}</span></> },
    { n: 38, t: 0.75, d: 1.0, c: <>{"  role"}<span className="p">:</span> <span className="s">"Software &amp; Systems Engineer"</span><span className="p">,</span></> },
    { n: 32, t: 0.65, d: 1.8, c: <>{"  stack"}<span className="p">:</span> <span className="p">[</span><span className="s">"React"</span><span className="p">,</span> <span className="s">"TypeScript"</span><span className="p">,</span></> },
    { n: 40, t: 0.8, d: 2.5, c: <>{"    "}<span className="s">"PostgreSQL"</span><span className="p">,</span> <span className="s">"Supabase"</span><span className="p">,</span> <span className="s">"Python"</span><span className="p">],</span></> },
    { n: 25, t: 0.5, d: 3.35, c: <>{"  cloud"}<span className="p">:</span> <span className="p">[</span><span className="s">"AWS"</span><span className="p">,</span> <span className="s">"Azure"</span><span className="p">],</span></> },
    { n: 22, t: 0.45, d: 3.9, c: <>{"  based"}<span className="p">:</span> <span className="s">"Dubai, UAE"</span><span className="p">,</span></> },
    { n: 2, t: 0.05, d: 4.4, c: <span className="p">{"};"}</span> },
    { n: 1, t: 0.01, d: 4.5, c: " " },
    { n: 15, t: 0.35, d: 4.9, c: <><span className="p">$</span> npm run build</> },
    { n: 25, t: 0.01, d: 5.7, c: <><span className="ok">✓</span> 200+ routes prerendered</> },
    { n: 15, t: 0.35, d: 6.1, c: <><span className="p">$</span> deploy --prod</> },
    { n: 20, t: 0.01, d: 6.9, c: <><span className="ok">✓</span> live in production</> },
  ];
  return (
    <div className="ide">
      <div className="ide-bar">
        <i /><i /><i />
        <span className="code-font" style={{ marginLeft: 10, fontSize: 12, color: "#8e939a" }}>reejan.ts</span>
      </div>
      <div className="code" role="img" aria-label="Code snippet: role Software & Systems Engineer; stack React, TypeScript, PostgreSQL, Supabase, Python; cloud AWS, Azure; based in Dubai, UAE.">
        {lines.map((l, i) => (
          <span key={i} className="tl" style={{ ["--n" as string]: l.n, ["--t" as string]: `${l.t}s`, ["--d" as string]: `${l.d}s` }}>
            {l.c}
          </span>
        ))}
        <span style={{ display: "block" }}><span className="p">$</span> <span className="caret" /></span>
      </div>
    </div>
  );
}

export function Network() {
  return (
    <svg className="net" viewBox="0 0 520 460" aria-hidden="true" focusable="false">
      <path d="M40 60 L180 30 L320 90 L480 50" />
      <path d="M180 30 L220 200 L320 90" />
      <path d="M40 60 L80 260 L220 200 L420 260 L480 50" />
      <path d="M80 260 L200 420 L420 260" />
      <path className="pulse" d="M40 60 L180 30 L320 90 L480 50" />
      <path className="pulse p2" d="M80 260 L220 200 L420 260 L480 50" />
      <path className="pulse p3" d="M180 30 L220 200 L200 420" />
      {[[40, 60], [180, 30, 1], [320, 90], [480, 50, 1], [80, 260], [220, 200, 1], [420, 260], [200, 420]].map(([x, y, on], i) => (
        <circle key={i} className={on ? "on" : undefined} cx={x} cy={y} r="4" />
      ))}
    </svg>
  );
}

export function Ticker({ a, b }: { a: string[]; b: string[] }) {
  // Each row is rendered twice so the loop is seamless (the track moves by exactly half its width).
  const row = (items: string[], cls: string, outlineEven: boolean) => (
    <div className="marquee" aria-hidden="true">
      <div className={`track disp ${cls}`}>
        {[...items, ...items].map((t, i) => (
          <span key={t + i} className={(i % 2 === 0) === outlineEven ? "o" : undefined}>{t}</span>
        ))}
      </div>
    </div>
  );
  return (
    <section className="ticker" aria-label="Technologies">
      <p className="sr-only">Technologies: {[...a, ...b].join(", ")}.</p>
      {row(a, "run", false)}
      {row(b, "run rev", true)}
    </section>
  );
}

export function ContactCta() {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="wrap">
        <Comment n="→" label="next-step" />
        <h2 id="cta-title" className="disp cta-title grow">
          Let's build something <span className="serif acc">that works.</span>
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
          <Link className="btn btn-acc" to="/contact">Get in touch <ArrowUpRight /></Link>
          <Link className="btn btn-ghost" to="/projects">See all projects</Link>
        </div>
      </div>
    </section>
  );
}
