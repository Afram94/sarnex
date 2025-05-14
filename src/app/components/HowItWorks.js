'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Discovery Call',
    subtitle: 'Understand Your Vision',
    description: 'We decode your business goals and audience to create a tailored plan.',
  },
  {
    title: 'Custom Design',
    subtitle: 'No Templates. Ever.',
    description: 'We craft every pixel from scratch to represent your brand identity.',
  },
  {
    title: 'Smart Admin Panel',
    subtitle: 'Control in Your Hands',
    description: 'Update content and styling in real time with no code required.',
  },
  {
    title: 'SEO & Analytics',
    subtitle: 'Visibility & Insight',
    description: 'Everything you need to rank higher and monitor your growth.',
  },
  {
    title: 'Hosting & Support',
    subtitle: 'Worry-Free Performance',
    description: 'Your site stays fast, secure, and maintained — always.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 bg-[#0a0a0a] py-28 overflow-hidden">
      {/* Background Glow & Lines */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f1111] via-[#121212] to-[#0a0a0a]" />
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-brand-green/30 to-transparent opacity-30" />

      {/* Title */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-24">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Process, Reimagined
        </motion.h2>
        <p className="text-lg text-white/60">
          A cinematic timeline of how we craft high-impact websites for bold brands.
        </p>
      </div>

      {/* Steps */}
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-14 px-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Connector line dot */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-brand-green shadow-[0_0_12px_#00FF7F]" />

            {/* Card */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 transition-all hover:border-brand-green hover:shadow-[0_0_24px_#00FF7F55]">
              <div className="flex items-center gap-3 mb-3 text-brand-green">
                <CheckCircle className="w-6 h-6 animate-pulse group-hover:animate-none" />
                <h3 className="text-xl font-semibold text-white group-hover:text-brand-green transition">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-brand-green mb-1 font-medium">{step.subtitle}</p>
              <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
            </div>

            {/* Glowing animated ring behind each card */}
            <div className="absolute -z-10 inset-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-[160%] h-[160%] rounded-full bg-brand-green/5 blur-3xl group-hover:blur-[100px] transition-all" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
