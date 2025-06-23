'use client'

import { motion } from 'framer-motion'
import ModuleCard from '@/components/ModuleCard'

export default function HRDashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700"
    >
      <ModuleCard title="Attendance" href="/hr/attendance" />
      <ModuleCard title="Payroll" href="/hr/payroll" />
      <ModuleCard title="Recruitment" href="/hr/recruitment" />
      <ModuleCard title="Compliance" href="/hr/compliance" />
      <ModuleCard title="Notifications" href="/hr/notifications" />
      <ModuleCard title="HR Actions" href="/hr/actions" />
      <ModuleCard title="Employees" href="/hr/employees" />
      <ModuleCard title="Policies" href="/hr/policies" />
      <ModuleCard title="Reports" href="/hr/reports" />
    </motion.div>
  )
}
