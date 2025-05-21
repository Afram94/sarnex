'use client';

import { useState } from 'react';

export default function FeatureCard({ feature, onEdit, onDelete }) {
  const {
    title,
    subtitle,
    description,
    font_family,
    text_color,
    card_bg_color,
    image_url,
  } = feature;

  const [imgError, setImgError] = useState(false);

  const isValidImage = image_url && !imgError;

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-xl border border-white/10 transition-all hover:shadow-[#9cc0ab]/20"
      style={{
        backgroundColor: card_bg_color || '#18181b',
        color: text_color || '#ffffff',
        fontFamily: font_family || 'sans-serif',
      }}
    >
      <div className="w-full aspect-[3/2] bg-black rounded-t-3xl overflow-hidden">
        {isValidImage ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover rounded-t-3xl"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-lg font-mono tracking-wide opacity-80">
            {title}
          </div>
        )}
      </div>

      <div className="p-6">
        <h4 className="text-xs uppercase tracking-widest mb-1 opacity-70">
          {subtitle}
        </h4>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm leading-relaxed">{description}</p>

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
    </div>
  );
}
