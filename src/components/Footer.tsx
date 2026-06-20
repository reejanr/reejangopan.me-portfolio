import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Linkedin, Share2, ArrowUpRight } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9";
const SITE_URL = "https://reejangopan.me";

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const currentYear = new Date().getFullYear();

  const shareLinks = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}` },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent("Reejan Gopan — Information Technology Administrator, Dubai")}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent("Reejan Gopan — IT Administrator & Business Systems Developer " + SITE_URL)}` },
  ];

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Expertise", href: "#services" },
    { label: "Work", href: "#projects" },
    { label: "Stack", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      ref={ref}
      className="relative pt-20 pb-10 border-t border-foreground/[0.06] overflow-hidden"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="absolute inset-x-0 top-0 h-px hairline" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-12 gap-10 mb-14"
        >
          {/* Brand */}
          <div className="col-span-12 md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-2.5 mb-5" aria-label="Back to top">
              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="font-heading text-lg text-primary-foreground -mt-0.5">R</span>
              </div>
              <span className="font-heading text-2xl text-foreground tracking-tight">Reejan Gopan</span>
            </a>
            <p className="text-sm text-foreground/55 max-w-sm leading-relaxed">
              Information Technology Administrator combining enterprise systems, business application development, automation and digital operations at USF Group, Dubai.
            </p>
          </div>

          {/* Nav */}
          <div className="col-span-6 md:col-span-3">
            <p className="eyebrow !text-foreground/45 mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-6 md:col-span-4">
            <p className="eyebrow !text-foreground/45 mb-4">Connect</p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group mb-5"
            >
              <Linkedin className="w-4 h-4" />
              <span className="font-heading text-lg">LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-2 flex items-center gap-1.5">
                <Share2 className="w-3 h-3" /> Share
              </p>
              <div className="flex flex-wrap gap-1.5">
                {shareLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-full text-xs text-foreground/70 bg-foreground/[0.04] border border-foreground/10 hover:border-primary/25 hover:text-foreground transition-colors"
                    title={`Share on ${link.label}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="pt-8 border-t border-foreground/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/45">
            © {currentYear} <span itemProp="name">Reejan R Gopan</span> · All rights reserved.
          </p>
          <p className="text-xs text-foreground/45">
            Crafted in Dubai · <a href="https://reejangopan.me" className="text-foreground/70 hover:text-primary transition-colors">reejangopan.me</a>
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
