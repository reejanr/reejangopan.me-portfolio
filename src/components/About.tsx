import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Languages, Target } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="about" className="py-24 bg-secondary/30 dark" ref={ref}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">About Me</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Background & Qualifications
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Objective */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-2xl p-8 card-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Objective</h3>
            <p className="text-muted-foreground leading-relaxed">
              Results-driven IT professional seeking challenging roles that leverage technical skills 
              to drive business success and improve operational efficiency through innovative solutions 
              and automation.
            </p>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 card-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary/30 pl-4">
                  <p className="text-primary text-sm font-medium">{edu.year}</p>
                  <p className="text-foreground font-medium">{edu.degree}</p>
                  <p className="text-muted-foreground text-sm">{edu.institution}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 card-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Languages className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Languages</h3>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border"
                >
                  {lang}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              Multilingual professional with strong communication skills across diverse cultural contexts.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
