import { useState, useEffect, useCallback, useRef } from 'react';
import { Company, CompanyFilters, SortConfig, PaginationConfig, CompanyResponse } from '../types/company';
import { companyService } from '../services/companyService';

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const isFilteringRef = useRef(false);

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

  useEffect(() => {
    isFilteringRef.current = true;
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
      setPagination((prev) => ({ ...prev, page: 1 }));
      setTimeout(() => {
        isFilteringRef.current = false;
      }, 100);
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

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleFilterChange = (newFilters: CompanyFilters) => {
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
