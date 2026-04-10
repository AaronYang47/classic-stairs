import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { scrollToSection, scrollToTop } from '../../lib/scrollToSection';
import { SITE } from '../../lib/siteInfo';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#configurator', label: 'Design' },
  { href: '#materials', label: 'Materials' },
  { href: '#process', label: 'Process' },
  { href: '#calculator', label: 'Quote' },
  { href: '#contact', label: 'Contact' },
];

const barClass =
  'max-w-7xl mx-auto flex items-center justify-between rounded-[var(--radius-xl)] px-4 sm:px-6 py-3 pointer-events-auto bg-black/25 backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.12)]';

const linkClass =
  'text-sm font-medium text-zinc-200 hover:text-accent-alt transition-colors duration-200 relative group drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]';

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const goTo = (href: string) => {
    setIsMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-3 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={barClass}>
          <a
            href="#top"
            className="flex items-center gap-2.5"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" className="text-accent" aria-hidden>
              <path d="M8 32L20 8L32 32H8Z" stroke="currentColor" strokeWidth="2" fill="none" />
              <line x1="12" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="2" />
              <line x1="14" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
              Luxe Stairs
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => goTo(link.href)}
                className={linkClass}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="flex items-center gap-2 text-sm font-medium text-zinc-200 hover:text-accent-alt transition-colors drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]"
            >
              <Phone size={17} />
              <span>{SITE.phoneDisplay}</span>
            </a>
            <button type="button" onClick={() => goTo('#calculator')} className="btn-primary text-sm py-2.5 px-5">
              Get quote
            </button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 -mr-2 rounded-[var(--radius-md)] text-zinc-300 hover:text-zinc-100"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden flex flex-col bg-zinc-950/98 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="font-display text-xl font-semibold text-zinc-100">Luxe Stairs</span>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="text-zinc-300 p-2 rounded-[var(--radius-md)] hover:bg-white/5 hover:text-zinc-100"
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className="text-left text-lg text-zinc-200 py-3 px-3 rounded-[var(--radius-md)] border-b border-white/5 hover:bg-white/5"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <div className="mt-auto p-6">
              <button type="button" onClick={() => goTo('#calculator')} className="btn-primary w-full justify-center">
                Get quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
