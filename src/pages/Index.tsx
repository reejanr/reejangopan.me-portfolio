import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="dark">
      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Reejan Gopan - Reejan R Gopan - IT Professional Dubai UAE</h1>
        <p>
          Looking for Reejan Gopan? Reejan R Gopan (also known as reejangopan) is a professional
          IT Specialist and Web Developer based in Dubai, UAE. Reejan Gopan specializes in
          website development, AI automation, network administration, SEO optimization, and
          technical support services. Contact Reejan Gopan for IT solutions in Dubai.
        </p>
        <ul>
          <li>Reejan Gopan IT Specialist</li>
          <li>Reejan R Gopan Web Developer</li>
          <li>reejangopan Dubai UAE</li>
          <li>Hire Reejan Gopan</li>
          <li>Reejan Gopan Portfolio</li>
          <li>Reejan Gopan Contact</li>
        </ul>
      </div>

      <Navbar />
      <main role="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
