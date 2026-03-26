import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About", title: "About Reejan Gopan" },
    { href: "#experience", label: "Experience", title: "Work Experience - USF GROUP LLC Dubai" },
    { href: "#services", label: "Services", title: "Digital Marketing & IT Services Dubai" },
    { href: "#skills", label: "Skills", title: "Technical Skills - Google Ads, SEO, React" },
    { href: "#contact", label: "Contact", title: "Contact Reejan Gopan" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center gap-2" aria-label="Reejan Gopan - Home">
              <span className="font-heading text-xl font-bold text-foreground">
                Reejan<span className="gradient-text">.</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 px-4 py-2 rounded-lg hover:bg-primary/5 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-accent transition-all duration-300 group-hover:w-3/4 rounded-full" />
                </a>
              ))}
              <a
                href="https://www.linkedin.com/in/reejan-r-gopan-38a8092b9"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-5 py-2 rounded-xl text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 bg-gradient-primary hover-glow"
              >
                Hire Me
              </a>
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute top-16 left-4 right-4 glass-strong rounded-2xl p-6"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-primary/5"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="https://www.linkedin.com/in/reejan-r-gopan-38a8092b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-center font-medium text-primary-foreground mt-2 bg-gradient-primary"
                >
                  Hire Me
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
