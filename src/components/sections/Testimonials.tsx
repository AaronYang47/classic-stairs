import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (!isVisible || paused) return;
    const id = window.setInterval(next, 8000);
    return () => window.clearInterval(id);
  }, [isVisible, paused, next]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mt-4">
            Client stories
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass-card p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 left-6 sm:top-6 sm:left-8 text-6xl sm:text-8xl text-accent/20 font-display">"</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="flex gap-1 mb-4 sm:mb-6 justify-center">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="text-accent fill-accent" size={16} />
                  ))}
                </div>

                <p className="text-secondary text-base sm:text-lg md:text-xl leading-relaxed text-center mb-6 sm:mb-8 font-accent italic px-2">
                  {testimonials[current].quote}
                </p>

                <div className="text-center">
                  <div className="font-display text-lg sm:text-xl font-semibold text-ink">
                    {testimonials[current].author}
                  </div>
                  <div className="text-accent text-xs sm:text-sm mt-1">
                    {testimonials[current].role}
                  </div>
                  <div className="text-secondary text-xs sm:text-sm mt-1">
                    {testimonials[current].project}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-zinc-900/90 flex items-center justify-center text-ink hover:text-accent transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {testimonials.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === current ? 'true' : undefined}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? 'w-5 sm:w-6 bg-accent' : 'bg-glass-border hover:bg-accent/50'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-zinc-900/90 flex items-center justify-center text-ink hover:text-accent transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}