import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Code, Globe, Shield, Cloud, Megaphone } from "lucide-react";

const services = [
  {
    icon: Server,
    title: "System Administration in Dubai",
    description:
      "Professional system administrator services in Dubai including Windows Server setup, Active Directory, Group Policies, VPS configuration, and complete IT infrastructure management for businesses in UAE.",
  },
  {
    icon: Shield,
    title: "IT Administration & Support UAE",
    description:
      "End-to-end IT administration in Dubai — Microsoft 365 management, email hosting, DNS configuration, CCTV systems, biometric devices, antivirus security, and data backup & recovery.",
  },
  {
    icon: Code,
    title: "Frontend Development Dubai",
    description:
      "Custom frontend development in Dubai using React.js, TypeScript, and Tailwind CSS. Building fast, SEO-optimized, responsive business websites with modern UI/UX for companies in UAE.",
  },
  {
    icon: Globe,
    title: "Website Management & SEO",
    description:
      "Complete website management, on-page SEO optimization, structured data implementation, Core Web Vitals tuning, and search engine ranking strategies for Dubai businesses.",
  },
  {
    icon: Cloud,
    title: "Network & Cloud Administration",
    description:
      "Network administrator services in Dubai — firewall configuration, VPS management, cloud infrastructure, server monitoring, and scalable hosting solutions for UAE enterprises.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Dubai & India",
    description:
      "Top digital marketing services in Dubai and India — Google Ads PPC management, Meta Ads (Facebook & Instagram) campaigns, SEO strategy, social media marketing, Google Analytics setup, conversion tracking, and ROI-driven advertising for businesses across UAE and India.",
  },
];

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      id="services"
      className="section-spacing bg-background dark noise-bg"
      ref={ref}
      aria-label="Digital Marketing, System Administration & Frontend Developer Services in Dubai UAE and India"
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
            What I Offer
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4">
            Digital Marketing & IT Services in Dubai
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            <strong className="text-foreground">Reejan Gopan</strong> provides
            top digital marketing, SEO, Google Ads, Meta Ads, system administration, frontend
            development, and IT infrastructure services in{" "}
            <strong className="text-foreground">Dubai, UAE</strong> and <strong className="text-foreground">India</strong>.
          </p>
        </motion.header>

        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
                },
              }}
            >
              <TiltCard className="h-full perspective-1000">
                <article className="h-full glass-card rounded-2xl p-6 sm:p-7 hover:border-primary/30 transition-all duration-500 hover-glow group relative overflow-hidden">
                  {/* Glow accent */}
                  <div 
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" 
                    style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent)" }}
                    aria-hidden="true"
                  />
                  
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors"
                      aria-hidden="true"
                    >
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
