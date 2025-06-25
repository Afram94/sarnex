// components/features/pages/GenericFeaturePage.js
import MainLayout from '../../MainLayout';

export default function GenericFeaturePage({ feature }) {
  return (
    <MainLayout>
      <section className="py-36 px-6 text-center max-w-4xl mx-auto bg-black">
        <h1 className="text-5xl font-bold text-brand-green mb-4">{feature.title}</h1>
        <p className="text-lg text-beige/80 mb-6">{feature.subtitle}</p>
        <p className="text-beige">{feature.description}</p>
      </section>
    </MainLayout>
  );
}
