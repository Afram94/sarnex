'use client';

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) setVisible(true); // show banner if no choice yet
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:right-auto md:w-[500px] z-50 bg-army text-beige border border-beige/20 p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-start gap-3 text-sm leading-relaxed">
        <span className="text-lg">🍪</span>
        <p>
          We use cookies to enhance your experience.{' '}
          <a href="/privacy-policy" className="underline hover:text-brand-green">
            Read our Privacy Policy
          </a>.
        </p>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={reject}
          className="px-4 py-1 border border-beige/40 text-beige rounded-md hover:bg-beige/10 transition"
        >
          Reject
        </button>
        <button
          onClick={accept}
          className="px-4 py-1 bg-brand-green text-black font-semibold rounded-md hover:bg-brand-green/80 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
