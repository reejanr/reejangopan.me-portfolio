import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
          
          <div className="flex flex-col items-center gap-8 relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-8 rounded-full bg-gradient-primary opacity-10 blur-2xl animate-pulse" aria-hidden="true" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center neon-glow">
                <span className="font-heading text-2xl font-bold text-primary-foreground">R</span>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 flex flex-col items-center gap-3">
              <div className="w-full h-0.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]"
              >
                Loading
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
