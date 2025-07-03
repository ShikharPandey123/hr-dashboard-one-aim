'use client';

import { useEffect, useState } from 'react';

export default function PerformancePage() {
  const [violators, setViolators] = useState([]);
  const [mailLog, setMailLog] = useState({});

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const res = await fetch('/api/policymanagement/performance');
        const data = await res.json();
        const underperformers = data.filter((e) => e.rating < 3.0);
        setViolators(underperformers);
      } catch {
        const fallback = [
          { id: 1, name: 'Ankit Verma', email: 'ankit@company.com', rating: 2.4 },
          { id: 2, name: 'Tina Das', email: 'tina@company.com', rating: 3.8 },
          { id: 3, name: 'Farhan Ali', email: 'farhan@company.com', rating: 2.7 },
        ];
        setViolators(fallback.filter((e) => e.rating < 3.0));
      }
    };

    fetchPerformanceData();
  }, []);

  const sendMail = async (emp) => {
    const key = `performance-${emp.id}`;
    if (mailLog[key]) return;

    await fetch('/api/policymanagement/send-performance-warning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: emp.email,
        name: emp.name,
        rating: emp.rating,
      }),
    });

    const now = new Date().toLocaleString();
    setMailLog((prev) => ({ ...prev, [key]: now }));
    alert(`📤 Performance warning sent to ${emp.name}`);
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow text-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-800">📉 Performance Violations</h2>
      {violators.length === 0 ? (
        <p className="text-gray-500">✅ No performance issues found</p>
      ) : (
        <>
          <div className="block sm:hidden space-y-4">
            {violators.map((e) => {
              const key = `performance-${e.id}`;
              return (
                <div key={e.id} className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm shadow-sm">
                  <p><span className="font-semibold">Name:</span> {e.name}</p>
                  <p><span className="font-semibold">Email:</span> {e.email}</p>
                  <p><span className="font-semibold">Rating:</span> <span className="text-red-600">{e.rating.toFixed(1)} / 5.0</span></p>
                  <div className="mt-2">
                    <button
                      onClick={() => sendMail(e)}
                      disabled={!!mailLog[key]}
                      className={`w-full text-xs px-3 py-2 rounded ${
                        mailLog[key]
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {mailLog[key] ? 'Warning Sent' : 'Send Warning'}
                    </button>
                    {mailLog[key] && (
                      <p className="text-[11px] text-gray-500 mt-1">Sent: {mailLog[key]}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm border rounded min-w-[500px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 border-b">Name</th>
                  <th className="text-left px-4 py-2 border-b">Email</th>
                  <th className="text-left px-4 py-2 border-b">Rating</th>
                  <th className="text-left px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {violators.map((e) => {
                  const key = `performance-${e.id}`;
                  return (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{e.name}</td>
                      <td className="px-4 py-2 border-b">{e.email}</td>
                      <td className="px-4 py-2 border-b text-red-600">{e.rating.toFixed(1)} / 5.0</td>
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
          </div>
        </>
      )}
    </div>
  );
}
