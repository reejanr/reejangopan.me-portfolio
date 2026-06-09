import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, Linkedin, ArrowUpRight, Send } from "lucide-react";
import { getEmail, getMailtoHref } from "@/lib/email";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const contactInfo = [
    { icon: Mail, label: "Email", value: getEmail(), href: getMailtoHref(), color: "from-cyan-500/20 to-blue-500/20" },
    { icon: Phone, label: "Phone", value: "+971 527123154", href: "tel:+971527123154", color: "from-violet-500/20 to-purple-500/20" },
    { icon: MapPin, label: "Location", value: "Dubai, UAE", href: null, color: "from-emerald-500/20 to-teal-500/20" },
  ];

  return (
    <section 
      id="contact" 
      className="py-24 sm:py-32 bg-background dark relative overflow-hidden" 
      ref={ref}
      aria-label="Contact"
    >
      <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" aria-hidden="true" />
      
      <div className="container px-6 relative">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Contact
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Let's Build Something That Works
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm sm:text-base">
            IT administration, business application development, automation, or digital operations — get in touch to discuss your project.
          </p>
        </motion.header>

        <div className="max-w-4xl mx-auto">
          {/* Contact Cards */}
          <address className="grid sm:grid-cols-3 gap-4 mb-12 not-italic">
            {contactInfo.map((info, index) => {
              const content = (
                <div className="group relative overflow-hidden rounded-2xl p-6 glass-card neon-border hover:bg-card/40 transition-all text-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-100 transition-opacity`} aria-hidden="true" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{info.label}</p>
                    <p className="text-foreground font-medium text-sm">{info.value}</p>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {info.href ? (
                    <a href={info.href} title={`${info.label} Reejan Gopan`} className="block">
                      {content}
                    </a>
                  ) : content}
                </motion.div>
              );
            })}
          </address>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-gradient-primary neon-glow hover:opacity-90 transition-all text-sm"
              title="Hire Reejan Gopan"
            >
              <Linkedin className="w-4.5 h-4.5" aria-hidden="true" />
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={getMailtoHref()}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-medium glass neon-border text-foreground hover:bg-card/50 transition-all text-sm"
              title="Email Reejan Gopan"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              Send Email
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
