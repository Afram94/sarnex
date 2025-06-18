'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export default function FeatureCard({ feature, onEdit, onDelete }) {
  const {
    id,
    title,
    subtitle,
    description,
    font_family,
    text_color,
    card_bg_color,
    image_url,
  } = feature;

  const [imgError, setImgError] = useState(false);

  const isValidImage =
    image_url &&
    (!imgError || image_url.startsWith('blob:') || image_url.startsWith('data:'));

  useEffect(() => {
    setImgError(false);
  }, [image_url]);

  return (
      <Tilt
        tiltMaxAngleX={2}
        tiltMaxAngleY={2}
        glareEnable
        glareMaxOpacity={0.08}
        scale={1.005}
        transitionSpeed={500}
      >
      <motion.div
        data-id={id}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="will-change-opacity group relative backdrop-blur-xl border border-beige/10 bg-beige/5 rounded-3xl shadow-xl overflow-hidden transition-colors duration-300 hover:shadow-2xl hover:border-brand-green/30"
        style={{
          backgroundColor: card_bg_color || 'rgba(255,255,255,0.05)',
          color: text_color || '#ffffff',
          fontFamily: font_family || 'sans-serif',
        }}
      >
        {/* Hover gradient glow */}
        <div className="absolute -inset-[2px] bg-gradient-to-tr from-brand-green via-transparent to-army blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl pointer-events-none" />

        {/* Image or fallback */}
        <div className="w-full aspect-[3/2] bg-army relative rounded-t-3xl overflow-hidden">
          {isValidImage ? (
            <>
              <img
                src={image_url}
                alt={title}
                className="w-full h-full object-cover rounded-t-3xl"
                onError={() => setImgError(true)}
              />
              {/* ✨ Gradient or dark overlay for contrast */}
              <div className="absolute inset-0 bg-black/10 backdrop-brightness-[.95] pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-beige text-lg font-mono tracking-wide opacity-80">
              {title}
            </div>
          )}
        </div>


        {/* Text content */}
        <div className="p-6">
          <h4
            className="text-xs uppercase tracking-widest mb-1 opacity-70"
            style={{ color: text_color || '#d9ead3' }}
          >
            {subtitle}
          </h4>
          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: text_color || '#d9ead3' }}
          >
            {title}
          </h3>
          <p
            className="leading-relaxed opacity-80 text-sm"
            style={{ color: text_color || '#d9ead3' }}
          >
            {description}
          </p>

          {/* Edit/Delete buttons */}
          {(onEdit || onDelete) && (
            <div className="mt-4 flex gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(feature)}
                  className="px-3 py-1 text-sm rounded bg-yellow-400 text-black font-medium"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(feature.id)}
                  className="px-3 py-1 text-sm rounded bg-red-500 text-white"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Tilt>
  );
}
