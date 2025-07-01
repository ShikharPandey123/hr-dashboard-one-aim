"use client";

import { useEffect, useState } from "react";

export default function InterviewScheduling() {
  const [interviews, setInterviews] = useState([]);
  const [form, setForm] = useState({
    candidate: "",
    role: "",
    date: "",
    time: "",
    interviewer: "",
  });

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch("/api/recruitment/interviews");
        const data = await res.json();
        setInterviews(data);
      } catch {
        setInterviews([
          {
            id: 1,
            candidate: "Vansh Ahuja",
            role: "Frontend Developer",
            date: "2025-07-01",
            time: "10:00 AM",
            interviewer: "Rajiv Kumar",
            status: "Scheduled",
          },
          {
            id: 2,
            candidate: "Neha Reddy",
            role: "Backend Engineer",
            date: "2025-07-03",
            time: "2:00 PM",
            interviewer: "Anita Shah",
            status: "Completed",
          },
        ]);
      }
    };

    fetchInterviews();
  }, []);

  const handleAdd = () => {
    const { candidate, role, date, time, interviewer } = form;
    if (!candidate || !role || !date || !time || !interviewer) {
      alert("Fill all fields");
      return;
    }
    const newItem = {
      id: Date.now(),
      ...form,
      status: "Scheduled",
    };
    setInterviews((prev) => [...prev, newItem]);
    setForm({ candidate: "", role: "", date: "", time: "", interviewer: "" });

    // Trigger backend invite email
    fetch("/api/recruitment/interviews/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    }).catch(() => {
      console.warn("❌ Failed to send interview invite email");
    });
  };

  return (
    <div className="bg-white border border-red-100 rounded-xl p-4 sm:p-6 shadow-sm text-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        📅 Interview Scheduling
      </h2>

      <div className="grid sm:grid-cols-5 gap-3 mb-4">
        <input
          type="text"
          placeholder="Candidate"
          value={form.candidate}
          onChange={(e) => setForm({ ...form, candidate: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
        <input
          type="text"
          placeholder="Interviewer"
          value={form.interviewer}
          onChange={(e) => setForm({ ...form, interviewer: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
      </div>

      <button
        onClick={handleAdd}
        className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
      >
        ➕ Schedule Interview
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded">
          <thead className="bg-red-50 text-gray-800">
            <tr>
              <th className="text-left px-4 py-2 border-b">Candidate</th>
              <th className="text-left px-4 py-2 border-b">Role</th>
              <th className="text-left px-4 py-2 border-b">Date</th>
              <th className="text-left px-4 py-2 border-b">Time</th>
              <th className="text-left px-4 py-2 border-b">Interviewer</th>
              <th className="text-left px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((iv) => (
              <tr key={iv.id} className="hover:bg-red-50 text-gray-700">
                <td className="px-4 py-2 border-b">{iv.candidate}</td>
                <td className="px-4 py-2 border-b">{iv.role}</td>
                <td className="px-4 py-2 border-b">{iv.date}</td>
                <td className="px-4 py-2 border-b">{iv.time}</td>
                <td className="px-4 py-2 border-b">{iv.interviewer}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      iv.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : iv.status === "Cancelled"
                        ? "bg-gray-200 text-gray-500"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {iv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
