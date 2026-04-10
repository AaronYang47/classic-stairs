import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Check, ChevronRight, ChevronLeft, Sparkles, Mail, Copy, MessageSquare } from 'lucide-react';
import {
  stairTypes, materials, finishes, extras, calculatePrice
} from '../../data/pricing';
import { QUOTE_DRAFT_STORAGE_KEY } from '../../lib/siteInfo';
import { summarizeQuote, buildMailtoQuoteUrl } from '../../lib/quoteSummary';
import { scrollToSection } from '../../lib/scrollToSection';
import { notifyQuoteDraftUpdated } from '../../lib/quoteDraftEvents';

const steps = ['Type', 'Dimensions', 'Material', 'Finish', 'Extras'];

const CONFETTI_PARTICLES = [...Array(50)].map((_, i) => ({
  xPct: ((i * 47) % 91) + 5,
  yPct: ((i * 73) % 91) + 5,
  delay: (i % 20) * 0.025,
}));

export function QuoteCalculator() {
  const { ref, isVisible } = useScrollReveal();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    width: 100,
    height: 280,
    steps: 15,
    material: '',
    finish: '',
    selectedExtras: [] as string[],
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [copyDone, setCopyDone] = useState(false);

  const springValue = useSpring(0, { stiffness: 100, damping: 30 });

  const updateFormData = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleExtra = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedExtras: prev.selectedExtras.includes(id)
        ? prev.selectedExtras.filter((e) => e !== id)
        : [...prev.selectedExtras, id],
    }));
  };

  const persistQuoteDraft = () => {
    try {
      const message = summarizeQuote(formData);
      sessionStorage.setItem(QUOTE_DRAFT_STORAGE_KEY, JSON.stringify({ message }));
      notifyQuoteDraftUpdated();
    } catch {
      /* storage full or disabled */
    }
  };

  const submitQuoteRequest = () => {
    if (!canProceed() || currentStep !== steps.length - 1) return;
    setQuoteSubmitted(true);
    persistQuoteDraft();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const nextStep = () => {
    if (!canProceed()) return;
    if (currentStep === steps.length - 1) {
      submitQuoteRequest();
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const copySummary = async () => {
    const text = summarizeQuote(formData);
    try {
      await navigator.clipboard.writeText(text);
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2500);
    } catch {
      /* clipboard denied */
    }
  };

  const goToContact = () => {
    persistQuoteDraft();
    scrollToSection('#contact');
  };

  const price = formData.type && formData.material && formData.finish
    ? calculatePrice(
        formData.type, formData.width, formData.height, formData.steps,
        formData.material, formData.finish, formData.selectedExtras
      )
    : null;

  useEffect(() => {
    if (price) {
      const targetValue = price.max;
      springValue.set(targetValue);
    }
  }, [price, springValue]);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!formData.type;
      case 1: return formData.width > 0 && formData.height > 0 && formData.steps > 0;
      case 2: return !!formData.material;
      case 3: return !!formData.finish;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/50 relative overflow-hidden" ref={ref}>
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {CONFETTI_PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
              initial={{
                left: "50%",
                top: "50%",
                scale: 0,
                opacity: 1,
              }}
              animate={{
                left: `${p.xPct}%`,
                top: `${p.yPct}%`,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: p.delay,
                ease: "easeOut",
              }}
              style={{
                background: ['#c4a574', '#e8dfd0', '#8b6914', '#d4c4a8', '#a89060'][i % 5],
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mt-4">
            Get a quote
          </h2>
          <p className="text-secondary text-base sm:text-lg max-w-2xl mx-auto mt-4 px-2">
            Configure your staircase and receive an instant estimated price.
          </p>
        </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-4 sm:p-6 md:p-10 relative overflow-hidden"
          >
          <AnimatePresence>
            {quoteSubmitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 rounded-[var(--radius-lg)] border border-accent/40 bg-accent/10 px-4 py-4 text-left"
              >
                <p className="text-ink font-medium text-sm sm:text-base mb-3">
                  Your configuration is saved in this browser. Next steps:
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                  <a
                    href={buildMailtoQuoteUrl(formData)}
                    className="btn-primary text-sm py-2.5 justify-center no-underline !inline-flex"
                  >
                    <Mail size={16} />
                    Email estimate
                  </a>
                  <button type="button" onClick={copySummary} className="btn-secondary text-sm py-2.5 justify-center">
                    <Copy size={16} />
                    {copyDone ? 'Copied' : 'Copy details'}
                  </button>
                  <button type="button" onClick={goToContact} className="btn-secondary text-sm py-2.5 justify-center">
                    <MessageSquare size={16} />
                    Open contact form
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-accent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: (currentStep + 1) / steps.length }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <div className="flex items-center justify-between mb-6 sm:mb-8 overflow-x-auto pb-2">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center min-w-[60px] sm:min-w-0">
                <motion.div
                  className="flex flex-col items-center"
                  initial={false}
                  animate={i <= currentStep ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all relative ${
                      i < currentStep
                        ? 'bg-accent text-white'
                        : i === currentStep
                        ? 'bg-accent/15 text-accent border-2 border-accent'
                        : 'bg-zinc-900/80 text-secondary border-2 border-white/10'
                    }`}
                  >
                    {i < currentStep ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check size={14} />
                      </motion.div>
                    ) : (
                      i + 1
                    )}
                    {i === currentStep && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-accent"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <span className={`text-xs mt-2 hidden sm:block ${
                    i === currentStep ? 'text-ink font-medium' : 'text-secondary'
                  }`}>
                    {step}
                  </span>
                </motion.div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-4 sm:w-8 md:w-16 h-0.5 mx-0.5 sm:mx-1 md:mx-2 rounded-full transition-colors duration-300 ${
                      i < currentStep ? 'bg-accent' : 'bg-zinc-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -30, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {currentStep === 0 && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {stairTypes.map((type, i) => (
                    <motion.button
                      key={type.id}
                      onClick={() => updateFormData('type', type.id)}
                      className={`p-4 sm:p-6 rounded-[var(--radius-lg)] text-left transition-all ${
                        formData.type === type.id
                          ? 'bg-accent/20 border-2 border-accent'
                          : 'bg-glass border-2 border-transparent hover:border-accent/50'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="font-display text-base sm:text-lg font-semibold text-ink mb-1">{type.name}</div>
                      <div className="text-secondary text-xs sm:text-sm">{type.description}</div>
                      <div className="text-accent text-xs sm:text-sm mt-2 font-medium">From ${type.basePrice.toLocaleString()}</div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {currentStep === 1 && (
                <div className="space-y-5 sm:space-y-6 px-1">
                  {[
                    { key: 'width', label: 'Stair Width', value: formData.width, min: 70, max: 150, unit: 'cm' },
                    { key: 'height', label: 'Total Height', value: formData.height, min: 200, max: 400, unit: 'cm' },
                    { key: 'steps', label: 'Number of Steps', value: formData.steps, min: 5, max: 30, unit: 'steps' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-ink font-medium text-sm sm:text-base">{item.label}</label>
                        <motion.span
                          className="text-accent font-bold text-sm sm:text-base"
                          key={item.value}
                          initial={{ scale: 1.2, color: '#c4a574' }}
                          animate={{ scale: 1, color: '#8b6914' }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.value} {item.unit}
                        </motion.span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min={item.min}
                          max={item.max}
                          value={item.value}
                          onChange={(e) => updateFormData(item.key, Number(e.target.value))}
                          className="w-full h-2 bg-glass rounded-[var(--radius-full)] appearance-none cursor-pointer accent-accent"
                        />
                        <motion.div
                          className="absolute top-0 left-0 h-2 bg-accent/30 rounded-[var(--radius-full)]"
                          style={{ width: `${((item.value - item.min) / (item.max - item.min)) * 100}%` }}
                          layoutId={`progress-${item.key}`}
                          transition={{ type: "spring", stiffness: 100, damping: 30 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {materials.map((material, i) => (
                    <motion.button
                      key={material.id}
                      onClick={() => updateFormData('material', material.id)}
                      className={`p-4 sm:p-6 rounded-[var(--radius-lg)] text-left transition-all ${
                        formData.material === material.id
                          ? 'bg-accent/20 border-2 border-accent'
                          : 'bg-glass border-2 border-transparent hover:border-accent/50'
                      }`}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-display text-base sm:text-lg font-semibold text-ink">{material.name}</div>
                          <div className="text-secondary text-xs sm:text-sm">
                            {material.priceMultiplier === 1 ? 'Base price' : `+${Math.round((material.priceMultiplier - 1) * 100)}%`}
                          </div>
                        </div>
                        {formData.material === material.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {finishes.map((finish, i) => (
                    <motion.button
                      key={finish.id}
                      onClick={() => updateFormData('finish', finish.id)}
                      className={`p-4 sm:p-6 rounded-[var(--radius-lg)] text-left transition-all ${
                        formData.finish === finish.id
                          ? 'bg-accent/20 border-2 border-accent'
                          : 'bg-glass border-2 border-transparent hover:border-accent/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-display text-base sm:text-lg font-semibold text-ink">{finish.name}</div>
                          <div className="text-secondary text-xs sm:text-sm">
                            {finish.priceAddition === 0 ? 'Included' : `+$${finish.priceAddition.toLocaleString()}`}
                          </div>
                        </div>
                        {formData.finish === finish.id && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                          >
                            <Check size={14} className="text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <p className="text-secondary mb-4 sm:mb-6 text-sm sm:text-base">Select additional features (optional):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {extras.map((extra, i) => (
                      <motion.button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-4 sm:p-5 rounded-[var(--radius-lg)] text-left transition-all flex items-center justify-between gap-2 ${
                          formData.selectedExtras.includes(extra.id)
                            ? 'bg-accent/20 border-2 border-accent'
                            : 'bg-glass border-2 border-transparent hover:border-accent/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <span className="text-ink font-medium text-sm sm:text-base">{extra.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-accent font-medium text-xs sm:text-sm">+${extra.price.toLocaleString()}</span>
                          {formData.selectedExtras.includes(extra.id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"
                            >
                              <Check size={12} className="text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-glass-border">
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="btn-secondary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </motion.button>

            <motion.button
              onClick={nextStep}
              disabled={!canProceed()}
              className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: canProceed() ? 1.05 : 1 }}
              whileTap={{ scale: canProceed() ? 0.95 : 1 }}
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ChevronRight size={16} />
                </>
              ) : (
                <>
                  <Sparkles size={16} className="animate-pulse" />
                  <span className="hidden sm:inline">Request Quote</span>
                  <span className="sm:hidden">Submit</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {price && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 text-center relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="text-secondary text-xs sm:text-sm mb-2 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Estimated Price Range
              </motion.div>

              <motion.div
                className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-ink relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  ${price.min.toLocaleString()}
                </motion.span>
                <span className="text-accent mx-2">—</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ${price.max.toLocaleString()}
                </motion.span>
              </motion.div>

              <motion.p
                className="text-secondary text-xs sm:text-sm mt-3 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                This is an estimate. Contact us for a detailed quotation.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}