export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employee_count: number;
  founded_year: number;
  revenue: string;
  description: string;
  website: string;
  created_at: string;
}

export interface CompanyFilters {
  search: string;
  industry: string;
  location: string;
  revenueRange: string;
}

export interface SortConfig {
  field: keyof Company;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
}

export interface CompanyResponse {
  data: Company[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
