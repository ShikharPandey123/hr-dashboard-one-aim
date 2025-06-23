'use client'

import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'

export default function HRLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex-1 p-6 overflow-auto"
      >
        {children}
      </motion.main>
    </div>
  )
}
