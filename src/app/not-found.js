import Link from 'next/link';
import MainLayout from './components/MainLayout';

export const metadata = {
  title: 'Page Not Found | Sarnex Digital',
  description: 'Sorry, this page does not exist.',
};

export default function NotFoundPage() {
  return (
    <MainLayout>
      <section className="py-32 px-6 text-center text-beige bg-army min-h-[80vh]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold text-brand-green mb-6">404</h1>
          <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>

          <Link
            href="/"
            className="inline-block bg-brand-green text-hunter font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-brand-green/90 transition"
          >
            Go Back Home
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
