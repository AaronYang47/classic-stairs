import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MessageSquare, Pencil, Cog, Wrench, Calendar, ChevronDown } from 'lucide-react';
import { scrollToSection } from '../../lib/scrollToSection';

const steps = [
  {
    icon: MessageSquare,
    title: 'Consultation',
    description:
      'We begin with understanding your vision, space constraints, and design preferences.',
    hint: 'Tell us your goals',
  },
  {
    icon: Pencil,
    title: 'Design',
    description:
      'Our designers create detailed 3D renderings, refining every detail until perfection.',
    hint: 'Review & refine together',
  },
  {
    icon: Cog,
    title: 'Manufacturing',
    description:
      'We craft each component in our state-of-the-art workshop with precision.',
    hint: 'Built to specification',
  },
  {
    icon: Wrench,
    title: 'Installation',
    description:
      'Our expert team handles complete installation with flawless execution.',
    hint: 'Finished in your home',
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16, y: 12 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 28 },
  },
};

type ProcessProps = {
  onBookConsultation?: () => void;
};

export function Process({ onBookConsultation }: ProcessProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/50" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            How it works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mt-4">
            Our process
          </h2>
          <p className="text-secondary text-base sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed">
            Four stages, one path — scroll down to follow the journey from first conversation to
            installed staircase.
          </p>
          {/* Progress hint */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-white/10 bg-black/30 px-4 py-2 text-xs text-secondary backdrop-blur-sm">
            <span className="font-medium text-accent-alt">4 steps</span>
            <span className="text-zinc-600">·</span>
            <span>Start at the top, finish at installation</span>
          </div>
        </motion.div>

        {/* Vertical journey timeline — staggered steps read top → bottom */}
        <motion.div
          className="relative"
          role="list"
          aria-label="Project process steps"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
        >
          {/* Continuous rail — gradient suggests forward motion */}
          <div
            className="pointer-events-none absolute left-[21px] sm:left-[27px] top-10 bottom-[4.5rem] w-[3px] rounded-full bg-gradient-to-b from-accent/90 via-accent/35 to-zinc-800 hidden sm:block"
            aria-hidden
          />

          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const StepIcon = step.icon;

            return (
              <motion.div
                key={step.title}
                role="listitem"
                variants={itemVariants}
                className={`relative ${isLast ? '' : 'pb-10 sm:pb-14'}`}
              >
                  {/* Mobile: stack; sm+: row with rail */}
                  <div className="flex gap-4 sm:gap-6">
                    {/* Step column: number + icon + connector chevron */}
                    <div className="flex shrink-0 flex-col items-center sm:w-[3.5rem]">
                      <div
                        className="relative z-10 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-zinc-800 bg-gradient-to-br from-accent to-amber-900/90 text-white shadow-lg shadow-black/40 ring-4 ring-[#09090b]"
                        aria-hidden
                      >
                        <span className="font-display text-sm sm:text-base font-bold tabular-nums">
                          {i + 1}
                        </span>
                      </div>
                      {!isLast && (
                        <div
                          className="mt-2 flex flex-col items-center text-accent/60 sm:hidden"
                          aria-hidden
                        >
                          <ChevronDown className="opacity-80" size={18} strokeWidth={2} />
                          <div className="mt-1 h-8 w-px bg-gradient-to-b from-accent/50 to-zinc-700" />
                        </div>
                      )}
                    </div>

                    {/* Card */}
                    <div className="min-w-0 flex-1 pt-0.5 sm:pt-1">
                      <div className="glass-card p-5 sm:p-6 text-left border border-white/5">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                            Step {i + 1} of {steps.length}
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span className="text-[11px] text-secondary">{step.hint}</span>
                        </div>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-accent/15 text-accent">
                            <StepIcon size={20} strokeWidth={2} />
                          </div>
                          <div>
                            <h3 className="font-display text-lg sm:text-xl font-semibold text-ink leading-tight">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-secondary text-sm sm:text-base leading-relaxed pl-0 sm:pl-[52px] sm:-mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
              </motion.div>
            );
          })}

          {/* End cap — “journey complete” */}
          <motion.div
            variants={itemVariants}
            className="mt-4 sm:mt-2 ml-0 sm:ml-[3.25rem] pl-0 sm:pl-6 border-t border-dashed border-white/10 pt-8 text-center sm:text-left"
          >
            <p className="text-sm text-secondary mb-4">
              Ready to take step one? Book a consultation and we&apos;ll walk you through the rest.
            </p>
            <button
              type="button"
              onClick={() => (onBookConsultation ? onBookConsultation() : scrollToSection('#contact'))}
              className="btn-primary"
            >
              <Calendar size={18} />
              Book a consultation
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
