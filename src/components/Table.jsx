'use client'

import { motion } from 'framer-motion'

export default function Table({ columns, data }) {
  return (
    <table className="min-w-full bg-white border rounded overflow-hidden">
      <thead className="bg-red-50">
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="text-left px-4 py-2 text-sm font-medium text-red-600"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <motion.tr
            key={i}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="border-t hover:bg-red-50"
          >
            {columns.map((col) => (
              <td
                key={col}
                className="px-4 py-2 text-sm text-gray-700"
              >
                {row[col.toLowerCase()]}
              </td>
            ))}
          </motion.tr>
        ))}
      </tbody>
    </table>
  )
}
