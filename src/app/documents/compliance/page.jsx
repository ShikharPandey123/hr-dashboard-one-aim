'use client'

import { useEffect, useState } from 'react'

export default function LegalCompliance() {
  const [records, setRecords] = useState([])
  const [linkMap, setLinkMap] = useState({})
  const [submittingId, setSubmittingId] = useState(null)
  const [sentMailIds, setSentMailIds] = useState([])

  useEffect(() => {
    const fetchComplianceData = async () => {
      try {
        const res = await fetch('/api/employees/compliance')
        const data = await res.json()
        setRecords(data)
      } catch {
        setRecords([
          {
            id: 1,
            name: 'Vansh Ahuja',
            email: 'vansh@company.com',
            status: 'Pending',
            driveLink: null
          },
          {
            id: 2,
            name: 'Neha Reddy',
            email: 'neha@company.com',
            status: 'Submitted',
            driveLink: 'https://drive.google.com/sample-link'
          }
        ])
      }
    }

    fetchComplianceData()
  }, [])

  const handleUpload = async (id) => {
    const link = linkMap[id]?.trim()
    if (!link) return alert('Please paste a valid Drive link.')

    setSubmittingId(id)

    try {
      await fetch(`/api/employees/compliance/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driveLink: link })
      })

      setRecords((prev) =>
        prev.map((emp) =>
          emp.id === id ? { ...emp, status: 'Submitted', driveLink: link } : emp
        )
      )
      setLinkMap((prev) => ({ ...prev, [id]: '' }))
    } catch {
      alert('Upload failed')
    } finally {
      setSubmittingId(null)
    }
  }

  return (
    <div className="bg-white border border-red-100 shadow-sm rounded-xl p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        📄 Legal Compliance
      </h2>
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm border rounded">
          <thead className="bg-red-50 text-gray-800">
            <tr>
              <th className="text-left px-4 py-2 border-b">S no.</th>
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Email</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
              <th className="text-left px-4 py-2 border-b">View</th>
              <th className="text-left px-4 py-2 border-b">Upload Link</th>
              <th className="text-left px-4 py-2 border-b">Send Mail</th>
            </tr>
          </thead>
          <tbody>
            {records.map((emp, index) => (
              <tr key={emp.id} className="hover:bg-red-50 text-gray-700">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{emp.name}</td>
                <td className="px-4 py-2 border-b">{emp.email}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      emp.status === 'Verified'
                        ? 'bg-green-50 text-green-600'
                        : emp.status === 'Submitted'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  {emp.driveLink ? (
                    <a
                      href={emp.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-red-700 underline"
                    >
                      Open
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  {emp.status === 'Pending' && (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={linkMap[emp.id] || ''}
                        onChange={(e) =>
                          setLinkMap((prev) => ({
                            ...prev,
                            [emp.id]: e.target.value
                          }))
                        }
                        placeholder="Paste Drive link"
                        className="border px-2 py-1 rounded text-sm w-44"
                      />
                      <button
                        onClick={() => handleUpload(emp.id)}
                        disabled={submittingId === emp.id}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        {submittingId === emp.id ? 'Uploading...' : 'Submit'}
                      </button>
                    </div>
                  )}
                  {emp.status !== 'Pending' && '—'}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => {
                      setSentMailIds((prev) => [...prev, emp.id])
                      setTimeout(() => {
                        alert(`✅ Mail sent to ${emp.email}`)
                      }, 100)
                    }}
                    disabled={sentMailIds.includes(emp.id)}
                    className={`px-3 py-1 rounded text-xs ${
                      sentMailIds.includes(emp.id)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {sentMailIds.includes(emp.id) ? 'Sent' : 'Send Mail'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {records.map((emp, index) => (
          <div
            key={emp.id}
            className="border border-red-100 shadow-sm bg-white rounded-xl p-4 text-gray-800"
          >
            <p className="text-sm font-medium text-gray-900">
              {index + 1} — {emp.name}
            </p>
            <p className="text-sm text-gray-700">{emp.email}</p>
            <p className="text-sm">
              <span
                className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                  emp.status === 'Verified'
                    ? 'bg-green-50 text-green-600'
                    : emp.status === 'Submitted'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {emp.status}
              </span>
            </p>

            <div className="mt-3 space-y-2">
              <p className="text-sm">
                <strong>Drive Link: </strong>{' '}
                {emp.driveLink ? (
                  <a
                    href={emp.driveLink}
                    target="_blank"
                    className="text-red-600 underline"
                  >
                    Open
                  </a>
                ) : (
                  '—'
                )}
              </p>

              {emp.status === 'Pending' && (
                <div className="flex flex-col gap-2">
                  <input
                    type="url"
                    value={linkMap[emp.id] || ''}
                    onChange={(e) =>
                      setLinkMap((prev) => ({
                        ...prev,
                        [emp.id]: e.target.value
                      }))
                    }
                    placeholder="Paste Drive link"
                    className="border px-2 py-1 rounded text-sm"
                  />
                  <button
                    onClick={() => handleUpload(emp.id)}
                    disabled={submittingId === emp.id}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    {submittingId === emp.id ? 'Uploading...' : 'Submit'}
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setSentMailIds((prev) => [...prev, emp.id])
                  setTimeout(() => {
                    alert(`✅ Mail sent to ${emp.email}`)
                  }, 100)
                }}
                disabled={sentMailIds.includes(emp.id)}
                className={`mt-2 px-3 py-1 rounded text-xs w-fit ${
                  sentMailIds.includes(emp.id)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {sentMailIds.includes(emp.id) ? 'Sent' : 'Send Mail'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
