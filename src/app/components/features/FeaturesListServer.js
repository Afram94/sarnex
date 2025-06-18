// components/FeaturesListServer.js


// components/FeaturesListServer.js
import FeaturesGrid from './FeaturesGrid';
import api from '../../../../lib/axios';

export default async function FeaturesListServer() {
  let features = [];

  try {
    const res = await api.get('/features');
    features = res.data;
  } catch (err) {
    console.error('Error loading features:', err);
  }

  return <FeaturesGrid features={features} />;
}
