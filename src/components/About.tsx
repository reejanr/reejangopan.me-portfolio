import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Languages, Sparkles, Calendar, Award } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const education = [
    {
      degree: "BCA — Bachelor of Computer Applications",
      institution: "Sree Narayana College Of Technology, Kollam — Kerala University",
      year: "2021 — 2024",
    },
    {
      degree: "Higher Secondary (HSS)",
      institution: "Nedumgolam Govt: H.S., Kollam, Kerala",
      year: "2019 — 2021",
      note: "Participant — Kerala State IT Fair 2019",
    },
  ];

  const languages = ["English", "Malayalam", "Tamil", "Hindi"];

  const paragraphs = [
    "I am an Information Technology Administrator specializing in enterprise systems, IT infrastructure, business applications, process automation, digital operations, and AI-assisted development.",
    "My work extends beyond traditional IT administration, combining technology, business operations, automation, and digital transformation to create efficient, scalable, and reliable solutions that support organizational growth.",
    "At USF Group, I manage and optimize the organization's technology ecosystem — enterprise applications, workforce management systems, Microsoft 365 administration, VPS and server infrastructure, email hosting, DNS, website operations, SEO, digital marketing technologies, and business process automation.",
    "I lead the development, implementation, and maintenance of business-critical solutions that streamline operations and improve productivity. By combining technical expertise with business understanding, I transform ideas into practical solutions that create measurable value.",
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 sm:py-36 overflow-hidden"
      aria-label="About Reejan Gopan"
    >
      <div className="absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 hairline" />

      <div className="container relative">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <span className="eyebrow mb-5">
            <span className="w-1 h-1 rounded-full bg-primary" /> 01 — About
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance leading-[1.02] mt-4">
            <span className="gradient-text">Technology, systems &</span>{" "}
            <span className="italic text-foreground/70">measurable business impact.</span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-12 gap-4 sm:gap-5">
          {/* Lead narrative — large bento */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-8 rounded-3xl p-7 sm:p-10 glass-card ring-soft"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 rounded-full bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </span>
              <span className="eyebrow !text-foreground/60">The role</span>
            </div>
            <div className="space-y-5 text-[15px] sm:text-base text-foreground/70 leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-foreground/85 text-lg sm:text-xl font-light leading-relaxed" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </motion.article>

          {/* Languages */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl p-7 sm:p-8 glass-card ring-soft flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 rounded-full bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
                <Languages className="w-4 h-4 text-primary" />
              </span>
              <span className="eyebrow !text-foreground/60">Languages</span>
            </div>
            <p className="font-heading text-3xl text-foreground/90 mb-6 leading-tight">
              Communicating across <span className="italic text-foreground/60">four</span> languages.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3.5 py-1.5 rounded-full text-xs text-foreground/80 bg-foreground/[0.04] border border-foreground/10"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Education */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 rounded-3xl p-7 sm:p-10 glass-card ring-soft"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-9 h-9 rounded-full bg-foreground/[0.04] border border-foreground/10 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary" />
              </span>
              <span className="eyebrow !text-foreground/60">Education</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 sm:p-6 bg-foreground/[0.02] border border-foreground/[0.06] hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground/55 mb-3">
                    <Calendar className="w-3 h-3" />
                    {edu.year}
                  </div>
                  <p className="font-heading text-xl text-foreground/95 leading-snug mb-1.5">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-foreground/55">{edu.institution}</p>
                  {edu.note && (
                    <p className="flex items-center gap-1.5 text-xs text-primary/80 mt-3">
                      <Award className="w-3 h-3" />
                      {edu.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
