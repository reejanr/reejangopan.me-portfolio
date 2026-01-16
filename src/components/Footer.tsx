import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-border bg-background dark" role="contentinfo">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <a href="#home" className="flex items-center gap-2" aria-label="Back to top">
            <span className="font-heading text-xl font-bold text-foreground">
              Reejan<span className="text-primary">.</span>
            </span>
          </a>

          <nav className="flex items-center gap-8" aria-label="Footer navigation">
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#experience" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Experience
            </a>
            <a href="#skills" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Skills
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Reejan R Gopan. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
