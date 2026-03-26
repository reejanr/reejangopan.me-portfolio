import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Languages, Target } from "lucide-react";

const SectionHeader = ({ label, title, description, isInView }: { label: string; title: string; description: React.ReactNode; isInView: boolean }) => (
  <motion.header
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
    className="text-center mb-20"
  >
    <motion.span 
      className="inline-block text-primary font-medium tracking-[0.25em] uppercase text-xs px-4 py-1.5 rounded-full glass border border-primary/20 mb-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.1 }}
    >
      {label}
    </motion.span>
    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
      {title}
    </h2>
    <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
      {description}
    </p>
  </motion.header>
);

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const education = [
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "Sree Narayana College Of Technology, Kollam — Kerala University, India",
      year: "2021-2024",
    },
    {
      degree: "Higher Secondary (HSS)",
      institution: "Nedumgolam Govt: H.S., Kollam, Kerala, India",
      year: "2019-2021",
      note: "Participant — Kerala State IT Fair 2019 (HSS/VHSS Animation), Government of Kerala",
    },
  ];

  const languages = ["English", "Malayalam", "Tamil", "Hindi"];

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }
    }
  };

  return (
    <section 
      id="about" 
      className="section-spacing bg-background dark noise-bg" 
      ref={ref}
      aria-label="About Reejan Gopan - Background and Qualifications"
    >
      <div className="container px-6 relative z-10">
        <SectionHeader
          label="About Reejan Gopan"
          title="Background & Qualifications"
          description={<>Learn more about <strong className="text-foreground">Reejan R Gopan</strong>'s education, achievements, and professional background as a Digital Marketing Expert & IT Specialist in Dubai and India.</>}
          isInView={isInView}
        />

        <motion.div 
          className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 lg:gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
            }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Objective */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover-glow"
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors" 
              aria-hidden="true"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Target className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Career Objective</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Experienced <strong className="text-foreground">Digital Marketing Expert</strong>, <strong className="text-foreground">System Administrator in Dubai</strong> and <strong className="text-foreground">Frontend Developer in UAE</strong> seeking 
              challenging roles that leverage digital marketing expertise, IT infrastructure management, Windows Server, Microsoft 365, and modern web development skills 
              to drive business success through innovative solutions, <strong className="text-foreground">SEO strategy</strong>, and <strong className="text-foreground">AI automation</strong>. 
              Serving clients across <strong className="text-foreground">Dubai, UAE, and India</strong>.
            </p>
          </motion.article>

          {/* Education */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover-glow"
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors" 
              aria-hidden="true"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <GraduationCap className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  className="border-l-2 border-primary/30 pl-4 hover:border-primary/60 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                >
                  <p className="text-primary text-xs font-semibold tracking-wider uppercase">{edu.year}</p>
                  <p className="text-foreground font-medium text-sm mt-1">{edu.degree}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{edu.institution}</p>
                  {(edu as any).note && (
                    <p className="text-primary/80 text-xs mt-1.5 font-medium">{(edu as any).note}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.article>

          {/* Languages */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover-glow"
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors" 
              aria-hidden="true"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Languages className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Languages</h3>
            <ul className="flex flex-wrap gap-3">
              {languages.map((lang, index) => (
                <motion.li
                  key={index}
                  className="px-4 py-2 rounded-xl glass text-sm font-medium text-foreground border border-border/30 hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {lang}
                </motion.li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm mt-6">
              <strong className="text-foreground">Reejan Gopan</strong> is a multilingual professional with strong communication skills across diverse cultural contexts.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};
