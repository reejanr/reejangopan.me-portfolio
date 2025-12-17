import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-background dark">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold text-foreground">
              Reejan<span className="text-primary">.</span>
            </span>
          </div>

          <nav className="flex items-center gap-8">
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
            © {new Date().getFullYear()} Reejan R Gopan
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
