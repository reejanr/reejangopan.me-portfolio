import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, Globe, ArrowUpRight, CheckCircle2 } from "lucide-react";

const highlights = [
  "Attendance Management",
  "Workforce Administration",
  "Employee Tracking",
  "Operational Reporting",
  "Payroll Workflow Support",
  "Mobile Application",
  "Web Application",
  "Business Process Automation",
  "Real-Time Data Management",
];

const stack = ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "REST APIs", "Mobile App"];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 sm:py-32 bg-background dark relative overflow-hidden"
      aria-label="Featured Project — Waqti Workforce Management Platform"
    >
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container px-6 relative">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Featured Project
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Waqti — Workforce Management Platform
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            A business-critical platform actively used at USF Group — available on web and as a mobile application on Google Play.
          </p>
        </motion.header>

        <div className="max-w-6xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl p-6 sm:p-10 glass-card neon-border overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" aria-hidden="true" />

            <div className="relative grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-3 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live in production
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium glass">
                    <Smartphone className="w-3.5 h-3.5 text-primary" />
                    Web + Mobile
                  </span>
                </div>

                <div className="space-y-4 text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
                  <p>
                    <strong className="text-foreground">Waqti</strong> is a workforce management platform developed for USF Group to streamline attendance management, workforce administration, operational reporting, employee tracking, and business operations.
                  </p>
                  <p>
                    The platform includes both web and mobile applications and is actively used within the organization. It helps improve operational efficiency, workforce visibility, reporting accuracy, and overall productivity through automation and centralized management.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-primary mb-3">Technology Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium glass text-foreground/80 border border-primary/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-primary-foreground bg-gradient-primary neon-glow text-sm hover:opacity-90 transition-all"
                  >
                    <Smartphone className="w-4 h-4" />
                    Google Play
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium glass neon-border text-foreground hover:bg-card/50 transition-all text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    Discuss a project
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wider text-primary mb-4">Project Highlights</p>
                <ul className="space-y-2.5">
                  {highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      className="flex items-center gap-2.5 text-sm text-foreground/85"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
