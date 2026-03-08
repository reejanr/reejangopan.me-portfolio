import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "Reejanr90@gmail.com",
      href: "mailto:Reejanr90@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+971 527123154",
      href: "tel:+971527123154",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dubai, UAE",
      href: null,
    },
  ];

  return (
    <section 
      id="contact" 
      className="py-24 bg-background dark" 
      ref={ref}
      aria-label="Contact Reejan Gopan"
    >
      <div className="container px-6">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Get In Touch</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Contact Reejan Gopan
          </h2>
          <p className="text-foreground/70 mt-4 max-w-xl mx-auto">
            Interested in working with <strong className="text-foreground">Reejan R Gopan</strong>? Reach out for 
            <strong className="text-foreground"> IT consulting</strong>, <strong className="text-foreground">web development</strong>, or <strong className="text-foreground">AI automation</strong> projects in <strong className="text-foreground">Dubai, UAE</strong>.
          </p>
        </motion.header>

        <div className="max-w-4xl mx-auto">
          <address className="grid md:grid-cols-3 gap-6 mb-12 not-italic">
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
                    className="block bg-card rounded-2xl p-6 card-shadow border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 text-center"
                    title={`${info.label} Reejan Gopan`}
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm text-foreground/70 mb-1">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </a>
                ) : (
                  <div className="bg-card rounded-2xl p-6 card-shadow border border-border text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm text-foreground/70 mb-1">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
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
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            aria-label="Hire Reejan Gopan"
          >
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-primary-foreground transition-all duration-300 hover:scale-105 elevated-shadow"
                style={{ background: "var(--gradient-primary)" }}
                title="Hire Reejan Gopan - IT Specialist Dubai"
              >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
              Hire Reejan Gopan
            </a>
            <a
              href="mailto:Reejanr90@gmail.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium border border-border text-foreground hover:bg-secondary transition-all duration-300"
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
            <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
            <nav className="flex flex-wrap justify-center gap-4 text-sm" aria-label="Quick navigation links">
              <a href="#about" className="text-foreground hover:text-primary transition-colors" title="About Reejan Gopan">About</a>
              <span className="text-border">•</span>
              <a href="#experience" className="text-foreground hover:text-primary transition-colors" title="Reejan Gopan Experience">Experience</a>
              <span className="text-border">•</span>
              <a href="#services" className="text-foreground hover:text-primary transition-colors" title="Digital Marketing Services Dubai">Services</a>
              <span className="text-border">•</span>
              <a href="#skills" className="text-foreground hover:text-primary transition-colors" title="Technical Skills">Skills</a>
            </nav>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
