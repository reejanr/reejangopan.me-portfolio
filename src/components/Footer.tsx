import { motion } from "framer-motion";
import { forwardRef } from "react";

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      className="py-8 border-t border-border bg-background dark" 
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <a 
            href="#home" 
            className="flex items-center gap-2" 
            aria-label="Reejan Gopan - Back to top"
            title="reejangopan.me - Reejan Gopan Portfolio"
          >
            <span className="font-heading text-xl font-bold text-foreground">
              Reejan<span className="text-primary">.</span>
            </span>
          </a>

          <nav className="flex items-center gap-8" aria-label="Footer navigation - Reejan Gopan Portfolio">
            <a 
              href="#about" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="About Reejan Gopan"
            >
              About
            </a>
            <a 
              href="#experience" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="Reejan Gopan Work Experience"
            >
              Experience
            </a>
            <a 
              href="#skills" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="Reejan Gopan Technical Skills"
            >
              Skills
            </a>
            <a 
              href="#contact" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="Contact Reejan Gopan"
            >
              Contact
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {currentYear} <span itemProp="name">Reejan R Gopan</span>. All rights reserved. | 
            <a 
              href="https://reejangopan.me" 
              className="text-primary hover:underline ml-1"
              title="reejangopan.me - Reejan Gopan Portfolio"
            >
              reejangopan.me
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
