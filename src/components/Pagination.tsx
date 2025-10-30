import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="glass rounded-2xl shadow-lg border border-white/20 px-6 py-5 animate-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <div className="text-sm text-gray-700">
            Showing <span className="font-bold text-blue-700">{start}</span> to{' '}
            <span className="font-bold text-blue-700">{end}</span> of{' '}
            <span className="font-bold text-blue-700">{total}</span> companies
          </div>

          <div className="flex items-center gap-2.5">
            <label htmlFor="pageSize" className="text-sm font-semibold text-gray-700">
              Per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-3.5 py-1.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-semibold bg-white hover:border-gray-300 cursor-pointer transition-all duration-200"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-all duration-200 group"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>

          {getPageNumbers().map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`min-w-[2.5rem] px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 scale-105'
                    : 'border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:scale-105'
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2 text-gray-400">
                {page}
              </span>
            )
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-all duration-200 group"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
