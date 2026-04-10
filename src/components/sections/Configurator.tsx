import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { scrollToSection } from '../../lib/scrollToSection';
import { ArrowRight } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────── */
type StairShape = 'straight' | 'lshaped' | 'ushaped' | 'spiral';
type MaterialChoice = 'oak' | 'marble' | 'glass' | 'steel';
type RailingChoice = 'classic' | 'glass' | 'cable';

interface Option<T extends string> {
  id: T;
  label: string;
  desc: string;
}

const stairShapes: Option<StairShape>[] = [
  { id: 'straight', label: 'Straight', desc: 'Clean lines, timeless simplicity' },
  { id: 'lshaped', label: 'L-Shaped', desc: 'Space-efficient with a 90° turn' },
  { id: 'ushaped', label: 'U-Shaped', desc: 'Grand presence, 180° turn' },
  { id: 'spiral', label: 'Spiral', desc: 'Sculptural focal point' },
];

const materialChoices: (Option<MaterialChoice> & { fill: string; accent: string })[] = [
  { id: 'oak', label: 'Oak', desc: 'Warm natural grain', fill: '#9e7c4e', accent: '#c4a574' },
  { id: 'marble', label: 'Marble', desc: 'Luxurious stone finish', fill: '#d4d0ca', accent: '#e8e4de' },
  { id: 'glass', label: 'Glass', desc: 'Modern transparency', fill: '#7fb8d8', accent: '#a8d8ea' },
  { id: 'steel', label: 'Steel', desc: 'Industrial strength', fill: '#8a8a8f', accent: '#b0b0b5' },
];

const railingChoices: Option<RailingChoice>[] = [
  { id: 'classic', label: 'Classic Balusters', desc: 'Traditional turned spindles' },
  { id: 'glass', label: 'Glass Panels', desc: 'Frameless transparent panels' },
  { id: 'cable', label: 'Steel Cable', desc: 'Minimalist horizontal cables' },
];

