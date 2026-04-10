import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { scrollToSection } from '../../lib/scrollToSection';

const HERO_IMAGE = `${import.meta.env.BASE_URL}hero-lobby.png`;

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Grand modern lobby with illuminated marble staircase and glass railings"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Stronger top tint for transparent header; bottom blends into site black */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/45 to-[#09090b]/92"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
          aria-hidden
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <motion.span
            className="font-accent text-accent-alt text-sm sm:text-base tracking-[0.2em] uppercase mb-4 sm:mb-5 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Custom stairs & railings
          </motion.span>

          <motion.h1
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.08] mb-4 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06 }}
          >
            Bringing your vision
            <br />
            <span className="text-accent-alt">to new heights</span>
          </motion.h1>

          <motion.div
            className="mx-auto w-16 h-px bg-accent/90 mb-5 sm:mb-7"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.75, delay: 0.28 }}
          />

          <motion.p
            className="text-stone-100/95 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            Family-level care, precision joinery, and timeless design — from curved oak to modern glass,
            crafted for homes that deserve a centerpiece.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              type="button"
              onClick={() => scrollToSection('#calculator')}
              className="btn-primary text-base px-7 py-3.5 justify-center shadow-lg shadow-black/25"
            >
              Get a free quote
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('#gallery')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[var(--radius-md)] font-medium text-white border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/18 hover:border-white/45 transition-colors shadow-inner"
            >
              View gallery
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-14 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <button
            type="button"
            onClick={() => scrollToSection('#about')}
            className="inline-flex flex-col items-center text-stone-300 hover:text-white transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          >
            <span className="text-xs tracking-widest uppercase mb-1.5">Discover</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown size={20} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
