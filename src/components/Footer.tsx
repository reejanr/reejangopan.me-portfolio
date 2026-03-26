import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Linkedin, Mail, Phone, Share2 } from "lucide-react";
import { getMailtoHref } from "@/lib/email";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";
const SITE_URL = "https://reejangopan.me";

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn Profile - Reejan Gopan" },
    { icon: Mail, href: getMailtoHref(), label: "Email Reejan Gopan" },
    { icon: Phone, href: "tel:+971527123154", label: "Call Reejan Gopan" },
  ];

  const shareLinks = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}` },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent("Check out Reejan Gopan - Digital Marketing & IT Expert in Dubai")}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent("Reejan Gopan - Digital Marketing & IT Expert Dubai " + SITE_URL)}` },
  ];
  
  return (
    <footer 
      className="py-16 border-t border-border/30 bg-background dark noise-bg" 
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a 
              href="#home" 
              className="flex items-center gap-2" 
              aria-label="Reejan Gopan - Back to top"
              title="reejangopan.me - Reejan Gopan Portfolio"
            >
              <span className="font-heading text-xl font-bold text-foreground">
                Reejan<span className="gradient-text">.</span>
              </span>
            </a>

            <nav className="flex items-center gap-3" aria-label="Social media links - Reejan Gopan">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </nav>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8" aria-label="Footer navigation - Reejan Gopan Portfolio">
            {[
              { href: "#about", label: "About", title: "About Reejan Gopan - Digital Marketing Expert Dubai" },
              { href: "#experience", label: "Experience", title: "Reejan Gopan Work Experience - USF GROUP LLC Dubai" },
              { href: "#services", label: "Services", title: "Digital Marketing & IT Services Dubai - Reejan Gopan" },
              { href: "#skills", label: "Skills", title: "Reejan Gopan Technical Skills - Google Ads, SEO, React" },
              { href: "#contact", label: "Contact", title: "Contact Reejan Gopan - Hire Digital Marketing Expert" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                title={link.title}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Sharing */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="uppercase tracking-wider">Share:</span>
            {shareLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                title={`Share on ${link.label}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Authority Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="uppercase tracking-wider">Find me on:</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline-offset-2 hover:underline" title="Reejan Gopan LinkedIn Profile">LinkedIn</a>
            <span className="text-border/50">•</span>
            <a href="https://g.co/kgs/ReejanGopan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline-offset-2 hover:underline" title="Reejan Gopan Google Knowledge Panel">Google</a>
            <span className="text-border/50">•</span>
            <a href="https://www.google.com/maps/place/Dubai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline-offset-2 hover:underline" title="Dubai UAE Location - Reejan Gopan">Dubai, UAE</a>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 pt-6 border-t border-border/20">
            <p className="text-xs text-muted-foreground text-center">
              © {currentYear} <span itemProp="name">Reejan R Gopan</span>. All rights reserved.
            </p>
            <span className="hidden md:inline text-border/30">|</span>
            <a 
              href="https://reejangopan.me" 
              className="text-xs text-primary/70 hover:text-primary hover:underline transition-colors"
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
