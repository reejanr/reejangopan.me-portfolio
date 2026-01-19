import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Monitor, 
  Network, 
  Code, 
  Bot, 
  BarChart3, 
  Palette,
  Server,
  Shield
} from "lucide-react";

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      icon: Monitor,
      title: "IT Infrastructure",
      skills: [
        "Systems Management",
        "Hardware & Software Troubleshooting",
        "Virtual Private Server (VPS)",
        "Microsoft 365 Administration",
      ],
    },
    {
      icon: Network,
      title: "Web & Hosting",
      skills: [
        "WordPress Design & Development",
        "Wix Website Builder",
        "Email Hosting & Management",
        "DNS Management",
      ],
    },
    {
      icon: Code,
      title: "Web Development",
      skills: [
        "Website Design & Maintenance",
        "Responsive & Mobile-Friendly Design",
        "MySQL Databases",
        "CMS Platforms",
      ],
    },
    {
      icon: BarChart3,
      title: "Digital Marketing",
      skills: [
        "Google Ads Management",
        "Meta Ads (Facebook/Instagram)",
        "Search Engine Optimization (SEO)",
        "Social Media Operations",
      ],
    },
    {
      icon: Bot,
      title: "SEO & Analytics",
      skills: [
        "On-Page Optimization",
        "Off-Page SEO",
        "Data Analysis & Reporting",
        "Google Analytics",
      ],
    },
    {
      icon: Palette,
      title: "Design",
      skills: [
        "UX/UI Design",
        "Visual Design",
        "User Experience Optimization",
        "Brand Identity",
      ],
    },
    {
      icon: Server,
      title: "Systems",
      skills: [
        "Windows Server Administration",
        "Biometric Device Management",
        "Printer Configuration",
        "Data Backup & Recovery",
      ],
    },
    {
      icon: Shield,
      title: "Security",
      skills: [
        "Antivirus Security",
        "Access Permissions",
        "Group Policies",
        "System Optimization",
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      className="py-24 bg-muted/50" 
      ref={ref}
      aria-label="Reejan Gopan Skills and Technologies"
    >
      <div className="container px-6">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Technical Expertise</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Reejan Gopan's Skills & Technologies
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            <strong>Reejan R Gopan</strong> specializes in website management, SEO strategy, Google Ads, Meta Ads, 
            social media operations, system optimization, email hosting, VPS setup, and scalable IT infrastructure development in <strong>Dubai, UAE</strong>.
          </p>
        </motion.header>

        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.2 }
            }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.article
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
                }
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-card rounded-2xl p-5 sm:p-6 card-shadow border border-border hover:border-primary/30 transition-all duration-300"
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors" 
                aria-hidden="true"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </motion.div>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skillIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 + skillIndex * 0.05 }}
                    className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
