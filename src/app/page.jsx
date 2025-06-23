import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="max-w-md text-center bg-white shadow-lg rounded-xl p-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Welcome to the SHRM Portal</h1>
        <p className="text-gray-600 mb-6">
          Manage all your HR operations from one powerful dashboard.
        </p>
        <Link
          href="/hr"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium shadow hover:bg-indigo-500 transition"
        >
          Go to HR Dashboard →
        </Link>
      </div>
    </div>
  )
}
