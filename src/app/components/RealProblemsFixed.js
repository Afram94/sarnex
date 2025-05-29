/* import { motion } from 'framer-motion'

const problems = [
  {
    before: '“I can’t update my site without calling a developer.”',
    after: 'Edit everything yourself with a visual admin panel.',
  },
  {
    before: '“I don’t know if anyone even visits my site.”',
    after: 'Track traffic and engagement with built-in analytics.',
  },
  {
    before: '“My site is slow and looks outdated.”',
    after: 'Enjoy fast load times and premium custom design.',
  },
  {
    before: '“I don’t understand SEO or where to start.”',
    after: 'We bake SEO in — no plugins or guesswork.',
  },
]

export default function RealProblemsFixed() {
  return (
    <section className="relative py-28 bg-[#0d0d0d] text-white px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#9cc0ab22_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold font-mono text-[#9cc0ab]">
          You Deserve Better
        </h2>
        <p className="mt-6 text-white/70 text-lg">
          Real problems small businesses face — solved with modern web design.
        </p>
      </div>

      <div className="relative z-10 mt-20 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12">
        {problems.map(({ before, after }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-[#9cc0ab]/20 transition-colors duration-300"
          >
            <div className="mb-6">
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Before</p>
              <p className="text-base italic text-red-300 leading-relaxed">{before}</p>
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1">After</p>
              <p className="text-lg text-[#9cc0ab] font-semibold leading-relaxed">{after}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} */

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../../lib/axios';
import dynamic from 'next/dynamic';

// Custom hook to detect if it's a mobile device
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return isMobile;
}

export default function RealProblemsFixed() {
  const [problems, setProblems] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    let ignore = false;
    api.get('/problems')
      .then(res => {
        if (!ignore) setProblems(res.data);
      })
      .catch(err => console.error('Error loading problems:', err));
    return () => { ignore = true; };
  }, []);

  if (problems.length === 0) return null;

  return (
    <section className="relative py-28 bg-[#0d0d0d] text-white px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#9cc0ab22_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold font-mono text-[#9cc0ab]">
          You Deserve Better
        </h2>
        <p className="mt-6 text-white/70 text-lg">
          Real problems small businesses face — solved with modern web design.
        </p>
      </div>

      <div className="relative z-10 mt-20 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12">
        {problems.map(({ id, before, after, card_bg_color, text_color, font_family }, index) => (
          <motion.div
            key={id}
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            whileInView={isMobile ? false : { opacity: 1, y: 0 }}
            viewport={isMobile ? false : { once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`rounded-3xl p-8 shadow-xl border border-white/10 transition-all duration-300 hover:shadow-[#9cc0ab]/20 
              ${card_bg_color || 'bg-[#18181b]'} 
              ${text_color || 'text-white'} 
              ${font_family || 'font-sans'}`}
          >
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest mb-1 opacity-60">Before</p>
              <p className="text-sm italic leading-relaxed">{before}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-1 opacity-60">After</p>
              <p className="text-sm font-semibold leading-relaxed">{after}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


