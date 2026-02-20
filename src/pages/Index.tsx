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

      {/* Hidden SEO content for search engines - single H1, keyword-rich */}
      <div className="sr-only" aria-hidden="true">
        <h1>System Administrator Dubai | Reejan Gopan - IT Administrator & Frontend Developer UAE</h1>
        <p>
          Reejan Gopan (Reejan R Gopan) is the best System Administrator in Dubai, UAE. 
          Working as IT Administrator and Frontend Developer at USF GROUP LLC Dubai, 
          Reejan Gopan provides expert system administration, IT administration, 
          and frontend development services. Specializing in Windows Server Administration, 
          Microsoft 365, Active Directory, VPS Setup, DNS Management, Email Hosting, 
          CCTV Systems, Biometric Device Management, Network Administration, and IT Infrastructure.
        </p>
        <h2>System Administrator Services in Dubai by Reejan Gopan</h2>
        <p>
          Looking for a system administrator in Dubai? Reejan Gopan offers professional 
          system administration services including Windows Server setup, Microsoft 365 administration, 
          VPS management, DNS configuration, email hosting, network security, and IT support in Dubai UAE.
        </p>
        <h2>Frontend Developer Dubai - React & TypeScript Expert</h2>
        <p>
          Reejan Gopan is a skilled frontend developer in Dubai specializing in React.js, 
          TypeScript, Tailwind CSS, and modern web development. Hire the best frontend developer 
          in Dubai for responsive, SEO-optimized business websites.
        </p>
        <h2>Hire System Administrator & Frontend Developer in Dubai</h2>
        <ul>
          <li>System Administrator Dubai - Reejan Gopan</li>
          <li>System Administrator in Dubai UAE</li>
          <li>Best System Administrator Dubai</li>
          <li>IT Administrator Dubai - Reejan R Gopan</li>
          <li>Network Administrator Dubai</li>
          <li>Windows Server Administrator Dubai</li>
          <li>Microsoft 365 Administrator Dubai</li>
          <li>VPS Administrator Dubai UAE</li>
          <li>Frontend Developer Dubai - React TypeScript</li>
          <li>Best Frontend Developer Dubai</li>
          <li>React Developer Dubai UAE</li>
          <li>Web Developer Dubai</li>
          <li>IT Support Dubai UAE</li>
          <li>IT Infrastructure Dubai</li>
          <li>IT Professional Dubai</li>
          <li>IT Specialist Dubai UAE</li>
          <li>Server Administrator Dubai</li>
          <li>Cloud Administrator Dubai</li>
          <li>Sysadmin Dubai UAE</li>
          <li>IT Services Dubai</li>
          <li>IT Solutions Dubai UAE</li>
          <li>Hire IT Administrator Dubai</li>
          <li>Hire Frontend Developer Dubai</li>
          <li>SEO Specialist Dubai - Reejan Gopan</li>
          <li>Google Ads Expert Dubai</li>
          <li>WordPress Developer Dubai</li>
        </ul>
        <h3>Contact System Administrator Dubai - Reejan Gopan</h3>
        <p>
          Email: Reejanr90@gmail.com | Phone: +971 527123154 | Location: Dubai, UAE
          LinkedIn: linkedin.com/in/reejan-r-gopan-38a8092b9 | Website: reejangopan.me
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
