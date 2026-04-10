import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

export function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const containerRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const dragging = useRef(false);

  const updateSplit = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.max(5, Math.min(95, pct)));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateSplit(e.clientX);
  }, [updateSplit]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateSplit(e.clientX);
  }, [updateSplit]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const start = performance.now();
    const from = 50;
    const to = 35;
    const duration = 800;
    const bounce = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setSplit(from + (to - from) * ease);
      if (t < 1) frame = requestAnimationFrame(bounce);
      else {
        setTimeout(() => {
          const start2 = performance.now();
          const back = () => {
            const elapsed2 = performance.now() - start2;
            const t2 = Math.min(elapsed2 / 600, 1);
            const ease2 = 1 - Math.pow(1 - t2, 3);
            setSplit(to + (50 - to) * ease2);
            if (t2 < 1) requestAnimationFrame(back);
          };
          requestAnimationFrame(back);
        }, 200);
      }
    };
    const timeout = setTimeout(() => { frame = requestAnimationFrame(bounce); }, 400);
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="before-after"
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            Transformation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mt-4">
            Before & After
          </h2>
          <p className="text-secondary text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Drag the slider to reveal the transformation — from traditional to modern elegance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Comparison container */}
          <div
            ref={containerRef}
            className="relative rounded-[var(--radius-xl)] overflow-hidden cursor-col-resize select-none touch-none shadow-2xl group"
            style={{ aspectRatio: '4 / 3' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuenow={Math.round(split)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* After (full background) */}
            <img
              src={`${BASE}after.png`}
              alt="After: modern open-riser staircase with glass railings and pendant lighting"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
            >
              <img
                src={`${BASE}before.png`}
                alt="Before: traditional oak staircase with turned spindles and carpet"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-[3px] -translate-x-1/2 pointer-events-none"
              style={{ left: `${split}%` }}
            >
              <div className="h-full w-full bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
            </div>

            {/* Drag handle */}
            <div
              className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${split}%` }}
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.35)] border-2 border-white/80"
                animate={{ scale: dragging.current ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <ArrowLeftRight size={20} className="text-zinc-800 sm:w-6 sm:h-6" />
              </motion.div>
            </div>

            {/* Labels */}
            <motion.div
              className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase"
              style={{
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(8px)',
                color: '#e4e4e7',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              Before
            </motion.div>

            <motion.div
              className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase"
              style={{
                background: 'rgba(166,124,45,0.65)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              After
            </motion.div>

            {/* Hint (fades out after interaction) */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full text-xs sm:text-sm text-white/80 font-medium"
              style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              whileHover={{ opacity: 0 }}
            >
              ← Drag to compare →
            </motion.div>
          </div>

          {/* Caption */}
          <motion.div
            className="mt-6 sm:mt-8 grid sm:grid-cols-2 gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="glass-dark-soft rounded-[var(--radius-lg)] p-4 sm:p-5">
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider">Before</span>
              <p className="text-stone-200 text-sm sm:text-base mt-1.5 leading-relaxed">
                Traditional oak spindle staircase with carpet treads — functional but dated, lacking the openness the homeowner desired.
              </p>
            </div>
            <div className="glass-dark-soft rounded-[var(--radius-lg)] p-4 sm:p-5 border-accent/20 border">
              <span className="text-accent text-xs font-semibold uppercase tracking-wider">After</span>
              <p className="text-stone-200 text-sm sm:text-base mt-1.5 leading-relaxed">
                Modern open-riser design with dark hardwood treads, glass railings, and pendant lighting — a dramatic transformation.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
