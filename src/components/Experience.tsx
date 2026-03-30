import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "System Administrator & IT Administrator",
    company: "USF GROUP LLC",
    location: "Dubai, UAE",
    period: "January 2025 – Present",
    current: true,
    responsibilities: [
      "Frontend development using React, TypeScript, Tailwind CSS",
      "Building production-ready business websites with database integrations",
      "AI-assisted development for rapid prototyping",
      "Managing Google Ads and Meta Ads campaigns",
      "System administration: Windows Server, Active Directory, Group Policies",
      "IT infrastructure, VPS setup, DNS & email hosting",
      "Microsoft 365 administration and user management",
    ],
  },
  {
    title: "IT Procurement & Support",
    company: "Chimera Group of Companies",
    location: "Dubai, UAE",
    period: "Sep 2024 – Dec 2024",
    current: false,
    responsibilities: [
      "Technology hardware, software, and services procurement",
      "Vendor negotiation and contract compliance",
      "IT asset tracking and inventory management",
      "Troubleshooting hardware, software, and networks",
      "Office 365, ERP systems, CCTV & biometric devices",
    ],
  },
  {
    title: "Network Administrator",
    company: "TCS ION (Tata Consultancy)",
    location: "Kerala, India",
    period: "Mar 2024 – Sep 2024",
    current: false,
    responsibilities: [
      "Network configuration and server maintenance",
      "Network monitoring and connectivity troubleshooting",
      "Router, switch, firewall administration",
      "Software installations and data backups",
    ],
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section 
      id="experience" 
      className="py-24 sm:py-32 bg-background dark relative overflow-hidden" 
      ref={ref}
      aria-label="Work Experience"
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
            Career
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Work Experience
          </h2>
        </motion.header>

        <div className="max-w-4xl mx-auto space-y-5">
          {experiences.map((exp, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.15 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 sm:p-8 glass-card neon-border hover:bg-card/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-primary font-medium text-sm mt-1">
                        <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                        {exp.company}
                      </div>
                    </div>
                    {exp.current && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Responsibilities as chips */}
                  <div className="flex flex-wrap gap-2">
                    {exp.responsibilities.map((resp, ri) => (
                      <span
                        key={ri}
                        className="px-3 py-1.5 rounded-lg bg-secondary/40 text-xs text-foreground/70 border border-border/50 hover:border-primary/20 hover:text-foreground transition-colors"
                      >
                        {resp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
