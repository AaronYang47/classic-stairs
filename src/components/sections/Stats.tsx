import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Briefcase, ThumbsUp, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: Briefcase, value: 25, suffix: '+', label: 'Years of Experience' },
  { icon: Trophy, value: 500, suffix: '+', label: 'Projects Completed' },
  { icon: ThumbsUp, value: 98, suffix: '%', label: 'Client Satisfaction' },
  { icon: Award, value: 15, suffix: '+', label: 'Design Awards' },
];

function AnimatedNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, target]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section className="py-10 sm:py-16 px-3 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(166,124,45,0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative">
        <motion.div
          className="glass rounded-[var(--radius-xl)] py-8 sm:py-12 px-4 sm:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-accent/10 border border-accent/20 mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="font-display text-2xl sm:text-4xl font-bold text-ink">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} inView={inView} />
                  </div>
                  <p className="text-secondary text-xs sm:text-sm mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
