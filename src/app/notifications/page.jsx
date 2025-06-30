'use client'

import { useState } from 'react'
import GeneralNotificationPage from './general/page'
import IncrementNotificationPage from './increment/page'
import PenaltyNotificationPage from './penalty/page'
import SalaryNotificationPage from './salary/page'

const tabs = [
  'General Notification',
  'Increment Notification',
  'Penalty Notification',
  'Salary Notification'
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">📨 Notifications</h1>

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
            {tab === 'General Notification' && '📢 General Notification'}
            {tab === 'Increment Notification' && '📈 Increment Notification'}
            {tab === 'Penalty Notification' && '🚫 Penalty Notification'}
            {tab === 'Salary Notification' && '💰 Salary Notification'}
          </button>
        ))}
      </div>

      <div className="transition-all">
        {activeTab === 0 && <GeneralNotificationPage />}
        {activeTab === 1 && <IncrementNotificationPage />}
        {activeTab === 2 && <PenaltyNotificationPage />}
        {activeTab === 3 && <SalaryNotificationPage />}
      </div>
    </div>
  )
}
