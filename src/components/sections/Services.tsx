import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Palette, Factory, Users, ArrowRight } from 'lucide-react';
import { scrollToSection } from '../../lib/scrollToSection';

const services = [
  {
    icon: Palette,
    title: "Custom Design",
    description: "Our expert designers work closely with you to create bespoke staircase designs that perfectly complement your space.",
    features: ["3D Visualization", "Material Consultation", "Architectural Integration"],
  },
  {
    icon: Factory,
    title: "Precision Manufacturing",
    description: "Using state-of-the-art technology combined with traditional craftsmanship, we manufacture each component with meticulous attention.",
    features: ["CNC Precision", "Premium Materials", "Quality Assurance"],
  },
  {
    icon: Users,
    title: "White-Glove Installation",
    description: "Our certified craftsmen handle every aspect of installation, ensuring your staircase is fitted perfectly.",
    features: ["Expert Teams", "Project Management", "Lifetime Warranty"],
  },
];

export function Services() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="font-accent text-accent text-sm sm:text-lg tracking-widest uppercase">
            What We Offer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink mt-4">
            Our services
          </h2>
          <p className="text-secondary text-base sm:text-lg max-w-2xl mx-auto mt-4">
            From concept to completion, we provide a comprehensive suite of services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-card p-6 sm:p-8 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="text-accent" size={26} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-3 sm:mb-4">
                {service.title}
              </h3>
              <p className="text-secondary leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {service.description}
              </p>
              <ul className="space-y-1.5 sm:space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => scrollToSection('#calculator')}
                className="mt-6 btn-secondary text-sm py-3 w-full sm:w-auto justify-center"
              >
                Start with a quote
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}