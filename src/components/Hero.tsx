import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, Linkedin, Sparkles } from "lucide-react";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";
import { FloatingGeometry } from "./FloatingGeometry";
import { MagneticButton } from "./MagneticButton";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section 
      ref={sectionRef}
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
      
      {/* 3D Floating Geometry - desktop only */}
      <FloatingGeometry />
      
      {/* Glow effect */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] pointer-events-none"
        style={{ 
          background: "var(--gradient-glow)",
          y,
          scale,
        }}
        aria-hidden="true"
      />

      {/* Geometric accents - hidden on mobile for performance */}
      <div className="hidden md:block">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 border border-primary/10 rounded-full animate-float" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          aria-hidden="true" 
        />
        <motion.div 
          className="absolute bottom-32 left-16 w-32 h-32 border border-primary/20 rotate-45" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          aria-hidden="true" 
        />
        <motion.div 
          className="absolute top-1/3 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          aria-hidden="true" 
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-primary/50 rounded-full animate-pulse" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
          aria-hidden="true" 
        />
      </div>

      <motion.div 
        className="container relative z-10 px-4 sm:px-6 py-16 sm:py-20"
        style={{ opacity }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20"
          >
            {/* Profile Image with enhanced effects */}
            <motion.figure 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
                {/* Animated rings */}
                <motion.div 
                  className="absolute -inset-4 rounded-full border border-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
                <motion.div 
                  className="absolute -inset-8 rounded-full border border-primary/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
                
                {/* Floating icons around profile */}
                <motion.div
                  className="absolute -top-4 -right-4 p-2 rounded-full bg-card border border-border shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                
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
            <header className="text-center lg:text-left flex-1 w-full">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4"
              >
                <span>System Administrator Dubai</span> | <span>Frontend Developer</span> | USF GROUP LLC | UAE
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight"
              >
                <span className="block text-foreground">Reejan</span>
                <span className="block gradient-text">Gopan</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                className="text-foreground/70 text-sm sm:text-base lg:text-xl max-w-xl mb-6 sm:mb-8 leading-relaxed"
              >
                <strong className="text-foreground">System Administrator</strong> & <strong className="text-foreground">Frontend Developer</strong> at USF GROUP LLC, Dubai UAE. Expert in 
                <strong className="text-foreground">Windows Server</strong>, <strong className="text-foreground">Microsoft 365</strong>, <strong className="text-foreground">React</strong>, <strong className="text-foreground">TypeScript</strong>, 
                <strong className="text-foreground">VPS</strong>, <strong className="text-foreground">DNS</strong>, <strong className="text-foreground">SEO</strong>, <strong className="text-foreground">Google Ads</strong>, <strong className="text-foreground">Meta Ads</strong>, 
                and scalable <strong className="text-foreground">IT infrastructure</strong>.
              </motion.p>

              {/* Contact Info */}
              <motion.address
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-sm text-foreground/70 mb-8 not-italic"
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

              {/* CTA Buttons with Magnetic Effect */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
                aria-label="Contact Reejan Gopan"
              >
                <MagneticButton
                  href={LINKEDIN_URL}
                  className="px-6 sm:px-8 py-3 rounded-lg font-medium text-primary-foreground transition-all duration-300 flex items-center gap-2"
                  strength={0.2}
                >
                  <span 
                    className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-medium text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    Hire Me
                  </span>
                </MagneticButton>
                <MagneticButton
                  href={LINKEDIN_URL}
                  className="px-6 sm:px-8 py-3 rounded-lg font-medium border border-border text-foreground hover:bg-secondary transition-all duration-300 flex items-center gap-2"
                  strength={0.2}
                >
                  Send Message
                </MagneticButton>
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
      </motion.div>
    </section>
  );
};
