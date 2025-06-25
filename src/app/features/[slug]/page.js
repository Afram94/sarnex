import { notFound } from 'next/navigation';
import api from '../../../../lib/axios';
import EasyContentManagementPage from '../../components/features/pages/EasyContentManagementPage';
import CustomizableDesignSystemPage from '../../components/features/pages/CustomizableDesignSystemPage';
import GenericFeaturePage from '../../components/features/pages/GenericFeaturePage'; // ✅ NEW

export const dynamic = 'force-dynamic';

async function getFeature(slug) {
  console.log('[FeaturePage] calling slug:', slug);
  try {
    const res = await api.get(`/features/slug/${slug}`);
    return res.data;
  } catch (err) {
    console.error('Feature fetch error:', err?.response?.status, err?.message);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const feature = await getFeature(slug);

  if (!feature) {
    return {
      title: 'Feature | Sarnex Digital',
      description: 'Explore a feature from Sarnex Digital.',
    };
  }

  return {
    title: `${feature.title} | Sarnex Digital`,
    description: feature.description,
    openGraph: {
      title: `${feature.title} | Sarnex Digital`,
      description: feature.description,
      url: `https://sarnexdigital.se/features/${feature.slug}`,
      images: feature.image_url ? [feature.image_url] : [],
    },
  };
}

export default async function FeaturePage({ params }) {
  const { slug } = params;
  const feature = await getFeature(slug);

  if (!feature) return notFound();

  switch (slug) {
    case 'easy-content-management':
      return <EasyContentManagementPage feature={feature} />;
    case 'customizable-design-system':
      return <CustomizableDesignSystemPage feature={feature} />;
    default:
      return <GenericFeaturePage feature={feature} />; // ✅ FIXED
  }
}
