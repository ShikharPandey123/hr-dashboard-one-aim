import ModuleCard from "@/components/ModuleCard"

export default function HRDashboardPage() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
      <ModuleCard title="Attendance" href="/hr/attendance" />
      <ModuleCard title="Payroll" href="/hr/payroll" />
      <ModuleCard title="Recruitment" href="/hr/recruitment" />
      <ModuleCard title="Compliance" href="/hr/compliance" />
      <ModuleCard title="Notifications" href="/hr/notifications" />
      <ModuleCard title="HR Actions" href="/hr/actions" />
      <ModuleCard title="Employees" href="/hr/employees" />
      <ModuleCard title="Policies" href="/hr/policies" />
      <ModuleCard title="Reports" href="/hr/reports" />
    </div>
  )
}
