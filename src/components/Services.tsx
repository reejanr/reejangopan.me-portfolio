import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Code2, Database, Workflow, Cloud, Megaphone, Smartphone, Network, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Server, title: "Enterprise Systems Administration", description: "Microsoft 365, VPS & cloud servers, Linux, email hosting, DNS and core IT infrastructure that keeps the business running." },
  { icon: Workflow, title: "Business Process Automation", description: "Workflow automation, attendance & payroll support systems, internal tooling, and operational reporting to reduce manual work." },
  { icon: Code2, title: "Business Application Development", description: "End-to-end web and mobile applications using React, TypeScript and Tailwind — designed around real business outcomes." },
  { icon: Database, title: "Database & API Integration", description: "Supabase, PostgreSQL, authentication, server functions, and REST integrations for connected, data-driven platforms." },
  { icon: Smartphone, title: "Workforce & Mobile Solutions", description: "Workforce management platforms, attendance systems and mobile apps — including Waqti, live on Google Play." },
  { icon: Network, title: "Infrastructure & Cloud", description: "VPS hosting, Linux servers, DNS management, email hosting and cloud services tuned for reliability and scale." },
  { icon: Megaphone, title: "Digital Marketing & SEO", description: "Technical SEO, Google Ads, Meta Ads, website management and performance optimization to grow business visibility." },
  { icon: Cloud, title: "Digital Operations & Strategy", description: "Technology strategy, digital transformation, internal tools and operational systems that drive measurable growth." },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-28 sm:py-36 overflow-hidden"
      aria-label="Services"
    >
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 hairline" />

      <div className="container relative">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <span className="eyebrow mb-5">
            <span className="w-1 h-1 rounded-full bg-primary" /> 03 — Expertise
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-4">
            <span className="gradient-text">Systems, applications</span>{" "}
            <span className="italic text-foreground/70">& operations.</span>
          </h2>
          <p className="text-foreground/60 mt-5 max-w-xl text-base">
            End-to-end IT administration, business application development, and digital
            operations for modern organizations.
          </p>
        </motion.header>

        <div className="grid grid-cols-12 gap-4 sm:gap-5">
          {services.map((service, index) => {
            // Asymmetric bento spans
            const spans = [
              "col-span-12 sm:col-span-6 lg:col-span-7",
              "col-span-12 sm:col-span-6 lg:col-span-5",
              "col-span-12 sm:col-span-6 lg:col-span-4",
              "col-span-12 sm:col-span-6 lg:col-span-4",
              "col-span-12 sm:col-span-6 lg:col-span-4",
              "col-span-12 sm:col-span-6 lg:col-span-5",
              "col-span-12 sm:col-span-6 lg:col-span-4",
              "col-span-12 sm:col-span-12 lg:col-span-3",
            ];
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.05 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-3xl p-6 sm:p-7 glass-card ring-soft min-h-[200px] flex flex-col justify-between overflow-hidden ${spans[index]}`}
              >
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/[0.05] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative flex items-start justify-between mb-6">
                  <span className="w-11 h-11 rounded-2xl bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" />
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="relative">
                  <h3 className="font-heading text-xl sm:text-2xl text-foreground/95 leading-tight tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground/55 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
