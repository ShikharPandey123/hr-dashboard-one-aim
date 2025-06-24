"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Wallet,
  Briefcase,
  FileBadge,
  Bell,
  ShieldCheck,
  Users,
  FileText,
  BarChart3,
  Building,
  Home,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home size={18} />,
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: <CalendarCheck size={18} />,
  },
  { title: "Payroll", href: "/payroll", icon: <Wallet size={18} /> },
  {
    title: "Recruitment",
    href: "/recruitment",
    icon: <Briefcase size={18} />,
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: <FileBadge size={18} />,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: <Bell size={18} />,
  },
  { title: "HR Actions", href: "/actions", icon: <ShieldCheck size={18} /> },
  { title: "Employees", href: "/employees", icon: <Users size={18} /> },
  { title: "Policies", href: "/policies", icon: <FileText size={18} /> },
  { title: "Reports", href: "/reports", icon: <BarChart3 size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-red-100 shadow-sm p-8 sticky top-0">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
          <Building className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            One Aim IT Solutions
          </h1>
          <p className="text-sm text-gray-500">HR Dashboard</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <motion.li
              key={item.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "bg-red-100 text-red-700"
                    : "text-gray-700 hover:bg-red-50"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
