import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Building2, Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const experiences = [
    {
      title: "System Administrator & IT Administrator",
      company: "USF GROUP LLC",
      location: "Dubai, UAE",
      period: "January 2025 – Present",
      responsibilities: [
        "Frontend development using React, TypeScript, Tailwind CSS, and modern UI libraries",
        "Building and deploying real-world business websites with dynamic forms and database integrations",
        "Implementing automated email workflows and production-ready web solutions",
        "AI-assisted development workflows for rapid prototyping and delivery",
        "Overseeing website management, SEO strategy, and digital presence optimization",
        "Managing Google Ads and Meta Ads campaigns for maximum ROI",
        "Handling social media operations and content strategy across platforms",
        "System administration including Windows Server, Active Directory, and Group Policies",
        "IT infrastructure management, VPS setup, and scalable server architecture",
        "Email hosting configuration, DNS management, and domain administration",
        "WordPress and Wix website design and maintenance",
        "Data analysis and performance reporting for digital initiatives",
        "Microsoft 365 administration and user management",
      ],
    },
    {
      title: "IT Procurement & Support",
      company: "Chimera Group of Companies",
      location: "Dubai, UAE",
      period: "September 2024 – December 2024",
      responsibilities: [
        "Acquired and managed technology hardware, software, and services ensuring cost-effectiveness",
        "Conducted vendor negotiation and maintained contract compliance",
        "Implemented asset tracking systems and maintained IT inventory",
        "Provided technical support to align IT resources with business needs",
        "Troubleshooting and resolving technical issues with hardware, software, and networks",
        "Managed Windows-based systems, CCTV, Printers, Biometric devices, and network infrastructure",
        "Administered Office 365, Outlook, and ERP systems",
        "Implemented AI automation tools to enhance workflows and streamline tasks",
      ],
    },
    {
      title: "Network Administrator",
      company: "TCS ION (Tata Consultancy Services)",
      location: "Kerala, India",
      period: "March 2024 – September 2024",
      responsibilities: [
        "Assisted in network configuration and basic server maintenance",
        "Monitored network performance and resolved connectivity issues",
        "Provided support for end-user system issues including hardware and software",
        "Documented network layouts and maintained network hardware inventory",
        "Administered and audited routers, switches, firewalls, and servers",
        "Assisted IT team in software installations and data backups",
      ],
    },
  ];

  return (
    <section 
      id="experience" 
      className="section-spacing bg-background dark noise-bg" 
      ref={ref}
      aria-label="Reejan Gopan Work Experience"
    >
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
            Career History
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Reejan Gopan's Work Experience
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Professional experience of <strong className="text-foreground">Reejan R Gopan</strong> as an IT Administrator at USF GROUP LLC, IT Specialist at Chimera Group, and Network Administrator at TCS.
          </p>
        </motion.header>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-8 top-full w-px h-6 bg-gradient-to-b from-primary/30 to-transparent hidden sm:block" aria-hidden="true" />
                )}

                <motion.div
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'border-primary/30 hover-glow' : 'hover:border-primary/20'
                  }`}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  {/* Header - clickable */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full p-5 sm:p-6 md:p-8 text-left flex items-start gap-4 sm:gap-6"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-primary font-medium mt-1.5">
                            <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span className="text-sm sm:text-base">{exp.company}</span>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 mt-1"
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground px-3 py-1 rounded-lg bg-secondary/50">
                          <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground px-3 py-1 rounded-lg bg-secondary/50">
                          <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expandable content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 md:px-8 pb-6 md:pb-8 pt-0">
                      <div className="border-t border-border/30 pt-5">
                        <ul className="space-y-2.5 text-muted-foreground">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <motion.li 
                              key={respIndex} 
                              className="flex gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: respIndex * 0.03 }}
                            >
                              <span className="text-primary mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />
                              <span className="text-xs sm:text-sm leading-relaxed">{resp}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
