'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { CheckCircle, Rocket, Code, Eye, Gauge } from 'lucide-react';

const steps = [
  {
    title: '01. Discovery',
    heading: 'We Learn You',
    description: 'We get to know your goals, voice, and market.',
    icon: <Eye className="w-8 h-8 text-brand-green" />,
  },
  {
    title: '02. Design',
    heading: 'We Design It Custom',
    description: 'Unique interfaces made just for you. No templates.',
    icon: <Code className="w-8 h-8 text-brand-green" />,
  },
  {
    title: '03. Build',
    heading: 'We Make It Editable',
    description: 'Full visual control over your content and styling.',
    icon: <Gauge className="w-8 h-8 text-brand-green" />,
  },
  {
    title: '04. Optimize',
    heading: 'We Make It Smart',
    description: 'SEO, analytics, performance — all built-in.',
    icon: <CheckCircle className="w-8 h-8 text-brand-green" />,
  },
  {
    title: '05. Launch',
    heading: 'We Launch & Host',
    description: 'You relax. We host, support, and maintain everything.',
    icon: <Rocket className="w-8 h-8 text-brand-green" />,
  },
];

export default function AnimatedProcessSlider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const totalSteps = steps.length;

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (latest) => {
      const step = Math.floor(latest * totalSteps);
      setActiveIndex(Math.min(step, totalSteps - 1));
    });
    return () => unsub();
  }, []);

  return (
    <section ref={ref} className="relative h-[500vh] text-white">
      <div className="animated-gradient">
        {/* Sticky content */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          {/* Progress Dots - now shown on all screens */}
          <div className="flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-3 sm:gap-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-3 h-3 sm:w-3 sm:h-3 bg-brand-green border-brand-green border-2 scale-125'
                    : 'w-2 h-2 sm:w-3 sm:h-3 border border-white/30'
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl px-6 sm:px-10"
          >
            <div className="flex justify-center mb-6">{steps[activeIndex].icon}</div>
            <h3 className="text-brand-green text-sm tracking-widest mb-2">
              {steps[activeIndex].title}
            </h3>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              {steps[activeIndex].heading}
            </h2>
            <p className="text-white/70 text-base sm:text-lg">
              {steps[activeIndex].description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
