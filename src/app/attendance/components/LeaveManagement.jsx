'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const dummyLeaves = [
  { id: 1, name: 'Alice', reason: 'Medical', dates: 'June 3 - June 6' },
  { id: 2, name: 'Bob', reason: 'Family Trip', dates: 'June 10 - June 12' },
]

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState(dummyLeaves)

  const handleSubmit = (id, action) => {
    alert(`Leave request ${action} for ID ${id}`)
    setLeaves((prev) => prev.filter((leave) => leave.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border rounded-xl p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800">📝 Leave Requests</h2>

      {leaves.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No pending requests</p>
      ) : (
        <ul className="space-y-4">
          {leaves.map((leave) => (
            <motion.li
              key={leave.id}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="border border-red-100 p-4 rounded-lg bg-red-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <p className="font-semibold text-gray-800">{leave.name}</p>
                <p className="text-sm text-gray-600">
                  {leave.reason} — <span className="text-red-600">{leave.dates}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSubmit(leave.id, 'Approved')}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleSubmit(leave.id, 'Rejected')}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Reject
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
