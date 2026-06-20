import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";
import { FloatingGeometry } from "./FloatingGeometry";
import { getEmail, getMailtoHref } from "@/lib/email";
import { MagneticButton } from "./MagneticButton";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

const StatusBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm"
  >
    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
    <span className="text-muted-foreground">Available for work</span>
    <span className="text-primary font-medium">Dubai, UAE</span>
  </motion.div>
);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark"
      aria-label="Reejan Gopan - Information Technology Administrator"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" aria-hidden="true" />
      
      <FloatingGeometry />

      <motion.div 
        className="container relative z-10 px-4 sm:px-6 py-16 sm:py-20"
        style={{ opacity }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20"
          >
            <motion.figure 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
                <motion.div 
                  className="absolute -inset-3 rounded-full neon-border"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
                <div className="absolute -inset-6 rounded-full bg-gradient-primary opacity-10 blur-2xl animate-pulse-glow" aria-hidden="true" />
                
                <img
                  src={profileImage}
                  alt="Reejan Gopan - Information Technology Administrator at USF Group, Dubai UAE"
                  title="Reejan Gopan - IT Administrator & Business Systems Developer"
                  className="w-full h-full object-cover rounded-full border-2 border-primary/30 relative z-10"
                  loading="eager"
                  width="288"
                  height="288"
                  itemProp="image"
                />
                
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full glass text-xs font-medium text-primary whitespace-nowrap"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✦ Open to work
                </motion.div>
              </div>
              <figcaption className="sr-only">
                Reejan Gopan, Information Technology Administrator at USF Group, Dubai UAE
              </figcaption>
            </motion.figure>

            <header className="text-center lg:text-left flex-1 w-full">
              <StatusBadge />
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mt-6 mb-4 leading-[1.1] tracking-tight"
              >
                <span className="block">Reejan Gopan</span>
                <span className="block gradient-text text-2xl sm:text-3xl lg:text-4xl mt-3 font-semibold">
                  Information Technology Administrator
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="text-primary/90 text-xs sm:text-sm font-medium uppercase tracking-wider mb-4"
              >
                Enterprise Systems · IT Infrastructure · Business Applications · Process Automation · Digital Operations
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-xl mb-8 leading-relaxed"
              >
                Driving business growth through technology, enterprise systems, automation, business applications, and scalable infrastructure at <strong className="text-foreground">USF Group, Dubai</strong>.
              </motion.p>

              <motion.address
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 text-sm mb-8 not-italic"
              >
                {[
                  { icon: MapPin, text: "Dubai, UAE", href: null },
                  { icon: Linkedin, text: "LinkedIn", href: LINKEDIN_URL },
                ].map((item, i) => {
                  const Tag = item.href ? 'a' : 'span';
                  return (
                    <Tag
                      key={i}
                      {...(item.href ? { href: item.href } : {})}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-muted-foreground hover:text-primary transition-colors"
                    >
                      <item.icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                      {item.text}
                    </Tag>
                  );
                })}
              </motion.address>

              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
                aria-label="Primary actions"
              >
                <MagneticButton href={LINKEDIN_URL} strength={0.2}>
                  <span className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary neon-glow text-sm">
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    Hire Me
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </MagneticButton>
                <MagneticButton href="#projects" strength={0.2}>
                  <span className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-medium glass text-foreground hover:border-primary/30 transition-all text-sm neon-border">
                    View Project
                  </span>
                </MagneticButton>
              </motion.nav>
            </header>
          </motion.article>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a 
            href="#about" 
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to learn more"
            whileHover={{ y: 5 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border border-primary/30 flex items-start justify-center p-1.5"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full bg-primary"
              />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
