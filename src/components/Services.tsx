import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Code, Globe, Shield, Cloud, Megaphone, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Server,
    title: "System Administration",
    description: "Windows Server, Active Directory, Group Policies, VPS configuration, and IT infrastructure management in Dubai.",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Shield,
    title: "IT Administration",
    description: "Microsoft 365, email hosting, DNS, CCTV systems, biometric devices, antivirus, and data backup & recovery.",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: Code,
    title: "Frontend Development",
    description: "React.js, TypeScript, Tailwind CSS — fast, SEO-optimized, responsive websites for UAE businesses.",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Globe,
    title: "SEO & Web Management",
    description: "On-page SEO, structured data, Core Web Vitals tuning, and search ranking strategies for Dubai businesses.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Cloud,
    title: "Network & Cloud",
    description: "Firewall configuration, VPS management, cloud infrastructure, server monitoring for UAE enterprises.",
    color: "from-sky-500/20 to-cyan-500/20",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Google Ads PPC, Meta Ads, SEO strategy, social media marketing, analytics, and ROI-driven advertising.",
    color: "from-rose-500/20 to-pink-500/20",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-background dark relative overflow-hidden"
      ref={ref}
      aria-label="Services"
    >
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      
      <div className="container px-6 relative">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Services
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Digital Marketing & IT Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Comprehensive IT and marketing solutions for businesses in Dubai and India.
          </p>
        </motion.header>

        {/* Bento Grid - asymmetric */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`group relative rounded-2xl p-6 glass-card neon-border hover:bg-card/40 transition-all cursor-default ${
                index === 0 || index === 5 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center" aria-hidden="true">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
