import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { galleryImages } from '../../data/galleryImages';
import type { GalleryImage } from '../../data/galleryImages';

const categories = ['All', 'Modern', 'Spiral', 'Curved', 'Classic', 'Industrial', 'Minimalist'];

const SWIPE_THRESHOLD = 50;

/* ─── Ambient Particles ──────────────────────────────────── */
const PARTICLE_COUNT = 22;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function Particles() {
  const particles = useRef<Particle[]>(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.08,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: 'radial-gradient(circle, #c4a574 0%, #a67c2d 100%)',
            animation: `particle-rise ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section Header Decoration ──────────────────────────── */
function SectionAccent() {
  return (
    <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6" aria-hidden>
      <motion.span
        className="block h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-accent/50"
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <svg width="22" height="18" viewBox="0 0 22 18" fill="none" className="text-accent/70 shrink-0">
        <path
          d="M1 17 L7 11 L11 15 L17 9 L21 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
      <motion.span
        className="block h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-accent/50"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </div>
  );
}

/* ─── Image Card ─────────────────────────────────────────── */
function ImageCard({ image, onClick, index }: { image: GalleryImage; onClick: () => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.42), ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="relative group cursor-pointer overflow-hidden rounded-[var(--radius-xl)] touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      whileHover={{ scale: 1.025, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Ambient glow on hover */}
      <div
        className="absolute inset-0 rounded-[var(--radius-xl)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(166, 124, 45, 0.18) 0%, transparent 70%)',
          transform: 'scale(1.08)',
        }}
        aria-hidden
      />

      {/* Mobile: always-on bottom fade; desktop: appears on hover */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:duration-500 pointer-events-none"
        style={{ transform: 'translateZ(30px)' }}
        aria-hidden
      />
      <motion.img
        src={image.src}
        alt={image.title}
        className="w-full aspect-[4/3] sm:aspect-auto sm:h-64 md:h-72 object-cover transition-transform duration-500 md:group-hover:scale-105"
        loading="lazy"
        style={{ transform: 'translateZ(0)' }}
      />
      {/* Info: always visible on mobile; hover on md+ */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4 translate-y-0 opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 md:duration-500 ease-out"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="glass-dark-soft rounded-[var(--radius-md)] sm:rounded-[var(--radius-lg)] p-3 sm:p-5 shadow-lg">
          <span className="text-accent-alt text-[11px] sm:text-sm font-medium mb-0.5 sm:mb-1 block">
            {image.category}
          </span>
          <h3 className="font-display text-base sm:text-xl font-semibold text-white mb-1 leading-snug line-clamp-2 sm:line-clamp-none drop-shadow-sm">
            {image.title}
          </h3>
          <p className="text-stone-200/95 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
            {image.description}
          </p>
          <div className="mt-2 sm:mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25">
                <Eye size={15} className="text-white sm:w-4 sm:h-4" aria-hidden />
              </span>
              <span>
                <span className="sm:hidden">Open</span>
                <span className="hidden sm:inline">View project</span>
              </span>
            </div>
            <span className="text-[10px] sm:hidden text-stone-400 font-medium shrink-0">Tap for full screen</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Gallery ────────────────────────────────────────────── */
export function Gallery() {
  const { ref, isVisible } = useScrollReveal();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const filteredImages =
    activeCategory === 'All' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (image: GalleryImage) => {
    const idx = filteredImages.findIndex((img) => img.id === image.id);
    setSelectedImage(image);
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 350);
  };

  const currentIndexRef = useRef(currentIndex);
  const filteredImagesRef = useRef(filteredImages);
  const isAnimatingRef = useRef(isAnimating);

  useLayoutEffect(() => {
    currentIndexRef.current = currentIndex;
    filteredImagesRef.current = filteredImages;
    isAnimatingRef.current = isAnimating;
  }, [currentIndex, filteredImages, isAnimating]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (isAnimatingRef.current) return;
    setIsAnimating(true);

    const idx = currentIndexRef.current;
    const imgs = filteredImagesRef.current;
    const len = imgs.length;
    if (len === 0) return;

    const newIndex =
      direction === 'prev' ? (idx === 0 ? len - 1 : idx - 1) : idx === len - 1 ? 0 : idx + 1;

    setCurrentIndex(newIndex);
    setSelectedImage(imgs[newIndex]);

    setTimeout(() => setIsAnimating(false), 350);
  }, []);

  const onLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx > 0) navigate('prev');
    else navigate('next');
  };

  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
        return;
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      if (isAnimatingRef.current) return;
      const idx = currentIndexRef.current;
      const imgs = filteredImagesRef.current;
      const len = imgs.length;
      if (len === 0) return;
      setIsAnimating(true);
      const newIndex =
        e.key === 'ArrowLeft' ? (idx === 0 ? len - 1 : idx - 1) : idx === len - 1 ? 0 : idx + 1;
      setCurrentIndex(newIndex);
      setSelectedImage(imgs[newIndex]);
      window.setTimeout(() => setIsAnimating(false), 350);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden" ref={ref}>
      {/* Ambient background layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        <Particles />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-8 sm:mb-16 px-1"
        >
          <SectionAccent />
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-ink mt-3 sm:mt-4">
            Our creations
          </h2>
          <p className="text-secondary text-sm sm:text-lg max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed">
            Explore our collection of meticulously crafted staircases.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll chips; desktop: wrap */}
        <motion.div
          className="mb-6 sm:mb-12 -mx-3 sm:mx-0 px-3 sm:px-0"
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <div
            className="flex gap-2 sm:flex-wrap sm:justify-center overflow-x-auto pb-2 sm:pb-0 snap-x snap-mandatory sm:snap-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
            role="tablist"
            aria-label="Filter by style"
          >
            {categories.map((category, i) => (
              <motion.button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`relative shrink-0 snap-start min-h-[44px] px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all border touch-manipulation overflow-hidden ${
                  activeCategory === category
                    ? 'bg-accent text-white border-accent shadow-[0_0_16px_rgba(166,124,45,0.35)]'
                    : 'bg-zinc-900/90 text-secondary border border-white/10 active:bg-zinc-800'
                }`}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.04 }}
              >
                {activeCategory === category && (
                  <motion.span
                    layoutId="active-chip"
                    className="absolute inset-0 bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, i) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.38 }}
              >
                <ImageCard image={image} onClick={() => openLightbox(image)} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-stone-950/97 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: lightboxOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <motion.button
              type="button"
              className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-[60] glass !rounded-full p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-white active:opacity-80 shadow-lg touch-manipulation"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              whileTap={{ scale: 0.9, rotate: 90 }}
              aria-label="Close"
            >
              <X size={22} />
            </motion.button>

            {/* Mobile bottom bar for prev/next */}
            <div className="sm:hidden flex items-center justify-between gap-2 px-3 pt-14 pb-2 shrink-0 border-b border-white/10 bg-black/20">
              <button
                type="button"
                className="flex h-12 min-w-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-white/10 text-white text-sm font-medium touch-manipulation active:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('prev');
                }}
              >
                <ChevronLeft size={22} />
                Previous
              </button>
              <button
                type="button"
                className="flex h-12 min-w-[44px] flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-white/10 text-white text-sm font-medium touch-manipulation active:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('next');
                }}
              >
                Next
                <ChevronRight size={22} />
              </button>
            </div>

            <motion.button
              type="button"
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 glass !rounded-full items-center justify-center text-white hover:text-accent z-50 shadow-lg touch-manipulation"
              onClick={(e) => {
                e.stopPropagation();
                navigate('prev');
              }}
              whileTap={{ scale: 0.9, x: -3 }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-1 flex-col items-center justify-center min-h-0 w-full max-w-[100vw] sm:max-w-[95vw] px-3 sm:px-4 py-3 sm:py-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onLightboxTouchStart}
              onTouchEnd={onLightboxTouchEnd}
            >
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full w-auto max-h-[min(52vh,420px)] sm:max-h-[70vh] object-contain rounded-[var(--radius-md)] sm:rounded-[var(--radius-lg)]"
                initial={{ scale: 0.94 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                draggable={false}
              />
              <p className="mt-2 text-[11px] text-zinc-500 sm:hidden">Swipe image left or right to browse</p>
              <motion.div
                className="mt-3 sm:mt-5 max-w-lg w-full glass-dark rounded-[var(--radius-lg)] px-4 py-3 sm:px-5 sm:py-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <span className="text-accent-alt text-xs font-medium">{selectedImage.category}</span>
                <h3 className="font-display text-lg sm:text-2xl font-semibold text-white mt-1 drop-shadow-sm">
                  {selectedImage.title}
                </h3>
                <p className="text-stone-200/95 mt-2 text-sm leading-relaxed text-left sm:text-center">
                  {selectedImage.description}
                </p>
              </motion.div>
            </motion.div>

            <motion.button
              type="button"
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 glass !rounded-full items-center justify-center text-white hover:text-accent z-50 shadow-lg touch-manipulation"
              onClick={(e) => {
                e.stopPropagation();
                navigate('next');
              }}
              whileTap={{ scale: 0.9, x: 3 }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </motion.button>

            <div
              className="flex justify-center gap-2 py-3 sm:py-0 sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 shrink-0 px-2"
              style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
            >
              {filteredImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                    setSelectedImage(filteredImages[idx]);
                  }}
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation sm:min-h-0 sm:min-w-0 sm:p-0 ${
                    idx === currentIndex ? 'opacity-100' : 'opacity-55'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                  aria-current={idx === currentIndex}
                >
                  <span
                    className={`block rounded-full transition-all sm:min-h-[8px] sm:min-w-[8px] ${
                      idx === currentIndex ? 'h-2.5 w-8 sm:w-8 bg-accent' : 'h-2 w-2 sm:w-2 bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes particle-rise {
          0% { transform: translateY(0) scale(1); opacity: inherit; }
          50% { transform: translateY(-60px) scale(1.3); opacity: calc(inherit * 1.4); }
          100% { transform: translateY(-120px) scale(0.8); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
