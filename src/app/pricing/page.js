'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-hunter text-beige">
      <Navbar />

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
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-hunter border border-beige/20 rounded-2xl p-8 shadow-xl text-left hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-semibold text-brand-green mb-3">
                {plan.title}
              </h3>
              <p className="text-beige/80 mb-6 leading-relaxed">
                {plan.description}
              </p>
              <ul className="text-beige/70 space-y-2 text-sm mb-6">
                {plan.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <p className="text-beige text-lg font-bold">
                {plan.price}
              </p>
              <p className="text-sm text-beige/60">{plan.billing}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-beige text-hunter py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Monthly Hosting & Support</h2>
        <p className="max-w-xl mx-auto text-lg text-army">
          After the project is delivered, hosting & ongoing support is billed separately. This keeps your site running, secure, and updated.
        </p>
        <p className="mt-4 text-xl font-semibold text-hunter">From 250 kr/month</p>
      </section>

      <section className="bg-army text-beige py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Optional Add-On: Logo & Brand Kit</h2>
        <p className="max-w-xl mx-auto text-lg text-beige/90">
          For clients who don't already have a brand — this includes a simple logo, a professional color palette, and matching font pairings to give your site a cohesive look.
        </p>
        <p className="mt-4 text-xl font-semibold text-brand-green">2,000–3,000 kr (one-time)</p>
        <p className="text-sm text-beige/60 mt-2">*This service is optional and can be added anytime before or after launch.</p>
      </section>

      *
      <section className="bg-hunter text-beige py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ongoing SEO Service</h2>
        <p className="max-w-xl mx-auto text-lg text-beige/80">
          Monthly SEO monitoring and optimization services to keep your site performing and ranking better over time.
        </p>
        <p className="mt-4 text-xl font-semibold text-brand-green">500–1,000 kr/month</p>
        <p className="text-sm text-beige/60 mt-2">
          *This service will be available soon.
        </p>
      </section>
      *
    </div>
  );
}

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
    price: '20,000 kr',
    billing: 'Paid once',
  },
  {
    title: '12-Month Plan',
    description:
      'Split the cost over 1 year. Best for faster pay-off while keeping budget manageable.',
    features: [
      'Same features as full project',
      'Pay monthly for 12 months',
    ],
    price: '1,800 kr/mo',
    billing: 'Monthly + 250–350 kr for hosting & support (starts month 2)',
  },
  {
    title: '24-Month Plan',
    description:
      'Lower monthly payment over 2 years. Ideal for early-stage businesses.',
    features: [
      'Same features as full project',
      'Pay monthly for 24 months',
    ],
    price: '950 kr/mo',
    billing: 'Monthly + 250–350 kr for hosting & support (starts month 2)',
  },
];
