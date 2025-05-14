'use client'

import { motion } from 'framer-motion'
import { Paintbrush, GaugeCircle, BarChart, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: Paintbrush,
    title: 'Tailored for Small Businesses',
    description: 'We design high-converting websites for local brands that want to scale.',
  },
  {
    icon: GaugeCircle,
    title: 'Effortless Control',
    description: 'You can change content, layout, and design—no code required.',
  },
  {
    icon: BarChart,
    title: 'Performance Obsessed',
    description: 'SEO, speed, mobile—built-in by default, not bolted on later.',
  },
  {
    icon: CheckCircle,
    title: 'All-in-One Solution',
    description: 'Hosting, SEO, CMS, analytics—one partner, one solution.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Subtle radial light background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,#8fc7b033_0%,#000000_80%)]" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-[#9cc0ab]">
            Why Partner with Sarnex Digital?
          </h2>
          <div className="w-12 h-[2px] bg-[#516258] mt-4" />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-[#51625833] rounded-xl p-6 text-center hover:border-[#516258] transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-[#516258]" />
              </div>
              <h3 className="text-lg font-semibold font-mono text-[#d4c7b0] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[#c0c0c0] opacity-80 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
