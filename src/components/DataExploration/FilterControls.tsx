import React, { useState } from 'react';
import { DataFilters } from '../../types';
import { Filter as FilterIcon, X } from 'lucide-react';

interface FilterControlsProps {
  onFilterChange: (filters: DataFilters) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<DataFilters>({});
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    let newValue: string | number | boolean | null = value;

    // Convert value types based on the field
    if (type === 'number') {
      newValue = value === '' ? null : Number(value);
    } else if (name === 'survived') {
      newValue = value === '' ? null : value === 'true';
    } else if (value === '') {
      newValue = null;
    }

    const newFilters = {
      ...filters,
      [name]: newValue
    };

    setFilters(newFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== null && value !== '');

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <FilterIcon size={20} className="mr-2 text-gray-500" />
          Filter Passengers
        </h3>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {expanded ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {expanded && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Survival Status */}
          <div>
            <label htmlFor="survived" className="block text-sm font-medium text-gray-700 mb-1">
              Survival Status
            </label>
            <select
              id="survived"
              name="survived"
              value={filters.survived === null ? '' : String(filters.survived)}
              onChange={handleChange}
              className="input"
            >
              <option value="">Any</option>
              <option value="true">Survived</option>
              <option value="false">Did not survive</option>
            </select>
          </div>

          {/* Passenger Class */}
          <div>
            <label htmlFor="pclass" className="block text-sm font-medium text-gray-700 mb-1">
              Passenger Class
            </label>
            <select
              id="pclass"
              name="pclass"
              value={filters.pclass === null ? '' : String(filters.pclass)}
              onChange={handleChange}
              className="input"
            >
              <option value="">Any</option>
              <option value="1">First Class</option>
              <option value="2">Second Class</option>
              <option value="3">Third Class</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="sex"
              name="sex"
              value={filters.sex || ''}
              onChange={handleChange}
              className="input"
            >
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age Range */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="number"
                  name="ageMin"
                  placeholder="Min age"
                  value={filters.ageMin === null ? '' : filters.ageMin}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="1"
                  className="input"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="ageMax"
                  placeholder="Max age"
                  value={filters.ageMax === null ? '' : filters.ageMax}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="1"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Port of Embarkation */}
          <div>
            <label htmlFor="embarked" className="block text-sm font-medium text-gray-700 mb-1">
              Port of Embarkation
            </label>
            <select
              id="embarked"
              name="embarked"
              value={filters.embarked || ''}
              onChange={handleChange}
              className="input"
            >
              <option value="">Any</option>
              <option value="S">Southampton</option>
              <option value="C">Cherbourg</option>
              <option value="Q">Queenstown</option>
            </select>
          </div>

          <div className="md:col-span-3 flex justify-end space-x-3 mt-2">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <X size={16} className="mr-1" />
                Clear
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Apply Filters
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FilterControls;