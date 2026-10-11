import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, profile, projects } from "@/data/site";
import { useSeo } from "@/seo/useSeo";
import { ArrowUp, Close, Download, Menu, Moon, Sun } from "./Icons";

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#fafaf7" : "#0a0b0d");
}

function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="nav">
      <div className="wrap nav-row">
        <Link to="/" className="brand" aria-label={`${profile.name} — home`}>
          <span className="acc">~/</span>reejan<span className="faint">.dev</span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Switch light or dark theme">
            <Sun className="ic-sun" />
            <Moon className="ic-moon" />
          </button>
          <a className="btn btn-acc btn-sm nav-cta" href={profile.cv} download>
            Download CV <Download />
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className="mobile-menu" data-open={open} aria-label="Mobile">
        <div className="wrap">
          <NavLink to="/" end>Home</NavLink>
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
          ))}
          <a href={profile.cv} download>Download CV</a>
        </div>
      </nav>
      <div className="progress" aria-hidden="true" />
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand"><span className="acc">~/</span>reejan<span className="faint">.dev</span></Link>
            <p className="body" style={{ margin: "14px 0 0", maxWidth: 340 }}>
              {profile.name} — {profile.title} in {profile.location}. {profile.tagline}
            </p>
          </div>
          <div>
            <p className="fh">Pages</p>
            <ul>
              <li><Link to="/">Home</Link></li>
              {nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="fh">Projects</p>
            <ul>
              {projects.map((p) => (
                <li key={p.slug}><Link to={`/projects/${p.slug}`}>{p.name.split(" — ")[0]}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="fh">Connect</p>
            <ul>
              <li><a href={`mailto:${profile.email}`}>Email</a></li>
              <li><a href={profile.phoneHref}>Phone</a></li>
              <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href={profile.cv} download>Download CV</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name} · Dubai, UAE</span>
          <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44 }}>
            Back to top <ArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  useSeo();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <div className="hud" aria-hidden="true">
        <span>scroll</span>
        <span className="bar"><span /></span>
        <span className="pct" />
        <span>%</span>
      </div>
    </div>
  );
}
