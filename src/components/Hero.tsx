import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, Linkedin, Sparkles } from "lucide-react";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";
import { FloatingGeometry } from "./FloatingGeometry";
import { getEmail, getMailtoHref } from "@/lib/email";
import { MagneticButton } from "./MagneticButton";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      itemScope 
      itemType="https://schema.org/Person"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark noise-bg"
      aria-label="Reejan Gopan - IT Professional Introduction"
    >
      {/* Multi-layer background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-hero" />
        {/* Mesh gradient orbs */}
        <motion.div
          className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(185 70% 50% / 0.4), transparent)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(260 60% 60% / 0.4), transparent)" }}
          animate={{ scale: [1.1, 1, 1.1], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: "linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>
      
      {/* 3D Floating Geometry - desktop only */}
      <FloatingGeometry />

      {/* Geometric accents - hidden on mobile for performance */}
      <div className="hidden md:block" aria-hidden="true">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 border border-primary/10 rounded-full" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-32 left-16 w-32 h-32 border border-accent/15 rotate-45" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        />
        <motion.div 
          className="absolute top-1/3 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-accent/50 rounded-full animate-pulse" 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
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
            {/* Profile Image with premium ring effect */}
            <motion.figure 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
                {/* Animated gradient rings */}
                <motion.div 
                  className="absolute -inset-4 rounded-full"
                  style={{ background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2), hsl(var(--primary) / 0.2))" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
                <motion.div 
                  className="absolute -inset-8 rounded-full border border-primary/5"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
                
                {/* Floating badge */}
                <motion.div
                  className="absolute -top-2 -right-2 p-2.5 rounded-xl glass border border-primary/20 shadow-lg z-20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse-glow" aria-hidden="true" />
                <img
                  src={profileImage}
                  alt="Reejan Gopan - Digital Marketing Expert, System Administrator & Frontend Developer Dubai UAE India"
                  title="Reejan Gopan - Best Digital Marketing Professional Dubai"
                  className="w-full h-full object-cover rounded-full border-2 border-primary/20 relative z-10"
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
                className="text-primary/80 font-medium tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 sm:mb-4"
              >
                <span>Digital Marketing</span> | <span>System Administrator</span> | <span>Frontend Developer</span> | USF GROUP LLC | Dubai & India
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-[1.1]"
              >
                <span className="block text-foreground">Reejan Gopan</span>
                <span className="block gradient-text-accent text-2xl sm:text-3xl lg:text-4xl mt-2 font-semibold">IT & Marketing Professional</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-xl mb-6 sm:mb-8 leading-relaxed"
              >
                <strong className="text-foreground">System Administrator</strong> & <strong className="text-foreground">Frontend Developer</strong> at USF GROUP LLC, Dubai UAE. Experienced in 
                <strong className="text-foreground"> SEO</strong>, <strong className="text-foreground">Google Ads</strong>, <strong className="text-foreground">Meta Ads</strong>, 
                <strong className="text-foreground"> Windows Server</strong>, <strong className="text-foreground">Microsoft 365</strong>, <strong className="text-foreground">React</strong>, <strong className="text-foreground">TypeScript</strong>, 
                and scalable <strong className="text-foreground">IT infrastructure</strong>. Serving businesses in <strong className="text-foreground">Dubai</strong> & <strong className="text-foreground">India</strong>.
              </motion.p>

              {/* Contact Info */}
              <motion.address
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-5 text-sm text-muted-foreground mb-8 not-italic"
              >
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs sm:text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span>Dubai, UAE</span>
                </span>
                <a 
                  href={getMailtoHref()} 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass hover:border-primary/30 transition-all text-xs sm:text-sm"
                  title="Email Reejan Gopan"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  {getEmail()}
                </a>
                <a 
                  href="tel:+971527123154" 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass hover:border-primary/30 transition-all text-xs sm:text-sm"
                  title="Call Reejan Gopan"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
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
                <MagneticButton
                  href={LINKEDIN_URL}
                  className="px-6 sm:px-8 py-3 rounded-xl font-medium text-primary-foreground transition-all duration-300 flex items-center gap-2"
                  strength={0.2}
                >
                  <span 
                    className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-medium text-primary-foreground bg-gradient-primary hover-glow"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    Hire Me
                  </span>
                </MagneticButton>
                <MagneticButton
                  href={LINKEDIN_URL}
                  className="px-6 sm:px-8 py-3.5 rounded-xl font-medium border border-border/50 text-foreground hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 flex items-center gap-2 glass"
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
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
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
