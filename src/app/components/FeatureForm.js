'use client';

import { useEffect } from 'react';
import api from '../../../lib/axios';
import CustomColorPicker from './CustomColorPicker';
import { X } from 'lucide-react';

const fontOptions = [
  'sans-serif',
  'serif',
  'monospace',
  'Inter',
  'Poppins',
  'Space Grotesk',
  'JetBrains Mono',
];

export default function FeatureForm({
  selected,
  preview,
  setPreview,
  imagePreviewUrl,
  setImagePreviewUrl,
  onSave,
  onCancel,
}) {
  useEffect(() => {
  if (selected) {
    setPreview(selected);
    setImagePreviewUrl(selected.image_url || '');
  } else {
    setPreview({
      title: '',
      subtitle: '',
      description: '',
      font_family: 'sans-serif',
      text_color: '#ffffff',
      card_bg_color: '#18181b',
      image_url: '',
      image: null,
    });
    setImagePreviewUrl('');
  }
    }, [selected]);

    // ✅ Add this to make URL input trigger live preview
    useEffect(() => {
    if (preview.image_url && !preview.image) {
        setImagePreviewUrl(preview.image_url);
    }
    }, [preview.image_url]);


  const handleChange = (e) => {
    setPreview({ ...preview, [e.target.name]: e.target.value });
    if (e.target.name === 'image_url') {
      setImagePreviewUrl(e.target.value);
      setPreview((prev) => ({ ...prev, image: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(preview).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== 'image') {
        formData.append(key, value);
      }
    });

    if (preview.image instanceof File) {
      formData.append('image', preview.image);
    }

    try {
      if (selected?.id) {
        await api.post(`/features/${selected.id}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/features', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      onSave();
      setPreview({
        title: '',
        subtitle: '',
        description: '',
        font_family: 'sans-serif',
        text_color: '#ffffff',
        card_bg_color: '#18181b',
        image_url: '',
        image: null,
      });
      setImagePreviewUrl('');
    } catch (err) {
      console.error('Error submitting form:', err.response?.data || err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-xl border border-white/10 shadow space-y-5 text-white"
    >
      <h2 className="text-lg font-bold">{selected ? 'Edit Feature' : 'Create Feature'}</h2>

      <input
        name="title"
        placeholder="Title (for internal use)"
        value={preview.title}
        onChange={handleChange}
        className="w-full bg-zinc-800 px-4 py-2 rounded border border-zinc-700 placeholder:text-white/30"
        required
      />

      <input
        name="subtitle"
        placeholder="Subtitle"
        value={preview.subtitle}
        onChange={handleChange}
        className="w-full bg-zinc-800 px-4 py-2 rounded border border-zinc-700 placeholder:text-white/30"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={preview.description}
        onChange={handleChange}
        rows={3}
        className="w-full bg-zinc-800 px-4 py-2 rounded border border-zinc-700 placeholder:text-white/30"
        required
      />

      {!preview.image && (
        <input
          name="image_url"
          placeholder="Image URL (optional)"
          value={preview.image_url || ''}
          onChange={handleChange}
          className="w-full bg-zinc-800 px-4 py-2 rounded border border-zinc-700 placeholder:text-white/30"
        />
      )}

      {!preview.image_url && (
        <div>
          <label className="block mb-1 text-sm text-white/60">Upload Image</label>
          <label className="relative w-full cursor-pointer flex items-center justify-center bg-zinc-800 text-white border border-zinc-700 rounded-md py-3 px-4 hover:border-teal-500 transition duration-300">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview({ ...preview, image: file });
                  const tempUrl = URL.createObjectURL(file);
                  setImagePreviewUrl(tempUrl);
                }
              }}
            />
            <span className="pointer-events-none">
              📁 {preview.image?.name || 'Choose an image file'}
            </span>
          </label>
        </div>
      )}

      {imagePreviewUrl && (
        <div className="flex items-center gap-4 mt-2">
          <img src={imagePreviewUrl} alt="Preview" className="w-16 h-16 object-cover rounded" />
          <div className="text-sm text-white/60">
            <div className="font-mono text-white truncate max-w-xs">
              {preview.image?.name || 'From URL'}
            </div>
            {preview.image && (
              <div>
                {(preview.image.size / 1024).toFixed(1)} KB — {preview.image.type}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setPreview((prev) => ({ ...prev, image: null, image_url: '' }));
              setImagePreviewUrl('');
            }}
            className="text-white/60 hover:text-red-400"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <CustomColorPicker
        label="Card Background"
        value={preview.card_bg_color}
        onChange={(color) => setPreview({ ...preview, card_bg_color: color })}
      />

      <CustomColorPicker
        label="Text Color"
        value={preview.text_color}
        onChange={(color) => setPreview({ ...preview, text_color: color })}
      />

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

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="bg-teal-500 px-6 py-2 rounded text-black font-semibold hover:bg-teal-400 transition"
        >
          {selected ? 'Update' : 'Create'}
        </button>
        {selected && (
          <button
            type="button"
            onClick={onCancel}
            className="text-white/50 hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}