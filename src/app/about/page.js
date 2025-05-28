'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-hunter text-beige relative overflow-hidden">
      <Navbar />

      <section className="py-32 px-6 md:px-20 text-center bg-gradient-to-b from-hunter to-army">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-serif font-extrabold mb-8 text-brand-green drop-shadow-lg"
        >
          Our Story
        </motion.h1>
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-beige/90 leading-relaxed">
          Sarnex Digital isn’t just a web agency — it’s a design-driven rebellion. We empower small businesses with custom, beautiful, fully-controllable websites that are made to convert and inspire.
        </p>
      </section>

      <section className="relative py-20 px-6 md:px-20 bg-hunter border-y border-army text-center overflow-hidden">
        {/* Animated background waves */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 w-[150%] h-[150%] -translate-x-1/2 bg-gradient-to-r from-brand-green/10 via-beige/10 to-brand-green/10 blur-3xl rounded-full animate-wave" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 space-y-12 max-w-4xl mx-auto"
        >
          <blockquote className="text-3xl md:text-4xl italic font-medium text-brand-green">
            "We believe design is power. That control is freedom. And that every small business deserves to look like a big deal."
          </blockquote>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-0 py-24">
        <div className="border-l-4 border-brand-green pl-8 space-y-20 relative">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-5 top-1.5 w-4 h-4 bg-brand-green border-2 border-beige rounded-full shadow-md" />
              <h3 className="text-2xl md:text-3xl font-bold text-brand-green mb-2">
                {item.title}
              </h3>
              <p className="text-beige/80 text-lg leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-20 text-center bg-beige text-hunter">
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl italic font-medium max-w-5xl mx-auto leading-snug"
        >
          "We don’t just build websites. We create identity, clarity, and opportunity for brands that want to grow."
        </motion.blockquote>
      </section>
    </div>
  );
}

const timeline = [
  {
    title: 'Where it began',
    description:
      'Born from frustration with one-size-fits-all templates, Sarnex Digital was created to give businesses design-first platforms that reflect who they truly are.',
  },
  {
    title: 'Craft before code',
    description:
      'We start with strategy and storytelling. Each interface is built not just to look great, but to resonate deeply and guide users effortlessly.',
  },
  {
    title: 'Empowerment through control',
    description:
      'We hand our clients the tools to shape their websites without devs. Full style and content control — no compromises.',
  },
];