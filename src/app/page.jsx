'use client'

import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md text-center bg-white shadow-lg rounded-xl p-10 border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Welcome to the SHRM Portal
        </h1>
        <p className="text-gray-600 mb-6">
          Manage all your HR operations from one powerful dashboard.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/hr"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium shadow hover:bg-red-500 transition"
          >
            Go to HR Dashboard →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
