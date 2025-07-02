'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Custom Hooks ---

// 1. Custom useInterval Hook
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


// --- Reusable Components ---

// 2. Blinking Caret Component
function BlinkingCaret() {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="inline-block w-0.5 h-5 bg-white ml-1"
      aria-hidden="true"
    />
  );
}

// 3. Typing Effect Component (Final)
function TypingEffect({ text, speed = 20 }) {
  const [displayed, setDisplayed] = useState('');

  // Reset the animation when the text changes
  useEffect(() => {
    setDisplayed('');
  }, [text]);

  useInterval(() => {
      if (displayed.length < text.length) {
        setDisplayed(text.substring(0, displayed.length + 1));
      }
    },
    // Stop the interval when typing is complete
    displayed.length < text.length ? speed : null
  );

  return (
    <div>
      {displayed}
      {displayed.length < text.length && <BlinkingCaret />}
    </div>
  );
}

// 4. Feature Card Component
function FeatureCard({ icon, title, description, features }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-hunter/80 border border-brand-green/10 rounded-2xl p-6 shadow-lg focus-within:ring-2 focus-within:ring-brand-green"
    >
      <h3 className="text-lg font-semibold text-white mb-2">{icon} {title}</h3>
      <p className="text-sm text-beige mb-3">{description}</p>
      <ul className="text-sm text-beige/80 space-y-1">
        {features.map((feature, i) => (
          <li key={i}>✓ {feature}</li>
        ))}
      </ul>
    </motion.div>
  );
}

// --- Main Component ---

const defaultContentPairs = [
  {
    original: `We are the best plumbing service in town. Contact us today for a quote.`,
    enhanced: `Say goodbye to leaks and clogs. Discover premium plumbing delivered by seasoned professionals, with guaranteed satisfaction and timely support.`,
  },
  {
    original: `Our team builds websites for local shops.`,
    enhanced: `Transform your digital storefront. We create fast, modern, SEO-optimized websites tailored for local businesses that want to grow online.`,
  },
  {
    original: `We write blogs for your business.`,
    enhanced: `Engage your audience with professionally written blog posts crafted for SEO, brand authority, and real results — all with your voice in mind.`,
  },
];

const defaultFeatureCards = [
    {
        icon: '🧠',
        title: 'Smart Content Improver',
        description: 'Upgrade tone, clarity, and professionalism of your pages with one click.',
        features: ['Rewrite suggestions based on intent', 'AI-powered tone + structure fixes', 'Instant visual preview'],
    },
    {
        icon: '📝',
        title: 'AI Blog Writer',
        description: 'Generate full blog posts in seconds from simple topic inputs.',
        features: ['Headlines, outlines, and full text', 'SEO-friendly structure', 'Tone-matching options'],
    },
    {
        icon: '🎯',
        title: 'CTA Generator',
        description: 'Generate click-worthy CTAs for buttons, banners, and more.',
        features: ['Context-aware suggestions', 'Voice + tone tuning', 'Convert more clicks, faster'],
    },
];


export default function AIWritingAssistantMini({
  contentPairs = defaultContentPairs,
  featureCards = defaultFeatureCards,
}) {
  const [index, setIndex] = useState(0);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % contentPairs.length);
  }, [contentPairs.length]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + contentPairs.length) % contentPairs.length);
  };

  useInterval(handleNext, 12000);

  return (
    <section className="bg-gradient-to-b from-hunter to-army py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            ✨ AI Writing Assistant
          </h2>
          <p className="text-brand-green text-lg md:text-xl min-h-[28px] font-medium">
            Instantly elevate your content with clarity and conversion-focused tone.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {featureCards.map((card, i) => (
            <FeatureCard key={i} {...card} />
          ))}
        </div>

        {/* Original + Enhanced Section */}
        <div className="relative rounded-2xl bg-hunter/60 shadow-xl border border-brand-green/20 p-6 md:p-8 max-w-4xl mx-auto text-sm space-y-4 transition-colors duration-300">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-5 md:-left-10">
             <button
              onClick={handlePrev}
              aria-label="Previous example"
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-5 md:-right-10">
            <button
              onClick={handleNext}
              aria-label="Next example"
              className="bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div>
            <p className="text-beige/70 mb-1 font-medium">Original:</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={index} // Change key to trigger animation
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-army/20 text-beige p-4 rounded-md border border-white/10 whitespace-pre-line min-h-[80px]"
              >
                {contentPairs[index].original}
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <p className="text-beige/70 mb-1 font-medium">AI Enhanced:</p>
            <div
              className="bg-brand-green/20 text-white p-4 rounded-md border border-white/10 min-h-[120px] transition-colors duration-300 hover:bg-brand-green/30"
              aria-live="polite"
              aria-atomic="true"
            >
              <TypingEffect text={contentPairs[index].enhanced} speed={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
