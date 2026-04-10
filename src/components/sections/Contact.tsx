import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { SITE, QUOTE_DRAFT_STORAGE_KEY } from '../../lib/siteInfo';
import { QUOTE_DRAFT_EVENT } from '../../lib/quoteDraftEvents';

function loadDraftMessage(): string {
  try {
    const raw = sessionStorage.getItem(QUOTE_DRAFT_STORAGE_KEY);
    if (!raw) return '';
    const parsed = JSON.parse(raw) as { message?: string };
    return typeof parsed.message === 'string' ? parsed.message : '';
  } catch {
    return '';
  }
}

export function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState(() => ({
    name: '',
    email: '',
    phone: '',
    message: loadDraftMessage(),
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDraftUpdated = () => {
      const msg = loadDraftMessage();
      if (msg) {
        setFormData((prev) => ({ ...prev, message: prev.message || msg }));
      }
    };
    window.addEventListener(QUOTE_DRAFT_EVENT, onDraftUpdated);
    return () => window.removeEventListener(QUOTE_DRAFT_EVENT, onDraftUpdated);
  }, []);

  useEffect(() => {
    if (submitSuccess && successRef.current) {
      successRef.current.focus();
    }
  }, [submitSuccess]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      try {
        sessionStorage.removeItem(QUOTE_DRAFT_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    }, 1200);
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: `${SITE.addressLine1}, ${SITE.addressLine2}` },
    { icon: Phone, label: 'Phone', value: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` as const },
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` as const },
    { icon: Clock, label: 'Hours', value: SITE.hours },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mt-4">
            Contact us
          </h2>
          <p className="text-secondary text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Ready to transform your space? Get in touch to schedule a consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-6">
              Contact information
            </h3>
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[var(--radius-md)] bg-zinc-900 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-accent" size={18} />
                  </div>
                  <div>
                    <div className="text-secondary text-xs sm:text-sm">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-ink font-medium text-sm sm:text-base hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-ink font-medium text-sm sm:text-base">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-4 sm:p-6 rounded-[var(--radius-lg)]">
              <h4 className="font-display text-base sm:text-lg font-semibold text-ink mb-3 sm:mb-4">
                Visit our showroom
              </h4>
              <div className="aspect-video rounded-[var(--radius-md)] overflow-hidden bg-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1704040686324-e0552fbc9167?auto=format&fit=crop&w=600&q=80"
                  alt="Luxe Stairs showroom with modern glass staircase"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-secondary text-xs sm:text-sm mt-3 sm:mt-4">
                Experience our staircases in person. Schedule an appointment to visit
                our showroom and meet our design team.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-6">
              Send us a message
            </h3>

            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 flex items-start gap-3 rounded-[var(--radius-lg)] border border-accent/35 bg-amber-950/35 px-4 py-3 text-secondary text-sm"
                >
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={20} aria-hidden />
                  <div>
                    <p className="text-ink font-medium">Message sent</p>
                    <p className="mt-1">
                      Thank you. In a live deployment this would reach our team. For now, you can also email{' '}
                      <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                        {SITE.email}
                      </a>{' '}
                      or call {SITE.phoneDisplay}.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-ink font-medium mb-2 text-sm">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full ${errors.name ? 'error' : ''}`}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-ink font-medium mb-2 text-sm">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full ${errors.email ? 'error' : ''}`}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-ink font-medium mb-2 text-sm">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-ink font-medium mb-2 text-sm">Message *</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full resize-none ${errors.message ? 'error' : ''}`}
                  placeholder="Tell us about your staircase project..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center text-base py-3 sm:py-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
