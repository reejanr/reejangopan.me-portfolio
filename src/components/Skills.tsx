import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Monitor, Network, Code, Bot, BarChart3, Palette,
  Server, Shield, Zap, GitBranch, Search
} from "lucide-react";

const skillCategories = [
  {
    icon: Code, title: "Frontend Development",
    skills: ["React.js + TypeScript", "Tailwind CSS", "shadcn/ui", "State Management", "Form Handling"],
    accent: "from-cyan-400 to-blue-500",
  },
  {
    icon: GitBranch, title: "Deployment & CI/CD",
    skills: ["Git Workflows", "Continuous Deployment", "Environment Config", "Preview Deployments"],
    accent: "from-violet-400 to-purple-500",
  },
  {
    icon: Search, title: "SEO & Marketing",
    skills: ["Meta Tags & Schema", "Google Ads Tracking", "Analytics", "Search Visibility"],
    accent: "from-emerald-400 to-teal-500",
  },
  {
    icon: Zap, title: "Web Performance",
    skills: ["Static & Hybrid Sites", "Asset Optimization", "Accessibility", "Core Web Vitals"],
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: Bot, title: "AI Development",
    skills: ["AI Workflows", "Rapid Prototyping", "Code Debugging", "Business→Features"],
    accent: "from-pink-400 to-rose-500",
  },
  {
    icon: Monitor, title: "System Admin",
    skills: ["Windows Server", "M365 & AD", "VPS Management", "Troubleshooting"],
    accent: "from-sky-400 to-blue-500",
  },
  {
    icon: Network, title: "Network & Hosting",
    skills: ["DNS Config", "Email Hosting", "Firewalls", "WordPress & CMS"],
    accent: "from-indigo-400 to-blue-500",
  },
  {
    icon: BarChart3, title: "Digital Marketing",
    skills: ["Google Ads PPC", "Meta Ads", "Analytics & GSC", "Social Media", "Local SEO"],
    accent: "from-rose-400 to-red-500",
  },
  {
    icon: Palette, title: "Design",
    skills: ["UX/UI Design", "Visual Design", "UX Optimization", "Brand Identity"],
    accent: "from-fuchsia-400 to-pink-500",
  },
  {
    icon: Server, title: "Systems",
    skills: ["Server Admin", "Biometric Devices", "Printer Config", "Data Recovery"],
    accent: "from-teal-400 to-cyan-500",
  },
  {
    icon: Shield, title: "Security",
    skills: ["Antivirus", "Access Permissions", "Group Policies", "System Optimization"],
    accent: "from-red-400 to-orange-500",
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section 
      id="skills" 
      className="py-24 sm:py-32 bg-background dark relative overflow-hidden" 
      ref={ref}
      aria-label="Skills"
    >
      <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
      
      <div className="container px-6 relative">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Expertise
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Technical Skills
          </h2>
        </motion.header>

        {/* Masonry-like bento grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {skillCategories.map((cat, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group rounded-2xl p-5 glass-card neon-border hover:bg-card/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.accent} flex items-center justify-center`}>
                  <cat.icon className="w-4.5 h-4.5 text-white" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{cat.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {cat.skills.map((skill, si) => (
                  <motion.li
                    key={si}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.04 + si * 0.03 }}
                    className="text-xs text-muted-foreground flex items-center gap-2 group-hover:text-foreground/70 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" aria-hidden="true" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
