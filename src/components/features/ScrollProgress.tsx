import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-2 z-50 overflow-hidden rounded-b-[var(--radius-md)] pointer-events-none">
        <motion.div
          className="h-full w-full origin-left rounded-b-[var(--radius-md)]"
          style={{
            background: 'linear-gradient(90deg, #8b6914, #c4a574)',
            scaleX: progress / 100,
          }}
          initial={{ scaleX: 0 }}
        />
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-accent/95 backdrop-blur-sm border border-white/25 flex items-center justify-center shadow-lg shadow-stone-900/15 hover:scale-110 hover:shadow-xl transition-all z-40"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="text-white" size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}