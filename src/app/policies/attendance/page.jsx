'use client';

import { useEffect, useState } from 'react';

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [mailLog, setMailLog] = useState({});

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch('/api/policymanagement/attendance');
        const data = await res.json();
        setEmployees(data);
      } catch {
        setEmployees([
          { id: 1, name: 'Ayesha Khan', email: 'ayesha@company.com', attendance: 72 },
          { id: 2, name: 'Rohan Mehta', email: 'rohan@company.com', attendance: 85 },
          { id: 3, name: 'Isha Roy', email: 'isha@company.com', attendance: 68 },
        ]);
      }
    };

    fetchAttendance();
  }, []);

  const sendMail = async (emp) => {
    const key = `attendance-${emp.id}`;
    if (mailLog[key]) return;

    await fetch('/api/policymanagement/send-attendance-warning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: emp.email,
        name: emp.name,
        attendance: emp.attendance,
      }),
    });

    const now = new Date().toLocaleString();
    setMailLog((prev) => ({ ...prev, [key]: now }));
    alert(`📤 Warning sent to ${emp.name}`);
  };

  const defaulters = employees.filter((e) => e.attendance < 75);

  return (
    <div className="bg-white border rounded-xl p-6 shadow text-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-800">📉 Attendance Defaulters</h2>
      {defaulters.length === 0 ? (
        <p className="text-gray-500">✅ No defaulters found</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border-b">Name</th>
              <th className="text-left px-4 py-2 border-b">Email</th>
              <th className="text-left px-4 py-2 border-b">Attendance %</th>
              <th className="text-left px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {defaulters.map((e) => {
              const key = `attendance-${e.id}`;
              return (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{e.name}</td>
                  <td className="px-4 py-2 border-b">{e.email}</td>
                  <td className="px-4 py-2 border-b text-red-600">{e.attendance}%</td>
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
