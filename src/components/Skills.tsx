import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Monitor, 
  Network, 
  Code, 
  Bot, 
  BarChart3, 
  Palette,
  Server,
  Shield,
  Zap,
  GitBranch,
  Search
} from "lucide-react";

const SkillTiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skillCategories = [
    {
      icon: Code,
      title: "Frontend Development",
      color: "185 70% 50%",
      skills: [
        "React.js with TypeScript",
        "Component-based Architecture & State Management",
        "Tailwind CSS for Responsive Design",
        "shadcn/ui for Accessible UI Components",
        "Form Handling & Validation",
      ],
    },
    {
      icon: GitBranch,
      title: "Deployment & CI/CD",
      color: "200 80% 50%",
      skills: [
        "Git-based Workflows (GitHub)",
        "Continuous Deployment",
        "Environment Variables & Production Builds",
        "Preview Deployments for Testing",
      ],
    },
    {
      icon: Search,
      title: "SEO & Marketing",
      color: "260 60% 60%",
      skills: [
        "On-page SEO: Meta Tags & Structured Data",
        "Google Ads Integration & Tracking",
        "Website Analytics & Performance Monitoring",
        "Optimizing Pages for Search Visibility",
      ],
    },
    {
      icon: Zap,
      title: "Web Performance",
      color: "45 90% 55%",
      skills: [
        "Fast-loading Static & Hybrid Websites",
        "Asset Optimization (Images, Scripts, Styles)",
        "Semantic HTML & Accessibility (WCAG)",
        "Core Web Vitals Optimization",
      ],
    },
    {
      icon: Bot,
      title: "AI-Assisted Development",
      color: "280 60% 55%",
      skills: [
        "AI Workflows to Accelerate Development",
        "Translating Business Requirements to Features",
        "Debugging & Refactoring AI-generated Code",
        "Rapid Prototyping & Iteration",
      ],
    },
    {
      icon: Monitor,
      title: "System Administration",
      color: "185 70% 50%",
      skills: [
        "Windows Server Administration",
        "Microsoft 365 & Active Directory",
        "Virtual Private Server (VPS) Management",
        "Hardware & Software Troubleshooting",
      ],
    },
    {
      icon: Network,
      title: "Network & Hosting",
      color: "200 80% 50%",
      skills: [
        "DNS Management & Configuration",
        "Email Hosting & Management",
        "Network Infrastructure & Firewall",
        "WordPress & CMS Platforms",
      ],
    },
    {
      icon: BarChart3,
      title: "Digital Marketing",
      color: "260 60% 60%",
      skills: [
        "SEO Strategy & On-page Optimization",
        "Google Ads PPC Campaign Management",
        "Meta Ads (Facebook & Instagram)",
        "Google Analytics & Search Console",
        "Social Media Marketing & Content Strategy",
        "Local SEO for Dubai & India",
      ],
    },
    {
      icon: Palette,
      title: "Design",
      color: "330 60% 55%",
      skills: [
        "UX/UI Design",
        "Visual Design",
        "User Experience Optimization",
        "Brand Identity",
      ],
    },
    {
      icon: Server,
      title: "Systems",
      color: "185 70% 50%",
      skills: [
        "Windows Server Administration",
        "Biometric Device Management",
        "Printer Configuration",
        "Data Backup & Recovery",
      ],
    },
    {
      icon: Shield,
      title: "Security",
      color: "0 70% 55%",
      skills: [
        "Antivirus Security",
        "Access Permissions",
        "Group Policies",
        "System Optimization",
      ],
    },
  ];

  return (
    <section 
      id="skills" 
      className="section-spacing bg-background dark noise-bg" 
      ref={ref}
      aria-label="Reejan Gopan Skills and Technologies"
    >
      <div className="container px-6 relative z-10">
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
            Technical Expertise
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Reejan Gopan's Digital Marketing & Technical Skills
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            <strong className="text-foreground">Reejan R Gopan</strong> specializes in digital marketing (SEO, Google Ads, Meta Ads), system administration, 
            website management, social media operations, VPS setup, and scalable IT infrastructure development in <strong className="text-foreground">Dubai, UAE</strong> and <strong className="text-foreground">India</strong>.
          </p>
        </motion.header>

        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.2 }
            }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
                }
              }}
            >
              <SkillTiltCard className="h-full perspective-1000">
                <article 
                  className="group h-full glass-card rounded-2xl p-5 sm:p-6 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, hsl(${category.color} / 0.2), transparent)` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                      style={{ background: `hsl(${category.color} / 0.1)` }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      aria-hidden="true"
                    >
                      <category.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `hsl(${category.color})` }} />
                    </motion.div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skillIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.3 + index * 0.05 + skillIndex * 0.03 }}
                          className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5"
                        >
                          <span 
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" 
                            style={{ background: `hsl(${category.color} / 0.6)` }}
                            aria-hidden="true"
                          />
                          <span>{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </article>
              </SkillTiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
