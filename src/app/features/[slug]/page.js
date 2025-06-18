import { notFound } from 'next/navigation';
import api from '../../../../lib/axios'; // your axios instance with auth token
import VisualAdminPanelPage from '../../components/features/pages/VisualAdminPanelPage';
import GlobalStylingSystemPage from '../../components/features/pages/GlobalStylingSystemPage';

// Mark route as dynamic (for params slug support)
export const dynamic = 'force-dynamic';

// Fetch feature data using axios
async function getFeature(slug) {
  try {
    const res = await api.get(`/features/slug/${slug}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

// Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await Promise.resolve(params);
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

// Feature page rendering
export default async function FeaturePage({ params }) {
  const { slug } = await Promise.resolve(params);
  const feature = await getFeature(slug);

  if (!feature) return notFound();

  switch (slug) {
    case 'visual-admin-panel':
      return <VisualAdminPanelPage feature={feature} />;
    case 'global-styling-system':
      return <GlobalStylingSystemPage feature={feature} />;
    default:
      return notFound();
  }
}
