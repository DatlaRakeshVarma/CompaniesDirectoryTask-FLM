export function SkeletonTable() {
  return (
    <div className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 animate-in">
      <div className="p-4 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-48 relative overflow-hidden">
                <div className="shimmer absolute inset-0"></div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-64 relative overflow-hidden">
                <div className="shimmer absolute inset-0"></div>
              </div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-24 relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-32 relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-20 relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
