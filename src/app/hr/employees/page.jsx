import Table from "@/components/Table"

export default function EmployeesPage() {
  const columns = ["Name", "Role", "Status"]

  const data = [
    { name: "Alice", role: "Manager", status: "Active" },
    { name: "Bob", role: "Employee", status: "On Leave" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-indigo-600 mb-4">Employees</h1>
      <Table columns={columns} data={data} />
    </div>
  )
}
