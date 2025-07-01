'use client'

import { useState } from 'react'
import LeavePolicy from './leave/page'
import AttendancePolicy from './attendance/page'
import PerformancePolicy from './performance/page'
import DisciplinePolicy from './discipline/page'

const tabs = [
  'Leave',
  'Attendance',
  'Performance',
  'Discipline'
]

export default function PolicyManagementPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
        📋 Policy Management
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              activeTab === index
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-red-100 text-red-700 hover:bg-red-50'
            }`}
          >
            {tab === 'Leave' && '📄 Leave'}
            {tab === 'Attendance' && '🕒 Attendance'}
            {tab === 'Performance' && '📈 Performance'}
            {tab === 'Discipline' && '⚠️ Discipline'}
          </button>
        ))}
      </div>

      <div className="transition-all">
        {activeTab === 0 && <LeavePolicy />}
        {activeTab === 1 && <AttendancePolicy />}
        {activeTab === 2 && <PerformancePolicy />}
        {activeTab === 3 && <DisciplinePolicy />}
      </div>
    </div>
  )
}
