import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Gauge, Wrench, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: Lightbulb,
    title: "Business-First Thinking",
    description: "Every application, automation, and system is designed to improve efficiency, reduce manual work, and support organizational goals.",
  },
  {
    icon: Wrench,
    title: "AI-Assisted Development",
    description: "Modern AI workflows and rapid prototyping to design, build, deploy, and improve business applications faster.",
  },
  {
    icon: Gauge,
    title: "Reliable & Scalable",
    description: "Solutions built for long-term scalability, usability, and reliability — not just shipping code, but supporting the business.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "Practical problem-solving and iterative refinement so systems keep evolving with the organization's needs.",
  },
];

export const Approach = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="approach"
      ref={ref}
      className="py-24 sm:py-32 bg-background dark relative overflow-hidden"
      aria-label="Development Approach"
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
            Development Approach
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Technology That Solves Real Problems
          </h2>
        </motion.header>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-2 rounded-2xl p-6 sm:p-8 glass-card neon-border hover:bg-card/40 transition-all"
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
              Outcomes over output
            </h3>
            <div className="space-y-4 text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
              <p>
                I believe technology should solve real business problems. My development approach combines AI-assisted development, rapid prototyping, practical problem-solving, and continuous improvement to deliver scalable and maintainable solutions.
              </p>
              <p>
                Rather than focusing only on code, I focus on business outcomes. Every application, automation workflow, and system enhancement is designed to improve efficiency, reduce manual work, increase visibility, and support organizational goals.
              </p>
              <p>
                I leverage modern development tools and AI-assisted workflows to accelerate development while maintaining reliability, usability, and long-term scalability.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((p, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 glass-card neon-border hover:bg-card/40 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
