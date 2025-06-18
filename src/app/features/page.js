// app/features/page.js

import FeaturesListServer from '../components/features/FeaturesListServer';
import MainLayout from '../components/MainLayout';

export const metadata = {
  title: 'Features | Sarnex Digital',
  description: 'Explore the powerful features built into every Sarnex Digital website.',
};

export default function FeaturesPage() {
  return (
    <MainLayout>
      <FeaturesListServer />
    </MainLayout>
  );
}
