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
          Vår berättelse
        </motion.h1>
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-beige/90 leading-relaxed">
          Sarnex Digital är inte bara en webbyrå – det är ett designdrivet uppror. Vi ger småföretag kraft med skräddarsydda, vackra och helt kontrollerbara webbplatser som konverterar och inspirerar.
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
            "Vi tror att design är makt. Att kontroll är frihet. Och att varje småföretag förtjänar att se ut som en storspelare."
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
          "Vi bygger inte bara webbplatser. Vi skapar identitet, tydlighet och möjligheter för varumärken som vill växa."
        </motion.blockquote>
      </section>
    </div>
  );
}

const timeline = [
  {
    title: 'Början',
    description:
      'Född ur frustrationen över generiska mallar skapades Sarnex Digital för att ge företag designförst-plattformar som speglar vilka de verkligen är.',
  },
  {
    title: 'Design före kod',
    description:
      'Vi börjar med strategi och berättande. Varje gränssnitt byggs inte bara för att se bra ut utan för att beröra på djupet och leda användaren rätt.',
  },
  {
    title: 'Styrka genom kontroll',
    description:
      'Vi ger våra kunder verktygen att forma sina webbplatser utan utvecklare. Full kontroll över stil och innehåll – inga kompromisser.',
  },
];