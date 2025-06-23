'use client'

import { motion } from 'framer-motion'
import ChartCard from '@/components/ChartCard'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Jan', attendance: 91 },
  { name: 'Feb', attendance: 88 },
  { name: 'Mar', attendance: 85 },
  { name: 'Apr', attendance: 93 },
]

export default function ReportsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="p-6 grid gap-6 md:grid-cols-2"
    >
      <ChartCard
        title="Monthly Attendance"
        chart={
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        }
      />
    </motion.div>
  )
}
