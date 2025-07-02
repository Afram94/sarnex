import AIServer from '../components/AI/AIServer';

export const metadata = {
  title: 'AI Writing Assistant | Sarnex Digital',
  description:
    'Use AI to improve website content and generate SEO-optimized blog posts — all within your Sarnex dashboard.',
  keywords: [
    'AI writing',
    'website content generator',
    'smart blog writer',
    'seo copywriting',
    'automated content',
    'Sarnex Digital AI',
    'content improvement tool',
  ],
  alternates: {
    canonical: 'https://sarnexdigital.se/AI',
  },
  openGraph: {
    title: 'AI Writing Assistant | Sarnex Digital',
    description:
      'Improve your website content and publish SEO-ready blogs using our built-in AI tools.',
    url: 'https://sarnexdigital.se/AI',
    siteName: 'Sarnex Digital',
    images: [
      {
        url: 'https://sarnexdigital.se/og-ai.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Writing Assistant Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Writing Assistant | Sarnex Digital',
    description:
      'Smarter content, stronger SEO. Built-in AI tools to help your business write better, faster.',
    images: ['https://sarnexdigital.se/og-ai.jpg'],
  },
};

export default function AIPage() {
  return <AIServer />;
}
