import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#09090b] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              className="relative w-24 h-24 mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 L50 50 M50 50 L75 75"
                  stroke="#8b6914"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(139, 105, 20, 0.2)"
                  strokeWidth="2"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#8b6914"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="251"
                  strokeDashoffset="251"
                  animate={{ strokeDashoffset: [251, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            <motion.div
              className="font-display text-2xl text-ink mb-2"
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Luxe Stairs
            </motion.div>
            <motion.div
              className="text-accent text-sm tracking-widest uppercase"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Crafting Excellence
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}