export default function ChartCard({ title, chart }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-medium mb-2">{title}</h4>
      {chart}
    </div>
  );
}
