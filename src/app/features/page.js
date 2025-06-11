// app/features/page.js

import FeaturesListServer from '../components/FeaturesListServer';
import MainLayout from '../components/MainLayout';

export const metadata = {
  title: 'Funktioner | Sarnex Digital',
  description: 'Utforska de kraftfulla funktionerna som finns i varje Sarnex Digital-webbplats.',
};

export default function FeaturesPage() {
  return (
    <MainLayout>
      <FeaturesListServer />
    </MainLayout>
  );
}
