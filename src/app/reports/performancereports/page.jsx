'use client';

import { useEffect, useState } from 'react';

export default function PerformanceReports() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const res = await fetch('/api/reports/performance');
        const json = await res.json();
        setReviews(json);
      } catch {
        setReviews([
          { id: 1, name: 'Ayesha Khan', rating: 4.6, feedback: 'Excellent team player' },
          { id: 2, name: 'Rohan Mehta', rating: 2.9, feedback: 'Needs to improve deadlines' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  if (loading) return <p className="text-gray-500">Loading performance data...</p>;

  return (
    <div className="bg-white border rounded-xl p-6 shadow ">
      <h2 className="text-xl font-bold mb-4">📈 Performance Reports</h2>

      <table className="min-w-full text-sm border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">Employee</th>
            <th className="text-left px-4 py-2 border-b">Rating</th>
            <th className="text-left px-4 py-2 border-b">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{r.name}</td>
              <td
                className={`px-4 py-2 border-b font-medium ${
                  r.rating < 3 ? 'text-red-600' : r.rating < 4 ? 'text-yellow-600' : 'text-green-700'
                }`}
              >
                {r.rating}
              </td>
              <td className="px-4 py-2 border-b">{r.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
