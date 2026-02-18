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
      
      
      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Reejan Gopan - System Administrator Dubai | IT Administrator UAE | reejangopan.me</h1>
        <h2>System Administrator & IT Administrator at USF GROUP LLC Dubai UAE</h2>
        <h3>Frontend Developer React TypeScript Tailwind CSS Dubai</h3>
        <p>
          Reejan Gopan (Reejan R Gopan, also known as reejangopan) is a System Administrator, 
          IT Administrator, and Frontend Developer at USF GROUP LLC, Dubai UAE. 
          Reejan Gopan specializes in System Administration Dubai, IT Administration UAE, 
          Windows Server Administration Dubai, Microsoft 365 Administration, Active Directory, 
          Network Administration Dubai, VPS Setup and Management, Email Hosting, DNS Management, 
          CCTV Systems, Biometric Device Management, IT Support Dubai, IT Infrastructure Dubai, 
          React.js, TypeScript, Tailwind CSS, shadcn/ui, SEO strategy, Google Ads, Meta Ads, 
          Social Media Operations, WordPress Development, and AI-assisted development.
          Hire Reejan Gopan for System Administration and IT services in Dubai UAE.
        </p>
        <ul>
          <li>System Administrator Dubai</li>
          <li>IT Administrator Dubai UAE</li>
          <li>Network Administrator Dubai</li>
          <li>Windows Server Administrator Dubai</li>
          <li>Microsoft 365 Administrator Dubai</li>
          <li>IT Support Dubai UAE</li>
          <li>IT Professional Dubai</li>
          <li>IT Specialist Dubai UAE</li>
          <li>Computer Administrator Dubai</li>
          <li>IT Infrastructure Dubai</li>
          <li>VPS Administrator Dubai</li>
          <li>Frontend Developer Dubai</li>
          <li>React Developer UAE</li>
          <li>Reejan Gopan System Administrator</li>
          <li>Reejan R Gopan IT Administrator</li>
          <li>Reejan Gopan Dubai</li>
          <li>Hire System Administrator Dubai</li>
          <li>Hire IT Administrator UAE</li>
          <li>reejangopan.me Portfolio</li>
          <li>Reejan Gopan Google Ads Expert</li>
          <li>Reejan Gopan SEO Specialist UAE</li>
        </ul>
        <h3>Contact Reejan Gopan - System Administrator Dubai</h3>
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
