export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-3/4 relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-full relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
          </div>
          <div className="ml-4">
            <div className="h-6 w-24 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-5/6 relative overflow-hidden">
              <div className="shimmer absolute inset-0"></div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-32 relative overflow-hidden">
            <div className="shimmer absolute inset-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
