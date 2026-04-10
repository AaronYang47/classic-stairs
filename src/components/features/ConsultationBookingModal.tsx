import { useState, useEffect, useCallback, useId, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Check,
  Building2,
  Video,
  PhoneCall,
  Home,
  Hammer,
  Fence,
  Compass,
  HelpCircle,
  MapPin,
  Banknote,
  CalendarClock,
  MessageSquare,
} from 'lucide-react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CONSULTATION_FORMATS = [
  { id: 'showroom', label: 'Showroom', sub: 'In person', Icon: Building2 },
  { id: 'video', label: 'Video', sub: 'Zoom / Meet', Icon: Video },
  { id: 'phone', label: 'Phone', sub: 'Voice call', Icon: PhoneCall },
] as const;

const PROJECT_TYPES = [
  { id: 'new', label: 'New staircase', Icon: Home },
  { id: 'reno', label: 'Renovation', Icon: Hammer },
  { id: 'railings', label: 'Railings only', Icon: Fence },
  { id: 'design', label: 'Design / quote', Icon: Compass },
  { id: 'unsure', label: 'Not sure yet', Icon: HelpCircle },
] as const;

const PROPERTY_TYPES = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
] as const;

const TIMELINES = [
  { id: 'asap', label: 'ASAP' },
  { id: '1-3m', label: '1–3 mo' },
  { id: '3-6m', label: '3–6 mo' },
  { id: 'planning', label: 'Planning' },
] as const;

const BUDGETS = [
  { id: 'under15', label: 'Under $15k' },
  { id: '15-35', label: '$15k – $35k' },
  { id: '35-60', label: '$35k – $60k' },
  { id: '60plus', label: '$60k +' },
  { id: 'discuss', label: 'Discuss later' },
] as const;

const REFERRALS = [
  { id: 'search', label: 'Google / search' },
  { id: 'social', label: 'Social media' },
  { id: 'referral', label: 'Friend / referral' },
  { id: 'architect', label: 'Architect / builder' },
  { id: 'other', label: 'Other' },
] as const;

const selectClass =
  'w-full rounded-[var(--radius-md)] bg-[#18181b] border border-white/12 text-zinc-100 py-3 px-3 text-sm focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20';

