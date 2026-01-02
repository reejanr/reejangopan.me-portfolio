import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="dark" itemScope itemType="https://schema.org/ProfilePage">
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
      
      {/* Schema.org meta properties */}
      <meta itemProp="name" content="Reejan R Gopan" />
      <meta itemProp="alternateName" content="Reejan Gopan" />
      <meta itemProp="alternateName" content="reejangopan" />
      <meta itemProp="description" content="IT Specialist and Web Developer in Dubai, UAE" />
      <meta itemProp="url" content="https://reejangopan.me" />
      <link itemProp="mainEntity" href="https://reejangopan.me/#person" />
      
      <Navbar />
      <main role="main" itemScope itemType="https://schema.org/Person" itemProp="mainEntity">
        <meta itemProp="name" content="Reejan R Gopan" />
        <meta itemProp="jobTitle" content="IT Specialist" />
        <meta itemProp="email" content="Reejanr90@gmail.com" />
        <meta itemProp="telephone" content="+971527123154" />
        <link itemProp="url" href="https://reejangopan.me" />
        <link itemProp="sameAs" href="https://www.linkedin.com/in/reejan-r-gopan-38a8092b9" />
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
