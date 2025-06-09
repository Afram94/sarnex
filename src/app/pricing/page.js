import PricingServer from '../components/pricing/PricingServer';

export const metadata = {
  title: 'Pricing Plans | Sarnex Digital',
  description:
    'Explore flexible and affordable pricing plans for custom websites by Sarnex Digital. Tailored for small businesses aiming to grow online with professional design, SEO, and support.',
  keywords: [
    'website pricing',
    'small business websites',
    'custom website plans',
    'affordable web design',
    'monthly website payment',
    'SEO services',
    'branding services',
    'web design Sweden',
    'Sarnex Digital',
  ],
  alternates: {
    canonical: 'https://sarnexdigital.se/pricing',
  },
  openGraph: {
    title: 'Pricing Plans | Sarnex Digital',
    description:
      'Choose from flexible payment plans for high-impact custom websites. Perfect for small businesses looking to grow their online presence.',
    url: 'https://sarnexdigital.se/pricing',
    siteName: 'Sarnex Digital',
    images: [
      {
        url: 'https://sarnexdigital.se/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sarnex Digital Pricing Plans',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Plans | Sarnex Digital',
    description:
      'Explore flexible pricing options for custom websites, branding, and SEO — tailored to small business needs by Sarnex Digital.',
    images: ['https://sarnexdigital.se/og-image.jpg'],
  },
};

export default function PricingPage() {
  return <PricingServer />;
}
