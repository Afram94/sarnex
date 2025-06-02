'use client';

import { useEffect, useState } from 'react';
import FeaturesGrid from './FeaturesGrid';
import api from '../../../lib/axios';

export default function FeaturesListClient() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    api.get('/features')
      .then(res => setFeatures(res.data))
      .catch(err => console.error('Failed to load features:', err));
  }, []);

  return <FeaturesGrid features={features} />;
}
