export default function Loading({ isLoading }) {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="spinner">Loading...</div>
    </div>
  );
}
