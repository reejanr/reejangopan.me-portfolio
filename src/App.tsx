import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Engineering from "./pages/Engineering";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import AiEngineering from "./pages/AiEngineering";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Keep in sync with `routes` in src/seo/seo.ts (used for prerendering and the sitemap).
const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/guides/:slug" element={<GuideDetail />} />
      <Route path="/how-this-site-is-built" element={<Engineering />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/ai-engineering" element={<AiEngineering />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
);

export default App;
