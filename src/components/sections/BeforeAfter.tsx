import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { beforeAfterProjects } from '../../data/beforeAfterProjects';

function CompareSlider({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePos(e.clientX);
    },
    [updatePos]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updatePos(e.clientX);
    },
    [updatePos]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    setPos(50);
  }, [before, after]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[var(--radius-xl)] overflow-hidden cursor-ew-resize select-none touch-pan-y"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* After (full background) */}
      <img
        src={after}
        alt="After renovation"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt="Before renovation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10 pointer-events-none"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 shadow-xl flex items-center justify-center backdrop-blur-sm pointer-events-auto touch-manipulation">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10L7 16" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full">
        Before
      </span>
      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-accent/80 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full">
        After
      </span>
    </div>
  );
}

export function BeforeAfter() {
  const { ref, isVisible } = useScrollReveal();
  const [activeIdx, setActiveIdx] = useState(0);
  const project = beforeAfterProjects[activeIdx];

  return (
    <section id="before-after" className="py-16 sm:py-28 px-3 sm:px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            Transformations
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-ink mt-3 sm:mt-4">
            Before &amp; after
          </h2>
          <p className="text-secondary text-sm sm:text-lg max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed">
            Drag the slider to reveal stunning staircase transformations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <CompareSlider before={project.before} after={project.after} />
            </motion.div>
          </AnimatePresence>

          {/* Project info */}
          <motion.div
            key={`info-${project.id}`}
            className="mt-5 sm:mt-6 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-lg sm:text-2xl font-semibold text-ink">
              {project.title}
            </h3>
            <p className="text-secondary text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] sm:text-xs font-medium text-accent-alt bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Project selector */}
          <div className="flex justify-center gap-3 mt-6 sm:mt-8">
            {beforeAfterProjects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all touch-manipulation ${
                  idx === activeIdx
                    ? 'bg-accent text-white border-accent shadow-[0_0_14px_rgba(166,124,45,0.3)]'
                    : 'bg-zinc-900/80 text-zinc-400 border-white/10 hover:border-white/20'
                }`}
              >
                Project {idx + 1}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
