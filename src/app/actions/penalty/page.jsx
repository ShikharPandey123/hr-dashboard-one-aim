'use client'

import { useEffect, useState } from 'react'

export default function PenaltyPage() {
  const [employees, setEmployees] = useState([])
  const [selected, setSelected] = useState(null)
  const [reason, setReason] = useState('')
  const [issued, setIssued] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/employees')
        const data = await res.json()
        setEmployees(data)
      } catch {
        setEmployees([
          { id: 1, name: 'Vansh Ahuja', email: 'vansh@company.com' },
          { id: 2, name: 'Neha Reddy', email: 'neha@company.com' }
        ])
      }
    }

    fetchData()
  }, [])

  const handleSendPenalty = async (id) => {
    if (!reason.trim()) return alert('Please enter a reason')
    await fetch('/api/penalty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: id, reason })
    })
    setIssued((prev) => ({ ...prev, [id]: reason }))
    setSelected(null)
    setReason('')
    alert('📩 Penalty email sent.')
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">🚫 Penalty Notices</h1>

      <div className="overflow-x-auto bg-white border border-red-100 rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-red-50 text-gray-800">
            <tr>
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Email</th>
              <th className="text-left px-4 py-2 border-b">Penalty Reason</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="text-gray-700 hover:bg-red-50">
                <td className="px-4 py-2 border-b">{emp.name}</td>
                <td className="px-4 py-2 border-b">{emp.email}</td>
                <td className="px-4 py-2 border-b">
                  {issued[emp.id] || (
                    selected === emp.id && (
                      <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason"
                        className="border px-2 py-1 rounded w-full text-sm"
                      />
                    )
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  {issued[emp.id] ? (
                    <span className="text-green-600 text-xs">Penalty Sent</span>
                  ) : selected === emp.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSendPenalty(emp.id)}
                        className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Send
                      </button>
                      <button
                        onClick={() => {
                          setSelected(null)
                          setReason('')
                        }}
                        className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelected(emp.id)}
                      className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Issue Penalty
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
