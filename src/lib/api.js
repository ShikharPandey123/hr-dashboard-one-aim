export async function fetchEmployees() {
  const res = await fetch("/api/employees");
  return res.json();
}
