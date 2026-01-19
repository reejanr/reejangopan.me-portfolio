import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Building2, Calendar } from "lucide-react";

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "IT Administrator",
      company: "USF GROUP LLC",
      location: "Dubai, UAE",
      period: "January 2025 – Present",
      responsibilities: [
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
      title: "IT Specialist",
      company: "Chimera Group of Companies",
      location: "Dubai, UAE",
      period: "September 2024 – December 2024",
      responsibilities: [
        "Created, updated, and maintained website content using CMS platforms",
        "Monitored website performance, user experience, and implemented SEO best practices",
        "Developed, scheduled, and published engaging content across social media platforms",
        "Supported planning and execution of Google Ads campaigns",
        "Implemented AI automation tools to enhance workflows and streamline tasks",
        "Troubleshooting and resolving technical issues with hardware, software, and networks",
        "Managed Windows-based systems, CCTV, Printers, Biometric devices, and network infrastructure",
        "Administered Office 365, Outlook, and ERP systems",
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
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Professional experience of <strong>Reejan R Gopan</strong> as an IT Administrator at USF GROUP LLC, IT Specialist at Chimera Group, and Network Administrator at TCS.
          </p>
        </motion.header>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2" aria-hidden="true" />

            {experiences.map((exp, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%] md:ml-0"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary transform md:-translate-x-1/2 border-4 border-background glow-effect" aria-hidden="true" />

                <div
                  className={`ml-8 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                >
                  <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow border border-border hover:border-primary/30 transition-colors">
                    {/* Header */}
                    <div className={`flex flex-wrap items-start gap-4 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div className={index % 2 === 0 ? "md:text-right" : ""}>
                        <h3 className="font-heading text-xl font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-primary font-medium mt-1">
                          <Building2 className="w-4 h-4" aria-hidden="true" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <time className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        {exp.period}
                      </time>
                      <span>{exp.location}</span>
                    </div>

                    {/* Responsibilities */}
                    <ul className={`space-y-2 text-muted-foreground ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex} className={`flex gap-2 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <span className="text-primary mt-1.5 shrink-0" aria-hidden="true">•</span>
                          <span className="text-sm leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
