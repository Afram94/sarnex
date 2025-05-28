'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About us', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md bg-black/70 py-2 shadow-md' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/DIGITAL.png"
            alt="Sarnex Logo"
            width={120}
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm uppercase text-gray-300 tracking-widest">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`transition hover:text-brand-green relative ${
                pathname === link.href ? 'text-brand-green font-semibold' : ''
              }`}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-brand-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="text-sm font-semibold px-5 py-2 border border-brand-green text-brand-green rounded-md hover:bg-brand-green/10 transition"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden bg-black/80 backdrop-blur-md px-6 py-6 space-y-5 border-t border-white/10 mt-3"
          >
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm uppercase text-gray-300 tracking-wide hover:text-brand-green ${
                  pathname === link.href ? 'text-brand-green font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 text-center text-sm font-semibold px-4 py-2 border border-brand-green text-brand-green rounded-md hover:bg-brand-green/10 transition"
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
