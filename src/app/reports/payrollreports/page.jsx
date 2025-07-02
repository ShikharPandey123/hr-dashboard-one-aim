'use client';

import { useEffect, useState } from 'react';

export default function PayrollReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await fetch('/api/reports/payroll');
        const json = await res.json();
        setData(json);
      } catch {
        setData([
          { id: 1, name: 'Ayesha Khan', base: 80000, bonus: 5000, deduction: 2000 },
          { id: 2, name: 'Rohan Mehta', base: 75000, bonus: 3000, deduction: 1000 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  if (loading) return <p className="text-gray-500">Loading payroll data...</p>;

  return (
    <div className="bg-white border rounded-xl p-6 shadow text-gray-800">
      <h2 className="text-xl font-bold mb-4">💰 Payroll Reports</h2>

      <table className="min-w-full text-sm border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">Employee</th>
            <th className="text-left px-4 py-2 border-b">Base Salary (₹)</th>
            <th className="text-left px-4 py-2 border-b">Bonus (₹)</th>
            <th className="text-left px-4 py-2 border-b">Deductions (₹)</th>
            <th className="text-left px-4 py-2 border-b">Net Pay (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            const net = e.base + e.bonus - e.deduction;
            return (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{e.name}</td>
                <td className="px-4 py-2 border-b">₹{e.base.toLocaleString()}</td>
                <td className="px-4 py-2 border-b text-green-700">+₹{e.bonus.toLocaleString()}</td>
                <td className="px-4 py-2 border-b text-red-600">-₹{e.deduction.toLocaleString()}</td>
                <td className="px-4 py-2 border-b font-medium">₹{net.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
