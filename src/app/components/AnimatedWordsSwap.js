'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnimatedWordsSwap() {
  const words = ['Perform', 'Convert', 'Scale', 'Grow', 'Lead']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [index])

  return (
    <div className="w-[160px] mx-auto text-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-[#9cc0ab] inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
