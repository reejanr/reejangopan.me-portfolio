import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Code2, Database, Workflow, Cloud, Megaphone, Smartphone, Network, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Server,
    title: "Enterprise Systems Administration",
    description: "Microsoft 365, VPS & cloud servers, Linux administration, email hosting, DNS, and core IT infrastructure that keeps the business running.",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    description: "Workflow automation, attendance & payroll support systems, internal tooling, and operational reporting to reduce manual work.",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Code2,
    title: "Business Application Development",
    description: "End-to-end web and mobile applications using React, TypeScript, Tailwind, and TanStack Router — designed around real business outcomes.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Database,
    title: "Database & API Integration",
    description: "Supabase, PostgreSQL, authentication systems, server functions, and REST API integrations for connected, data-driven platforms.",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: Smartphone,
    title: "Workforce & Mobile Solutions",
    description: "Workforce management platforms, attendance systems, and mobile applications — including Waqti, live on Google Play.",
    color: "from-sky-500/20 to-cyan-500/20",
  },
  {
    icon: Network,
    title: "Infrastructure & Cloud",
    description: "VPS hosting, Linux servers, DNS management, email hosting, and cloud services tuned for reliability and scale.",
    color: "from-teal-500/20 to-emerald-500/20",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing & SEO",
    description: "Technical SEO, Google Ads, Meta Ads, website management, and performance optimization to grow business visibility.",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Cloud,
    title: "Digital Operations & Strategy",
    description: "Technology strategy, digital transformation, internal tools, and operational systems that drive measurable business growth.",
    color: "from-amber-500/20 to-orange-500/20",
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
            Core Expertise
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Systems, Applications & Operations
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
            End-to-end IT administration, business application development, and digital operations for modern organizations.
          </p>
        </motion.header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl p-6 glass-card neon-border hover:bg-card/40 transition-all cursor-default"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center" aria-hidden="true">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">
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
