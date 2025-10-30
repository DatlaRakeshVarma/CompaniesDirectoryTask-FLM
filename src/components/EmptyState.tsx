import { Search } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center animate-in">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
            <Search className="w-10 h-10 text-blue-500" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl -z-10 blur-xl opacity-50"></div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">No companies found</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        We couldn't find any companies matching your filters. Try adjusting your search criteria or clearing all filters.
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105 transition-all duration-200 font-bold shadow-md"
      >
        Clear All Filters
      </button>
    </div>
  );
}
