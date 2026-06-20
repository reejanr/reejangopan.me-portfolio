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
      className="relative py-28 sm:py-36 overflow-hidden"
      aria-label="Featured Project — Waqti Workforce Management Platform"
    >
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 hairline" />

      <div className="container relative">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <span className="eyebrow mb-5">
            <span className="w-1 h-1 rounded-full bg-primary" /> 06 — Featured Work
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-4">
            <span className="gradient-text">Waqti —</span>{" "}
            <span className="italic text-foreground/70">workforce management at scale.</span>
          </h2>
          <p className="text-foreground/60 mt-5 max-w-xl text-base">
            A business-critical platform actively used at USF Group — available on web and as a mobile application on Google Play.
          </p>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] p-7 sm:p-12 glass-card ring-soft overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left — narrative */}
            <div className="lg:col-span-7 space-y-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live in production
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.15em] glass text-foreground/70">
                  <Smartphone className="w-3 h-3 text-primary" />
                  Web + Mobile
                </span>
              </div>

              <p className="font-heading text-3xl sm:text-4xl text-foreground/95 leading-[1.1] tracking-tight">
                Streamlining attendance, workforce administration, operational reporting and employee management at <span className="italic text-foreground/65">USF Group</span>.
              </p>

              <div className="space-y-4 text-foreground/65 text-[15px] leading-relaxed">
                <p>
                  Waqti is a workforce management platform developed for USF Group to simplify attendance tracking, workforce administration, operational reporting and business operations. The platform includes both web and mobile applications and is actively used within the organization.
                </p>
                <p>
                  It helps improve operational efficiency, workforce visibility, reporting accuracy and overall productivity through automation and centralized management.
                </p>
              </div>

              <div>
                <p className="eyebrow !text-foreground/50 mb-3">Technology stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs text-foreground/80 bg-foreground/[0.04] border border-foreground/10">
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
                  className="btn-primary"
                >
                  <Smartphone className="w-4 h-4" />
                  Google Play
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href="#contact" className="btn-ghost">
                  <Globe className="w-4 h-4" />
                  Discuss a project
                </a>
              </div>
            </div>

            {/* Right — highlights */}
            <div className="lg:col-span-5">
              <p className="eyebrow !text-foreground/50 mb-5">Project highlights</p>
              <ul className="space-y-2">
                {highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-foreground/[0.025] border border-foreground/[0.06] hover:border-primary/20 hover:bg-foreground/[0.04] transition-colors text-sm text-foreground/85"
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
    </section>
  );
};
