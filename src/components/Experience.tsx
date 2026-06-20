import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Information Technology Administrator",
    company: "USF Group",
    location: "Dubai, UAE",
    period: "Jan 2025 — Present",
    current: true,
    responsibilities: [
      "Enterprise systems & IT infrastructure management",
      "Microsoft 365 administration",
      "VPS, Linux servers & cloud services",
      "Email hosting, DNS & network management",
      "Workforce management platform (Waqti) — web & mobile",
      "Business process automation & internal tools",
      "Business application development with React & TypeScript",
      "Database design & API integrations (Supabase, PostgreSQL)",
      "Website operations, SEO & digital marketing technologies",
      "AI-assisted development & rapid prototyping",
    ],
  },
  {
    title: "IT Procurement & Support",
    company: "Chimera Group of Companies",
    location: "Dubai, UAE",
    period: "Sep 2024 — Dec 2024",
    current: false,
    responsibilities: [
      "Technology hardware, software & services procurement",
      "Vendor negotiation and contract compliance",
      "IT asset tracking and inventory management",
      "Hardware, software & network troubleshooting",
      "Office 365, ERP systems, CCTV & biometric devices",
    ],
  },
  {
    title: "Network Administrator",
    company: "TCS ION (Tata Consultancy Services)",
    location: "Kerala, India",
    period: "Mar 2024 — Sep 2024",
    current: false,
    responsibilities: [
      "Network configuration & server maintenance",
      "Network monitoring & connectivity troubleshooting",
      "Router, switch & firewall administration",
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
      ref={ref}
      className="relative py-28 sm:py-36 overflow-hidden"
      aria-label="Work Experience"
    >
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 hairline" />

      <div className="container relative">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <span className="eyebrow mb-5">
            <span className="w-1 h-1 rounded-full bg-primary" /> 02 — Career
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-4">
            <span className="gradient-text">A career built on</span>{" "}
            <span className="italic text-foreground/70">systems that ship.</span>
          </h2>
        </motion.header>

        <div className="max-w-5xl">
          <div className="relative">
            {/* Timeline rail */}
            <div className="absolute left-3 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-foreground/10 to-transparent" />

            <div className="space-y-5 sm:space-y-7">
              {experiences.map((exp, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-12 sm:pl-14"
                >
                  <div className="absolute left-1.5 sm:left-2.5 top-7 w-3 h-3 rounded-full bg-background border-2 border-primary/60 shadow-[0_0_0_4px_hsl(var(--background))]" />

                  <div className="rounded-3xl p-6 sm:p-8 glass-card ring-soft">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-heading text-2xl sm:text-3xl text-foreground tracking-tight leading-tight">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-primary/90 text-sm mt-2">
                          <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                          {exp.company}
                        </div>
                      </div>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.15em] bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-foreground/55 mb-5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.responsibilities.map((resp, ri) => (
                        <span
                          key={ri}
                          className="px-3 py-1.5 rounded-full text-[12px] text-foreground/75 bg-foreground/[0.03] border border-foreground/[0.08] hover:border-primary/20 hover:text-foreground transition-colors"
                        >
                          {resp}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