/* ─── SVG Staircase Previews ─────────────────────────────── */
function StairSVG({ shape, material, railing }: { shape: StairShape; material: MaterialChoice; railing: RailingChoice }) {
  const mat = materialChoices.find((m) => m.id === material)!;
  const stepFill = mat.fill;
  const railStroke = railing === 'glass' ? 'rgba(255,255,255,0.35)' : railing === 'cable' ? '#b0b0b5' : mat.accent;
  const railWidth = railing === 'glass' ? 3 : railing === 'cable' ? 1.5 : 2;

  return (
    <svg viewBox="0 0 320 280" fill="none" className="w-full h-full max-h-[340px] sm:max-h-[380px] drop-shadow-2xl">
      <defs>
        <linearGradient id="floorGrad" x1="0" y1="260" x2="320" y2="280">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
        </linearGradient>
      </defs>

      <rect x="0" y="258" width="320" height="22" rx="4" fill="url(#floorGrad)" />

      <AnimatePresence mode="wait">
        <motion.g
          key={shape}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {shape === 'straight' && (
            <>
              {Array.from({ length: 8 }, (_, i) => (
                <motion.rect
                  key={i}
                  x={80 + i * 6}
                  y={240 - i * 26}
                  width={100}
                  height={20}
                  rx={3}
                  fill={stepFill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.85, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
              <line x1="80" y1="258" x2="126" y2="36" stroke={railStroke} strokeWidth={railWidth} strokeLinecap="round" />
              <line x1="180" y1="258" x2="226" y2="36" stroke={railStroke} strokeWidth={railWidth} strokeLinecap="round" />
              {railing === 'cable' && Array.from({ length: 6 }, (_, i) => (
                <line key={i} x1={85 + i * 7} y1={238 - i * 30} x2={185 + i * 7} y2={238 - i * 30} stroke={railStroke} strokeWidth={0.8} opacity={0.5} />
              ))}
              {railing === 'classic' && Array.from({ length: 7 }, (_, i) => (
                <line key={i} x1={88 + i * 7} y1={248 - i * 28} x2={88 + i * 7} y2={228 - i * 28} stroke={railStroke} strokeWidth={1.5} strokeLinecap="round" />
              ))}
            </>
          )}
          {shape === 'lshaped' && (
            <>
              {Array.from({ length: 5 }, (_, i) => (
                <motion.rect
                  key={`a${i}`}
                  x={50}
                  y={240 - i * 28}
                  width={90}
                  height={20}
                  rx={3}
                  fill={stepFill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.85, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
              <motion.rect x={100} y={95} width={50} height={50} rx={6} fill={stepFill} opacity={0.7}
                initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.3 }} />
              {Array.from({ length: 4 }, (_, i) => (
                <motion.rect
                  key={`b${i}`}
                  x={150 + i * 10}
                  y={95 - i * 0}
                  width={20}
                  height={80 - i * 14}
                  rx={3}
                  fill={stepFill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                />
              ))}
              <line x1="50" y1="258" x2="50" y2="105" stroke={railStroke} strokeWidth={railWidth} strokeLinecap="round" />
              <line x1="110" y1="105" x2="230" y2="105" stroke={railStroke} strokeWidth={railWidth} strokeLinecap="round" />
            </>
          )}
          {shape === 'ushaped' && (
            <>
              {Array.from({ length: 4 }, (_, i) => (
                <motion.rect key={`u1${i}`} x={40} y={240 - i * 30} width={80} height={22} rx={3} fill={stepFill}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 0.85, x: 0 }} transition={{ delay: i * 0.04 }} />
              ))}
              <motion.rect x={40} y={110} width={80} height={40} rx={6} fill={stepFill} opacity={0.6}
                initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.2 }} />
              {Array.from({ length: 4 }, (_, i) => (
                <motion.rect key={`u2${i}`} x={200} y={120 + i * 30} width={80} height={22} rx={3} fill={stepFill}
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: 0.85, x: 0 }} transition={{ delay: 0.25 + i * 0.04 }} />
              ))}
              <line x1="40" y1="258" x2="40" y2="118" stroke={railStroke} strokeWidth={railWidth} strokeLinecap="round" />
              <line x1="40" y1="118" x2="200" y2="118" stroke={railStroke} strokeWidth={railWidth} strokeLinecap="round" />
              <line x1="280" y1="118" x2="280" y2="258" stroke={railStroke} strokeWidth={railWidth} strokeLinecap="round" />
            </>
          )}
          {shape === 'spiral' && (
            <>
              {Array.from({ length: 10 }, (_, i) => {
                const angle = (i / 10) * Math.PI * 1.6 - Math.PI * 0.3;
                const cx = 160;
                const cy = 155;
                const rx = 55 + i * 4;
                const ry = 18 + i * 2;
                const px = cx + Math.cos(angle) * rx;
                const py = cy + Math.sin(angle) * ry - i * 14;
                return (
                  <motion.ellipse
                    key={i}
                    cx={px}
                    cy={py}
                    rx={28 - i * 0.8}
                    ry={8}
                    fill={stepFill}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                  />
                );
              })}
              <line x1="160" y1="260" x2="160" y2="20" stroke={railStroke} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
              <circle cx="160" cy="16" r="4" fill={railStroke} opacity={0.7} />
            </>
          )}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}

/* ─── Selector Row ───────────────────────────────────────── */
function Selector<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string; desc: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <h4 className="text-xs sm:text-sm font-medium text-secondary uppercase tracking-wider mb-3">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`relative px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border transition-all touch-manipulation ${
              value === opt.id
                ? 'bg-accent text-white border-accent shadow-[0_0_14px_rgba(166,124,45,0.35)]'
                : 'bg-zinc-900/80 text-zinc-300 border-white/10 hover:border-white/20 active:bg-zinc-800'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={value}
          className="text-xs text-zinc-500 mt-2 h-4"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {options.find((o) => o.id === value)?.desc}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export function Configurator() {
  const { ref, isVisible } = useScrollReveal();
  const [shape, setShape] = useState<StairShape>('straight');
  const [material, setMaterial] = useState<MaterialChoice>('oak');
  const [railing, setRailing] = useState<RailingChoice>('classic');

  return (
    <section id="configurator" className="py-16 sm:py-28 px-3 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            Design Studio
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-ink mt-3 sm:mt-4">
            Design your staircase
          </h2>
          <p className="text-secondary text-sm sm:text-lg max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed">
            Experiment with shapes, materials, and railings to visualize your perfect staircase.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Preview */}
          <div className="glass-card p-6 sm:p-8 flex items-center justify-center min-h-[320px] sm:min-h-[420px]">
            <StairSVG shape={shape} material={material} railing={railing} />
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="glass-card p-5 sm:p-7 space-y-6 sm:space-y-8">
              <Selector label="Shape" options={stairShapes} value={shape} onChange={setShape} />
              <Selector label="Material" options={materialChoices} value={material} onChange={setMaterial} />
              <Selector label="Railing" options={railingChoices} value={railing} onChange={setRailing} />
            </div>

            <motion.button
              type="button"
              onClick={() => scrollToSection('#calculator')}
              className="btn-primary w-full justify-center text-base py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a quote for this design
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
