'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Rocket, Code, Eye, Gauge } from 'lucide-react';

const steps = [
  {
    title: '01. Discovery',
    heading: 'We Learn You',
    description: 'We get to know your goals, voice, and market.',
    icon: Eye,
  },
  {
    title: '02. Design',
    heading: 'We Design It Custom',
    description: 'Unique interfaces made just for you. No templates.',
    icon: Code,
  },
  {
    title: '03. Build',
    heading: 'We Make It Editable',
    description: 'Full visual control over your content and styling.',
    icon: Gauge,
  },
  {
    title: '04. Optimize',
    heading: 'We Make It Smart',
    description: 'SEO, analytics, performance — all built-in.',
    icon: CheckCircle,
  },
  {
    title: '05. Launch',
    heading: 'We Launch & Host',
    description: 'You relax. We host, support, and maintain everything.',
    icon: Rocket,
  },
];

export default function AnimatedProcessScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const activeCard = container?.children[activeIndex];

    if (container && activeCard) {
      const containerCenter = container.offsetWidth / 2;
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;

      const scrollTo = cardLeft - containerCenter + cardWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  return (
    <section
      id="process"
      className="relative z-10 pt-32 pb-24 overflow-hidden bg-gradient-to-b from-hunter via-army to-hunter"
    >
      {/* Optional radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-3xl opacity-30 pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center text-brand-green">
          Our Process
        </h2>

        {/* Scrollable steps */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 px-2 sm:px-0 hide-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`snap-center shrink-0 transition-all duration-500 ease-in-out rounded-2xl p-6 sm:p-8 border backdrop-blur-sm w-[260px] sm:w-[300px] flex flex-col text-center ${
                  isActive
                    ? 'scale-100 opacity-100 z-10'
                    : 'scale-95 opacity-60 z-0'
                } bg-hunter/80 border-brand-green/20 shadow-xl`}
              >
                <div className="mb-4 flex justify-center">
                  <Icon className="w-8 h-8 text-brand-green" />
                </div>
                <p className="text-brand-green text-sm uppercase tracking-widest mb-1">
                  {step.title}
                </p>
                <h3 className="text-lg font-semibold text-beige mb-2">
                  {step.heading}
                </h3>
                <p className="text-beige/70 text-sm">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-10 gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'bg-brand-green scale-125'
                  : 'bg-army/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
