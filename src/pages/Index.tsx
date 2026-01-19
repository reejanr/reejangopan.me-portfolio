import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";

const Index = () => {
  return (
    <div className="dark">
      <LoadingScreen />
      
      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Reejan Gopan - IT Administrator Dubai | reejangopan.me</h1>
        <p>
          Looking for Reejan Gopan? Visit reejangopan.me - Reejan R Gopan (also known as reejangopan) 
          is an IT Administrator at USF GROUP LLC, Dubai UAE. Reejan Gopan specializes in website 
          management, SEO strategy, Google Ads, Meta Ads, social media operations, VPS setup, 
          email hosting, and IT infrastructure development. Contact Reejan Gopan for IT solutions.
        </p>
        <ul>
          <li>Reejan Gopan IT Administrator</li>
          <li>Reejan R Gopan USF GROUP LLC</li>
          <li>reejangopan.me</li>
          <li>Hire Reejan Gopan Dubai</li>
          <li>Reejan Gopan Google Ads Expert</li>
          <li>Reejan Gopan SEO Specialist</li>
        </ul>
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
