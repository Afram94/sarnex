/* 'use client';

import { useState, useEffect } from 'react';
import api from '../../lib/axios';

export default function useFeatures() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        const res = await api.get('/features');
        if (isMounted) {
          setFeatures(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, []);

  return { features, loading, error };
}
 */