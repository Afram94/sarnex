'use client';

import { useEffect, useState } from 'react';
import api from '../../../../lib/axios';
import FeatureForm from '../../components/FeatureForm';
import FeatureCard from '../../components/FeatureCard';

export default function FeaturesPage() {
  const [features, setFeatures] = useState([]);
  const [selected, setSelected] = useState(null);

  const [preview, setPreview] = useState({
    title: '',
    subtitle: '',
    description: '',
    font_family: 'sans-serif',
    text_color: '#ffffff',
    card_bg_color: '#18181b',
    image_url: '',
    image: null,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); // ✅ This is critical for preview

  const fetchFeatures = async () => {
    const res = await api.get('/features');
    setFeatures(res.data);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* ✅ Form component */}
        <FeatureForm
          selected={selected}
          preview={preview}
          setPreview={setPreview}
          imagePreviewUrl={imagePreviewUrl}
          setImagePreviewUrl={setImagePreviewUrl}
          onSave={fetchFeatures}
          onCancel={() => {
            setSelected(null);
            setImagePreviewUrl('');
          }}
        />

        {/* ✅ Live Preview Card — inject imagePreviewUrl for real-time blob/URL preview */}
        <FeatureCard
          feature={{
            ...preview,
            image_url: imagePreviewUrl || preview.image_url,
          }}
        />
      </div>

      {/* ✅ Saved cards list */}
      <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-6">All Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onEdit={(f) => {
                setSelected(f);
                setPreview(f);
                setImagePreviewUrl(f.image_url || '');
              }}
              onDelete={async (id) => {
                if (confirm('Delete this feature?')) {
                  await api.delete(`/features/${id}`);
                  fetchFeatures();
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
