'use client';

import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';

export default function PricingPage() {
  return (
    <MainLayout>
      <section className="py-24 px-6 md:px-20 text-center bg-gradient-to-b from-hunter to-army">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-serif font-bold text-brand-green mb-6"
        >
          Prisplaner
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-beige/90">
          Enkla och flexibla priser för högeffektiva, skräddarsydda webbplatser – utformade för småföretag som vill växa.
        </p>
      </section>

      <section className="py-20 px-6 md:px-20 bg-army">
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-hunter border border-beige/20 rounded-2xl p-8 shadow-xl text-left hover:shadow-2xl transition-shadow transition-colors duration-300 ease-in-out"
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Månatlig hosting & support</h2>
        <p className="max-w-xl mx-auto text-lg text-army">
          Efter leverans faktureras hosting och löpande support separat. Det håller din sida igång, säker och uppdaterad.
        </p>
        <p className="mt-4 text-xl font-semibold text-hunter">Från 250 kr/månad</p>
      </section>

      <section className="bg-hunter text-beige py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Tillval: Logotyp & varumärkespaket</h2>
        <p className="max-w-xl mx-auto text-lg text-beige/90">
          För dig som saknar varumärke – här ingår en enkel logotyp, professionellt färgtema och passande typsnitt för ett enhetligt uttryck.
        </p>
        <p className="mt-4 text-xl font-semibold text-brand-green">2 000–3 000 kr (engångsavgift)</p>
        <p className="text-sm text-beige/60 mt-2">*Tjänsten är valfri och kan läggas till när som helst.</p>
      </section>

      <section className="bg-army text-beige py-16 px-6 md:px-20 text-center border-b">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Löpande SEO-tjänst</h2>
        <p className="max-w-xl mx-auto text-lg text-beige/80">
          Månatlig SEO-övervakning och optimering som hjälper din sida att prestera och ranka bättre med tiden.
        </p>
        <p className="mt-4 text-xl font-semibold text-brand-green">500–1 000 kr/månad</p>
        <p className="text-sm text-beige/60 mt-2">
          *This service will be available soon.
        </p>
      </section>
    </MainLayout>
  );
}

const plans = [
  {
    title: 'Engångsbetalning',
    description:
      'Perfekt för företag som vill investera direkt i en premium, helt skräddarsydd sajt.',
    features: [
      '4–6 custom pages',
      'Full admin panel',
      'SEO setup & analytics',
      'Hosting included first month',
    ],
    price: '20,000 kr',
    billing: 'Betalas en gång',
  },
  {
    title: '12-månadersplan',
    description:
      'Dela upp kostnaden över ett år. Bra för snabbare avbetalning men med hållbar budget.',
    features: [
      'Same features as full project',
      'Pay monthly for 12 months',
    ],
    price: '1,800 kr/mo',
    billing: 'Månatligt + 250–350 kr för hosting & support (från månad 2)',
  },
  {
    title: '24-månadersplan',
    description:
      'Lägre månadsbetalning under två år. Passar nystartade företag.',
    features: [
      'Same features as full project',
      'Pay monthly for 24 months',
    ],
    price: '950 kr/mo',
    billing: 'Månatligt + 250–350 kr för hosting & support (från månad 2)',
  },
];