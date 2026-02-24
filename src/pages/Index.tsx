import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
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

      {/* SEO H1 - visually hidden but crawlable (no aria-hidden) */}
      <h1 className="sr-only">
        Reejan Gopan — System Administrator &amp; Frontend Developer in Dubai, UAE
      </h1>

      <PageTransition>
        <Navbar />
        <main id="main-content" role="main">
          <Hero />
          <About />
          <Experience />
          <Services />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Index;
