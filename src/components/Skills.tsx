import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Cloud, Workflow, Megaphone, Server } from "lucide-react";

const skillCategories = [
  {
    icon: Code2, title: "Frontend",
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "TanStack Router"],
  },
  {
    icon: Database, title: "Backend & Database",
    skills: ["Supabase", "PostgreSQL", "Server Functions", "REST APIs", "Authentication", "Database Design"],
  },
  {
    icon: Cloud, title: "Infrastructure & Cloud",
    skills: ["VPS Hosting", "Linux Servers", "DNS Management", "Email Hosting", "Microsoft 365", "Cloud Services"],
  },
  {
    icon: Workflow, title: "Business Systems & Apps",
    skills: ["Workforce Management", "Attendance Systems", "Payroll Support", "Internal Apps", "Process Automation", "Mobile Apps"],
  },
  {
    icon: Megaphone, title: "Digital Marketing & Web",
    skills: ["SEO", "Technical SEO", "Google Ads", "Meta Ads", "Website Management", "Performance"],
  },
  {
    icon: Server, title: "IT Administration",
    skills: ["Enterprise Systems", "Microsoft 365 Admin", "VPS & Server Management", "Network & DNS", "AI-Assisted Dev"],
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 sm:py-36 overflow-hidden"
      aria-label="Technology Stack"
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
            <span className="w-1 h-1 rounded-full bg-primary" /> 05 — Stack
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-4">
            <span className="gradient-text">Tools & platforms</span>{" "}
            <span className="italic text-foreground/70">I build with.</span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-12 gap-4 sm:gap-5">
          {skillCategories.map((cat, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.05 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl p-6 sm:p-7 glass-card ring-soft"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-2xl bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </span>
                <h3 className="font-heading text-xl text-foreground/95 tracking-tight">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, si) => (
                  <span
                    key={si}
                    className="px-3 py-1.5 rounded-full text-[12px] text-foreground/75 bg-foreground/[0.03] border border-foreground/[0.08] hover:border-primary/25 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
