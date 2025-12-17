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
      title: "IT Support",
      skills: [
        "Hardware & Software Troubleshooting",
        "System Installation & Configuration",
        "Microsoft Office, Office365, Outlook",
        "CCTV System Design & Implementation",
      ],
    },
    {
      icon: Network,
      title: "Networking",
      skills: [
        "Basic Networking",
        "Email Hosting & Server Configuration",
        "Web Hosting & DNS Management",
        "ERP Administration",
      ],
    },
    {
      icon: Code,
      title: "Web Development",
      skills: [
        "Website Design",
        "Responsive & Mobile-Friendly Design",
        "MySQL Database",
        "SEO Implementation",
      ],
    },
    {
      icon: Palette,
      title: "Design",
      skills: [
        "UX Design",
        "UI Design",
        "User Experience Optimization",
        "Visual Design",
      ],
    },
    {
      icon: Bot,
      title: "AI & Automation",
      skills: [
        "AI Automation Tools",
        "Workflow Automation",
        "Process Optimization",
        "AI-Driven Solutions",
      ],
    },
    {
      icon: BarChart3,
      title: "Digital Marketing",
      skills: [
        "Google Analytics",
        "Google Ads",
        "Social Media Marketing",
        "Analytics & Reporting",
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
        "System Maintenance",
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-muted/50" ref={ref}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Expertise</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Skills & Technologies
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            A comprehensive skill set spanning IT infrastructure, web development, and digital solutions.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="group bg-card rounded-2xl p-5 sm:p-6 card-shadow border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
