'use client'

import { motion } from 'framer-motion'

export default function RecruitmentPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-red-600 mb-4 tracking-tight drop-shadow-sm">
        Recruitment
      </h1>
      <p className="text-gray-700 leading-relaxed">
        Manage job postings, candidate applications, and onboarding processes from this section.
      </p>
    </motion.div>
  )
}
