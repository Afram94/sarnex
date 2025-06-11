'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faq = [
  {
    q: 'Vad erbjuder Sarnex Digital?',
    a: 'Vi bygger skr\u00e4ddarsydda och snabba webbplatser som du enkelt kan hantera sj\u00e4lv.'
  },
  {
    q: 'Kan jag uppdatera min webbplats utan utvecklare?',
    a: 'Ja. Med v\u00e5rt visuella adminverktyg kan du \u00e4ndra inneh\u00e5ll och design p\u00e5 sekunder.'
  },
  {
    q: 'Ing\u00e5r s\u00f6kmotoroptimering?',
    a: 'SEO \u00e4r inbyggt fr\u00e5n start s\u00e5 att din sida kan ranka h\u00f6gre p\u00e5 Google.'
  },
  {
    q: 'Hur ser priss\u00e4ttningen ut?',
    a: 'V\u00e5ra projekt b\u00f6rjar fr\u00e5n 20\u00a0000 kr. Se mer p\u00e5 sidan f\u00f6r priser.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-24 px-6 bg-army text-beige">
      <h2 className="text-4xl font-bold text-center mb-10 text-brand-green">Vanliga fr\u00e5gor</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faq.map((item, i) => (
          <div key={i} className="border border-beige/20 rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full text-left px-6 py-4 flex justify-between items-center bg-hunter hover:bg-hunter/80 transition">
              <span className="font-medium">{item.q}</span>
              <span>{openIndex === i ? '-' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 bg-hunter/50"
                >
                  <p className="text-beige/80">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
