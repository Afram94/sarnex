'use client';

import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const handleResetCookies = () => {
    // Align with CookieConsent localStorage key
    localStorage.removeItem('cookieConsent');
    window.location.reload();
  };


  return (
    <footer className="bg-hunter text-beige px-6 md:px-20 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-sm">
        {/* Column 1 */}
        <div>
          <h4 className="text-brand-green text-lg font-bold mb-4">Sarnex Digital</h4>
          <p className="text-beige/80">
            We craft stunning, customizable websites for small businesses — combining elegant design with admin control and SEO power.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-brand-green text-lg font-bold mb-4">Pages</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-brand-green transition">Home</Link></li>
            <li><Link href="/features" className="hover:text-brand-green transition">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-brand-green transition">Pricing</Link></li>
            <li><Link href="/contact" className="hover:text-brand-green transition">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-brand-green text-lg font-bold mb-4">Get in Touch</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-brand-green" />
              <a href="mailto:hello@sarnex.digital" className="hover:text-brand-green transition">info@sarnexdigital.se</a>
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram className="text-brand-green" />
              <a href="#" className="hover:text-brand-green transition">@sarnex.digital</a>
            </li>
            <li className="flex items-center gap-2">
              <FaLinkedin className="text-brand-green" />
              <a href="#" className="hover:text-brand-green transition">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-12 border-t border-beige/20 pt-6 text-center text-beige/60 text-xs space-y-2">
        <p>© {new Date().getFullYear()} Sarnex Digital. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <Link href="/privacy-policy" className="underline hover:text-brand-green">Privacy Policy</Link>
          <button
            onClick={handleResetCookies}
            className="underline hover:text-brand-green transition"
            aria-label="Manage cookie preferences"
          >
            Manage Cookies
          </button>

        </div>
      </div>
    </footer>
  );
}
