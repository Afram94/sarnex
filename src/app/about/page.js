'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function AboutPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/pages/about', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => {
        try {
          const parsed =
            typeof res.data.content === 'string'
              ? JSON.parse(res.data.content)
              : res.data.content;

          setContent(parsed);
        } catch (e) {
          console.error('❌ Failed to parse JSON content:', e);
        }
      })
      .catch((err) => {
        console.error('❌ Failed to fetch content:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !content) {
    return <p className="text-beige p-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-hunter text-beige relative overflow-hidden">
      <Navbar />

      <section className="py-32 px-6 md:px-20 bg-gradient-to-b from-hunter to-army">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif font-extrabold mb-6 text-brand-green drop-shadow-lg"
          >
            {content.headline}
          </motion.h1>
          <p className="text-xl md:text-2xl text-beige/90 leading-relaxed whitespace-pre-line max-w-3xl mx-auto">
            {content.intro}
          </p>
        </div>
      </section>


      {content.quote && (
        <section className="relative py-20 px-6 md:px-20 bg-hunter border-y border-army text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl italic font-medium text-brand-green max-w-5xl mx-auto"
          >
            {content.quote}
          </motion.blockquote>
        </section>
      )}

      {content.sections?.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-0 py-24">
          <div className="border-l-4 border-brand-green pl-8 space-y-20 relative">
            {content.sections.map((item, idx) => (
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
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {content.final_quote && (
        <section className="py-24 px-6 md:px-20 text-center bg-beige text-hunter">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl italic font-medium max-w-5xl mx-auto leading-snug"
          >
            {content.final_quote}
          </motion.blockquote>
        </section>
      )}
    </div>
  );
}
