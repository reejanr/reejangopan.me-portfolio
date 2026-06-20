import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import profileImage from "@/assets/profile.jpg";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      id="home"
      itemScope
      itemType="https://schema.org/Person"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-28 pb-24"
      aria-label="Reejan Gopan — Information Technology Administrator"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-aurora pointer-events-none animate-aurora" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.04] blur-[140px] pointer-events-none" aria-hidden="true" />

      <motion.div className="container relative z-10" style={{ opacity, y }}>
        <div className="max-w-5xl mx-auto text-center">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/70">
              Available · Based in Dubai, UAE
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-balance mb-6"
          >
            <span className="block gradient-text">Reejan Gopan</span>
            <span className="block italic font-light text-foreground/70 mt-2 text-[clamp(1.4rem,3.5vw,2.5rem)]">
              Information Technology Administrator
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/65 leading-relaxed mb-10 text-pretty"
          >
            Combining enterprise systems, infrastructure, business application development,
            and process automation to drive measurable digital impact at{" "}
            <span className="text-foreground">USF Group, Dubai</span>.
          </motion.p>

          {/* Profile + bento */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-12 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10"
          >
            {/* Portrait */}
            <figure className="col-span-12 sm:col-span-5 relative aspect-[4/5] sm:aspect-auto rounded-3xl overflow-hidden glass-card ring-soft">
              <img
                src={profileImage}
                alt="Reejan Gopan — Information Technology Administrator at USF Group, Dubai UAE"
                title="Reejan Gopan — IT Administrator & Business Systems Developer"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                width="500"
                height="625"
                itemProp="image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="eyebrow !text-foreground/85">USF Group · Dubai</span>
                <span className="w-9 h-9 rounded-full glass flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </span>
              </div>
              <figcaption className="sr-only">
                Reejan Gopan, Information Technology Administrator at USF Group, Dubai UAE
              </figcaption>
            </figure>

            {/* Stat tiles */}
            <div className="col-span-12 sm:col-span-7 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
              {[
                { v: "3+", l: "Years building enterprise systems" },
                { v: "10+", l: "Systems & apps delivered" },
                { v: "1", l: "Live product on Google Play" },
                { v: "AI", l: "Assisted development workflows" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.08 }}
                  className="rounded-2xl glass-card p-4 sm:p-5 ring-soft flex flex-col justify-between text-left"
                >
                  <p className="font-heading text-3xl sm:text-4xl text-foreground tracking-tight">
                    {s.v}
                  </p>
                  <p className="text-[11px] sm:text-xs text-foreground/55 leading-snug mt-2">
                    {s.l}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a href="#projects" className="btn-ghost">
              View featured work
            </a>
          </motion.div>

          {/* Meta strip */}
          <motion.address
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="not-italic mt-12 flex items-center justify-center gap-x-6 gap-y-2 flex-wrap text-[11px] uppercase tracking-[0.18em] text-foreground/45"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Dubai, UAE
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span>Enterprise Systems</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span>Business Apps</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span>Automation</span>
          </motion.address>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          aria-label="Scroll to next section"
          className="flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground/80 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-foreground/40 to-transparent"
          />
        </motion.a>
      </motion.div>
    </section>
  );
};
