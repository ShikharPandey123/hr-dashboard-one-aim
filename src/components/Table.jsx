export default function Table({ columns, data }) {
  return (
    <table className="min-w-full bg-white border rounded overflow-hidden">
      <thead className="bg-indigo-50">
        <tr>
          {columns.map((col) => (
            <th key={col} className="text-left px-4 py-2 text-sm font-medium text-indigo-600">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t hover:bg-indigo-50">
            {columns.map((col) => (
              <td key={col} className="px-4 py-2 text-sm text-gray-700">
                {row[col.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
