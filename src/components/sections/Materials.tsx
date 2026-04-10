import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { materialsData } from '../../data/materialsData';
import type { MaterialInfo } from '../../data/materialsData';

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] sm:text-xs text-zinc-400 w-20 sm:w-24 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent/80 to-accent-alt"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        />
      </div>
      <span className="text-[10px] sm:text-xs text-zinc-500 w-8 text-right tabular-nums">{value}%</span>
    </div>
  );
}

function MaterialCard({
  material,
  isActive,
  onClick,
  index,
}: {
  material: MaterialInfo;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className={`group relative overflow-hidden rounded-[var(--radius-xl)] border text-left transition-all touch-manipulation ${
        isActive
          ? 'border-accent/50 shadow-[0_0_20px_rgba(166,124,45,0.2)]'
          : 'border-white/8 hover:border-white/15'
      }`}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          <h3 className="font-display text-base sm:text-lg font-semibold text-white drop-shadow-sm">
            {material.name}
          </h3>
          <div className="flex gap-1.5 mt-1">
            {material.traits.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[9px] sm:text-[10px] font-medium text-accent-alt/90 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function Materials() {
  const { ref, isVisible } = useScrollReveal();
  const [selected, setSelected] = useState<MaterialInfo>(materialsData[0]);

  return (
    <section id="materials" className="py-16 sm:py-28 px-3 sm:px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            Craftsmanship
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-ink mt-3 sm:mt-4">
            Materials &amp; finishes
          </h2>
          <p className="text-secondary text-sm sm:text-lg max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed">
            We source only the finest materials — each chosen for beauty, durability, and character.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Grid of material cards */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {materialsData.map((mat, i) => (
              <MaterialCard
                key={mat.id}
                material={mat}
                isActive={selected.id === mat.id}
                onClick={() => setSelected(mat)}
                index={i}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                className="glass-card p-5 sm:p-7 h-full"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-40 sm:h-48 rounded-[var(--radius-lg)] overflow-hidden mb-5">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink">
                  {selected.name}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mt-2 mb-5">
                  {selected.description}
                </p>

                <div className="space-y-3">
                  <ProgressBar label="Durability" value={selected.durability} />
                  <ProgressBar label="Aesthetics" value={selected.aesthetics} />
                  <ProgressBar label="Price Level" value={selected.priceLevel} />
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {selected.traits.map((trait) => (
                    <span
                      key={trait}
                      className="text-xs font-medium text-accent-alt bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
