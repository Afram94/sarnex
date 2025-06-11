// components/features/VisualAdminPanelPage.js

import MainLayout from '../MainLayout';

export default function VisualAdminPanelPage({ feature }) {
  return (
    <MainLayout>
      <section className="py-36 px-6 text-center max-w-4xl mx-auto bg-black">
        <h1 className="text-5xl font-bold text-brand-green mb-4">{feature.title}</h1>
        <p className="text-lg text-beige/80 mb-6">{feature.subtitle}</p>
        <p className="text-beige">{feature.description}</p>

        <div className="mt-10 p-6 bg-white/10 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-2 text-white">Redigeringsvy</h2>
          <p className="text-beige/80">Snabbt och lättanvänt visuellt redigeringsverktyg ingår.</p>
        </div>
      </section>
    </MainLayout>
  );
}
