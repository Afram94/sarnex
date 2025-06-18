'use client';

import { useEffect } from 'react';
import api from '../../../../lib/axios';
import CustomColorPicker from '../CustomColorPicker';
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

const DEFAULT_STYLE = {
  font_family: 'sans-serif',
  text_color: '#d9ead3',         // matches text-beige
  card_bg_color: 'rgba(255,255,255,0.05)', // matches bg-beige/5
};

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
      setPreview({ ...selected, image: null });
      setImagePreviewUrl(selected.image_url || '');
    } else {
      resetForm();
    }
  }, [selected]);

  useEffect(() => {
    if (preview.image_url && !preview.image) {
      setImagePreviewUrl(preview.image_url);
    }
  }, [preview.image_url]);

  useEffect(() => {
    if (preview.image instanceof File) {
      const tempUrl = URL.createObjectURL(preview.image);
      setImagePreviewUrl(tempUrl);
    }
  }, [preview.image]);

  const resetForm = () => {
    setPreview({
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      image: null,
      ...DEFAULT_STYLE,
    });
    setImagePreviewUrl('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreview((prev) => ({ ...prev, [name]: value }));

    if (name === 'image_url') {
      setImagePreviewUrl(value);
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
    } catch (err) {
      if (err.response?.data?.errors) {
        console.error('Validation errors:', err.response.data.errors);
      } else {
        console.error('Error submitting form:', err.response?.data || err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-xl border border-white/10 shadow space-y-5 text-white"
    >
      <h2 className="text-lg font-bold">
        {selected ? 'Edit Feature' : 'Create Feature'}
      </h2>

      <input
        name="title"
        placeholder="Title"
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

      <input
        name="image_url"
        placeholder="Image URL (optional)"
        value={preview.image_url || ''}
        onChange={handleChange}
        className="w-full bg-zinc-800 px-4 py-2 rounded border border-zinc-700 placeholder:text-white/30"
      />

      {/* File Upload */}
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
                setPreview((prev) => ({
                  ...prev,
                  image: file,
                  image_url: '',
                }));
              }
            }}
          />
          <span className="pointer-events-none">
            📁 {preview.image?.name || 'Choose an image file'}
          </span>
        </label>
      </div>

      {/* Image Preview */}
      {imagePreviewUrl && (
        <div className="flex items-center gap-4 mt-2">
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="w-16 h-16 object-cover rounded"
          />
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

      {/* Custom Styling Controls */}
      <CustomColorPicker
        label="Card Background"
        value={preview.card_bg_color}
        onChange={(color) =>
          setPreview((prev) => ({ ...prev, card_bg_color: color }))
        }
      />
      <CustomColorPicker
        label="Text Color"
        value={preview.text_color}
        onChange={(color) =>
          setPreview((prev) => ({ ...prev, text_color: color }))
        }
      />

      <div>
        <label className="block mb-1 text-sm text-white/60">Font Family</label>
        <select
          name="font_family"
          value={preview.font_family}
          onChange={handleChange}
          className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green text-white"
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
