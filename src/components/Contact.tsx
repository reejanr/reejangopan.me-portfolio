import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Linkedin, Check, Copy } from "lucide-react";
import { getEmail, getMailtoHref } from "@/lib/email";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: getEmail(),
      href: getMailtoHref(),
      copyValue: getEmail(),
      field: "email",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+971 527123154",
      href: "tel:+971527123154",
      copyValue: "+971527123154",
      field: "phone",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dubai, UAE",
      href: null,
      copyValue: null,
      field: "location",
    },
  ];

  return (
    <section 
      id="contact" 
      className="section-spacing bg-background dark noise-bg relative overflow-hidden" 
      ref={ref}
      aria-label="Contact Reejan Gopan"
    >
      {/* Background accents */}
      <div className="absolute inset-0" aria-hidden="true">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-3xl"
          style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.3), transparent)" }}
        />
      </div>

      <div className="container px-6 relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block text-primary font-medium tracking-[0.25em] uppercase text-xs px-4 py-1.5 rounded-full glass border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Get In Touch
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Contact Reejan Gopan
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Interested in working with <strong className="text-foreground">Reejan R Gopan</strong>? Reach out for 
            <strong className="text-foreground"> IT consulting</strong>, <strong className="text-foreground">web development</strong>, or <strong className="text-foreground">AI automation</strong> projects in <strong className="text-foreground">Dubai, UAE</strong>.
          </p>
        </motion.header>

        <div className="max-w-4xl mx-auto">
          <address className="grid md:grid-cols-3 gap-5 mb-14 not-italic">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="group"
              >
                {info.href ? (
                  <a
                    href={info.href}
                    className="block glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover-glow text-center relative"
                    title={`${info.label} Reejan Gopan`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors" aria-hidden="true">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{info.label}</p>
                    <p className="text-foreground font-medium text-sm">{info.value}</p>
                    
                    {/* Copy button */}
                    {info.copyValue && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(info.copyValue!, info.field);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10"
                        title={`Copy ${info.label}`}
                      >
                        {copiedField === info.field ? (
                          <Check className="w-3.5 h-3.5 text-primary" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </a>
                ) : (
                  <div className="glass-card rounded-2xl p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{info.label}</p>
                    <p className="text-foreground font-medium text-sm">{info.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </address>

          {/* CTA */}
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-14"
            aria-label="Hire Reejan Gopan"
          >
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-primary-foreground transition-all duration-300 hover:scale-105 bg-gradient-primary hover-glow"
              title="Hire Reejan Gopan - IT Specialist Dubai"
            >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
              Hire Reejan Gopan
            </a>
            <a
              href={getMailtoHref()}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium border border-border/50 text-foreground hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 glass"
              title="Email Reejan Gopan"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              Send Email
            </a>
          </motion.nav>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Quick Links</p>
            <nav className="flex flex-wrap justify-center gap-4 text-sm" aria-label="Quick navigation links">
              <a href="#about" className="text-foreground/70 hover:text-primary transition-colors" title="About Reejan Gopan">About</a>
              <span className="text-border">•</span>
              <a href="#experience" className="text-foreground/70 hover:text-primary transition-colors" title="Reejan Gopan Experience">Experience</a>
              <span className="text-border">•</span>
              <a href="#services" className="text-foreground/70 hover:text-primary transition-colors" title="Digital Marketing Services Dubai">Services</a>
              <span className="text-border">•</span>
              <a href="#skills" className="text-foreground/70 hover:text-primary transition-colors" title="Technical Skills">Skills</a>
            </nav>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
