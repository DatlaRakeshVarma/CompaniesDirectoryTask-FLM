import { Company, SortConfig } from '../types/company';
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';

interface CompanyTableProps {
  companies: Company[];
  sort: SortConfig;
  onSortChange: (field: keyof Company) => void;
}

export function CompanyTable({ companies, sort, onSortChange }: CompanyTableProps) {
  const getSortIcon = (field: keyof Company) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sort.direction === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600" />
    );
  };

  return (
    <div className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 animate-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gradient-to-br from-gray-50 to-gray-100/50">
          <tr>
            <th
              onClick={() => onSortChange('name')}
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-50 transition-colors duration-200 select-none"
            >
              <div className="flex items-center gap-2">
                Company {getSortIcon('name')}
              </div>
            </th>
            <th
              onClick={() => onSortChange('industry')}
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-50 transition-colors duration-200 select-none"
            >
              <div className="flex items-center gap-2">
                Industry {getSortIcon('industry')}
              </div>
            </th>
            <th
              onClick={() => onSortChange('location')}
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-50 transition-colors duration-200 select-none"
            >
              <div className="flex items-center gap-2">
                Location {getSortIcon('location')}
              </div>
            </th>
            <th
              onClick={() => onSortChange('employee_count')}
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-50 transition-colors duration-200 select-none"
            >
              <div className="flex items-center gap-2">
                Employees {getSortIcon('employee_count')}
              </div>
            </th>
            <th
              onClick={() => onSortChange('founded_year')}
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-50 transition-colors duration-200 select-none"
            >
              <div className="flex items-center gap-2">
                Founded {getSortIcon('founded_year')}
              </div>
            </th>
            <th
              onClick={() => onSortChange('revenue')}
              className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-50 transition-colors duration-200 select-none"
            >
              <div className="flex items-center gap-2">
                Revenue {getSortIcon('revenue')}
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Website
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {companies.map((company, index) => (
            <tr
              key={company.id}
              className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200 cursor-pointer"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <td className="px-6 py-5 whitespace-nowrap">
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{company.name}</div>
                  <div className="text-xs text-gray-500 max-w-xs truncate leading-relaxed">
                    {company.description}
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm group-hover:shadow-md transition-shadow">
                  {company.industry}
                </span>
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                {company.location}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                {company.employee_count.toLocaleString()}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                {company.founded_year}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-700">
                {company.revenue}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-sm">
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
