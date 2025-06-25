'use client';

import { useEffect, useState } from 'react';
import api from '../../../../lib/axios';
import FeatureForm from '../../components/features/FeatureForm';
import FeatureCard from '../../components/features/FeatureCard';

const DEFAULT_STYLE = {
  font_family: 'sans-serif',
  text_color: '#d9ead3',         // beige-like text
  card_bg_color: 'rgba(255,255,255,0.05)', // matches bg-beige/5
};

export default function FeaturesPage() {
  const [features, setFeatures] = useState([]);
  const [selected, setSelected] = useState(null);

  const [preview, setPreview] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    image: null,
    ...DEFAULT_STYLE,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const fetchFeatures = async () => {
    const res = await api.get('/features');
    setFeatures(res.data);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const resetFormState = () => {
    setSelected(null);
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

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* 🧩 Form (Create or Edit) */}
        <FeatureForm
          selected={selected}
          preview={preview}
          setPreview={setPreview}
          imagePreviewUrl={imagePreviewUrl}
          setImagePreviewUrl={setImagePreviewUrl}
          onSave={() => {
            fetchFeatures();
            resetFormState();
          }}
          onCancel={resetFormState}
        />

        {/* 🧩 Preview Card */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-hunter via-army to-[#1f3529] p-6">
          <FeatureCard
            feature={{
              ...preview,
              image_url: imagePreviewUrl || preview.image_url,
            }}
          />
        </div>
      </div>

      {/* 🧩 List of Saved Cards */}
      <div className="bg-gradient-to-b from-hunter via-army to-[#1f3529] border border-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-6">All Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onEdit={(f) => {
                setSelected(f);
                setPreview({
                  ...f,
                  image: null,
                });
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