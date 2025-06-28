'use client'

import { useState,useEffect } from 'react'


export default function BonusIncentives() {

  const [bonuses, setBonuses] = useState([])
  const [approvedIds, setApprovedIds] = useState([])

   useEffect(() => {
   const fetchBonuses = async () => {
     try {
       const res = await fetch('/api/bonuses')
       const data = await res.json()
       setBonuses(data)
     } catch (err) {
       setBonuses([
         { id: 1, name: 'Alice Sharma', reason: 'Exceeded Targets', bonus: 5000 },
         { id: 2, name: 'Bob Verma', reason: 'Excellent Teamwork', bonus: 3000 },
         { id: 3, name: 'Neha Reddy', reason: 'Process Innovation', bonus: 4500 }
       ])
     }
   }
   fetchBonuses()
 }, [])

  const handleApprove = (id) => {
    alert(`Bonus approved for ID ${id}`)
    setApprovedIds([...approvedIds, id])
  }

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">🎁 Bonus & Incentives</h2>

      <table className="min-w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-green-50 text-gray-800">
          <tr>
            <th className="text-left px-4 py-2 border-b">Name</th>
            <th className="text-left px-4 py-2 border-b">Reason</th>
            <th className="text-left px-4 py-2 border-b">Amount</th>
            <th className="text-left px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {bonuses.map(emp => (
            <tr key={emp.id} className="hover:bg-green-50 transition text-gray-800">
              <td className="px-4 py-2 border-b">{emp.name}</td>
              <td className="px-4 py-2 border-b">{emp.reason}</td>
              <td className="px-4 py-2 border-b text-green-600 font-medium">₹ {emp.bonus}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleApprove(emp.id)}
                  disabled={approvedIds.includes(emp.id)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    approvedIds.includes(emp.id)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {approvedIds.includes(emp.id) ? 'Approved' : 'Approve'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
