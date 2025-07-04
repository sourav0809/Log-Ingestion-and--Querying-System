import React, { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import LogTable from "./components/LogTable";
import { LogService } from "./api/agent";
import type { Log, LogQueryParams } from "./types/log";

const App: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filters, setFilters] = useState<LogQueryParams>({});
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await LogService.getLogs(filters);
      if (response.success && response.data) {
        setLogs(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const handleFilterChange = (newFilters: LogQueryParams) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Log Viewer</h1>
            <p className="mt-2 text-sm text-gray-600">
              View and filter system logs in real-time
            </p>
          </div>

          <FilterBar filters={filters} onFilterChange={handleFilterChange} />

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <LogTable logs={logs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
