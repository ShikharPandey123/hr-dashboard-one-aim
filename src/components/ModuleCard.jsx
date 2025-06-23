import Link from "next/link";
export default function ModuleCard({ title, href }) {
  return (
    <Link href={href} className="block p-6 bg-white shadow rounded">
      <h3 className="text-lg font-semibold">{title}</h3>
    </Link>
  );
}
