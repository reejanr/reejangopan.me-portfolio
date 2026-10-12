import { profile } from "@/data/site";
import { Breadcrumbs, Comment } from "@/components/site/Parts";
import { Download } from "@/components/site/Icons";

export default function Contact() {
  return (
    <section className="section-sm" aria-labelledby="page-title" style={{ paddingBottom: 120 }}>
      <div className="wrap">
        <Breadcrumbs items={[{ name: "Contact" }]} />
        <div style={{ marginTop: 32 }}>
          <Comment n="05" label="contact" />
          <h1 id="page-title" className="disp cta-title grow">
            Let's build something <span className="serif acc">that works.</span>
          </h1>
          <p className="lead" style={{ maxWidth: 640, marginTop: 28 }}>
            Open to {profile.openTo} in Dubai and the UAE. The fastest way to reach me is email.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px 32px", marginTop: 36 }}>
            <a className="disp ulink" href={`mailto:${profile.email}`} style={{ fontSize: "clamp(22px, 3vw, 40px)", fontWeight: 500, letterSpacing: "-0.02em", paddingBottom: 4 }}>
              {profile.email}
            </a>
            <a className="btn btn-acc" href={profile.cv} download>Download CV <Download /></a>
            <a className="btn btn-ghost" href={`${profile.whatsapp}?text=${encodeURIComponent("Hi Reejan, I found your website and would like to discuss a project.")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <address className="ct rv" style={{ marginTop: 64, fontStyle: "normal" }}>
          <a href={`mailto:${profile.email}`}><span className="mono faint">Email</span><div className="ct-v">{profile.email}</div></a>
          <a href={profile.phoneHref}><span className="mono faint">Phone</span><div className="ct-v">{profile.phone}</div></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span className="mono faint">LinkedIn</span><div className="ct-v">{profile.name} ↗</div></a>
          <div><span className="mono faint">Location</span><div className="ct-v">{profile.location}</div></div>
        </address>
      </div>
    </section>
  );
}
