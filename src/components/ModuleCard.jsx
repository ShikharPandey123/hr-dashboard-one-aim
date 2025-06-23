'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ModuleCard({ title, href }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <Link
        href={href}
        className="block p-6 bg-white border border-red-200 hover:border-red-500 shadow-sm hover:shadow-lg rounded-xl transition-all duration-200"
      >
        <h3 className="text-lg font-semibold text-red-600">{title}</h3>
      </Link>
    </motion.div>
  )
}
