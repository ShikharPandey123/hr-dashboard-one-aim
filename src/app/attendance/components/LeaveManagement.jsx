'use client'
import { useState } from 'react'

const dummyLeaves = [
  { id: 1, name: 'Alice', reason: 'Medical', dates: 'June 3 - June 6' },
  { id: 2, name: 'Bob', reason: 'Family Trip', dates: 'June 10 - June 12' },
]

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState(dummyLeaves)

  const handleSubmit = (id, action) => {
    const msg = `Leave request ${action} for ID ${id}`
    alert(msg)
    setLeaves(leaves.filter((leave) => leave.id !== id))
  }

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">📝 Leave Requests</h2>
      {leaves.length === 0 ? (
        <p className="text-sm text-gray-600 italic">No pending requests</p>
      ) : (
        <ul className="space-y-4">
          {leaves.map((leave) => (
            <li
              key={leave.id}
              className="border p-4 rounded-lg bg-red-50 flex justify-between items-center"
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
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
