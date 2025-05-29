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
          Let's Connect
        </motion.h1>
        <p className="max-w-xl mx-auto text-lg md:text-xl text-beige/80">
          Have a project in mind or just want to ask something? Drop me a message and I’ll get back to you as soon as possible.
        </p>
      </section>

      <section className="py-20 px-6 md:px-20 bg-army">
        <div className="max-w-2xl mx-auto bg-hunter border border-beige/20 rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-8">
            <Image
              src="/DIGITAL.png"
              alt="Contact Logo"
              width={250}
              height={250}
              className="opacity-90"
            />
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-beige mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 bg-army border border-beige/30 text-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-beige mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 bg-army border border-beige/30 text-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-beige mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 bg-army border border-beige/30 text-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="Tell me about your project or ask a question..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-brand-green text-hunter font-semibold px-6 py-3 rounded-xl hover:bg-brand-green/90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}