'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

const features = [
  {
    id: 'a',
    title: 'Visual Admin Panel',
    subtitle: 'Edit Without Code',
    description:
      'Change content, layout, and components instantly through our intuitive editor.',
  },
  {
    id: 'b',
    title: 'Global Styling System',
    subtitle: 'Control Your Brand',
    description:
      'Tweak typography, colors, spacing, and more across your site in real-time.',
  },
  {
    id: 'c',
    title: 'Realtime Analytics',
    subtitle: 'Insights That Matter',
    description:
      'Monitor visitors, engagement, and performance with built-in dashboards.',
  },
  {
    id: 'd',
    title: 'Edge Hosting Platform',
    subtitle: 'Speed & Reliability',
    description:
      'Global CDN, SSL, and autoscaling keep your site fast and always online.',
  },
]

export default function FeaturesList() {
  const containerRef = useRef(null)
  const [positions, setPositions] = useState({})
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePositions = () => {
      const newPos = {}
      const containerRect = containerRef.current?.getBoundingClientRect()

      features.forEach((f) => {
        const el = document.querySelector(`[data-id="${f.id}"]`)
        if (el && containerRect) {
          const rect = el.getBoundingClientRect()
          newPos[f.id] = {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          }
        }
      })

      setPositions(newPos)
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    return () => window.removeEventListener('resize', updatePositions)
  }, [])

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <section
      className="relative bg-[#0f1111] py-32 px-6 overflow-hidden"
      ref={containerRef}
    >
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl z-20"
        animate={{ x: cursor.x - 64, y: cursor.y - 64 }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      />

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        {['a', 'b', 'c'].map((from, i) => {
          const to = ['b', 'c', 'd'][i]
          return positions[from] && positions[to] ? (
            <line
              key={`${from}-${to}`}
              x1={positions[from].x}
              y1={positions[from].y}
              x2={positions[to].x}
              y2={positions[to].y}
              stroke="rgba(94,252,211,0.3)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="animate-dash"
            />
          ) : null
        })}
      </svg>

      <div className="text-center max-w-2xl mx-auto mb-20 relative z-20">
        <span className="inline-block text-sm bg-white/10 text-white/60 px-3 py-1 rounded-full mb-4">
          Coming Soon
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Upcoming Features
        </h2>
        <p className="text-white/60 mt-4 text-base md:text-lg">
          These powerful tools are in the works. Here’s a sneak peek at what we’re
          building.
        </p>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-16">
        {features.map(({ id, title, subtitle, description }) => (
          <Tilt
            key={id}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            glareEnable
            glareMaxOpacity={0.2}
            scale={1.02}
            transitionSpeed={1500}
          >
            <motion.div
              data-id={id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative backdrop-blur-xl border border-white/10 bg-white/5 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-teal-400/20"
            >
              <div className="absolute -inset-[2px] bg-gradient-to-tr from-teal-500 via-transparent to-indigo-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl pointer-events-none" />

              <div className="w-full aspect-[3/2] bg-black rounded-t-3xl overflow-hidden flex items-center justify-center">
                <img
                  src={`https://via.placeholder.com/600x400.png?text=${encodeURIComponent(
                    title
                  )}`}
                  alt={title}
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h4 className="text-xs uppercase tracking-widest text-white/70 mb-1">
                  {subtitle}
                </h4>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/80 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      <div className="text-center mt-24 max-w-xl mx-auto">
        <p className="text-white/80 mb-4">Want early access?</p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 w-full sm:w-auto"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-teal-500 text-black font-medium hover:bg-teal-400"
          >
            Notify Me
          </button>
        </form>
      </div>
    </section>
  )
}
