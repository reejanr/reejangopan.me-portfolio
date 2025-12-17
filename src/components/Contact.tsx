import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="contact" className="py-24 bg-background dark" ref={ref}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Contact</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </a>
                ) : (
                  <div className="bg-card rounded-2xl p-6 card-shadow border border-border text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <a
              href="mailto:Reejanr90@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-primary-foreground transition-all duration-300 hover:scale-105 elevated-shadow"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send className="w-5 h-5" />
              Send Message
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
