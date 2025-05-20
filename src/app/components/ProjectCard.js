'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProjectCard({
  title,
  description,
  image,
  gallery = [],
  url,
  gradient,
}) {
  const fallbackImage = '/placeholder.png';
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const images = [image || fallbackImage, ...gallery];

  // ⌨️ Esc key to close modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  // Navigation
  const next = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* ==== CARD ==== */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className={`relative rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br ${gradient} p-[1px] backdrop-blur-sm`}
        onClick={() => setOpen(true)}
      >
        {/* Glow hover */}
        <div className="absolute -inset-1 bg-green-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-0" />

        <div className="relative bg-[#121212] rounded-[inherit] h-full w-full p-4 sm:p-5 z-10 flex flex-col justify-between">
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-4 shadow-lg">
            <Image
              src={image || fallbackImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-100">{title}</h3>
            <p className="text-sm text-gray-400 mt-1 mb-4">{description}</p>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center text-sm font-medium text-black bg-[#9cc0ab] px-4 py-2 rounded-full hover:bg-green-200 transition"
            >
              Visit Site →
            </a>
          )}
        </div>
      </motion.div>

      {/* ==== MODAL ==== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#111] rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-green-200 mb-4">{title}</h3>

              {/* === Image Gallery === */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={images[currentSlide]}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = offset.x * velocity.x;
                      if (swipe < -1000) next();
                      else if (swipe > 1000) prev();
                    }}
                  >
                    <Image
                      src={images[currentSlide]}
                      alt={`${title} ${currentSlide + 1}`}
                      fill
                      className="object-cover rounded-xl"
                      priority={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <div className="flex justify-center items-center gap-4 mb-4">
                  <button
                    onClick={prev}
                    className="text-[#9cc0ab] hover:text-green-100 text-sm"
                  >
                    ◀ Prev
                  </button>
                  <span className="text-gray-400 text-xs">
                    {currentSlide + 1} / {images.length}
                  </span>
                  <button
                    onClick={next}
                    className="text-[#9cc0ab] hover:text-green-100 text-sm"
                  >
                    Next ▶
                  </button>
                </div>
              )}

              <p className="text-sm text-gray-300 mb-6">{description}</p>

              <div className="flex justify-between items-center">
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#9cc0ab] text-black px-4 py-2 rounded-full hover:bg-green-200 transition font-medium text-sm"
                  >
                    Visit Site →
                  </a>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
