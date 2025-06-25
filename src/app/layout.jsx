'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import '../styles/globals.css'

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <head>
        <title>SHRM HR Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Manage your HR operations efficiently" />
      </head>
      <body className="bg-gradient-to-br from-red-50 via-white to-red-100 text-gray-900 antialiased">
        <Header onToggleSidebar={() => setSidebarOpen(true)} />
        <div className="md:hidden">
          <Sidebar isMobile open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        <div className="flex min-h-[calc(100vh-64px)]">
          <aside className="hidden md:block">
            <Sidebar />
          </aside>
          <motion.main
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex-1 p-4 sm:p-6 bg-white shadow-inner overflow-y-auto"
          >
            {children}
          </motion.main>
        </div>

      </body>
    </html>
  )
}
