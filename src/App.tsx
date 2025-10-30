import { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { useCompanies } from './hooks/useCompanies';
import { FilterPanel } from './components/FilterPanel';
import { CompanyCard } from './components/CompanyCard';
import { CompanyTable } from './components/CompanyTable';
import { Pagination } from './components/Pagination';
import { ViewToggle } from './components/ViewToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const {
    companies,
    loading,
    error,
    total,
    totalPages,
    filters,
    sort,
    pagination,
    industries,
    locations,
    revenueRanges,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
    clearFilters,
    refetch,
  } = useCompanies();

  return (
    <div className="min-h-screen gradient-mesh bg-slate-50">
      <header className="glass border-b border-gray-100/50 shadow-sm backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer" onClick={scrollToTop}>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Companies</h1>
                <p className="text-sm font-medium text-gray-600 mt-1">
                  Discover and explore companies across industries
                </p>
              </div>
            </div>
            <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
              <div className="px-4 py-2 rounded-xl glass border border-blue-200/30 backdrop-blur-sm">
                <p className="text-sm font-bold text-blue-700">{total} Companies</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 lg:sticky lg:top-32 lg:self-start">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              industries={industries}
              locations={locations}
              revenueRanges={revenueRanges}
            />
          </aside>

          <div className="lg:col-span-3 space-y-8">
            <div className="glass rounded-2xl border border-white/20 shadow-lg p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {loading ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                        {total} {total === 1 ? 'Company' : 'Companies'}
                      </span>
                    )}
                  </h2>
                  <p className="text-sm font-semibold text-gray-600 mt-1.5">
                    Page {pagination.page} of {totalPages}
                  </p>
                </div>
                <ViewToggle view={view} onViewChange={setView} />
              </div>
            </div>

            {error ? (
              <ErrorMessage message={error} onRetry={refetch} />
            ) : loading ? (
              <LoadingSpinner />
            ) : companies.length === 0 ? (
              <EmptyState onClearFilters={clearFilters} />
            ) : (
              <>
                {view === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {companies.map((company, index) => (
                      <div
                        key={company.id}
                        style={{
                          animation: 'animateIn 0.4s ease-out forwards',
                          animationDelay: `${index * 50}ms`,
                          opacity: 0
                        }}
                      >
                        <CompanyCard company={company} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <CompanyTable
                    companies={companies}
                    sort={sort}
                    onSortChange={handleSortChange}
                  />
                )}

                {totalPages > 1 && (
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={totalPages}
                    pageSize={pagination.pageSize}
                    total={total}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="glass border-t border-gray-100/50 mt-20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-semibold text-gray-600">
              Companies &copy;2025 All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
