import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Linkedin, Mail, Phone, Github, Twitter } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn Profile - Reejan Gopan" },
    { icon: Mail, href: "mailto:Reejanr90@gmail.com", label: "Email Reejan Gopan" },
    { icon: Phone, href: "tel:+971527123154", label: "Call Reejan Gopan" },
  ];
  
  return (
    <footer 
      className="py-12 border-t border-border bg-background dark" 
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
          className="flex flex-col gap-8"
        >
          {/* Top row - Logo and Social */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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

            {/* Social Links */}
            <nav className="flex items-center gap-4" aria-label="Social media links - Reejan Gopan">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </nav>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8" aria-label="Footer navigation - Reejan Gopan Portfolio">
            <a 
              href="#about" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="About Reejan Gopan - Digital Marketing Expert Dubai"
            >
              About
            </a>
            <a 
              href="#experience" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="Reejan Gopan Work Experience - USF GROUP LLC Dubai"
            >
              Experience
            </a>
            <a 
              href="#services" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="Digital Marketing & IT Services Dubai - Reejan Gopan"
            >
              Services
            </a>
            <a 
              href="#skills" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="Reejan Gopan Technical Skills - Google Ads, SEO, React"
            >
              Skills
            </a>
            <a 
              href="#contact" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              title="Contact Reejan Gopan - Hire Digital Marketing Expert"
            >
              Contact
            </a>
          </nav>

          {/* External Authority Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>Find me on:</span>
            <a 
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline-offset-2 hover:underline"
              title="Reejan Gopan LinkedIn Profile"
            >
              LinkedIn
            </a>
            <span className="text-border">•</span>
            <a 
              href="https://g.co/kgs/ReejanGopan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline-offset-2 hover:underline"
              title="Reejan Gopan Google Knowledge Panel"
            >
              Google
            </a>
            <span className="text-border">•</span>
            <a 
              href="https://www.google.com/maps/place/Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline-offset-2 hover:underline"
              title="Dubai UAE Location - Reejan Gopan"
            >
              Dubai, UAE
            </a>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © {currentYear} <span itemProp="name">Reejan R Gopan</span>. All rights reserved.
            </p>
            <span className="hidden md:inline text-border">|</span>
            <a 
              href="https://reejangopan.me" 
              className="text-sm text-primary hover:underline"
              title="reejangopan.me - Official Portfolio of Reejan Gopan"
            >
              reejangopan.me
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
