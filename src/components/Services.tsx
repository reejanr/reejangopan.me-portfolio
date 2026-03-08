import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Code, Globe, Shield, Cloud, Megaphone } from "lucide-react";

const services = [
  {
    icon: Server,
    title: "System Administration in Dubai",
    description:
      "Professional system administrator services in Dubai including Windows Server setup, Active Directory, Group Policies, VPS configuration, and complete IT infrastructure management for businesses in UAE.",
  },
  {
    icon: Shield,
    title: "IT Administration & Support UAE",
    description:
      "End-to-end IT administration in Dubai — Microsoft 365 management, email hosting, DNS configuration, CCTV systems, biometric devices, antivirus security, and data backup & recovery.",
  },
  {
    icon: Code,
    title: "Frontend Development Dubai",
    description:
      "Custom frontend development in Dubai using React.js, TypeScript, and Tailwind CSS. Building fast, SEO-optimized, responsive business websites with modern UI/UX for companies in UAE.",
  },
  {
    icon: Globe,
    title: "Website Management & SEO",
    description:
      "Complete website management, on-page SEO optimization, structured data implementation, Core Web Vitals tuning, and search engine ranking strategies for Dubai businesses.",
  },
  {
    icon: Cloud,
    title: "Network & Cloud Administration",
    description:
      "Network administrator services in Dubai — firewall configuration, VPS management, cloud infrastructure, server monitoring, and scalable hosting solutions for UAE enterprises.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Dubai & India",
    description:
      "Top digital marketing services in Dubai and India — Google Ads PPC management, Meta Ads (Facebook & Instagram) campaigns, SEO strategy, social media marketing, Google Analytics setup, conversion tracking, and ROI-driven advertising for businesses across UAE and India.",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="services"
      className="py-24 bg-background dark"
      ref={ref}
      aria-label="Digital Marketing, System Administration & Frontend Developer Services in Dubai UAE and India"
    >
      <div className="container px-6">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            What I Offer
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Digital Marketing & IT Services in Dubai
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            <strong className="text-foreground">Reejan Gopan</strong> provides
            top digital marketing, SEO, Google Ads, Meta Ads, system administration, frontend
            development, and IT infrastructure services in{" "}
            <strong className="text-foreground">Dubai, UAE</strong> and <strong className="text-foreground">India</strong>.
          </p>
        </motion.header>

        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.4, 0.25, 1],
                  },
                },
              }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl p-6 card-shadow border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                aria-hidden="true"
              >
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
