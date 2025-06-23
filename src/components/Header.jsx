export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white border-b shadow-sm flex items-center justify-between sticky top-0 z-40">
      <div className="text-xl font-bold text-indigo-600">SHRM HR Portal</div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome, HR Admin</span>
        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
          A
        </div>
      </div>
    </header>
  )
}
