import { LayoutGrid, Table } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'table';
  onViewChange: (view: 'grid' | 'table') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
      <button
        onClick={() => onViewChange('grid')}
        className={`px-5 py-2.5 rounded-lg flex items-center gap-2.5 text-sm font-bold transition-all duration-200 ${
          view === 'grid'
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md scale-105'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Grid</span>
      </button>
      <button
        onClick={() => onViewChange('table')}
        className={`px-5 py-2.5 rounded-lg flex items-center gap-2.5 text-sm font-bold transition-all duration-200 ${
          view === 'table'
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md scale-105'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Table className="w-4 h-4" />
        <span>Table</span>
      </button>
    </div>
  );
}
