'use client'

import { motion } from 'framer-motion'

export default function AttendancePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-red-600 mb-4 tracking-tight drop-shadow-sm">
        Attendance Management
      </h1>
      <p className="text-gray-700 leading-relaxed">
        🔍 This section allows you to view, track, and manage daily and monthly attendance records
        for all employees.
      </p>
    </motion.div>
  )
}
