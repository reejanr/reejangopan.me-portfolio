import { projects } from "@/data/site";
import { Breadcrumbs, Comment, ContactCta, ProjectRow } from "@/components/site/Parts";

export default function Projects() {
  return (
    <>
      <section className="section-sm" aria-labelledby="page-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Projects" }]} />
          <div style={{ marginTop: 32 }}>
            <Comment n="01" label="projects" />
            <h1 id="page-title" className="disp h1 hw">Selected <span className="serif acc">projects</span></h1>
            <p className="lead" style={{ maxWidth: 680, marginTop: 24 }}>
              Production business applications, web platforms, data systems and IT infrastructure — each with a short
              case study covering the problem, what was built and the result.
            </p>
          </div>
        </div>
      </section>
      <section aria-label="Project list" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          {projects.map((p, i) => <ProjectRow key={p.slug} p={p} i={i} headingLevel={2} />)}
        </div>
      </section>
      <ContactCta />
    </>
  );
}
