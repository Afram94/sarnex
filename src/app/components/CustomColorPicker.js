'use client';

import { useState } from 'react';

const palette = [
  '#00f7ff', '#f43f5e', '#fbbf24', '#10b981', '#6366f1',
  '#9333ea', '#a855f7', '#3b82f6', '#0f172a', '#ffffff'
];

export default function CustomColorPicker({ label, value, onChange }) {
  const [hex, setHex] = useState(value);

  const handleSelect = (color) => {
    setHex(color);
    onChange(color);
  };

  const handleHexChange = (e) => {
    const newHex = e.target.value;
    setHex(newHex);
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
      onChange(newHex);
    }
  };

  return (
    <div className="w-full space-y-3">
      <label className="block text-sm text-white/70">{label}</label>

      <div className="flex flex-wrap gap-2">
        {palette.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => handleSelect(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
              color === hex ? 'ring-2 ring-offset-2 ring-[#00f7ff]' : 'border-zinc-600'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mt-1">
        <div
          className="w-6 h-6 rounded border border-white/20"
          style={{ backgroundColor: hex }}
        />
        <input
          type="text"
          value={hex || ''} // ✅ fallback to empty string
          onChange={handleHexChange}
          maxLength={7}
          className="bg-zinc-800 text-white border border-zinc-700 px-3 py-1 rounded-md w-full placeholder:text-white/40 focus:ring-2 focus:ring-[#00f7ff]"
          placeholder="#00f7ff"
        />
      </div>
    </div>
  );
}
