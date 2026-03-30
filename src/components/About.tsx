import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Languages, Target, Award, Calendar } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const education = [
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "Sree Narayana College Of Technology, Kollam — Kerala University",
      year: "2021-2024",
    },
    {
      degree: "Higher Secondary (HSS)",
      institution: "Nedumgolam Govt: H.S., Kollam, Kerala",
      year: "2019-2021",
      note: "Participant — Kerala State IT Fair 2019",
    },
  ];

  const languages = ["English", "Malayalam", "Tamil", "Hindi"];

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "10+", label: "Projects Delivered" },
    { value: "3", label: "Companies" },
    { value: "4", label: "Languages" },
  ];

  return (
    <section 
      id="about" 
      className="py-24 sm:py-32 bg-background dark relative overflow-hidden" 
      ref={ref}
      aria-label="About Reejan Gopan"
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
            About Me
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Background & Qualifications
          </h2>
        </motion.header>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="text-center p-5 rounded-2xl glass-card hover:border-primary/20 transition-all"
            >
              <p className="font-heading text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Objective - spans 2 on lg */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-2 rounded-2xl p-6 sm:p-8 glass-card neon-border hover:bg-card/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center" aria-hidden="true">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Career Objective</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Experienced <strong className="text-foreground">Digital Marketing Expert</strong>, <strong className="text-foreground">System Administrator</strong> and <strong className="text-foreground">Frontend Developer</strong> seeking 
              challenging roles that leverage digital marketing expertise, IT infrastructure management, and modern web development skills 
              to drive business success through innovative solutions in <strong className="text-foreground">Dubai, UAE</strong> and <strong className="text-foreground">India</strong>.
            </p>
          </motion.article>

          {/* Languages */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-6 sm:p-8 glass-card neon-border hover:bg-card/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center" aria-hidden="true">
                <Languages className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.article>

          {/* Education - spans full width */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-3 rounded-2xl p-6 sm:p-8 glass-card neon-border hover:bg-card/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center" aria-hidden="true">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Education</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {education.map((edu, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-center gap-2 text-primary text-xs font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.year}
                  </div>
                  <p className="text-foreground font-medium text-sm">{edu.degree}</p>
                  <p className="text-muted-foreground text-xs mt-1">{edu.institution}</p>
                  {edu.note && (
                    <p className="flex items-center gap-1.5 text-primary/80 text-xs mt-2 font-medium">
                      <Award className="w-3 h-3" />
                      {edu.note}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
