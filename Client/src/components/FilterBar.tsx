import React from "react";
import type { LogLevel, LogQueryParams } from "../types/log";

interface FilterBarProps {
  filters: LogQueryParams;
  onFilterChange: (filters: LogQueryParams) => void;
}

const LOG_LEVELS: LogLevel[] = ["error", "warn", "info", "debug"];

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handleChange = (field: keyof LogQueryParams, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value || undefined,
    });
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Log Level
          </label>
          <select
            value={filters.level || ""}
            onChange={(e) => handleChange("level", e.target.value as LogLevel)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Levels</option>
            {LOG_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <input
            type="text"
            value={filters.message || ""}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Search messages..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resource ID
          </label>
          <input
            type="text"
            value={filters.resourceId || ""}
            onChange={(e) => handleChange("resourceId", e.target.value)}
            placeholder="Filter by resource ID..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="datetime-local"
            value={filters.timestamp_start || ""}
            onChange={(e) => handleChange("timestamp_start", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="datetime-local"
            value={filters.timestamp_end || ""}
            onChange={(e) => handleChange("timestamp_end", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trace ID
          </label>
          <input
            type="text"
            value={filters.traceId || ""}
            onChange={(e) => handleChange("traceId", e.target.value)}
            placeholder="Filter by trace ID..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Span ID
          </label>
          <input
            type="text"
            value={filters.spanId || ""}
            onChange={(e) => handleChange("spanId", e.target.value)}
            placeholder="Filter by span ID..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commit
          </label>
          <input
            type="text"
            value={filters.commit || ""}
            onChange={(e) => handleChange("commit", e.target.value)}
            placeholder="Filter by commit..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
