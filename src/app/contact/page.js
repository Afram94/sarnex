'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import MainLayout from '../components/MainLayout';

export default function ContactPage() {
  return (
    <MainLayout>
      <section className="py-24 px-6 md:px-20 text-center bg-gradient-to-b from-hunter to-army">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-serif font-bold text-brand-green mb-4"
        >
          Låt oss höras
        </motion.h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-beige/80">
          Har du ett projekt på gång eller en fråga? Skicka ett meddelande så hör jag av mig snarast.
        </p>
      </section>

      <section className="py-20 px-6 md:px-20 bg-army">
        <div className="max-w-2xl mx-auto bg-hunter border border-beige/20 rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-8">
            <Image
              src="/DIGITAL.png"
              alt="Kontaktlogotyp"
              width={250}
              height={250}
              className="opacity-90"
            />
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-beige mb-1">
                Namn
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 bg-army border border-beige/30 text-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="Ditt fullständiga namn"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-beige mb-1">
                E-post
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 bg-army border border-beige/30 text-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="du@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-beige mb-1">
                Meddelande
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 bg-army border border-beige/30 text-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="Berätta om ditt projekt eller ställ en fråga..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-brand-green text-hunter font-semibold px-6 py-3 rounded-xl hover:bg-brand-green/90 transition"
            >
              Skicka meddelande
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}