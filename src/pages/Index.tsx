import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";

import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";
import { ParticleBackground } from "@/components/ParticleBackground";
import { CustomCursor } from "@/components/CustomCursor";

import { ScrollProgress } from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="dark">
      <LoadingScreen />
      <CustomCursor />
      <ParticleBackground />
      <ScrollProgress />
      
      
      {/* Hidden SEO content for search engines - Enhanced for maximum visibility */}
      <div className="sr-only" aria-hidden="true">
        <h1>Reejan Gopan - Frontend Developer & IT Administrator Dubai | reejangopan.me</h1>
        <h2>React TypeScript Developer at USF GROUP LLC Dubai UAE</h2>
        <p>
          Looking for Reejan Gopan? Visit reejangopan.me - Reejan R Gopan (also known as reejangopan) 
          is a Frontend Developer and IT Administrator at USF GROUP LLC, Dubai UAE. Reejan Gopan specializes in 
          React.js, TypeScript, Tailwind CSS, shadcn/ui, website development, SEO strategy, Google Ads, 
          Meta Ads, social media operations, VPS setup, email hosting, AI-assisted development, 
          and IT infrastructure development. Contact Reejan Gopan for web development and IT solutions.
        </p>
        <h3>Reejan Gopan Technical Skills</h3>
        <ul>
          <li>Reejan Gopan Frontend Developer Dubai</li>
          <li>Reejan Gopan React Developer UAE</li>
          <li>Reejan R Gopan TypeScript Expert</li>
          <li>Reejan Gopan Tailwind CSS Developer</li>
          <li>Reejan Gopan IT Administrator USF GROUP LLC</li>
          <li>reejangopan.me Portfolio</li>
          <li>Hire Reejan Gopan Dubai</li>
          <li>Reejan Gopan Google Ads Expert</li>
          <li>Reejan Gopan SEO Specialist UAE</li>
          <li>Reejan Gopan AI-Assisted Development</li>
          <li>Reejan Gopan shadcn UI Developer</li>
          <li>Reejan Gopan Web Developer Dubai</li>
        </ul>
        <h3>Contact Reejan Gopan</h3>
        <p>
          Email: Reejanr90@gmail.com | Phone: +971 527123154 | Location: Dubai, UAE
          LinkedIn: linkedin.com/in/reejan-r-gopan-38a8092b9
        </p>
      </div>

      <PageTransition>
        <Navbar />
        <main id="main-content" role="main">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Index;
