import { CompanyFilters } from '../types/company';
import { Search, X, Filter } from 'lucide-react';

interface FilterPanelProps {
  filters: CompanyFilters;
  onFilterChange: (filters: CompanyFilters) => void;
  industries: string[];
  locations: string[];
  revenueRanges: string[];
}

export function FilterPanel({
  filters,
  onFilterChange,
  industries,
  locations,
  revenueRanges,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.search || filters.industry !== 'all' || filters.location !== 'all' || filters.revenueRange !== 'all';

  const clearFilters = () => {
    onFilterChange({
      search: '',
      industry: 'all',
      location: 'all',
      revenueRange: 'all',
    });
  };

  return (
  <div className="glass rounded-2xl shadow-lg border border-white/20 p-6 animate-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1.5 hover:gap-2 transition-all duration-200 group"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="search" className="block text-sm font-bold text-gray-700 mb-2.5">
            Search
          </label>
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              id="search"
              type="text"
              placeholder="Search companies..."
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 font-medium text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-bold text-gray-700 mb-2.5">
            Industry
          </label>
          <select
            id="industry"
            value={filters.industry}
            onChange={(e) => onFilterChange({ ...filters, industry: e.target.value })}
            size={1}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer font-medium text-gray-900 [&>option]:py-2"
            style={{ maxHeight: '300px' }}
          >
            <option value="all">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2.5">
            Location
          </label>
          <select
            id="location"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            size={1}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer font-medium text-gray-900 [&>option]:py-2"
            style={{ maxHeight: '300px' }}
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="revenue" className="block text-sm font-bold text-gray-700 mb-2.5">
            Revenue Range
          </label>
          <select
            id="revenue"
            value={filters.revenueRange}
            onChange={(e) => onFilterChange({ ...filters, revenueRange: e.target.value })}
            size={1}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer font-medium text-gray-900 [&>option]:py-2"
            style={{ maxHeight: '300px' }}
          >
            <option value="all">All Ranges</option>
            {revenueRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