function buildCalendarGrid(year: number, month: number): (number | null)[][] {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function generateTimeSlots(date: Date): string[] {
  const slots: string[] = [];
  const now = new Date();
  const isToday = sameDay(date, now);
  for (let h = 9; h < 17; h++) {
    for (const m of [0, 30]) {
      if (h === 16 && m === 30) continue;
      const label = `${h.toString().padStart(2, '0')}:${m === 0 ? '00' : '30'}`;
      if (isToday) {
        const slotTime = new Date(date);
        slotTime.setHours(h, m, 0, 0);
        if (slotTime <= now) continue;
      }
      slots.push(label);
    }
  }
  return slots;
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ConsultationBookingModal({ open, onClose }: Props) {
  const titleId = useId();
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [consultationFormat, setConsultationFormat] = useState<(typeof CONSULTATION_FORMATS)[number]['id'] | ''>('');
  const [projectType, setProjectType] = useState<(typeof PROJECT_TYPES)[number]['id'] | ''>('');
  const [propertyType, setPropertyType] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [cityZip, setCityZip] = useState('');
  const [referral, setReferral] = useState('');
  const [notes, setNotes] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const grid = buildCalendarGrid(year, month);
  const monthLabel = viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const todayStart = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const isSelectable = useCallback(
    (day: number) => {
      const d = new Date(year, month, day);
      d.setHours(0, 0, 0, 0);
      if (d < todayStart) return false;
      if (d.getDay() === 0) return false;
      return true;
    },
    [year, month, todayStart]
  );

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setConsultationFormat('');
      setProjectType('');
      setPropertyType('');
      setTimeline('');
      setBudget('');
      setCityZip('');
      setReferral('');
      setNotes('');
      setName('');
      setEmail('');
      setPhone('');
      setViewDate(new Date());
    }
  }, [open]);

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const canSubmit =
    !!selectedDate &&
    !!selectedTime &&
    !!consultationFormat &&
    !!projectType &&
    name.trim() &&
    email.trim();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const formatLabel = CONSULTATION_FORMATS.find((f) => f.id === consultationFormat)?.label ?? '';
  const projectLabel = PROJECT_TYPES.find((p) => p.id === projectType)?.label ?? '';

  const modal = (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="consultation-booking"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close dialog backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 w-full max-w-[min(100%,560px)] max-h-[min(92vh,820px)] overflow-hidden flex flex-col rounded-[var(--radius-xl)] border border-white/12 bg-zinc-950/90 shadow-2xl shadow-black/50 backdrop-blur-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-br from-white/[0.06] via-transparent to-amber-950/20" aria-hidden />

            <div className="relative flex items-start justify-between gap-3 px-5 pt-5 pb-3 sm:px-6 sm:pt-6 border-b border-white/10">
              <div>
                <p className="font-accent text-accent text-xs sm:text-sm tracking-widest uppercase mb-1">Schedule</p>
                <h2 id={titleId} className="font-display text-xl sm:text-2xl font-semibold text-ink">
                  Book a consultation
                </h2>
                <p className="text-secondary text-xs sm:text-sm mt-1">
                  Tell us about your project, pick a time — we&apos;ll confirm by email.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-[var(--radius-md)] p-2 text-secondary hover:bg-white/10 hover:text-ink transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              {submitted ? (
                <motion.div
                  className="rounded-[var(--radius-lg)] border border-accent/30 bg-amber-950/35 px-5 py-8 text-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check size={28} strokeWidth={2.5} />
                  </div>
                  <p className="font-display text-lg font-semibold text-ink">Request received</p>
                  <p className="text-secondary text-sm mt-3 leading-relaxed text-left space-y-2">
                    <span className="block">
                      <strong className="text-zinc-300">Format:</strong> {formatLabel} · <strong className="text-zinc-300">Project:</strong> {projectLabel}
                    </span>
                    {selectedDate && selectedTime && (
                      <span className="block">
                        <strong className="text-zinc-300">Slot:</strong>{' '}
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
                        at {selectedTime}
                      </span>
                    )}
                    <span className="block pt-2">
                      Confirmation will go to <span className="text-ink font-medium">{email}</span> (demo — no real email sent).
                    </span>
                  </p>
                  <button type="button" onClick={onClose} className="btn-primary mt-6">
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleConfirm} className="space-y-5">
                  {/* Consultation format */}
                  <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/35 p-3 sm:p-4 backdrop-blur-sm">
                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">How should we meet?</p>
                    <div className="grid grid-cols-3 gap-2">
                      {CONSULTATION_FORMATS.map(({ id, label, sub, Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setConsultationFormat(id)}
                          className={`rounded-[var(--radius-md)] border px-2 py-3 text-center transition-all ${
                            consultationFormat === id
                              ? 'border-accent bg-accent/20 text-ink ring-1 ring-accent/40'
                              : 'border-white/10 bg-zinc-900/80 text-zinc-300 hover:border-white/20'
                          }`}
                        >
                          <Icon className="mx-auto mb-1.5 text-accent" size={20} />
                          <span className="block text-xs font-semibold leading-tight">{label}</span>
                          <span className="block text-[10px] text-secondary mt-0.5">{sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project type */}
                  <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/35 p-3 sm:p-4 backdrop-blur-sm">
                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">What do you need? *</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PROJECT_TYPES.map(({ id, label, Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setProjectType(id)}
                          className={`flex items-center gap-2 rounded-[var(--radius-md)] border px-2 py-2.5 text-left text-xs font-medium transition-all ${
                            projectType === id
                              ? 'border-accent bg-accent/20 text-ink ring-1 ring-accent/40'
                              : 'border-white/10 bg-zinc-900/80 text-zinc-300 hover:border-white/20'
                          }`}
                        >
                          <Icon className="text-accent shrink-0" size={16} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property, timeline, budget */}
                  <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/25 p-3 sm:p-4 backdrop-blur-sm space-y-3">
                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                      <Home size={14} className="text-accent" />
                      Property & planning
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="booking-property" className="block text-[11px] text-secondary mb-1">
                          Property type
                        </label>
                        <select
                          id="booking-property"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className={selectClass}
                        >
                          <option value="">Select…</option>
                          {PROPERTY_TYPES.map(({ id, label }) => (
                            <option key={id} value={id}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="booking-timeline" className="block text-[11px] text-secondary mb-1 flex items-center gap-1">
                          <CalendarClock size={12} className="text-accent" />
                          Timeline
                        </label>
                        <select
                          id="booking-timeline"
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className={selectClass}
                        >
                          <option value="">Select…</option>
                          {TIMELINES.map(({ id, label }) => (
                            <option key={id} value={id}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="booking-budget" className="block text-[11px] text-secondary mb-1 flex items-center gap-1">
                        <Banknote size={12} className="text-accent" />
                        Budget range (estimate)
                      </label>
                      <select id="booking-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={selectClass}>
                        <option value="">Select…</option>
                        {BUDGETS.map(({ id, label }) => (
                          <option key={id} value={id}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="booking-location" className="block text-[11px] text-secondary mb-1 flex items-center gap-1">
                        <MapPin size={12} className="text-accent" />
                        City or postal code
                      </label>
                      <input
                        id="booking-location"
                        value={cityZip}
                        onChange={(e) => setCityZip(e.target.value)}
                        placeholder="e.g. Ottawa K1A or New York 10001"
                        className="w-full"
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/35 p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={goPrevMonth}
                        className="rounded-[var(--radius-md)] p-2 text-ink hover:bg-white/10 transition-colors"
                        aria-label="Previous month"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <span className="font-display text-base font-semibold text-ink">{monthLabel}</span>
                      <button
                        type="button"
                        onClick={goNextMonth}
                        className="rounded-[var(--radius-md)] p-2 text-ink hover:bg-white/10 transition-colors"
                        aria-label="Next month"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs font-medium text-secondary mb-2">
                      {WEEKDAYS.map((d) => (
                        <div key={d} className="py-1">
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {grid.map((row, ri) => (
                        <div key={ri} className="grid grid-cols-7 gap-1">
                          {row.map((day, di) => {
                            if (day === null) {
                              return <div key={`e-${ri}-${di}`} className="aspect-square min-h-[2rem]" />;
                            }
                            const d = new Date(year, month, day);
                            const sel = selectedDate && sameDay(d, selectedDate);
                            const disabled = !isSelectable(day);
                            return (
                              <button
                                key={day}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                  setSelectedDate(new Date(year, month, day));
                                  setSelectedTime(null);
                                }}
                                className={`aspect-square min-h-[2rem] max-h-10 rounded-[var(--radius-md)] text-sm font-medium transition-all ${
                                  disabled
                                    ? 'text-zinc-600 cursor-not-allowed'
                                    : sel
                                      ? 'bg-accent text-white shadow-md shadow-black/30'
                                      : 'text-ink hover:bg-white/10'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-secondary mt-2 text-center">Sundays unavailable · 9:00–17:00</p>
                  </div>

                  {selectedDate && (
                    <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/35 p-3 sm:p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-ink font-medium text-sm mb-3">
                        <Clock size={16} className="text-accent" />
                        {selectedDate.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.length === 0 ? (
                          <p className="text-secondary text-sm">No slots left today — pick another date.</p>
                        ) : (
                          timeSlots.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSelectedTime(t)}
                              className={`rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-all ${
                                selectedTime === t
                                  ? 'bg-accent text-white shadow-md'
                                  : 'bg-zinc-900 text-ink hover:bg-zinc-800 border border-white/5'
                              }`}
                            >
                              {t}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/25 p-3 sm:p-4 backdrop-blur-sm space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-ink mb-1">
                      <User size={16} className="text-accent shrink-0" />
                      Contact *
                    </div>
                    <div>
                      <label htmlFor="booking-name" className="block text-[11px] text-secondary mb-1">
                        Full name
                      </label>
                      <input
                        id="booking-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        autoComplete="name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-email" className="block text-[11px] text-secondary mb-1">
                        Email
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        required
                        autoComplete="email"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className="block text-[11px] text-secondary mb-1">
                        Phone (optional)
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 …"
                        autoComplete="tel"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Notes & referral */}
                  <div className="rounded-[var(--radius-lg)] border border-white/10 bg-black/25 p-3 sm:p-4 backdrop-blur-sm space-y-3">
                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare size={14} className="text-accent" />
                      More details
                    </p>
                    <div>
                      <label htmlFor="booking-notes" className="block text-[11px] text-secondary mb-1">
                        Project vision & requirements
                      </label>
                      <textarea
                        id="booking-notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Materials you like (oak, glass, metal…), style, rough dimensions, photos to discuss…"
                        rows={4}
                        className="w-full resize-y min-h-[100px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-referral" className="block text-[11px] text-secondary mb-1">
                        How did you hear about us?
                      </label>
                      <select
                        id="booking-referral"
                        value={referral}
                        onChange={(e) => setReferral(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select…</option>
                        {REFERRALS.map(({ id, label }) => (
                          <option key={id} value={id}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="btn-primary w-full justify-center disabled:opacity-45"
                  >
                    <Calendar size={18} />
                    Confirm booking
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modal, document.body);
}
