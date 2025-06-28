'use client'

import { useState, useEffect } from 'react'

export default function DeductionProcessing() {
  const [deductions, setDeductions] = useState([])
  const [deductedIds, setDeductedIds] = useState([])

  useEffect(() => {
    const fetchDeductions = async () => {
      try {
        const res = await fetch('/api/tax-deductions')
        const data = await res.json()
        setDeductions(data)
      } catch {
        setDeductions([
          {
            id: 1,
            name: 'Alice Sharma',
            organization: 'IT',
            department: 'IT Development',
            role: 'Frontend Developer',
            type: 'TDS',
            reason: 'Yearly Income Tax TDS',
            amount: 1200
          },
          {
            id: 2,
            name: 'Bob Verma',
            organization: 'IT',
            department: 'Human Resources',
            role: 'HR Manager',
            type: 'PF',
            reason: 'Provident Fund Contribution',
            amount: 900
          },
          {
            id: 3,
            name: 'Neha Reddy',
            organization: 'UPSC',
            department: null,
            role: 'Administrative Officer',
            type: 'Professional Tax',
            reason: 'Monthly Professional Tax',
            amount: 200
          }
        ])
      }
    }
    fetchDeductions()
  }, [])

  const handleDeduct = async (emp) => {
    try {
      await fetch('/api/tax-deductions/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: emp.name,
          reason: emp.reason,
          amount: emp.amount
        })
      })
      alert(`Mail sent to manager for ${emp.name}`)
      setDeductedIds((prev) => [...prev, emp.id])
    } catch {
      alert('Failed to send email')
    }
  }

  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800">💸 Deduction Processing</h2>

      {/* 💻 Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-yellow-50 text-gray-800">
            <tr>
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Organization</th>
              <th className="text-left px-4 py-2 border-b">Department</th>
              <th className="text-left px-4 py-2 border-b">Role</th>
              <th className="text-left px-4 py-2 border-b">Reason</th>
              <th className="text-left px-4 py-2 border-b">Amount</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {deductions.map(emp => (
              <tr key={emp.id} className="hover:bg-yellow-50 transition text-gray-800">
                <td className="px-4 py-2 border-b">{emp.name}</td>
                <td className="px-4 py-2 border-b">{emp.organization}</td>
                <td className="px-4 py-2 border-b">{emp.department || '–'}</td>
                <td className="px-4 py-2 border-b">{emp.role}</td>
                <td className="px-4 py-2 border-b">{emp.reason}</td>
                <td className="px-4 py-2 border-b text-red-600 font-medium">₹ {emp.amount}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDeduct(emp)}
                    disabled={deductedIds.includes(emp.id)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      deductedIds.includes(emp.id)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-500 text-white hover:bg-yellow-600'
                    }`}
                  >
                    {deductedIds.includes(emp.id) ? 'Deducted' : 'Deduct'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {deductions.map(emp => (
          <div key={emp.id} className="border rounded-lg p-3 shadow-sm bg-yellow-50 text-gray-800 space-y-1">
            <div><strong>Name:</strong> {emp.name}</div>
            <div><strong>Organization:</strong> {emp.organization}</div>
            <div><strong>Department:</strong> {emp.department || '–'}</div>
            <div><strong>Role:</strong> {emp.role}</div>
            <div><strong>Reason:</strong> {emp.reason}</div>
            <div className="text-red-600 font-semibold"><strong>Amount:</strong> ₹ {emp.amount}</div>
            <button
              onClick={() => handleDeduct(emp)}
              disabled={deductedIds.includes(emp.id)}
              className={`mt-2 px-3 py-1 w-full text-xs font-medium rounded ${
                deductedIds.includes(emp.id)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}
            >
              {deductedIds.includes(emp.id) ? 'Deducted' : 'Deduct'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
