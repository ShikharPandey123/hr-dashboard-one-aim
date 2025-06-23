import Sidebar from "@/components/Sidebar";

// HR layout: renders Sidebar + content area
export default function HRLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
