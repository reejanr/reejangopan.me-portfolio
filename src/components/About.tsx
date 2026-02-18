import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Languages, Target } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const education = [
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "Sree Narayana College Of Technology, Kerala, India",
      year: "2021-2024",
    },
    {
      degree: "Higher Secondary",
      institution: "Kerala State Board, India",
      year: "2019-2021",
    },
  ];

  const languages = ["English", "Malayalam", "Tamil", "Hindi"];

  return (
    <section 
      id="about" 
      className="py-24 bg-background dark" 
      ref={ref}
      aria-label="About Reejan Gopan - Background and Qualifications"
    >
      <div className="container px-6">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">About Reejan Gopan</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Background & Qualifications
          </h2>
          <p className="text-foreground/80 mt-4 max-w-2xl mx-auto">
            Learn more about <strong>Reejan R Gopan</strong>'s education, skills, and professional background as an IT Specialist in Dubai.
          </p>
        </motion.header>

        <motion.div 
          className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8"
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
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
              }
            }}
            whileHover={{ y: -5 }}
            className="bg-card rounded-2xl p-8 card-shadow border border-border hover:border-primary/30 transition-colors"
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6" 
              aria-hidden="true"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Target className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Career Objective</h3>
            <p className="text-foreground/70 leading-relaxed">
              Results-driven <strong className="text-foreground">IT professional</strong> seeking challenging roles that leverage technical skills 
              to drive business success and improve operational efficiency through innovative solutions 
              and <strong className="text-foreground">AI automation</strong> in <strong className="text-foreground">Dubai, UAE</strong>.
            </p>
          </motion.article>

          {/* Education */}
          <motion.article
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
              }
            }}
            whileHover={{ y: -5 }}
            className="bg-card rounded-2xl p-8 card-shadow border border-border hover:border-primary/30 transition-colors"
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6" 
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
                  className="border-l-2 border-primary/30 pl-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                >
                  <p className="text-primary text-sm font-medium">{edu.year}</p>
                  <p className="text-foreground font-medium">{edu.degree}</p>
                  <p className="text-foreground/70 text-sm">{edu.institution}</p>
                </motion.div>
              ))}
            </div>
          </motion.article>

          {/* Languages */}
          <motion.article
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
              }
            }}
            whileHover={{ y: -5 }}
            className="bg-card rounded-2xl p-8 card-shadow border border-border hover:border-primary/30 transition-colors"
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6" 
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
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {lang}
                </motion.li>
              ))}
            </ul>
            <p className="text-foreground/70 text-sm mt-6">
              <strong className="text-foreground">Reejan Gopan</strong> is a multilingual professional with strong communication skills across diverse cultural contexts.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};
