'use client'

import { motion } from 'framer-motion'
import Table from "@/components/Table"

export default function EmployeesPage() {
  const columns = ["Name", "Role", "Status"]

  const data = [
    { name: "Alice", role: "Manager", status: "Active" },
    { name: "Bob", role: "Employee", status: "On Leave" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-red-600 mb-4 tracking-tight drop-shadow-sm">
        Employees
      </h1>
      <Table columns={columns} data={data} />
    </motion.div>
  )
}
