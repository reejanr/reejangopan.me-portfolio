import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Building2, Calendar } from "lucide-react";

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const experiences = [
    {
      title: "IT Administrator",
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
        "System optimization and scalable IT infrastructure development",
        "Email hosting configuration and VPS setup management",
        "DNS management and domain administration",
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
      className="py-24 bg-background dark" 
      ref={ref}
      aria-label="Reejan Gopan Work Experience"
    >
      <div className="container px-6">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Career History</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Reejan Gopan's Work Experience
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            Professional experience of <strong className="text-foreground">Reejan R Gopan</strong> as an IT Administrator at USF GROUP LLC, IT Specialist at Chimera Group, and Network Administrator at TCS.
          </p>
        </motion.header>

        <div className="max-w-4xl mx-auto">
          <div className="relative pl-6 sm:pl-8 md:pl-0">
            {/* Timeline line - left on mobile, center on md+ */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2" aria-hidden="true" />

            {experiences.map((exp, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className={`relative mb-10 sm:mb-12 md:mb-16 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:ml-0 md:mr-auto" : "md:ml-auto"
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-3 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-4 border-background glow-effect -left-[calc(1.5rem+1px)] sm:-left-[calc(2rem+1px)] md:left-auto ${
                  index % 2 === 0 ? "md:-right-[2.25rem]" : "md:-left-[2.25rem]"
                }`} aria-hidden="true" />

                <div className="bg-card rounded-2xl p-5 sm:p-6 md:p-8 card-shadow border border-border hover:border-primary/30 transition-colors">
                  {/* Header */}
                  <div className="flex flex-wrap items-start gap-3 sm:gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-medium mt-1">
                        <Building2 className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm sm:text-base">{exp.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-foreground/70 mb-4">
                    <time className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {exp.period}
                    </time>
                    <span>{exp.location}</span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-2 text-foreground/70">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex gap-2">
                        <span className="text-primary mt-1.5 shrink-0" aria-hidden="true">•</span>
                        <span className="text-xs sm:text-sm leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
