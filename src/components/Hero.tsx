import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, Linkedin } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "var(--gradient-glow)" }}
      />

      {/* Geometric accents */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-32 left-16 w-32 h-32 border border-primary/20 rotate-45" />

      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Profile Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-56 h-56 lg:w-72 lg:h-72">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-transparent animate-pulse-glow" />
                <img
                  src={profileImage}
                  alt="Reejan R Gopan"
                  className="w-full h-full object-cover rounded-full border-2 border-primary/30 relative z-10"
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="text-center lg:text-left flex-1">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-primary font-medium tracking-widest uppercase text-sm mb-4"
              >
                IT Professional
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
              >
                Reejan R{" "}
                <span className="gradient-text">Gopan</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-muted-foreground text-lg lg:text-xl max-w-xl mb-8 leading-relaxed"
              >
                Detail-oriented IT professional with expertise in website development, 
                automation, and technical support. Driving business success through innovative solutions.
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-8"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Dubai, UAE
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Reejanr90@gmail.com
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  0527123154
                </span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
              >
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 rounded-lg font-medium text-primary-foreground transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Linkedin className="w-4 h-4" />
                  Hire Me
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 rounded-lg font-medium border border-border text-foreground hover:bg-secondary transition-all duration-300 flex items-center gap-2"
                >
                  Send Message
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
