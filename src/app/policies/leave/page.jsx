'use client';

import { useEffect, useState } from 'react';

export default function LeavePolicyPage() {
  const [violators, setViolators] = useState([]);
  const [mailLog, setMailLog] = useState({});

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const res = await fetch('/api/policymanagement/leave');
        const data = await res.json();
        const defaulters = data.filter((e) => e.usedLeaves > e.leaveQuota);
        setViolators(defaulters);
      } catch {
        const fallback = [
          { id: 1, name: 'Arjun Rao', email: 'arjun@company.com', usedLeaves: 24, leaveQuota: 20 },
          { id: 2, name: 'Simran Joshi', email: 'simran@company.com', usedLeaves: 18, leaveQuota: 20 },
          { id: 3, name: 'Kabir Singh', email: 'kabir@company.com', usedLeaves: 26, leaveQuota: 20 },
        ];
        setViolators(fallback.filter((e) => e.usedLeaves > e.leaveQuota));
      }
    };

    fetchLeaveData();
  }, []);

  const sendMail = async (emp) => {
    const key = `leave-${emp.id}`;
    if (mailLog[key]) return;

    await fetch('/api/policymanagement/send-leave-warning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: emp.email,
        name: emp.name,
        usedLeaves: emp.usedLeaves,
        leaveQuota: emp.leaveQuota,
      }),
    });

    const now = new Date().toLocaleString();
    setMailLog((prev) => ({ ...prev, [key]: now }));
    alert(`📤 Warning sent to ${emp.name}`);
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">🏖️ Leave Quota Violations</h2>
      {violators.length === 0 ? (
        <p className="text-gray-500">✅ No leave violations found</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Email</th>
              <th className="text-left px-4 py-2 border-b">Used / Quota</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {violators.map((e) => {
              const key = `leave-${e.id}`;
              return (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{e.name}</td>
                  <td className="px-4 py-2 border-b">{e.email}</td>
                  <td className="px-4 py-2 border-b text-red-600">
                    {e.usedLeaves} / {e.leaveQuota}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex flex-col">
                      <button
                        onClick={() => sendMail(e)}
                        disabled={!!mailLog[key]}
                        className={`px-3 py-1 text-xs rounded ${
                          mailLog[key]
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        {mailLog[key] ? 'Warning Sent' : 'Send Warning'}
                      </button>
                      {mailLog[key] && (
                        <span className="text-[11px] text-gray-500">Sent: {mailLog[key]}</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
