'use client';

import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';
import FeaturesList from '../components/FeaturesGrid';

export default function FeaturesClient() {
  return (
    <MainLayout>
      <section className="pt-48 pb-24 px-6 md:px-20 text-center bg-gradient-to-b from-hunter to-army">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-serif font-bold text-brand-green mb-6"
        >
          Everything You Need. Built In.
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-beige/90">
          Every website we build includes powerful tools to help your business grow — no plugins, no setup, just results.
        </p>
      </section>

      <section className="py-20 bg-army">
        <FeaturesList />
      </section>
    </MainLayout>
  );
}