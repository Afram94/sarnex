import MainLayout from '../components/MainLayout';

export const metadata = {
  title: 'Privacy Policy | Sarnex Digital',
  description: 'Learn how Sarnex Digital collects and uses your data, including cookies and analytics.',
};

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <section className="py-24 px-6 bg-army text-beige min-h-[90vh]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-green mb-10">Privacy Policy</h1>

          <div className="space-y-10 text-lg leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-brand-green mb-2">1. Cookies</h2>
              <p>
                We use cookies to personalize your experience and understand how visitors interact with our
                website. When you first visit, you can accept or reject cookies via our banner.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-brand-green mb-2">2. Analytics</h2>
              <p>
                We use Google Analytics (GA4) to gather anonymous usage data such as visitor counts,
                page views, and traffic sources. This helps us improve our content and performance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-brand-green mb-2">3. Consent</h2>
              <p>
                By clicking “Accept” on our cookie banner, you agree to data collection for analytics.
                You can revoke this at any time by clearing your browser cookies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-brand-green mb-2">4. Data Sharing</h2>
              <p>
                We do not sell or share your data except as required for analytics or legal compliance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-brand-green mb-2">5. Contact</h2>
              <p>
                Have questions? Email us at{' '}
                <a
                  href="mailto:info@sarnexdigital.se"
                  className="underline text-brand-green hover:text-brand-green/80"
                >
                  info@sarnexdigital.se
                </a>
              </p>
            </div>

            <p className="text-sm text-beige/60 mt-10">Last updated: June 3, 2025</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
