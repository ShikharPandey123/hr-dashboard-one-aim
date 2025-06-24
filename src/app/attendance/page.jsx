'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AttendanceRefresh from './components/DailyAttendance'
import MonthlyCalendar from './components/MonthlyCalendar'
import LeaveManagement from './components/LeaveManagement'
import DailyAttendance from './components/DailyAttendance'

export default function AttendancePage() {
  const [tab, setTab] = useState('refresh')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-red-600 mb-6 tracking-tight drop-shadow-sm">
        Attendance Management
      </h1>

      <div className="flex gap-4 mb-6">
        {['refresh', 'monthly', 'leave'].map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-full font-medium cursor-pointer text-sm ${
              tab === key
                ? 'bg-red-500 text-white'
                : 'bg-red-100 text-red-500 hover:bg-red-200'
            } transition`}
          >
            {key === 'refresh' && '🔁 Daily Attendance '}
            {key === 'monthly' && '📅 Monthly Attendance'}
            {key === 'leave' && '📤 Leave Management'}
          </button>
        ))}
      </div>

      {tab === 'refresh' && <DailyAttendance />}
      {tab === 'monthly' && <MonthlyCalendar />}
      {tab === 'leave' && <LeaveManagement />}
    </motion.div>
  )
}
