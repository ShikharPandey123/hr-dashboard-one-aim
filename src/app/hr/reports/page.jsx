"use client"
import ChartCard from "@/components/ChartCard"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", attendance: 91 },
  { name: "Feb", attendance: 88 },
  { name: "Mar", attendance: 85 },
  { name: "Apr", attendance: 93 },
]

export default function ReportsPage() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      <ChartCard
        title="Monthly Attendance"
        chart={
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        }
      />
    </div>
  )
}
