import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="dark" itemScope itemType="https://schema.org/Person">
      <meta itemProp="name" content="Reejan R Gopan" />
      <meta itemProp="alternateName" content="Reejan Gopan" />
      <meta itemProp="alternateName" content="reejangopan" />
      <meta itemProp="jobTitle" content="IT Specialist" />
      <meta itemProp="url" content="https://reejangopan.me" />
      <Navbar />
      <main>
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
