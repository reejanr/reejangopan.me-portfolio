import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, Linkedin } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Hero = () => {
  return (
    <section 
      id="home" 
      itemScope 
      itemType="https://schema.org/Person"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark"
      aria-label="Reejan Gopan - IT Professional Introduction"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />
      
      {/* Glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
        aria-hidden="true"
      />

      {/* Geometric accents */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-primary/10 rounded-full animate-float" aria-hidden="true" />
      <div className="absolute bottom-32 left-16 w-32 h-32 border border-primary/20 rotate-45" aria-hidden="true" />

      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Profile Image */}
            <motion.figure 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-56 h-56 lg:w-72 lg:h-72">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-transparent animate-pulse-glow" aria-hidden="true" />
                <img
                  src={profileImage}
                  alt="Reejan Gopan - Frontend Developer & IT Administrator at USF GROUP LLC Dubai UAE"
                  title="Reejan Gopan - Frontend Developer & IT Administrator Dubai"
                  className="w-full h-full object-cover rounded-full border-2 border-primary/30 relative z-10"
                  loading="eager"
                  width="288"
                  height="288"
                  itemProp="image"
                />
              </div>
              <figcaption className="sr-only">
                Professional photo of Reejan Gopan, IT Administrator at USF GROUP LLC, Dubai UAE
              </figcaption>
            </motion.figure>

            {/* Content */}
            <header className="text-center lg:text-left flex-1">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="text-primary font-medium tracking-widest uppercase text-sm mb-4"
              >
                <span>Frontend Developer</span> & <span>IT Administrator</span> | USF GROUP LLC | Dubai UAE
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  Reejan R{" "}
                </motion.span>
                <motion.span 
                  className="gradient-text"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  Gopan
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                className="text-muted-foreground text-lg lg:text-xl max-w-xl mb-8 leading-relaxed"
              >
                <strong>Frontend Developer</strong> & <strong>IT Administrator</strong> at USF GROUP LLC with expertise in 
                <strong> React</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, <strong>SEO strategy</strong>, <strong>Google Ads</strong>, <strong>Meta Ads</strong>, 
                VPS setup, and scalable <strong>IT infrastructure</strong> in <strong>Dubai, UAE</strong>.
              </motion.p>

              {/* Contact Info */}
              <motion.address
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-8 not-italic"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Dubai, UAE</span>
                </span>
                <a 
                  href="mailto:Reejanr90@gmail.com" 
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  title="Email Reejan Gopan"
                >
                  <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                  Reejanr90@gmail.com
                </a>
                <a 
                  href="tel:+971527123154" 
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  title="Call Reejan Gopan"
                >
                  <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
                  +971 527123154
                </a>
              </motion.address>

              {/* CTA Buttons */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
                aria-label="Contact Reejan Gopan"
              >
                <motion.a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 rounded-lg font-medium text-primary-foreground transition-all duration-300 flex items-center gap-2"
                  style={{ background: "var(--gradient-primary)" }}
                  title="Hire Reejan Gopan - Connect on LinkedIn"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(185 70% 50% / 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  Hire Me
                </motion.a>
                <motion.a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 rounded-lg font-medium border border-border text-foreground hover:bg-secondary transition-all duration-300 flex items-center gap-2"
                  title="Send Message to Reejan Gopan"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.a>
              </motion.nav>
            </header>
          </motion.article>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a 
            href="#about" 
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to learn more about Reejan Gopan"
            whileHover={{ y: 5 }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
