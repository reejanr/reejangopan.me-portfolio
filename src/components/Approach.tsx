import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Gauge, Wrench, TrendingUp } from "lucide-react";

const pillars = [
  { icon: Lightbulb, title: "Business-first thinking", description: "Every application, automation, and system is designed to improve efficiency, reduce manual work, and support organizational goals." },
  { icon: Wrench, title: "AI-assisted development", description: "Modern AI workflows and rapid prototyping to design, build, deploy, and improve business applications faster." },
  { icon: Gauge, title: "Reliable & scalable", description: "Solutions built for long-term scalability, usability, and reliability — not just shipping code, but supporting the business." },
  { icon: TrendingUp, title: "Continuous improvement", description: "Practical problem-solving and iterative refinement so systems keep evolving with the organization's needs." },
];

export const Approach = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="approach"
      ref={ref}
      className="relative py-28 sm:py-36 overflow-hidden"
      aria-label="Development Approach"
    >
      <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 hairline" />

      <div className="container relative">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <span className="eyebrow mb-5">
            <span className="w-1 h-1 rounded-full bg-primary" /> 04 — Approach
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] mt-4">
            <span className="gradient-text">Technology that</span>{" "}
            <span className="italic text-foreground/70">solves real problems.</span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-12 gap-4 sm:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 rounded-3xl p-7 sm:p-10 glass-card ring-soft flex flex-col justify-between"
          >
            <div>
              <p className="font-heading text-3xl sm:text-4xl text-foreground/95 tracking-tight leading-[1.1] mb-6">
                Outcomes <span className="italic text-foreground/60">over</span> output.
              </p>
              <div className="space-y-4 text-foreground/65 text-[15px] leading-relaxed">
                <p>
                  I believe technology should solve real business problems — combining AI-assisted development, rapid prototyping, practical problem-solving and continuous improvement.
                </p>
                <p>
                  Rather than focusing only on code, I focus on business outcomes. Every application and automation is designed to improve efficiency, reduce manual work and support organizational goals.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-foreground/[0.08] flex items-center justify-between">
              <span className="eyebrow !text-foreground/50">Method</span>
              <span className="font-heading text-foreground/80">Design · Build · Deploy · Improve</span>
            </div>
          </motion.div>

          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {pillars.map((p, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="rounded-3xl p-6 sm:p-7 glass-card ring-soft"
              >
                <span className="w-11 h-11 rounded-2xl bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center mb-5">
                  <p.icon className="w-5 h-5 text-primary" />
                </span>
                <h3 className="font-heading text-xl sm:text-2xl text-foreground/95 tracking-tight leading-tight mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{p.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
