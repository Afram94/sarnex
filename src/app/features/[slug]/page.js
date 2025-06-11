// app/features/[slug]/page.js

import { notFound } from 'next/navigation';
import VisualAdminPanelPage from '../../components/features/VisualAdminPanelPage';
import GlobalStylingSystemPage from '../../components/features/GlobalStylingSystemPage';

// This marks the route as dynamic
export const dynamic = 'force-dynamic';

async function getFeature(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/features/slug/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ✅ Async wrapper to properly use await on params
export async function generateMetadata({ params }) {
  const { slug } = await Promise.resolve(params);
  const feature = await getFeature(slug);

  if (!feature) {
    return {
      title: 'Funktion | Sarnex Digital',
      description: 'Utforska en funktion från Sarnex Digital.',
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
  const { slug } = await Promise.resolve(params); // 👈 fix warning
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
