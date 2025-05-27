'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '../app/components/MainLayout'
import RealProblemsFixed from './components/RealProblemsFixed'
import FeaturesGrid from './components/FeaturesGrid'
import AnimatedProcessScroll from './components/AnimatedProcessScroll'
import FeaturedWork from './components/FeaturedWork'
import CallToActionRoadmap from './components/CallToActionRoadmap'
import AnimatedWordsSwap from './components/AnimatedWordsSwap'

// ✅ Animated Word Swapper
/* function AnimatedWordsSwap() {
  const words = ['Perform', 'Convert']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="text-[#9cc0ab]"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  )
} */

// ✅ Wavy Text for "Online"
function WavyText({ text }) {
  return (
    <span
      className="inline-block tracking-wide ml-2 
                 bg-gradient-to-r from-hunter via-beige to-army 
                 bg-[length:300%_300%] bg-clip-text text-transparent animate-wave"
    >
      {text}
    </span>
  )
}




// ✅ Typewriter Text
const messages = [
  'Websites that rank. And convert.',
  'Design, SEO, control — all yours.',
  'No templates. Just custom builds.',
  'Admin dashboards you’ll love.',
  'Scale your site, effortlessly.',
]

function TypewriterText() {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let timeout
    if (visible) {
      if (subIndex < messages[index].length) {
        timeout = setTimeout(() => {
          setText((prev) => prev + messages[index][subIndex])
          setSubIndex((prev) => prev + 1)
        }, 60)
      } else {
        timeout = setTimeout(() => setVisible(false), 2000)
      }
    } else {
      timeout = setTimeout(() => {
        setText('')
        setSubIndex(0)
        setIndex((prev) => (prev + 1) % messages.length)
        setVisible(true)
      }, 600)
    }
    return () => clearTimeout(timeout)
  }, [subIndex, visible])

return (
  <motion.p
    className="text-[#b5cfc1] text-lg mb-6 max-w-xl mx-auto text-center"
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.5 }}
  >
    {text}
    <motion.span
      className="text-[#9cc0ab]"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      |
    </motion.span>
  </motion.p>
)
}

// ✅ Hero Background
function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-black opacity-75" />

      {/* 🫧 Moving Blobs */}
      <div className="absolute -top-1/3 -left-1/4 w-[600px] h-[600px] bg-[#9cc0ab] rounded-full blur-[120px] opacity-30 animate-blob1" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#5c6a5a] rounded-full blur-[100px] opacity-30 animate-blob2" />
      <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-[#1f3d2b] rounded-full blur-[140px] opacity-30 animate-blob3" />

      {/* 🌀 Subtle grain overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[url('/grain_6.png')] bg-repeat bg-animated" />
    </div>
  )
}


// ✅ Page Component
export default function HomePage() {
  return (
    <MainLayout>
      <main className="relative text-white">
        {/* ✨ Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center text-center px-6 md:px-20 py-24 overflow-hidden">
          <HeroBackground />

          <div className="z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#d7eae1] leading-tight mb-10 space-y-3">
              <div>We build Custom Websites</div>
              <div className="inline-flex items-center justify-center gap-2">
                <span>That</span>
                <AnimatedWordsSwap />
              </div>
              <div>
                <WavyText text="Online" />
              </div>
            </h1>



            <TypewriterText />

            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              <a
                href="#features"
                className="bg-[#9cc0ab] hover:bg-[#85a893] text-black font-semibold px-6 py-3 rounded-lg transition"
              >
                See Features
              </a>
              <a
                href="#contact"
                className="border border-white/30 hover:bg-white/10 px-6 py-3 rounded-lg transition"
              >
                Book a Call
              </a>
            </div>
          </div>
        </section>

        {/* 🔻 Scroll Sections */}
        <div className="scroll-section">
          <RealProblemsFixed />
        </div>
        <div className="scroll-section">
          <FeaturesGrid />
        </div>
        <div className="scroll-section">
          <AnimatedProcessScroll />
        </div>
        <div className="scroll-section">
          <FeaturedWork />
        </div>
        <div className="scroll-section">
          <CallToActionRoadmap />
        </div>
      </main>
    </MainLayout>
  )
}
