"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mobileSidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(e.target) &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <html lang="en">
      <head>
        <title>SHRM HR Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Manage your HR operations efficiently"
        />
      </head>
      <body className="bg-gradient-to-br from-red-50 via-white to-red-100 text-gray-900 antialiased">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          toggleRef={toggleBtnRef}
        />

        <div className="flex h-[calc(100vh-64px)] relative">
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="fixed inset-y-0 left-0 w-64 bg-white border-r border-red-100 shadow-lg z-50 p-6"
              >
                <Sidebar
                  isMobile
                  open={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
              </motion.div>
            </>
          )}

          <motion.main
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white shadow-inner"
          >
            {children}
          </motion.main>
        </div>
      </body>
    </html>
  );
}
