'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../MainLayout';

const plans = [
  {
    title: 'One-Time Payment',
    description:
      'Perfect for businesses ready to invest in a premium, fully custom site up front.',
    features: [
      '4–6 custom pages',
      'Full admin panel',
      'SEO setup & analytics',
      'Hosting included first month',
    ],
    price: '15000',
    billing: 'Paid once',
    extra: 'Monthly hosting & support: 300 kr (starts month 2)',
  },
  {
    title: '12-Month Plan',
    description:
      'Split the cost over 1 year. Best for faster pay-off while keeping budget manageable.',
    features: ['Same features as full project', 'Pay monthly for 12 months'],
    price: '1250',
    billing: 'Monthly + 300 kr for hosting & support (starts month 2)',
  },
  {
    title: '24-Month Plan',
    description:
      'Lower monthly payment over 2 years. Ideal for early-stage businesses.',
    features: ['Same features as full project', 'Pay monthly for 24 months'],
    price: '625',
    billing: 'Monthly + 300 kr for hosting & support (starts month 2)',
  },
];

export default function PricingClient() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Custom Website Design",
      "description": "Flexible pricing plans for custom websites tailored for small businesses.",
      "brand": {
        "@type": "Brand",
        "name": "Sarnex Digital"
      },
      "offers": plans.map(plan => ({
        "@type": "Offer",
        "name": plan.title,
        "priceCurrency": "SEK",
        "price": plan.price.replace(/[^\d]/g, ''),
        "description": plan.description,
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Sarnex Digital",
          "url": "https://sarnexdigital.se"
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }, []);

  return (
    <MainLayout>
      <main>
        <section className="py-24 px-6 md:px-20 text-center bg-gradient-to-b from-hunter to-army">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-bold text-brand-green mb-6"
          >
            Pricing Plans
          </motion.h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-beige/90">
            Simple, flexible pricing for high-impact custom websites — designed for small businesses that want to grow.
          </p>
        </section>

        <section className="py-20 px-6 md:px-20 bg-army">
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <motion.article
                key={plan.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-hunter border border-beige/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-[1.02] text-left flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold text-brand-green mb-2">{plan.title}</h3>
                  <p className="text-beige/80 mb-5 leading-relaxed text-sm">{plan.description}</p>
                </div>

                <ul className="text-beige/70 space-y-2 text-sm mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-brand-green text-base">✓</span> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <p className="text-3xl font-extrabold text-beige mb-1">
                    {parseInt(plan.price).toLocaleString('sv-SE')} kr
                  </p>
                  <p className="text-sm text-beige/60">{plan.billing}</p>
                  {plan.extra && (
                    <p className="text-sm text-beige/50 mt-1">{plan.extra}</p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <p className="text-center text-sm text-beige/50 mt-10">
            * All plans include monthly hosting & support after the first month: 300 kr/month
          </p>
        </section>

        <section className="bg-beige text-hunter py-16 px-6 md:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Monthly Hosting & Support</h2>
          <p className="max-w-xl mx-auto text-lg text-army">
            After the project is delivered, hosting & ongoing support is billed separately. This keeps your site running, secure, and updated.
          </p>
          <p className="mt-4 text-xl font-semibold text-hunter">From 300 kr/month</p>
        </section>

        <section className="bg-hunter text-beige py-16 px-6 md:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Optional Add-On: Logo & Brand Kit</h2>
          <p className="max-w-xl mx-auto text-lg text-beige/90">
            For clients who don't already have a brand — this includes a simple logo, a professional color palette, and matching font pairings to give your site a cohesive look.
          </p>
          <p className="mt-4 text-xl font-semibold text-brand-green">2,000–3,000 kr (one-time)</p>
          <p className="text-sm text-beige/60 mt-2">*This service is optional and can be added anytime before or after launch.</p>
        </section>

        <section className="bg-army text-beige py-16 px-6 md:px-20 text-center border-b">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ongoing SEO Service</h2>
          <p className="max-w-xl mx-auto text-lg text-beige/80">
            If you want to stay visible on Google as trends change, we can review and update your SEO each month.
            This ensures your site always ranks for the right keywords, especially during seasons or promotions.
          </p>
          <p className="mt-4 text-xl font-semibold text-brand-green">500–1,000 kr/month</p>
        </section>
      </main>
    </MainLayout>
  );
}
