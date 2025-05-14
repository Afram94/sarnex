'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CallToActionRoadmap() {
  return (
    <section className="relative bg-[#0a0a0a] py-32 overflow-hidden">
      {/* Background gradient blur */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f1111] via-[#111] to-[#0a0a0a]" />
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-brand-green/10" />

      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.h2
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Take the First Step?
        </motion.h2>
        <p className="text-white/60 mb-12 max-w-xl mx-auto">
          Let’s build something remarkable together — your custom digital experience starts with a single call.
        </p>

        {/* Roadmap CTA */}
        <div className="relative flex items-center justify-center">
          <div className="h-[2px] w-full bg-brand-green/20 rounded-full relative">
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-brand-green shadow-[0_0_16px_#00FF7F88] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
          <motion.a
            href="/contact"
            className="absolute right-0 -translate-y-1/2 translate-x-1/2 bg-brand-green text-black font-medium px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            Start Your Journey <ArrowRight className="inline ml-2 w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
