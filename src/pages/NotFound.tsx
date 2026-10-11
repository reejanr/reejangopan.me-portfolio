import { Link } from "react-router-dom";
import { Comment } from "@/components/site/Parts";
import { ArrowLeft } from "@/components/site/Icons";

const NotFound = () => (
  <section className="section" aria-labelledby="page-title">
    <div className="wrap">
      <Comment n="404" label="not-found" />
      <h1 id="page-title" className="disp h1">This page <span className="serif acc">doesn't exist.</span></h1>
      <p className="lead" style={{ marginTop: 24, maxWidth: 560 }}>The link may be old or mistyped. Try one of these instead:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
        <Link className="btn btn-acc" to="/"><ArrowLeft /> Home</Link>
        <Link className="btn btn-ghost" to="/projects">Projects</Link>
        <Link className="btn btn-ghost" to="/contact">Contact</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
