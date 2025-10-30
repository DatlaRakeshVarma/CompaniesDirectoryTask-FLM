import { Company, CompanyFilters, SortConfig, PaginationConfig, CompanyResponse } from '../types/company';
import { mockCompanies } from '../data/mockCompanies';

class CompanyService {
  private companies: Company[] = mockCompanies;

  async getCompanies(
    filters: CompanyFilters,
    sort: SortConfig,
    pagination: PaginationConfig
  ): Promise<CompanyResponse> {
    await this.simulateNetworkDelay();

    let filtered = [...this.companies];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(searchLower) ||
          company.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.industry && filters.industry !== 'all') {
      filtered = filtered.filter((company) => company.industry === filters.industry);
    }

    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter((company) => company.location === filters.location);
    }

    if (filters.revenueRange && filters.revenueRange !== 'all') {
      filtered = filtered.filter((company) => company.revenue === filters.revenueRange);
    }

    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.pageSize);
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const paginatedData = filtered.slice(start, end);

    return {
      data: paginatedData,
      total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages,
    };
  }

  getUniqueIndustries(): string[] {
    const industries = new Set(this.companies.map((c) => c.industry));
    return Array.from(industries).sort();
  }

  getUniqueLocations(): string[] {
    const locations = new Set(this.companies.map((c) => c.location));
    return Array.from(locations).sort();
  }

  getUniqueRevenueRanges(): string[] {
    const ranges = new Set(this.companies.map((c) => c.revenue));
    return Array.from(ranges).sort();
  }

  private simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
  }
}

export const companyService = new CompanyService();
