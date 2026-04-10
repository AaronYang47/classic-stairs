import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Award, Users, Clock, Heart } from 'lucide-react';

const stats = [
  { icon: Award, value: 40, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 2500, suffix: "+", label: "Projects Completed" },
  { icon: Clock, value: 100, suffix: "%", label: "Client Satisfaction" },
  { icon: Heart, value: 35, suffix: "", label: "Design Awards" },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
}

export function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mt-4 mb-4 sm:mb-6">
              Crafting excellence
              <br />
              <span className="text-accent">since 1985</span>
            </h2>
            <p className="text-secondary text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              For over four decades, Luxe Stairs has been at the forefront of staircase design
              and craftsmanship. What began as a small workshop in Brooklyn has grown into a
              globally recognized studio.
            </p>
            <p className="text-secondary text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Our philosophy is simple: every staircase should be a masterpiece. We blend
              traditional woodworking techniques with cutting-edge technology.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[var(--radius-md)] glass flex items-center justify-center flex-shrink-0">
                    <stat.icon className="text-accent" size={18} />
                  </div>
                  <div>
                    <div className="font-display text-xl sm:text-2xl font-semibold text-ink">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-secondary text-xs sm:text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-8 lg:mt-0"
          >
            <motion.div
              className="relative rounded-[var(--radius-xl)] overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                alt="Elegant wooden staircase with warm lighting in a luxury interior"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                loading="lazy"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 to-transparent" />

              <motion.div
                className="absolute inset-0 bg-accent/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 glass-card p-4 sm:p-6 rounded-[var(--radius-lg)] max-w-[85%] sm:max-w-xs"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-accent text-accent-alt text-base sm:text-lg italic">
                "Every step tells a story of passion and precision."
              </p>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 border-2 border-accent/30 rounded-full"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}