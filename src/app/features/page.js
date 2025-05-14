import MainLayout from '../components/MainLayout'
import FeaturesList from '../components/FeaturesGrid'

export const metadata = {
  title: 'Features | Sarnex Digital',
  description: 'Explore the powerful features built into every Sarnex Digital website.',
}

export default function FeaturesPage() {
  return (
    <MainLayout>
      <section className="py-28 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Everything You Need. Built In.
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mt-6 text-lg">
          Every website we build includes powerful tools to help your business grow — no plugins, no setup, just results.
        </p>
      </section>

      <FeaturesList />
    </MainLayout>
  )
}
