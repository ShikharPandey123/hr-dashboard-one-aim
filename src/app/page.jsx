'use client'

import { motion } from 'framer-motion'
import ModuleCard from '@/components/ModuleCard'

export default function HRDashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800"
    >
      <ModuleCard title="Attendance" href="/attendance" />
      <ModuleCard title="Payroll" href="/payroll" />
      <ModuleCard title="Recruitment" href="/recruitment" />
      <ModuleCard title="Compliance and Documentation" href="/documents" />
      <ModuleCard title="Notifications" href="/notifications" />
      <ModuleCard title="HR Actions" href="/actions" />
      <ModuleCard title="Employees" href="/employees" />
      <ModuleCard title="Policies" href="/policies" />
      <ModuleCard title="Reports" href="/reports" />
    </motion.div>
  )
}
