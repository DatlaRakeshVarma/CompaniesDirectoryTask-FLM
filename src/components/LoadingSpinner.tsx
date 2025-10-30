export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-blue-100"></div>
        <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
      </div>
      <p className="mt-6 text-sm font-semibold text-gray-600 animate-pulse">Loading companies...</p>
    </div>
  );
}
