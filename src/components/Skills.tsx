import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, Database, Cloud, Workflow, Megaphone, Server
} from "lucide-react";

const skillCategories = [
  {
    icon: Code2, title: "Frontend Technologies",
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "TanStack Router"],
    accent: "from-cyan-400 to-blue-500",
  },
  {
    icon: Database, title: "Backend & Database",
    skills: ["Supabase", "PostgreSQL", "Server Functions", "REST APIs", "Authentication", "Database Design"],
    accent: "from-violet-400 to-purple-500",
  },
  {
    icon: Cloud, title: "Infrastructure & Cloud",
    skills: ["VPS Hosting", "Linux Servers", "DNS Management", "Email Hosting", "Microsoft 365", "Cloud Services", "System Administration"],
    accent: "from-emerald-400 to-teal-500",
  },
  {
    icon: Workflow, title: "Business Systems & Apps",
    skills: ["Workforce Management", "Attendance Systems", "Payroll Support", "Internal Apps", "Process Automation", "API Integrations", "Mobile Apps"],
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: Megaphone, title: "Digital Marketing & Web",
    skills: ["SEO", "Technical SEO", "Google Ads", "Meta Ads", "Website Management", "Performance Optimization"],
    accent: "from-rose-400 to-pink-500",
  },
  {
    icon: Server, title: "IT Administration",
    skills: ["Enterprise Systems", "Microsoft 365 Admin", "VPS & Server Management", "Network & DNS", "Email Hosting", "AI-Assisted Development"],
    accent: "from-sky-400 to-blue-500",
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
      aria-label="Technology Stack"
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
            Technology Stack
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Tools & Platforms
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
            The technologies I use to build, automate, and operate business-critical systems.
          </p>
        </motion.header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skillCategories.map((cat, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group rounded-2xl p-6 glass-card neon-border hover:bg-card/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.accent} flex items-center justify-center`}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={si}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + index * 0.04 + si * 0.03 }}
                    className="px-2.5 py-1 rounded-md text-xs font-medium text-foreground/80 bg-secondary/40 border border-border/50 hover:border-primary/30 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
