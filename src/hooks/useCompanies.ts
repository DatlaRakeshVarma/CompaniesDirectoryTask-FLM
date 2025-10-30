import { useState, useEffect, useCallback, useRef } from 'react';
import { Company, CompanyFilters, SortConfig, PaginationConfig, CompanyResponse } from '../types/company';
import { companyService } from '../services/companyService';

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const isFirstRender = useRef(true);
  const shouldResetPageRef = useRef(false);

  const [filters, setFilters] = useState<CompanyFilters>({
    search: '',
    industry: 'all',
    location: 'all',
    revenueRange: 'all',
  });

  const [debouncedFilters, setDebouncedFilters] = useState<CompanyFilters>({
    search: '',
    industry: 'all',
    location: 'all',
    revenueRange: 'all',
  });

  const [sort, setSort] = useState<SortConfig>({
    field: 'name',
    direction: 'asc',
  });

  const [pagination, setPagination] = useState<PaginationConfig>({
    page: 1,
    pageSize: 12,
  });

  const [industries] = useState<string[]>(() => companyService.getUniqueIndustries());
  const [locations] = useState<string[]>(() => companyService.getUniqueLocations());
  const [revenueRanges] = useState<string[]>(() => companyService.getUniqueRevenueRanges());

  // Debounce filters - skip on initial render to avoid double fetch
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
      // Reset page when filters change
      if (shouldResetPageRef.current) {
        setPagination((prev) => ({ ...prev, page: 1 }));
        shouldResetPageRef.current = false;
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: CompanyResponse = await companyService.getCompanies(
        debouncedFilters,
        sort,
        pagination
      );
      setCompanies(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Failed to load companies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [debouncedFilters, sort, pagination]);

  // Fetch companies when dependencies change
  useEffect(() => {
    fetchCompanies();
  }, [debouncedFilters, sort, pagination]);

  const handleFilterChange = (newFilters: CompanyFilters) => {
    shouldResetPageRef.current = true;
    setFilters(newFilters);
  };

  const handleSortChange = (field: keyof Company) => {
    setSort((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination({ page: 1, pageSize });
  };

  const clearFilters = () => {
    handleFilterChange({
      search: '',
      industry: 'all',
      location: 'all',
      revenueRange: 'all',
    });
  };

  return {
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
    refetch: fetchCompanies,
  };
}
