import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Approach } from "@/components/Approach";
import { Projects } from "@/components/Projects";
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

      <PageTransition>
        <Navbar />
        <main id="main-content" role="main">
          <Hero />
          <About />
          <Experience />
          <Services />
          <Approach />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Index;
