"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"

const navItems = [
  { title: "Attendance", href: "/hr/attendance", icon: <CalendarCheck size={18} /> },
  { title: "Payroll", href: "/hr/payroll", icon: <Wallet size={18} /> },
  { title: "Recruitment", href: "/hr/recruitment", icon: <Briefcase size={18} /> },
  { title: "Compliance", href: "/hr/compliance", icon: <FileBadge size={18} /> },
  { title: "Notifications", href: "/hr/notifications", icon: <Bell size={18} /> },
  { title: "HR Actions", href: "/hr/actions", icon: <ShieldCheck size={18} /> },
  { title: "Employees", href: "/hr/employees", icon: <Users size={18} /> },
  { title: "Policies", href: "/hr/policies", icon: <FileText size={18} /> },
  { title: "Reports", href: "/hr/reports", icon: <BarChart3 size={18} /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm p-6 sticky top-0">
      <Link href="/hr"><h2 className="text-xl font-bold mb-6 text-indigo-600">HR Dashboard</h2></Link>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
