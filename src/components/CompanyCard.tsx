import { Company } from '../types/company';
import { Building2, MapPin, Users, Calendar, DollarSign, ExternalLink } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 animate-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-blue-100/40 transition-all duration-500 pointer-events-none"></div>
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2.5 group-hover:text-blue-700 transition-colors duration-200 leading-tight">{company.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{company.description}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm">
              {company.industry}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center text-sm text-gray-700 group/item hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3 group-hover/item:bg-blue-100 transition-colors">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium">{company.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 group/item hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mr-3 group-hover/item:bg-emerald-100 transition-colors">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="font-medium">{company.employee_count.toLocaleString()} employees</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 group/item hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mr-3 group-hover/item:bg-amber-100 transition-colors">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <span className="font-medium">Founded in {company.founded_year}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 group/item hover:text-blue-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 group-hover/item:bg-green-100 transition-colors">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <span className="font-medium">{company.revenue}</span>
          </div>
        </div>

        <div className="pt-5 border-t border-gray-100">
          <a
            href={`https://${company.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:gap-3 transition-all duration-200 group/link"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-4 h-4 group-hover/link:rotate-45 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </div>
  );
}
