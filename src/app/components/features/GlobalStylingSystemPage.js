// components/features/GlobalStylingSystemPage.js

import MainLayout from '../MainLayout';

export default function GlobalStylingSystemPage({ feature }) {
  return (
    <MainLayout>
      <section className="py-36 px-6 max-w-6xl mx-auto text-left">
        <h1 className="text-5xl font-bold text-brand-green mb-6">{feature.title}</h1>
        <p className="text-lg text-beige mb-8">{feature.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-2 text-beige">Enhetligt varumärke</h3>
            <p className="text-beige/80">Applicera enkelt typsnitt, färger och mellanrum på hela din sida.</p>
          </div>
          <div className="bg-brand-green/10 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-2 text-beige">Direkt kontroll</h3>
            <p className="text-beige/80">Se ändringar omedelbart i det visuella verktyget.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
