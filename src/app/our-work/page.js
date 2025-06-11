'use client';

import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Yoga Bloom Studio',
    description: 'Elegant design för en lokal yogastudio.',
    image: '/projects/yoga-bloom.png',
    gallery: ['/projects/yoga-bloom.png'],
    url: 'https://yogabloomstudio.com',
    gradient: 'from-purple-400/20 to-pink-500/30',
  },
  {
    title: 'Craft Coffee Co.',
    description: 'Modern webbplats för ett hantverkskaffevarumärke.',
    image: '/projects/craft-coffee.png',
    gallery: ['/projects/craft-coffee.png'],
    url: 'https://craftcoffeeco.com',
    gradient: 'from-yellow-400/20 to-orange-400/30',
  },
  {
    title: 'TechLabs AI',
    description: 'Ren och kraftfull SaaS-sajt med animationer.',
    image: '/DIGITAL.png',
    gallery: ['/DIGITAL.png'],
    url: 'https://techlabs.ai',
    gradient: 'from-indigo-400/20 to-blue-500/30',
  },
];

export default function OurWorkPage() {
  return (
    <main className="bg-[#0c0c0c] text-white overflow-hidden">
      {/* === HERO SECTION === */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 relative bg-gradient-to-br from-[#0c0c0c] to-[#111]">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-extrabold text-brand-green drop-shadow-glow"
        >
          Våra projekt
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl"
        >
          Ett urval av skräddarsydda webbplatser skapade för att konvertera, skala och imponera.
        </motion.p>

        {/* Subtle dividing border */}
        <div className="absolute bottom-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-green/40 to-transparent blur-sm" />
      </section>

      {/* === PROJECTS SECTION === */}
      <section className="relative z-10 py-24 px-6 md:px-16 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
