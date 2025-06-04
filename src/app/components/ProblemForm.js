'use client';

import { useEffect } from 'react';
import api from '../../../lib/axios';
import CustomColorPicker from '../components/CustomColorPicker';

const fontOptions = [
  'sans-serif',
  'serif',
  'monospace',
  'Inter',
  'Poppins',
  'Space Grotesk',
  'JetBrains Mono',
];

export default function ProblemForm({ selected, onSave, onCancel, preview, setPreview }) {
  useEffect(() => {
    if (selected) {
      setPreview(selected);
    } else {
      setPreview({
        before: '',
        after: '',
        card_bg_color: '#18181b',
        before_text_color: '#fca5a5',  // red-300
        after_text_color: '#9cc0ab',
        font_family: 'sans-serif',
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setPreview({ ...preview, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected?.id) {
        await api.put(`/problems/${selected.id}`, preview);
      } else {
        await api.post('/problems', preview);
      }
      onSave();
      setPreview({
        before: '',
        after: '',
        card_bg_color: '#18181b',
        before_text_color: '#fca5a5',
        after_text_color: '#9cc0ab',
        font_family: 'sans-serif',
      });
    } catch (err) {
      console.error('Submission failed:', err.response?.data || err.message);
      alert('Error: ' + (err.response?.data?.message || 'Something went wrong.'));
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-xl shadow-lg text-white space-y-6 border border-white/10"
    >
      <h2 className="text-xl font-semibold text-white/90">
        {selected ? 'Edit Problem Card' : 'Create New Problem'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm text-white/60">Before</label>
          <textarea
            name="before"
            value={preview.before}
            onChange={handleChange}
            rows={2}
            placeholder="What was the problem?"
            className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
            style={{
              color: preview.before_text_color,
              fontFamily: preview.font_family,
            }}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-white/60">After</label>
          <textarea
            name="after"
            value={preview.after}
            onChange={handleChange}
            rows={2}
            placeholder="How did you solve it?"
            className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#00f7ff]"
            style={{
              color: preview.after_text_color,
              fontFamily: preview.font_family,
            }}
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Card Background */}
        <CustomColorPicker
          label="Card Background"
          value={preview.card_bg_color}
          onChange={(color) => setPreview({ ...preview, card_bg_color: color })}
        />

        {/* Before + After Color Pickers side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomColorPicker
            label="Before Text Color"
            value={preview.before_text_color}
            onChange={(color) => setPreview({ ...preview, before_text_color: color })}
          />

          <CustomColorPicker
            label="After Text Color"
            value={preview.after_text_color}
            onChange={(color) => setPreview({ ...preview, after_text_color: color })}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-white/60">Font Family</label>
        <select
          name="font_family"
          value={preview.font_family}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00f7ff] text-white"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="bg-gradient-to-r from-[#00f7ff] to-[#00cfff] px-6 py-2 rounded-full font-semibold text-black hover:scale-105 transform transition duration-300 shadow-md"
        >
          {selected ? 'Update 🚀' : 'Create ✨'}
        </button>

        {selected && (
          <button
            type="button"
            onClick={onCancel}
            className="text-white/50 hover:text-white transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
