"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About us", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        hidden ? "w-[45%] mt-2" : "w-[75%] mt-6 scale-105"
      }`}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full bg-[#0a0a0a]/80 shadow-lg backdrop-blur-md rounded-xl px-6 py-3 border border-[#1a1a1a]"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center">
            <Image
              src="/DIGITAL.png"
              alt="Sarnex Logo"
              width={130}
              height={60}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8 text-sm font-light text-gray-300 tracking-widest uppercase">
            {navLinks.map((link, index) => (
              <li key={index} className="relative group">
                <Link
                  href={link.href}
                  className={`hover:text-[#00FF7F] transition-colors ${
                    pathname === link.href ? "text-[#00FF7F] font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#00FF7F] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Contact and Get Started Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/contact"
              className="px-4 py-1.5 border border-[#00FF7F] text-[#00FF7F] text-sm tracking-wide font-semibold hover:bg-[#00ff7f]/10 transition-all rounded-sm"
            >
              Contact
            </Link>
            <Link
              href="/get-started"
              className="px-4 py-1.5 border border-white text-white text-sm tracking-wide font-semibold hover:bg-white/10 transition-all rounded-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ rotate: 90, scale: 0.9 }}
          >
            {isOpen ? "X" : "≡"}
          </motion.button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden mt-3 bg-[#0a0a0a] px-4 py-4 rounded-b-xl border-t border-[#1a1a1a]"
            >
              <ul className="space-y-4 text-sm text-gray-300 tracking-widest uppercase">
                {navLinks.map((link, index) => (
                  <li key={index} className="relative group">
                    <Link
                      href={link.href}
                      className="block hover:text-[#00FF7F] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00FF7F] transition-all duration-300 group-hover:w-full"></span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-3">
                <Link
                  href="/contact"
                  className="block text-center px-4 py-2 border border-[#00FF7F] text-[#00FF7F] rounded-sm text-sm font-semibold hover:bg-[#00ff7f]/10 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/get-started"
                  className="block text-center px-4 py-2 border border-white text-white rounded-sm text-sm font-semibold hover:bg-white/10 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
