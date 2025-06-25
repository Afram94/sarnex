'use client';

import MainLayout from '../../MainLayout';
import { motion } from 'framer-motion';

const feature = {
  title: "Easy Content Management",
  description: "Edit text, images, and data easily through a custom admin panel. Manage existing sections with full CRUD support.",
  highlights: [
    {
      title: "No Coding Required",
      description: "Easily update content and media without touching a single line of code.",
      image: "/DIGITAL.png"
    },
    {
      title: "Full CRUD Support",
      description: "Create, update, and delete content with a simple and intuitive admin interface.",
      image: "/DIGITAL.png"
    }
  ]
};

export default function EasyContentManagementPage() {
  return (
    <MainLayout>
      <section className="relative min-h-screen py-40 px-6 overflow-hidden bg-gradient-to-br from-hunter via-army to-[#1f3529] text-beige">

        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-green/20 rounded-full blur-[140px] animate-blob1 z-0" />
        <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-army/30 rounded-full blur-[100px] animate-blob2 z-0" />

        {/* Hero Section */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand-green via-beige to-army bg-clip-text text-transparent drop-shadow-md mb-6"
          >
            {feature.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-beige/80 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            {feature.description}
          </motion.p>
        </div>

        {/* Highlights Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto z-10 relative">
          {feature.highlights?.map((highlight, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-xl min-h-[500px] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold text-brand-green mb-4">
                  {highlight.title}
                </h3>
                <p className="text-beige/80 text-lg mb-6">{highlight.description}</p>
              </div>

              {highlight.image && (
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="rounded-xl border border-beige/10 shadow-md w-full h-auto object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
