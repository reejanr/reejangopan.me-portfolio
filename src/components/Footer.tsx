import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Linkedin, Mail, Phone, Share2, Heart } from "lucide-react";
import { getMailtoHref } from "@/lib/email";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";
const SITE_URL = "https://reejangopan.me";

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn" },
    { icon: Mail, href: getMailtoHref(), label: "Email" },
    { icon: Phone, href: "tel:+971527123154", label: "Phone" },
  ];

  const shareLinks = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}` },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent("Reejan Gopan — Information Technology Administrator, Dubai")}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent("Reejan Gopan — IT Administrator & Business Systems Developer " + SITE_URL)}` },
  ];
  
  return (
    <footer 
      className="py-16 border-t border-border/50 bg-background dark relative" 
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" aria-hidden="true" />
      
      <div className="container px-6 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          {/* Top */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="#home" className="flex items-center gap-2 group" aria-label="Back to top">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">R</span>
              </div>
              <span className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                Reejan
              </span>
            </a>

            <nav className="flex items-center gap-3" aria-label="Social links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </nav>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8" aria-label="Footer navigation">
            {[
              { label: "About", href: "#about" },
              { label: "Experience", href: "#experience" },
              { label: "Expertise", href: "#services" },
              { label: "Project", href: "#projects" },
              { label: "Stack", href: "#skills" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Sharing */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Share:</span>
            {shareLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md glass hover:text-primary hover:border-primary/20 transition-all"
                title={`Share on ${link.label}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              © {currentYear} <span itemProp="name">Reejan R Gopan</span> · Made with <Heart className="w-3 h-3 text-primary" /> in Dubai
            </p>
            <a 
              href="https://reejangopan.me" 
              className="text-xs text-primary hover:underline"
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
