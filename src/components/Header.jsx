'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full px-6 py-4 bg-white border-b border-gray-200 shadow-md flex items-center justify-between sticky top-0 z-40"
    >
      <div className="text-xl font-bold text-red-600 tracking-wide">OneAim HR Portal</div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome, HR Admin</span>
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
          A
        </div>
      </div>
    </motion.header>
  )
}
