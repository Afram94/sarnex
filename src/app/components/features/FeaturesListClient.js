'use client';

import useFeatures from '../../../hooks/useFeatures'; // adjust if your folder is different
import FeaturesGrid from './FeaturesGrid';

export default function FeaturesListClient() {
  const { features, loading, error } = useFeatures();

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading features</p>;

  return <FeaturesGrid features={features} />;
}



/* 'use client';

import { useEffect, useState } from 'react';
import FeaturesGrid from './FeaturesGrid';
import api from '../../../../lib/axios';

export default function FeaturesListClient() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    api.get('/features')
      .then(res => setFeatures(res.data))
      .catch(err => console.error('Failed to load features:', err));
  }, []);

  return <FeaturesGrid features={features} />;
}
 */