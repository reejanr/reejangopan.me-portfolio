import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Linkedin, ArrowUpRight } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 sm:py-40 overflow-hidden"
      aria-label="Contact"
    >
      <div className="absolute inset-0 bg-aurora opacity-80" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.07] blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 hairline" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="eyebrow justify-center mb-6"
          >
            <span className="w-1 h-1 rounded-full bg-primary" /> 07 — Contact
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] text-balance mb-8"
          >
            <span className="gradient-text">Let's build something</span>{" "}
            <span className="italic text-foreground/70">that works.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-foreground/65 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-12"
          >
            IT administration, business application development, automation, or digital
            operations — get in touch to discuss your project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-7 !py-3.5"
              title="Connect with Reejan Gopan on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a href="#projects" className="btn-ghost !px-7 !py-3.5">
              See featured work
            </a>
          </motion.div>

          <motion.address
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="not-italic inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass text-xs uppercase tracking-[0.18em] text-foreground/65"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Dubai, United Arab Emirates
          </motion.address>
        </div>
      </div>
    </section>
  );
};
