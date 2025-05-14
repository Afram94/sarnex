'use client'

// Import needed React hooks and animation libraries
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

// Our feature content data
const features = [
  {
    id: 'a',
    image: '/Visual-Admin-Panel.png',
    title: 'Visual Admin Panel',
    subtitle: 'Edit Without Code',
    description:
      'Change content, layout, and components instantly through our intuitive editor.',
  },
  {
    id: 'b',
    image: '/Global-Styling-System.png',
    title: 'Global Styling System',
    subtitle: 'Control Your Brand',
    description:
      'Tweak typography, colors, spacing, and more across your site in real-time.',
  },
  {
    id: 'c',
    image: '/Realtime-Analytics.png',
    title: 'Realtime Analytics',
    subtitle: 'Insights That Matter',
    description:
      'Monitor visitors, engagement, and performance with built-in dashboards.',
  },
  {
    id: 'd',
    image: '/Speed-Hosting.png',
    title: 'Edge Hosting Platform',
    subtitle: 'Speed & Reliability',
    description:
      'Global CDN, SSL, and autoscaling keep your site fast and always online.',
  },
]

export default function FeaturesList() {
  // 1. Reference to the entire section
  const containerRef = useRef(null)

  // 2. Tracks x/y position of each card for connecting lines
  const [positions, setPositions] = useState({})

  // 3. Tracks cursor position for glow trail
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  // 📍 Measures center position of each feature card
  useEffect(() => {
    const updatePositions = () => {
      const newPos = {}
      features.forEach((f) => {
        const el = document.querySelector(`[data-id="${f.id}"]`)
        if (el) {
          const rect = el.getBoundingClientRect()
          newPos[f.id] = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }
        }
      })
      setPositions(newPos)
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    return () => window.removeEventListener('resize', updatePositions)
  }, [])

  // 🌀 Tracks cursor position globally for glowing effect
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section className="relative bg-[#0f1111] py-32 px-6 overflow-hidden" ref={containerRef}>
      {/* 🔵 Mouse-following blur glow circle */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl z-20"
        animate={{ x: cursor.x - 64, y: cursor.y - 64 }} // follow mouse with offset
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      />

      {/* 🔗 SVG connector lines between cards */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        {/* a → b */}
        {positions['a'] && positions['b'] && (
          <line
            x1={positions['a'].x}
            y1={positions['a'].y}
            x2={positions['b'].x}
            y2={positions['b'].y}
            stroke="rgba(94,252,211,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        )}
        {/* b → c */}
        {positions['b'] && positions['c'] && (
          <line
            x1={positions['b'].x}
            y1={positions['b'].y}
            x2={positions['c'].x}
            y2={positions['c'].y}
            stroke="rgba(94,252,211,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        )}
        {/* c → d */}
        {positions['c'] && positions['d'] && (
          <line
            x1={positions['c'].x}
            y1={positions['c'].y}
            x2={positions['d'].x}
            y2={positions['d'].y}
            stroke="rgba(94,252,211,0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        )}
      </svg>

      {/* 🧱 Feature Cards Grid */}
      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-16">
        {features.map(({ id, image, title, subtitle, description }, i) => (
          <Tilt
            key={id}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            glareEnable
            glareMaxOpacity={0.2}
            scale={1.02}
            transitionSpeed={1500}
          >
            {/* 🎯 Animated Feature Card */}
            <motion.div
              data-id={id} // used for SVG line anchors
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative backdrop-blur-xl border border-white/10 bg-white/5 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-teal-400/20"
            >
              {/* 🌈 Glow ring on hover */}
              <div className="absolute -inset-[2px] bg-gradient-to-tr from-teal-500 via-transparent to-indigo-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl pointer-events-none" />

              {/* 🖼 Image fully contained */}
              <div className="w-full aspect-[3/2] bg-black rounded-t-3xl overflow-hidden flex items-center justify-center">
                <img
                  src={image}
                  alt={title}
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* 📋 Title + Subtitle + Description */}
              <div className="p-6">
                <h4 className="text-xs uppercase tracking-widest text-white/70 mb-1">{subtitle}</h4>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/80 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </section>
  )
}
