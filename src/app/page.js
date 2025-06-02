'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MainLayout from '../app/components/MainLayout'
import RealProblemsFixed from './components/RealProblemsFixed'
import FeaturesGrid from './components/FeaturesGrid'
import AnimatedProcessScroll from './components/AnimatedProcessScroll'
import FeaturedWork from './components/FeaturedWork'
import CallToActionRoadmap from './components/CallToActionRoadmap'
import AnimatedWordsSwap from './components/AnimatedWordsSwap'
import FeaturesListClient from './components/FeaturesListClient';

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
      <div className="absolute inset-0 bg-black opacity-75" />
      <div className="absolute -top-1/3 -left-1/4 w-[600px] h-[600px] bg-[#9cc0ab] rounded-full blur-[120px] opacity-30 animate-blob1" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#5c6a5a] rounded-full blur-[100px] opacity-30 animate-blob2" />
      <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-[#1f3d2b] rounded-full blur-[140px] opacity-30 animate-blob3" />
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[url('/grain_6.png')] bg-repeat bg-animated" />
    </div>
  )
}

// ✅ Main Page
export default function HomePage() {
  return (
    <MainLayout>
      <main className="relative text-white">
        <section className="relative min-h-screen flex items-center justify-center text-center px-6 md:px-20 py-24 overflow-hidden">
          <HeroBackground />

          <div className="z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#d7eae1] leading-tight mb-10">
              <div>We build Custom Websites</div>
              <div className="flex justify-center items-baseline gap-2 mt-2">
                <span className="whitespace-nowrap">That</span>
                <span className="inline-block min-w-[120px] text-left">
                  <AnimatedWordsSwap />
                </span>
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
        <div className="scroll-section"><RealProblemsFixed /></div>
        <div className="scroll-section"><FeaturesListClient /></div>
        <div className="scroll-section"><AnimatedProcessScroll /></div>
        <div className="scroll-section"><FeaturedWork /></div>
        <div className="scroll-section"><CallToActionRoadmap /></div>
      </main>
    </MainLayout>
  )
}